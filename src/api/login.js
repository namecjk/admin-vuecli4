// 模板逻辑 === 请求API

// 引入拦截器中创建的axios实例
import axiosInstance from '@/utils/interceptors'
// 这个axiosInstance是拦截器中传递过来的,默认就有url参数排最前面，这里请求的url根据后台的来写
// 下列请求url为空 ==== 默认http://localhost:8080/api  

/**
 * 获取验证码
 * */ 
export function getPassCode(email,passWord,loginOrregister){
   return new Promise((resolve,reject)=>{
    if (!email && !passWord && !loginOrregister) return console.log('账户密码错误');
    // 请求后台获取验证码之前，查询一下该email是否存在 如果存在 说明是注册过的，应该阻止请求
    loginOrregister = loginOrregister == 'login' ? 'logincode' : 'reqcode';
    axiosInstance.request({
        method:"POST",
        url:loginOrregister,
        data:{
            email,
            passWord
        }
    })
    .then(function (response) {
            console.log('前台成功回调函数')
            resolve(response);
    })
    .catch(function (error) {
            console.log('这里的错误是前端发送请求的catch回调函数保存')
            reject(error);
    });
   })
}
 
 /**
 * 登录
 * */ 
export function getLogin(email,passWord,passcode,callback){
    if (!email && !passWord && !passcode) return console.log('账户密码错误');
    // 请求后台获取验证码之前，查询一下该email是否存在 如果存在 说明是注册过的，应该阻止请求
    console.log('后台拿到的加密')
    console.log(passWord)
    axiosInstance.request({
        method:"POST",
        url:"login",
        data:{
            email,
            passWord,
            passcode
        }
    })
    .then(function (response) {
            console.log('登录成功--------回调函数执行成功')
            console.log(response);
            // 返回给前端
            callback(response);
          
    })
    .catch(function (error) {
            console.log('这里的错误是前端发送请求的catch回调函数保存')
            console.log(error);
    });
}

 /**
 * 注册
 * */ 
export function getRegister(email,passWord,passcode){
    if (!email && !passWord && !passcode) return console.log('账户密码错误');
    // 请求后台获取验证码之前，查询一下该email是否存在 如果存在 说明是注册过的，应该阻止请求
    console.log('后台拿到的加密')
    console.log(passWord)
    axiosInstance.request({
        method:"POST",
        url:"register",
        data:{
            email,
            passWord,
            passcode
        }
    })
    .then(function (response) {
            console.log(1)
            console.log(response);
    })
    .catch(function (error) {
            console.log('这里的错误是前端发送请求的catch回调函数保存')
            console.log(error);
    });
}

  /**
 * 获取用户角色
 * */