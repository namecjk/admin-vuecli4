<template>
  <div class="wrapper">
    <!-- 新增表单 -->
    <div class="asd">
      <el-dialog title="新增" :visible.sync="dialogFormVisible" @close="close">
        <el-form :model="form" style="padding:0px 50px 0px 50px;box-sizing:border-box">
          <el-form-item label="类别:">
            <el-select v-model="value" placeholder="请选择">
              <el-option v-for="(item,i) in classifySelect" :key='i' :label="item.classParent_Name" :value="item.classParent_Name"></el-option>
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
          <el-button type="primary" @click="addNews">确 定</el-button>
          <el-button @click="close">取 消</el-button>
        </div>
      </el-dialog>
    </div>
    <!-- 新增表单 -->
  </div>
</template>

<script>
import { reactive, toRefs, watchEffect } from "@vue/composition-api";
export default {
  name: "addList",
  props: { //获取父组件专递的数据 都在props里面
    showDialog: Boolean,//是否显示弹窗
    ClassifyData:Array,//父组件传值全部分类数据--选项分类名字需要
    parentDisplayData:Array,//父组件传值全部分类数据中的渲染数据
    parsentEmail:String,//当前父组件的账户
    parsentToken:String,//当前父组件的token
    PresentClassify:String//当前的分类
  },
  setup(props, { emit,root }) {
    // 监听变化
    watchEffect(() => {
      console.log('监听成功-------------addList')
      data.dialogFormVisible = props.showDialog;
      data.classifySelect = props.ClassifyData;//父组件传递-当前账户所有的渲染数组
      data.email = props.parsentEmail;
      data.token = props.parsentToken;
      data.optionsPresent = props.PresentClassify;
      data.nowTime = data.dateToString();//设置当前日期
      data.parentDisplayDatasPush = props.parentDisplayData;//父组件传值-全部分类数据中的渲染数据
    });

    const data = reactive({
      dateToString(){
          const myDate =  new Date();
          const Y = myDate.getFullYear();
          let M = myDate.getMonth()+1;
          let D = myDate.getDate();
          let H = myDate.getHours();
          let Mts = myDate.getMinutes();
          M = M <= 9 ? '0'+M : M
          D = D <= 9 ? '0'+D : D
          H = H <= 9 ? '0'+H : H
          Mts = Mts <= 9 ? '0'+Mts : Mts
          const curDay = Y + '-'+ M + '-' + D + '-' + H + ':' + Mts;
          return curDay
      },
      addNews(){//确定提交按钮事件
        let email = data.email;
        let token = data.token;
        let classify = data.value;//拿到选择分类
        let title = data.form.title;//拿到标题
        let content = data.form.content;//拿到内容
        // 判断
        if (classify == '' || classify == undefined || !classify) return data.showMessage('err','类型错误');//提交填写类型
        if (title == '' || title == undefined || !title) return data.showMessage('err','标题错误');//提交填写标题
        if (content == '' || content == undefined || !content) return data.showMessage('err','内容错误');//提交填写内容
        // 包装数据
        let obj = {classify,title,content,time:data.nowTime};//包装新添加的数据对象
        let presentAccount = {email,token};
           root.$store
          .dispatch("command/cmdGetAllClassData", presentAccount) //监听请求的所有数据，如果有变化就触发
          .then(res => {
            let parentDisplayDatas = res.resultFind[0].ClassNameAllData;//先拿到数据库中所有的数组;
             parentDisplayDatas.push(obj);//Push新的数据对象
            //调用更新API
              let dataAccount = {email,token,parentDisplayDatas};//配置更新API需要的参数
              root.$store.dispatch('command/cmdSetClassify',dataAccount).then(()=>{
                  console.log('addList组件-----------添加成功----回调函数')
                  data.showMessage("success", "添加成功----------addList组件");
                  data.form.title = '';
                  data.form.content = '';
                  data.close();//调用父组件函数,关闭弹出窗口
                  data.parentDisplayDatasPush.splice(0,0,obj);//利用父组件请求来的数组，做假添加，马上显示数组，减少请求API
                  data.parentDisplayDatasPush.splice(data.parentDisplayDatasPush.length - 1,1);//假删除
              });
          });
      },
      showMessage(type, words) {//封装消息提示
        //显示提示信息封装
        root.$message({
          message: words,
          type
        });
      },
    //  两种方法修改父组件参数
    //  更改父组件的行内调用的属性，并传值更改
    //  close: () => emit("update:showDialog", false), //子组件传递给父组件回调函数与数据，参数1 父组件执行的名称  参数2 传递父组件数据,
    //  调用父组件的函数名称
      close: (sendParentData) => emit("dialogClose",sendParentData), //emit方法子组件传递给父组件回调函数与数据，参数1 父组件执行的名称  参数2 传递父组件数据,
      // 属性
      value:'',//选择框双向绑定
      email:'',
      token:'',
      optionsPresent:'',//父级传来的当前选择的类别
      parentDisplayDatasPush:[],//父组件传值来的 所有集中渲染的数据
      nowTime:'',
      classifySelect:[],//父级传来的渲染列表的数据
      dialogFormVisible: false,//是否显示窗口
      form: {
        title: "",
        classify: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        content: ""
      },
    });
    

    return { ...toRefs(data) };
  }
};
</script>
<style lang="scss" scoped>
</style>