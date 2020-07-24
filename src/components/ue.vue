<template>
  <div>
    <!-- <el-form-item label="活动形式"> -->
    <!-- <el-input type="textarea" v-model="datas"></el-input> -->
    <!-- </el-form-item>
    -->
    <script id="editor" type="text/plain"></script>
  </div>
</template>

<script>
import { computed, reactive, onMounted, toRefs } from "@vue/composition-api";
export default {
  name: "UE",
  props: ["data", "defaultMsg", "config"],
  setup(props, { root }) {
    console.log(props);
    onMounted(() => {
      const _this = root;
      root.editor = UE.getEditor("editor", root.config); // 初始化UE
      root.editor.addListener("ready", function() {
        _this.editor.setContent(_this.defaultMsg); // 确保UE加载完成后，放入内容。
      });
    });

    let datas = computed(() => props.data + "");

    let ueData = reactive({
      editor: null
    });

    let methods = reactive({
      getUEContent: () => {
        // 获取内容方法
        return this.editor.getContent();
      },
      destroyed: () => {
        this.editor.destroy();
      }
    });

    return { datas,ueData,...toRefs(methods) };
  }
};
</script>

<style lang="scss" scoped>
</style>