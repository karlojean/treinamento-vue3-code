<template>
  <div class="flex flex-col items-center justify-between w-full my-5">
    <icon name="Atention" :color="palette.brand.danger" size="70" />

    <p class="text-xl font-black text-center w-full mt-2">
      Droga! Aconteceu um erro!
    </p>

    <div class="flex justify-center items-center w-full mt-2">
      <button
        @click="goBack"
        class="rounded-full font-regular text-sm flex flex-col justify-center bg-brand-gray items-center py-2 px-5 cursor-pointer focus:outline-none"
      >
        Tente novamente
      </button>
    </div>
  </div>
</template>
<script setup lang="ts">
import palette from "../../../palette";
import Icon from "@/components/Icon/index.vue";
import { resetStore } from "@/store";

function goBack(): void {
  resetStore();
}
</script>
