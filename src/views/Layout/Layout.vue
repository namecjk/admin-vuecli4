<template>
    <div id="layout"> 
        <div class="wrapper">
                <Nav/>
                    <div class="headAndMain">
                         <Header/>
                         <Main/>
                    </div>
        </div>
    </div>
</template>


<script>

import Header from './Component/Header';
import Main from './Component/Main';
import Nav from './Component/Nav';

export default {
    name:"Layout",
    components:{
        Header,
        Main,
        Nav
    },
    setup(){

    }
    
}
</script>

<style lang="scss" scoped>
#layout{
    width: 100%;
    height: 100%;
    background-color: #e9e9e9;
      

        .wrapper {
        // margin: 10px;
        // border: 1px solid black;
        display: flex;
        flex-direction: row;
        height: 100%;




        .headAndMain{
            width: 100%;
            height: 100%;
            flex-direction: column;

        }
}



}

</style>