<template>
  <div id="app">
    <div id="nav" >
      <!-- <router-link to="/">Home</router-link> | -->
      <!-- router中index.js 导出的路由 -->
      <!-- 使用<keep-alive> 包裹动态组件时，会缓存组件，减少不必要的请求 -->
        <keep-alive>
          <!-- 需要缓存的组件 -->
          <!-- keepAlive:true,//为true 该组件会被缓存 -->
          <router-view v-if="$route.meta.keepAlive" />
       </keep-alive>
        <!-- 不需要缓存的 -->
          <router-view v-if="!$route.meta.keepAlive" />
    </div>
  </div>
</template>


<script>


export default {
  
  
}
</script>

<style lang="scss">
@import './style/main.scss';//全局scss
</style>
