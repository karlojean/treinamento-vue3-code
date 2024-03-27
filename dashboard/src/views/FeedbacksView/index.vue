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
              @select="changeFeedbacksType"
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
          v-if="
            !feedbackLength && !isLoading && !isLoadingFeedbacks && !hasError
          "
          class="text-lg text-center text-gray-800 font-regular"
        >
          Nenhum feedbacks recebido
        </p>

        <feedback-card-loading v-if="isLoading || isLoadingFeedbacks" />
        <feedback-card
          v-else
          v-for="(feedback, index) in feedbacksData"
          :key="feedback.id"
          :is-opened="index === 0"
          :feedback="feedback"
          class="mb-8"
        />
        <feedback-card-loading v-if="isLoadingMoreFeedbacks" />
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
import { computed, onErrorCaptured, onMounted, onUnmounted, ref } from "vue";
import services from "@/services";

const isLoading = ref(false);
const isLoadingFeedbacks = ref(false);
const isLoadingMoreFeedbacks = ref(false);
const feedbacksData = ref([]);
const hasError = ref(false);
const currentFeedbackType = ref("");
const pagination = ref({
  limit: 5,
  offset: 0,
});

onErrorCaptured(handleErrors);

onMounted(() => {
  fetchFeedbacks();
  window.addEventListener("scroll", handleScroll, false);
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll, false);
});

const feedbackLength = computed(() => {
  return feedbacksData.value.length;
});

function handleErrors(error) {
  isLoading.value = false;
  isLoadingFeedbacks.value = false;
  isLoadingMoreFeedbacks.value = false;
  hasError.value = !!error;
}

async function handleScroll() {
  const isBottomOfWindow =
    Math.ceil(document.documentElement.scrollTop + window.innerHeight) >=
    document.documentElement.scrollHeight;

  if (isLoading.value || isLoadingMoreFeedbacks.value) return;
  if (!isBottomOfWindow) return;
  if (feedbacksData.value.length >= pagination.value.total) return;

  try {
    isLoadingMoreFeedbacks.value = true;
    const { data } = await services.feedbacks.getAll({
      ...pagination.value,
      type: currentFeedbackType.value,
      offset: pagination.value.offset + 5,
    });

    if (data.results.length) {
      feedbacksData.value.push(...data.results);
    }

    isLoadingMoreFeedbacks.value = false;
    pagination.value = data.pagination;
  } catch (error) {
    isLoadingMoreFeedbacks.value = false;
    handleErrors(error);
  }
}

async function fetchFeedbacks() {
  try {
    isLoading.value = true;

    const { data } = await services.feedbacks.getAll({
      ...pagination.value,
      type: currentFeedbackType.value,
    });

    feedbacksData.value = data.results;
    pagination.value = data.pagination;
    isLoading.value = false;
  } catch (error) {
    handleErrors(error);
  }
}

async function changeFeedbacksType(type) {
  try {
    isLoadingFeedbacks.value = true;
    pagination.value.limit = 5;
    pagination.value.offset = 0;
    currentFeedbackType.value = type;
    const { data } = await services.feedbacks.getAll({
      type,
      ...pagination.value,
    });
    feedbacksData.value = data.results;
    pagination.value = data.pagination;
    isLoadingFeedbacks.value = false;
  } catch (error) {
    isLoadingFeedbacks.value = false;
    hasError.value = !!error;
  }
}
</script>
