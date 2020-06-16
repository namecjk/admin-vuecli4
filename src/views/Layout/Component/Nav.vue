<template>
  <div>
    <div id="Nav-wrapper" :class="showList ? 'close' : 'open'">
      <!-- <i class="el-icon-setting"></i> -->
      <!-- <i class="el-icon-menu"></i> -->
      <!-- <i class="el-icon-document"></i> -->
      <!-- <i class="el-icon-location"></i>-->
      <h1 id="logo"><img src="@/assets/logo.png" alt="logo" :class="showList ? 'closelogo' : 'openlogo'">logo</h1>
      <el-row class="tac">
        <el-col :span="12">
          <el-menu
            default-active="2"
            class="el-menu-vertical-demo"
            :collapse="showList"
            background-color="transparent"
            text-color="#fff"
            active-text-color="#ffd04b"
            router
          >
            <!-- 有些元素需要隐藏，但是v-for和v-show 不推荐卸载一起 ，所有使用templae标签，该标签不在DOM中渲染 -->

            <template v-for="(item,i) in routerList">
              <el-submenu :index="item.path" :key="i" v-show="!item.hide">
                <template slot="title">
                  <!-- <i :class="item.icon"></i> -->
                <!-- <svg-icon :svgName="item.icon" svgClass="menu" /> -->
                <svg-icon :svgName="item.icon == '' ? 'info' : item.icon"  />
                  <span>{{item.meta.name}}</span>
                </template>
                <el-menu-item-group v-for="(items,i) in item.children" :key="i">
                  <el-menu-item :index="items.path">{{items.meta.name}}</el-menu-item>
                </el-menu-item-group>
              </el-submenu>
            </template>


          </el-menu>
        </el-col>
      </el-row>
    </div>
  </div>
</template>


<script>
import { reactive,toRefs,computed } from "@vue/composition-api";
export default {
  name: "Nav",
  setup(props, { root }) {
     console.log(root.$store.state.app.num)//拿到state中的 通用值
     console.log(root.$store.getters + '----------测试vuex getters');



    let data = reactive({
        routerList: root.$router.options.routes,//路由地址
        showList : computed(() => root.$store.state.app.showNavList),// 要拿到store中被改变的值，就必须监听这个数据，否是拿到的原始的值
    })

    let methods = reactive({
        // routerListss:() => root.$router.options.routes,//路由地址
    })

    // let routerList = reactive(root.$router.options.routes);//路由地址

    // const handleOpen = (key, keyPath) => {
    //   console.log(key, keyPath);
    // };
    // const handleClose = (key, keyPath) => {
    //   console.log(key, keyPath);
    // };

    return {...toRefs(data),...toRefs(methods)};
  }
};
</script>

<style lang="scss" scoped>
@import "../../../style/main.scss";
#logo{
  margin: 0;
  padding: 20px 0;
  width: 100%;
  height:100px;
  // border: 1px solid #ffffff;
  text-align: center;
  font-size: 10px;
  img{
    position: absolute;
    background-color: #545c64;
    @include webkit(transition,all .3s ease 0s);
    
  }

}
#Nav-wrapper {
  background-color: #545c64;
  height: 100%;
  @include webkit(transition,all .3s ease 0s);
  // -webkit-transition: all .3s ease 0s;
  // -moz-transition: all .3s ease 0s;
  // -o-transition: all .3s ease 0s;
  // -ms-transition: all .3s ease 0s;
  // transition: all .3s ease 0s;
}
.open{
        width: 250px;
        
        // logo
        .openlogo{
            margin-left: -35px;
            width: 100px;
            height: 100px;    
        }
}
.close{
        width: 64px;
        
        // logo
        .closelogo{
          margin-left: -14px ;
          width: 50px;
          height: 50px; 
        }
}

</style>