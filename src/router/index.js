import { createRouter, createWebHistory } from "vue-router";

import Welcome from "../views/Welcome.vue";
import ChatRoom from "../views/ChatRoom.vue";

import useValidate from "../auth/validate";

const { validate, error } = useValidate();

const requireAuth = async (to, from, next) => {
  const uid = window.localStorage.getItem("uid");
  const client = window.localStorage.getItem("client");
  const accessToken = window.localStorage.getItem("access-token");

  if (!uid || !client || !accessToken) {
    console.log("ログインしていません");
    next({ name: "Welcome" });
    return;
  }

  await validate();

  if (error.value) {
    console.log("認証に失敗しました");
    next({ name: "Welcome" });
  } else {
    next();
  }
};

const noRequireAuth = async (to, from, next) => {
  const uid = window.localStorage.getItem("uid");
  const client = window.localStorage.getItem("client");
  const accessToken = window.localStorage.getItem("access-token");

  if (!uid && !client && !accessToken) {
    next();
    return;
  }

  await validate();

  if (!error.value) {
    next({ name: "Chatroom" });
  } else {
    next();
  }
};

const routes = [
  {
    path: "/",
    name: "Welcome",
    component: Welcome,
    beforeEnter: noRequireAuth,
  },
  {
    path: "/chatroom",
    name: "ChatRoom",
    component: ChatRoom,
    beforeEnter: requireAuth,
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
