import { createRouter, createWebHistory } from "vue-router";

// 导入组件
import Home from "../views/Home.js.vue";
//import FilterPage from "../views/Filter.vue";
import FilterSele from "../views/FilterSele.vue";
import FilterRaw from "../views/FilterRaw.vue";
import Filter from "../views/Filter.vue";
//import PaginationPage from
// 导入其他页面组件

// 配置路由
const routes = [
  {
    path: "/",
    name: "home",
    component: Home, // 首页组件
  },
  {
    path: "/filterSele",
    name: "filterSele",
    component: FilterSele, // 筛选器页面
  },
  {
    path: "/filterSele/filter_elemnetuiplus",
    name: "filter_elemnetuiplus",
    component: Filter, // 筛选器页面
  },
  {
    path: "/filterSele/filter_raw",
    name: "filter_raw",
    component: FilterRaw, // 筛选器页面
  },
  // 添加更多路由
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
