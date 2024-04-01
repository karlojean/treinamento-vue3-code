<template>
  <div
    @click="() => $emit('open-box')"
    class="fixed z-50 bottom-0 right-0 mb-5 mr-5 bg-brand-main rounded-full py-3 px-5 flex items-center shadow-xl cursor-pointer select-none animate__animated animate__fadeInUp animate__faster"
  >
    <icon name="Chat" color="white" size="27" />
    <span class="font-black text-white text-xl"> deixe um feedback </span>
  </div>
</template>
<script setup lang="ts">
import { defineEmits } from "vue";
import Icon from "@/components/Icon/index.vue";

defineEmits(["open-box"]);
</script>
