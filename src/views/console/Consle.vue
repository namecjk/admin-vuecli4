<template>
    <div class="wrapper">
        控制台首页{{a}}
    </div>
</template>


<script>
import { reactive,ref,toRefs } from "@vue/composition-api";
export default {
    name:'Console',
    setup(props,{root}){

            let qwe = ref(root.$store.state.login.msg);
            let asd = reactive({
                a:qwe
            })


            return {...toRefs(asd)};

    }
}
</script>

<style lang="scss" scoped>
.wrapper{
        background-color: #ffffff;
        width: 100%;
        height: 87vh !important;
        box-shadow: 5px 5px 5px 5px rgba(203, 203, 203, 0.5);
    }
    
</style>