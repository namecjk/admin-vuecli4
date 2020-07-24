<template>
    <div>
        <div class="wrapper">
            <div class="console">
                 <!-- <router-view /> -->
                 <!-- 子路由展现 -->

                   <keep-alive>
                        <!-- 需要缓存的组件 -->
                        <!-- keepAlive:true,//为true 该组件会被缓存 -->
                        <router-view v-if="$route.meta.keepAlive" />
                   </keep-alive>
                   <!-- 不需要缓存 -->
                   <router-view v-if="!$route.meta.keepAlive" />
            </div>
        </div>
    </div>
</template>


<script>
// import Console from '../../console/Consle';
export default {
     name:'Main',
     components:{
        // Console
     },
    setup(){

    }
    
}
</script>

<style lang="scss" scoped>
 .wrapper{
     
        width: 100%;
        height: 100%;
        // height: 100%;
        padding: 30px 30px 30px 30px;
        box-sizing: border-box;

        

        .console{
            width: 100%;
            background-color: #ffffff;
            height: 100%;
        }
    }
    
</style>