<template>
  <div class="hs-menu h100" :class="{'isCollapse':isCollapse}">
    <div class="hr-div" :class="{'isCollapse':isCollapse}" @click="toggleMenu">
      <svg-icon icon-class="menu-right" />
      <span v-if="isCollapse">Navigation</span>
    </div>
    <div class="fl zw-div" @click="toggleMenu">
      <span class="text">Navigation</span>
    </div>
    <div class="fl content" :class="{'isCollapse':isCollapse}">
      <el-menu class="el-menu-hs" :collapse="!isCollapse" :default-active="defaultActive" ref="hsMenu">
        <menuCount :count="3" :menuData="menuData" />
      </el-menu>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import { menuData } from "@/api/menuApi";
import menuCount from "./menuCount.vue";
import { goTo } from "@/utils";
@Component({
  components: {
    menuCount
  }
})
export default class HsMenu extends Vue {
  isCollapse: boolean = false;
  menuData: any = menuData();
  defaultActive: string = "";
  // 监视路由
  @Watch("$route")
  routeChange(newRoute: any) {
    this.defaultActive = newRoute.query.mnum;
  }
  // 开始 init
  mounted() {
    let str: any = "";
    if (!this.$route.query.mnum) {
      goTo(this, {
        icon: "user",
        name: "用户管理",
        mtype: "list",
        mnum: "userMgr",
      });
      str = "userMgr";
    } else {
      str = this.$route.query.mnum;
    }
    this.defaultActive = str;
  }
  toggleMenu() {
    let hsMenu: any = this.$refs.hsMenu;
    hsMenu.openedMenus.forEach((el: any) => {
      hsMenu.closeMenu(el);
    });
    setTimeout(() => {
      this.isCollapse = !this.isCollapse;
      this.$emit("toggleMenu", this.isCollapse);
    }, 100);
  }
}
</script>

