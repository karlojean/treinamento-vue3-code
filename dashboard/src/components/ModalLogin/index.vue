<template>
  <div class="flex justify-between" id="modal-login">
    <h1 class="text-4xl font-black text-gray-800">Entre na sua conta</h1>
    <button
      class="text-4xl text-gray-600 focus:outline-none"
      @click="modal.close"
    >
      &times;
    </button>
  </div>

  <div class="mt-16">
    <form @submit.prevent="handleSubmit">
      <label class="block">
        <span class="text-xl font-medium text-gray-800">Email</span>
        <input
          id="email-field"
          v-model="loginData.email.data"
          type="email"
          class="block w-full px-4 py-3 mt-1 text-lg bg-gray-100 border-2 border-transparent rounded"
          :class="{ 'border-brand-danger': !!loginData.email.errorMessage }"
          placeholder="john.doe@email.com"
        />
        <span
          id="email-error"
          v-if="!!loginData.email.errorMessage"
          class="block font-medium text-brand-danger"
          >{{ loginData.email.errorMessage }}</span
        >
      </label>
      <label class="block mt-9">
        <span class="text-xl font-medium text-gray-800">Senha</span>
        <input
          id="password-field"
          v-model="loginData.password.data"
          type="password"
          class="block w-full px-4 py-3 mt-1 text-lg bg-gray-100 border-2 border-transparent rounded"
          :class="{ 'border-brand-danger': !!loginData.password.errorMessage }"
        />
        <span
          v-if="!!loginData.password.errorMessage"
          class="block font-medium text-brand-danger"
          >{{ loginData.password.errorMessage }}</span
        >
      </label>
      <button
        id="submit-button"
        :disable="isLoading.data"
        type="submit"
        :class="{ 'opacity-50': isLoading.value }"
        class="px-8 py-3 mt-10 text-2xl font-bold text-white rounded-full bg-brand-main focus:outline-none transition-all duration-150"
      >
        <Icon v-if="isLoading" name="Loading" class="animate-spin" />
        <span v-else>Entrar</span>
      </button>
    </form>
  </div>
</template>

<script setup>
import useModal from "@/hooks/useModal";
import { useField } from "vee-validate";
import { ref } from "vue";
import {
  validateEmptyAndLength3,
  validateEmptyAndEmail,
} from "../../utils/validators";
import services from "../../services";
import { useRouter } from "vue-router";
import { useToast } from "vue-toastification";
import Icon from "../Icon";

const { value: emailValue, errorMessage: emailErroMessage } = useField(
  "email", // eslint-disable-next-line
  validateEmptyAndEmail
);
const { value: passwordValue, errorMessage: passwordErroMessage } = useField(
  "password",
  // eslint-disable-next-line
  validateEmptyAndLength3
);
const router = useRouter();
const modal = useModal();
const toast = useToast();

const isLoading = ref(false);
const hasErrors = ref(false);

async function handleSubmit() {
  try {
    toast.clear();
    isLoading.value = true;
    const { data, errors } = await services.auth.login({
      email: loginData.value.email.data,
      password: loginData.value.password.data,
    });
    console.log("aa");

    if (!errors) {
      window.localStorage.setItem("token", data.token);
      router.push({ name: "Feedbacks" });
      isLoading.value = false;
      modal.close();
      return;
    }

    if (errors.status === 404) {
      toast.error("E-mail não encontrado");
    }
    if (errors.status === 401) {
      toast.error("E-mail ou senha inválidos");
    }
    if (errors.status === 400) {
      toast.error("Ocorreu um error ao fazer o login");
    }
    isLoading.value = false;
  } catch (error) {
    isLoading.value = false;
    hasErrors.value = !!error;
    toast.error("Ocorreu um error ao fazer o login");
  }
}

const loginData = ref({
  email: {
    data: emailValue,
    errorMessage: emailErroMessage,
  },
  password: {
    data: passwordValue,
    errorMessage: passwordErroMessage,
  },
});
</script>
