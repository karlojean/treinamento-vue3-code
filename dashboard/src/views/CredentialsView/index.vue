<template>
  <div class="flex justify-center w-full h-28 bg-brand-main">
    <header-logged />
  </div>
  <div class="flex flex-col items-center justify-center h-64 bg-brand-gray">
    <h1 class="text-4xl font-black text-center text-gray-800">Credenciais</h1>
    <p class="text-lg text-center text-gray-800 font-regular">
      Guia de instalação e geração de suas credenciais
    </p>
  </div>
  <div class="flex justify-center w-full h-full">
    <div class="flex flex-col w-4/5 max-w-6xl py-10">
      <h1 class="text-3xl font-black text-brand-darkgray">
        Instalação e configuração
      </h1>
      <p class="mt-10 text-lg text-gray-800 font-regular">
        Este aqui é a sua chave de api
      </p>

      <content-loader
        v-if="store.Global.isLoading || isLoading"
        class="rounded"
        width="600px"
        height="50px"
      />

      <div
        v-else
        class="flex py-3 pl-5 mt-2 rounded items-center justify-between bg-brand-gray w-full lg:w-1/2"
      >
        <span v-if="hasError">Erro ao carregar a API Key</span>
        <span v-else>{{ store.User.currentUser.apiKey }}</span>
        <div v-if="!hasError" class="flex ml-20 mr-5">
          <icon
            name="Copy"
            @click="handleCopy"
            :color="brandColors.graydark"
            size="24"
            class="cursor-pointer ml-3"
          />
          <icon
            name="Loading"
            @click="handleGenerateApiKey"
            :color="brandColors.graydark"
            size="24"
            class="cursor-pointer ml-3"
          />
        </div>
      </div>

      <p class="mt-5 text-lg text-gray-800 font-regular">
        Coloque o script abaixo no seu site para começar a receber feedbacks
      </p>

      <content-loader
        v-if="store.Global.isLoading || isLoading"
        class="rounded"
        width="600px"
        height="50px"
      />

      <div
        v-else
        class="py-3 pl-5 pr-20 mt-2 rounded bg-brand-gray w-full lg:w-2/3"
      >
        <span v-if="hasError">Erro ao carregar o script</span>
        <pre v-else>
&lt;script
  defer
  async
  onload="init('{{ store.User.currentUser.apiKey }}')"
  src="https://igorhalfeld-feedbacker-widget.netlify.app/init.js"&gt;
&lt;/script&gt;</pre
        >
      </div>
    </div>
  </div>
</template>
<script setup>
import HeaderLogged from "../../components/HeaderLogged";
import ContentLoader from "../../components/ContentLoader";
import useStore from "@/hooks/useStore";
import icon from "../../components/Icon";
import palette from "../../../palette";
import services from "@/services";
import { setApiKey } from "@/store/user";
import { ref, watch } from "vue";
import { useToast } from "vue-toastification";

// eslint-disable-next-line
const brandColors = palette.brand;
const store = useStore();
const toast = useToast();
const isLoading = ref(false);
const hasError = ref(false);

watch(
  () => store.User.currentUser,
  () => {
    if (!store.Global.isLoading && !store.User.currentUser.apiKey) {
      handleError(true);
    }
    // eslint-disable-next-line
  }
);

async function handleError(error) {
  isLoading.value = false;
  hasError.value = !!error;
}

async function handleGenerateApiKey() {
  try {
    isLoading.value = true;

    const { data } = await services.users.generateApikey();

    setApiKey(data.apiKey);

    isLoading.value = false;
  } catch (error) {
    handleError();
  }
}

async function handleCopy() {
  try {
    toast.clear();
    await navigator.clipboard.writeText(store.User.currentUser.apiKey);
    toast.success("Copiado");
  } catch (error) {
    handleError(error);
  }
}
</script>
