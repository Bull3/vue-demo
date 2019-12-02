<template>
  <div style="padding-top:20px">
    <!-- <HsToolBar :btnData="topBtnData" /> -->
    <div class="my-border">
      <HsToolBar :btnData="btnData" />
      <b-table :columns="columns" :data="tableData"></b-table>
    </div>
    <el-row style="margin-top: 20px" :gutter="20">
      <el-col :md="24" :lg="12">
        <div class="my-border">
          <HsToolBar :btnData="btnData2" />
          <b-table :columns="columns2" :data="tableData2"></b-table>
        </div>
      </el-col>
      <el-col :md="24" :lg="12">
        <div class="my-border">
          <HsToolBar :btnData="btnData3" />
          <b-table :columns="columns3" :data="tableData3"></b-table>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      topBtnData: [
        {
          btns: [
            { code: "save", name: "保存", notDialog: true },
            { code: "exit", name: "退出", notDialog: true },
          ]
        }
      ],
      btnData: [
        {
          btns: [
            { code: "add", name: "新增行", notDialog: true },
            { code: "del", name: "删除行 ", notDialog: true },
            { code: "insert", name: "插入行", notDialog: true },
            { code: "setUser", name: "设置用户", notDialog: true },
          ]
        }
      ],
      btnData2: [
        {
          btns: [
            { code: "add", name: "新增行", notDialog: true },
            { code: "del", name: "删除行 ", notDialog: true },
            { code: "insert", name: "插入行", notDialog: true },
          ]
        }
      ],
      btnData3: [
        {
          btns: [
            { code: "add", name: "新增行", notDialog: true },
            { code: "del", name: "删除行 ", notDialog: true },
            { code: "insert", name: "插入行", notDialog: true },
          ]
        }
      ],
      columns: [
        { prop: "uname", label: "用户编码" },
        { prop: "remark", label: "用户名称" },
      ],
      tableData: [
        { uname: "张三", remark: "张三的账户" },
        { uname: "李四", remark: "李四的账户" }
      ],
      columns2: [
        { prop: "uname", label: "组织编码" },
        { prop: "remark", label: "组织名称" },
      ],
      tableData2: [
        { uname: "张三", remark: "张三的账户" },
        { uname: "李四", remark: "李四的账户" }
      ],
      columns3: [
        { prop: "uname", label: "角色编码" },
        { prop: "remark", label: "角色名称" },
      ],
      tableData3: [
        { uname: "张三", remark: "张三的账户" },
        { uname: "李四", remark: "李四的账户" }
      ],
    };
  },
  methods: {

  },
};
</script>

<style scoped lang="scss">
.my-border {
  border: 1px solid #ccc;
  padding: 10px;
}
</style>
