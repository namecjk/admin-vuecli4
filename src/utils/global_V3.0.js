// 全局引用方法-Vue3.0响应式写法可监听



// intoList中有使用到 


import { MessageBox } from 'element-ui';
import { reactive } from "@vue/composition-api";
import { getClassify } from "@/api/news.js";

export function globalVueT(){
    const comfirmData = reactive({
            itemArr:[],
            aa:'asdasdasd111222aaasss',
            globalDelete:(root,data) => {
                MessageBox.confirm( data.msg, data.warn|| '提示', { // data.msg, data.warn 是提示信息
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                  }).then(() => {
                      // 改变值
                      // comfirmData.aa = '阿萨德阿萨德';
                      // 判断 
                      // console.log(data)
                      data && data.fn();
                      root.$message({
                      type: 'success',
                      message: '删除成功!'
                    });
                  }).catch((err) => {
                      console.log(err)
                    root.$message({
                      type: 'info',
                      message: '已取消删除'
                    });          
                  });
    
            }
    });

    const comfirmMessage = (root,data) =>{

        return new Promise((resolve, reject) => {
          MessageBox.confirm( data.msg, data.warn|| '提示', { // data.msg, data.warn 是提示信息
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
              resolve('success');
          }).catch(() => {
            reject('cancel')          
          });
          
        })
        

    };


    const comfirmGetClassify = (data) =>{
      // return new Promise((resolve) => {
        getClassify(data.email,data.token).then(res=> {
            console.log('成功----------cmdGetClassify');
            let resData = res.resultFind[0].className;
            comfirmData.itemArr = resData
            // resolve(comfirmData.itemArr);
          });
  // })
    }

    return {comfirmMessage,comfirmData,comfirmGetClassify}
}