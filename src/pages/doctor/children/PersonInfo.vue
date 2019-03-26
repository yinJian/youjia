<template>
  <div>
    <div class="card">
      <div class="card-item person-photo">
        <div class="card-item-label">头像</div>
        <div class="card-item-value"><img :src="avatar ? avatar : avatarDefault" class="doctor-img"></div>
      </div>
    </div>
    <div class="card">
      <div class="card-item">
        <div class="card-item-label">姓名</div>
        <div class="card-item-value">{{doctorInfo.doctorName}}</div>
      </div>
      <div class="card-item">
        <div class="card-item-label">医院</div>
        <div class="card-item-value">{{doctorInfo.medicalSectionIdFK.medicalInstitutionsIdFK.medicalInstitutionsName}}</div>
      </div>
      <div class="card-item">
        <div class="card-item-label">科室</div>
        <div class="card-item-value">{{doctorInfo.medicalSectionIdFK.medicalSectionName}}</div>
      </div>
      <div class="card-item">
        <div class="card-item-label">职称</div>
        <div class="card-item-value">{{doctorInfo.doctorPost ? doctorInfo.doctorPost: '暂无'}}</div>
      </div>
      <div class="card-item">
        <div class="card-item-label">电话</div>
        <div class="card-item-value">{{doctorInfo.telephone}}</div>
      </div>
    </div>
    <div class="card">
      <router-link to="/doctor/person-intro" class="card-item">
        <div class="card-label">个人简介</div>
        <div class="card-item-value default-grey">请填写个人简介</div>
      </router-link>
    </div>
    <div class="bottom">
      <p>温馨提示</p>
      <p>认证成功后需要修改资料请联系客服 010-57293640</p>
    </div>
  </div>
</template>

<script>

  import {personCenter} from '@/api'
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
        oldPhone: '',
        doctorInfo: {}
      }
    },
    mounted () {
      document.title = '个人信息';
      this.avatar = getLocalStorage('avatar') ? getLocalStorage('avatar').substring(1, getLocalStorage('avatar').length - 1) : '';
      personCenter().then(data =>{
        if(data.data.code == '200'){
          console.log(data.data)
          this.doctorInfo = data.data.data
        }
      })
    },
    methods: {

    }
  }
</script>

<style lang="less" scoped>
  @import '../../../assets/styles/doctor-base.less';

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
  .default-grey{
    font-size: 32px;
    color: #C8C8C8;
  }
  .bottom{
    font-size: 24px;
    color: #C8C8C8;
    width: 100%;
    position: fixed;
    bottom: 40px;
    text-align: center;
  }
</style>
