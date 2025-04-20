<template>
  <ul class="list-container">
    <li
      v-for="item in props.itemList"
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

const props = defineProps({
  itemList: Array,
});

console.log(props.itemList);

//const items = ref([...props.itemList]);
const router = useRouter();
const handleItemClick = (item) => {
  router.push({ name: item.route });
};
</script>

<style scoped>
.list-container {
  margin: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  list-style: none; /* 取消所有默认的 marker（包括小黑点、数字等） */
  padding-left: 0; /* 同时把左侧的缩进也清掉，避免空出一大片空白 */
  margin: 0; /* 如果需要，也可以去掉默认的外边距 */
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
