<template>
  <div class="menuCount">
    <template v-for="(menu,inx) of menuData">
      <template v-if="menu.sub">
        <el-submenu :index="menu.mnum">
          <template slot="title">
            <div class="menu-icon-div">
              <svg-icon :icon-class="menu.icon" />
            </div>
            <span slot="title">{{ menu.name }}</span>
          </template>
          <menuCount v-if="isShow" :menuData="menu.sub" />
        </el-submenu>
      </template>
      <template v-if="!menu.sub">
        <el-menu-item :index="menu.mnum" @click.native="selectMenu(menu)" class="sub">
          <div class="menu-icon-div">
            <svg-icon :icon-class="menu.icon" />
          </div>
          <span slot="title">{{ menu.name }}</span>
        </el-menu-item>
      </template>
    </template>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { goTo } from "@/utils";
@Component({
  name: "menuCount"
})
export default class menuCount extends Vue {
  @Prop() count!: number;
  @Prop() menuData!: any;
  num: number = 0;
  tempMenuData: any = [];
  isShow: boolean = false;
  mounted() {
    this.tempMenuData = [...this.menuData];
    let isShow = false;
    this.tempMenuData.forEach((el: any) => {
      if (el.sub) {
        isShow = true;
      }
    });
    this.isShow = isShow;
  }
  selectMenu(menu: any) {
    goTo(this, menu);
  }
}
</script>