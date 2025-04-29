<template>
  <div>
    <!-- el-config-provider 用于为其子组件提供 Element Plus 的全局配置，包括主题、尺寸及国际化文本等 -->
    <!--
  el-config-provider 用于为其子组件提供 Element Plus 的全局配置
  仅会影响其包裹的后代组件（即 <el-config-provider> 内部的组件），
  不会对其外部的其他元素产生影响。
-->
    <el-config-provider :locale="paginationLocale">
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="id" label="ID" width="80" />
        <el-table-column prop="name" label="Name" />
      </el-table>
      <el-pagination
        background
        layout="prev, pager, next, jumper, ->,total, sizes"
        :current-page="query.page"
        :page-sizes="[10, 20, 50, 100]"
        :page-size="query.pageSize"
        :total="total"
        @current-change="handlePageChange"
        @size-change="handleSizeChange"
        prev-text="上一页"
        next-text="下一页"
      /><!--可以通过prev-text和next-text属性来把默认的图标修改成文本-->
    </el-config-provider>
  </div>
</template>

<script setup>
import { reactive, ref, onMounted } from "vue";
import en from "element-plus/es/locale/lang/en";

// paginationLocale 对象构造说明：
// ...en        —— 将 en 对象的所有顶层属性复制到 paginationLocale
// el: { ... }  —— 重写 en.el 下的配置
//   ...en.el         —— 复制 en.el 所有默认组件文案
//   pagination: { }  —— 在复制的基础上，覆盖 pagination 组件的文案字段
const paginationLocale = {
  ...en,
  el: {
    ...en.el,
    pagination: {
      ...en.el.pagination,
      // 使用字符串模板替换，Element Plus 内部会调用 replace('{total}', total)
      total: "Total {total} 个条目",
      // 自定义 jumper 前缀文字
      goto: "Go to",
      // 自定义 jumper 后缀文字
      pageClassifier: " page",
      // prev 用于左侧翻页按钮的 aria-label 文案（无障碍提示和 tooltip），实际按钮默认为图标
      // aria-label 是 HTML 属性，用于为不可见的控件或图标提供可访问的文本说明，
      // 帮助屏幕阅读器等辅助工具让视障用户了解控件功能；
      // 同时也是按钮悬浮时显示的 tooltip 文本。
      prev: "Previous",
      // next 同理，用于右侧翻页按钮的 aria-label 文案
      next: "Next",
    },
  },
};

// 模拟获取数据接口
const fetchData = async (page, pageSize) => {
  const totalItems = 95;
  const items = Array.from({ length: totalItems }, (_, i) => ({
    id: i + 1,
    name: `Item ${i + 1}`,
  }));
  const start = (page - 1) * pageSize;
  const end = start + pageSize;
  return {
    items: items.slice(start, end),
    total: totalItems,
  };
};

const query = reactive({
  page: 1,
  pageSize: 10,
});

const tableData = ref([]);
const total = ref(0);

const loadData = async () => {
  const { items, total: t } = await fetchData(query.page, query.pageSize);
  tableData.value = items;
  total.value = t;
};

const handlePageChange = (page) => {
  query.page = page;
  loadData();
};

const handleSizeChange = (size) => {
  query.pageSize = size;
  query.page = 1;
  loadData();
};

onMounted(loadData);
</script>

<style scoped>
/* 根据需要添加自定义样式 */
</style>
