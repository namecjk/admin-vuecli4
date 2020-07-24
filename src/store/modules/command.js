/*
 * 模块化结构  vuex
 */
import { getClassify,addClassify,getAllClassData,getPageList } from "@/api/news.js";

const state = {
    data : []
};
const actions = {
    cmdGetClassify(context,data){//请求当前账户的所有class的数组
        return new Promise((resolve) => {
            getClassify(data.email,data.token).then(res=> {
                console.log('成功----------cmdGetClassify');
                console.log(res);
                // console.log(res.childRes == undefined);
                let resData = res.childRes == undefined ? res.resultFind[0].className : res.childRes[0].className;
                state.data = resData;
                resolve(resData);
              });
      })
      
     },
     cmdGetContentData(context,data){
        return new Promise((resolve) => {
            getClassify(data.email,data.token).then(res=> {
                console.log('成功----------cmdGetContentData');
                let resData = res.resultFind[0].className;
                if (data.PresentName == '') return resolve(resData[0]);
                console.log(data.PresentName)
                let dd = resData.filter(resData=> resData.classParent_Name == data.PresentName);
                // console.log(data.PresentName == '')
                console.log('-------cmdGetContentData')
                console.log(dd[0])
                resolve(dd[0]);
              });
      })
      
     },
     cmdGetAllClassData(context,data){//请求当前账户所有class的增删改查数组数据
        return new Promise((resolve) => {
            getAllClassData(data.email,data.token).then(res=> {
                console.log(res)
                resolve(res);
              });
      })
      
     },
     cmdSetClassify(context,data){//给增删改查提供API
        return new Promise((resolve) => {
                addClassify(data.email, data.token, { ClassNameAllData: data.parentDisplayDatas }).then((res) => {//更新数据库        
                    console.log('cmdSetClassify----------成功回调')
                    resolve(res);
                  });
      })
      
     },
     cmdGetPageList(context,data){//请求当前账户所有class的增删改查数组数据
        return new Promise((resolve) => {
            getPageList(data.email,data.token,data.pageNo,data.pageSize).then(res=> {
                resolve(res);
              });
      })
     }
}
  


 export default {
    namespaced: true,//namespaced:true，之后在不同页面中引入getter、actions、mutations时，需要加上所属的模块名,解决同名问题
    actions,
    state
 }