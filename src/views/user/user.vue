<template>
  <div class="wrapper">
    <!-- 搜索、新增 -->
    <el-row class="elrow">
      <el-col :span="18">
        <searchVue :data="ChildrenSearchDatas" @userSearchVue="userSearchVue">
          <template>
            <el-button type="success" size="small" style="text-align:end" v-ShowBtn="'userList.add'" class="hideBtn">slot插槽</el-button>
          </template>
        </searchVue>
      </el-col>
      <el-col :span="6" style="text-align:end;">
        <el-button type="success" size="small" @click="addUser" v-ShowBtn="'userList.add'" class="hideBtn">新增用户</el-button>
      </el-col>
    </el-row>
    <!-- table -->
    <el-row class="elrow">
      <el-col :span="24">
        <TableVue @backUpdate="updateRequestApi" ref="childMethods" :data="childrenTableData">
          <!-- 插槽传数据给子组件，需要闭合标签 -->
          <!-- <template #switch>switch</template> -->
          <!-- <template #change>change</template> -->
          <!-- 插槽switch switch是自定义名称  currentData 插槽传递过来的数据 -->
          <template v-slot:switch="currentData">
            <el-switch
              v-model="currentData.data.scope.row.currentStatus"
              active-color="#13ce66"
              inactive-color="#ff4949"
              active-value="1"
              inactive-value="0"
              @change="changeSwitch(currentData)"
            ></el-switch>
          </template>
          <!-- 插槽change change是自定义名称   currentData是插槽传递来的数据 -->
          <template v-slot:change="currentData">
            <el-button
              type="danger"
              size="small"
              index="delete"
              @click="deleteUser(currentData.data.scope.row)"
              v-ShowBtn="'userList.delete'" class="hideBtn"  
            >删除</el-button>
            <el-button type="success" size="small" @click="editUser(currentData.data.scope.row)" 
            v-ShowBtn="'userList.edit'" class="hideBtn"
            >编辑</el-button>
          </template>
        </TableVue>
      </el-col>
    </el-row>
    <!-- 新增组件 -->
      <addUser :displayEditObj="EditCurrentObj" @backUpdate="updateRequestApi" :displayAddUser="showAddUser" @showAddUser="close" :displayTitle="childrenTile"/>
  </div>
</template>
<script>
import cookies from "cookiesjs"; //cookies第三方
import searchVue from "@/components/SearchVue/SearchVue"; //搜索组件
import TableVue from "@/components/TableVue"; //表格组件
import { reactive, toRefs } from "@vue/composition-api"; //vue3Api
import addUser from "@/components/addUser/addUser"; //新增窗口组件
import {packDeleteUser} from './UserChange';//删除用户外置事件
import {EditChildrenUser,SearchChildrenUser} from '@/api/user';
export default {
  components: { searchVue, TableVue, addUser }, //组件
  setup(props,{root,refs}) {
    // 方法
    let methods = reactive({
      changeSwitch(params){//状态切换事件
      let Cdata = params.data.scope.row;
      Cdata.type = 'EditCurrentStatus';
      if(Cdata.type === 'EditCurrentStatus'){
          EditChildrenUser(Cdata).then(res=>{
            // 加载转圈
             const loading = root.$loading({
              lock: true,
              text: 'Loading',
              spinner: 'el-icon-loading',
              background: 'rgba(0, 0, 0, 0.7)'
             });
              setTimeout(() => {
                loading.close();
                  root.$message({
                    message: res.data.msg,
                    type: 'success'
                  });
              }, 2000);
          }).catch(err=>{
            console.log(err);
          })
      }else{
        console.log("切换状态参数有问题");
      }
      },
      addUser() {//控制新增窗口是否显示
        data.EditCurrentObj = {};//因为新增和编辑使用同一个组件，在新增事件里，需把编辑给的对象清空，不然新增会显示编辑的属性
        data.showAddUser = !data.showAddUser;
      },
      close() {
        data.showAddUser = false;
      },
      updateRequestApi(res){
          if(res.data.code == 200){
            refs.childMethods.deletedUserforParent()
            }else{
              console.log("无法更新数据有误------updateRequestApi");
            }
      },
      deleteUser(res) { //删除用户 res当前删除的对象，data.accountCur账户token，root调用messes提醒需要
        packDeleteUser(res,data.accountCur,root).then(callbackRes=>{
          // 因为成功删除后，数据在页面还是存在的，但是本组件无法刷新数据，数据在子组件中，所有用ref的方法调用子组件中的方法刷新数据
              methods.updateRequestApi(callbackRes);
        });//参数有当前被点击项，root，当前账户和token
      },
      editUser(res) {//编辑用户
      let a = Object.assign({},res);//浅拷贝-意义是拷贝出来的对象，如果修改不会影响到原来的对象
      data.EditCurrentObj = a;
      data.EditCurrentObj['type'] = 'EditCurrentAccount';
      data.showAddUser = true;
      },
      userSearchVue(childrenDataObj) {//SearchVue插槽按钮回调函数
        for(let key in data.accountCur)childrenDataObj[key] = data.accountCur[key];//请求的参数
        childrenDataObj['pageNo'] = 1;//请求的参数-为了让请求后的结果分页也需要页码和页数
        childrenDataObj['pageSize'] = 8;//请求的参数
        SearchChildrenUser(childrenDataObj).then(res=>{
          if(res.data.result){//如果数组存在才提示成功并调用子组件的函数，赋值显示table数据的数组
            root.$message({message:res.data.msg,type: 'success'});
            refs.childMethods.SreachedDisplayData(res.data.result);
          }else{//否则就提示警告信息
            root.$message({message:res.data.msg,type: 'warning'});
          }
        })
      }
    });
    // 数据
    let data = reactive({
      EditCurrentObj:{},
      accountCur:{ email: cookies("userName"),token: cookies("token")},
      childrenTile:{
          userName:'用户名',
          passWord:'密码',
          trueName:'姓名',
          phone:'手机号',
          currentStatus:'是否启用',
          role:'角色',
          btn:'按钮',
          checkbox:[//系统
            {name:'业务员'},
            {name:'技术员'},
            {name:'管理员'}
          ],
          checkSystem:[//系统管理
            {name:'信息管理'},
            {name:'用户管理'}
          ],
          isShowBtn:[
            {btnClassName:"信息列表",btn:[
              {btnName:"添加信息按钮",value:"infoList.add"},{btnName:"编辑按钮",value:"infoList.edit"},
              {btnName:"删除按钮",value:"infoList.delete"},{btnName:"详情按钮",value:"infoList.details"},
              {btnName:"批量删除按钮",value:"infoList.selectDelete"}]},
            {btnClassName:"信息分类",btn:[{btnName:"添加信息按钮",value:"infoClass.add"}]},
            {btnClassName:"用户列表",btn:[{btnName:"搜索按钮",value:"userList.search"},
            {btnName:"添加按钮",value:"userList.add"},{btnName:"编辑按钮",value:"userList.edit"},
            {btnName:"删除按钮",value:"userList.delete"},{btnName:"批量删除按钮",value:"userList.selectDelete"}]},
          ]
      },
      showAddUser: false, //控制新增窗口是否显示
      ChildrenSearchDatas: {
        //搜索data
        //子组件搜索数据
        options: [
          {
            value: "userName",
            label: "用户名"
          },
          {
            value: "phone",
            label: "手机号"
          }
        ],
        click: "userSearchVue"
      },
      childrenTableData: {
        //表格data
        //子组件table数据
        titleOptions: [
          //表格头数据
          {
            prop: "userName",
            label: "邮箱/用户名"
          },
          {
            prop: "trueName",
            label: "真实姓名"
          },
          {
            prop: "phone",
            label: "手机号"
          },
          {
            prop: "region",
            label: "地区"
          },
          {
            prop: "role",
            label: "角色"
          },
          {
            prop: "currentStatus",
            label: "禁启用状态",
            currentStatus: '1',
            displayType: "slot",
            slotName: "switch"
          },
          {
            prop: "change",
            label: "操作",
            displayType: "slot",
            slotName: "change"
          }
        ],
        requestTabelDataApi: {
          //表格数据请求API
          email: cookies("userName"),
          token: cookies("token"),
          pageNo: 1,
          pageSize: 8
        }
      }
    });
    return {...toRefs(data), ...toRefs(methods)};
  }
};
</script>
<style lang="scss" scoped>
.wrapper {
  .elrow {
    margin-bottom: 20px;
  }
}
</style>
<style> 
button.hideBtn{display: none;}
button.showBtn{display: inline-block;}
</style> 