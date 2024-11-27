import ContactView from "../views/ContactView.vue";
// import ProductView from '../views/ProductView.vue'

export const dynamicRoutes = [
  {
    path: "/custom_service",
    name: "service",
    // route level code-splitting
    // this generates a separate chunk (About.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import("../views/Service.vue"),
  },
  {
    path: "/product_center",
    name: "product",
    // component: ProductView
    component: () => import("../views/ProductView.vue"),
    // component: () => import('../views/AboutView.vue')
  },
  {
    path: "/product_center/:id",
    name: "product-detail",
    component: () => import("../views/ProductDetail.vue"),
    beforeEnter: (to, from, next) => {
      if (!to.query.tid) {
        next({
          name: "product-list",
          params: { id: to.params.id },
          query: { sid: to.query.sid },
        });
      } else {
        next();
      }
    },
    props: (route) => ({
      id: route.params.id,
      sid: route.query.sid,
      tid: route.query.tid,
    }),
  },
  {
    path: "/product_list/:id?",
    name: "product-list",
    component: () => import("../views/ProductList.vue"),
    props: true,
  },
  {
    path: "/cooperations",
    name: "cooperations",
    component: () => import("@/views/Cooperations.vue"),
  },
  // {
  //   path: '/solutions',
  //   name: 'solutions',
  //   component: () => import('@/views/SolutionPages.vue')
  // },

  {
    path: "/articles",
    name: "articles",
    component: () => import("@/views/TechArticles.vue"),
  },

  {
    path: "/solutions",
    name: "solutions",
    component: () => import("@/components/SolutionPages.vue"),
    children: [
      {
        path: ":id(.*)",
        name: "article-detail",
        component: () => import("@/components/SolutionPages.vue"),
      },
    ],
  },
  // {
  //   path: '/downloads',
  //   name: 'downloads',
  //   component: () => import('@/views/DownloadsView.vue')
  // },
  {
    path: "/contact",
    name: "contact",
    component: ContactView,
  },
  // 购物车
  {
    path: "/cart",
    name: "cart",
    component: () => import("../views/ShoppingCart/Index.vue"),
  },
  // 404
  {
    path: "/404",
    name: "404",
    component: () => import("@/views/404/index.vue"),
  },
  {
    path: "/:pathMatch(.*)*",
    redirect: "/404",
  },
];
