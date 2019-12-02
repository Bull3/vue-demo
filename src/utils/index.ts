import cloneDeep from "lodash/cloneDeep";
// 输出
export function log(v1?: any, v2?: any) {
    if (v2) {
        console.log(cloneDeep(v1), cloneDeep(v2));
    } else {
        console.log(cloneDeep(v1));
    }
}

// 路由跳转
export function goTo(_this: any, menu: any) {
    if (_this.$route.query.mnum === menu.mnum) return;
    _this.$router.push({
        path: `/`,
        query: {
            mnum: menu.mnum
        }
    });
    localStorage.setItem("menu", JSON.stringify(menu));
}
