<template>
  <div style="padding:30px;height:100%;">
    <el-form :model="form" label-width="80px">
      <!-- 编辑分类 -->
      <el-form-item label="编辑分类">
        <el-select v-model="currentSelect" placeholder="请选择分类">
          <el-option
            v-for="(item,i) in options"
            :label="item.classParent_Name"
            :value="item.classParent_Name"
            :key="i"
          ></el-option>
        </el-select>
      </el-form-item>
      <!-- 编辑标题 -->
      <el-form-item label="编辑标题">
        <el-input v-model="currentTitle"></el-input>
      </el-form-item>
      <!-- 日期 -->
      <el-form-item label="日期">
        <el-date-picker v-model="form.time" type="date" placeholder="选择日期" disabled></el-date-picker>
      </el-form-item>
      <!-- 上传组件 -->
      <el-form-item label="上传头像">
        <up-load @backFn='childBackFn' :head="childrenHeat"/>
      </el-form-item>
      <!-- 编辑器组件 -->
      <el-card style="height:100%;">
        <quill-editor
          v-model="content"
          ref="myQuillEditor"
          style="height:400px"
          :options="editorOption"
        ></quill-editor>
      </el-card>
      <!-- 提交 -->
      <el-form-item style="margin-top:50px;">
        <el-button type="primary" @click="onSubmit">提交</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import cookies from "cookiesjs";
import { reactive, toRefs, watchEffect, onMounted, onActivated, onDeactivated } from "@vue/composition-api";
// 编辑器的依赖引入
import { quillEditor } from "vue-quill-editor";
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";

export default {
  name: "FuncFormsEdit",
  components: {
    quillEditor//编辑器
  },
  setup(props, { root }) {
    // 拿数据
    let params = reactive(root.$store.state.EditDetail);//EditDetail state中的数据
    // 生命周期
    onActivated(()=>{//进组组件 做的事情
    // console.log(222);
    data.childrenHeat = params.img;// params.img是当前元素的所有属性，从vuex从拿到的，params被监听这，所有当进入组件让图片被赋值就行，其他文字是被缓存起来的
    data.content = params.content;//内容被缓存了，所有内容也要出来，每次进来赋值一次
    SelectData.currentSelect = params.classify;

    })
    onDeactivated(()=>{//离开组件 做的事情
    // console.log(333);
    })
    onMounted(() => {//组件加载完
    // console.log(111);
      data.childrenHeat = data.form.img;
      //   data.currentAccount = { email: data.emails, token: data.tokens };
      root.$store.dispatch("command/cmdGetClassify", data.Account).then(res => {
        //请求当前账户所有的数组所有的数据
        data.options = res; //传递给子组件的-----addlist子组件-选项分类名字需要  选当前页面选项中也需要
        console.log(data.options);
      });
    });
    //  监听
    watchEffect(() => {
      // console.log('编辑页面----监听成功');
      for (let key in params) {
        if (key == "time") params[key] = params[key].slice(0, 10);
        data.form[key] = params[key];
      }
    });
    // 提交事件
    const detailSubmit = reactive({
      childBackFn(res){//子组件回调函数
        // console.log('父组件EditCurrentData');
        // console.log(res);
          // 上传头像子组件上传成功后把图片名字返回给父组件这里，然后拼接一个图片的连接，存入数据库当前项里面
          let url = `http://106.52.151.159:8080/img/${res.name}`;
          // 请求数据库API，把图片存入数据库
          root.$store.dispatch('command/cmdGetAllClassData',data.Account).then(res=>{
                      let result = res.resultFind == undefined ? res.childRes[0].ClassNameAllData : res.resultFind[0].ClassNameAllData;
                      for(let i = 0; i < result.length; i++){
                       if (data.form.title === result[i].title && data.form.classify === result[i].classify) {
                         let r = result[i];
                         r['img'] = url
                       };
                     };
                    //  将修改好的数组覆盖原来的所有数组
                    data.Account['parentDisplayDatas'] = result;
                    root.$store.dispatch('command/cmdSetClassify',data.Account).then(res=>{
                          console.log('成功更新，，img');
                          console.log(res);
                          data.childrenHeat = url;
                    })
          })
      },
      onSubmit: () => {
        // console.log(data.content);
        let currentData = root.$store.state.EditDetail;
        // console.log(currentData);
        // console.log(SelectData.currentSelect);
         root.$store.dispatch('command/cmdGetAllClassData',data.Account).then(res=>{
          let all = res.resultFind == undefined ? res.childRes[0].ClassNameAllData : res.resultFind[0].ClassNameAllData;;//拿到所有数据
          // console.log(all);
          // all.reverse();//颠倒数组，不然子组件传过来的id对不上
          // all.forEach((item,i)=>item.currentId = i);//保证每个对象id正常，循环一遍
          // let oldData = all.filter(item => item.currentId == currentData.currentId);//过滤出当前被点击的对象，没被修改的；
          // 在拿当前页面渲染的数据要找
          // console.log(oldData);
          // if (oldData.length == 0) return console.log('!!!oldData------失败---id有问题');
          all.forEach(item =>{
            //  if (oldData.length == 0) return;
                if (item.title == currentData.title){
                  console.log('item.title == oldData[0].title');
                    item.title = SelectData.currentTitle;
                    item.content = SelectData.content.slice(3,-4);
                    item.classify = SelectData.currentSelect;
                    item.currentId = currentData.currentId;
                    item.time = root.$store.state.app.dateToString();
                    // 判断是否有管理员名称
                    if(item.roleTitle == undefined || item.roleTitle == ''){
                        item.roleTitle = data.email || '管理员名有误';
                    }else{
                      item.roleTitle = data.Account.email || '管理员名有误';
                    }
                }
          });
          //提交更新api
          let parentDisplayDatas = all;
          console.log(parentDisplayDatas);
          let dataAccount = {email:data.Account.email,token:data.Account.token,parentDisplayDatas};//配置更新API需要的参数
           root.$store.dispatch('command/cmdSetClassify',dataAccount).then((res)=>{
               root.$message({message: res.data.msg,type: 'success'});
              root.$router.go(-1);
           });
        })
      }
    });
    //数据
    let SelectData = reactive({//表单数据
      currentSelect:'' || sessionStorage.getItem('infoClass'),
      currentTitle:'' || sessionStorage.getItem('infoTitle'),
      content: params.content || sessionStorage.getItem('infoContent'),//编辑器内容
    })
    let data = reactive({
      editorOption: {},//编辑器数据
      // 表单数据
      form: {
        title: "" || sessionStorage.getItem('infoTitle'),
        classify: "" || sessionStorage.getItem('infoClass'),
        time: "" || sessionStorage.getItem('infoTime').slice(0, 10),
        img:"" || sessionStorage.getItem('infoImg')
      },
      //  分类数组
      options: [],
      Account: { email: cookies("userName"), token: cookies("token") },
      // 传递给子组件的头像容器
      childrenHeat:null
    });
    data.form.time.slice(0, 9);

    //   传参
    //     // root.$route  是拿query  URL传参
    //     // root.$router  是vue 路由配置

    //     // query 接收参数 URL显示  但是刷新不消失
    //     // let data = ref({
    //     //     id : root.$route.query.id,
    //     //     title : root.$route.query.title
    //     // });

    //     // params 接收参数 URL不显示  刷新消失
    //     //  let data = ref({
    //     //     id : root.$route.params.id,
    //     //     title : root.$route.params.title
    //     // });
    //      // params 接收参数 URL不显示  刷新不消失 router要设置参数占位
    // let params = reactive({
    //   id:
    //     root.$store.getters["EditDetail/GET_STATE_ID"] ||
    //     sessionStorage.getItem("infoId"),
    //   title:
    //     root.$store.getters["EditDetail/SET_STATE_TITLE"] ||
    //     sessionStorage.getItem("infoTitle"),

    // });
    // let params = reactive(root.$store.state.EditDetail);
    console.log(params.content);
    return {
      ...toRefs(params),
      ...toRefs(data),
      ...toRefs(detailSubmit),
      ...toRefs(SelectData)
    };
  }
};
</script>

<style lang="scss" scoped>
</style>
