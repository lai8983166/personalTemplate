<template>
  <div class="sorting-page">
    <el-table :data="tableData" @sort-change="handleSort" style="width: 100%">
      <el-table-column prop="id" label="ID" width="80" sortable="custom">
      </el-table-column>
      <el-table-column prop="name" label="Name" sortable="custom">
      </el-table-column>
      <el-table-column prop="value" label="Value" sortable="custom">
      </el-table-column>
    </el-table>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";

// 原始数据
const originalData = ref([]);
const tableData = ref([]);

// 初始化数据
function generateData() {
  const items = [];
  for (let i = 1; i <= 20; i++) {
    items.push({
      id: i,
      name: `Item ${i}`,
      value: Math.floor(Math.random() * 100),
    });
  }
  originalData.value = items;
  tableData.value = items.slice();
}

// 排序处理
function handleSort({ prop, order }) {
  if (!order) {
    // 清除排序时恢复原始顺序
    tableData.value = originalData.value.slice();
    return;
  }
  const sorted = originalData.value.slice().sort((a, b) => {
    const aVal = a[prop];
    const bVal = b[prop];
    if (typeof aVal === "number" && typeof bVal === "number") {
      return order === "ascending" ? aVal - bVal : bVal - aVal;
    }
    return order === "ascending"
      ? String(aVal).localeCompare(String(bVal))
      : String(bVal).localeCompare(String(aVal));
  });
  tableData.value = sorted;
}

onMounted(() => {
  generateData();
});
</script>

<style scoped>
.sorting-page {
  max-width: 800px;
  margin: 20px auto;
}
</style>
