<template>
  <div class="filter-page">
    <el-card class="filter-card" :body-style="{ padding: '20px' }">
      <template #header>
        <div class="clearfix">
          <span>筛选器</span>
        </div>
      </template>

      <!-- 筛选表单 -->
      <el-form :model="filter" class="filter-form" label-width="120px">
        <!-- 文本筛选 -->
        <el-form-item label="用户名">
          <el-input
            v-model="filter.username"
            placeholder="请输入用户名"
            clearable
          />
        </el-form-item>

        <!-- 下拉选择 -->
        <el-form-item label="状态">
          <el-select v-model="filter.status" placeholder="请选择状态">
            <el-option label="启用" value="enabled" />
            <el-option label="禁用" value="disabled" />
          </el-select>
        </el-form-item>

        <!-- 日期范围筛选 -->
        <el-form-item label="注册日期">
          <el-date-picker
            v-model="filter.dateRange"
            type="daterange"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            :picker-options="datePickerOptions"
            clearable
          />
        </el-form-item>

        <!-- 搜索按钮 -->
        <el-form-item>
          <el-button type="primary" @click="handleSearch">搜索</el-button>
          <el-button @click="resetForm">重置</el-button>
        </el-form-item>
      </el-form>

      <!-- 搜索结果 -->
      <div class="search-results">
        <h3>搜索结果</h3>
        <!-- 全选按钮 -->
        <el-button @click="toggleSelectAll">{{
          selectAll ? "取消全选" : "全选"
        }}</el-button>
        <el-table
          :data="filteredData"
          style="width: 100%"
          border
          ref="table"
          v-model:selection="selectedRows"
        >
          <!-- 选择框 -->
          <el-table-column type="selection" width="55" />

          <el-table-column prop="username" label="用户名" width="150" />
          <el-table-column prop="status" label="状态" width="180" />
          <el-table-column prop="registrationDate" label="注册日期" />
        </el-table>
      </div>
    </el-card>
  </div>
</template>

<script setup>
import { ref } from "vue";

// 筛选器数据
const filter = ref({
  username: "",
  status: "",
  dateRange: [],
});

// 模拟的数据
const data = [
  { username: "张三", status: "enabled", registrationDate: "2022-01-01" },
  { username: "李四", status: "disabled", registrationDate: "2022-02-01" },
  { username: "王五", status: "enabled", registrationDate: "2022-03-01" },
  { username: "赵六", status: "disabled", registrationDate: "2022-04-01" },
];

// 筛选后的数据
const filteredData = ref(data);

// 被选中的行数据
const selectedRows = ref([]);

// 控制全选/取消全选按钮
const selectAll = ref(false);

// 日期选择的限制选项
const datePickerOptions = {
  disabledDate(time) {
    return time.getTime() > Date.now(); // 禁止选择未来日期
  },
};

// 搜索操作
const handleSearch = () => {
  filteredData.value = data.filter((item) => {
    const matchesUsername = item.username.includes(filter.value.username);
    const matchesStatus = filter.value.status
      ? item.status === filter.value.status
      : true;
    const matchesDateRange =
      filter.value.dateRange.length === 2
        ? new Date(item.registrationDate) >=
            new Date(filter.value.dateRange[0]) &&
          new Date(item.registrationDate) <= new Date(filter.value.dateRange[1])
        : true;
    return matchesUsername && matchesStatus && matchesDateRange;
  });
};

// 重置筛选器
const resetForm = () => {
  filter.value = { username: "", status: "", dateRange: [] };
  filteredData.value = data; // 重置为原始数据
  selectedRows.value = []; // 清除选中的项
  selectAll.value = false; // 重置全选状态
};

// 切换全选状态
const toggleSelectAll = () => {
  if (selectAll.value) {
    selectedRows.value = [];
  } else {
    selectedRows.value = filteredData.value;
  }
  selectAll.value = !selectAll.value;
};

// 自定义选择器
/*const selectable = (row) => {
  return true; // 允许所有行都可以被选中
};*/
</script>

<style scoped>
.filter-page {
  margin: 20px;
}

.filter-card {
  padding: 20px;
}

.filter-form {
  margin-bottom: 20px;
}

.search-results {
  margin-top: 20px;
}
</style>
