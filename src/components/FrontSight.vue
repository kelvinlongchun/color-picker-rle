<script setup lang="ts">
const props = defineProps<{
  coordinate: { percentageX: number; percentageY: number };
}>();
</script>

<template>
  <div
    class="front-sight"
    :style="{
      top: `calc(${props.coordinate.percentageY} * 100%)`,
      left: `calc(${props.coordinate.percentageX} * 100%)`,
    }"
  >
    👆
  </div>
</template>

<style scoped lang="scss">
@import "../scss/variables";

.front-sight {
  position: absolute;
  font-size: $icon-size;
  transform: translate(-40%, -15%);
  pointer-events: none;
}
</style>
