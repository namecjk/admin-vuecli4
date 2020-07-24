// 拦截器 interceptors
// 这里只有 axios实例  和axios拦截器，没有axios请求API
import axios from 'axios'
import { Message } from 'element-ui';

// 引入验证格式
import { validateEmail } from "@/utils/validate";

// const BASEURL = process.env.NODE_ENV === 'production' ? '' : '/api'; // 路径写在这里不是很安全，使用环境变量来处理
const BASEURL = process.env.NODE_ENV === 'production' ? process.env.VUE_APP_API : process.env.VUE_APP_API;
console.log( process.env.VUE_APP_API);
console.log(BASEURL);


// axios实例   baseURL === 基础值 必须存在最前面的url值
const axiosInstance = axios.create({
    baseURL: BASEURL, 
    timeout: 15000, //请求超过这个时间就报错请求超时，可以把事件设置长一点
    // headers: {'X-Custom-Header': 'foobar'}
  });


// axios拦截器
// Add a request interceptor 请求拦截
axiosInstance.interceptors.request.use(function (config) {
    // Do something before request is sent  
    // 请求之前做的事情
    // 后端会要求前端传一些值到 请求头作为参数 如 token 子类
    // 在config中传值 
    // token
    // userId
    // sui
    // 业务需求
    // console.log(2)
    // console.log(config.headers)

    // config.headers['token'] = 'asdasdasdasdas';
    // config.headers['userIp'] = '1111111111';
    // config.headers['qwe'] = '333333';
    // 添加完 注意要 return config

    if(config.data.email == '' || !validateEmail(config.data.email)) return Message.error('邮箱错误=空=拦截器');
    return config;

  }, function (error) {
    // Do something with request error
    return Promise.reject(error);
  });

// Add a response interceptor 响应拦截
axiosInstance.interceptors.response.use(function (response) {
    // Do something with response data
    console.log('响应拦截器----成功回调函数')
    console.log(response)
    // 后端判断邮箱账户不能为空
    if(response.data == '邮箱错误')return Message.error(response.data);
    return response;
  }, function (error) {
    // Do something with response error
    console.log(111);
    return Promise.reject(error);
  });

// 导出axios实例
export default axiosInstance;