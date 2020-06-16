<template>
  <div id="login" class="login">
    <el-row>
      <!-- 图 -->
      <el-col :span="16">
        <div class="img-wrap hidden-xs-only">
          <img src="../../assets/img/07.svg" alt="login" class="img" />
        </div>
      </el-col>
      <!-- login -->
      <el-col :span="8">
        <div class="login-wrapper">
          <div class="form-wrap">
            <!-- form表单验证 -->
            <div class="formLogin">
              <!-- form表单验证 -->
              <el-form
                :model="ruleForm"
                status-icon
                :rules="rules"
                ref="ruleForm"
                label-width="100px"
                class="demo-ruleForm"
              >
                <!-- Email -->
                <el-form-item prop="userName">
                  <label for>Email</label>
                  <el-input type="text" v-model="ruleForm.userName" autocomplete="off"></el-input>
                </el-form-item>
                <!-- 密码 -->
                <el-form-item prop="passWord">
                  <label for>密码</label>
                  <el-input
                    maxlength="20"
                    minlength="6"
                    type="password"
                    v-model="ruleForm.passWord"
                    autocomplete="off"
                  ></el-input>
                </el-form-item>
                <!-- 注册显示2次密码 -->
                <el-form-item v-if="statusLogin === 'register'" prop="checkPass">
                  <label for>再次输入密码</label>
                  <el-input
                    maxlength="20"
                    minlength="6"
                    type="password"
                    v-model="ruleForm.checkPass"
                    autocomplete="off"
                  ></el-input>
                </el-form-item>
                <!-- 验证码 -->
                <el-form-item prop="code">
                  <label for>验证码</label>
                  <el-row :gutter="5">
                    <el-col :span="14">
                      <el-input
                        maxlength="10"
                        minlength="6"
                        type="text"
                        v-model="ruleForm.code"
                        autocomplete="off"
                      ></el-input>
                    </el-col>
                    <el-col :span="10">
                      <el-button style="font-size: 12px;margin-top:2px;" type="success" class="block" @click="getSmsForAxios(5)" :disabled='disabled'>{{reqCode}}</el-button>
                    </el-col>
                  </el-row>
                </el-form-item>
                <!-- 注册登陆切换 -->
                <el-form-item>
                  <el-button type="primary" @click="submitForm('ruleForm')" class="block">{{statusLogin === 'login' ? '登录' : '注册'}}</el-button>
                </el-form-item>
                <!--注册登陆切换 -->
                <div class="switchLogin-wrap">
                  <el-link
                    @click="switchLG"
                    v-show="statusLogin === 'login'"
                    :underline="false"
                    type="primary"
                    class="switchLogin"
                  >{{loginAndRegister.login}}</el-link>
                  <el-link
                    @click="switchLG"
                    v-show="statusLogin === 'register'"
                    :underline="false"
                    type="primary"
                    class="switchLogin"
                  >{{loginAndRegister.register}}</el-link>
                </div>
              </el-form>
            </div>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
// 存cookies
import cookies from 'cookiesjs'
// sha1加密
import sha1 from 'sha1';
// element-ui条件隐藏css
import "element-ui/lib/theme-chalk/display.css";
// 引入过滤特殊字符函数
import { stripscript, validateEmail, validatePass } from "@/utils/validate";
// 引入vue3.0
import { reactive, ref, onMounted, isRef, toRefs } from "@vue/composition-api";
// 引入axios请求API方法和模块  === 模块化引入
import { getPassCode,getRegister } from '../../api/login';
export default {
  name: "Login",

  // vue3.0 所有代码都写在 setup中
  // setup(props,context) {
    // console.log(context)
      /*
        attrs: === this.attrs
        emit: === this.emit
        isServer: === this.isServer
        listeners: === this.listeners
        parent: === this.parent
        refs: === this.refs
        root: === this.
     */ 
  setup(props,{refs,root}) { //结构写法
    //data 声明周期 自定义函数 都写在这里面

    // 自定义-数据
    const screenShow = ref(true); //拿到true 必须.value
    const disabled = ref(false);
    const statusLogin = ref("login");
    const switchLogin = ref(true);
    const reqCode = ref('获取验证码');
    const menuTabs = reactive([
      { txt: "登录", current: true },
      { txt: "注册", current: true }
    ]);
    const loginAndRegister = reactive({
      login: "没有账号?去注册",
      register: "以有账号?去登陆"
    });

    // 表单验证
    // 邮箱
    let validateUserName = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入邮箱1"));
      } else if (!validateEmail(value)) {
        callback(new Error("请输入正确邮箱1"));
      } else {
        callback();
      }
    };
    // 密码
    let validatepassWord = (rule, value, callback) => {
      //过滤特殊字符
      ruleForm.passWord = stripscript(value);
      value = stripscript(value);

      if (value === "") {
        callback(new Error("请输入密码"));
      } else if (!validatePass(value)) {
        callback(new Error("密码6-20数组+字母+大字母"));
      } else {
        // 密码加密
        value = sha1(value)
        callback();
      }
    };
    // 注册-再次输入密码-checkpass
    let validatecheckPass = (rule, value, callback) => {
      //过滤特殊字符
      ruleForm.checkPass = stripscript(value);
      value = stripscript(value);
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value != ruleForm.passWord) {
        callback(new Error("两次密码不一致"));
      } else {
        // 密码加密
        value = sha1(value)
        callback();
      }
    };
    // 验证码
    let validateCode = (rule, value, callback) => {
      // 过滤特殊字符
      ruleForm.code = stripscript(value);
      value = stripscript(value);

      if (value === "" || value.length < 6) {
        return callback(new Error("验证码不能为空,最少6位"));
      } else {
        callback();
      }
    };

    // 表单验证数据
    const ruleForm = reactive({
      userName: "312316773@qq.com",
      passWord: "QWEqwe123",
      code: "",
      checkPass: ""
    });
    const rules = reactive({
      userName: [{ validator: validateUserName, trigger: "blur" }],
      passWord: [{ validator: validatepassWord, trigger: "blur" }],
      code: [{ validator: validateCode, trigger: "blur" }],
      checkPass: [{ validator: validatecheckPass, trigger: "blur" }]
    });

    console.log(screenShow.value); //vue3 ref类型
    console.log(isRef(menuTabs)); //vue3  判断是不是ref类型
    console.log(toRefs(menuTabs));//vue3  
    console.log('以上是vue3 测试-----------------')

    // 生命周期
    onMounted(() => {
      // 环境变量值    在什么环境下 执行什么函数
      console.log(process.env.NODE_ENV)
      console.log(process.env.VUE_APP_ABC)
      console.log(process.env.VUE_APP_MODE)
      console.log('以上是vue3---环境变量---------测试-----------------')

      // 测试
      // let num = 'QWE123namecjk123456';
      // console.log(num);
      // console.log(sha1(num));

   
    });

    // 自定义方法 获取验证码
    const getSmsForAxios = (num) =>{
        // 前端-判断-邮箱不能为空
        if (ruleForm.userName == '' || !validateEmail(ruleForm.userName)) return root.$message.error('邮箱格式错误,不能为空！！');
        // 修改按钮value和是否可点
        reqCode.value = '发送中';
        disabled.value = true;

        // 倒计时方法
        timeBack(num);

        // 判断登录还是注册，并执行请求api
        getPassCode(ruleForm.userName,ruleForm.passWord,statusLogin.value);

        // // 请求api
        // getSms(ruleForm.userName);
        
        
    };
    // 到计时方法
    const timeBack = (num) => {

      setTimeout(() => {
            // 提示
            root.$message({
            message: '验证码已发送,请注意查收',
            type: 'success'
            });

            // 请求验证码
            // getSms(ruleForm.userName)

            // 倒计时
              let time = setInterval(() => {
                reqCode.value = `${num}后,再试`;
                num--;
                if(num < 0){
                  clearInterval(time);
                  disabled.value = false;
                  reqCode.value = '再次获取';
                }
              }, 1000);//setInterval
        }, 1000);//setTimeout 

    };
    //表单验证
    const submitForm = formName => {
      // alert(11);
      // axios({
      //   url:'user/123',
      //   method:'post',
      //   data:{
      //     "asd":"asd",
      //     "qwe":"asd"
      //   }

      // }).then(res=>{
      //   console.log(res)
      // }).catch(err=>{
      //   console.log(err)
      // })

      refs[formName].validate(valid => {
        if (valid) {
          // console.log(123123)
          // console.log(refs)
              // 判断是登录还是注册方法
            loginOrRegister();

        } else {
          console.log("error submit!!");
          return false;
        }
      });
    };
    
     // 判断登录或者注册方法,并执行请求api--分离
      const loginOrRegister = () => {
          if (statusLogin.value == 'login') {
                    //(ruleForm.userName,sha1(ruleForm.passWord),ruleForm.code,function(res) {
                          // console.log('登录成功--------前端')
                          // console.log(res)
                          //   if (res.data.data.length !== 0) {
                          //       // 跳转路由
                          //       root.$router.push({name:'Console'})

                          //   }else{
                          //         console.log('登录失败--------前端')
                          //   }
                    // });
                  // 将login方法 放进了 vuex actions 中调用
                    let data = reactive({
                      userName:ruleForm.userName,
                      passWord:sha1(ruleForm.passWord),
                      code:ruleForm.code
                    })
                    // 把登录模块 放进 vuex actions 异步中 
                    root.$store.dispatch('app/login',data)
                      .then((res)=>{  
                          console.log('登录成功--------前端')
                          console.log(res)
                            if (res.data.length !== 0) {
                                // 存入cookies
                                let myToken = res.data.token;
                                cookies({userName:res.data.email,token:myToken});
                                console.log(typeof myToken);
                                // 将username存入 vuex
                                root.$store.commit('app/SET_USERNAEM', res.data.email)
                                // 跳转路由
                                console.log('登录跳转成功');
                                root.$router.push({name:'Console'});
                            }else{
                                  console.log('登录失败--------前端------' + res.data.msg)
                            }
                  })
              // 注册 请求 api
              }else if (statusLogin.value == 'register') {
                    getRegister(ruleForm.userName,sha1(ruleForm.passWord),ruleForm.code);
              }else{
                    root.$message.error('失败，请联系管理员');               
              };
      };

      // 
    const resetForm = formName => {
      refs[formName].resetFields();
    };
    // 切换登陆
    const switchLG = () => {
      //清空输入框
      for (let key in ruleForm) {
        ruleForm[key] = "";
      }
      // 恢复获取验证码
      reqCode.value = '获取验证码';
      switchLogin.value = !switchLogin.value ;
      switchLogin.value  == true
        ? (statusLogin.value  = "login")
        : (statusLogin.value  = "register");
    };
    
    return {
      disabled,
      screenShow,
      statusLogin,
      switchLogin,
      reqCode,
      menuTabs,
      loginAndRegister,
      rules,
      ruleForm,
      //   方法
      submitForm,
      resetForm,
      switchLG,
      getSmsForAxios,
      timeBack,
      loginOrRegister
    };
  }
};
</script>

<style lang="scss" scoped>
* {
  list-style: none;
}
.showXm {
  width: 100px;
  height: 100%;
}
.getcode {
  font-size: 10px;
  height: 50px;
}
.block {
  display: block;
  width: 100%;
}
.login {
  //   border: 1px solid #a9a9a9;
  // 图片容器
  .img-wrap {
    // border: 1px solid #a9a9a9;
    height: 610px;
    width: 100%;
    // 图片
    .img {
      display: block;
      height: 100%;
      width: 100%;
    }
  }

  //登录wrap
  .login-wrapper {
    // border: 1px solid #a9a9a9;
    // background-color: #a9a9a9;
    width: 450px;
    height: 610px;

    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    //表单wrap
    .form-wrap {
      // login ul
      .menu-tab {
        margin: 0;
        padding: 0;
        display: flex;
        flex-direction: row;
        justify-content: space-around;

        // li
        .currentLi {
          color: #ffffff;
          text-align: center;
          width: 88px;
          line-height: 45px;
          background-color: #6c63ff;
          font-weight: bold;
        }
      }

      // formLogin
      .formLogin {
        // border: 1px solid #a9a9a9;
        width: 100%;
        // margin: 0 auto;
        .demo-ruleForm {
          margin-right: 100px;
        }
        // 切换登陆
        .switchLogin-wrap {
          width: 100%;
          // border: 1px solid #a9a9a9;

          display: flex;
          flex-direction: row;
          justify-content: center;
          .switchLogin {
            width: 248px;
            padding-left: 100px;
          }
        }
      }
    }
  }
}
</style>