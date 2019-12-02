<template>
  <el-dialog v-bind="$attrs" class="b-dialog dialog-min-w" :visible.sync="visible" :show-close="false" :close-on-click-modal="false" :width="width" @close="$emit('update:show', false)">
    <div slot="title" class="el-dialog__title">
      <span>{{title}}</span>
      <span class="fr close-btn" @click="visible = false">
        <svg-icon icon-class="close" />
      </span>
    </div>
    <slot/>
    <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取 消</el-button>
      <el-button type="primary" @click="onSubmit">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  props: {
    show: {
      type: Boolean,
      required: true
    },
    width: {
      type: String,
      default: '40%'
    },
    title: {
      type: String,
      default: '弹框'
    }
  },
  data() {
    return {
      visible: false
    };
  },
  watch: {
    show: {
      immediate: true,
      handler: function (val) {
        this.visible = val
      }
    }
  },
  methods: {
    onSubmit() {
      this.$emit('onSubmit')
      // this.visible = false
    }
  },
};
</script>

<style  lang="scss">
</style>
