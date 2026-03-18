<template>
  <div class="app-login">
    <img :src="appLoginIcon" alt="" draggable="false" class="login-icon" />


    <div class="login-form">
      <h1 class="login-form-title">欢迎登陆</h1>

      <div class="login-form-subhead">科技赋能专科医疗 / 大数据浇灌大健康</div>

      <el-form ref="form" :model="formData" :rules="rules" label-width="auto">
        <el-form-item prop="userName">
          <el-input v-model="formData.userName" placeholder="请输入用户名" @focus="onInputFocus('userName')"
            @blur="onInputFocus(void 0)">
            <template #prefix>
              <img :src="inputFocus === 'userName' ? iconUserOn : iconUserOff" alt="" class="input-icon" />
            </template>
          </el-input>
        </el-form-item>

        <el-form-item prop="password">
          <el-input v-model="formData.password" type="password" show-password placeholder="请输入密码"
            @focus="onInputFocus('password')" @blur="onInputFocus(void 0)">
            <template #prefix>
              <img :src="inputFocus === 'password' ? iconPasswordOn : iconPasswordOff" alt="" class="input-icon" />
            </template>
          </el-input>
        </el-form-item>

        <!-- <el-form-item prop="code">
          <div class="code-row">
            <el-input v-model="formData.code" placeholder="请输入验证码" @focus="onInputFocus('code')"
              @blur="onInputFocus(void 0)" @keydown.enter.native="onLogIn">
              <template #prefix>
                <img :src="inputFocus === 'code' ? iconVerificationCodeOn : iconVerificationCodeOff" alt=""
                  class="input-icon" />
              </template>
            </el-input>

            <img :src="captchaImg" alt="点击刷新验证码" class="row-code-image" @click="getCode" />
          </div>
        </el-form-item> -->
      </el-form>

      <div class="button-login" @click="onLogIn">
        登录
      </div>
    </div>
  </div>
</template>

<script>
import appLoginIcon from '@/assets/app-login/app-login-logo.png';
import iconLogo from '@/assets/app-icon/icon-logo-login.png';
import iconUserOn from '@/assets/app-icon/icon-user-on.png';
import iconUserOff from '@/assets/app-icon/icon-user-off.png';
import iconPasswordOn from '@/assets/app-icon/icon-password-on.png';
import iconPasswordOff from '@/assets/app-icon/icon-password-off.png';
import iconVerificationCodeOn from '@/assets/app-icon/icon-verification-code-on.png';
import iconVerificationCodeOff from '@/assets/app-icon/icon-verification-code-off.png';
import { mapMutations } from "vuex";

export default {
  name: 'app-login',
  props: {},
  components: {},
  data() {

    return {

      iconLogo,
      iconUserOn,
      iconUserOff,
      iconPasswordOn,
      iconPasswordOff,
      iconVerificationCodeOn,
      iconVerificationCodeOff,
      // 表单
      formData: {
        userName: "",
        password: ""
      },

      // 规则
      rules: {
        userName: [{ required: true, message: '必填', trigger: 'blur' }],
        password: [{ required: true, message: '必填', trigger: 'blur' }],
        code: [{ required: true, message: '必填', trigger: 'blur' }],
      },
      // 验证码
      captcha: null,
      // 输入框聚焦
      inputFocus: void 0,
    };
  },
  computed: {
    // 验证码
    captchaImg() {
      return this.captcha ? `data:image/gif;base64,${this.captcha}` : '';
    },
    appLoginIcon() {
      return appLoginIcon + '?random=' + Math.random()
    }

  },
  watch: {},
  beforeCreate() { },
  created() {

    this.SetToken('')
  },
  beforeMount() { },
  mounted() {
    let routerInfo = this.$route.query;
    if (routerInfo.userName && routerInfo.password) {
      let obj = {
        userName: routerInfo.userName,
        password: routerInfo.password
      };
      this.$AllService.LoginService.Login(obj).then(resp => {
        if (resp.code === 200) {
          this.$message({
            type: "success",
            message: "登录成功"
          });
          window.sessionStorage.setItem("token", resp.data[0].token);
          this.$router.push({
            path: "/layout"
          });
        } else {
          // this.$message.error(resp.message);
        }
      });
    }
  },
  beforeUpdate() { },
  updated() { },
  beforeDestroy() { },
  destroyed() { },
  activated() { },
  deactivated() { },
  methods: {
    // 获取验证码
    // async getCode() {
    //   const { code, img, uuid } = await getCaptcha();
    //   if (code !== 200) {
    //     return;
    //   }
    //   this.formData.uuid = uuid;
    //   this.captcha = img;
    // },
    ...mapMutations(["SetToken"]),
    // 登录 / 进入
    async onLogIn() {
      let that = this;
      this.$refs['form'].validate(valid => {
        if (valid) {
          this.$AllService.LoginService.Login(this.formData).then(resp => {
            if (resp.code === 200) {
              this.SetToken('token')
              this.$message({
                type: "success",
                message: "登录成功"
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
          return false;
        }
      });
    },

    // input聚焦
    onInputFocus(v) {
      this.inputFocus = v;
    },
  },
};
</script>

<style src="./index.scss" scoped lang="scss"></style>
