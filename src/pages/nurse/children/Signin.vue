<template>
  <div class="nurse-signin">
    <img class="logo" src="../../../assets/images/logo.png" alt="">
    <ul class="signin-form">
      <li>
        <img src="../../../assets/images/phone-icon.png" width="23" />
        <input type="tel" name="name" v-model="phone" placeholder="请输入手机号" maxlength="11">
      </li>
      <li>
        <img src="../../../assets/images/yzm-icon.png" width="23" />
        <input type="text" v-model="code" placeholder="请输入验证码"/>
        <!--<div class="send-code send-code-disabled" v-if="sended">{{ time }}秒后重发</div>-->
        <span class="yzm-btn"  @click="sendCodeHandler" v-if="!sended">获取验证码</span>
        <span class="yzm-btn" v-if="sended">{{ time }}秒后重发</span>
      </li>
    </ul>
    <div>
      <div class="next-btn" @click="verifyHandler">下一步</div>
      <router-link class="cancel-btn" to="/user-center" tag="div">取消</router-link>
    </div>
    <!-- <div class="activity_box">
      <a href="https://www.youjiajk.com/careers" class="activity flr">活动详情</a>
    </div> -->
  </div>
</template>

<script>
    import {
      sendCode,
      codeCheck
    } from '@/api'

    var timer = null;

    export default {
      data(){
        return {
          phone: '',
          code: '',
          sended: false,
          time: 60,
        }
      },
      methods: {
        startTimer () {
          timer = setInterval(() => {
            if (this.time > 0) {
              this.time--;
            } else {
              this.time = 60;
              clearInterval(timer);
              this.sended = false;
            }
          }, 1000);
        },
        sendCodeHandler () {
          let { phone } = this;
          if (!phone) {
            this.$yjToast('请输入正确的手机号！');
            return;
          }
          if (!/^1[34578]\d{9}$/.test(phone)) {
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
        verifyHandler () {
          const {
            code,
            phone
          } = this;
          if (!phone) {
            this.$yjToast('请输入正确的手机号！');
            return;
          }
          if (!/^1[34578]\d{9}$/.test(phone)) {
            this.$yjToast('请输入正确的手机号！');
            return;
          }
          if (!code) {
            this.$yjToast('请输入验证码！');
            return;
          }
          codeCheck(phone, code).then(data => {
            if (data.data.code == 200) {
              this.$router.push('/nurse/apply/'+phone)
            }else if(data.data.code == 201){
              this.$router.push('/nurse/success')
            }else {
              this.$yjToast('请输入正确的验证码！');
            }
          });
        }
      },
      mounted(){
        document.title = "优加健康"
      }
    }
</script>

<style lang="less" scoped>
  @import '../../../assets/styles/base.less';
  .logo {
    margin: 0 auto;
    padding: 100px 0;
    display: block;
    width: 160px;
  }

  input::-moz-placeholder{
    color: #999999;
  }
  input::-webkit-input-placeholder{
    color: #999999;
  }
  input:-ms-input-placeholder{
    color: #999999;
  }

  .nurse-signin{
    height: 100vh;
    background: @bg-white;
  }
  .signin-form{
    width: 670px;
    margin: 0 auto;
  }
  .signin-form input{
    width: 360px;
    border: none;
    outline: none;
    font-size: 32px;
    color: #333333;
    line-height: 32px;
    padding: 20px 0;
  }

  .signin-form li{
    height: 100px;
    padding-top: 26px;
    line-height: 100px;
    border-bottom: 1px solid #DFDFDF;
  }
  .signin-form li img{
    margin-top: 22px;
    margin-right: 30px;
    float: left;
  }
  .yzm-btn{
    font-size: 28px;
    color: #FFFFFF;
    line-height: 36px;
    background: #F39800;
    border-radius: 6px;
    padding: 20px 30px;
    float: right;
    margin-top: 8px;
  }
  .next-btn{
    width: 600px;
    margin: 90px auto 0;
    height: 88px;
    line-height: 88px;
    text-align: center;
    font-size: 32px;
    color: #FFFFFF;
    background: #F39800;
    box-shadow: 0 6px 14px 0 rgba(255,153,62,0.40);
    border-radius: 49px;
  }
  .cancel-btn{
    width: 600px;
    margin: 30px auto;
    height: 88px;
    line-height: 88px;
    text-align: center;
    font-size: 32px;
    color: #F39800;
    background: #FFFFFF;
    border: 2px solid #F39800;
    border-radius: 49px;
  }
  .activity_box {
    width: 670px;
    margin: 0 auto;
  }
  .activity {
    width: 200px;
    height: 40px;
    color: #F39800;
    font-size: 0.426667rem;
  }
</style>
