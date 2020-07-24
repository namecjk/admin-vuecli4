import Vue from "vue";
import VueCompositionApi from '@vue/composition-api';
import App from "./App.vue";
import router from "./router";
import store from "./store";
import './router/routeGuard';

// // 学习  Vue.directive(name,{})  第二种方法控制 角色按钮显示隐藏  在user.js上使用
// Vue.directive('ShowBtn',{ //全局注册，使用在元素向 v-name
//    bind:(el,bindind)=>{
//       // console.log(el.className);
//      //  操作DOM  el 如：el.className = el.className + ' showBtn'; el.style.display = 'block'; 
//       if(bindind.def.isShowBtn(bindind.value)){
//         // el.style.display = 'block';  这样写没有css
//          el.className = el.className + ' showBtn';//操作DOM  classname + 自定义css name
//       }
//    },//只调用一次，指令第一次绑定到元素时候调用，用这个钩子可以定义一个绑定时执行一次的初始化动作
//    inserted:()=>{
//     // console.log('inserted---');
//     // console.log(el.parentNode);//处理父节点在这里才能处理
//    },//被绑定的元素插入 父节点的时候 调用（父节点存在即可调用，不必存在于 document 中）
//    update:()=>{
//     // console.log('update---');
//    },//被绑定与元素所有模板时调用，而且无论绑定值是否有变化，通过比较更新前后的绑定值，忽略不必要的模板更新(比如当一个输入框的model发生了变化就会触发指令)
//    componentUpdated:()=>{
//     // console.log('componentUpdated---');
//    },//被绑定的元素模板完成一次更新周期的时候调用
//    unbind:()=>{
//     // console.log('unbind---');
//    },//只调用一次，指令元素解绑的时候调用
//    isShowBtn:(value)=>{//自定义函数，可以通过bindind.dev拿到
//     return store.getters['dynamicRoutes/getRoleBtn'].includes(value);
//    }
// })
import '@/utils/showRoleBtn.js';// 将Vue.directive(name,{}) 抽离出独立js文件也可以的


// 全局引用方法-Vue原型中注入方法
// import global from './utils/global'
// Vue.use(global);
// 全局引用动态路由中角色按钮信息    ------ 引用方法
import {isShowBtn} from '@/utils/btnDisplay'
Vue.prototype.showBtn = isShowBtn; //调用直接放名称showBtn就行   prototype
// 全局组件引用 icon
import svgIcon from './components/svg-icon.vue'
Vue.component('svg-icon',svgIcon)
// uoload
import upLoad from './components/upLoad.vue'
Vue.component('up-load',upLoad)
// editor
// import editor from './components/editor.vue'
// Vue.component('edit-or',editor)
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
