<template>
  <div>
    <el-form :model="form">
      <el-form-item label="地区:" :label-width="formLabelWidth">
          <!-- 省份 -->
        <el-select v-model="form.province" placeholder="请选择省份" style="margin-right:20px;" @change="provinceChange">
          <el-option
            v-for="(item,i) in allAddress"
            :key="i"
            :label="item.province"
            :value="item.province">
            <span style="float: left">{{ item.province }}</span>
            <span style="float: right; color: #8492a6; font-size: 13px">{{ item.province }}</span>
          </el-option>
        </el-select>
        <!-- 城市 -->
        <el-select v-model="form.city" placeholder="请选择城市" style="margin-right:20px;"  @change="CityChange">
          <el-option
            v-for="(item,i) in CityAddress"
            :key="i"
            :label="item.citys"
            :value="item.citys">
            <span style="float: left">{{ item.citys }}</span>
            <span style="float: right; color: #8492a6; font-size: 13px">{{ item.citys }}</span>
          </el-option>
        </el-select>
        <!-- 区县 -->
        <el-select v-model="form.region" placeholder="请选择区县" style="margin-right:20px;" @change="regionChange">
          <el-option
            v-for="(item,i) in regionAddress"
            :key="i"
            :label="item.regions"
            :value="item.regions">
            <span style="float: left">{{ item.regions }}</span>
            <span style="float: right; color: #8492a6; font-size: 13px">{{ item.regions }}</span>
          </el-option>
        </el-select>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { reactive, toRefs, watchEffect } from "@vue/composition-api";
export default {
  name: "SelectCitysVue",
  props: {
    childrenAllAddress:{//父组件传所有省
      type:Array,
      default:()=>[]
    },
    childrenCityAddress:{//父组件传所有城市
       type:Array,
      default:()=>[]
    }
  },
  setup(props,{emit}) {
    watchEffect(()=>{
      data.allAddress = props.childrenAllAddress;
      data.CityAddress = props.childrenCityAddress;
    });
    const methods = reactive({
      provinceChange(currentAddress){//省份被选中后时间，回调父组件处理
        data.form.region= '';data.form.city = '';
        emit('backRequestCity',currentAddress);
      },
      CityChange(currentCity){//城市被选中后事件,处理找出当前城市下的所有区县
        data.form.region = '';//先让区县变成空
        let currentHandleCity = data.CityAddress.filter(item => item.citys === currentCity) // 拿到当前城市，找到选中的城市
        data.regionAddress = currentHandleCity[0].region;//找到当前年城市下的所有区，赋值给容器
      },
      regionChange(currentRegion){
        console.log(currentRegion);
        // emit('update:resetRegion',data.form);//修饰符方式更新父组件的属性
        // 改数组的方式传递给父组件
        let arr = [];
        for(let i in data.form){
          arr.push(data.form[i])
        }
        emit('update:resetRegion',arr);//修饰符方式更新父组件的属性
      }
    });
    const data = reactive({
      regionAddress:[],
      CityAddress:[],
      allAddress:[],
      cities: [],
      formLabelWidth: "120px",
      value: "",
      form:{
          province:'',
          city:'',
          region:''
      }
    });
    return { ...toRefs(data),...toRefs(methods)};
  }
};
</script>
<style lang="scss" scoped>
</style>