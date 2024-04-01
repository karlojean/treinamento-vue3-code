<template>
  <teleport to="body">
    <component
      @open-box="handleOpenBox"
      @close-box="handleCloseBox"
      :is="renderComponent"
    />
  </teleport>
</template>
<script setup lang="ts">
import { computed, defineAsyncComponent, ref } from "vue";

const component = ref<string>("Standby");

const renderComponent = computed(() => {
  const newComponent = component.value;
  return defineAsyncComponent(() => import(`./${newComponent}.vue`));
});

function handleOpenBox(): void {
  component.value = "Box";
  return;
}

function handleCloseBox(): void {
  component.value = "Standby";
  return;
}
</script>
