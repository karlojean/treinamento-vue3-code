<template>
  <Teleport to="body">
    <div
      v-if="state.isActive"
      class="fixed top-0 left-0 z-50 flex items-center justify-center w-full h-full bg-black bg-opacity-50"
      @click="handleModalToggle({ status: false })"
    >
      <div class="fixed m-10" :class="state.width" @click.stop>
        <div
          class="flex flex-col overflow-hidden bg-white rounded-lg animate__animate animate__fadeInDown animate__faster"
        >
          <div class="flex flex-col px-12 py-10 bg-white">
            <component :is="is" />
          </div>
        </div>
      </div>
    </div>
  </Teleport>
</template>
<script setup>
import useModal from "@/hooks/useModal";
import {
  onBeforeMount,
  onMounted,
  reactive,
  computed,
  defineAsyncComponent,
} from "vue";

const modal = useModal();
const DEFAULT_WIDTH = "w-3/4 lg:w-1/3";

const state = reactive({
  isActive: false,
  component: {},
  props: {},
  width: DEFAULT_WIDTH,
});

/* eslint-disable */
const is = computed(() => {
  const newComponent = state.component;
  return defineAsyncComponent(() => import(`../${newComponent}`));
});

onMounted(() => {
  modal.listen(handleModalToggle);
});

onBeforeMount(() => {
  modal.off(handleModalToggle);
});

function handleModalToggle(payload) {
  if (payload.status) {
    state.component = payload.component;
    state.props = payload.props;
    state.width = payload.width && DEFAULT_WIDTH;
  } else {
    state.component = {};
    state.props = {};
    state.width = DEFAULT_WIDTH;
  }

  state.isActive = payload.status;
}
</script>
