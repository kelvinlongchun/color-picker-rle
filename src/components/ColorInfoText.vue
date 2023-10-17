<script setup lang="ts">
import { ref } from "vue";

const props = defineProps<{
  colorType: string;
  colorValue: string;
  index: number;
}>();

const textRef = ref<HTMLElement>();
const defaultClickedIndex = -1;
const clickedIndex = ref(defaultClickedIndex);
const timeoutId = ref<number | null>(null);

const onClickHandler = (event: Event) => {
  const targetElemnet = event.currentTarget as HTMLParagraphElement;
  const spanElement = targetElemnet.childNodes[1];
  const text = spanElement.textContent;
  if (text) {
    navigator.clipboard.writeText(text);
    clickedIndex.value = props.index;
    if (timeoutId.value !== null) {
      clearTimeout(timeoutId.value);
      timeoutId.value = null;
    }
    timeoutId.value = setTimeout(() => {
      clickedIndex.value = defaultClickedIndex;
      timeoutId.value = null;
    }, 500);
  }
};
</script>

<template>
  <p
    ref="textRef"
    :class="{
      text: true,
      textIsCopied: clickedIndex === index,
    }"
    @click="onClickHandler"
  >
    {{ props.colorType }}
    <span v-if="clickedIndex !== index">{{ props.colorValue }}</span
    ><span v-else class="text__copied-icon">👌</span>
  </p>
</template>

<style scoped lang="scss">
@import "../scss/variables";
@import "../scss/mixins";

$text-padding: 0.75rem;

.text {
  display: flex;
  position: relative;
  justify-content: space-between;
  align-items: center;
  background-color: $tri-color;
  padding: $text-padding;
  border-radius: $standard-border-radius;
  font-size: 0.8rem;
  transition: 0.5s;
  @include shadow;

  &:hover,
  &:active {
    cursor: pointer;
    filter: brightness(1.3);
  }

  &__copied-icon {
    position: absolute;
    right: $text-padding;
    font-size: 1rem;
  }

  &IsCopied {
    background-color: $green-color;
  }
}
</style>
