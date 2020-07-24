<template>
  <div class="wrapper">
    <div class="addClassifyBtn">
      <el-button type="danger" size="small" @click="changeClassChildren" v-if="showBtn('infoClass.add')">添加一级分类</el-button>
    </div>
    <div class="lineSpace"></div>
    <div class="classify-wrapper">
      <el-row :gutter="25">
        <!-- 分类 -->
        <el-col :span="8">
          <div class="Classify" v-for="(item,i) in displayData" :key="i">
            <div class="title-wrapper">
              <svg-icon svgName="add" svgClass="svgIcon" />
              <h4>{{item.classParent_Name}}</h4>
              <div class="btn-wrapper">
                <el-button round type="danger" size="mini" @click="changeParentName(item)">编辑</el-button>
                <el-button round type="success" size="mini" @click="addChildrenClassify(item)">添加子级</el-button>
                <el-button round size="mini" @click="deleteClassParent(i)">删除</el-button>
              </div>
            </div>
            <ul>
              <li v-for="(ChildrenItem,i) in item.children" :key="i">
                {{ChildrenItem.classChild_Name}}
                <div class="btn-wrapper">
                  <el-button round type="danger" size="mini" @click="changeChildrenName(item,ChildrenItem)">编辑</el-button>
                  <el-button round size="mini" @click="deleteChildrenClassify(item.children,i)">删除</el-button>
                </div>
              </li>
            </ul>
          </div>
        </el-col>
        <!-- 分类编辑 -->
        <el-col :span="16">
          <div class="editClassify">
            <div class="tip">一级分类编辑</div>
            <div class="classNames">
              <el-form
                :model="ruleForm"
                status-icon
                label-width="100px"
                class="demo-ruleForm"
                :ref="ruleForm"
              >
                <el-form-item label="一级分类名称" size="mini">
                  <el-input
                    :disabled="parentInput"
                    v-model="ruleForm.classParent_Name"
                    style="width:200px"
                  ></el-input>
                </el-form-item>
                <el-form-item label="二级分类名称" size="mini" v-show="showClassChildren">
                  <el-input
                    :disabled="childrenInput"
                    v-model="ruleForm.classChild_Name"
                    style="width:200px"
                  ></el-input>
                </el-form-item>
                <el-form-item size="mini">
                  <el-button
                    type="danger"
                    :loading="loading"
                    :disabled="submitBtn"
                    @click="submitForm(ruleForm)"
                    size="mini"
                  >提交</el-button>
                </el-form-item>
              </el-form>
            </div>
          </div>
        </el-col>
        <!-- 结束 -->
      </el-row>
    </div>
  </div>
</template>


<script>
import { reactive, toRefs, onMounted, watchEffect } from "@vue/composition-api";
import { getClassify, addClassify } from "@/api/news.js";
import { globalVueT } from "@/utils/global_V3.0";
import cookies from "cookiesjs";

export default {
  setup(props, { root }) {
    //结构调用封装消息确定
    const { comfirmMessage, comfirmData } = globalVueT();
    // 测试监听vue3封装函数里的参数 watchEffect
    watchEffect(() => {
      console.log(comfirmData.aa + "--------watchEffect监听之前值");
    });
    // 生命周期
    onMounted(() => {
      getClassify(data.emails,data.tokens).then(res => {
        // let resData = res.resultFind[0].className;
        let resData = res.childRes == undefined ? res.resultFind[0].className : res.childRes[0].className;
        data.displayData = resData;
        console.log(data.displayData);
        console.log(typeof resData);
      });
    });

    // 数据 与  方法

    const data = reactive({
      //   methods methods methods
      changeChildrenName(item,ChildrenItem){
        data.presentStatus = "changeChildrenName"; //提交按钮判断状态
        data.showClassChildren = true;//显示子类输入框
        data.parentInput = true; //禁用父级输入框
        data.childrenInput = false; //使用二级分类输入框
        data.submitBtn = false; //使用提交按钮
        let parentName = item.classParent_Name;//拿到父级名称作为展现
        data.ruleForm.classParent_Name = parentName;//让父级输入框显示父级名称
        data.ruleForm.classChild_Name = ChildrenItem.classChild_Name;//让子级输入框显示子级名称
        data.presentChildrenItem = ChildrenItem;// 将当前被点击子级item存入共用data里
      },
      changeParentName(item){
        data.presentStatus = "changeParentName"; //提交按钮判断状态
        data.parentInput = false;//启用父类输入框
        data.showClassChildren = false;//禁止显示子类输入框
        data.submitBtn = false; //使用提交按钮
        data.ruleForm.classParent_Name = item.classParent_Name;//让输入框显示父级名称
        data.presentParentItem = item;// 将当前被点击数组存入共用data里
      },
      deleteChildrenClassify(itemArr,index){
            itemArr.splice(index,1);
            addClassify(data.emails, data.tokens, { className: data.displayData }).then(() => {
            console.log("resData   有数据   ");
            data.loading = false; //结束转圈
            data.parentInput = true; //禁用输入框
            data.showMessage("success", "删除成功");
        }
        );
      },
      addChildrenClassify(item) {//添加子类
        data.presentStatus = "addChildren"; //提交按钮判断状态
        data.showClassChildren = true;//显示子类输入框        
        data.parentInput = true; //禁用父级输入框
        data.childrenInput = false; //使用二级分类输入框
        data.submitBtn = false; //使用提交按钮
        let parentName = item.classParent_Name;//拿到父级名称作为展现
        data.ruleForm.classParent_Name = parentName;//让输入框显示父级名称
        data.presentItem = item;//将当前item对象保存在通用数据中
      },
      deleteClassParent(params) {//删除父级类
        comfirmMessage(root, {
          msg: "确定删除吗?删除后无法恢复！！！",
          warn: "警告"
        })
          .then(() => {
            console.log(
              "确定按钮-----回调函数执行成功-------------deleteClassParent"
            );
            let oldLength = data.displayData.length;
            // 数组删除方法一 [].splice(1删除起始位置数组,2刷出多少个,3可选。向数组添加的新项目。)
            // 数组删除方法二 []/filter(1函数和函数中的参数1必须填(参数1代表当前调用此方法数组的数据), 2 indedx , 3arr)
            // data.displayData.filter(displayData => displayData.id !== params) //参数可以是id绝对值 只会从id中找指定的值
            data.displayData.splice(params, 1); //依靠v-for循环出来的索引作为起始位置删除 id不行 删除不准确
            if (oldLength == data.displayData.length) {
              data.showMessage("error", "删除失败");
            } else {
              addClassify(data.emails, data.tokens, { className: data.displayData }).then(
                () => {
                  console.log("resData   有数据   ");
                  data.loading = false; //结束转圈
                  data.parentInput = true; //禁用输入框
                  data.showMessage("success", "删除成功");
                  //   清空输入框
                }
              );
            }
          })
          .catch(() => {
            console.log(
              "取消按钮-----回调函数执行成功-------------deleteClassParent"
            );
          });
      },
      changeClassChildren() {//添加一级分类按钮
        data.presentStatus = "addParent";//改变状态按钮判断
        data.showClassChildren = false;//禁止显示子类输入框
        data.parentInput = false;//启用父类输入框
        data.ruleForm.classParent_Name = '';//清空父类输入框
        data.submitBtn = false; //使用提交按钮
      },
      submitForm(formName) {//提交按钮
        if (data.presentStatus == "addParent") {
          //  提交数据请求接口按钮
          //  拿到请求接口必要的数据
          let classParent_Name = formName.classParent_Name;
          let classChild_Name = formName.classChild_Name;
          let objData = { classParent_Name, children: [{classChild_Name}] };
          let objDataNoChildren = { classParent_Name,children:[] };
          // 判断父级输入框是否是禁用状态
          if (data.parentInput == true) {
            if (classChild_Name == "" || classChild_Name == undefined)
              return data.showMessage("warning", "二级分类有误");
          };
          if (classParent_Name == "" || classParent_Name == undefined || !classParent_Name)return data.showMessage("warning", "一级分类有误");
          if (data.tokens == "" || data.tokens == undefined || !data.tokens)return data.showMessage("warning", "Token有误");
          if (data.emails == "" || data.emails == undefined || !data.emails)return data.showMessage("warning", "账户有误");

          getClassify(data.emails, data.tokens).then(res => {
            //先查找是为了先拿到数据库中的数据，在前端push后，在更新数据库
            data.loading = true;
            let resData = res.resultFind == undefined ?  res.childRes[0].className : res.resultFind[0].className;
            //   判断二级分类名字是否存在
            if (objData.children[0].classChild_Name == "") {
              //不存在
              resData.push(objDataNoChildren);
              data.displayData.push(objDataNoChildren);
            } else {
              resData.push(objData);
              data.displayData.push(objData);
            }
            //   resData.push(objData);
            //   data.displayData.push(objData);
            if (resData.length > 0) resData.forEach((item, i)=>item.id = i);
              addClassify(data.emails, data.tokens, { className: resData }).then(() => {    
                console.log("resData   有数据   ");
                data.loading = false; //结束转圈
                data.parentInput = true; //禁用输入框
                data.showMessage("success", "添加成功");
                data.submitBtn = true; //禁用提交按钮
                data.ruleForm.classParent_Name = '';//清空输入框
              });
          });
        }else if(data.presentStatus == "addChildren"){//添加子级
          data.showClassChildren = true;//显示子类输入框
          let classChild_Name = formName.classChild_Name;//拿到自己输入框内容
          if (classChild_Name == '') return data.showMessage("warning", "二级分类有误");
        
        //   data.presentItem.children[classChild_Name] = classChild_Name;//响应式 这样能直接改变data.display中的值
        let item = data.displayData.filter(displayData => displayData.id === data.presentItem.id);//过滤器找到当前item
        item[0].children.push({classChild_Name});//对象添加添加属性
        if (item[0].children.length > 0) item[0].children.forEach((item,i)=>item.id = i);//先push在循环加id
        data.ruleForm.classChild_Name = '';//清空输入框
          addClassify(data.emails, data.tokens, { className: data.displayData }).then(() => {    
                console.log("addChildren-----resData   有数据   ");
                data.loading = false; //结束转圈
                data.parentInput = true; //禁用输入框
                data.showMessage("success", "添加成功");
                data.ruleForm.classChild_Name = '';//清空输入框
              });

        }else if(data.presentStatus == "changeParentName"){
          let classParent_Name = formName.classParent_Name;//拿到自己输入框内容
          // 这里修改的data.presentParentItem.classParent_Name是点击编辑事件把当前被点击的数组item保存的通用data中的数据，
          // 通过修改它就能修改data.display，而data.display正式渲染页面的存放的数据，所有这里是动态响应的修改，不用在修改后再赋值给data.display中去
          // data.presentParentItem.classParent_Name = classParent_Name;//赋值修改值
          //  addClassify(data.emails, data.tokens, { className: data.displayData }).then(() => {//更新数据库    
          //       console.log("addChildren-----resData   有数据   ");
          //       data.loading = false; //结束转圈
          //       data.parentInput = true; //禁用输入框
          //       data.showMessage("success", "添加成功");
          //       data.ruleForm.classChild_Name = '';//清空输入框


                // 更感infoList中渲染的数组
                getClassify(data.emails, data.tokens).then(res =>{
                  let resData = res.resultFind[0].ClassNameAllData;
                  let result = resData.filter(item => item.classify ==  data.presentParentItem.classParent_Name);
                  result.forEach(item =>{
                    item.classify = classParent_Name;
                  })
                  // 请求更新api
                  addClassify(data.emails, data.tokens, { ClassNameAllData: resData }).then(res=>{
                    console.log('父级修改成功------changeParentName');
                    console.log(res);
                  });

                  data.presentParentItem.classParent_Name = classParent_Name;//赋值修改值
                    addClassify(data.emails, data.tokens, { className: data.displayData }).then(() => {//更新数据库   
                   
                      console.log("addChildren-----resData   有数据   ");
                      data.loading = false; //结束转圈
                      data.parentInput = true; //禁用输入框
                      data.showMessage("success", "添加成功");
                      data.ruleForm.classChild_Name = '';//清空输入框
                     });

                });


              // });
        }else if(data.presentStatus == "changeChildrenName"){
          let classChild_Name = formName.classChild_Name;//拿到自己输入框内容
          data.presentChildrenItem.classChild_Name = classChild_Name;//赋值修改值
           addClassify(data.emails, data.tokens, { className: data.displayData }).then(() => {//更新数据库        
                console.log("addChildren-----resData   有数据   ");
                data.loading = false; //结束转圈
                data.parentInput = true; //禁用输入框
                data.showMessage("success", "添加成功");
                data.ruleForm.classChild_Name = '';//清空输入框
              });
        }
      },
      showMessage(data, words) {//封装消息提示
        //显示提示信息封装
        root.$message({
          message: words,
          type: data
        });
      },

      //   data data data
      emails: cookies("userName"),
      tokens : cookies("token"),
      ruleForm: { classParent_Name: "", classChild_Name: "" }, //输入框双向绑定数据
      displayData: [], //数据库容器
      loading: false, //加载t圈
      showClassChildren: true, //子级分类输入框显示
      parentInput: true, //父级分类输入框禁用
      childrenInput: true, //子级分类输入框禁用
      submitBtn: true, //提交按钮禁用
      presentStatus: "addParent", //提交按钮状态
      presentItem:'',//添加子级当前item的容器
      presentParentItem:[],//存放当前被点击的父级数组
      presentChildrenItem:[],//存放当前被点击的子级数组
    });
    return { ...toRefs(data) };
  }
};
</script>

<style lang="scss" scoped>
@import "@/style/main.scss";
.editClassify {
  margin-top: 1px;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  .tip {
    background-color: #e6e6e6;
    padding-left: 20px;
    line-height: 40px;
    border-radius: 20px;
  }
  .classNames {
    padding-left: 20px;
    margin-top: 20px;
  }
}
.btn-wrapper {
  display: none;
  position: absolute;
  right: 12px;
  align-self: center;
}
.wrapper {
  height: 100%;
}
.lineSpace {
  width: calc(100% + 60px); //计算属性
  border-bottom: 1px solid #e6e6e6;
  margin: 30px 0px 30px -30px;
}
.Classify {
  border: 1px solid transparent; //BUG 不加少一个高度
  position: relative;
  height: 100%;
  margin-bottom: 10px;
  .title-wrapper {
    cursor: pointer;
    display: flex;
    position: absolute;
    padding: 10px 15px;
    width: 93%;
    @include webkit(transition, all 1s);

    &:hover {
      background-color: #e6e6e6;
      border-radius: 20px;
      .btn-wrapper {
        display: block;
      }
    }
    h4 {
      margin: 0px 0px 0px 28px;
      display: inline-block;
    }
  }

  ul {
    margin-left: 21px;
    padding: 0px 0px 0px 0px;
    padding-top: 14px;

    li::before {
      content: "";
      display: inline-block;
      border-bottom: 1px dotted #000000;
      width: 30px;
      margin: 0px 5px 10px 1px;
    }
    li {
      display: flex;

      list-style: none;
      padding: 10px 0px;
      margin: 20px 0px 15px 0px;
      &:hover {
        .btn-wrapper {
          display: block;
        }
        border-radius: 20px;
        background-color: #e6e6e6;
        @include webkit(transition, all 1s);
      }
    }
  }
  ul::before {
    content: "";
    display: block;
    border-left: 1px dotted #000000;
    height: 20px;
    position: absolute;
    height: 100%;
  }
}
</style>