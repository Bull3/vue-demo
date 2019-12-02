<template>
  <div class="h100">
    <!-- 单列表 -->
    <template v-if="listOneLayout==='column'">
      <list-one :mnum="mnum" />
    </template>
    <!-- 双列表 -->
    <template v-else-if="listOneLayout==='dblColumn'">
      <div class="db-l h100">
        <list-one :mnum="mnum" :layout="layout1" />
      </div>
      <div class="db-c h100" :class="{isOnMousedown:isOnMousedown}" @mousedown="onMousedown"></div>
      <div class="db-r h100">
        <list-one :mnum="mnum" :layout="layout2" />
      </div>
    </template>
    <!-- 列表+详情 -->
    <template v-else-if="listOneLayout==='columnDetails'">
      <div class="db-l h100">
        <list-one :mnum="mnum" :layout="layout1" />
      </div>
      <div class="db-c h100" :class="{isOnMousedown:isOnMousedown}" @mousedown="onMousedown"></div>
      <div class="db-r h100">
        <list-details :rightWidth="rightWidth" />
      </div>
    </template>
    <!-- 列表+历史 -->
    <template v-else-if="listOneLayout==='columnHistory'">
      <div class="db-l h100" :style="leftStyle">
        <list-one :mnum="mnum" :layout="layout1" />
      </div>
      <div class="db-c h100" :class="{isOnMousedown:isOnMousedown}" @mousedown="onMousedown"></div>
      <div class="db-r h100" :style="rightStyle">
        <list-history />
      </div>
    </template>
    <template v-else-if="listOneLayout==='gantt'">
      <list-two type="1" key="1" />
    </template>
    <template v-else-if="listOneLayout==='ganttResource'">
      <list-two type="2" key="2" />
    </template>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
@Component
export default class listLayout extends Vue {
  name: any = "";
  leftStyle: any = "";
  rightStyle: any = "";
  minLeftWidth: number = 500;
  minRightWidth: number = 500;
  layout1: string = "";
  layout2: string = "";
  rightWidth: number = 0;
  isOnMousedown: boolean = false;
  get mnum() {
    return this.$route.query.mnum;
  }
  // listone 布局
  get listOneLayout() {
    if (this.$store.getters.listLayout === 'columnHistory') {
      this.minRightWidth = 280
      this.leftStyle = { width: `calc(100% - ${this.minRightWidth}px - 0.4%)` }
      this.rightStyle = { width: `${this.minRightWidth}px` }
    } else {
      this.minRightWidth = 500
    }
    return this.$store.getters.listLayout;
  }

  onMousedown(event: any) {
    this.isOnMousedown = true;
    //鼠标起始位置
    let startX: number = event.clientX;
    let startY: number = event.clientY;
    let left: any = document.querySelector(".db-l");
    let center: any = document.querySelector(".db-c");
    let right: any = document.querySelector(".db-r");
    let main: any = document.querySelector(".home-main");
    //存储起始宽度
    let leftClientWidth: number = left.clientWidth;
    let mainClientWidth: number = main.clientWidth;
    //存储鼠标最新位置
    let lastclientX: number = startX;
    let that = this;
    function setDragWidth(ev: any) {
      if ((<any>window).getSelection) {
        (<any>window).getSelection().removeAllRanges();
      }
      function getLayout(num: number) {
        let filterArr = ["slot, prev, pager, next, sizes, jumper", "prev, pager, next, sizes, jumper", "prev, pager, next"]
        let index = num > 830 ? 0 : num > 675 && num < 830 ? 1 : 2
        return filterArr[index]
      }
      that.layout1 = getLayout(left.clientWidth)
      that.layout2 = getLayout(right.clientWidth)

      //获取实时宽度
      if ((left.clientWidth <= that.minLeftWidth && ev.clientX < lastclientX) || (right.clientWidth <= that.minRightWidth && ev.clientX > lastclientX)) return;
      // let leftWidth = leftClientWidth + (ev.clientX - startX);
      // let rightWidth = mainClientWidth - center.clientWidth - left.clientWidth - 10;
      let maxLeftWidth = mainClientWidth - center.clientWidth - that.minRightWidth - 10;
      let maxRightWidth = mainClientWidth - center.clientWidth - that.minLeftWidth - 10;
      // left.style.width = (leftWidth < that.minLeftWidth ? that.minLeftWidth : (leftWidth > maxLeftWidth ? maxLeftWidth : leftWidth)) + "px";
      // right.style.width = (rightWidth < that.minRightWidth ? that.minRightWidth : (rightWidth > maxRightWidth ? maxRightWidth : rightWidth)) + "px";
      left.style.width = (leftClientWidth + (ev.clientX - startX) <= that.minLeftWidth ? that.minLeftWidth : (leftClientWidth + (ev.clientX - startX) >= maxLeftWidth ? maxLeftWidth : leftClientWidth + (ev.clientX - startX))) + "px";
      right.style.width = (mainClientWidth - center.clientWidth - left.clientWidth <= that.minRightWidth ? that.minRightWidth : (mainClientWidth - center.clientWidth - left.clientWidth - 5 >= maxRightWidth ? maxRightWidth : mainClientWidth - center.clientWidth - left.clientWidth - 5)) + "px";
      //存储鼠标上一次位置
      lastclientX = ev.clientX;
      that.rightWidth = right.clientWidth;
    }

    document.onmousemove = setDragWidth


    //清除
    document.onmouseup = ev => {
      document.onmousemove = null;
      this.isOnMousedown = false;
    };
  }
};
</script>

<style scoped lang="scss">
.db-l,
.db-r,
.db-c {
  display: inline-block;
  vertical-align: top;
  width: 49.8%;
}

.db-c {
  width: 0.4%;
  cursor: col-resize;
  &.isOnMousedown {
    background: rgba(#000, 0.3);
  }
}
</style>
