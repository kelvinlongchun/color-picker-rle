<script setup lang="ts">
import { ref } from "vue";
import CameraPart from "@/components/CameraPart.vue";
import ColorInfo from "@/components/ColorInfo.vue";

const color = ref([0, 0, 0]);

const updateColor = (newColor: number[]) => {
  color.value = [...newColor];
};
</script>

<template>
  <main>
    <CameraPart @updateColor="updateColor" />
    <ColorInfo :color="color" />
  </main>
</template>

<style scoped lang="scss">
main {
  justify-content: center;
}
</style>
