<template>
  <div>
    <div class="order-detail">
      <!-- 问题详情 -->
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
      <!--患者情况  -->
      <div class="card-shadow-item">
        <div class="order-dct-item">
          <div class="laber-left fll">咨询患者：</div>
          <div class="laber-right">{{orderDetail.bespeakConfig.telephoneDoctor.who}}</div>
        </div>
        <div class="order-dct-item">
          <div class="laber-left fll">性别：</div>
          <div class="laber-right">{{sex=='0'?'男':'女'}}</div>
        </div>
        <div class="order-dct-item">
          <div class="laber-left fll">年龄：</div>
          <div class="laber-right">{{orderDetail.bespeakConfig.telephoneDoctor.age}}</div>
        </div>
      </div>
      <!-- 完成展示 -->
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
      </div>
        <!-- 录音 -->
      <div class="card-shadow-item" v-if="recordList.length > 0">
        <div class="card-title-b order-dct-title">咨询录音</div>
        <div v-for="item in recordList">
          <audio controls>
            <source v-bind:src="item.enclosureUrl" type="audio/mpeg">
            您的浏览器不支持 audio 元素。
          </audio>
          <div class="laber-left record-time">{{item.enclosureBeginDateStr}}-{{item.enclosureEndDateStr}}</div>
        </div>
      </div>
      <div class="suggestion" v-if="orderDetail.customerServiceOrderStatus != '0012' && (orderDetail.customerServiceOrderStatus == '0006' || doctorsAdvice == null || suggestMedications == null)">
        <div class="suggestion-item"><textarea placeholder="请输入用户情况" v-model="patientInfo" maxlength="200"></textarea></div>
        <div class="suggestion-item"><textarea placeholder="请输入建议小结" v-model="medicationUse" maxlength="200"></textarea></div>
        <div class="achieve_btn" @click="submitText"><img src="../../../assets/images/aircraft.png" alt=""> 提交信息</div>
        <div class="grey-bar"></div>
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
      <!-- 提交信息 -->
      <div class="submit-btn" v-if="recordList.length <= 0 && orderDetail.customerServiceOrderStatus != '0012'">
        <a href="tel:17180195256" v-if="callBack">立即回拨</a>
        <span @click="callback" v-else>联系患者</span>
        <input v-model="orderDetail.bespeakConfig.telephoneDoctor.phone" hidden/>
      </div>
      <div class="submit-btn" 
        v-if="recordList.length > 0 && orderDetail.customerServiceOrderStatus != '0009' && orderDetail.customerServiceOrderStatus != '0011'" 
        @click="submitService">
        服务完成
      </div>
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
    submitText,
    callPhone,
    reviewdoctorComment,
    phoneFindFile,
    findVoice
  } from '@/api'
  const star = require('../../../assets/images/star.png');
  const starHL = require('../../../assets/images/star-HL.png');
  export default {
    data(){
      return {
        star: star,
        starHL: starHL,
        orderMainId: '',
        orderDetail: {},
        recordList: [],
        doctorsAdvice: '',
        suggestMedications: '',
        patientInfo: '',
        medicationUse: '',
        callBack: false,
        enclosure: {},
        previewShow: false,
        previewImg: '',
        sex: ''
      }
    },
    methods:{
      //提交最终服务
      submitService(){
        findVoice(this.orderMainId).then(data =>{
          if(data.data.code == '200'){
            submitService(this.orderMainId, this.patientInfo, this.medicationUse).then(data =>{
              if(data.data.code == '200'){
                this.$router.push('/doctor/list')
                this.selectnav('completeList')
              }else {
                this.$yjToast(data.data.msg)
              }
            })
          }else {
            this.$yjToast(data.data.msg)
          }
        })
      },
      // 提交文字
      submitText(){
        let {
          patientInfo,
          medicationUse
        } = this;
        if (!patientInfo || !medicationUse) {
          this.$yjToast('请输入用户情况或建议！');
          return;
        }
        submitText(this.orderMainId, this.patientInfo, this.medicationUse).then(data =>{
          this.$yjToast(data.data.message)
        })
      },
      selectnav(archor){
        localStorage.setItem('id',archor)
      },
      callback(){
        callPhone(this.orderDetail.orderNumber).then(data =>{
          console.log(data)
          if(data.data.code == 'OK'){
            this.callBack = true;
          }
        })
      },
      previewImgHandler (img) {
        this.previewImg = img;
        this.previewShow = true;
      }
    },
    mounted (){
      document.title = '订单详情'
      this.orderMainId = this.$route.params.id;
      doctorDetail(this.orderMainId).then( res =>{
        const data = res.data
        if(data.code == '200'){
          this.recordList = data.recordList
          
          this.orderDetail = data.orderMain
          console.log(this.orderDetail.customerServiceOrderStatus);
          console.log(this.orderDetail.bespeakConfig.telephoneDoctor);
          let temp = this.orderDetail.bespeakConfig.telephoneDoctor
          this.doctorsAdvice = temp.doctorsAdvice
          this.patientInfo = temp.doctorsAdvice
          this.suggestMedications = temp.suggestMedications
          this.medicationUse = temp.suggestMedications
          this.sex = temp.sex

          phoneFindFile(this.orderDetail.orderNumber).then(data => {
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

  .achieve_btn {
    background: #fff;
    border-top: 1px solid #e1e1e1;
    width: 100%;
    font-size: 0.426667rem;
    text-align: center;
    color: @text-dct-orange;
    height: 1.306667rem;
    line-height: 1.306667rem;
    img {
      vertical-align: middle;
      width: 30px;
      height: 30px;
      margin-right: 15px;
      margin-top: -8px;
    }
  }
  // .records{
  //   border-top: 1px solid #E1E1E1;
  //   clear: both;
  //   margin-top: 20px;
  //   padding-top: 20px;
  // }
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

</style>
