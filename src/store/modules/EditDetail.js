/*
 * 模块化结构  vuex
 */
import { upload } from "@/api/upload.js";

const state = {
    id:'' || sessionStorage.getItem('infoId'),
    currentId:'' || sessionStorage.getItem('infoId'),
    title:'' || sessionStorage.getItem('infoTitle')
}
// Getter 用 state 作为 函数第一个参数，后面是传入的值, getter类似 computed计算属性
const getters = {
    GET_STATE_ID : (state) => state.id,
    GET_STATE_TITLE : (state) => state.title
}
const mutations = {  // 只能 同步 修改 state 中的东西
    SET_STATE_ALL(state,data){
        for(let key in data){
            state[key] = data[key].value;
            // console.log('asdasdasd123123');
            // console.log(data);
            if (data[key].sesstion) {
                sessionStorage.setItem(data[key].sessionName,data[key].value);//H5存入浏览器缓存
            }
        }
    }
    // SET_STATE_ID(state,data){
    //     state.id = data
    //     sessionStorage.setItem('infoId',data);
    // },
    // SET_STATE_TITLE: (state,data) => {
    //     state.title = data
    //     sessionStorage.setItem('infoTitle',data)}
    }
const actions = { // 可以异步调用  也可以同步 调用 mutations中的方法
    cmdUpLoad(context,data,formData){//上传文件请求API
        // console.log('cmdUpLoadcmdUpLoadcmdUpLoad');
        // console.log(data);
        return new Promise((resolve) => {
            upload(data.email,data.token,formData).then(res=> {
                console.log('cmdUpLoad------- 成功回调函数');
                resolve(res);
              });
      })
     }


}
export default {
  namespaced: true,//namespaced:true，之后在不同页面中引入getter、actions、mutations时，需要加上所属的模块名,解决同名问题
  state,
  getters,
  mutations,
  actions
};