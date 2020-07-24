/*    
参数：
      email: cookies("userName"),
      token: cookies("token"),
      pageNo: 1, //请求第几页
      pageSize: 8 //每一页显示多少条
*/
// import { root } from "@vue/composition-api";
import { getUserPageLists } from "../../api/user";

export function tableLoadData(data){
       return new Promise((resolve,reject)=>{
           console.log('tableLoadDatatableLoadData');
           console.log(data);
        getUserPageLists(data)
            .then(res=>{
                console.log(res);
                resolve(res);
            }).catch(err=>{
                reject(err + '来自----tableLoadData')
            })
       })

}