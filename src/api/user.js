// 引入拦截器中创建的axios实例
import axiosInstance from '@/utils/interceptors'
// 这个axiosInstance是拦截器中传递过来的,默认就有url参数排最前面，这里请求的url根据后台的来写
// 下列请求url为空 ==== 默认http://localhost:8080/api  



// /**
//  *获取角色按钮信息
//  * */ 
// export function getUserRole(data){
//     return new Promise ((resolve,reject)=>{
//         for(let key in data){
//             if (data[key] == undefined || data[key] == '') return console.log(`${key}-${data[key]}--数据有错误----getUserRole`);
//         }
//        axiosInstance.request({
//            method:"POST",
//            url:"getRole",
//            data:{
//                email:data.userName,
//                token:data.token,
//            }
//        }).then(res=>{
//            resolve(res);
//        }).catch(err=>{
//            reject(err + '-----SearchChildrenUser')
//        })
//     })
// }



/**
 *获取角色信息
 * */ 
export function getUserRole(data){
    return new Promise ((resolve,reject)=>{
        for(let key in data){
            if (data[key] == undefined || data[key] == '') return console.log(`${key}-${data[key]}--数据有错误----getUserRole`);
        }
       axiosInstance.request({
           method:"POST",
           url:"getRole",
           data:{
               email:data.userName,
               token:data.token,
           }
       }).then(res=>{
           resolve(res);
       }).catch(err=>{
           reject(err + '-----getUserRole')
       })
    })
}

/**
 * 搜索子用户
 * 参数
 * 邮箱、token、页码、页数、类型、value
 * */ 
export function SearchChildrenUser(form){
    return new Promise ((resolve,reject)=>{
        for(let key in form){
            if (form[key] == undefined) return console.log(`${key}---数据有错误----SearchChildrenUser`);
        }
       axiosInstance.request({
           method:"POST",
           url:"SearchChildUser",
           data:{
               email:form.email,
               token:form.token,
               pageNo:form.pageNo,
               pageSize:form.pageSize,
               type:form.type,
               SearchValue:form.SearchValue
           }
       }).then(res=>{
           resolve(res);
       }).catch(err=>{
           reject(err + '-----SearchChildrenUser')
       })
    })
}
/**
 * 编辑子用户
 * 新增重要参数，是修改启用状态，还是编辑账户,就子账户名
 * EditCurrentStatus
 * EditCurrentAccount
 * oldUsername
 * */ 
export function EditChildrenUser(form){
    return new Promise ((resolve,reject)=>{
        console.log('asdasd123123');
        console.log(form);
        for(let key in form){
            if (form[key] == '' || form[key] == undefined) return console.log(`${key}---数据有错误----EditChildrenUser`);
        }
       axiosInstance.request({
           method:"POST",
           url:"EditChildUser",
           data:{
               email:form.email,
               token:form.token,
               type:form.type,
               parentAccount:form.parentAccount,
               oldUserName:form.oldUserName,
               userName:form.userName,
               passWord:form.passWord,
               trueName:form.trueName,
               phone:form.phone,
               region:form.region,
               currentStatus:form.currentStatus,
               role:form.role,
               btn:form.btn

           }
       }).then(res=>{
           resolve(res);
       }).catch(err=>{
           reject(err + '-----EditChildrenUser')
       })
    })
}
/**
 * 添加子用户
 * */ 
 export function addChildrenUser(form){
     return new Promise ((resolve,reject)=>{
         console.log(form);
         for(let key in form){
             if (form[key] == '' || form[key] == undefined) return console.log(`${key}---数据有错误----addChildrenUser`);
         }
        axiosInstance.request({
            method:"POST",
            url:"addChildUser",
            data:{
                email:form.email,
                token:form.token,
                parentAccount:form.parentAccount,
                userName:form.userName,
                passWord:form.passWord,
                trueName:form.trueName,
                phone:form.phone,
                region:form.region,
                currentStatus:form.currentStatus,
                role:form.role,
                btn:form.btn
            }
        }).then(res=>{
            resolve(res);
        }).catch(err=>{
            reject(err + '-----addChildrenUser错误')
        })
     })
 }

 /**
 * 删除子用户
 * */ 
export function deleteAuser(data){
    return new Promise ((resolve,reject)=>{
        axiosInstance.request({
            method:"POST",
            url:"deleteChildUser",
            data:{
                email:data.email,
                token:data.token,
                parentAccount:data.parentAccount,
                userName:data.userName
            }
        }).then(res=>{
            resolve(res);
        }).catch(err=>{
            reject(`${err}+----deleteAuser错误`);
        })
    })
}
/**
 * 批量删除子用户
 * */ 
export function batchdeleteAuser(data){
    return new Promise ((resolve,reject)=>{
        axiosInstance.request({
            method:"POST",
            url:"batchDeleteChildUser",
            data:{
                email:data.email,
                token:data.token,
                parentAccount:data.parentAccount,
                ArruserName:data.userName//数组
            }
        }).then(res=>{
            resolve(res);
        }).catch(err=>{
            reject(`${err}+----deleteAuser错误`);
        })
    })
}

/**
 * 获取所有地区
 * */ 
 export function getAllAddress(data){
    return new Promise((resolve,reject)=>{
        if (!data.email || !data.token || !data.str ) return console.log('数据有错误----getAllAddress');
        axiosInstance.request({
            method:"POST",
            url:"getAllAddress",
            data:{
                email:data.email,
                token:data.token,
                str:data.str
            }
        }).then(res=>{
            resolve(res);
        })
        .catch(err=>{
             reject(err)
        })
    })

 }
 /**
 * 获取单个地区
 * */ 
export function getOneAddress(data){
    return new Promise((resolve,reject)=>{
        if (!data.email || !data.token || !data.str ) return console.log('数据有错误----getOneAddress');
        axiosInstance.request({
            method:"POST",
            url:"getOneAddress",
            data:{
                email:data.email,
                token:data.token,
                str:data.str
            }
        }).then(res=>{
            resolve(res);
        })
        .catch(err=>{
             reject(err)
        })
    })
 }

 /**
 * 获取user分页
 * */ 
export function getUserPageLists(data){
    return new Promise((resolve,reject)=>{
        if (!data.email || !data.token || !data.pageNo || !data.pageSize ) return console.log('数据有错误----UserPageList');
        axiosInstance.request({
            method:"POST",
            url:"UserPageList",
            data:{
                email:data.email,
                token:data.token,
                pageNo:data.pageNo,
                pageSize:data.pageSize
            }
        }).then(res=>{
            console.log('getUserPageLists---------------');
            // console.log(res);
            resolve(res);
        })
        .catch(err=>{
             reject(err)
        })
    })
 }