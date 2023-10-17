<script setup lang="ts">
import GithubIcon from "./icons/GithubIcon.vue";
</script>

<template>
  <a
    class="github-repo-banner"
    href="https://github.com/kelvinlongchun/color-picker-rle"
    target="_blank"
  >
    <GithubIcon class="github-repo-banner__icon" />
    <p>Github Repo</p>
  </a>
</template>

<style scoped lang="scss">
@import "../scss/variables";

.github-repo-banner {
  display: flex;
  height: $banner-size;
  padding: 1rem;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  background-color: $banner-color;

  &__icon {
    width: auto;
    height: 120%;
    fill: $banner-text-color;
  }
}
</style>
