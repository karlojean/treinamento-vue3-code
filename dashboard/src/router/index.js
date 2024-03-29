import { createRouter, createWebHistory } from "vue-router";

const HomeView = () => import("../views/HomeView/index.vue");
const FeedbacksView = () => import("../views/FeedbacksView/index.vue");
const CredentialsView = () => import("../views/CredentialsView/index.vue");

export const routes = [
  {
    path: "/",
    name: "Home",
    component: HomeView,
  },
  {
    path: "/feedbacks",
    name: "Feedbacks",
    component: FeedbacksView,
    meta: {
      hasAuth: true,
    },
  },
  {
    path: "/credentials",
    name: "Credentials",
    component: CredentialsView,
    meta: {
      hasAuth: true,
    },
  },
  {
    path: "/:pathMatch(.*)*",
    redirect: { name: "Home" },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
