<template>
  <div class="h100">
    <el-table ref="table" class="b-table" :data="tableData" v-bind="{ stripe: true, border: true, height, ...$attrs }" v-on="$listeners">
      <template v-for="column in columns">
        <el-table-column v-if="!column.slotName" :key="column.id" v-bind="{ align: 'center', ...column }">
        </el-table-column>
        <el-table-column v-else :key="column.id" v-bind="{ align: 'center', ...column }">
          <template slot-scope="scope">
            <slot :name="column.slotName" v-bind="scope" />
          </template>
        </el-table-column>
      </template>
    </el-table>
    <!-- 表格与分页的间距 -->
    <div v-if="showPagination" ref="midHolder" class="mid-holder" :style="'height:' + midHeight"></div>
    <el-pagination v-if="showPagination" ref="pagination" class="b-pagination" :currentPage.sync="currentPage" :pageSize.sync="pageSize" v-bind="{ total, pageSizes, layout }" v-on="pageListeners" @size-change="paginationChange('sizeChange')" @current-change="paginationChange('currentChange')">
      <!-- 分页插槽, 需要先启用layout属性中的slot才会显示-->
      <slot name="pageSlot" />
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
    data: {
      type: Array,
      required: true
    },
    showPagination: {
      type: Boolean,
      default: false
    },
    //是否前端分页
    frontEndPagination: {
      type: Boolean,
      default: false
    },
    pageAttrs: Object,
    pageListeners: Object,
    midHeight: {
      type: String,
      default: '10px'
    }
  },
  data() {
    return {
      tableData: [],
      height: undefined,
      currentPage: 1,
      pageSize: 10,
      total: 0,
      pageSizes: [10, 20, 30, 40],
      layout: 'total, sizes, prev, pager, next, jumper, slot',
      // pageAttrsBak: ''
    }
  },
  watch: {
    pageAttrs: {
      handler(val) {
        //由于深度watch对象时,Vue 不会保留变异之前值的副本, 因此需要手动备份旧值
        for (const key in val) {
          if (val.hasOwnProperty(key)) {
            if (this[key] != val[key]) {
              this[key] = val[key]
            }
            // if (this.pageAttrsBak) {
            //   if (this.pageAttrsBak[key] !== val[key]) {
            //     this[key] = val[key];
            //   }
            // } else {
            //   this[key] = val[key];
            // }
          }
        }
        // this.pageAttrsBak = JSON.parse(JSON.stringify(val))
      },
      immediate: true,
      deep: true,
    }
  },
  methods: {
    // 由于el-table和分页都有current-change事件, 所以自定义为page-change事件
    //为了兼容旧版, 觉定不使用.sync, 在组建内部手动更新
    paginationChange(eventType) {
      const { currentPage, pageSize, total } = this
      this.$emit('page-change', { currentPage, pageSize, total }, eventType)
    },
  },
  created() {
    if (!this.frontEndPagination) {
      this.tableData = this.data
    } else {
      const { currentPage, pageSize } = this
      if (isNaN(currentPage) || isNaN(pageSize)) { return }
      let start = (currentPage - 1) * pageSize
      let end = start + pageSize
      this.tableData = this.data.slice(start, end)
    }
    console.log(this.data, this.tableData);
  },
  mounted() {
    if (this.showPagination && this.$refs.pagination) {
      let paginationHeight = this.$refs.pagination.$el.clientHeight
      let midHolderHeight = this.$refs.midHolder.clientHeight
      let footHeight = paginationHeight + midHolderHeight
      this.height = `calc(100% - ${footHeight}px)`
    } else {
      this.height = '100%'
    }
  }
}
</script>