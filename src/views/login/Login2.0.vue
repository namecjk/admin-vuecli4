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
            <!-- <ul class="menu-tab">
              <li
                v-for="(item,i) in menuTab"
                :key="i"
                :class="{'currentLi':item.current}"
                @click="change(item)"
              >{{item.txt}}</li>
            </ul> -->

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
                 <el-form-item  v-if="statusLogin === 'register'" prop="checkPass">
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
                        maxlength="6"
                        minlength="6"
                        type="text"
                        v-model="ruleForm.code"
                        autocomplete="off"
                      ></el-input>
                    </el-col>
                    <el-col :span="10">
                      <el-button type="success" class="block">获取验码</el-button>
                    </el-col>
                  </el-row>
                </el-form-item>
                <!-- 注册登陆切换 -->
                <el-form-item>
                  <el-button type="primary" @click="submitForm('ruleForm')" class="block">登录</el-button>
                </el-form-item>
                  <!--注册登陆切换 -->
                <div class="switchLogin-wrap">
                  <el-link @click="switchLG" v-show="statusLogin === 'login'" :underline="false" type="primary" class="switchLogin">{{loginAndRegister.login}}</el-link>
                  <el-link @click="switchLG" v-show="statusLogin === 'register'" :underline="false" type="primary" class="switchLogin">{{loginAndRegister.register}}</el-link>
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
// element-ui条件隐藏css
import "element-ui/lib/theme-chalk/display.css";
// 引入过滤特殊字符函数
import { stripscript, validateEmail, validatePass } from "@/utils/validate";
export default {
  name: "Login",
  data() {
    // 邮箱
    var validateUserName = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入邮箱"));
      } else if (validateEmail(value)) {
        callback(new Error("请输入正确邮箱"));
      } else {
        callback();
      }
    };
    // 密码
    var validatepassWord = (rule, value, callback) => {
      // 过滤特殊字符
      this.ruleForm.passWord = stripscript(value);
      value = stripscript(value);

      if (value === "") {
        callback(new Error("请输入密码"));
      } else if (validatePass(value)) {
        callback(new Error("密码6-20数组+字母"));
      } else {
        callback();
      }
    };
    // 注册-再次输入密码-checkpass
    var validatecheckPass = (rule, value, callback) => {
      // 过滤特殊字符
      this.ruleForm.checkPass = stripscript(value);
      value = stripscript(value);
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value != this.ruleForm.passWord) {
        callback(new Error("两次密码不一致"));
      } else {
        callback();
      }
    };
    // 验证码
    var validateCode = (rule, value, callback) => {
      // 过滤特殊字符
      this.ruleForm.code = stripscript(value);
      value = stripscript(value);
      if (value === "") {
        return callback(new Error("验证码不能为空"));
      } else {
        callback();
      }
    };
    // data return
    return {
      screenShow: true,
      statusLogin : 'login',
      switchLogin: true,
      menuTab: [
        { txt: "登录", current: true },
        { txt: "注册", current: true }
      ], 
      loginAndRegister : {
          "login":"没有账号?去注册",
          "register":"以有账号?去登陆"
      },
      ruleForm: {
        userName: "",
        passWord: "",
        code: "",
        checkPass:""
      },
      rules: {
        userName: [{ validator: validateUserName, trigger: "blur" }],
        passWord: [{ validator: validatepassWord, trigger: "blur" }],
        code: [{ validator: validateCode, trigger: "blur" }],
        checkPass: [{ validator: validatecheckPass, trigger: "blur" }]
      }
    };
  },
  created() {},
  // 挂载完成后自动执行
  mounted() {},
  methods: {
    change(data) {
      console.log(data);
      data.current = true;
    },
    //表单验证
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    // 切换登陆
    switchLG(){
        //清空输入框
        for(let key in this.ruleForm){
            this.ruleForm[key] = ''
        }
        this.switchLogin = !this.switchLogin
        this.switchLogin == true ? this.statusLogin = 'login' : this.statusLogin = 'register'

    }
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
          .switchLogin{
            width: 248px;
            padding-left: 100px;
          }
        }
      }
    }
  }
}
</style>