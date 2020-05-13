// 过滤特殊字符
export function stripscript(str)
{
var pattern = new RegExp("[`~!@#$^&*()=|{}':;',\\[\\].<>/?~！@#￥……&*（）——|{ }【】‘；：”“'。，、？]")
var rs = "";
for (var i = 0; i < str.length; i++) {
rs = rs + str.substr(i, 1).replace(pattern, '');
}
return rs;
}

// 验证邮箱
export function validateEmail(str){
    let isEmail = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
    return isEmail.test(str) ? false : true
    // return isEmail.test(str) 
}
// 验证密码
export function validatePass(str){
    let isPass = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[^]{6,18}$/;
    return isPass.test(str) ? false : true
    // return isEmail.test(str) 
}