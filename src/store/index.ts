import Vue from 'vue'
import Vuex from 'vuex'
import elementUi from './modules/elementUi';
import listOne from './modules/listOne';
import association from "./modules/association";
import getters from './getters';

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    elementUi,
    listOne,
    association
  },
  getters
})
