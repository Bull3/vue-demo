<template>
  <el-dialog class="dialog-one" :visible.sync="dialogCfg.isShow" :show-close="false" :close-on-click-modal="false" width="30%">
    <div slot="title" class="el-dialog__title">
      <span>弹框-单操作</span>
      <span class="fr close-btn" @click="dialogCfg.isShow = false">
        <svg-icon icon-class="close" />
      </span>
    </div>
    <!-- <span>
      <el-form ref="form" :model="formData.data" label-width="130px">
        <template v-for="form of testData">
          <el-form-item :label="form.label">
            <el-input v-if="form.type === 'input'" v-model="formData[form.code]"></el-input>
            <el-select v-if="form.type === 'select'" v-model="formData[form.code]" class="w100" placeholder="请选择活动区域">
              <el-option v-for="op of form.data" :key="op.value" :label="op.label" :value="op.value"></el-option>
            </el-select>
          </el-form-item>
        </template>
      </el-form>
    </span> -->
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" @click="submit">确 定</el-button>
      <el-button @click="dialogCfg.isShow = false">取 消</el-button>
    </span>
  </el-dialog>
</template>
<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { log } from "@/utils";
@Component
export default class dialogOne extends Vue {
  @Prop({
    default: () => {
      return {
        isShow: true
      };
    }
  })
  dialogCfg!: boolean;
  formData: any = {};
  testData: any = [
    {
      label: "测试录入框",
      type: "input",
      code: "test1"
    },
    {
      label: "源单单据类型字段",
      type: "input",
      code: "test3"
    },
    {
      label: "测试下拉框",
      type: "select",
      code: "test2",
      data: [
        {
          label: "选项1",
          value: "xx1"
        },
        {
          label: "选项2",
          value: "xx2"
        }
      ]
    }
  ];

  submit() {
    log(this.formData);
  }
}
</script>
