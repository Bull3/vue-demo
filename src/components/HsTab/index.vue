<template>
  <div class="hs-tab">
    <ul>
      <li v-for="(item,i) of tempList" :key="i" :class="{'active':item.active}" @click="toggleTab(item)">
        <span class="icon">
          <svg-icon icon-class="mao" />
        </span>
        <span class="item">{{ item.name }}</span>
        <span class="close-icon" @click="closeItem($event,i)">
          <svg-icon icon-class="close" />
        </span>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import { log, goTo } from "@/utils";
import { menuData } from "@/api/menuApi";
import filter from "lodash/filter";
import findIndex from "lodash/findIndex";
@Component
export default class HsTab extends Vue {
  tempList: any = [];

  // 监视路由
  @Watch("$route")
  routeChange(newRoute: any) {
    // 清空所有tab激活
    this.claerTabActive();
    // 先在tabs里找看看存不存在当前路由
    let currentTabInx = this.findCurrentTabInx(newRoute.query.mnum);
    // 如果不存在就添加
    if (currentTabInx === -1) {
      let currentTab = this.getCurrentTab(newRoute.query.mnum);
      this.tempList.push(currentTab);
    }
    // 如果存在
    else {
      this.$set(this.tempList[currentTabInx], "active", true);
    }
  }

  // 开始 init
  mounted() {
    let currentTab: any = this.getCurrentTab(this.$route.query.mnum);
    this.tempList.push(currentTab);
  }
  toggleTab(item: any) {
    this.claerTabActive();
    item.active = true;
    goTo(this, item);
  }
  closeItem(e: any, i: any) {
    e.stopPropagation();
    if (this.tempList.length === 1) {
      alert(`第一个不允许关闭`);
      return;
    }
    this.$confirm("确认关闭此tab", "提示", {
      confirmButtonText: "确定",
      cancelButtonText: "取消",
      type: "warning"
    })
      .then(() => {
        // 获取当前 tab
        let currentTab = this.tempList[i];
        // 如果当前 tab 不是激活状态直接删除
        if (!currentTab.active) {
          this.$delete(this.tempList, i);
        }
        // 如果当前 tab 是激活状态
        else {
          // 取下一个tab 和 上一个tab
          let nextTab = this.tempList[i + 1];
          let prevTab = this.tempList[i - 1];
          // 如果下一个不存在就跳上一个
          if (!nextTab) {
            goTo(this, prevTab);
          } else {
            goTo(this, nextTab);
          }
          this.$delete(this.tempList, i);
        }
      })
      .catch(() => {});
  }

  // 清空tab激活
  claerTabActive() {
    this.tempList.forEach((el: any) => {
      el.active = false;
    });
  }
  // 获取当前tab
  getCurrentTab(mnum: any) {
    let menu: any = localStorage.getItem("menu");
    let copyMenu = JSON.parse(menu);
    copyMenu.active = true;
    return copyMenu;
  }
  // 查找当前tab
  findCurrentTabInx(mnum: any) {
    return findIndex(this.tempList, (o: any) => o.mnum === mnum);
  }
}
</script>
<style scoped lang="scss">
</style>