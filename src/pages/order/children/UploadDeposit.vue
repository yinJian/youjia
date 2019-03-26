<template>
	<div class="upload-container container-with-bar" ref="uploadContain">
    <div class="upload-header">
      <div class="upload-back" @click="backChoose">返回</div>
      <div class="upload-title">上传住院押金条</div>
    </div>
    <Uploads data-types="0311" class="necessary" :list="imageData['0311']" upload-title="上传《住院押金单》或《缴费凭证》" @imgList="imgData"></Uploads>
    <Uploads data-types="0312" class="necessary" :list="imageData['0312']" upload-title="上传《入院垫付确认书》" @imgList="imgData"></Uploads>
    <Uploads data-types="0313" class="necessary" :list="imageData['0313']" upload-title="上传《收款凭证截图》" @imgList="imgData"></Uploads>

    <!--补充资料-->
    <div class="card upload-card">
      <div v-if="addMoreShow"><Uploads data-types="0314" :list="imageData['0314']" upload-title="上传用户《社保卡》或《新农合》" @imgList="imgData"></Uploads></div>
      <div class="card-item" @click="addMoreShow=true" v-show="!addMoreShow">
        <div class="card-item-label">上传用户《社保卡》或《新农合》</div>
        <img src="../../../assets/images/icon_plus@2x.png" class="add-deposit-img">
      </div>
    </div>
		<!--<div class="card upload-card">
			<p class="upload-tip">上传《住院押金单》或《缴费凭证》</p>
			<div class="img-list">
        <Uploader :src="src"  data-types="0311" :list="imageData['0311']"></Uploader>
			</div>
		</div>-->
		<div class="bottom-bar" ref="submit">
      <div class="button-submit" @click="orderStateChange" v-if="orderStates < '0016'">提交审核</div>
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
  import {changeOrderState,savePic} from '@/api';

	export default {
		data () {
			return {
        //src: API_URL+'/medicalservice/push',
        imageData: {},
			  orderId: '',
				addMoreShow: false,
        orderStates: ''
			}
		},
    methods: {
      jumpLink(url) {
        this.$router.push(url);
      },
      backChoose() {
        this.$router.push('/order/detail')
      },
      orderStateChange: function () {
        var that = this
        var flag = false;
        var list = this.$refs.uploadContain.querySelectorAll('.necessary');
        const orderId = JSON.parse(getLocalStorage('orderId'));
        for (var i = 0; i < list.length; i++) {
          var d = list[i].querySelectorAll(".file-item")
          if(d.length<1){
            //orderStates = '0014'
            flag = true;
            that.$yjToast('图片上传不全！')
            //break;
            //that.$router.push('/order/detail')
          }
        }

        if(!flag){
          this.orderStates = '0016'
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
      /*if(this.$route.query.orderStatus >= '0016'){
        this.$refs.submit.style.display = 'none'
      }else{
        this.$refs.submit.style.display = 'block'
      }*/
      savePic(orderId).then(data =>{
        this.imageData = data.data.data;
      })
      this.imgData()
    }
	}
</script>

<style scoped lang="less">
	@import '../../../assets/styles/base.less';

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
    margin-right: 10px;
    margin-bottom: 10px;
  }

	.img-item {
		margin-right: 0.4rem;
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
		width: 6.1333rem;
		height: 1.3333rem;
		line-height: 1.33rem;
		text-align: center;
		background: @bg-orange;
		color: @text-color-white;
	}

	.add-deposit-img {
		width: 0.4rem;
		height: 0.4rem;
		margin-left: auto;
	}

	.button-submit {
		width: 100%;
		height: 1.3333rem;
		line-height: 1.333rem;
		background: @bg-orange;
		color: @text-color-white;
		text-align: center;
	}
  .w100{
    /*width: 100%;*/
    padding: 0 10px;
  }
</style>
