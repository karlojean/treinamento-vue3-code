<template>
  <component
    :is="renderComponent"
    @select-feedback-type="handleSelectFeedbackType"
    @next="next"
  />
</template>
<script setup lang="ts">
import useStore from "@/hooks/store";
import { computed, defineAsyncComponent } from "vue";
import { setFeedbackType } from "@/store";
import useNavigation from "@/hooks/navigation";

const store = useStore();
const { next } = useNavigation();

const renderComponent = computed(() => {
  const newComponent = store.currentComponent;
  return defineAsyncComponent(() => import(`./${newComponent}.vue`));
});

function handleSelectFeedbackType(type: string): void {
  setFeedbackType(type);
}
</script>
