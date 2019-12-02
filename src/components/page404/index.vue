<template>
  <div>
    <h3>
      当前为测试Tab
      <span style="color:#409EFF">{{ name }}</span> 无内容，点击下方按钮跳转
    </h3>
    <br />
    <el-button type="primary" @click="goTo('list')">跳转到列表</el-button>
    <el-button type="primary" @click="goTo('edit')">跳转到编辑</el-button>
    <el-button type="primary" size="small">测试</el-button>
  </div>
</template>

<script>
import { goTo } from "@/utils";

export default {
  data() {
    return {
      name: JSON.parse(localStorage.getItem("menu")).name
    };
  },
  watch: {
    $route(nv, ov) {
      this.name = JSON.parse(localStorage.getItem("menu")).name;
    }
  },
  methods: {
    goTo(param) {
      let data = null;
      if (param === "list") {
        data = {
          icon: "setting",
          name: "列表",
          mtype: "list",
          mnum: "xuanxiang1"
        };
      } else {
        data = {
          icon: "setting",
          name: "编辑",
          mtype: "list",
          mnum: "xuanxiang2"
        };
      }
      goTo(this, data);
    }
  }
};
</script>

<style scoped lang="scss">
</style>
