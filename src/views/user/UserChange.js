import {deleteAuser,batchdeleteAuser} from '@/api/user';//删除API
import {globalVueT} from '@/utils/global_V3.0';//封装确定是否删除弹窗

// 删除用户事件
export function packDeleteUser(data,account,root){
   return new Promise((resolve)=>{
            console.log('deleteUser ----- 外置事件');
            for(let key in account) data[key] = account[key];//给data对象添加email和token
            const {comfirmData} = globalVueT();//结构出
            comfirmData.globalDelete(root,{
                msg:`确定删除账户为“${data.userName}”`,
                warn:"警告",
                fn:()=>{//这里必须传一个函数进去，不然点删除会被直接执行
                    deleteAuser(data).then((res)=>{
                        console.log('packDeleteUser----删除成功')
                        resolve(res);
                    });
                }
            });
   })
};

// 批量删除用户
export function batchOptionsDeleteAuser(data,root){
    return new Promise((resolve)=>{
        console.log('batchOptionsDeleteAuser ----- 外置事件');
        let arr = [];
        data.userName.forEach(item => arr.push(item.userName));
        arr.join(",");
        const {comfirmData} = globalVueT();//结构出
        comfirmData.globalDelete(root,{
            msg:`确定删除账户为“${arr}的操作吗？”`,
            warn:"警告",
            fn:()=>{//这里必须传一个函数进去，不然点删除会被直接执行
                batchdeleteAuser(data).then((res)=>{
                    console.log('batchOptionsDeleteAuser----批量删除成功')
                    resolve(res);
                });
            }
        });
})
};



//编辑用户事件
export function packEditUser(data){
    console.log('packEditUser ----- 外置事件');
    console.log(data);
    // console.log(root);

}