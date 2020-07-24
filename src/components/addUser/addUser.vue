<template>
  <div>
    <el-dialog title="新增用户" :visible.sync="showAddUser" @close="close" @opened="openedWin">
      <el-form :model="form"  :rules="rules" ref="form" status-icon>
        <el-form-item :label="showTitle.userName+':'" :label-width="formLabelWidth" prop="userName">
          <el-input
            v-model="form.userName"
            autocomplete="off"
            style="width:300px;"
            :placeholder="'请输入'+showTitle.userName"
          ></el-input>
        </el-form-item>
        <el-form-item :label="showTitle.passWord+':'" :label-width="formLabelWidth" prop="passWord">
          <el-input
            show-password
            v-model="form.passWord"
            autocomplete="off"
            style="width:300px;"
            :placeholder="'请输入'+showTitle.passWord"
          ></el-input>
        </el-form-item>
        <el-form-item :label="showTitle.trueName+':'" :label-width="formLabelWidth" prop="trueName">
          <el-input
            v-model="form.trueName"
            autocomplete="off"
            style="width:300px;"
            :placeholder="'请输入'+showTitle.trueName"
          ></el-input>
        </el-form-item>
        <el-form-item :label="showTitle.phone+':'" :label-width="formLabelWidth" prop="phone">
          <el-input
            v-model.number="form.phone"
            autocomplete="off"
            style="width:300px;"
            :placeholder="'请输入'+showTitle.phone"
          ></el-input>
        </el-form-item>
        <!-- 地区 -->
        <template v-show="allAddress.length > 0">
          <SelectCitysVue :childrenAllAddress="allAddress" :childrenCityAddress="childrenCityList"  @backRequestCity="requestCity" :resetRegion.sync="form.region"/>
        </template>
        <!-- 是否启用 -->
         <el-form-item :label="showTitle.currentStatus+':'" :label-width="formLabelWidth" prop="currentStatus">
              <el-switch v-model="form.currentStatus" active-text="启用" inactive-text="禁用" active-value="1" inactive-value="0"></el-switch>
        </el-form-item>
        <!-- 角色 -->
         <el-form-item :label="showTitle.role+':'" :label-width="formLabelWidth" prop="role">
               <el-checkbox-group v-model="form.role">
                 <el-checkbox v-for="(item,i) in showTitle.checkbox" :key="i" :label="item.name"></el-checkbox>
            </el-checkbox-group>
        </el-form-item>
        <!-- 按钮 -->
          <el-form-item :label="showTitle.btn+':'" :label-width="formLabelWidth" prop="btn">
                <template v-show="showTitle.isShowBtn.length > 0">
                     <div v-for="(item,i) in showTitle.isShowBtn" :key="i">
                      <h4>{{item.btnClassName}}</h4>
                       <template v-show="item.btn && item.btn.length > 0">
                            <el-checkbox-group v-model="form.btn" :label="item.btnClassName">
                            <el-checkbox v-for="childItem in item.btn" :key="childItem.value" :label="childItem.value">{{childItem.btnName}}</el-checkbox>
                        </el-checkbox-group>
                       </template>
                    </div>
                </template>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="close(form)">取 消</el-button>
        <el-button type="primary" @click="confirmAdd('form')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import sha1 from 'sha1';
import cookies from 'cookiesjs';
import { reactive, toRefs, watchEffect, onMounted } from "@vue/composition-api";
import SelectCitysVue from '@/components/SelectCitysVue/SelectCitysVue';
import {getAllAddress,getOneAddress,addChildrenUser,EditChildrenUser} from '@/api/user';
export default {
 components:{SelectCitysVue},
  name: "addUser",
  props: {
    displayTitle: { type: Object, default: () => {} },
    displayAddUser: { type: Boolean },
    displayEditObj:{type:Object,default:()=>{}}
  },
  setup(props, { emit,refs,root }) {
    onMounted(()=>{//组件加载完生命周期
    getAllAddress(data.currentAccount).then(res=>{
      data.allAddress = res.data.msg;//请求的地区传递给子组件
    });
    })
    watchEffect(() => {//监听
      data.showTitle = props.displayTitle; //监听父传值的title属性
      data.showAddUser = props.displayAddUser; //监听父传值是否显示
    });
    const methdos = reactive({
      openedWin(){//弹出打开后时间，elementUi时间
          let editData = props.displayEditObj;//监听父传值编辑数据
          if(editData.type == 'EditCurrentAccount'){//编辑状态 后台需要一个string判断是编辑或是其他
              editData['oldUserName'] = editData.userName;//添加一个修改前的老userName，方便数据库查找修改
              editData.role = !Array.isArray(editData.role) ? editData.role.split("/") : editData.role;
              // editData.passWord && delete editData.passWord;编辑模式不一定非要删除密码，默认也看不见
          }else{
              form.type && delete form.type;
              methdos.reset("form");
          }
          for(let key in editData)form[key] = editData[key];
      },
      requestCity(cityStr){//子组件请求城市
          if (!cityStr && cityStr !== '') return console.log('请求城市事件错误');
              data.currentAccount['str'] = cityStr;
              getOneAddress(data.currentAccount).then(res=>{ 
                data.childrenCityList = res.data.city
                })
      },
      reset:(resetData)=>refs[resetData].resetFields(),//清空表单
      confirmAdd(formName){//确定事件
       refs[formName].validate((valid) => {//校验表单
          if (valid) {//提交表单请求添加用户API
                if(form.type == 'EditCurrentAccount'){//编辑状态
                  form.passWord = sha1(form.passWord);
                    EditChildrenUser(form).then(res=>{
                      root.$message({showClose: true,message: res.data.msg,type:'success'});//成功消息提醒
                      methdos.reset("form");//清空表单方法
                      methdos.close();//关闭窗口
                      emit('backUpdate',res)// 最后调用父组件的方法更新API,必须、必须传API返回值code==200
                    })   
                }else{// 添加状态
                  console.log('添加状态');    
                  form['parentAccount'] = cookies('userName');
                  form.passWord = sha1(form.passWord);//密码加密
                  addChildrenUser(form).then(res=>{
                    if (res.data.code !== '200' ) return root.$message({showClose: true,message: res.data.msg,type:'warning'});
                    methdos.reset("form");//清空表单方法
                    methdos.close();//关闭窗口
                    root.$message({showClose: true,message: res.data.msg,type:'success'});//成功消息提醒
                    console.log(res);
                    emit('backUpdate',res)// 最后调用父组件的方法更新API,必须传API返回值code==200
                  })
                }
            ;
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      close(){//取消事件
          methdos.reset("form");//清空表单方法
          emit("showAddUser");//调用父组件关闭窗口
      }
    });
     let validateUserName = (rule, value, callback) => {//验证用户
      if (value === "") {
        callback(new Error("请输入账户"));
      } else {
        callback();
      }
    };
    let validatePassWord = (rule, value, callback)=>{//验证密码
      if(form.type == 'Edit' && !value){//如果Edit存在，value==空==false 时候不需要验证
          callback();
      }else{
          if (value === '') {
            callback(new Error('请输入密码'));
          } else {
              callback();
          }
      }
      };
    const form = reactive({//验证表单
        email:cookies('userName'),token: cookies("token"),
        trueName: "",
        passWord:"",
        userName: "",
        phone: "",
        region: {},
        currentStatus: "1",
        role: [],
        btn:[]
    })
    const rules = reactive({//验证规则
          passWord: [ { validator:validatePassWord, trigger: 'blur' }],
          userName: [ { validator:validateUserName, trigger: 'blur' }],
          role: [ { type: 'array', required: true, message: '请至少选择一个角色管理', trigger: 'change' }]//验证数组选择
    })
    const data = reactive({
      EditObj:[],
      childrenCityList:[],//城市容器
      allAddress:[],//所有地区容器
      currentAccount:{email:cookies('userName'),token: cookies("token"),str:'北京'},
      showTitle: {}, //title容器
      showAddUser: false, //是否显示窗口
      formLabelWidth: "120px",
    });
    return { ...toRefs(data), ...toRefs(methdos),form,rules};
  }
};
</script>
<style lang="scss" scoped>
</style>