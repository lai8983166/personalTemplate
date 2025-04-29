<template>
  <div class="sorting-page">
    <table class="data-table">
      <thead>
        <tr>
          <th @click="sortBy('id')">
            ID
            <span v-if="sortField === 'id'">{{
              sortOrder === "asc" ? "↑" : "↓"
            }}</span>
          </th>
          <th @click="sortBy('name')">
            Name
            <span v-if="sortField === 'name'">{{
              sortOrder === "asc" ? "↑" : "↓"
            }}</span>
          </th>
          <th @click="sortBy('value')">
            Value
            <span v-if="sortField === 'value'">{{
              sortOrder === "asc" ? "↑" : "↓"
            }}</span>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in sortedData" :key="item.id">
          <td>{{ item.id }}</td>
          <td>{{ item.name }}</td>
          <td>{{ item.value }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";

// 原始数据列表
const items = ref([]);
// 当前排序字段和顺序
const sortField = ref("");
const sortOrder = ref("asc");

// 初始化数据
function generateData() {
  const list = [];
  for (let i = 1; i <= 20; i++) {
    list.push({
      id: i,
      name: `Item ${i}`,
      value: Math.floor(Math.random() * 100),
    });
  }
  items.value = list;
}

// 切换排序逻辑
function sortBy(field) {
  if (sortField.value === field) {
    sortOrder.value = sortOrder.value === "asc" ? "desc" : "asc";
  } else {
    sortField.value = field;
    sortOrder.value = "asc";
  }
}

// 计算排序后的数据
const sortedData = computed(() => {
  if (!sortField.value) {
    return items.value;
  }
  return [...items.value].sort((a, b) => {
    const aVal = a[sortField.value];
    const bVal = b[sortField.value];
    if (typeof aVal === "number" && typeof bVal === "number") {
      return sortOrder.value === "asc" ? aVal - bVal : bVal - aVal;
    }
    return sortOrder.value === "asc"
      ? String(aVal).localeCompare(String(bVal))
      : String(bVal).localeCompare(String(aVal));
  });
});

onMounted(generateData);
</script>

<style scoped>
.sorting-page {
  max-width: 600px;
  margin: 20px auto;
  font-family: Arial, sans-serif;
}

.data-table {
  width: 100%;
  border-collapse: collapse;
}

.data-table th,
.data-table td {
  padding: 8px;
  border: 1px solid #ccc;
  text-align: left;
  cursor: pointer;
}

.data-table th {
  background-color: #f9f9f9;
  user-select: none;
}

.data-table th span {
  margin-left: 4px;
  font-size: 12px;
}

.data-table tbody tr:nth-child(even) {
  background-color: #f5f5f5;
}
</style>
