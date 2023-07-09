import { createRouter, createWebHistory } from "vue-router";
import Power from "@/views/power";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "power",
      component: Power,
    },
  ],
});

export default router;
