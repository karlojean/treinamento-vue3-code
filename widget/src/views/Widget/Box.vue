<template>
  <div class="box animate__animated animate__fadeInUp animate__faster">
    <div
      :class="{
        'justify-between': canShowAdditionalControlAndInfo,
        'justify-end': !canShowAdditionalControlAndInfo,
      }"
      class="relative w-full flex"
    >
      <button
        v-if="canShowAdditionalControlAndInfo"
        @click="back"
        :disabled="canGoBack"
        :class="{ invisible: canGoBack }"
        class="text-xl text-gray-800 focus:outline-none"
      >
        <icon name="ArrowRight" :color="colors.gray['800']" />
      </button>
      <p
        v-if="canShowAdditionalControlAndInfo"
        class="text-xl font-black text-center text-brand-main"
      >
        {{ label }}
      </p>
      <button
        @click="() => $emit('close-box')"
        class="text-cl text-gray-800 focus:outline-none"
      >
        <icon size="14" name="Close" :color="colors.gray['800']" />
      </button>
    </div>
    <wizard />
    <div
      class="text-gray-800 text-sm flex"
      v-if="canShowAdditionalControlAndInfo"
    >
      <icon name="Chat" class="mr-1" :color="palette.brand.graydark" />
      widget by
      <span class="ml-1 font-bold">feedbacker</span>
    </div>
  </div>
</template>
<script setup lang="ts">
import { computed, defineEmits } from "vue";
import palette from "../../../palette";
import colors from "tailwindcss/colors";
import useStore from "@/hooks/store";
import useNavigation from "@/hooks/navigation";
import Icon from "@/components/Icon/index.vue";
import Wizard from "@/components/Wizard/index.vue";

const store = useStore();
const { back } = useNavigation();

const label = computed<string>(() => {
  if (store.feedbackType === "ISSUE") {
    return "Reporte um problema";
  }

  if (store.feedbackType === "IDEA") {
    return "Nos fale a sua ideia";
  }

  if (store.feedbackType === "OTHER") {
    return "Abra sua mente";
  }

  return "O que você tem em mente";
});

const canGoBack = computed<boolean>(() => {
  return store.currentComponent == "SelectFeedbackType";
});

const canShowAdditionalControlAndInfo = computed<boolean>(() => {
  return (
    store.currentComponent !== "Success" && store.currentComponent !== "Error"
  );
});

defineEmits(["close-box"]);
</script>

<style lang="postcss" scoped>
.box {
  @apply fixed z-50 bottom-0 right-0 mb-5 mr-5 bg-white rounded-xl py-5 px-5 flex items-center flex-col shadow-xl select-none;
  width: 400px;
}
</style>
