<template>
	<div class="upload-container container-with-bar" ref="uploadContain">
    <div class="upload-header">
      <div class="upload-back" @click="backChoose">返回</div>
      <div class="upload-title">提交押金垫付签署文件</div>
    </div>
    <Uploads data-types="0301" class="necessary" :list="imageData['0301']" upload-title="上传用户《门诊病历影像件》" @imgList="imgData"></Uploads>
    <Uploads data-types="0302" class="necessary" :list="imageData['0302']" upload-title="上传用户已经签署的《医疗垫付协议书》" @imgList="imgData"></Uploads>
    <Uploads data-types="0303" class="necessary" :list="imageData['0303']" upload-title="上传用户已经签署的《理赔授权协议书》" @imgList="imgData"></Uploads>
    <Uploads data-types="0304" class="necessary" :list="imageData['0304']" upload-title="上传用户已经签署的《理赔申请书》" @imgList="imgData"></Uploads>
    <Uploads data-types="0305" class="necessary" :list="imageData['0305']" upload-title="上传用户身份证正面照片" @imgList="imgData"></Uploads>
    <Uploads data-types="0306" class="necessary" :list="imageData['0306']" upload-title="上传用户身份证反面照片" @imgList="imgData"></Uploads>
    <Uploads data-types="0307" class="necessary" :list="imageData['0307']" upload-title="上传用户保单复印件" @imgList="imgData"></Uploads>
    <Uploads data-types="0308" class="necessary" :list="imageData['0308']" upload-title="上传用户银行卡正面照片" @imgList="imgData"></Uploads>

    <!--补充资料-->
    <div class="card upload-card">
      <div v-if="show1"><Uploads data-types="0309" :list="imageData['0309']" upload-title="上传用户《社保卡》或《新农合》" @imgList="imgData"></Uploads></div>
      <div class="card-item" @click="show1=true" v-show="!show1">
        <div class="card-item-label">上传用户《社保卡》或《新农合》</div>
        <img src="../../../assets/images/icon_plus@2x.png" class="add-deposit-img">
      </div>
      <div v-if="show2"><Uploads data-types="0310" :list="imageData['0310']" upload-title="上传用户《入院通知书》" @imgList="imgData"></Uploads></div>
      <div class="card-item" @click="show2=true" v-show="!show2">
        <div class="card-item-label">上传用户《入院通知书》</div>
        <img src="../../../assets/images/icon_plus@2x.png" class="add-deposit-img">
      </div>
    </div>
    <!--<div class="card upload-card">
      <div v-if="show1">
        <p class="upload-tip">上传用户《社保卡》或《新农合》</p>
        <div class="img-list">
          <Uploads  data-types="0309" :list="imageData['0309']"></Uploads>
        </div>
      </div>
      <div class="card-item" @click="show1=true" v-show="!show1">
        <div class="card-item-label">上传用户《社保卡》或《新农合》</div>
        <img src="../../../assets/images/icon_plus@2x.png" class="add-deposit-img">
      </div>
    </div>-->
		<div class="bottom-bar" ref="submit">
			<!--<div class="button-save" @click="orderStateChange">保存</div>-->
      <div class="button-submit" @click="orderStateChange" v-if="orderStates < '0014'">提交审核</div>
      <div class="button-submit" @click="saveImg" v-else>补充资料</div>
		</div>
	</div>
</template>

<script>
  import {
    getLocalStorage,
    setLocalStorage,
    //API_URL
  } from '@/assets/scripts/utils';
  import {
    changeOrderState,
    savePic
  } from '@/api';

	export default {
		data () {
			return {
        //src: API_URL+'/medicalservice/push',
        orderId: '',
        orderStates: '',
        addMoreShow: false,
        imageData:{},
        show1:false,
        show2:false
			}
		},
    methods: {
		  backChoose() {
        this.$router.push('/order/detail')
      },
      orderStateChange: function () {
        var that = this
        var flag = false;
        var list = this.$refs.uploadContain.querySelectorAll('.necessary');
        const orderId = JSON.parse(getLocalStorage('orderId'));
        for (var i = 0; i < list.length; i++) {
          var d = list[i].querySelectorAll(".file-img")
          if(d.length<1){
            //orderStates = '0014'
            flag = true;
            that.$yjToast('图片上传不全！')
            //break;
            //that.$router.push('/order/detail')
          }
        }

        if(!flag){
          this.orderStates = '0014'
          changeOrderState(orderId, this.orderStates).then(data => {
            this.$router.push('/order/detail');
          })
        }else{
          this.orderStates = this.$route.query.orderStatus
        }
      },
      saveImg(){
        var list = this.$refs.uploadContain.querySelectorAll('.vue-upload');
        for (var i = 0; i < list.length-1; i++) {
          var d = list[i].querySelectorAll(".file-img")
          if(d.length<1){
            this.$yjToast('图片上传不全！')
          }
        }
        this.$router.push('/order/detail')
      },
      imgData(img){
        this.imageData = img
      }
    },
    mounted () {
      const orderId = JSON.parse(getLocalStorage('orderId'));
      this.orderStates = this.$route.query.orderStatus
      //alert(this.$route.query.orderStatus)
      /*if(this.$route.query.orderStatus >= '0014'){
        this.$refs.submit.style.display = 'none'
      }else{
        this.$refs.submit.style.display = 'block'
      }*/
      savePic(orderId).then(data =>{
        this.imageData = data.data.data
      })
      this.imgData()
    }
	}
</script>

<style scoped lang="less">
	@import '../../../assets/styles/base.less';

  .vue-image-crop-upload .vicp-wrap{
    width: 100%;
  }
  .upload-container {
    width: 100%;
    height: 100vh;
    overflow-y: auto;
    overflow-x: hidden;
    padding-top: 1.333rem;
    position: fixed;
    left: 0;
    top: 0;
    background: #F8F8F8;
    z-index: 15;
  }

  .upload-header {
    width: 100%;
    height: 1.333rem;
    background: #E49A2D;
    position: fixed;
    z-index: 99;
    top: 0;
    left: 0;
    color: @text-color-white;
  }

  .upload-back {
    width: 1.333rem;
    height: 1.333rem;
    line-height: 1.333rem;
    text-align: center;
    font-size: 0.3733rem;
    position: relative;
    z-index: 10;
  }

  .upload-title {
    width: 100%;
    height: 1.333rem;
    line-height: 1.333rem;
    text-align: center;
    position: absolute;
    left: 0;
    top: 0;
    font-size: 0.4rem;
  }
	.upload-tip {
		font-size: 0.3733rem;
		color: #333333;
	}

	.upload-card {
		padding: 0.4rem 0.32rem;
	}

	.img-list {
		display: flex;
		flex-wrap: wrap;
		margin-top: 0.4rem;
	}
  .img-save[src] {
    width:80px;
    height: 80px;
    margin-right:10px;
    margin: 10px 0;
  }

	.img-item {
		margin-right: 0.4rem;
	}

	/*.img-item-wrapper {
		margin-right: 0.4rem;
	}*/

	.upload-trigger {
		width: 2.3466rem;
		height: 2.3466rem;
		display: flex;
		align-items: center;
		justify-content: center;
		border: 1px solid #EBECF1;
		display: flex;

		img {
			width: 0.7466rem;
		}
	}

  .add-deposit-img {
    width: 0.4rem;
    height: 0.4rem;
    margin-left: auto;
  }

	.button-save {
		width: 3.866rem;
		height: 1.3333rem;
		line-height: 1.33rem;
		text-align: center;
		background: @bg-white;
		color: #E49A2D;
	}

	.button-verify {
		width: 100%;
		height: 1.3333rem;
		line-height: 1.33rem;
		text-align: center;
		background: @bg-orange;
		color: @text-color-white;
	}

  .button-submit {
    width: 100%;
    height: 1.3333rem;
    line-height: 1.333rem;
    background: @bg-orange;
    color: @text-color-white;
    text-align: center;
  }

	.sfz-tip {
		text-align: center;
		font-size: 0.32rem;
    line-height: 2rem;
		color: #9D9D9D;
		margin-top: 0.2133rem;
	}
  .w100{
    padding: 0 10px;
  }
</style>
