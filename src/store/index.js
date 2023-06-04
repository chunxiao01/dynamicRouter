import Vue from "vue"
import Vuex from "vuex"

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    dynamicMenuList: []
  },
  mutations: {
    addMenu(state, menulist) {
      state.dynamicMenuList = menulist
    }
  },
  actions: {
    actionAddMenu(context, menulist) {
      context.commit("addMenu", menulist)
    }
  }
})

export default store
