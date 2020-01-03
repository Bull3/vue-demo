<template>
  <div class="h100">
    <el-form :model="searchForm" class="demo-form-inline" label-width="80px">
      <el-row>
        <el-col :span="6">
          <el-form-item label="用户账号">
            <el-input v-model="searchForm.uname" placeholder="请输入" clearable></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="用户名">
            <el-input v-model="searchForm.rname" placeholder="请输入" clearable></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="2">
          <el-form-item label-width="40px">
            <el-button type="primary" @click="search">搜索</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <el-row style="height: calc(100% - 41px)">
      <el-col :span="6" class="h100">
        <el-row style="margin-bottom: 2px;">
          <el-col :span="8" v-for="(btn, index) in btnOptions" :key="'bigbtn_' + index">
            <el-button class="big-btn" :style="btn.style" @click="btnClick(btn)">{{btn.name}}</el-button>
          </el-col>
        </el-row>
        <el-tree ref="tree" style="height: calc(100% - 39px)" node-key="id" :data="treeData" :props="props" show-checkbox highlight-current>
        </el-tree>
      </el-col>
      <el-col :span="18" style="padding-left: 10px" class="h100">
        <b-table :columns="columns" :data="tableData" showPagination frontEndPagination :currentPage.sync="currentPage" :pageSize.sync="pageSize" :total="total" @page-change="paginationChange" @selection-change="handleSelectionChange">
          <template v-slot:rname="scope">
            <el-button type="text" @click="editClick(scope.row)">{{scope.row.rname}}</el-button>
          </template>
          <!-- <template v-slot:pageSlot>
            <el-button type="text" >分页插槽</el-button>
          </template> -->
        </b-table>
        <!-- <b-form></b-form> -->
      </el-col>
    </el-row>
    <!-- <transition
    name="dialog-fade"> -->
    <b-dialog :class="noMgTop ? 'no-mgtop' : ''" :show.sync="dialogVisible" @onSubmit="onSubmit" :title="dialogTitle" :width="dialogWidth" top="8vh">
      <component ref="dialogContent" :show.sync="dialogVisible" :is="currentComponent"></component>
    </b-dialog>
    <!-- </transition> -->
  </div>
</template>
<script>
import components from "./dialog";
import service from "@/utils/request";
import axios from 'axios'
import getTableData from "@/mock/search";

export default {
  components,
  data() {
    return {
      currentComponent: '',
      dialogVisible: false,
      dialogWidth: '',
      dialogTitle: '',
      noMgTop: false,
      treeData: [],
      props: {
        label: "name",
        children: "child"
      },
      btnOptions: [{
        code: 'addGroup',
        name: '新增分组',
        style: 'border-left: 0;',
        noMgTop: true,
      }, {
        code: 'editGroup',
        name: '编辑分组',
        noMgTop: true,
      }, {
        code: 'delGroup',
        name: '删除分组',
        style: 'border-right: 0;'
      }],
      searchForm: {
        uname: '',
        rname: '',
      },
      columns: [
        { id: "selection", type: "selection", width: "55" },
        { id: "rname", label: "用户名称", slotName: "rname" },
        { id: "remark", prop: "remark", label: "用户说明" },
        { id: "uname", prop: "uname", label: "用户账号" },
      ],
      tableData: [],
      selection: [],
      currentPage: 1,
      pageSize: 10,
      total: 0,
    };
  },
  created() {
    this.search()
    this.$on("toolBarOnClick", menu => {
      if (menu.single && this.selection.length !== 1) {
        this.$message({
          showClose: true,
          message: '请勾选有且只有一名用户',
          type: 'warning'
        });
        return
      } else if (menu.multiple && this.selection.length === 0) {
        this.$message({
          showClose: true,
          message: '请至少勾选一名用户',
          type: 'warning'
        });
        return
      }
      if (menu.notDialog) {

      } else {
        this.currentComponent = menu.code
        this.dialogTitle = menu.name
        this.noMgTop = menu.noMgTop
        this.dialogWidth = menu.width
        this.dialogVisible = true
      }
    });
  },
  methods: {
    handleSelectionChange(val) {
      this.selection = val;
    },
    onSubmit() {
      this.$refs.dialogContent.$emit('submit')
    },
    editClick(row) {
      this.noMgTop = true
      this.currentComponent = 'edit'
      this.dialogTitle = '编辑'
      this.dialogVisible = true
    },
    btnClick(btn) {
      if (btn.code === 'delGroup') {
        this.$confirm('确定要删除分组吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
        return
      }
      this.noMgTop = btn.noMgTop
      this.currentComponent = btn.code
      this.dialogTitle = btn.name
      this.dialogVisible = true
    },
    search() {
      // service.get('/api/usrgp/page/{page}/{size}').then(res=>{
      //   console.log(res,121);
      // })
      // "parentid":0,//上级用户组ID,-1所有的
      // "key":""//查询关键字
      let resData = {
        "suc": true,
        "msg": "",
        "data": {
          "groups": [{
            "code": "0",
            "name": "全部",
            "child": [{
              "code": "1",
              "name": "管理组",
            }, {
              "code": "2",
              "name": "运营组",
            }]
          }],
          "page": 1,
          "size": 10,
          "rcount": 100
        }
      }
      this.treeData = resData.data.groups

      // service.get('/api/user/page/{page}/{size}').then(res=>{
      //   console.log(res,121);
      // })
      //用户查询API
      let groupCode = ''
      if (this.$refs.tree) {
        groupCode = this.$refs.tree.getCurrentKey()
      }
      // currentPage
      // pageSize
      // uname: searchForm.uname,//登录名/用户账号
      // rname: searchForm.rname,//用户真实名称
      // group: groupCode//用户组Code

      //1. 后端分页
      let resData2 = getTableData(this.currentPage, this.pageSize)
      this.tableData = resData2.data.users;
      this.total = resData2.data.rcount
      //2. 前端分页
      // let resData2 = getTableData()//获取所有数据, 而不是单页数据, 这样就不用在change的时候去请求数据了
      // this.tableData = resData2.data.users;
      // this.total = resData2.data.rcount
    },
    paginationChange(pageObj, eventType) {
      //后端分页需要手动给分页器赋值
      // let { currentPage, pageSize, total } = pageObj
      // let resData2 = getTableData(currentPage, pageSize)
      // this.tableData = resData2.data.users;
      // this.total = resData2.data.rcount
      // this.currentPage = currentPage
      // this.pageSize = pageSize
    }
  }
};
</script>
<style lang="scss" scoped>
.big-btn {
  width: 100%;
  height: 37px;
}
</style>

<style>
.b-pagination {
  background-color: white;
  text-align: right;
}
</style>
