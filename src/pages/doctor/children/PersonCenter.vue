<template>
  <div>
    <div class="doctor-head">
      <div class="doctor-head-wrap">
        <img :src="avatar ? avatar : avatarDefault" class="doctor-img fll">
        <div class="doctor-head-info" @click="Jump('/doctor/person-info')">
          <div class="fll mr20">{{ oldName ? oldName : '暂无用户' }}</div>
          <img src="../../../assets/images/icon_arrow_white.png" class="icon-arrow-right" >
        </div>
      </div>
      <div class="card-shadow-item doctor-person-section">
        <ul>
          <li @click="Jump('/doctor/income')">
            <img src="../../../assets/images/income-icon.png" alt="">
            <p>我的收入</p>
          </li>
          <!--<li @click="Jump('/doctor/comment')">
            <img src="../../../assets/images/comment-icon.png" alt="">
            <p>用户评价</p>
          </li>-->
        </ul>
      </div>
    </div>
    <div class="setting">
      <div class="card-item">
        <div class="card-label"><img src="../../../assets/images/setting-icon.png" alt=""><span>服务设置</span></div>
        <img src="../../../assets/images/icon_arrow_r@2x.png" class="icon-arrow-right">
      </div>
    </div>
    <div class="submit-btn" @click="outLogin">退出登录</div>
  </div>
</template>

<script>
  import {doctorOutLogin} from '@/api'
  import {
    getLocalStorage,
    setLocalStorage
  } from '@/assets/scripts/utils';
  const avatarDefault = require('@/assets/images/default-doctor.png');

  export default {
    data () {
      return {
        oldNumber: '',
        oldName: '',
        avatar: '',
        avatarDefault: avatarDefault,
        oldPhone: ''
      }
    },
    methods: {
      Jump(url){
        this.$router.push(url)
      },
      outLogin(){
        doctorOutLogin().then(data =>{
          if(data.data.code == '200'){
            this.$router.push('/doctor/signin')
          }else {
            this.$yjToast(data.data.msg)
          }
        })
      }
    },
    mounted () {
      document.title = '个人中心';
      this.oldName = getLocalStorage('nickname') ? JSON.parse(getLocalStorage('nickname')) : '';
      this.avatar = getLocalStorage('avatar') ? getLocalStorage('avatar').substring(1, getLocalStorage('avatar').length - 1) : '';
    }
  }
</script>

<style lang="less" scoped>
  @import '../../../assets/styles/doctor-base.less';

  .doctor-head{
    width: 100%;
    height: 450px;
    background-color: #ffffff;
    background-image: url("../../../assets/images/header-bg.png");
    background-repeat: no-repeat;
    background-size: 100% 340px;
    position: relative;
    overflow: hidden;
  }
  .doctor-head-wrap{
    margin: 76px 4%;
    overflow: hidden;
  }
  .doctor-head-info{
    float: left;
    font-size: 36px;
    color: #FFFFFF;
    font-weight: bold;
    margin-left: 20px;
    line-height: 100px;
    img{
      margin-top: 34px;
    }
  }
  .doctor-person-section{
    border-radius: 24px;
    position: absolute;
    top:210px;
    left: 4%;
    ul li{
      width: calc(50% - 1px);
      text-align: center;
      padding: 10px 0;
      float: left;
    }
    li:first-child{
     // border-right: 1px solid #F6F6F6;
    }
    img{
      width: 58px;
    }
    p{
      font-size: 28px;
      color: #333333;
    }
  }
  .card-shadow-item{
    margin-bottom: 0;
  }
  .setting{
    width: 100%;
    height: calc(100vh - 530px);
    background: #ffffff;
    margin-top: 20px;
  }
  .card-item{
    padding: 0 40px;
    height: 110px;
    line-height: 110px;
  }
  .card-label{
    font-size: 28px;
    color: #333333;
    img{
      width: 40px;
      float: left;
      margin-right: 20px;
      margin-top: 34px;
    }
  }
</style>
