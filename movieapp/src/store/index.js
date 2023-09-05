import Vue from "vue";
import Vuex from "vuex";
import moviesStore from "@/store/modules/movies";

Vue.use(Vuex);


const store = new Vuex.Store({
  state: {},
  getters: {},
  mutations: {},
  actions: {},
  modules: {
    moviesStore
  },
});

store.dispatch("initMoviesStore")
export default store