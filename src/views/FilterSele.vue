<template>
  <div>
    <SeleList :itemList="filterRawList"></SeleList>
  </div>
</template>
<script setup>
import { ref } from "vue";
import SeleList from "../components/SeleList.vue";
//import router from "../router";
const filterRawList = ref([
  { name: "elementui-plus", route: "filter_elemnetuiplus" },
  { name: "raw", route: "filter_raw" },
]);
</script>
