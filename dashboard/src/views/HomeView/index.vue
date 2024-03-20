<template>
  <custom-header @login="handleLogin" @create-account="handleAccountCreate" />
  <contact />
  <div class="flex justify-center py-10 bg-brand-gray">
    <p class="font-medium text-center text-gray-800">feedbacker © 2024</p>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import CustomHeader from "./CustomHeader.vue";
import Contact from "./Contact.vue";
import { onMounted } from "vue";
import useModal from "@/hooks/useModal";

const router = useRouter;
const modal = useModal();

onMounted(() => {
  const token = window.localStorage.getItem("token");
  if (token) {
    router.push({ name: "Feedbacks" });
  }
});

function handleLogin() {
  modal.open({
    component: "ModalLogin",
  });
}
function handleAccountCreate() {
  modal.open({
    component: "ModalAccountCreate",
  });
}
</script>
