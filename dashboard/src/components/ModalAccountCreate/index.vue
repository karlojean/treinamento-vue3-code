<template>
  <div class="flex justify-between">
    <h1 class="text-4xl font-black text-gray-800">Crie uma conta</h1>
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
        <span class="text-xl font-medium text-gray-800">Nome</span>
        <input
          v-model="loginData.name.data"
          type="text"
          class="block w-full px-4 py-3 mt-1 text-lg bg-gray-100 border-2 border-transparent rounded"
          :class="{ 'border-brand-danger': !!loginData.name.errorMessage }"
        />
        <span
          v-if="!!loginData.name.errorMessage"
          class="block font-medium text-brand-danger"
          >{{ loginData.name.errorMessage }}</span
        >
      </label>
      <label class="block mt-9">
        <span class="text-xl font-medium text-gray-800">Email</span>
        <input
          v-model="loginData.email.data"
          type="email"
          class="block w-full px-4 py-3 mt-1 text-lg bg-gray-100 border-2 border-transparent rounded"
          :class="{ 'border-brand-danger': !!loginData.email.errorMessage }"
          placeholder="john.doe@email.com"
        />
        <span
          v-if="!!loginData.email.errorMessage"
          class="block font-medium text-brand-danger"
          >{{ loginData.email.errorMessage }}</span
        >
      </label>
      <label class="block mt-9">
        <span class="text-xl font-medium text-gray-800">Senha</span>
        <input
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

const { value: nameValue, errorMessage: nameErroMessage } = useField(
  "name",
  // eslint-disable-next-line
  validateEmptyAndLength3
);

const router = useRouter();
const modal = useModal();
const toast = useToast();

const isLoading = ref(false);
const hasErrors = ref(false);

async function login({ email, password }) {
  const { data, errors } = await services.auth.login({
    email,
    password,
  });

  if (!errors) {
    window.localStorage.setItem("token", data.token);
    router.push({ name: "Feedbacks" });
    modal.close();
  }

  isLoading.value = false;
}

async function handleSubmit() {
  try {
    toast.clear();
    isLoading.value = true;
    const { errors } = await services.auth.register({
      name: loginData.value.name.data,
      email: loginData.value.email.data,
      password: loginData.value.password.data,
    });

    if (!errors) {
      await login({
        email: loginData.value.email.data,
        password: loginData.value.password.data,
      });
      return;
    }

    // eslint-disable-next-line
    if (errors.status == 400) {
      toast.error("Ocorreu um error ao criar a conta");
    }
    isLoading.value = false;
  } catch (error) {
    isLoading.value = false;
    hasErrors.value = !!error;
    console.log("aa");
    toast.error("Ocorreu um error ao criar a conta");
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
  name: {
    name: nameValue,
    errorMessage: nameErroMessage,
  },
});
</script>
