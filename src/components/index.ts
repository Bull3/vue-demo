import Vue from 'vue'

export { default as HsTop } from './HsTop/index.vue';
export { default as HsMenu } from './HsMenu/index.vue';
export { default as HsTab } from './HsTab/index.vue';
export { default as dialogOne } from './dialogOne/index.vue';

// export { default as bTable } from './bTable/index.vue';
// export { default as bDialog } from './bDialog/index.vue';
import HsToolBar  from './HsToolBar/index.vue';
import bDialog  from './bDialog/index.vue';
import bTable  from './bTable/index.vue';
import bForm  from './bForm/index.vue';

Vue.component("HsToolBar", HsToolBar)
Vue.component("bTable", bTable)
Vue.component("bDialog", bDialog)
Vue.component("bForm", bForm)
