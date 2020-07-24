<template>
  <div style="margin-top:20px;">
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[10,20,30,40]"
      :page-size="currentTotalPageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="TotalpageDatas"
    ></el-pagination>
  </div>
</template>

<script>
import { reactive, toRefs, watchEffect} from "@vue/composition-api";
export default {
  name: "pageVue",
  props: {
    data: {//接收父组件参数
      type: Object,
      default: () => {}
    }
  },
  setup(props,{emit}) {
    //   监听
    watchEffect(()=>{
            data.TotalpageDatas = props.data.arrayLength;//接收并赋值父组件传值-数据的总条数
            data.currentTotalPageSize = props.data.result.length//接收并赋值父组件传值-当前页的总条数
    })
    //   方法
    const methods = reactive({
      handleSizeChange(val) {
        // console.log(`每页 ${val} 条`);
        let currentSize = {val,name:'handleSizeChange'};
        emit('backRequestPage',currentSize);//传第几页给父级，让父级处理业务
      },
      handleCurrentChange(val) {//点击多少页
        emit('backRequestPage',val);//传第几页给父级，让父级处理业务
      }
    });
    //   属性
    const data = reactive({
      TotalpageDatas:null,//数据的总条数
      currentTotalPageSize:null,//当前页的总条数
      currentPage: 1,
    });
    //  返回
    return {...toRefs(data),...toRefs(methods)}
  }
};
</script>

<style lang="scss" scoped>
</style>