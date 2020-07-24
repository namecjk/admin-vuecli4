<template>
  <div >
    <!-- <el-upload
      action="/api/upload"
      class="avatar-uploader"
      :show-file-list="false"
      :on-success="handleAvatarSuccess"
      :show-file-list="false"
    >-->
    <el-upload
      class="avatar-uploader"
      action="/api/upload"
      :show-file-list="false"
      :on-success="handleAvatarSuccess"
    >
      <img v-if="imageUrl" :src="imageUrl" class="avatar" />
      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
    </el-upload>
  </div>
</template>

<script>
import { reactive, toRefs, watchEffect } from "@vue/composition-api";
import cookies from "cookiesjs";

export default {
  name: "upLoad",
  props:{
    head:{
      type:String
    }
  },
  setup(props, { emit }) {
    // 监听事件
    watchEffect(()=>{
      console.log('upload----监听成功');
      data.imageUrl = props.head;
      console.log(props.head);
    })
    //   上传事件
    let upMethods = reactive({
      handleAvatarSuccess(res, file) {
        console.log("handleAvatarSuccess");
           emit("backFn", file);
          // data.imageUrl = props.head;
          console.log(res);  
          
          //先回调父组件函数，让父组件执行保存头像数据库的方法
        // console.log(URL.createObjectURL(file.raw));
        // data.imageUrl = URL.createObjectURL(file.raw);
        // data.imageUrl = props.head;
        
      }
      // upload(file){
      //   let formData = new FormData();
      //   formData.append('file',file);
      //   // 传递给父组件
      //   root.$store.dispatch("EditDetail/cmdUpLoad",data.account,formData)
      //   .then(()=>{console.log('123123123123123123upload.vue');});
      //   // ;
      // }
    });
    //数据
    let data = reactive({
      // 属性
      account: { email: cookies("userName"), token: cookies("token") },
      dialogImageUrl: "",
      dialogVisible: false,
      imageUrl:""
    });
    return { ...toRefs(upMethods), ...toRefs(data) };
  }
};
</script>

<style lang="scss" scoped>
.avatar-uploader .el-upload{
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  border: 1px dashed #d9d9d9;
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>