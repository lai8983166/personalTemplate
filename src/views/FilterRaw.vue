<template>
  <div class="filter-page">
    <!-- 筛选表单 -->
    <div class="filter-form">
      <div class="form-item">
        <label for="username">用户名：</label>
        <input
          id="username"
          v-model="filter.username"
          type="text"
          placeholder="请输入用户名"
        />
      </div>

      <div class="form-item">
        <label for="status">状态：</label>
        <select id="status" v-model="filter.status">
          <option value="">全部</option>
          <option value="enabled">启用</option>
          <option value="disabled">禁用</option>
        </select>
      </div>

      <div class="form-item">
        <label>注册日期：</label>
        <input v-model="filter.startDate" type="date" />
        <span class="date-sep">—</span>
        <input v-model="filter.endDate" type="date" />
      </div>

      <div class="form-actions">
        <button @click="handleSearch">搜索</button>
        <button @click="resetForm" type="button">重置</button>
      </div>
    </div>

    <!-- 搜索结果表格 -->
    <div class="results">
      <table class="result-table">
        <thead>
          <tr>
            <th>用户名</th>
            <th>状态</th>
            <th>注册日期</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, idx) in filteredData" :key="idx">
            <td>{{ item.username }}</td>
            <td>{{ item.status === "enabled" ? "启用" : "禁用" }}</td>
            <td>{{ item.registrationDate }}</td>
          </tr>
          <tr v-if="filteredData.length === 0">
            <td colspan="3" class="no-data">暂无符合条件的数据</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

// 筛选条件
const filter = ref({
  username: "",
  status: "",
  startDate: "",
  endDate: "",
});

// 模拟的原始数据
const data = [
  { username: "张三", status: "enabled", registrationDate: "2022-01-01" },
  { username: "李四", status: "disabled", registrationDate: "2022-02-15" },
  { username: "王五", status: "enabled", registrationDate: "2022-03-20" },
  { username: "赵六", status: "disabled", registrationDate: "2022-04-10" },
];

// 响应式存放过滤后的数据
const filteredData = ref([...data]);

// 搜索方法
function handleSearch() {
  filteredData.value = data.filter((item) => {
    // 用户名包含
    const okName = item.username.includes(filter.value.username.trim());
    // 状态匹配
    const okStatus = filter.value.status
      ? item.status === filter.value.status
      : true;
    // 日期范围匹配
    let okDate = true;
    if (filter.value.startDate) {
      okDate =
        okDate &&
        new Date(item.registrationDate) >= new Date(filter.value.startDate);
    }
    if (filter.value.endDate) {
      okDate =
        okDate &&
        new Date(item.registrationDate) <= new Date(filter.value.endDate);
    }
    return okName && okStatus && okDate;
  });
}

// 重置表单
function resetForm() {
  filter.value = { username: "", status: "", startDate: "", endDate: "" };
  filteredData.value = [...data];
}
</script>

<style scoped>
.filter-page {
  max-width: 800px;
  margin: 40px auto;
  padding: 0 20px;
}

.filter-form {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  margin-bottom: 30px;
  background: #f9f9f9;
  padding: 20px;
  border-radius: 6px;
}

.form-item {
  display: flex;
  align-items: center;
  gap: 8px;
}

.form-item label {
  white-space: nowrap;
}

.date-sep {
  margin: 0 8px;
}

.form-actions {
  display: flex;
  align-items: center;
  gap: 12px;
}

.form-actions button {
  padding: 6px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.form-actions button:first-child {
  background-color: #409eff;
  color: #fff;
}

.form-actions button:last-child {
  background-color: #e0e0e0;
}

.results {
  overflow-x: auto;
}

.result-table {
  width: 100%;
  border-collapse: collapse;
}

.result-table th,
.result-table td {
  padding: 12px;
  border: 1px solid #ddd;
  text-align: left;
}

.result-table th {
  background-color: #f4f4f4;
}

.no-data {
  text-align: center;
  color: #888;
  font-style: italic;
}
</style>
