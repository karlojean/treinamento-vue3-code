<template>
  <custom-header />
  <contact @create-login="handleLogin" @create-account="handleAccountCreate" />
  <div class="flex justify-center py-10 bg-brand-gray">
    <p class="font-medium text-center text-gray-800">feedbacker © 2024</p>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import CustomHeader from "./CustomHeader.vue";
import Contact from "./Contact.vue";
import { onMounted } from "vue";

const router = useRouter;

onMounted(() => {
  const token = window.localStorage.getItem("token");
  if (token) {
    router.push({ name: "Feedbacks" });
  }
});

function handleLogin() {}
function handleAccountCreate() {}
</script>
