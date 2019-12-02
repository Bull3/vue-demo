<template>
  <div class="HsTopCom">
    <div class="top-menu icon-color fl">
      <span>
        <svg-icon icon-class="menu"/>
      </span>
    </div>
    <span class="top-logo fl">LOGO 产品名称</span>
    <div class="top-icon-cont fr">
      <span class="top-icon fr" v-for="(icon,i) of icons" :key="i" @click="iconClick(icon)">
        <svg-icon :icon-class="icon.iconName"/>
      </span>
    </div>
    <div class="top-element-cont fr">
      <div class="el fr">
        <el-dropdown trigger="click">
          <span class="el-dropdown-link">
            组织编号-组织名称
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>黄金糕</el-dropdown-item>
            <el-dropdown-item>狮子头</el-dropdown-item>
            <el-dropdown-item>螺蛳粉</el-dropdown-item>
            <el-dropdown-item disabled>双皮奶</el-dropdown-item>
            <el-dropdown-item divided>蚵仔煎</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
      <div class="el fr">|</div>
      <div class="el fr">
        <el-dropdown trigger="click">
          <span class="el-dropdown-link">
            账套编号-账套名称
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>黄金糕</el-dropdown-item>
            <el-dropdown-item>狮子头</el-dropdown-item>
            <el-dropdown-item>螺蛳粉</el-dropdown-item>
            <el-dropdown-item disabled>双皮奶</el-dropdown-item>
            <el-dropdown-item divided>蚵仔煎</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
      <div class="el fr" style="margin-right:32px">
        <el-input placeholder="功能搜索" class="search-input" v-model="value">
          <i slot="suffix" class="el-icon-search"></i>
        </el-input>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class HsTop extends Vue {
  icons: any = [
    { iconName: "user" },
    { iconName: "exit" },
    { iconName: "setting" },
    { iconName: "help" },
    { iconName: "msg" }
  ];
  value: any = "";
  iconClick(icon:any){
    this.$emit("iconClick",icon);
  }
}
</script>

<style scoped lang="scss">
</style>
