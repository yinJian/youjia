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
        <input type="tel" name="name" class="" v-model="phone" placeholder="手机号(线下)" class="tel-input" maxlength="11">
      </div>
      <div class="form-group">
        <input type="password" name="name" class="lg-input" v-model="password" placeholder="请输入登陆密码">
      </div>
      <div class="find-password-link">
        <router-link to="findpassword">忘记密码</router-link>
      </div>
      <button class="button-validate" @click="loginHandler">登录</button>
    </div>
  </div>
</template>

<script>
  import {
    userValid,
    outLineUser
  } from '@/api';
  import {
    setLocalStorage
  } from '@/assets/scripts/utils';

  import axios from 'axios';

  export default {
    data () {
      return {
        phone: '',
        password: ''
      }
    },
    methods: {
      loginHandler () {
        const {
          phone,
          password
        } = this;
        var that = this;
        if (!phone || !/^1[34578]\d{9}$/.test(phone)) {
          this.$yjToast('请输入正确的手机号！');
          return;
        }
        if (!password) {
          this.$yjToast('请输入密码！');
          return;
        }
        const openid = localStorage.getItem("openid")
        userValid(phone, password, openid).then(data => {
          if (data.data.success == 'OK') {
            console.log(that.$data.phone);
              setLocalStorage('phone', that.$data.phone);
              setLocalStorage('uid', data.data.data.reaidentStaffId);
              this.$router.push('/order');
          } else {
            this.$yjToast(data.data.message);
          }
        });
      }
    },
    mounted(){
     /*var userId = localStorage.getItem("uid");
     if(userId != null && userId != ''){
       this.$router.push("/order")
     }*/

      outLineUser().then(data =>{
        console.log(data.data)
        if(data.data.success == 'OK'){
          this.phone = data.data.data.phone
          this.password = data.data.data.reaidentStaffPassword
        }
      })
    },
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
    margin-right: 0.24rem;

    span {
      display: inline-block;
      border-right: 2px solid @border-default;
      padding-right: 0.2133rem;
      line-height: 0.32rem;
    }
  }

  .send-code {
    width: 1.7333rem;
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

  .find-password-link {
    text-align: right;

    a {
      color: #E49A2D;
    }
  }
</style>
