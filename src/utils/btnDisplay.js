import store from '@/store/index';
// import cookies from 'cookiesjs';

// 路由守卫赋值，拿角色信息和存角色信息，这里只赋值从vuex中去角色信息，return 出去
export function isShowBtn(showBtn){//参数邮箱和token 
    // let data = {userName:cookies('userName'),token:cookies('token')};
    // console.log(store.getters['dynamicRoutes/getRoleBtn'].includes(showBtn));
    return store.getters['dynamicRoutes/getRoleBtn'].includes(showBtn);

}