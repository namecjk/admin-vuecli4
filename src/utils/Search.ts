import { getAllClassData } from "../api/news.js";
import { reactive } from "@vue/composition-api";


interface Account {
        email:string;
        token:string;
}

export function Search(){//搜索接口

            const search = reactive({
                getAllClassData:()=>{
                    console.log('asdasdasd');
                }
            })

}