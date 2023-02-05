import { createRouter, createWebHistory } from "vue-router";
import Compose from "../views/Compose.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "compose",
      component: Compose,
    },
    {
      path: "/workouts",
      name: "workouts",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("@/views/Workouts.vue"),
    },
  ],
});

export default router;
