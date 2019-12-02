<template>
  <vsGantt v-bind="$attrs"/>
  <!-- <div>
    <el-row :gutter="20">
      <el-col :span="12">
        <div class="operation">操作区</div>
        <vsTree />
      </el-col>
      <el-col :span="12">
        <vsGantt />
      </el-col>
    </el-row>
  </div> -->
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {

  }
};
</script>
<style lang="scss">
  .operation{
    background-color: #ccccca;
    color: white;
    height: 87px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>