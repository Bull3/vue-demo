<template>
  <div class="list-one mini" ref="listone">
    <!-- 头部 -->
    <div class="l-o-h">
      <svg-icon icon-class="setting" class="main-icon fl" />
      <span class="title fl">业务对象名称 {{ mnum }}</span>
      <div class="fr right-icon-box">
        <span class="right-icon" :class="{ 'is-active': filterIsShow }" @click="filterIsShow = !filterIsShow">
          <svg-icon icon-class="list-one-filter" />
        </span>
        <span class="right-icon" :class="{ 'is-active': searchIsShow }" @click="searchIsShow = !searchIsShow">
          <svg-icon icon-class="list-one-search" />
        </span>
        <el-dropdown trigger="click" class="right-dropdown" @visible-change="e => (dropdownIsShow = e)" :class="{ 'is-active': dropdownIsShow }" :hide-on-click="false">
          <span class="el-dropdown-link">
            <span class="menu" :class="{ dropdownIsShow: dropdownIsShow }">
              <svg-icon icon-class="menu" class="menu-icon" />
            </span>
            <span class="text">视图</span>
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown" class="l-o-h-m-dropdown">
            <el-dropdown-item disabled>当前名称</el-dropdown-item>
            <el-dropdown-item divided disabled>其他视图</el-dropdown-item>
            <el-dropdown-item>
              <svg-icon icon-class="list-one-radius" class="radius" />视图1
            </el-dropdown-item>
            <el-dropdown-item>
              <svg-icon icon-class="list-one-radius" class="radius" />视图2
            </el-dropdown-item>
            <el-dropdown-item>
              <svg-icon icon-class="list-one-radius" class="radius" />视图3
            </el-dropdown-item>
            <el-dropdown-item divided disabled>管理</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
    <!-- 弹框部分 -->
    <div class="l-o-dialog" v-if="searchIsShow || filterIsShow">
      <div class="l-o-search" v-if="searchIsShow" :class="{ 'mb-10': filterIsShow }">
        <div class="text" :class="uiSize">快捷查询：</div>
        <div class="search-box">
          <div class="search-bd">
            <el-select :size="uiSize" class="enter-one" v-model="defaultSearchData.v1" placeholder="请选择字段1">
              <el-option v-for="op1 of v1Data" :key="op1.value" :label="op1.label" :value="op1.value"></el-option>
            </el-select>
            <el-select :size="uiSize" v-model="defaultSearchData.v2" class="enter-two" placeholder="请选择字段2">
              <el-option v-for="op1 of v1Data" :key="op1.value" :label="op1.label" :value="op1.value"></el-option>
            </el-select>
            <el-input :size="uiSize" v-model="defaultSearchData.v3" class="enter-three" placeholder="请选择字段3"></el-input>
            <div class="btn" :class="{'is-expend':searchIsExpend,'small':uiSize==='small'}" @click="searchIsExpend = !searchIsExpend">
              <i class="el-icon-d-arrow-right"></i>
            </div>
            <el-button class="one-btn" type="primary" @click="onSarch" :size="uiSize">查询</el-button>
            <el-button type="primary" :size="uiSize">保存</el-button>
            <el-button type="primary" @click="onReset" :size="uiSize">重置</el-button>
          </div>
          <!-- 更多搜索 -->
          <div class="search-more" v-if="searchIsExpend">
            <div class="zw-div" :class="uiSize"></div>
            <div class="all-div" :class="uiSize">
              <template v-for="(item, inx) of searchDatas">
                <div style="margin-bottom:3px" :key="'search_' + inx">
                  <el-select :size="uiSize" class="enter-one" v-model="item.v1" placeholder="请选择字段1">
                    <el-option v-for="op1 of v1Data" :key="op1.value" :label="op1.label" :value="op1.value"></el-option>
                  </el-select>
                  <el-select :size="uiSize" v-model="item.v2" class="enter-two" placeholder="请选择字段2">
                    <el-option v-for="op1 of v1Data" :key="op1.value" :label="op1.label" :value="op1.value"></el-option>
                  </el-select>
                  <el-input :size="uiSize" v-model="item.v3" class="enter-three" placeholder="请选择字段3"></el-input>
                  <div class="btn" :class="uiSize" @click="fn.searchDeleteTj(inx)">
                    <i class="el-icon-remove-outline"></i>
                  </div>
                </div>
              </template>
              <div style="padding-bottom:3px">
                <el-dropdown trigger="click" @command="fn.searchAddTj">
                  <span class="el-dropdown-link">
                    <i class="el-icon-circle-plus-outline"></i>
                    添加条件
                    <i class="el-icon-arrow-down el-icon--right"></i>
                  </span>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item v-for="(op1, inx) of v1Data" :command="op1.value" :key="inx">{{ op1.label }}</el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="l-o-filter" :class="uiSize" v-if="filterIsShow">1</div>
    </div>
    <div class="l-o-c" :class="{
        'show-one':
          (searchIsShow && !filterIsShow) || (filterIsShow && !searchIsShow),
        'show-All': searchIsShow && filterIsShow,
        small: uiSize === 'small'
      }">
      <!-- 树 -->
      <div class="l-o-tree h100" v-if="leftTreeBoxIsShow" :class="{ treeIsFlod: treeIsFlod, tableIsFlod: tableIsFlod }">
        <el-row class="l-o-t-h">
          <span @click="fn.addTreeGroup">新增组</span>
          <span @click="fn.editTreeGroup">编辑组</span>
          <span @click="fn.deleteTreeGroup">删除组</span>
          <span>···</span>
        </el-row>
        <el-row class="l-o-t-m">
          <el-input placeholder="输入关键字进行过滤" class="mb-10" v-model="filterText"></el-input>
          <el-tree :props="treeProps" :data="treeData" :show-checkbox="showTreeCheckbox" @node-click="fn.treeNodeClick" @check-change="fn.treeNodeSelect" :expand-on-click-node="false" :filter-node-method="fn.filterNode" node-key="id" ref="tree">
            <span class="custom-tree-node" slot-scope="{ node, data }">
              <span>{{ node.label }}</span>
              <span>{{ data.list1 }}</span>
            </span>
          </el-tree>
        </el-row>
        <div class="l-o-t-x">
          <span class="x-one" @click="fn.foldTree">
            <i class="el-icon-caret-left"></i>
          </span>
          <span>
            <i class="el-icon-caret-right" @click="fn.foldTable"></i>
          </span>
        </div>
      </div>
      <!-- 表格 -->
      <div class="l-o-table h100" :class="{
          'show-tree': leftTreeBoxIsShow,
          tableIsFlod: tableIsFlod,
          treeIsFlod: treeIsFlod
        }">
        <el-table :size="uiSize" border :class="{alb:$store.getters.alb,'ccc':tableDataFn}" :data="tableData.data" height="calc(100% - 34px)" style="margin-bottom:5px;" :highlight-current-row="true" @current-change="tableCurrentChange" @selection-change="v => (tableSelectDatas = v)">
          <el-table-column type="selection" width="40" align="center"></el-table-column>
          <el-table-column :show-overflow-tooltip="true" v-for="item of tableData.columns" :prop="item.code" :label="item.name" :key="item.code" :width="item.width" :fixed="item.fixed" v-if="item.show">
          </el-table-column>
        </el-table>
        <el-pagination @size-change="pageChange('size', $event)" @current-change="pageChange('current', $event)" :current-page="pageAction.page" :page-sizes="paginationData.pageSizes" :page-size="pageAction.size" :layout="myLayout" :total="paginationData.total" background>
          <span class="first-pager fl">共 {{ paginationData.total }} 条记录 第 {{ pageAction.page }} /
            {{ Math.ceil(paginationData.total / pageAction.size) }} 页</span>
        </el-pagination>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop, Watch } from "vue-property-decorator";
// 拿测试数据
import { v1Data } from "@/api/listOneApi";
import { log } from "@/utils";
// 引入事件
import { methods, searchData } from "./methods";
@Component
export default class listOne extends Vue {
  @Prop() mnum!: string;
  @Prop() layout?: string;
  // 模板ui
  get uiSize() {
    return this.$store.getters.uiSize;
  }
  // 列表layout
  get listLayout() {
    return this.$store.getters.listLayout;
  }

  myLayout: string = "";
  dropdownIsShow: boolean = false;
  filterIsShow: boolean = false;
  searchIsShow: boolean = false;
  searchIsExpend: boolean = false;
  // 过滤1的数据
  v1Data: any = v1Data();
  // 默认搜索条件
  defaultSearchData: any = new searchData();
  // 更多搜索条件
  searchDatas: any = [];
  // ********** 树声明 beg **********
  // 左边树是否显示
  leftTreeBoxIsShow: boolean = false;
  // 树多选框是否开启
  showTreeCheckbox: boolean = true;
  // 树数据
  treeData: any = [
    {
      name: "region1",
      list1: "region列1",
      id: "1",
      zones: [
        {
          name: "zone1-1",
          list1: "zone列1-1",
          id: "1-1"
        },
        {
          name: "zone1-2",
          list1: "zone列1-2",
          id: "1-2"
        }
      ]
    },
    {
      name: "region2",
      list1: "region列1",
      id: "2"
    }
  ];
  // 树prop
  treeProps: any = {
    label: "name",
    children: "zones"
  };
  // 树过滤
  filterText: any = "";
  @Watch("filterText")
  filterTextFn(v: any) {
    let tree: any = this.$refs.tree;
    tree.filter(v);
  }
  @Watch("layout", { immediate: true })
  layoutChange(val: any) {
    this.myLayout = val;
  }
  // 折叠树
  treeIsFlod: boolean = false;
  // 折叠表格
  tableIsFlod: boolean = false;

  // ********** 树声明 end **********
  // ----------------------------------
  // ********** 表格声明 beg **********
  // 表格下边框显示与否
  tableShowMb: boolean = false;
  tableData: any = {
    data: this.$store.getters.tableData.data,
    columns: this.$store.getters.tableData.columns,
  };
  get tableDataFn() {
    this.tableData.data = this.$store.getters.tableData.data;
    this.$set(this.tableData, "columns", []);
    let columns: any = this.$store.getters.tableData.columns;
    this.$nextTick(() => {
      this.$set(this.tableData, "columns", columns);
    })
    return "ccc";
  }
  tableSelectDatas: any = [];
  paginationData: any = {
    total: 401,
    pageSizes: [10, 30, 50, 100]
  };
  pageAction: any = {
    page: 1,
    size: 10
  };
  // ********** 表格声明 end **********
  // ----------------------------------

  fn: any = methods;
  // @ init
  mounted() {
    methods.init(this);
    let listone: any = this.$refs.listone;
    let clientWidth: number = listone.clientWidth;
    function getLayout(num: number) {
        let filterArr = ["slot, prev, pager, next, sizes, jumper", "prev, pager, next, sizes, jumper", "prev, pager, next"]
        let index = num > 830 ? 0 : num > 675 && num < 830 ? 1 : 2
        return filterArr[index]
      }
    this.myLayout = getLayout(clientWidth)
  }
  // 重置
  onReset() {
    this.defaultSearchData = new searchData();
    this.searchDatas.forEach((el: any, inx: any) => {
      this.$set(this.searchDatas, inx, new searchData());
    });
  }

  // 查询
  onSarch() {
    console.log(`---------- 查询输出 beg ----------`);
    let tempArr = [];
    tempArr = [this.defaultSearchData, ...this.searchDatas];
    log(tempArr);
    console.log(`---------- 查询输出 end ----------`);
  }

  // 分页按钮
  pageChange(str: string, v: number) {
    if (str === "size") {
      this.pageAction.size = v;
    } else {
      this.pageAction.page = v;
    }
  }

  // 表格选中
  tableCurrentChange(e: any) {
    this.$store.commit("select_data", e);
  }
}
</script>

