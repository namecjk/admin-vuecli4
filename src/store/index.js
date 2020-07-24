import Vue from "vue";
import Vuex from "vuex";
import app from './modules/app';
import login from './modules/login';
import command from './modules/command';
import EditDetail from './modules/EditDetail';
import dynamicRoutes from './modules/dynamicRoutes';
Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    app,
    login,
    command,EditDetail,dynamicRoutes

  }
});
