import { createRouter, createWebHashHistory } from "vue-router";
import { useUserStore } from "../store/userStore";

const routes = [
  {
    path: "/:pathMatch(.*)*",
    name: "Not found",
    redirect: "/",
    meta: {
      requiresAuth: false,
      usesNavbar: false,
      requiresSelectedProject: false,
      useTitle: false,
    },
  },
  {
    path: "/",
    name: "Home",
    redirect: "/login",
    meta: {
      requiresAuth: false,
      usesNavbar: false,
      requiresSelectedProject: false,
      useTitle: false,
    },
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("../views/LoginView.vue"),
    meta: {
      requiresAuth: false,
      usesNavbar: false,
      usesSecondaryBar: false,
      requiresSelectedProject: false,
      useTitle: false,
      familyId: 0,
    },
  },
  {
    path: "/feed",
    name: "Feed",
    component: () => import("../views/FeedView.vue"),
    meta: {
      requiresAuth: true,
      usesNavbar: false,
      usesSecondaryBar: false,
      requiresSelectedProject: false,
      useTitle: false,
      familyId: 0,
    },
  },
  {
    path: "/profile",
    name: "Perfil",
    component: () => import("../views/ProfileView.vue"),
    meta: {
      requiresAuth: true,
      usesNavbar: false,
      usesSecondaryBar: false,
      requiresSelectedProject: false,
      useTitle: false,
      familyId: 0,
    },
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

router.beforeEach((to) => {
  const userStore = useUserStore();

  if (to.meta.requiresAuth && !userStore.isLogged) {
    return { name: "Login" };
  }
});

export default router;
