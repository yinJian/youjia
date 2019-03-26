<template>
  <div>
    <div class="order-detail">
      <div class="card-shadow-item p0" v-if="orderDetail.isReferral == '0001'">
        <div class="card-item" @click="reviewPreConsult">
          <div class="card-title-b">患者上次咨询记录</div>
          <img src="../../../assets/images/icon_arrow_r@2x.png" class="icon-arrow-right">
        </div>
      </div>
      <div class="card-shadow-item">
        <div class="card-title-b order-dct-title">问题详情</div>
        <div class="order-dct-item">
          <div class="laber-left fll">咨询科室：</div>
          <div class="laber-right">{{orderDetail.bespeakConfig.telephoneDoctor.medicalSectionName}}</div>
        </div>
        <div class="order-dct-item">
          <div class="laber-left fll">具体症状描述：</div>
          <div class="laber-right">{{orderDetail.bespeakConfig.telephoneDoctor.customerConsultationQuestion}}</div>
        </div>
        <div class="file-list">
          <div class="file-item" v-for="file in enclosure">
            <div class="file-item-wrapper">
              <img :src="file.enclosureUrl" class="file-img" @click="previewImgHandler(file.enclosureUrl)">
            </div>
          </div>
        </div>
      </div>
      <div class="card-shadow-item" v-if="orderDetail.customerServiceOrderStatus == '0009' || orderDetail.customerServiceOrderStatus == '0011'">
        <div v-if="doctorsAdvice != null & suggestMedications != null">
          <div class="card-title-b order-dct-title">咨询建议</div>
          <div class="order-dct-item">
            <div class="laber-left fll">用户情况：</div>
            <div class="laber-right">{{doctorsAdvice}}</div>
          </div>
          <div class="order-dct-item">
            <div class="laber-left fll">用药：</div>
            <div class="laber-right">{{suggestMedications}}</div>
          </div>
        </div>
        <div :class="doctorsAdvice?'records':''" v-if="recordList.length > 0">
          <div class="card-title-b order-dct-title">咨询录音</div>
          <div v-for="item in recordList">
            <audio controls>
              <source v-bind:src="item.enclosureUrl" type="audio/mpeg">
              您的浏览器不支持 audio 元素。
            </audio>
            <div class="laber-left record-time">{{item.enclosureBeginDateStr}}-{{item.enclosureEndDateStr}}</div>
          </div>
        </div>
      </div>
      <div class="suggestion" v-if="orderDetail.customerServiceOrderStatus != '0012' && (orderDetail.customerServiceOrderStatus == '0006' || doctorsAdvice == null || suggestMedications == null)">
        <div class="suggestion-item"><textarea placeholder="请输入用户情况" v-model="patientInfo" maxlength="200"></textarea></div>
        <div class="suggestion-item"><textarea placeholder="请输入建议小结" v-model="medicationUse" maxlength="200"></textarea></div>
        <div class="grey-bar"></div>
      </div>
      <div class="card-shadow-item">
        <div class="fll card-title-b">患者接听电话时间</div>
        <div class="flr card-b-value">{{consultTime}}</div>
      </div>
      <div class="card-shadow-item" v-if="orderDetail.customerServiceOrderStatus == '0011'">
        <div class="fll card-title-b">用户评价</div>
        <div class="flr card-b-value">
          <div class="score-stars">
            <img class="score-img" :src="simg <= scorePeople ? starHL : star" v-for="simg in [1,2,3,4,5]" >
          </div>
          <!--<div class="patient-desc" style="text-align: center">{{comment}}</div>-->
        </div>
      </div>
      <div class="order-number-info">
        <div class="order-number-info-item">
          <div class="card-title-b fll">订单编号：</div>
          <div class="card-b-value">{{orderDetail.orderNumber}}</div>
        </div>
        <div class="order-number-info-item">
          <div class="card-title-b fll">创建时间：</div>
          <div class="card-b-value">{{orderDetail.orderDateStr}}</div>
        </div>
      </div>
      <div class="submit-btn" v-if="recordList.length <= 0 && orderDetail.customerServiceOrderStatus != '0012'">
        <a href="tel:17180195256" v-if="callBack">立即回拨</a>
        <span @click="callback" v-if="!callBack">联系患者</span>
        <input v-model="orderDetail.bespeakConfig.telephoneDoctor.phone" hidden/>
      </div>
      <div class="submit-btn" v-if="recordList.length > 0 && (doctorsAdvice == null || suggestMedications == null)" @click="submitService">服务完成</div>
    </div>
    <div class="img-preview-wrapper" v-show="previewShow" @click="previewShow = false">
      <div class="img-preview-cover"></div>
      <div class="img-preview-content">
        <img :src="previewImg">
      </div>
    </div>
  </div>
</template>

<script>
  import {
    doctorDetail,
    submitService,
    callPhone,
    reviewdoctorComment,
    phoneFindFile
  } from '@/api'
  const star = require('../../../assets/images/star.png');
  const starHL = require('../../../assets/images/star-HL.png');
  export default {
    data(){
      return {
        star: star,
        starHL: starHL,
        scorePeople: '',
        orderMainId: '',
        orderNumber: '',
        orderDetail: {},
        orderPic: [],
        recordList: [],
        doctorsAdvice: '',
        suggestMedications: '',
        patientInfo: '',
        medicationUse: '',
        callBack: false,
        comment: '用户暂未评价',
        consultTime: '',
        oldOrderMainId: '',
        enclosure: {},
        previewShow: false,
        previewImg: ''
      }
    },
    methods:{
      submitService(){
        let {
          patientInfo,
          medicationUse
        } = this;
        if (!patientInfo) {
          this.$yjToast('请输入用户情况！');
          return;
        }
        if (!medicationUse) {
          this.$yjToast('请输入建议小结！');
          return;
        }
        submitService(this.orderMainId, this.patientInfo, this.medicationUse).then(data =>{
          if(data.data.code == '200'){
            this.$router.push('/doctor/list')
          }else {
            this.$yjToast(data.data.msg)
          }
        })
      },
      callback(){
        callPhone(this.orderDetail.orderNumber).then(data =>{
          console.log(data)
          if(data.data.code == 'OK'){
            this.callBack = true;
          }
        })
      },
      reviewPreConsult(){
        doctorDetail(this.oldOrderMainId).then(data =>{
          if(data.data.code == '200'){
            if(data.data.orderMain.isReferral == '0001'){
              this.$router.push('/doctor/return-consult-detail/'+this.oldOrderMainId)
            }else {
              this.$router.push('/doctor/detail/'+this.oldOrderMainId)
            }
          }
        })
      },
      previewImgHandler (img) {
        this.previewImg = img;
        this.previewShow = true;
      },
    },
    mounted (){
      document.title = '订单详情'
      this.orderMainId = this.$route.params.id;
      doctorDetail(this.orderMainId).then(data =>{
        console.log(data.data)
        if(data.data.code == '200'){
          this.orderDetail = data.data.orderMain
          this.doctorsAdvice = this.orderDetail.bespeakConfig.telephoneDoctor.doctorsAdvice
          this.suggestMedications = this.orderDetail.bespeakConfig.telephoneDoctor.suggestMedications
          this.orderNumber = data.data.orderMain.orderNumber
          this.orderPic = data.data.orderMainPicList
          this.recordList = data.data.recordList
          this.scorePeople = data.data.orderMain.bespeakConfig.telephoneDoctor.evaluation
          this.comment = data.data.orderMain.bespeakConfig.telephoneDoctor.evaluationContent
          this.consultTime = data.data.orderMain.bespeakConfig.telephoneDoctor.answerPhoneTime
          this.oldOrderMainId = data.data.orderMain.oldOrderMainId

          phoneFindFile(this.orderNumber).then(data => {
            if(data.data.success == 'OK'){
              this.enclosure = data.data.data;
            }
          });
        }
      })
    }
  }
</script>

<style lang="less" scoped>
  @import '../../../assets/styles/doctor-base.less';

  a{
    color: #ffffff;
  }
  .p0{
    padding: 0;
  }
  .order-detail{
    width: 100%;
    height: 100vh;
    overflow: scroll;
    background: @bg-dct-white;
  }

  .order-dct-title{
    margin-bottom: 30px;
  }
  .order-dct-item{
    margin-bottom: 16px;
  }

  .suggestion-item{
    width: 100%;
    height:240px;
    font-size: 28px;
    border-top: 1px solid #E1E1E1;
    margin-bottom: 6px;
    textarea{
      font-size: 28px;
      width: 100%;
      height:240px;
      border: 0;
      outline: none;
      padding: 40px;
    }
  }

  .records{
    border-top: 1px solid #E1E1E1;
    clear: both;
    margin-top: 20px;
    padding-top: 20px;
  }
  audio{
    width:100%;
  }

  .record-time{
    line-height: 60px;
    padding-left: 10px;
  }
  .grey-bar{
    width: 100%;
    height: 20px;
    background: #F1F1F1;
  }
  .order-number-info{
    height: 150px;
    overflow: hidden;
    background: @bg-dct-white;
    padding: 25px 0;
    margin-bottom: 100px;
  }

  .order-number-info-item{
    overflow: hidden;
    padding-left: 40px;
    line-height: 50px;
  }

  .file-list {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
  }

  .file-item {
    width: 100px;
    height: 100px;
    float: left;
    margin-right: 20px;
    margin-bottom: 20px;
    margin-top: 20px;
  }

  .file-item:nth-child(3n+3) {
    margin-right: 0;
  }
  .file-item-wrapper {
    position: relative;
  }
  .file-img {
    width: 100px;
    height: 100px;
    display: block;
  }
  .img-preview-content {
    width: 100%;
    height: 100vh;
    padding: 1rem 0;
    background: #000000;
    overflow-y: auto;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 10000;

    img {
      width: 100%;
    }
  }
  .score-stars {
    margin-top: 4px;
    width: 180px;
    display: flex;
    justify-content: space-between;
    img {
      width: 30px;
      height: 28px;
      margin-right: 10px;
    }
  }
</style>
