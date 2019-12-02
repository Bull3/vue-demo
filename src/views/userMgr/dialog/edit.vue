<template>
  <div>
    <HsToolBar :btnData="btnData" />
    <el-tabs v-model="activeName" type="border-card" @tab-click="handleClick">
      <el-tab-pane label="基本" name="first">
        <el-form ref="baseForm" key="baseForm" :model="baseForm" label-width="100px">
          <el-row>
            <el-col :md="24" :lg="12">
              <el-form-item label="用户账号" prop="account">
                <el-input v-model="baseForm.account" class="input-max-w"></el-input>
              </el-form-item>
              <el-form-item label="用户名称" prop="account">
                <el-input v-model="baseForm.account" class="input-max-w"></el-input>
              </el-form-item>
              <el-form-item label="联系对象类型" prop="account">
                <el-select v-model="baseForm.account" placeholder="请选择" class="input-max-w">
                  <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="联系对象" prop="account">
                <el-input v-model="baseForm.account" class="input-max-w"></el-input>
              </el-form-item>
            </el-col>
            <el-col :md="24" :lg="12">
              <el-form-item label="移动电话" prop="account">
                <el-input v-model="baseForm.account" class="input-max-w"></el-input>
              </el-form-item>
              <el-form-item label="用户说明" prop="account">
                <el-input v-model="baseForm.account" class="input-max-w" type="textarea"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="个人信息" name="second">
        <el-form ref="infoForm" key="infoForm" :model="infoForm" label-width="100px">
          <el-row>
            <el-col :md="24" :lg="12">
              <el-form-item label="域用户" prop="account">
                <el-input v-model="infoForm.account" class="input-max-w"></el-input>
              </el-form-item>
              <el-form-item label="邮箱" prop="account">
                <el-input v-model="infoForm.account" class="input-max-w"></el-input>
              </el-form-item>
              <el-form-item label="禁用人" prop="account">
                <el-input v-model="infoForm.account" class="input-max-w"></el-input>
              </el-form-item>
              <el-form-item label="反禁用人" prop="account">
                <el-input v-model="infoForm.account" class="input-max-w"></el-input>
              </el-form-item>
            </el-col>
            <el-col :md="24" :lg="12">
              <el-form-item label="动态密码卡" prop="account">
                <el-input v-model="infoForm.account" class="input-max-w"></el-input>
              </el-form-item>
              <el-form-item label="其他账号" prop="account">
                <el-input v-model="infoForm.account" class="input-max-w"></el-input>
              </el-form-item>
              <el-form-item label="禁用日期" prop="date1">
                <el-date-picker v-model="infoForm.date1" type="date" placeholder="选择日期" class="input-max-w">
                </el-date-picker>
              </el-form-item>
              <el-form-item label="反禁用日期" prop="date2">
                <el-date-picker v-model="infoForm.date2" type="date" placeholder="选择日期" class="input-max-w">
                </el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </el-tab-pane>
    </el-tabs>
    <el-tabs v-model="activeName2" type="border-card" @tab-click="handleClick2" style="margin-top: 20px">
      <el-tab-pane label="用户组" name="first">
        <HsToolBar key="toolbar1" :btnData="btnData2" style="margin-top:-15px" />
        <b-table :columns="columns" :data="tableData"></b-table>
      </el-tab-pane>
      <el-tab-pane label="角色" name="second">
        <HsToolBar key="toolbar2" :btnData="btnData3" style="margin-top:-15px" />
        <b-table :columns="columns2" :data="tableData2"></b-table>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeName: 'first',
      activeName2: 'first',
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
        value: '1',
      }, {
        label: '客户',
        value: '2',
      }],
      columns: [
        { prop: "uname", label: "用户组编码" },
        { prop: "remark", label: "用户组名称" },
      ],
      tableData: [
        { uname: "张三", remark: "张三的账户" },
        { uname: "李四", remark: "李四的账户" }
      ],
      columns2: [
        { prop: "uname", label: "角色" },
        { prop: "remark", label: "角色名称" },
      ],
      tableData2: [
        { uname: "张三1", remark: "张三的账户" },
        { uname: "李四22", remark: "李四的账户" },
      ],
    };
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    },
    handleClick2(tab, event) {
      console.log(tab, event);
    }
  },
};
</script>
