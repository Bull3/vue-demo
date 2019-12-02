<template>
  <div class="home">
    <HsToolBar :btnData="btnData" @toolBarOnClick="toolBarOnClick"/>
    <div class="home-main">
      <component ref="mainCom" :is="filterMnum(mnum)" v-bind="attrs"></component>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
@Component({
  components: {
    "page404": () => import('../components/page404/index.vue'),
    "userMgr": () => import('./userMgr/index.vue'),
    "userGroupMgr": () => import('./userGroupMgr/index.vue'),
  }
})

export default class Home extends Vue {
  attrs: any = "";
  btnData: any = [
    {
      btns: [
        { code: "refresh", name: "刷新", notDialog: true },
        { code: "add", name: "新增", noMgTop: true, width: '50%' },
        {
          code: "operation",
          name: "业务操作",
          options: [
            { code: "forbid", name: "禁用" },
            { code: "opForbid", name: "反禁用" },
            { code: "userRole", name: "用户分配角色", noMgTop: true, width: '50%' },
            { code: "userGroupRole", name: "用户组分配角色", noMgTop: true, width: '50%' }
          ]
        },
        {
          code: "search",
          name: "业务查询",
          options: [
            { code: "objInfo", name: "联系对象信息" },
            { code: "searchPower", name: "查询权限" }
          ]
        },
        {
          code: "passwordPlan",
          name: "密码策略",
          options: [
            { code: "passPlan", name: "密码策略" },
            { code: "resetPass", name: "重置密码", width: '25%', single: true },
            { code: "userPeriod", name: "用户时效", width: '25%', multiple: true }
          ]
        }
      ]
    }
  ];
  get mnum() {
    return this.$route.query.mnum;
  }

  created() {
    // this.attrs = {
    //   mnum: this.mnum,
    // }
  }
  
  toolBarOnClick(item: any) {
    let obj: any = this.$refs.mainCom;
    obj.$emit("toolBarOnClick", item);
  }

  filterMnum(mnum: any) {
    let obj: any = {
      userMgr: 'userMgr',
      userGroupMgr: 'userGroupMgr',
    }
    return obj[mnum] || 'page404'
  }
}
</script>

<style lang="scss" scoped>
.home {
  height: 100%;
  width: 100%;
}

.home-main {
  height: calc(100% - 56px);
  overflow: auto;
  border-radius: 5px;
}
</style>
