<template>
  <el-collapse v-model="activeNames">
    <el-collapse-item name="1">
      <template slot="title">
        <h3>密码规则</h3>
      </template>
      <el-form ref="pwdrule" :model="pwdrule" label-width="86px">
        <el-form-item label="设置规则:">
          <el-checkbox v-model="pwdrule.z2n">数字 (0-9)</el-checkbox>
          <el-checkbox v-model="pwdrule.spestr">特殊字符</el-checkbox>
          <el-checkbox v-model="pwdrule.a2z">字母(Aa-Zz，区分大小写)</el-checkbox>
        </el-form-item>
        <el-form-item label="最小长度:">
          <el-input-number v-model="pwdrule.minlen" controls-position="right" :step="1" :precision="0" :min="6" :max="20">
          </el-input-number> 位 (6-20位)
        </el-form-item>
        <el-form-item label="默认密码:" prop="defpwd" :rules="{ required: true, message: '默认密码不能为空', trigger: 'blur' }">
          <el-input v-model="pwdrule.defpwd" show-password class="input-max-w"></el-input>
        </el-form-item>
      </el-form>
      <el-checkbox v-model="pwdrule.retest">密码规则调整后登陆强制校验</el-checkbox>
    </el-collapse-item>
    <el-collapse-item name="2">
      <template slot="title">
        <h3>时效规则</h3>
      </template>
      <div>
        <el-checkbox v-model="timerule.usefulc">启用密码有效期控制，且有效期为 <el-input-number :controls="false" :step="1" :precision="0" :min="1" v-model="timerule.useful" class="input-small" size="mini"></el-input-number> 天（至少1天）</el-checkbox>
      </div>
      <div class="mg-top">
        <el-checkbox v-model="timerule.duewarnc">启用密码到期前预警，切提前期为 <el-input-number :controls="false" :step="1" :precision="0" :min="1" v-model="timerule.duewarn" class="input-small"></el-input-number> 天</el-checkbox>
      </div>
    </el-collapse-item>
    <el-collapse-item name="3">
      <template slot="title">
        <h3>控制规则</h3>
      </template>
      <div>
        <el-checkbox v-model="conrule.syscg">使用系统生成密码登录系统时要求修改密码</el-checkbox>
      </div>
      <div class="mg-top">
        <el-checkbox v-model="conrule.syslgc">可以使用系统生成密码登录 <el-input-number :controls="false" :step="1" :precision="0" :min="1" v-model="conrule.syslg" class="input-small"></el-input-number> 次系统</el-checkbox>
      </div>
      <div class="mg-top">
        <el-checkbox v-model="conrule.errlockc">登录系统时密码输入错误 <el-input-number :controls="false" :step="1" :precision="0" :min="1" v-model="conrule.errlock" class="input-small"></el-input-number> 次后自动锁定用户</el-checkbox>
      </div>
      <div class="mg-top">
        <el-checkbox v-model="conrule.lockrec">用户锁定
          <el-input-number :controls="false" :step="1" :precision="0" :min="1" v-model="conrule.locklen" class="input-small"></el-input-number>
          <el-select v-model="conrule.lockunt" placeholder="单位" @click.native.prevent style="width: 76px;margin-left: 5px;">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
          后自动解锁
        </el-checkbox>
      </div>
    </el-collapse-item>
  </el-collapse>
</template>

<script>
export default {
  data() {
    return {
      activeNames: ['1', '2', '3'],
      pwdrule: {},
      timerule: {},
      conrule: {},
      options: [{
        value: '1',
        label: '分钟'
      }, {
        value: '10',
        label: '小时'
      }, {
        value: '20',
        label: '天'
      }],
    };
  },
  created() {
    this.$on('submit', this.submit)
    let resData = {
      "suc": true,
      "msg": "",
      "data": {
        "pwdrule": {
          "z2n": false,
          "spestr": false,
          "a2z": true,
          "minlen": 100,
          "defpwd": "123456",
          "retest": true
        },
        "timerule": {
          "useful": 300,
          "usefulc": false,
          "duewarn": 7,
          "duewarnc": true,
        },
        "conrule": {
          "syscg": false,
          "syslgc": true,
          "syslg": 3,
          "errlockc": false,
          "errlock": 100,
          "lockrec": false,
          "locklen": 100,
          "lockunt": "1"
        }
      }
    }
    this.pwdrule = resData.data.pwdrule
    this.timerule = resData.data.timerule
    this.conrule = resData.data.conrule
  },
  methods: {
    submit() {
      this.$refs.pwdrule.validate(valid => {
        if (valid) {
          this.$emit('update:show', false)
        }
      })
    },
  },
};
</script>

<style scoped lang="scss">
.input-small {
  width: 66px;
}
.mg-top {
  margin-top: 5px;
}
</style>
