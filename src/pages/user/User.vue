<template>
  <div>
    <div class="card">
      <div class="card-item person-photo">
        <div class="card-item-label">头像</div>
        <div class="card-item-value"><img :src="avatar ? avatar : avatarDefault" class="doctor-img"></div>
      </div>
    </div>
    <div class="card h-bottom">
      <div class="card-item">
        <div class="card-item-label">姓名</div>
        <div class="card-item-value">{{ nickname ? nickname : '暂无用户' }}</div>
      </div>
      <div class="card-item">
        <div class="card-item-label">手机号</div>
        <input type="" name="" v-model="phone" placeholder="必填">
      </div>
    </div>
    <div class="submit-btn" @click="verifyHandler">退出登录</div>
  </div>
</template>

<script>
  import {
    getUserinfo,
  } from '@/api';
  import {
    getLocalStorage,
    removeLocalStorage
  } from '@/assets/scripts/utils';
  const avatarDefault = require('@/assets/images/default-doctor.png');

  export default {
    data(){
      return {
        phone: '',
        avatar: '',
        nickname:'',
        avatarDefault: avatarDefault
      }
    },
    methods:{
      verifyHandler(){
        localStorage.removeItem('phone')
        localStorage.removeItem('userId')
        this.getUserinfo();
        this.initUserinfo(false);
        this.$router.push('/signin')
      },
      initUserinfo (isJump) {
        if (this.userinfo) {
          this.nickname = this.userinfo.nickname;
        } else {
          if (isJump) {
            this.$router.push('/signin?redirect='+encodeURIComponent(this.$route.path));
          }
        }
      },
      getUserinfo () {
        getUserinfo().then(data => {
          if (data.data.success == 'OK') {
            const userinfo = {
              name: data.data.data.name,
            };
            setLocalStorage('uid', data.data.data.userId);
            this.$store.commit('updateUserinfo', {
              userinfo: userinfo
            });
          } else {
            this.$router.push('/signin?redirect='+encodeURIComponent(this.$route.path));
          }
        });
      }
    },
    mounted(){
      document.title = '个人中心';
      this.avatar = getLocalStorage('avatar') ? getLocalStorage('avatar').substring(1, getLocalStorage('avatar').length - 1) : '';
      this.nickname = getLocalStorage('nickname') ? getLocalStorage('nickname').substring(1, getLocalStorage('nickname').length - 1) : '';
      this.phone = JSON.parse(getLocalStorage('phone'))
    }
  }
</script>

<style lang="less" scoped>
  @import '../../assets/styles/doctor-base';

  .card{
    margin-top: 0;
    margin-bottom: 20px;
    border: 0;
    padding: 0 40px;
  }
  .card-item{
    border: 0;
    font-size: 32px;
    color: #333333;
    height: 110px;
  }
  .person-photo{
    height: 180px;
  }

  .h-bottom{
    height: calc(100vh - 280px);
  }
</style>
