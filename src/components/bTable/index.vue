<template>
  <div class="h100">
    <el-table v-bind="{ stripe: true, border: true, ...$attrs }" v-on="$listeners" height="calc(100% - 32px)">
      <template v-for="column in columns">
        <el-table-column v-if="!column.colSlot" :key="column.id" v-bind="{ align: 'center', ...column }">
        </el-table-column>
        <el-table-column v-else :key="column.id" v-bind="{ align: 'center', ...column }">
          <template slot-scope="scope">
            <slot :name="column.colSlot" v-bind="scope" />
          </template>
        </el-table-column>
      </template>
    </el-table>
    <el-pagination class="b-pagination" v-bind="{ currentPage, pageSize, total, pageSizes, layout, ...pagination.attrs }" v-on="pagination.listeners" @size-change="handleSizeChange" @current-change="handleCurrentChange">
      <!-- 给分页预留的插槽, 首先要在el-pagination的layout属性中配置slot字段, 然后再在b-table中写入插槽实际内容 -->
      <slot />
    </el-pagination>
  </div>
</template>

<script>
export default {
  props: {
    columns: {
      type: Array,
      required: true
    },
    pagination: {
      type: Object,
      default: () => ({}),
    }
  },
  data() {
    return {
      currentPage: 1,
      pageSize: 10,
      total: 100,
      pageSizes: [10, 20, 30, 40],
      layout: "total, sizes, prev, pager, next, jumper, slot",
    }
  },
  methods: {
    handleSizeChange(pageSize) {
      this.pageSize = pageSize
      this.pagination.refreshFun()
    },
    handleCurrentChange(currentPage) {
      this.currentPage = currentPage
      this.pagination.refreshFun()
    },
  },
  mounted() {
    console.log(this.pagination);
  }
}
</script>
<style scoped>
.b-pagination {
  background-color: white;
  text-align: right;
}
</style>
