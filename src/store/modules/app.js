/*
 * 模块化结构  vuex
 */
import cookies from 'cookiesjs'
import { getLogin } from '../../api/login'


const state = {
  num: 20,//测试
  showNavList: JSON.parse(sessionStorage.getItem('showNavList')),//取出需要转 对象
  userName: cookies('userName'),
  dateToString(){
    const myDate =  new Date();
    const Y = myDate.getFullYear();
    let M = myDate.getMonth()+1;
    let D = myDate.getDate();
    let H = myDate.getHours();
    let Mts = myDate.getMinutes();
    M = M <= 9 ? '0'+M : M
    D = D <= 9 ? '0'+D : D
    H = H <= 9 ? '0'+H : H
    Mts = Mts <= 9 ? '0'+Mts : Mts
    const curDay = Y + '-'+ M + '-' + D + '-' + H + ':' + Mts;
    return curDay
}
}
// Getter 用 state 作为 函数第一个参数，后面是传入的值, getter类似 computed计算属性
const getters = {
  SET_NUM: state => state.num + 10,
  GET_NUM: state => state.userName
}
const mutations = {  // 只能 同步 修改 state 中的东西
  SET_SHOWNAVLIST: state => {
    state.showNavList = !state.showNavList
    console.log('app.js--------------')
    console.log(state.showNavList + 'vuex ---- mutations方法 ------ 改变showNavList  专门同步改变 state中的值 ')
    // 存入缓存 3种方式 sessionStorage  临时存放关闭窗口小时    localStorage  长期存放     安装依赖 cookies_js一般用老带传递参数给后台 具体看业务需求
    sessionStorage.setItem('showNavList', JSON.stringify(state.showNavList))//存入转字符串 取出转对象 //临时存入localstore

  },
  RM_TOKEN: () =>{
     return new Promise((resolve) => {
      cookies({token : null})
      cookies({userName : null})
      resolve();
    })
  },
  SET_USERNAEM : (state,value) => state.userName = value,

}
const actions = { // 可以异步调用  也可以同步 调用 mutations中的方法

  // 同步调用 motations
  // changeNav: (context,data) => { 
  changeNav: ({ commit }, data) => {// 可以结构 context
    // console.log(context) // 中 是vuex中所有参数 可以调用
    console.log(data) // 是调用者传递过来的参数
    commit('SET_SHOWNAVLIST')// 同步调用 motations 
  },
  // 异步调用 使用 pormiss  , 把登录 方法 放进来  
  login(context, data) {
    return new Promise((resolve) => {
      getLogin(data.userName, data.passWord, data.code, function (res) {
        console.log('回调函数成-------------------------vuex------actions');
        console.log(res)
        resolve(res);
      })
    })
    // 这里的.then方法留给需要返回数据的地方，比如前端  login.vue 调用此方法的地方
  },
  exit({commit}){
    commit('RM_TOKEN')
  }
}

export default {
  namespaced: true,//namespaced:true，之后在不同页面中引入getter、actions、mutations时，需要加上所属的模块名,解决同名问题
  state,
  getters,
  mutations,
  actions
};