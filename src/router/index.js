import { createRouter, createWebHistory } from "vue-router";
import TrelloClone from "@/views/TrelloClone.vue";

const routes = [
  {
    path: "/",
    name: "TrelloClone",
    component: TrelloClone,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;