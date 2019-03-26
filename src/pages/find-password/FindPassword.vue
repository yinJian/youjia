<template>
  <div class="signin-container">
    <div class="signin-logo">
      <img src="../../assets/images/img_logo.png">
    </div>
    <div class="signin-form">
      <div class="form-group">
        <div class="area-code">
          <span>＋86</span>
        </div>
        <input type="tel" name="name" class="" v-model="phone" placeholder="手机号" class="tel-input" maxlength="11">
        <div class="send-code" @click="sendCodeHandler" v-if="!sended">获取验证码</div>
        <div class="send-code send-code-disabled" v-if="sended">({{ time }})</div>
      </div>
      <div class="form-group">
        <input type="text" name="name" class="lg-input" v-model="code" placeholder="请输入验证码">
      </div>
      <div class="form-group">
        <input type="password" name="name" class="lg-input" v-model="password" placeholder="设置新密码">
      </div>
      <button class="button-validate" @click="resetPasswordHandler">重置密码</button>
    </div>
  </div>
</template>

<script>
import {
  getUserinfo,
  bindWechat,
  sendCode,
  codeCheck,
  bindUser,
  editPassword
} from '@/api';

var timer = null;

export default {
  data () {
    return {
      sended: false,
      time: 60,
      phone: '',
      code: '',
      password: ''
    }
  },
  mounted () {
    this.initUserinfo();
  },
  methods: {
    initUserinfo () {
      if (this.userinfo) {
        if (this.$route.query.redirect) {
          this.$router.replace(decodeURIComponent(this.$route.query.redirect));
        } else {
          this.$router.push('/service');
        }
      }
    },
    startTimer () {
      timer = setInterval(() => {
        if (this.time > 0) {
          this.time--;
        } else {
          this.time = 0;
          clearInterval(timer);
          this.sended = false;
        }
      }, 1000);
    },
    sendCodeHandler: function () {
      let {phone} = this;
      if (!phone || !/^1[34578]\d{9}$/.test(phone)) {
        this.$yjToast('请输入正确的手机号！');
        return;
      }
      this.sended = true;
      this.startTimer();
      sendCode(phone).then(data => {
        if (data.data.success == 'OK') {
          this.$yjToast('验证码发送成功！');
        } else {
          this.$yjToast(data.data.message);
        }
      });
    },
    resetPasswordHandler () {
      const {
        code,
        phone,
        password
      } = this;
      var that = this;
      if (!phone || !/^1[34578]\d{9}$/.test(phone)) {
        this.$yjToast('请输入正确的手机号！');
        return;
      }
      if (!code) {
        this.$yjToast('请输入验证码！');
        return;
      }
      if (!password) {
        this.$yjToast('请输入正确的手机号！');
        return;
      }
      codeCheck(phone,code).then(data =>{
        if (data.status == 200) {
          editPassword(phone, password).then(data => {
            var setTime = setInterval(function () {
              if (data.status == 200) {
                that.$router.push('/signin');
              }
            },3000)
            if (data.status == 200) {
              this.$yjToast('重置密码成功，请重新登录！')
              setTime
            }else {
              this.$yjToast('重置密码失败！')
            }
          })
        } else {
          that.$yjToast('请输入正确的验证码！');
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
   @import '../../assets/styles/base.less';

  .signin-container {
    width: 100%;
    height: 100vh;
    padding-top: 2.6665rem;
    background:rgba(255,255,255,1);
  }

  .signin-logo {
    width: 4.7733rem;
    height: 1.68rem;
    margin: 0 auto;

    img {
      width: 100%;
      height: 100%;
    }
  }

  .signin-form {
    width: 100%;
    padding: 0 1.2rem;
    margin-top: 2.373rem;
  }

  .form-group {
    display: flex;
    align-items: center;
    border-bottom: 0.0533rem solid @border-default;
    padding-left: 0.1333rem;
    margin-bottom: 0.2133rem;

    input {
      height: 100%;
      border: none;
      outline: none;
      font-size: 0.4266rem;
      color: @text-color-input;
      line-height: 0.4266rem;
      padding: 0.2133rem 0;
    }
  }

  .lg-input {
    width: 100%;
  }

  .tel-input {
    width: calc(~"100% - 1.32rem - 1.7333rem - 0.24rem");
    color: #28354C;
  }

  .area-code {
    width: 1.32rem;
    font-size: 0.4266rem;
    line-height: 0.4266rem;
    padding: 0.2133rem  0;
    color: #28354C;
    //margin-right: 0.24rem;

    span {
      display: inline-block;
      border-right: 2px solid @border-default;
      padding-right: 0.2133rem;
      line-height: 0.32rem;
    }
  }

  .send-code {
   // width: 1.7333rem;
    text-align: right;
    font-size: 0.32rem;
    line-height: 0.32rem;
    padding: 0.2133rem 0;
    color: #E49A2D;
  }

  .button-validate {
    width: 100%;
    height: 1.3333rem;
    margin: 1.3333rem auto 0 auto;

    .button-orange();
    .border-radius(2.6666rem);
  }
</style>
