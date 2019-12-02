<template>
  <div style="background:#fff;" class="list-details h100">
    <!-- 头部 -->
    <el-row class="header-box">
      <el-col :span="12" v-for="item of tabData" :key="item.code" :class="{active:item.active}" @click.native="toggleTab(item)">
        <span>{{ item.name }}</span>
      </el-col>
    </el-row>
    <!-- 内容-详情 -->
    <el-row v-if="currentTab === 'xq'" class="nr-box pd-20">
      <edit-one :rightWidth="rightWidth"/>
      <!-- 详情-头部 -->
      <!-- <div class="row-div w100 l-o-h" :class="{'minWidth':rightWidth < 700,'defaultWidth':rightWidth>700&&rightWidth<1000,'maxWidth':rightWidth>1000}">
        <el-form :label-width="labelWidth" :model="herderFormData">
          <div class="col-div" v-for="(form,i) of herderData" :key="i">
            <el-form-item :label="form.label">
              <el-input v-model="herderFormData[form.code]"></el-input>
            </el-form-item>
          </div>
        </el-form>
        <br clear="all" />
      </div> -->
      <!-- 详情-中部 -->
      <!-- <div class="qx-center"> -->
        <!-- <el-form :label-width="labelWidth" :model="allFormData"> -->
          <!-- 平铺 -->
          <!-- <el-collapse v-if="!openTabMode">
            <el-collapse-item v-for="(all,i) of closeTabData" :key="i" :title="all.title" v-if="all.isShow">
              <template v-if="all.type === 'form'">
                <template v-if="all.hsGroup">
                  <div class="row-div w100" :class="testClass">
                    <div class="col-div" v-for="(item,i1) of all.data" :key="i1">
                      <div class="form-group-title">
                        <span>{{ item.groupName }}</span>
                      </div>
                      <el-form-item v-for="(sub,i2) of item.data" :label="sub.label" :key="i2">
                        <el-input v-model="allFormData[sub.code]"></el-input>
                      </el-form-item>
                    </div>
                    <br clear="all" />
                  </div>
                </template>
                <template v-if="!all.hsGroup">
                  <div class="row-div w100" :class="testClass">
                    <div class="col-div" v-for="(item,i) of all.data" :key="i">
                      <el-form-item :label="item.label">
                        <el-input v-model="allFormData[item.code]"></el-input>
                      </el-form-item>
                    </div>
                    <br clear="all" />
                  </div>
                </template>
              </template>
              <template v-if="all.type === 'table'">
                <el-table :data="all.tableData">
                  <el-table-column type="selection" width="55"></el-table-column>
                  <el-table-column v-for="(column,i1) of all.tableColumn" :prop="column.code" :label="column.name" :key="i1" :width="column.width"></el-table-column>
                </el-table>
              </template>
            </el-collapse-item>
          </el-collapse> -->
        <!-- </el-form> -->
      <!-- </div> -->
    </el-row>
    <!-- 内容-操作 -->
    <el-row v-if="currentTab === 'cz'" class="nr-box pd-20">
      <el-checkbox @change="allAdaptive" class="mb-10">列宽全部自适应</el-checkbox>
      <el-checkbox :class="{alb:alb}" v-model="alb" @change="toggleAlb" class="mb-10">列开启自动换行</el-checkbox>
      <el-table :data="columns" border>
        <el-table-column prop="name" label="列名"></el-table-column>
        <el-table-column label="显示" width="60" align="center">
          <template slot-scope="scope">
            <el-checkbox v-model="scope.row.show" />
          </template>
        </el-table-column>
        <el-table-column label="列宽">
          <template slot-scope="scope">
            <div class="lw-box">
              <span v-if="scope.row.widthEdit">
                <el-input v-model="scope.row.copyWidth"></el-input>
              </span>
              <span v-if="!scope.row.widthEdit">{{ scope.row.width ? scope.row.width : '自适应' }}</span>
              <button @click="setLw(scope.row)">{{ scope.row.widthEdit ? "　确认　" :"设置列宽" }}</button>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="固定列" width="60" align="center">
          <template slot-scope="scope">
            <el-checkbox v-model="scope.row.fixed" />
          </template>
        </el-table-column>
        <el-table-column label="切换顺序" width="100" align="center">
          <template slot-scope="scope">
            <button style="margin-right:5px" @click="moveCol('up',scope.$index)">上移</button><button @click="moveCol('down',scope.$index)">下移</button>
          </template>
        </el-table-column>
      </el-table>
    </el-row>
    <dialog-one :dialogCfg="dialogOneCfg" />
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { log } from '@/utils';
import cloneDeep from "lodash/cloneDeep";
import { editOneData } from "@/api/editOneApi";
@Component
export default class listDetails extends Vue {
  @Prop() rightWidth!: any;

  dialogOneCfg: any = {
    isShow: false
  };
  tabData: any = [
    {
      name: "详情",
      code: "xq",
      active: false,
    },
    {
      name: "操作",
      code: "cz",
      active: true
    }
  ];

  currentTab: string = "cz";

  // 当前列宽是否自适应
  isAllAdaptive: boolean = false;
  oldWidths: any = [];
  // 当前table所有数据
  get columns() {
    return this.$store.getters.tableData.columns;
  }
  // 是否开启自动换行
  alb: any = this.$store.getters.alb;
  // 当前选中的table数据
  get currentData() {
    return this.$store.getters.selectData;
  }
  // 详情相关数据 beg --------------------------------------------------------
  // 开启tab折叠  默认false 平铺
  openTabMode: boolean = editOneData().openTabMode;
  // 展开模式所有数据
  closeTabData: any = [...editOneData().main, ...editOneData().sub];
  // 头部数据
  labelWidth: string = "110px";
  herderData: any = editOneData().headerData;
  herderFormData: any = {};
  // 主表数据
  mainData: any = editOneData().main;
  // 子表数据
  subData: any = editOneData().sub;
  // 主子表提交
  allFormData: any = {};
  // 详情相关数据 end --------------------------------------------------------
  // init
  mounted() {
    console.log(this.rightWidth);
  }
  // 切换tab
  toggleTab(item: any) {
    this.tabData.forEach((el: any) => {
      el.active = false;
    })
    item.active = true;
    this.currentTab = item.code;
  }
  // table自适应
  allAdaptive(e: boolean) {
    this.columns.forEach((el: any, inx: any) => {
      if (e) {
        this.isAllAdaptive = true;
        this.oldWidths.push(el.width);
        el.width = "";
      } else {
        this.isAllAdaptive = false;
        el.width = this.oldWidths[inx];
      }
    })
    if (!e) {
      this.oldWidths = [];
    }
  }
  // 设置列宽
  setLw(row: any) {
    if (this.isAllAdaptive) {
      alert(`已开启自适应`);
      return false;
    }
    // 如果不是编辑状态
    if (!row.widthEdit) {
      row.copyWidth = row.width === "" ? "0" : row.width;
    } else {
      let reg = /^[0-9]*$/;
      if (reg.test(row.copyWidth)) {
        row.width = row.copyWidth === "0" ? "" : row.copyWidth;
      } else {
        alert(`只能输入数字`);
        return false;
      }
    }
    row.widthEdit = !row.widthEdit;
  }
  // 自动换行
  toggleAlb(e: boolean) {
    this.$store.commit("toggle_table_alb", e);
  }
  // 移动列
  moveCol(tag: string, inx: number) {
    let currentData = this.columns[inx];
    // 上移
    if (tag === "up") {
      if (inx === 0) return;
      let prevData = this.columns[inx - 1];
      this.$set(this.columns, inx, prevData)
      this.$set(this.columns, inx - 1, currentData);
    }
    // 下移
    else {
      if (inx === this.columns.length - 1) return;
      let nextData = this.columns[inx + 1];
      this.$set(this.columns, inx, nextData)
      this.$set(this.columns, inx + 1, currentData)
    }

  }

}
</script>
<style lang="scss">
// $itemMargin: 36px;
.list-details {
  // 头部
  .header-box {
    height: 28px;
    line-height: 28px;
    .el-col {
      text-align: center;
      cursor: pointer;
      &:first-child {
        border-right: 1px solid #ccc;
      }
      &.active {
        color: #fff;
        background: #2e3a52;
      }
    }
    border-bottom: 1px solid #ccc;
  }
  // 内容容器
  .nr-box {
    height: calc(100% - 28px);
    overflow: auto;
  }
  // 内容---表格列宽容器
  .lw-box {
    span {
      display: inline-block;
      width: 80px;
      padding: 0 10px;
    }
  }
  // 内容---详情容器DIV
  // .row-div {
  //   .col-div {
  //     float: left;
  //     padding-left: $itemMargin / 2;
  //     padding-right: $itemMargin / 2;
  //   }
  //   // 大屏
  //   &.maxWidth {
  //     .col-div {
  //       width: 33.333%;
  //     }
  //   }
  //   // 中等
  //   &.defaultWidth {
  //     .col-div {
  //       width: 50%;
  //     }
  //   }
  //   // 最小
  //   &.minWidth {
  //     .col-div {
  //       width: 100%;
  //     }
  //   }
  // }
}
</style>