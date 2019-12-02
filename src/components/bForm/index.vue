<template>
  <el-form :model="model" ref="elForm" label-width="100px" class="demo-ruleForm">
    
    <el-form-item label="年龄" prop="age" :rules="[
      { required: true, message: '年龄不能为空'},
      { type: 'number', message: '年龄必须为数字值'}
    ]">
      <el-input type="age" v-model.number="model.age" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm">提交</el-button>
      <el-button @click="resetForm">重置</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  data() {
    return {
      model: {
        age: ''
      }
    };
  },
  methods: {
    submitForm() {
      this.$refs.elForm.validate((valid) => {
        if (valid) {
          alert('submit!');
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm() {
      this.$refs.elForm.resetFields();
    }
  },
};
</script>

<style scoped lang="scss">
</style>
