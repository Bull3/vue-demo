<template>
  <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="80px" label-position="left">
    <el-form-item label="新密码" prop="pass" style="margin-bottom: 22px;">
      <el-input show-password v-model="ruleForm.pass" class="input-max-w">
      </el-input>
    </el-form-item>
    <el-form-item label="新密码确认" prop="checkPass">
      <el-input show-password v-model="ruleForm.checkPass" class="input-max-w">
      </el-input>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else {
        if (this.ruleForm.checkPass !== '') {
          this.$refs.ruleForm.validateField('checkPass');
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.ruleForm.pass) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    return {
      ruleForm: {
        pass: '',
        checkPass: '',
      },
      rules: {
        pass: [
          { validator: validatePass, trigger: 'blur' }
        ],
        checkPass: [
          { validator: validatePass2, trigger: 'blur' }
        ]
      }
    };
  },
  created() {
    this.$on('submit', this.submit)
  },
  methods: {
    submit() {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          // let newpwd = this.ruleForm.pass
          this.$emit('update:show', false)
        }
      })
    },
  },
};
</script>

<style scoped lang="scss">
.input-max-w {
  max-width: 300px;
}
</style>
