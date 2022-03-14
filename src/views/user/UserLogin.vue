<template>
  <!-- 用户登录页 -->
  <div class="user-login-page">
    <user-header></user-header>
    <div class="logo-content">
      <router-link to="/home">
      <img src="@/assets/images/login/logo-mi2.png" alt />
      </router-link>
      <p>让每个人都能享受科技带来的乐趣</p>
    </div>
    <div class="form-content">
      <h3 class="form-title">小米账号登录</h3>
      <form class="form-login">
        <input
          type="text"
          name="email"
          id="email"
          class="input-item input-phone"
          placeholder="请输入Email账号"
          :class="{'input-fail':validateOptions.emailMessage}"
          v-model="email"
          @input="checkEmail"
        />
        <label for="email" v-show="validateOptions.emailMessage">{{validateOptions.emailMessage}}</label>
        <input
          type="password"
          name="password"
          id="password"
          class="input-item input-password"
          placeholder="请输入密码"
          :class="{'input-fail':validateOptions.passwordMessage}"
          v-model="password"
          @input="checkPassword"
        />
        <label for v-show="validateOptions.passwordMessage">{{validateOptions.passwordMessage}}</label>
        <div class="verify-content" v-if="false">
          <input type="text" name="verify_code" class="input-item" />
          <img src alt class />
        </div>
        <div class="input-allow">
          <input type="checkbox" name="check_rule" id="rule" v-model="checked" />
          <p>
            已阅读并同意小米账号
            <a href="javascript:">用户协议</a>和
            <a href="javascript:">隐私政策</a>
          </p>
        </div>
        <input
          type="button"
          class="input-item input-button"
          value="登录"
          @click="onLogin"
          :class="{'btn-disabled':loginStatus==1}"
        />
        <label for class="label-forget">
          没有账号?
          <router-link to="/user/register">注册</router-link>
        </label>
      </form>
    </div>
  </div>
</template>

<script>
import UserHeader from "./components/UserHeader";
import { reactive, toRefs } from "vue";
import FetchAPI from "@/utils/fetchApi";
import { Toast } from "vant";
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import axios from 'axios'
import Config from '@/config/index'
export default {
  components: {
    UserHeader
  },
  setup() {
    const router = useRouter()
    const state = reactive({
      email: "",
      password: "",
      checked: false,
      validateOptions: {
        emailMessage: "",
        passwordMessage: "",
        isEmailValidated: false,
        isPasswordValidated: false
      },
      loginStatus: 0 //0未登录 1-loginig 2-logined 3-failed
    });
    const store = useStore()
    const checkEmail = () => {
      state.validateOptions.isEmailValidated = true;
      const regexpEmail = /^([a-zA-Z]|[0-9])(\w)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
      if (state.email.trim() === "") {
        state.validateOptions.emailMessage = "请输入邮箱";
        return;
      }
      if (regexpEmail.test(state.email)) {
        state.validateOptions.emailMessage = "";
      } else {
        state.validateOptions.emailMessage = "输入邮箱格式不正确";
      }
    };
    const checkPassword = () => {
      state.validateOptions.isPasswordValidated = true;
      const regexpPassword = /^(\w){6,20}$/;
      if (state.password.trim() === "") {
        state.validateOptions.passwordMessage = "请输入密码";
        return;
      } else {
        if (regexpPassword.test(state.password)) {
          state.validateOptions.passwordMessage = "";
        } else {
          state.validateOptions.passwordMessage =
            "密码长度为6-20为 且只能包含字母数字和下划线";
        }
      }
    };
    const onLogin = () => {
      checkEmail();
      checkPassword();
      Promise.resolve().then(() => {
        if (!state.validateOptions.isEmailValidated) {
          Toast.fail("请确认是否输入邮箱");
          return;
        }
        if (!state.validateOptions.isPasswordValidated) {
          Toast.fail("请确认是否输入密码");
          return;
        }
        if (!state.checked) {
          Toast.fail("请确认勾选用户协议和隐私政策");
          return;
        }
        login();
      });
    };
    const login = () => {
      state.loginStatus = 1;
      Toast.loading('登录中')
      const data = {
        email: state.email,
        password: state.password
      };
      FetchAPI.postLogin(data)
        .then(res => {
          state.loginStatus = 2;
          localStorage.setItem('_user_token',res.data.access_token);
          store.dispatch('checkUserLoginStatus')
          axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('_user_token');
          Toast.clear()
          // window.location.href = Config.DOMAIN+'/#/user'
          router.go(-1)
        })
        .catch((e) => {
          state.loginStatus = 3;
          console.log(e);
          Toast.fail('登录失败')
        });
    };
    return {
      ...toRefs(state),
      checkEmail,
      checkPassword,
      onLogin
    };
  }
};
</script>

<style lang="scss" scoped>
.user-login-page {
  @media screen and(min-height: 667px) {
    div.form-content {
      margin-top: 30px;
    }
    div.logo-content {
      margin-top: 60px;
    }
  }
  @media screen and(min-height: 812px) {
    div.form-content {
      margin-top: 60px;
    }
    div.logo-content {
      margin-top: 120px;
    }
  }
  @media screen and(min-height: 900px) {
    div.form-content {
      margin-top: 80px;
    }
    div.logo-content {
      margin-top: 160px;
    }
  }
  .logo-content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    img {
      width: 50px;
      height: 50px;
    }
    p {
      margin-top: 20px;
      font-size: 14px;
      color: #999;
    }
  }
  .form-content {
    padding: 0 16px;
  }
  text-align: left;
  .form-title {
    font-size: 18px;
    font-weight: 700;
    text-align: left;
    padding: 20px 0;
  }
  .form-login {
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    .input-item {
      display: block;
      height: 50px;
      width: 320px;
      border: 2px solid #f5f5f5;
      background-color: #f5f5f5;
      border-radius: 25px;
      font-size: 16px;
      box-sizing: border-box;
      padding-left: 20px;
      margin-bottom: 12px;
      transition: all 0.3s linear;
      &:focus {
        border: 2px solid blue;
      }
    }
    input.input-fail {
      border-color: #ff2300;
    }
    label {
      padding-left: 16px;
      margin-top: -10px;
      margin-bottom: 12px;
      color: #ff6700;
      display: block;
      align-self: start;
    }
    .input-allow {
      display: flex;
      align-items: center;
      p {
        padding-left: 8px;
        font-size: 14px;
        a {
          color: #0f86ff;
        }
      }
    }
    .input-button {
      margin-top: 12px;
      background-color: #ff6700;
      color: #fff;
      &:focus {
        border: none;
      }
    }
    input.btn-disabled{
      background-color: #666;
    }
    label.label-forget {
      color: #0f86ff;
      margin-top: 40px;
      a {
        color: #ff6700;
      }
    }
  }
}
</style>