<script setup lang="ts"></script>

<template>
  <div class="loading-block">
    <div class="loading-block__icon">⏳</div>
  </div>
</template>

<style scoped lang="scss">
@import "../scss/variables";

.loading-block {
  @keyframes rotate {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }

  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  &__icon {
    animation: rotate 2s linear infinite;
    font-size: $icon-size;
  }
}
</style>
