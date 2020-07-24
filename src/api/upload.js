// 引入拦截器中创建的axios实例
import axiosInstance from '@/utils/interceptors'
// 这个axiosInstance是拦截器中传递过来的,默认就有url参数排最前面，这里请求的url根据后台的来写
// 下列请求url为空 ==== 默认http://localhost:8080/api  

export function upload(email,token,uploadFile){
    return new Promise((resolve,reject)=>{
        axiosInstance.request({
            method: 'POST',
            url:'upload',
            data:{
                email,
                token,
                uploadFile
            }
        }).then((result) => {
            console.log('来自upload.js 异步请求--成功回调函数');
            resolve(result);
        }).catch((err) => {
            console.log('来自upload.js 异步请求--失败回调函数');
            console.log(uploadFile);

            reject(err);
        });
    })

}