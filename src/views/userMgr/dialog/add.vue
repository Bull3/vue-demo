<template>
  <div>
    <HsToolBar :btnData="btnData" @toolBarOnClick="toolBarOnClick" />
    <el-tabs v-model="activeName" type="border-card" @tab-click="handleClick">
      <el-tab-pane label="基本" name="first">
        <el-form ref="baseForm" key="baseForm" :model="baseForm" label-width="100px">
          <el-row>
            <el-col :md="24" :lg="12">
              <el-form-item label="用户账号" prop="uname">
                <el-input v-model="baseForm.uname" class="input-max-w"></el-input>
              </el-form-item>
              <el-form-item label="用户名称" prop="rname">
                <el-input v-model="baseForm.rname" class="input-max-w"></el-input>
              </el-form-item>
              <el-form-item label="联系对象类型" prop="rotype">
                <el-select v-model="baseForm.rotype" placeholder="请选择" class="input-max-w">
                  <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="联系对象" prop="rocode">
                <el-input v-model="baseForm.rocode" class="input-max-w"></el-input>
              </el-form-item>
            </el-col>
            <el-col :md="24" :lg="12">
              <el-form-item label="移动电话" prop="tele">
                <el-input v-model="baseForm.tele" class="input-max-w"></el-input>
              </el-form-item>
              <el-form-item label="用户说明" prop="remark">
                <el-input v-model="baseForm.remark" class="input-max-w" type="textarea"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="个人信息" name="second">
        <el-form ref="infoForm" key="infoForm" :model="infoForm" label-width="100px">
          <el-row>
            <el-col :md="24" :lg="12">
              <el-form-item label="域用户" prop="duser">
                <el-input v-model="infoForm.duser" class="input-max-w"></el-input>
              </el-form-item>
            </el-col>
            <el-col :md="24" :lg="12">
              <el-form-item label="邮箱" prop="mail">
                <el-input v-model="infoForm.mail" class="input-max-w"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </el-tab-pane>
    </el-tabs>
    <el-tabs v-model="activeName2" type="border-card" @tab-click="handleClick2" style="margin-top: 20px">
      <el-tab-pane label="用户组" name="first">
        <HsToolBar key="toolbar1" :btnData="btnData2" style="margin-top:-15px" @toolBarOnClick="toolBarOnClick2" />
        <b-table :columns="columns" :data="tableData" @row-dblclick="dbclick" @current-change="handleCurrentChange" highlight-current-row></b-table>
      </el-tab-pane>
      <el-tab-pane label="角色" name="second">
        <HsToolBar key="toolbar2" :btnData="btnData3" style="margin-top:-15px" @toolBarOnClick="toolBarOnClick3" />
        <b-table :columns="columns2" :data="tableData2" @row-dblclick="dbclick2" @current-change="handleCurrentChange2" highlight-current-row></b-table>
      </el-tab-pane>
    </el-tabs>
    <b-dialog :show.sync="dialogVisible" @onSubmit="onSubmit" append-to-body>
      <b-table :columns="columns3" :data="tableData3" highlight-current-row></b-table>
    </b-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeName: 'first',
      activeName2: 'first',
      dialogVisible: false,
      btnData: [
        {
          btns: [
            // { code: "save", name: "保存", notDialog: true },
            {
              code: "operation",
              name: "业务操作",
              options: [
                { code: "forbid", name: "禁用" },
                { code: "opForbid", name: "反禁用" },
              ]
            },
            {
              code: "search",
              name: "业务查询",
              options: [
                { code: "objInfo", name: "联系对象信息" },
                { code: "searchPower", name: "查询权限" }
              ]
            },
            // { code: "exit", name: "退出", notDialog: true },
          ]
        }
      ],
      btnData2: [
        {
          btns: [
            { code: "add", name: "新增行", notDialog: true },
            { code: "del", name: "删除行 ", notDialog: true },
            { code: "insert", name: "插入行", notDialog: true },
            { code: "setUser", name: "设置用户组", notDialog: true },
          ]
        }
      ],
      btnData3: [
        {
          btns: [
            { code: "add", name: "新增行", notDialog: true },
            { code: "del", name: "删除行 ", notDialog: true },
            { code: "insert", name: "插入行", notDialog: true },
            { code: "setRole", name: "设置角色", notDialog: true },
            { code: "businessObjAuth", name: "业务对象功能授权", notDialog: true },
          ]
        }
      ],
      baseForm: {},
      infoForm: {},
      options: [{
        label: '员工',
        value: 1,
      }, {
        label: '客户',
        value: 2,
      }],
      columns: [
        { prop: "code", label: "用户组编码" },
        { prop: "name", label: "用户组名称" },
      ],
      tableData: [
        { code: "张三", name: "张三的账" },
        { code: "李四", name: "李四的账户" }
      ],
      columns2: [
        { prop: "code", label: "角色" },
        { prop: "name", label: "角色名称" },
      ],
      tableData2: [
        { code: "张三1", name: "张三的账户" },
        { code: "李四22", name: "李四的账户" },
      ],
      columns3: [
        { prop: "code", label: "用户组编码" },
        { prop: "name", label: "用户组名称" },
      ],
      tableData3: [],
      currentIndex: -1,
      currentIndex2: -1,
    };
  },
  watch: {
    dialogVisible(val) {
      if (val) {
        this.tableData3 = [
          { code: "张三1", name: "张三的账户" },
          { code: "李四22", name: "李四的账户" },
        ]

      }
    }
  },
  methods: {
    onSubmit() {
      this.dialogVisible = false
    },
    toolBarOnClick(val) {
      console.log(val);
    },
    toolBarOnClick2(val) {
      let functions = {
        del: () => {
          if (this.currentIndex < 0) {
            this.$message({
              showClose: true,
              message: '请先点击选中一行,再删除',
              type: 'warning'
            });
            return
          }
          this.$confirm('确定要删除行吗?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.tableData.splice(this.currentIndex, 1)
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
        },
        add: () => {
          this.tableData.push({ code: "...", name: "" })
        },
        insert: () => {
          if (this.currentIndex < 0) {
            this.$message({
              showClose: true,
              message: '请先点击选中一行,再插入',
              type: 'warning'
            });
            return
          }
          this.tableData.splice(this.currentIndex, 0, { code: "...", name: "" })
        },
        setUser: () => {
          if (this.currentIndex < 0) {
            this.$message({
              showClose: true,
              message: '请先点击选中一行,再设置用户组',
              type: 'warning'
            });
            return
          }
        },
      }
      functions[val.code] && functions[val.code]();
    },
    toolBarOnClick3(val) {
      console.log(val);

    },
    dbclick(row, column, event) {
      this.dialogVisible = true
      this.currentRow = row
    },
    dbclick2(row, column, event) {

    },
    handleCurrentChange(currentRow) {
      this.currentIndex = this.tableData.indexOf(currentRow)
    },
    handleCurrentChange2(currentRow) {
      console.log(currentRow);
    },
    handleClick(tab, event) {
      console.log(tab, event);
    },
    handleClick2(tab, event) {
      console.log(tab, event);
    }
  },
};
</script>
