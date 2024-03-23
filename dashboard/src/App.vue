<template>
  <modal-factory />
  <router-view />
</template>

<script setup>
import { useRoute, useRouter } from "vue-router";
import ModalFactory from "./components/ModalFactory";
import { watch } from "vue";
import services from "./services";
import setCurrentUser from "./store/user";

const router = useRouter();
const route = useRoute();

watch(
  () => route.path,
  // eslint-disable-next-line
  async () => {
    if (route.meta.hasAuth) {
      const token = window.localStorage.getItem("token");

      if (!token) {
        router.push({ name: "Home" });
      }

      const { data } = await services.users.getMe();
      setCurrentUser(data);
    }
  }
);
</script>
