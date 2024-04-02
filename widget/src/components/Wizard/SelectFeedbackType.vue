<template>
  <div class="flex justify-between w-full my-5">
    <button
      @click="() => handleSelect('ISSUE')"
      class="rounded-xl hover:bg-gray-100 bg-brand-gray flex flex-col justify-center items-center p-5 w-28 cursor-pointer"
    >
      <div class="w-12">
        <img class="w-full" src="../../assets/images/issue.png" alt="" />
      </div>
      <p class="font-medium mt-1 text-gray-800">Problema</p>
    </button>
    <button
      @click="() => handleSelect('IDEA')"
      class="rounded-xl hover:bg-gray-100 bg-brand-gray flex flex-col justify-center items-center p-5 w-28 cursor-pointer"
    >
      <div class="w-12">
        <img class="w-full" src="../../assets/images/lamp.png" alt="" />
      </div>
      <p class="font-medium mt-1 text-gray-800">Ideia</p>
    </button>
    <button
      @click="() => handleSelect('OTHER')"
      class="rounded-xl hover:bg-gray-100 bg-brand-gray flex flex-col justify-center items-center p-5 w-28 cursor-pointer"
    >
      <div class="w-12">
        <img class="w-full" src="../../assets/images/fire.png" alt="" />
      </div>
      <p class="font-medium mt-1 text-gray-800">Outro</p>
    </button>
  </div>
</template>
<script setup lang="ts">
import { defineEmits } from "vue";
const emit = defineEmits(["select-feedback-type", "next"]);

function handleSelect(type: string): void {
  emit("select-feedback-type", type);
  emit("next");
}
</script>
