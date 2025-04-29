import { createRouter, createWebHistory } from "vue-router";

// 导入组件
import Home from "../views/Home.js.vue";
//import FilterPage from "../views/Filter.vue";
import FilterSele from "../views/FilterSele.vue";
import FilterRaw from "../views/FilterRaw.vue";
import Filter from "../views/Filter.vue";
import PaginationSele from "../views/PaginationSele.vue";
import Pagination from "../views/Pagination.vue";
import PaginationRaw from "../views/PaginationRaw.vue";
import SortSele from "../views/SortSele.vue";
import Sort from "../views/Sort.vue";
import SortRaw from "../views/SortRaw.vue";
import FormSele from "../views/FormSele.vue";
import Form from "../views/Form.vue";
import FormRaw from "../views/FormRaw.vue";

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
    component: Filter,
  },
  {
    path: "/filterSele/filter_raw",
    name: "filter_raw",
    component: FilterRaw,
  },
  {
    path: "/paginationSele",
    name: "paginationSele",
    component: PaginationSele, // 分页页面
  },
  {
    path: "/paginationSele/pagination_elemnetuiplus",
    name: "pagination_elemnetuiplus",
    component: Pagination,
  },
  {
    path: "/paginationSele/pagination_raw",
    name: "pagination_raw",
    component: PaginationRaw,
  },
  {
    path: "/sortSele",
    name: "sortSele",
    component: SortSele, // 排序页面
  },
  {
    path: "/sortSele/sort_elemnetuiplus",
    name: "sort_elemnetuiplus",
    component: Sort,
  },
  {
    path: "/sortSele/sort_raw",
    name: "sort_raw",
    component: SortRaw,
  },
  {
    path: "/formSele",
    name: "formSele",
    component: FormSele, // 表单页面
  },
  {
    path: "/formSele/form_elemnetuiplus",
    name: "form_elemnetuiplus",
    component: Form,
  },
  {
    path: "/formSele/form_raw",
    name: "form_raw",
    component: FormRaw,
  },
  // 添加更多路由
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
