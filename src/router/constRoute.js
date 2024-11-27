import HomeView from "@/views/HomeView.vue";

export const constRoutes = [
  {
    path: "/",
    redirect: "/home",
  },
  {
    path: "/home",
    name: "home",
    component: HomeView,
  },
  //   {
  //     path: "/login",
  //     name: "login",
  //     component: () => import("@/views/Login.vue"),
  //   },
];
