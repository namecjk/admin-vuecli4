// 引入拦截器中创建的axios实例
import axiosInstance from '@/utils/interceptors'
// 这个axiosInstance是拦截器中传递过来的,默认就有url参数排最前面，这里请求的url根据后台的来写
// 下列请求url为空 ==== 默认http://localhost:8080/api  



/**
 * 添加分类
 * */ 
export function addClassify(email,token,updateData){
    return new Promise((resolve, reject) => {
        console.log('addClassifyaddClassify');
        console.log(updateData);
        if (!email || !token || !updateData) return console.log('数据有错误');
        axiosInstance.request({
            method:"POST",
            url:"addClassify",
            data:{
                email,
                token,
                updateData
            }
        })
        .then(function (response) {
                // console.log(1)
                // console.log(response);
                console.log('成功------------addClassify');
                resolve(response);
        })
        .catch(function (error) {
                console.log('这里的错误是前端发送请求的catch回调函数保存------news addClassify');
                // console.log(error);
                reject(error);
        });
     
   })
   
}


  /**
 * 获取分类
 * */ 
export function getClassify(email,token){
    return new Promise((resolve, reject) => {
        if (!email || !token ) return console.log('数据有错误------------------getClassify');

        axiosInstance.request({
            method:"POST",
            url:"getClassify",
            data:{
                email,
                token
            }
        })
        .then(function (response) {
                // console.log('getClassify---------成功');
                // console.log(response);
                if (response.data.length !== 0) {
                    // console.log(response.data);
                    resolve(response.data)
                }else{
                    resolve('错误')
                }
        })
        .catch(function (error) {
                console.log('这里的错误是前端发送请求的catch回调函数保存------news getClassify')
                console.log(error);
                reject(error);
        });

      
    })
    
   
}

 /**
 * 获取全部分类
 * */ 
export function getAllClassData(email,token){
    return new Promise((resolve, reject) => {
        if (!email || !token ) return console.log('数据有错误------------------getClassify');

        axiosInstance.request({
            method:"POST",
            url:"getClassify",
            data:{
                email,
                token
            }
        })
        .then(function (response) {
                console.log('getAllClassData---------成功11');
                // console.log(response);
                if (response.data.length !== 0) {
                    console.log(response)
                    resolve(response.data)
                }else{
                    resolve('错误')
                }
        })
        .catch(function (error) {
                console.log('这里的错误是前端发送请求的catch回调函数保存------news getClassify')
                console.log(error);
                reject(error);
        });

      
    })
    
   
}


 /**
 * 获取分页列表
 * */ 
export function getPageList(email,token,pageNo,pageSize){
    return new Promise((resolve, reject) => {
        if (!email || !token ) return console.log('数据有错误------------------getPageList');

        axiosInstance.request({
            method:"POST",
            url:"pageList",
            data:{
                email,
                token,
                pageNo,
                pageSize
            }
        })
        .then(function (response) {
                console.log('getPageList---------成功11');
                // console.log(response);
                if (response.data.length !== 0) {
                    console.log(response)
                    resolve(response.data)
                }else{
                    resolve('错误')
                }
        })
        .catch(function (error) {
                console.log('这里的错误是前端发送请求的catch回调函数保存------news getPageList')
                console.log(error);
                reject(error);
        });

      
    })
    
   
}
