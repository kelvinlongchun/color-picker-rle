<script setup lang="ts">
import { ref, onMounted } from "vue";
import FrontSight from "./FrontSight.vue";
import LoadingBlock from "./LoadingBlock.vue";

const enableCamera = async (videoElement: HTMLVideoElement) => {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({
      video: { facingMode: "environment" },
    });
    videoElement.srcObject = stream;
  } catch (error) {
    console.error("Error accessing the camera: ", error);
  }
};

const getContext = (canvasElement: HTMLCanvasElement) =>
  canvasElement.getContext("2d", {
    willReadFrequently: true,
  }) as CanvasRenderingContext2D;

const capturePixel = (
  videoElement: HTMLVideoElement,
  canvasElement: HTMLCanvasElement,
  x: number,
  y: number
) => {
  const context = getContext(canvasElement);
  const realX = x * (videoElement.videoWidth / videoElement.offsetWidth);
  const realY = y * (videoElement.videoHeight / videoElement.offsetHeight);
  context.drawImage(videoElement, realX, realY, 1, 1, 0, 0, 1, 1);
};

// It will return a array of rgb colors
const getImageColors = (canvasElement: HTMLCanvasElement) => {
  const context = getContext(canvasElement);

  const imageData = context.getImageData(
    0,
    0,
    canvasElement.width,
    canvasElement.height
  ).data;

  return Array.from({ length: imageData.length / 4 }, (_value, index) =>
    Array.from(imageData).filter(
      (_value, imageDataIndex) =>
        imageDataIndex >= index * 4 && imageDataIndex < index * 4 + 3
    )
  );
};

const emit = defineEmits<{
  (e: "updateColor", color: number[]): void;
}>();

const updateColor = (color: number[]) => {
  emit("updateColor", color);
};

const videoRef = ref<HTMLVideoElement>();
const canvasRef = ref<HTMLCanvasElement>();
const coordinate = ref({ percentageX: 0.5, percentageY: 0.5 });
const isVideoOn = ref(false);

onMounted(async () => {
  const videoElement = videoRef.value;

  if (videoElement) {
    await enableCamera(videoElement);
  }
});

const loadedMetaHandler = (event: Event) => {
  const videoElement = event.target as HTMLVideoElement;
  const canvasElement = canvasRef.value;
  isVideoOn.value = true;

  if (videoElement && canvasElement) {
    setInterval(() => {
      const { width, height } = videoElement.getBoundingClientRect();
      const videoX = width * coordinate.value.percentageX;
      const videoY = height * coordinate.value.percentageY;
      capturePixel(videoElement, canvasElement, videoX, videoY);
      const colors = getImageColors(canvasElement);
      updateColor(colors[0]);
    }, 500);
  }
};

const onClickHandler = (event: Event & { x: number; y: number }) => {
  const videoElement = event.target as HTMLVideoElement;
  if (videoElement) {
    const { left, top, width, height } = videoElement.getBoundingClientRect();
    coordinate.value.percentageX = (event.x - left) / width;
    coordinate.value.percentageY = (event.y - top) / height;
  }
};
</script>

<template>
  <div class="camera-part">
    <div class="camera-part__video-container">
      <video
        ref="videoRef"
        class="camera-part__video-container__camera-feed"
        autoplay
        playsinline
        @loadedmetadata="loadedMetaHandler"
        @click="onClickHandler"
      ></video>
      <FrontSight v-if="isVideoOn" :coordinate="coordinate" />
      <LoadingBlock v-else />
    </div>
    <canvas
      ref="canvasRef"
      class="camera-part__captured-image"
      width="1"
      height="1"
    ></canvas>
  </div>
</template>

<style scoped lang="scss">
@import "../scss/variables";
@import "../scss/mixins";

.camera-part {
  border-radius: $bigger-border-radius;
  overflow: hidden;
  background-color: $tri-color;
  -webkit-tap-highlight-color: transparent;
  @include shadow;

  &__video-container {
    display: flex;
    position: relative;

    &__camera-feed {
      width: 100%;

      &:hover,
      &:active {
        cursor: pointer;
      }
    }
  }

  &__captured-image {
    display: none;
  }
}
</style>
