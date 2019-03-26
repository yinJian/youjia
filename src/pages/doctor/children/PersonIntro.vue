<template>
  <div>
    <div class="tip-bar">此处内容将展示给患者，请认真填写</div>
    <div class="doctor-introduce">
      <div class="card-dct-title">简介</div>
      <span class="evaluate-item" v-for="item in goodAt">{{item}}</span>
      <textarea maxlength="1000" placeholder="请输入个人介绍，可简短描述从业经验，资格证书等..." v-model="doctorIntro"></textarea>
    </div>
    <div class="submit-btn" @click="editorInfo">提交</div>
  </div>
</template>

<script>
  import { personCenter,updateDoctorInfo } from  '@/api'
  export default {
    data(){
      return {
        doctorIntro: '',
        goodAt: ''
      }
    },
    methods: {
      editorInfo(){
        updateDoctorInfo(this.doctorIntro).then(data =>{
          console.log(data.data)
          if(data.data.code == '200'){
            this.$router.push('/doctor/person-info')
          }else {
            this.$yjToast(data.data.msg)
          }
        })
      }
    },
    mounted(){
      document.title = '个人简介'
      personCenter().then(data =>{
        if(data.data.code == '200'){
          //this.doctorIntro = data.data.data.doctorIntroduce
          this.goodAt = data.data.data.doctorExpert.split("#")
        }
      })
    }
  }
</script>

<style lang="less" scoped>
  @import '../../../assets/styles/doctor-base.less';

  .doctor-introduce{
    width: 100%;
    height: calc( 100vh - 188px);
    background: #ffffff;
    margin-top: 16px;
    padding: 40px;

    .card-dct-title{
      margin-bottom: 20px;
    }
    span{
      padding: 6px 12px;
      margin-right: 20px;
      border-radius: 24px;
    }
    textarea{
      width: 100%;
      height: 200px;
      border: 0;
      outline: 0;
      padding-top: 20px;
      font-size: 28px;
    }
  }
</style>
