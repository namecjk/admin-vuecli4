<template>
    <div>
        <p>Name:{{name}}</p>
        <p>年龄:
        <button type="button" class="button" @click="changeAge(-1)">-</button>
        {{age}}
        <button type="button" class="button" @click="changeAge(1)">+</button>
        </p>

        <p>出生年:
        <button type="button" class="button" @click="changeYear(-1)">-</button>
        {{year}}
        <button type="button" class="button" @click="changeYear(1)">+</button>
        </p>
        
    </div>
</template>


<script>
// import {reactive} from 'vue';
import { reactive,computed,toRefs } from "@vue/composition-api";

export default {
     name:'Nav',

    setup(){


        const data = reactive({
            name:'小米',
            age:18,
            year:computed({
                get: ()=>{ // year == get return 出去的值
                    return 2020 - data.age;
                },
                // year发生变化时触发
                set : val =>{//val = 改变后的值
                    data.age = 2020 - val;
                }
            })
        });

        function changeAge(val){
            data.age += val
        };

        function changeYear(val){
            data.year = data.year + val
        };


        return {...toRefs(data),changeAge,changeYear };

    }
}
</script>

<style lang="scss" scoped>
    .button{
        margin-left: 5px;
        width: 30px;
        height: 30px;
        background-color: #ffffff;

    }
</style>