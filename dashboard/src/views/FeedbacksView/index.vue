<template>
  <div class="flex justify-center w-full h-28 bg-brand-main">
    <header-logged />
  </div>
  <div class="flex flex-col items-center justify-center h-64 bg-brand-gray">
    <h1 class="text-4xl font-black text-center text-gray-800">Feedbacks</h1>
    <p class="text-lg text-center text-gray-800 font-regular">
      Detalhes de todos os feedbacks recebidos.
    </p>
  </div>

  <div class="flex justify-center w-full pb-20">
    <div class="w-4/5 max-w-6xl py10 grid grid-cols-4 gap-2">
      <div>
        <h1 class="text-3xl font-black text-brand-graydark">Listagem</h1>
        <suspense>
          <template #default>
            <filters
              class="mt-8 animate__animated animate__fadeIn animate__faster"
            />
          </template>
          <template #fallback> <filters-loading class="mt-8" /> </template>
        </suspense>
      </div>
      <div class="px-10 pt-20 col-span-3">
        <p
          v-if="hasError"
          class="text-lg text-center text-gray-800 font-regular"
        >
          Aconteceu um erro ao carregar os feedbacks
        </p>
        <p
          v-if="!feedbackLength && !isLoading"
          class="text-lg text-center text-gray-800 font-regular"
        >
          Nenhum feedbacks recebido
        </p>

        <feedback-card-loading v-if="isLoading.value" />
        <feedback-card
          v-else
          v-for="(feedback, index) in feedbacksData"
          :key="feedback.id"
          :is-opened="index === 0"
          :feedback="feedback"
          class="mb-8"
        />
      </div>
    </div>
  </div>
</template>
<script setup>
import HeaderLogged from "../../components/HeaderLogged";
import Filters from "./Filters";
import FiltersLoading from "./FiltersLoading";
import FeedbackCardLoading from "../../components/FeedbackCard/Loading";
import FeedbackCard from "../../components/FeedbackCard";
import { computed, onMounted, ref } from "vue";
import services from "@/services";

const isLoading = ref(false);
const feedbacksData = ref([]);
const hasError = ref(false);
const currentFeedbackType = ref("");
const pagination = ref({
  limit: 5,
  offset: 0,
});

onMounted(() => {
  fetchFeedbacks();
});

const feedbackLength = computed(() => {
  return feedbacksData.value.length;
});

function handleErrors(error) {
  hasError.value = !!error;
}

async function fetchFeedbacks() {
  try {
    isLoading.value = true;

    const { data } = await services.feedbacks.getAll({
      ...pagination.value,
      type: currentFeedbackType.value,
    });

    feedbacksData.value = data.results;
    pagination.value = data.result;
    isLoading.value = false;
  } catch (error) {
    handleErrors(error);
  }
}
</script>
