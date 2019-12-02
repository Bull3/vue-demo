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
        <b-table :columns="columns" :data="tableData" :pagination="pagination" @selection-change="handleSelectionChange">
          <template v-slot:rname="scope">
            <el-button type="text" @click="editClick(scope.row)">{{scope.row.rname}}</el-button>
          </template>
        </b-table>

        <!-- <el-pagination style="background-color: white;text-align: right;" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[10, 20, 30, 40]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
        </el-pagination> -->
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

export default {
  components,
  data() {
    return {
      currentComponent: '',
      dialogVisible: false,
      dialogWidth: '',
      dialogTitle: '',
      noMgTop: false,
      currentPage: 1,
      pageSize: 10,
      total: 100,
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
        { id: "rname", label: "用户名称", colSlot: "rname" },
        { id: "remark", prop: "remark", label: "用户说明" },
        { id: "uname", prop: "uname", label: "用户账号" }
      ],
      tableData: [],
      selection: [],
      pagination: {
        attrs: {
          // layout: "prev, pager, next, slot",
          // currentPage: 2
        },
        listeners: {

        },
        refreshFun: this.search
      }
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
      // this.currentPage
      // this.pageSize
      // uname: searchForm.uname,//登录名/用户账号
      // rname: searchForm.rname,//用户真实名称
      // group: groupCode//用户组Code

      let resData2 = {
        "msg": "",
        "suc": true,
        "data": {
          "users": [{
            "uname": "zs",
            "rname": "张三",
            "remark": "1221",
            "code": ""
          }, {
            "uname": "ls",
            "rname": "李四",
            "remark": "31332",
            "code": ""
          }],
          "page": 1,
          "size": 10,
          "rcount": 100
        }
      }
      this.tableData = resData2.data.users;
    },
    handleSizeChange(pageSize) {
      this.pageSize = pageSize
      this.search()
    },
    handleCurrentChange(currentPage) {
      this.currentPage = currentPage
      this.search()
    },
  }
};
</script>
<style lang="scss" scoped>
.big-btn {
  width: 100%;
  height: 37px;
}
</style>
