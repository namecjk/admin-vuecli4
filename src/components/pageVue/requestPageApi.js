/*    
参数：
      email: cookies("userName"),
      token: cookies("token"),
      pageNo: 1, //请求第几页
      pageSize: 8 //每一页显示多少条
*/
import { getPageList } from "../../api/news";
export function requestPageApi(data){
       return new Promise((resolve,reject)=>{
            getPageList(data.email,data.token,data.pageNo,data.pageSize)
            .then(res=>{
                resolve(res);
            }).catch(err=>{
                reject(err + '来自----tableLoadData')
            })
       })

}