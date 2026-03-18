<template>
  <div style="position: relative;" class="inpot_height38">
    <div>
      <el-carousel trigger="click" height="100vh" :interval="3000" arrow="never">
        <el-carousel-item v-for="(item, index) in scrollData" :key="index">
          <img style="width:100%;height:100%;" :src="item.path" alt />
        </el-carousel-item>
      </el-carousel>
    </div>
    <div class="login_logo">
      <div class="top_logo"></div>
      <div class="middle_login">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="0px" class="demo-ruleForm">
          <el-form-item label prop="userName">
            <el-input placeholder="账号" v-model="ruleForm.userName" class="biao_dan_shuru">
              <template slot="prepend">
                <img src="../../assets/login/zh.png" class="tu_biao" alt />
              </template>
            </el-input>
          </el-form-item>
          <el-form-item label prop="password">
            <el-input placeholder="密码" v-model="ruleForm.password" show-password class="biao_dan_shuru"
              @keyup.native.enter="submitForm('ruleForm')">
              <template slot="prepend">
                <img src="../../assets/login/mm.png" class="tu_biao" alt />
              </template>
            </el-input>
          </el-form-item>
          <el-form-item label prop="code">
            <div style="display: flex;justify-content: space-between;">
              <el-input placeholder="验证码" v-model="ruleForm.code" >
           
              </el-input>
              <img :src="captchaImg" @click="getCode" />
            </div>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')"
              style="width:100%;marginTop:16px;fontSize:16px;padding:11px 20px;">登录</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div style="marginTop:16px;textAlign: center;">
        <img src="../../assets/login/goldenimg.png" alt />
      </div>
    </div>
    <div class="mask_layer"></div>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
import store from "@/store";
import utils from '@/utils/utils-encrypt';

// Define messages for easier i18n integration later
const I18N_MESSAGES = {
  userNameRequired: "请输入用户名",
  passwordRequired: "请输入密码",
  passwordWeak: "密码需包含大小写字母、数字及特殊符号，且长度≥8位",
  validateCodeRequired: "请输入验证码",
  validateCodeError: "您输入的验证码不正确!",
  loginSuccess: "登录成功",
  encryptionFailed: "密码加密失败，请重试",
  validationFailed: "请检查输入项是否符合要求"
};

export default {
  name: "Login",
  components: {},
  data() {
    const validateInputCode = (rule, value, callback) => {
      if (!value) {
        callback(new Error(I18N_MESSAGES.validateCodeRequired));
      }  else {
        callback();
      }
    };
    
    // Strong password validation
    const validatePassword = (rule, value, callback) => {
      if (!value) {
        callback(new Error(I18N_MESSAGES.passwordRequired));
      } else {
        callback();

      }
    };

    return {
      scrollData: [
        {
          path: require("../../assets/login/bjt-1.png")
        },
        // {
        //   path: require("../../assets/login/bjt-3.png")
        // }
      ],
      ruleForm: {
        userName: "",
        password: "",
        code: "",
        checkKey: ""
      },
      rules: {
        userName: [
          {
            required: true,
            message: I18N_MESSAGES.userNameRequired,
            trigger: "blur"
          }
        ],
        password: [
          {
            required: true,
            validator: validatePassword,
            trigger: "blur"
          }
        ],
        code: [
          {
            required: true,
            trigger: "change",
            validator: validateInputCode
          }
        ]
      },
      codeUrl: ""
    };
  },
  computed: {
    // 验证码
    captchaImg() {
      return this.codeUrl ? `data:image/gif;base64,${this.codeUrl}` : '';
    },
  },
  mounted() {
    this.getCode()
    // let routerInfo = this.$route.query;
    // if (routerInfo.userName && routerInfo.password) {
    //   // Encrypt password from query params if auto-login
    //   let encryptedPassword = routerInfo.password;
    //   let encryptedUserName = routerInfo.userName;
    //   try {
    //      encryptedPassword = CryptoJS.MD5(routerInfo.password).toString();
    //     encryptedUserName = CryptoJS.MD5(routerInfo.userName).toString();
    //   } catch (e) {
    //      console.error("Auto-login encryption failed", e);
    //   }

    //   let obj = {
    //     userName: encryptedUserName,
    //     password: encryptedPassword
    //   };
    //   this.$AllService.LoginService.Login(obj).then(resp => {
    //     if (resp.code === 200) {
    //       this.$message({
    //         type: "success",
    //         message: I18N_MESSAGES.loginSuccess
    //       });
    //       window.sessionStorage.setItem("token", resp.data[0].token);
    //       this.$router.push({
    //         path: "/layout"
    //       });
    //     } else {
    //       // this.$message.error(resp.message);
    //     }
    //   });
    // }
  },
  created(){
    this.SetToken('')
  },
  methods: {
    ...mapMutations(["SetToken"]),
    submitForm(formName) {
      let that = this;
      this.$refs[formName].validate(valid => {
        if (valid) {
          // Clone the form data to avoid modifying the UI model (encrypting the input field directly is bad UX if login fails)
          const paramsData = { ...this.ruleForm };
          
          try {
            if (!paramsData.password) {
                // Should be caught by validator, but safe guard
                return;
            }
            const iv = utils.generateIvByTimestamp()
            // aes加密
            paramsData.username = utils.encrypt(that.ruleForm.userName, iv);
            paramsData.password = utils.encrypt(that.ruleForm.password, iv);
            paramsData.checkKey = utils.encrypt(that.ruleForm.checkKey, iv);
            paramsData.captcha = utils.encrypt(that.ruleForm.code, iv);
            paramsData.timeStr = iv;
          } catch (error) {
            console.error("Encryption error:", error);
            this.$message.error(I18N_MESSAGES.encryptionFailed);
            return;
          }

          this.$AllService.LoginService.Login(paramsData).then(resp => {
            if (resp.code === 200) {
              // 安全检查：确保响应中包含有效的Token
              const token = resp.result && resp.result.token;
              if (!token) {
                this.$message.error("登录异常：未能获取有效凭证");
                return;
              }

              this.SetToken('token')
              // 使用 session storage 保存 Token，以备刷新页面后恢复
              window.sessionStorage.setItem("token", token);
              this.$message({
                type: "success",
                message: I18N_MESSAGES.loginSuccess
              });
              that.$router.push({
                path: "/home"
              });
            } else {
              // this.$message.error(resp.message);
            }
          });
        } else {
          console.log("error submit!!");
          this.$message.error('账号或密码错误');
          return false;
        }
      });
    },
    // 获取验证码
    async getCode() {
      console.log(1123);
      
      const { code, result } = await this.$AllService.LoginService.getCaptcha();
      if (code !== 200) {
        return;
      }
      this.ruleForm.checkKey = result.key;
      this.codeUrl = result.code;

    },
  }
};
</script>
<style>
.el-carousel__indicators {
  z-index: 4 !important;
}

.el-carousel__button {
  width: 8px;
  height: 6px;
  border-radius: 3px;
  background-color: #fff;
}

.el-carousel__indicator.is-active button {
  width: 24px;
}

.middle_login .el-input__inner {
  height: 40px !important;
}

.middle_login .el-form-item {
  margin-bottom: 20px !important;
}

.middle_login .el-form-item__error {
  left: 64px !important;
}

.middle_login .el-input-group__prepend {
  background-color: #ecedef !important;
}

.middle_login .el-input__inner {
  background-color: #f6f7f9 !important;
}
</style>
<style scoped>
.background_container {
  background: url("../../assets/login/bjt-1.png") no-repeat;
  width: 100vw;
  height: 100vh;
}

.mask_layer {
  width: 100vw;
  height: 100vh;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 3;
}

.login_logo {
  width: 484.33px;
  height: 459px;
  position: absolute;
  top: 200px;
  right: 235px;
  z-index: 5;
}

.top_logo {
  height: 95.69px;
  /* background: url("../../assets/login/Dllogo.png") no-repeat; */
  margin-bottom: 50px;
}

.middle_login {
  width: 464px;
  /* height: 268px; */
  background-color: #fff;
  border-radius: 8px;
  margin-left: 8px;
  box-sizing: border-box;
  padding: 40px;
}

.biao_dan_shuru {
  height: 40px !important;
}

.tu_biao {
  display: inline-block;
  width: 20px;
  height: 20px;
}
</style>
