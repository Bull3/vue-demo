import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
// @ts-ignore
import vGanttChart from 'v-gantt-chart'

import 'element-ui/lib/theme-chalk/index.css'
const locale = require('element-ui/lib/locale/lang/zh-CN').default;  // lang i18n
Vue.use(ElementUI, { locale, size: 'mini' })
Vue.use(vGanttChart)
// 引入svg icon
import '@/icons';
// 引入scss
import "@/styles/index.scss";

// 引入组件
import "@/components";

// // @ts-ignore
// import formCreate, {maker} from '@form-create/element-ui'
// Vue.use(formCreate)

Vue.config.productionTip = false
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
