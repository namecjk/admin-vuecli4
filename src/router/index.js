import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    // name: "Home",
    // component: Home
    redirect: "/login",
    hide: true,
    icon:'',
    meta:{
      name:'首页'
    }
  },
  {
    path: "/login",
    name: "Login",
    hide: true,
    icon:'',
    meta:{
      name:'登录'
    },
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/login/Login.vue")
  },
  // 控制台
  {
    path: "/console",
    name: "Console",
    redirect: "/console/index",
    hide: false,
    icon:'setting',
    meta:{
      name:'控制台'
    },
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Layout/Layout.vue")
      ,children:[
        {
          path:"/console/index",
          name:"ConsoleIndex",
          meta:{
            name:'首页'
          },
          component:() => import("../views/console/Consle.vue")
        }
      ]
  },
  // 信息管理
  {
    path: "/infomations",
    name: "infomations",
    hide: false,
    icon:'info',
    meta:{
      name:'信息管理'
    },
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Layout/Layout.vue"),
      children:[
        {
          path:"/infolist",
          name:"infolist",
          meta:{
            name:'信息列表'
          },
          component:() => import("../views/infomations/infoList.vue")
        },
        {
          path:"/infoclass",
          name:"infoclass",
          meta:{
            name:'信息分类'
          },
          component:() => import("../views/infomations/infoClass.vue")
        }
      ]
  },
  // 用户管理
  {
    path: "/user",
    name: "User",
    hide: false,
    icon:'user',
    meta:{
      name:'用户管理'
    },
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Layout/Layout.vue"),
      children:[
        {
          path:"/userlist",
          name:"userlist",
          meta:{
            name:'用户列表'
          },
          component:() => import("../views/user/user.vue")
        }
      ]
  }
];

const router = new VueRouter({
  routes
});


export default router;
