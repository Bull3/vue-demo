<template>
  <div class="edit-one">
    <!-- 头部区域 -->
    <div class="row-div w100 e-o-h" :class="{'minWidth':rightWidth < 700,'defaultWidth':rightWidth>700&&rightWidth<1000,'maxWidth':rightWidth>1000}">
      <el-form :label-width="labelWidth" :model="herderFormData">
        <div class="col-div" v-for="(form,i) of herderData" :key="i">
          <el-form-item :label="form.label">
            <el-input v-model="herderFormData[form.code]"></el-input>
          </el-form-item>
        </div>
      </el-form>
      <br clear="all" />
    </div>
    <!-- 主体区域 -->
    <el-row class="e-o-m">
      <el-form :label-width="labelWidth" :model="allFormData">
        <!-- 平铺 -->
        <el-collapse v-if="!openTabMode">
          <el-collapse-item v-for="(all,i) of closeTabData" :key="i" :title="all.title" v-if="all.isShow">
            <template v-if="all.type === 'form'">
              <template v-if="all.hsGroup">
                <div class="row-div w100 form-box" :class="{'minWidth':rightWidth < 700,'defaultWidth':rightWidth>700&&rightWidth<1000,'maxWidth':rightWidth>1000}">
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
                <div class="row-div w100 form-box" :class="{'minWidth':rightWidth < 700,'defaultWidth':rightWidth>700&&rightWidth<1000,'maxWidth':rightWidth>1000}">
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
        </el-collapse>
        <div class="openTabMode" v-if="openTabMode">
          <div class="rongqi mb-10" v-for="(item,i) in openTabData" :key="i">
            <el-tabs>
              <el-tab-pane v-for="(all,i1) of openTabData[i]" :key="i1" :label="all.title">
                <template v-if="all.type === 'form'">
                  <template v-if="all.hsGroup">
                    <div class="row-div w100 form-box" :class="{'minWidth':rightWidth < 700,'defaultWidth':rightWidth>700&&rightWidth<1000,'maxWidth':rightWidth>1000}">
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
                    <div class="row-div w100 form-box" :class="{'minWidth':rightWidth < 700,'defaultWidth':rightWidth>700&&rightWidth<1000,'maxWidth':rightWidth>1000}">
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
              </el-tab-pane>
            </el-tabs>
          </div>
        </div>
      </el-form>
    </el-row>
    <!-- 右侧悬浮 -->
    <el-row class="r-fiex" :class="{'show-menu':rightMenuIsShow}">
      <div class="r-f-r">
        <div class="r-f-l" @click="rightMenuIsShow = !rightMenuIsShow">
          <i class="el-icon-d-arrow-right"></i>
        </div>
        <div class="nr">
          <ul>
            <li v-for="(item,i) of closeTabData" :key="i">
              <el-checkbox v-model="item.isShow">{{ item.title }}</el-checkbox>
            </li>
            <li class="li-group">
              <el-checkbox v-model="openTabMode">tab叠加</el-checkbox>
            </li>
            <li>
              <el-checkbox v-model="tabUseDefault">使用默认</el-checkbox>
            </li>
          </ul>
        </div>
        <div class="back-top" @click="backTop">返回顶部</div>
      </div>
    </el-row>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop, Watch } from "vue-property-decorator";
import { editOneData } from "@/api/editOneApi";
import { log } from "@/utils";
@Component
export default class editOne extends Vue {
  @Prop() mnum!: string;
  @Prop() rightWidth!: any;
  // ---------------------------------
  // 开启tab折叠  默认false 平铺
  openTabMode: boolean = editOneData().openTabMode;
  // 展开模式所有数据
  closeTabData: any = [...editOneData().main, ...editOneData().sub];
  // 折叠模式所有数据
  openTabData: any = {
    mainData: editOneData().main,
    subData: editOneData().sub
  };
  // 头部数据
  herderData: any = editOneData().headerData;
  // 头部提交
  herderFormData: any = {};

  mainData: any = editOneData().main;
  // 子表数据
  subData: any = editOneData().sub;
  // 主子表提交
  allFormData: any = {};
  // tab默认选中
  mainActiveName: string = "0";
  subActiveName: string = "0";
  // ---------------------------------
  labelWidth: string = "110px";
  itemMargin: number = 36;
  rightMenuIsShow: boolean = false;
  // tab使用模式
  tabUseDefault: boolean = false;
  // init
  mounted() { }
  tabMenuClick(item: any) {
    item.isShow = !item.isShow;
  }
  // 返回顶部
  backTop() {
    document.getElementsByClassName("edit-one")[0].scrollTop = 0;
  }
  // 获取所有提交数据
  getAllSubmitData() {
    console.log(`----------头部提交数据 beg ----------`);
    log(this.herderFormData);
    console.log(`----------头部提交数据 end ----------`);
    console.log(`----------主子表提交数据 beg ----------`);
    log(this.allFormData);
    console.log(`----------主子表交数据 end ----------`);
  }
}
</script>
<style lang="scss" scoped>
</style>

