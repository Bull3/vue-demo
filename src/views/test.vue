<template>
  <div class="test h100">
    <div class="left-box">
      <ul>
        <li v-for="(item,i) of leftData" :key="i" @dblclick="itemDblClick(item)">
          {{ item.name }}
        </li>
      </ul>
    </div>
    <div class="center-box">
      <el-table :data="tableData" :highlight-current-row="true" height="100%Y" @current-change="currentChange" style="width: 100%;height:100%" row-key="id" border default-expand-all :tree-props="{children: 'children', hasChildren: 'hasChildren'}">
        <el-table-column prop="date" label="日期" width="180">
        </el-table-column>
        <el-table-column prop="name" label="姓名" width="180">
        </el-table-column>
        <el-table-column prop="address" label="地址">
        </el-table-column>
      </el-table>
    </div>
    <div class="right-box">
      <el-form ref="form" :model="currentRow" label-width="80px">
        <el-form-item label="id">
          <el-input v-model="currentRow.id"></el-input>
        </el-form-item>
        <el-form-item label="日期">
          <el-input v-model="currentRow.date"></el-input>
        </el-form-item>
        <el-form-item label="姓名">
          <el-input v-model="currentRow.name"></el-input>
        </el-form-item>
        <el-form-item label="地址">
          <el-input v-model="currentRow.address"></el-input>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { log } from '@/utils';
import findIndex from 'lodash/findIndex';
import cloneDeep from 'lodash/cloneDeep';
@Component
export default class testCom extends Vue {
  leftData: any = [
    {
      name: "测试一",
      code: "ts1",
      date: '2016-05-01',
      address: '上海市普陀区金沙江路 1511 弄',
    },
    {
      name: "测试2",
      code: "ts2",
      date: '2016-05-02',
      address: '上海市普陀区金沙江路 1512 弄',
    },
    {
      name: "测试3",
      code: "ts3",
      date: '2016-05-03',
      address: '上海市普陀区金沙江路 1513 弄',
    },
    {
      name: "测试4",
      code: "ts4",
      date: '2016-05-04',
      address: '上海市普陀区金沙江路 1514 弄',
    },
    {
      name: "测试5",
      code: "ts5",
      date: '2016-05-05',
      address: '上海市普陀区金沙江路 1515 弄',
    },
    {
      name: "测试6",
      code: "ts6",
      date: '2016-05-06',
      address: '上海市普陀区金沙江路 1516 弄',
    }
  ];
  tableData: any = [
    {
      id: 1,
      date: '2016-05-02',
      name: '王小虎',
      address: '上海市普陀区金沙江路 1518 弄'
    },
    {
      id: 2,
      date: '2016-05-04',
      name: '王小虎',
      address: '上海市普陀区金沙江路 1517 弄'
    },
    {
      id: 3,
      date: '2016-05-01',
      name: '王小虎',
      address: '上海市普陀区金沙江路 1519 弄',
      children: [{
        id: 31,
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄'
      }, {
        id: 32,
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄'
      }]
    },
  ];
  currentRow: any = {};
  mounted() {
    this.$on("toolBarOnClick", (item: any) => {
      if (!this.currentRow.id) {
        alert(`请先选中数据`);
        return;
      }
      if (item.code === "delete") {
        alert(`删除ID：` + this.currentRow.id);
      }
    });
  }
  currentChange(row: any) {
    this.currentRow = cloneDeep(row);
  }
  itemDblClick(item: any) {
    if (!this.currentRow.id) {
      alert(`请先选中数据`);
      return;
    }
    let copyItem = cloneDeep(item);
    if (this.currentRow.children) {
      let inx = findIndex(this.currentRow.children, (o: any) => { return o.code === item.code });
      if (inx === -1) {
        copyItem.id = this.currentRow.id + '-' + (this.currentRow.children.length + 1);
        this.currentRow.children.push(copyItem);
      } else {
        alert(`已存在该数据！`)
      }
    } else {
      copyItem.id = this.currentRow.id + '-1';
      let arr = [copyItem];
      this.$set(this.currentRow, "children", arr);
    }
  }
}
</script>
<style lang="scss" scoped>
.test {
  background: #fff;
  .left-box {
    width: 180px;
    border-right: 1px solid #ccc;
    height: 100%;
    float: left;
    padding-top: 1px;
    ul {
      li {
        padding-left: 30px;
        border-bottom: 1px solid #ccc;
        height: 35px;
        line-height: 35px;
        cursor: pointer;
        &:hover {
          background: #c0c0c0;
        }
      }
    }
  }
  .center-box {
    width: 800px;
    height: 100%;
    float: left;
    padding: 0 10px;
  }
  .right-box {
    width: 500px;
    height: 100%;
    float: left;
    padding: 0 10px;
  }
}
</style>