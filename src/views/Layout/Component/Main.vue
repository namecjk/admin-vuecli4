<template>
    <div>
        <div class="wrapper">
            <div class="console">
                 <router-view />
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
        height: 90vh;
        // height: 100%;
        padding: 30px 30px 0px 30px;
        box-sizing: border-box;

        

        .console{
            width: 100%;
            background-color: #ffffff;
            height: 100%;
        }
    }
    
</style>