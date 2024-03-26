<template>
  <div
    @click="handleToggle"
    class="flex flex-col px-8 py-6 rounded cursor-pointer bg-brand-gray"
  >
    <div class="flex items-center justify-between w-full mb-8">
      <badge :type="feedback.type" />
      <span class="font-regular text-brand-graydark">
        {{ getDiffTimeBetweenCurrentDate(props.feedback.createdAt) }}
      </span>
    </div>

    <div class="text-lg font-medium text-gray-800">
      {{ feedback.text }}
    </div>

    <div
      :class="{
        animate__fadeOutUp: isClosing,
      }"
      class="flex mt-8 animate__animated animate__fadeInUp animate__faster"
      v-if="isOpen"
    >
      <div class="flex flex-col w-1/2">
        <div class="flex flex-col">
          <span class="font-bold text-gray-400 uppercase select-none"
            >Página</span
          >
          <span class="font-medium text-gray-700">{{ feedback.page }}</span>
        </div>
        <div class="flex flex-col">
          <span class="font-bold text-gray-400 uppercase select-none"
            >Dispositivo</span
          >
          <span class="font-medium text-gray-700">{{ feedback.device }}</span>
        </div>
      </div>
      <div class="flex flex-col w-1/2">
        <div class="flex flex-col">
          <span class="font-bold text-gray-400 uppercase select-none"
            >Usuário</span
          >
          <span class="font-medium text-gray-700">{{
            feedback.fingerprint
          }}</span>
        </div>
      </div>
    </div>
    <div class="flex justify-end mt-8" v-if="!isOpen">
      <icon name="ChevronDown" size="24" :color="brandColors.graydark" />
    </div>
  </div>
</template>
<script setup>
import Badge from "./Badge";
import Icon from "../Icon";
import { getDiffTimeBetweenCurrentDate } from "../../utils/date";
import { ref } from "vue";
import palette from "../../../palette";
import { wait } from "../../utils/timeout";

const props = defineProps({
  feedback: { type: Object, required: true },
  isOpened: { type: Boolean, required: false },
});

const isOpen = ref(props.isOpened);
const isClosing = ref(!props.isOpened);
const brandColors = ref(palette.brand);

async function handleToggle() {
  isClosing.value = true;
  await wait(250);
  isOpen.value = !isOpen.value;
  isClosing.value = false;
}
</script>
