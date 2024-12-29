import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Home",
    component: () =>
      import(/* webpackChunkName: "Home" */ "../views/HomePage.vue"),
  },
  {
    path: "/signup",
    name: "Signup",
    component: () =>
      import(/* webpackChunkName: "Signup" */ "../views/user/UserSignup.vue"),
  },
  {
    path: "/login",
    name: "Login",
    component: () =>
      import(/* webpackChunkName: "Login" */ "../views/user/UserLogin.vue"),
  },
  {
    path: "/create-hackathon",
    name: "CreateHackathon",
    component: () =>
      import(
        /* webpackChunkName: "LoCreateHackathon" */ "../views/admin/CreateHackathon.vue"
      ),
  },
  {
    path: "/hackathon/:id",
    name: "HackathonDetails",
    component: () =>
      import(
        /* webpackChunkName: "LoCreateHackathon" */ "../views/hackathon/HackathonDetails.vue"
      ),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
