import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

/*
配置动态路由
1、配置 默认路由（每个账户都存在）和动态路由（按需分配给角色）
*/ 

//默认路由
export const defaultRoutes = [
  {//首页
    path: "/",
    // name: "Home",
    // component: Home
    redirect: "/login",
    hide: true,
    icon:'',
    meta:{
      keepAlive:true,//为true 该组件会被缓存
      name:'首页'
    }
  },
  {//登录页面
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
  {// 控制台
    path: "/console",
    name: "Console",
    redirect: "/console/index",
    hide: false,
    icon:'setting',
    meta:{
      keepAlive:true,//为true 该组件会被缓存
      name:'控制台'
    },
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Layout/Layout.vue")
      ,children:[
        {
          path:"/console/index",
          name:"ConsoleIndex",
          meta:{
            keepAlive:true,//为true 该组件会被缓存            
            name:'首页'
          },
          component:() => import("../views/console/Consle.vue")
        }
      ]
  },
  {// 404
    path: "/404page",
    name: "404",
    hide: true,
    icon:'setting',
    meta:{
      name:'404页面'
    },
    component: () => import(/* webpackChunkName: "about" */ "../views/Layout/Layout.vue"),
    children:[
      {
        path:"/404",
        meta:{
          name:'404'
        },
        component:() => import("../views/404/404.vue")
      }
    ]
  }
]

// 角色['技术员','业务员','管理员']
// 动态路由
export const dynamicRoutes = [
  {// 信息管理
    system:"信息管理",
    path: "/infomations",
    name: "infomations",
    hide: false,
    icon:'info',
    meta:{
      keepAlive:true,//为true 该组件会被缓存
      role:['admin','技术员'],
      name:'信息管理'
    },
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Layout/Layout.vue"),
      children:[
        {
          path:"/infolist",
          name:"infolist",
          meta:{
            keepAlive:false,//为true 该组件会被缓存
            role:['admin','技术员'],
            name:'信息列表'
          },
          component:() => import("../views/infomations/infoList.vue")
        },
        {
          path:"/infoclass",
          name:"infoclass",
          meta:{
            keepAlive:true,//为true 该组件会被缓存
            role:['admin','技术员'],
            name:'信息分类'
          },
          component:() => import("../views/infomations/infoClass.vue")
        },
        {
          path:"/EditCurrentData",
          name:"EditCurrentData",
          hide: true,
          meta:{
            keepAlive:false,//为true 该组件会被缓存
            role:['admin','技术员'],
            name:'编辑详情'
          },
          component:() => import("../views/infomations/EditCurrentData.vue")
        }
      ]
  }, 
  {// 用户管理
    system:"用户管理",//角色系统分类用到，现在已经改为角色信息分类
    path: "/user",
    name: "User",
    hide: false,
    icon:'user',
    meta:{
      keepAlive:true,//为true 该组件会被缓存
      role:['admin','管理员'],
      name:'用户管理'
    },
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Layout/Layout.vue"),
      children:[
        {
          path:"/userlist",
          name:"userlist",
          meta:{
            keepAlive:true,//为true 该组件会被缓存
            role:['admin','管理员'],
            name:'用户列表'
          },
          component:() => import("../views/user/user.vue")
        }
      ]
  },
  {path:"*",redirect:"/404",hide:true}//不存在的路径就执行404页面--写在最后-把其他页面写在之后可能会报错
]



const router = new VueRouter({
  routes: defaultRoutes//路由必须=数组
});


export default router;
