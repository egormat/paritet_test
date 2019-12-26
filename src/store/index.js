import Vuex from 'vuex'
import Vue from 'vue'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    firstValue: 0,
    secondValue: 0,
  },

  mutations: {
      updateFirst(state, value){
          state.firstValue = value;
      },
      updateSecond(state,value){
        state.secondValue = value;
      },
      sum(state){
        state.firstValue = state.secondValue*2;
      },
      constant(state){
        state.secondValue = 1000;
      }
  },

  actions: {
    updateFirst({commit}, value){
        commit('updateFirst', value)
    },
    updateSecond({commit},value){
      commit('updateSecond', value)
    },
    sum({commit}){
      commit('sum')
    },
    constant({commit}){
      commit('constant')
    }
  }
});
