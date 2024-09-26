import { createStore } from 'vuex'
import illnesses from './illnesses';
import analyses from './analyses';
export default createStore({
  modules: {
    illnesses,
    analyses,
  },
  state: {},
  mutations: {},
  actions: {},
})
