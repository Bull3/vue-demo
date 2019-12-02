<template>
  <div class="tool-bar">
    <div class="btns" v-for="(item, i) of btnData" :key="'btns_' + i">
      <template v-for="(subItem, i1) of item.btns">
        <div v-if="!subItem.options" :key="'btn_' + i1" :class="'btn ' + (item.btns.length > 1 ? 'has-btns' : 'no-btns')" @click="toolBarlClick(subItem)">
          <span>
            {{ subItem.name }}
          </span>
        </div>
        <div v-else :key="'btn_' + i1" :class="'btn ' + (item.btns.length > 1 ? 'has-btns' : 'no-btns')">
          <el-dropdown trigger="click" @command="toolBarlClick">
            <span>
              {{ subItem.name }}<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown" :key="'dpmenu_' + i1">
              <el-dropdown-item v-for="(op, index) of subItem.options" :key="'dpitem_' + index" :command="op" :disabled="op.disabled" :divided="op.divided">{{ op.name }}</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </template>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop, Watch } from "vue-property-decorator";
import { log } from "@/utils";
import bus from "@/utils/eventBus";
@Component
export default class toolBar extends Vue {
  @Prop() btnData!: Array<Object>;

  // dropdownIshow: boolean = false;
  // myBtnData: any = [];
  // @Watch("$route", { immediate: true })
  // routeChange(newRoute: any) {
  //   if (newRoute.query) {
  //     this.btnData = [
  //       {
  //         btns: [
  //           { code: "refresh", name: "刷新", notDialog: true },
  //           { code: "add", name: "新增" },
  //           {
  //             code: "operation",
  //             name: "业务操作",
  //             options: [
  //               { code: "forbid", name: "禁用" },
  //               { code: "opForbid", name: "反禁用" },
  //               { code: "userRole", name: "用户分配角色" },
  //               { code: "userGroupRole", name: "用户组分配角色" }
  //             ]
  //           },
  //           {
  //             code: "search",
  //             name: "业务查询",
  //             options: [
  //               { code: "objInfo", name: "联系对象信息" },
  //               { code: "searchPower", name: "查询权限" }
  //             ]
  //           },
  //           {
  //             code: "passwordPlan",
  //             name: "密码策略",
  //             options: [
  //               { code: "passPlan", name: "密码策略" },
  //               { code: "resetPass", name: "重置密码", width: '25%' },
  //               { code: "userPeriod", name: "用户时效", width: '25%' }
  //             ]
  //           }
  //         ]
  //       }
  //     ];
  //   }
  // }
  toolBarlClick(item: any) {
    this.$emit("toolBarOnClick", item);
    // this.$parent.$emit("toolBarOnClick", item);
  }
}
</script>
