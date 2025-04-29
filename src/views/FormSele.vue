<template>
  <div>
    <SeleList :itemList="filterList"></SeleList>
  </div>
</template>
<script setup>
import { ref } from "vue";
import SeleList from "../components/SeleList.vue";
//import router from "../router";
const filterList = ref([
  { name: "elementui-plus", route: "form_elemnetuiplus" },
  { name: "raw", route: "form_raw" },
]);
</script>
