<template>
    <div class="user-center">
      <p class="title">你的身份是？</p>
      <div class="center-btn" @click="outLineUser">
        <img src="../../assets/images/outline-center-icon.png" alt="">
        <div class="center-btn-text">
          <p class="title">线下人员</p>
          <p class="con">线下人员个人中心</p>
        </div>
      </div>
      <div class="center-btn" @click="doctorUser">
        <img src="../../assets/images/teldoctor-center-icon.png" alt="">
        <div class="center-btn-text">
          <p class="title">电话医生</p>
          <p class="con">电话医生个人中心</p>
        </div>
      </div>
      <!-- <div class="center-btn" @click="nurseUser">
        <img src="../../assets/images/nurse-center-icon.png" alt="">
        <div class="center-btn-text">
          <p class="title">护士预注册</p>
          <p class="con">护士人员预注册入口</p>
        </div>
      </div> -->
    </div>
</template>

<script>
  import {
    outLineUser,
    doctorUser
  } from '@/api'
    export default {
      data(){
        return {

        }
      },
      methods: {
        outLineUser(){
          outLineUser().then(data=>{
            if(data.data.code =='200'){
              this.$router.push('/user')
            }else {
              this.$yjToast(data.data.msg)
            }
          })
        },
        doctorUser(){
          doctorUser().then(data=>{
            if(data.data.code =='200'){
              this.$router.push('/doctor/person-center')
            }else {
              this.$yjToast(data.data.msg)
            }
          })
        },
        nurseUser(){
          this.$router.push('/nurse/signin')
        }
      }
    }
</script>

<style lang="less" scoped>
  .user-center{
    width: 100vw;
    height: 100vh;
    background: #ffffff;
    padding:  4%;
    overflow: hidden;

    .title{
      padding: 20px 0 30px 0;
      font-size: 48px;
      color: #333333;
      font-weight: bold;
    }
  }
  .center-btn{
    width:100%;
    height: 200px;
    margin-top: 30px;
    background: #F6F5F3;
    border-radius: 5px;

    img{
      height: 200px;
      float: left;
    }
  }
  .center-btn-text{
    float: left;
    margin-top: 60px;
    margin-left: 80px;
    .title{
      padding: 0;
      font-size: 36px;
      color: #333333;
      font-weight: bold;
    }
    .con{
      font-size: 24px;
      color: #999999;
      margin-top: 16px;
    }
  }
</style>
