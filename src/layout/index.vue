<template>
  <div class="layout h100">
    <HsTop @iconClick="iconClick" />
    <div class="hr-div"></div>
    <div class="container-div">
      <div class="aside">
        <HsMenu @toggleMenu="toggleMenu" />
      </div>
      <div class="main" :style="{width:mainWidth,transition: '0.5s'}">
        <HsTab />
        <div class="main-router">
          <router-view />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { HsTop, HsMenu, HsTab } from "@/components";
@Component({
  components: {
    HsTop,
    HsMenu,
    HsTab
  }
})
export default class Layout extends Vue {
  mainWidth: string = "calc(100% - 68px)";

  // ????
  toggleMenu(e: boolean) {
    if (e) {
      this.mainWidth = "calc(100% - 220px)";
    } else {
      this.mainWidth = "calc(100% - 68px)";
    }
  }
  // testShow: boolean = true;
  iconClick(e: any) {
    // if (e.iconName === "user") {
    //   localStorage.setItem("size", "mini");
    //   window.location.reload();
    // } else {
    //   localStorage.setItem("size", "small");
    //   window.location.reload();
    // }
  }
}
</script>

<style scoped lang="scss">
@import "@/styles/hs-tab.scss";
@import "@/styles/global.scss";
.hr-div {
  height: 10px;
}
.container-div {
  height: calc(100% - 50px);
  .aside,
  .main {
    height: 100%;
    vertical-align: top;
    display: inline-block;
  }
  .main {
    .main-router {
      height: calc(100% - 22px);
      overflow: auto;
      background: #d6e2f2;
      border-left: $tab_padding solid $global_background;
      border-right: $tab_padding solid $global_background;
      border-bottom: 10px solid $global_background;
      padding: 0 10px 10px;
    }
  }
}
</style>
