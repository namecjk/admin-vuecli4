<template>
  <div class="table">
    <el-table
      v-loading="loading"
      size="mini"
      :data="TabelData"
      border
      style="width:99%;box-sizing: border-box;"
      :cell-style="{'text-align':'center'}"
      :header-cell-style="{'text-align':'center'}"
      @selection-change="handleSelectionChange"
    >
      <!-- 多项勾选 -->
      <el-table-column type="selection" width="55"></el-table-column>
      <!-- 标题名称循环 -->
      <template v-for="(item,i) in titleOptions">
        <!-- 如果有插槽就执行出来-->
        <el-table-column
          v-if="item.displayType === 'slot'"
          :key="i"
          :prop="item.prop"
          :label="item.label">
          <template slot-scope="scope">
            <!-- 插槽标签   slot-scope="scope" elementUI方法 传递当前row值-->
            <!-- name代表调用的插槽名，是父组件传的，data是给父组件传的数据 -->
            <!-- 本table有elementUI多选事件handleSelectionChange，点击触发当前被点击的元素，拿到元素赋值给自定义selectDeleteArr，传递给父组件 -->
            <!-- scope elementUI 事件，也是传递本行被点击的元素 -->
            <slot :name="item.slotName" :data="{scope,selectDeleteArr}"></slot>
          </template>
        </el-table-column>
        <!-- 否则执行默认 -->
        <el-table-column v-else :key="i" :prop="item.prop" :label="item.label"></el-table-column>
      </template>
    </el-table>
    <!-- 底部 -->
    <div class="footer">
        <div style="margin-top:20px;"><!-- 多选操作 -->
          <el-button size="small" @click="optionsDelete" v-if="showBtn('userList.selectDelete')">批量删除</el-button>
          <span style="fontSize:12px;margin-left:10px;">已选 {{selectDeleteArr.length}}/{{TabelData.length}}</span>
        </div>
      <!-- 页码 -->
      <template v-if="TabelData.length > 0">
        <pageVue :data="pageData" @backRequestPage="requestPages" />
      </template>
    </div>
  </div>
</template>

<script>
import { watchEffect, reactive, toRefs, onMounted } from "@vue/composition-api"; //vue3 Api
import pageVue from "@/components/pageVue/pageVue"; //页码组件
import {batchOptionsDeleteAuser} from '@/views/user/UserChange';//删除确认弹窗结构按需
import { tableLoadData } from "@/components/TableVue/TableLoadData"; //表格组件请求数据API显示data
export default {
  name: "TableVue",
  components: {
    pageVue
  },
  props: {
    data: {
      type: Object,
      default: () => {}
    }
  },
  setup(props,{root,emit}) {
    // 生命周期，组件加载完毕
    onMounted(() => {
      console.log(12312123123123);
      console.log(props.data.requestTabelDataApi);
      if (props.data.requestTabelDataApi) {
        //user.vue传过来的值必须有才执行
        tableLoadData(props.data.requestTabelDataApi).then(res => {//API请求数据
          // 加载数据Api-独立js
          console.log(res);
          data.TabelData = res.data.result; //接收并赋值表格显示的内容
          data.TabelData.forEach(item=>{//分割字符串
           if(item.role.length > 0 ) item.role = item.role.join('/');//把人物字分割
          //  if(item.region.length > 0) item.region = item.region.join('/');//把地区子分割
          })
          data.pageData = Object.assign(res.data, props.data.requestTabelDataApi); //打包页码需要的数据并保存到自定义容器
          data.loading = false; //结束转圈
        }).catch(err=>{
          root.$message.error(`${err}+"=======tableVue---请求数据错误"`);
          data.loading = false; //结束转圈
          console.log(err+"=======tableVue---请求数据错误");
        })
      } else {
        console.log("表格数据错误");
      }
    });
    // 监听
    watchEffect(() => {
      data.titleOptions = props.data.titleOptions; //接收并赋值父组件传来的title数据
    });
    // 方法
    let methods = reactive({
      SreachedDisplayData(res){//父组件搜索拿到结构后调用此函数赋值，table显示数据
          if(res.length > 0){
            data.TabelData = res;
          }else{
            root.$message({message: '搜索数据有误',type: 'warning'});
          }
      },
      optionsDelete(){//批量删除点击事件
          let a = props.data.requestTabelDataApi;
          const reqs = {//打包数据参数：账户、token、请求api的主账户、被删除批量数组
            email:a.email,token:a.token,parentAccount:a.email,userName:data.selectDeleteArr};
          batchOptionsDeleteAuser(reqs,root).then(res=>{//子组件传来的值 必须code==200
                if(res.data.code == 200){
                  emit("backUpdate",res);
                }else{console.log('optionsDelete-----成功回调数据有误')};
          })
      },
      deletedUserforParent(){
        console.log('父组件删除后----调用重新请求table数据API');
        //这里刷新请求API 要拿到当前请求的页码数，不然会请求错误页码
            //  tableLoadData(props.data.requestTabelDataApi).then(res=>data.TabelData = res.data.result);
             tableLoadData(data.pageData).then(res=>data.TabelData = res.data.result);
      },
      requestPages(currentRequestPage) {//子组件回调函数页码请求
        data.loading = true; //转圈
        if (currentRequestPage.name == "handleSizeChange") { //改变当前页面容纳多少条数据
          data.pageData.pageSize = currentRequestPage.val//请求每页显示多少条数据赋值
           tableLoadData(data.pageData).then(res => {
            data.TabelData = res.result;
            data.loading = false; //结束转圈
          });
        } else {//请求页面
          data.pageData.pageNo = currentRequestPage;//请求第几页赋值
          tableLoadData(data.pageData).then(res => {
            data.TabelData = res.data.result;
            data.loading = false; //结束转圈
          });
        }
      },
      handleSelectionChange(val) { //多选事件，记录被选中的对象
        console.log(val);
        data.selectDeleteArr = val;//多选事件，记录被选中的对象
      }
    });
    // 属性
    let data = reactive({
      loading: true, //加载转圈
      titleOptions: [], //表格标题
      TabelData: [], //表格显示数据容器
      pageData: {}, //页面容器
      selectDeleteArr: [] //多选操作，存储数据容器
    });
    // 返回
    return { ...toRefs(methods), ...toRefs(data) };
  }
};
</script>
<style lang="scss" scoped>
@import "@/style/main.scss";
.table {
  width: $fullCount;
  .footer{
    display: flex;
    justify-content: space-between;
  }
}
</style>