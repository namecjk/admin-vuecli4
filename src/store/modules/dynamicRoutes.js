/*
 * 模块化结构  vuex
 */
import {getUserRole} from '@/api/user';
import {defaultRoutes,dynamicRoutes} from "@/router/index";

// 判断角色是否包含动态路由方法
let judgeRole = (role,routers)=>{//参数是，角色信息和动态路由 routers是循环过后的一个对象传过来的
   // 数组点includes     返回 布尔值
   // 字符串点indexOf    返回  如果存在返回下标位置 否则返回-1
   if(routers.meta && routers.meta.role){
        return role.some(item => routers.meta.role.indexOf(item) !== -1);
   }

}

const state = {
    routerRole:[],//角色信息
    allRouters:defaultRoutes,//所有路由容器，默认等于-默认路由
    dynamicRoutesWraper:[],//动态路由
    RoleBtn:[],//角色信息按钮
}
// Getter 用 state 作为 函数第一个参数，后面是传入的值, getter类似 computed计算属性
const getters = {
 getRouterRole : state => {
     console.log(state.routerRole);
     return  state.routerRole
    
 },//拿到角色信息
 getAllRouters : state => state.allRouters,//拿到所有路由信息
 getDynamicRoutesWraper : state => state.dynamicRoutesWraper,//拿到动态路由信息
 getRoleBtn : state => state.RoleBtn,//拿到角色信息按钮
}
const mutations = {  // 只能 同步 修改 state 中的东西
    deleteStateRouterRole:(state)=>state.routerRole = [],//退出账户调用清空角色信息;
    deleteStateAllRouters:(state)=>state.allRouters = defaultRoutes,// 去掉所有路由中的动态路由，让其默认=默认存在的路由;
    setStateRouterRole:(state,data)=>state.routerRole = data,//拿到角色信息数据，保存到state.routerRole 中的方法 -保存角色信息
    setStateDynamicRoutes:(state,data)=>{
        //拿到动态路由，保存到state.dynamicRoutesWraper中
        state.dynamicRoutesWraper = data
        // 并且将所有的路由容器（默认=默认路由）concat 拼接上动态路由
        state.allRouters = state.allRouters.concat(state.dynamicRoutesWraper);
        //state.allRouters == 根据角色信息拼接好的动态路由
        // console.log(state.dynamicRoutesWraper);
    },
    setStateRoleBtn:(state,data)=>{
        // 拿到角色按钮信息 赋值
        state.RoleBtn = data;
    }

}
const actions = { // 可以异步调用  也可以同步 调用 mutations中的方法

setRouterRole(content,data){//主要是调用调用mutations方法设置将角色信息保存到state.routerRole
    return new Promise((resolve,reject)=>{
        // 配置动态路由先要获取角色的信息
        getUserRole(data).then(res=>{
            if(res.data.role.length > 0){
                content.commit('setStateRouterRole',res.data.role);//调用mutations方法设置将角色信息保存到state.routerRole
                resolve({role:res.data.role});//返回角色信息
            }
        }).catch(err=>{
            reject(err+"---------setRouterRole")
        })
    })
},
// 创建动态路由
createDynamicRoutes(content,data){//data=角色信息
    return new Promise((resolve)=>{
        let role = data.role;//["信息管理","用户管理"]
        // 循环动态路由，匹配是否包含角色信息
       let createdRouter = dynamicRoutes.filter(item => {
           if(role.includes('admin')){//判断超管
                return item;
           }else if(role.includes(item.system)){//判断系统
                return item;
            }else if(judgeRole(role,item)){//判断角色-先判断一个模块是否存在角色，在判断一个模块下的children模块是否存在角色，存在就展现
                //   到这一步说明角色存在角色信息，在判断角色信息下的children是否存在角色信息
                   let childrenFinish =  item.children.filter(childrenItem => {//找出模块中的chilren模块是否存在角色
                        if(judgeRole(role,childrenItem))return childrenItem;
                    });
                    item.children = childrenFinish;//将过滤好的children角色，赋值给整体的模块
                    return item//在返回整体模块--主要是筛选某模块下的children模块里存在角色信息的模块返回给整体模块
            }
        })
        // console.log(createdRouter);
        // 调用mutations方法将过滤好的动态路由保存到state中，并且将默认路由和动态路由拼接在赋值给所有路由容器
        content.commit('setStateDynamicRoutes',createdRouter);  //createdRouter == 保过滤好的动态路由
        // 最后返回，说明到这里已经拼接完动态路由，调用者在通过.then继续执行
        resolve();
    })
  },

// 取到角色按钮信息、调用mutations方法-赋值保存到state中
getRoleBtinInfo(content,data){
  return new Promise((resolve,reject)=>{
    getUserRole(data).then(res=>{
        let btnArr = res.data.childAcc ? res.data.childAcc.btn : res.data.resluts[0].btn;
        if(btnArr.length > 0){
            content.commit('setStateRoleBtn',btnArr);//调用mutations方法设置将角色信息保存到state.routerRole
            resolve();
        }
    }).catch(err=>{
        reject(err+"--------getRoleBtinInfo");
    })
  })

}

};


export default {
  namespaced: true,//namespaced:true，之后在不同页面中引入getter、actions、mutations时，需要加上所属的模块名,解决同名问题
  state,
  getters,
  mutations,
  actions
};