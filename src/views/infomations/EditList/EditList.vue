<template>
  <div class="wrapper">
    <!-- 新增表单 -->
    <div class="asd">
      <el-dialog title="编辑" :visible.sync="dialogFormVisible"  @close="closed('edit')" @open="open">
        <el-form :model="form" style="padding:0px 50px 0px 50px;box-sizing:border-box">
          <el-form-item label="类别:">
            <el-select v-model="form.classify" placeholder="请选择">
              <el-option  :label="form.classify" :value="form.classify"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="标题:">
            <el-input v-model="form.title" autocomplete="off" style="width:425px;" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="概况:">
            <el-input placeholder="请输入内容" type="textarea" v-model="form.content" style="width:500px;" clos="200"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <!-- submintDisabled  禁用按钮数据 -->
          <el-button type="primary" @click="editCurrent" :disabled="submintDisabled">确 定</el-button>
          <el-button @click="closed('edit')">取 消</el-button>
        </div>
      </el-dialog>
    </div>
    <!-- 新增表单 -->
  </div>
</template>

<script>
import { reactive, toRefs, watchEffect } from "@vue/composition-api";
export default {
  name: "EditList",
  props: { //获取父组件专递的数据 都在props里面
    ShowEditCurrentData: Boolean,//是否显示弹窗
    ClassifyData:Array,//父组件传值全部分类数据--选项分类名字需要
    CurrentData:Object,//父组件传递过来的当前点击的对象数组
    parsentEmail:String,//父组件传当前账户
    parsentToken:String,//父组件传当前token

  },
  setup(props,{emit}) {
    // 监听变化
    watchEffect(() => {
      console.log('监听成功-------------EditList');
      data.dialogFormVisible = props.ShowEditCurrentData;//监听-显示隐藏该组件
      data.classifySelect = props.ClassifyData//监听-所有选项分类数组
    });
    
    const methods =  reactive({//方法
        open:()=>{
          data.form = Object.assign({},props.CurrentData);//监听-父组件传递过来的当前被点击的元素-且赋值给form对象,form对象是双向绑定
        },
        editCurrent:()=>{
            // let dataAccount = {email:props.parsentEmail,token:props.parsentToken}
            // // 先拿到所有的数组
            // root.$store.dispatch("command/cmdGetAllClassData",dataAccount).then(res=>{
            //     console.log(res.resultFind[0].ClassNameAllData);
            //     console.log(props.CurrentData);

            // })
            // console.log(data.form);

            
            // let newObj = {//包装新添加的数据对象
            //             classify:data.form.classify,
            //             title:data.form.title,
            //             content:data.form.content,
            //             time:root.$store.state.app.dateToString(),
            //             currentId:data.form.currentId
            //           };
                    // 调用父组件函数
                    emit('editBack',data.form);
        },
        closed:data=>emit("close",data),//调父组件方法隐藏窗口
        
    });

    const data = reactive({//属性
        submintDisabled:false,//禁用按钮
        classifySelect:[],//选项的容器
        dialogFormVisible:null,//控制组件显示隐藏
        value:'',//选择分类默认名字
        form:{//该组件双向绑定数据
            classify:'',
            title:'',
            content:'',
            time:''
        }
    });
    

    return { ...toRefs(data), ...toRefs(methods) };
  }
};
</script>
<style lang="scss" scoped>
</style>