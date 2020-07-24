//搜索功能单独抽离出来
import { getAllClassData } from "@/api/news.js";
//搜索接口
export function SearchChildUser(){
         function search(data,root){
                    console.log(data);
                    return new Promise ((resolve)=>{
                        if (
                            data.optionsPresent !== '' || 
                            data.optionsDateValue0 !== undefined || 
                            data.optionsDateValue1 !== undefined || 
                            data.searchInput !== ''
                           ) {
                                // 请求所有数据接口
                                getAllClassData(data.email,data.token).then(res=> {
                                    // 请求到的所有数据
                                    let resultArr = res.resultFind == undefined ? res.childRes[0].ClassNameAllData : res.resultFind[0].ClassNameAllData;
                                    //做类型搜索
                                    if ( data.optionsPresent !== '') {
                                        // 过滤出类型的分类
                                        let searchedClassify = resultArr.filter(item => item.classify == data.optionsPresent)
                                        // 如果日期存在，再进去判断过滤
                                        if (data.optionsDateValue0 !== undefined && data.optionsDateValue1 !== undefined) {
                                            let searchedDate0 = searchedClassify.filter(item => item.time.slice(0,10) >= data.optionsDateValue0);
                                            let dateResult = searchedDate0.filter(item => item.time.slice(0,10) <= data.optionsDateValue1);
                                            searchedClassify = dateResult;
                                        }
                                        // 如果搜索ID或者标题存在，再进去判断过滤
                                        if (data.searchInput !== '') {
                                            if (data.searchKeywordValue == 'ID') {
                                                let Num = parseInt(data.searchInput);
                                                if(typeof Num !== 'number' || isNaN(Num)) return root.$message({ type: "info", message: "'ID'必须是数字" });
                                                searchedClassify.forEach((item,i) => {
                                                    item.sid = i;
                                                });
                                                // console.log('---------search');
                                                // console.log(searchedClassify);
                                                let IdResult = searchedClassify.filter(item => item.sid == Num);
                                                // console.log(IdResult);
                                                searchedClassify =IdResult;
                                            }else{
                                                let titleResult = searchedClassify.filter(item => item.title.includes(data.searchInput));
                                                searchedClassify =titleResult;
                                            }
                                            
                                        }
                                        // 返回前端
                                        resolve(searchedClassify);
                                    



                                    // 做日期搜索
                                    }else if (data.optionsDateValue0 !== undefined && data.optionsDateValue1 !== undefined) {
                                        let searchedDate0 = resultArr.filter(item => item.time.slice(0,10) >= data.optionsDateValue0);
                                        let dateResult = searchedDate0.filter(item => item.time.slice(0,10) <= data.optionsDateValue1);
                                        // 如果搜索ID或者标题存在，再进去判断过滤
                                        if (data.searchInput !== '') {
                                            if (data.searchKeywordValue == 'ID') {
                                                let Num = parseInt(data.searchInput);
                                                if(typeof Num !== 'number' || isNaN(Num)) return root.$message({ type: "info", message: "'ID'必须是数字" });
                                                dateResult.forEach((item,i) => {
                                                    item.sid = i;
                                                });
                                                let IdResult = dateResult.filter(item => item.sid == Num);
                                                dateResult =IdResult;
                                            }else{
                                                let titleResult = dateResult.filter(item => item.title.includes(data.searchInput));
                                                dateResult =titleResult;
                                            }
                                        }
                                        // 返回前端数据
                                        resolve(dateResult);
                                    
                                    // 做标题和id搜索
                                    }else if(data.searchInput !== ''){
                                            // 判断搜索是id 还是标题
                                            if (data.searchKeywordValue == 'ID') {
                                                let Num = parseInt(data.searchInput);
                                                if(typeof Num !== 'number' || isNaN(Num)) return root.$message({ type: "info", message: "'ID'必须是数字" });
                                                resultArr.reverse();
                                                resultArr.forEach((item,i) => {
                                                    item.sid = i;
                                                });

                                                let IdResult = resultArr.filter(item => item.sid == Num);
                                                console.log(IdResult);
                                                resolve(IdResult);

                                            }else{
                                                let titleResult = resultArr.filter(item => item.title.includes(data.searchInput));
                                                console.log(titleResult);
                                                resolve(titleResult);
                                                
                                            }
                                    }
                                });
                           }else{
                              root.$message({ type: "info", message: "至少选择一项搜索属性" });
                           }  
                    })                        
                }


            return{search}
}