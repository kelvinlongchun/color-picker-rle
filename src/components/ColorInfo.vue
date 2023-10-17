<script setup lang="ts">
import { ref, toRef, watch } from "vue";
import { rgbToHex, rgbToHsl } from "@/utils/color";
import ColorInfoText from "./ColorInfoText.vue";

const getRgbString = (color: number[]) =>
  `rgb(${color[0]}, ${color[1]}, ${color[2]})`;

const getHslString = (color: number[]) => {
  const hslColor = rgbToHsl(color[0], color[1], color[2]) as number[];
  return `hsl(${hslColor[0].toFixed(0)}, ${(hslColor[1] * 100).toFixed(0)}%, ${(
    hslColor[2] * 100
  ).toFixed(0)}%)`;
};

const props = defineProps<{ color: number[] }>();

const colorRef = toRef(props, "color");

const colorInfoTexts = ref([
  { type: "RGB", value: getRgbString(colorRef.value) },
  {
    type: "HEX",
    value: rgbToHex(colorRef.value[0], colorRef.value[1], colorRef.value[2]),
  },
  { type: "HSL", value: getHslString(colorRef.value) },
]);

watch(colorRef, (newColor) => {
  colorInfoTexts.value = [
    { type: "RGB", value: getRgbString(newColor) },
    {
      type: "HEX",
      value: rgbToHex(newColor[0], newColor[1], newColor[2]),
    },
    { type: "HSL", value: getHslString(newColor) },
  ];
});
</script>

<template>
  <div class="color-info">
    <div
      class="color-info__color"
      :style="{
        backgroundColor: getRgbString(props.color),
      }"
    ></div>
    <div class="color-info__texts">
      <ColorInfoText
        v-for="(text, index) in colorInfoTexts"
        :color-type="text.type"
        :color-value="text.value"
        :index="index"
        :key="index"
      />
    </div>
  </div>
</template>

<style scoped lang="scss">
@import "../scss/variables";
@import "../scss/mixins";

$color-size: 3rem;

.color-info {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background-color: $sec-color;
  border-radius: $bigger-border-radius;
  @include shadow;

  &__color {
    min-width: $color-size;
    height: $color-size;
    max-height: $color-size;
    border-radius: $standard-border-radius;
    border: 0.15rem solid $gray-color;
    @include shadow;
  }

  &__texts {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    width: 100%;
  }
}
</style>
