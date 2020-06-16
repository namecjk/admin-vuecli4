<template>
    <div>
        <!-- <img :src="svgNames"  :class="svgClass" > -->
        <img :src="svgNames" :class="svgClassA" >
        
        <!-- {{plusOne}} 计算属性测试-->
        <!-- <button type="button" @click="touchss" />+   计算数据测试 -->
    </div>
</template>


<script>
import { computed } from "@vue/composition-api";
export default {
    name:'svgIcon',
    // props:['svgClass','svgName'],//接收父组件传递过来参数，简单写法
    props:{//复杂先发，配置更多参数
        svgClass:{
            type: String,//定义接收值类似
            // default:'',//默认值
            // required:false,//是否必须传值，默认false，如果为true不传值会报错
            // validator:val=>{console.log(val)}//验证值，为函数
        },
         svgName:{
            type: String,//定义接收值类似
            default:'',//默认值
        }
    },
    // 
    setup(props){
        // console.log(props)
        // console.log(props.svgName)

            // 监听 props.svgName 如果发生变化就凭借字符串
            // const svgNames =  computed(() => require(`./svg/${props.svgName}.svg`));
            let svgNames =  computed(() => require('@/icon/'+props.svgName+'.svg'));

            let svgClassA = computed(() => {
                if (props.svgClass == '' || props.svgClass == undefined ) {
                        return 'menu';
                }else{
                    return props.svgClass
                }
            })


            // const data = toRefs(svgNames.value);
            // const path = ref(require('./svg/' + props.svgName + '.svg'))
            // console.log(path.value)
        // computed计算属性  监听父级组件传递过来的值 
        // const num = ref(10)
        // const plusOne =  computed(() => {
        //     return num.value + 1
        // })
        // const touchss = () =>{
        //     plusOne.value = num.value + 2
        // }
        
        // const num = ref(10)
        // const plusOne =  computed({
        //     get : () =>  num.value + 2,//第二步=16
        //     set : val => {num.value = val - 2}//第三步16-2=14
        // })
        // const touchss = () =>{//第一步事件后=14
        //     plusOne.value = plusOne.value + 2
        // }
        // return {num,plusOne,touchss}


        return {svgNames,svgClassA}
        
    }
}
</script>

<style lang="scss" scoped>
.menu{
    vertical-align: middle;
    margin-right: 10px;
    width: 24px;
    text-align: center;
    font-size: 18px;

}
.asd{
    cursor: pointer;
    width: 25px;
    height: 25px;
    // font-size: 20px;
}
.svgIcon{
    width:1em;
    position: absolute;
    margin-top: 4px;
}
    
</style>