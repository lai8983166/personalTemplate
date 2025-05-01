<template>
  <SeleList :itemList="filterList" />
</template>
<script setup>
import { ref } from "vue";
import SeleList from "../components/SeleList.vue";
import { useRoute } from "vue-router";

const route = useRoute();

const pageType = route.params.pageType;
const type = pageType.replace(/Sele$/, "");
console.log(type);
const filterList = ref([
  { name: "ElementPlus", route: `${type}_elemnetuiplus` },
  { name: "raw", route: `${type}_raw` },
]);
</script>
