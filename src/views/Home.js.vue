<template>
  <ul class="list-container">
    <li
      v-for="item in items"
      :key="item.route"
      class="item-card"
      @click="handleItemClick(item)"
    >
      <div class="card-header">{{ item.name }}</div>
    </li>
  </ul>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
const router = useRouter();
const items = ref([
  { name: "筛选器", route: "filterSele" },
  { name: "分页", route: "paginationSele" },
  { name: "排序", route: "sortSele" },
  { name: "带有验证的表单", route: "formSele" },
  { name: "图片上传", route: "picuploadSele" },
  { name: "图标", route: "icons" },
  { name: "实时聊天", route: "chat" },
  { name: "拖拽", route: "drag" },
]);

/*const handleItemClick = (item) => {
  router.push({ name: item.route });
};*/
const handleItemClick = (item) => {
  router.push({
    name: "Selection", // 你的路由名称
    params: { pageType: item.route }, // 把 item.route 当作 pageType 传进去
  });
};
</script>

<style scoped>
.list-container {
  margin: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.item-card {
  cursor: pointer;
  padding: 10px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.item-card:hover {
  transform: scale(1.05);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
}

.card-header {
  font-weight: bold;
  color: #409eff;
}

.card-content p {
  margin: 10px 0;
}
</style>
