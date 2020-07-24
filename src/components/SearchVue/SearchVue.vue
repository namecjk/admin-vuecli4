<template>
  <div class="searchKeyword-wrapper infoListWrapper">
    <div class="searchKeyword-wrapper infoListWrapper">
      <label class="words infoListWords">关键词:</label>
      <div class="searchKeyword">
        <el-select v-model="searchKeywordValue" placeholder="请选择" size="small">
          <el-option
            v-for="(item,i) in optionsSearchKeyword"
            :key="i"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </div>
      <div class="searchInput">
        <el-input v-model="searchInput" placeholder="请输入内容" size="small"></el-input>
        <!-- <el-button type="danger" size="small" @click="searchNow.search">搜索</el-button> -->
      </div>
      <div class="searchBtn">
        <el-button type="danger" size="small" @click="backParent">搜索</el-button>
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, toRefs, watchEffect } from "@vue/composition-api";
export default {
  name:"SearchVue",
  props: {
    data: {
      type: Object,
      default: () => {} //默认值返回空对象
    }
  },
  setup(props, { emit }) {
    watchEffect(() => {
      console.log("监听成功------------------SearchVue");
      data.optionsSearchKeyword = props.data.options;
    });
    // 方法
    let methods = reactive({
      backParent() {
        let sendParentData = {//传给父组件的数据
          inputData: data.searchInput,//搜索框的值
          optionsClassifyData: data.searchKeywordValue,//选择的搜索分类
          SearchValue: data.searchInput,//搜索框的值--搜索user用
          type: data.searchKeywordValue,//搜索框的值--搜索user用
        };
        //调用父组件方法
        emit(props.data.click,sendParentData);
      }
    });
    // 属性
    let data = reactive({
      searchKeywordValue: "",
      searchInput: "",
      optionsSearchKeyword: {}
    });

    return { ...toRefs(data), ...toRefs(methods) };
  }
};
</script>
<style lang="scss" scoped>
@import "../../style/main.scss";
.infoListWrapper {
  @include infoListWrapper();
}
.infoListWords {
  @include infoListWords();
}
// 其他css在通用中
</style>