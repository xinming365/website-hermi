import ContactView from "../views/ContactView.vue";
// import ProductView from '../views/ProductView.vue'

export const dynamicRoutes = [
  {
    path: "/downloads",
    name: "about",
    // route level code-splitting
    // this generates a separate chunk (About.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import("../views/AboutView.vue"),
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
    props: (route) => ({
      id: route.params.id,
      sid: route.query.sid,
      tid: route.query.tid,
    }),
  },
  // {
  //   path: '/daili',
  //   name: 'daili',
  //   component: () => import('@/views/DailiView.vue')
  // },
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