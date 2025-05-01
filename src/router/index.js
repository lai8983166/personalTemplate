import { createRouter, createWebHistory } from "vue-router";

// 导入组件
import Home from "../views/Home.js.vue";
//import FilterPage from "../views/Filter.vue";

import FilterRaw from "../views/FilterRaw.vue";
import Filter from "../views/Filter.vue";

import Pagination from "../views/Pagination.vue";
import PaginationRaw from "../views/PaginationRaw.vue";

import Sort from "../views/Sort.vue";
import SortRaw from "../views/SortRaw.vue";

import Form from "../views/Form.vue";
import FormRaw from "../views/FormRaw.vue";

import Selection from "../views/Selection.vue";

//import PaginationPage from
// 导入其他页面组件

// 配置路由
const routes = [
  {
    path: "/",
    name: "home",
    component: Home,
  },
  {
    path: "/:pageType",
    name: "Selection",
    component: Selection,
    props: true,
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
    path: "/formSele/form_elemnetuiplus",
    name: "form_elemnetuiplus",
    component: Form,
  },
  {
    path: "/formSele/form_raw",
    name: "form_raw",
    component: FormRaw,
  },
  {
    path: "/picuploadSele/picupload_elemnetuiplus",
    name: "picupload_elemnetuiplus",
    component: () => import("../views/Picupload.vue"),
  },
  {
    path: "/picuploadSele/picupload_raw",
    name: "picupload_raw",
    component: () => import("../views/PicuploadRaw.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
