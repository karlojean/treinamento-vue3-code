<template>
  <component :is="is" v-bind="$props" />
</template>

<script setup>
import { computed, defineAsyncComponent, defineProps } from "vue";

/* eslint-disable */
const is = computed(() => {
  const newComponent = props.name;
  return defineAsyncComponent(() => import(`./${newComponent}`));
});

const props = defineProps({
  name: {
    type: String,
    required: true,
  },
});
</script>
