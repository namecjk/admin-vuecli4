import Vue from "vue";
import VueCompositionApi from '@vue/composition-api';
import App from "./App.vue";
import router from "./router";
import store from "./store";
import './router/routeGuard';

// 全局引用方法-Vue原型中注入方法
// import global from './utils/global'
// Vue.use(global);
// 全局组件引用
import svgIcon from './components/svg-icon.vue'
Vue.component('svg-icon',svgIcon)
// vue3.0引用
Vue.use(VueCompositionApi);
// element-ui相关全局引入
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

Vue.config.productionTip = false;


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
