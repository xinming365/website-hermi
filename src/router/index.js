import {
  createRouter,
  createWebHashHistory,
  createWebHistory,
} from "vue-router";
import { constRoutes } from "./constRoute";
import { dynamicRoutes } from "./asyncRoute";

const routes = [...constRoutes, ...dynamicRoutes];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

// 全局路由守卫
// router.beforeEach((to, from, next) => {
//   console.log("我是全局路由守卫");
// });
export default router;
