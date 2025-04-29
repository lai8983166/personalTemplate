<template>
  <div class="pagination-page">
    <table class="data-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in pagedData" :key="item.id">
          <td>{{ item.id }}</td>
          <td>{{ item.name }}</td>
        </tr>
      </tbody>
    </table>

    <div class="pagination">
      <button
        class="page-btn"
        :disabled="currentPage === 1"
        @click="goToPage(currentPage - 1)"
      >
        Prev
      </button>

      <button
        v-for="page in totalPages"
        :key="page"
        class="page-btn"
        :class="{ active: page === currentPage }"
        @click="goToPage(page)"
      >
        {{ page }}
      </button>

      <button
        class="page-btn"
        :disabled="currentPage === totalPages"
        @click="goToPage(currentPage + 1)"
      >
        Next
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";

// 模拟数据
const totalItems = 95;
const allItems = Array.from({ length: totalItems }, (_, i) => ({
  id: i + 1,
  name: `Item ${i + 1}`,
}));

const currentPage = ref(1);
const pageSize = ref(10);

const totalPages = computed(() => Math.ceil(totalItems / pageSize.value));

// 计算当前页数据
const pagedData = computed(() => {
  const start = (currentPage.value - 1) * pageSize.value;
  return allItems.slice(start, start + pageSize.value);
});

function goToPage(page) {
  if (page < 1 || page > totalPages.value) return;
  currentPage.value = page;
}

onMounted(() => {
  // 可以在这里替换为真实的 API 请求
});
</script>

<style scoped>
.pagination-page {
  max-width: 600px;
  margin: 20px auto;
  font-family: Arial, sans-serif;
}

.data-table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 10px;
}

.data-table th,
.data-table td {
  border: 1px solid #ccc;
  padding: 8px;
  text-align: left;
}

.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 4px;
}

.page-btn {
  padding: 6px 12px;
  border: 1px solid #007bff;
  background-color: #fff;
  color: #007bff;
  cursor: pointer;
  border-radius: 4px;
  transition: background-color 0.2s;
}

.page-btn:disabled {
  border-color: #ddd;
  color: #ddd;
  cursor: not-allowed;
}

.page-btn.active {
  background-color: #007bff;
  color: #fff;
}

.page-btn:not(:disabled):hover {
  background-color: #e6f0ff;
}
</style>
