<template>
  <div
    class="w-full h-3/4 flex flex-col justify-center items-center bg-brand-main"
  >
    <h1 class="text-6xl font-black text-brand-gray">Playground</h1>
    <p class="text-brand-gray">Esse é o playground, use para testar o widget</p>
  </div>
  <widget />
</template>
<script setup lang="ts">
import Widget from "../Widget/index.vue";
</script>
