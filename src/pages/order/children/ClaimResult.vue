<template>
	<div class="claim-result-container">
    <div class="claim-result-header">
      <div class="claim-result-back" @click="backChoose">返回</div>
      <div class="claim-result-title">订单详情</div>
    </div>
		<div class="card upload-card">
			<p class="upload-tip">用户已确认出院，《结算费用明细》</p>
      <img  class="result-img" :src="imageItem.enclosureUrl" v-for="imageItem in imageData['0315']" v-if="imageData['0315'].length!=0"/>
      <img  class="result-img" :src="imageItem.enclosureUrl" v-for="imageItem in imageData['0316']" v-if="imageData['0316'].length!=0"/>
      <img  class="result-img" :src="imageItem.enclosureUrl" v-for="imageItem in imageData['0317']" v-if="imageData['0317'].length!=0"/>
      <img  class="result-img" :src="imageItem.enclosureUrl" v-for="imageItem in imageData['0318']" v-if="imageData['0318'].length!=0"/>
      <img  class="result-img" :src="imageItem.enclosureUrl" v-for="imageItem in imageData['0319']" v-if="imageData['0319'].length!=0"/>
      <img  class="result-img" :src="imageItem.enclosureUrl" v-for="imageItem in imageData['0320']" v-if="imageData['0320'].length!=0"/>
		</div>
		<div class="card card-with-padding">
			<div class="card-title">理赔结果</div>
			<div class="order-detail-list">
				<div class="order-detail-item">
					<div class="order-detail-label">患者：</div>
					<div class="order-detail-value">{{userName}}</div>
				</div>
				<div class="order-detail-item">
					<div class="order-detail-label">保险公司：</div>
					<div class="order-detail-value">{{insurance_name}}</div>
				</div>
				<div class="order-detail-item">
					<div class="order-detail-label">保险产品：</div>
					<div class="order-detail-value">{{product}}</div>
				</div>
				<div class="order-detail-item">
					<div class="order-detail-label">保单号：</div>
					<div class="order-detail-value">{{poliy_number}}</div>
				</div>
				<div class="order-detail-item">
					<div class="order-detail-label">赔付金额：</div>
					<div class="order-detail-value">{{reimbursementAmount}}</div>
				</div>
        <div class="order-detail-item">
          <div class="order-detail-label">免赔额：</div>
          <div class="order-detail-value">{{deductibles}}</div>
        </div>
        <div class="order-detail-item">
          <div class="order-detail-label">自付金额：</div>
          <div class="order-detail-value">{{vainAmount}}</div>
        </div>
        <div class="order-detail-item">
          <div class="order-detail-label">合计：</div>
          <div class="order-detail-value">{{total}}</div>
        </div>
        <div class="order-detail-item">
          <div class="order-detail-label">应收款项：</div>
          <div class="order-detail-value">{{receivablePayableAmount}}</div>
        </div>
			</div>
		</div>
    <div class="bottom-bar" ref="submit">
      <div class="button-save" v-if="orderStates<='0019'">￥{{receivablePayableAmount}}</div>
      <div class="button-submit"  @click="getMoneyHandler">去收款</div>
    </div>
    <YjModal
      title="选择收款方式"
      confirmBtn="已转账汇款，我要上传凭证"
      :modalShow="getMoneyShow"
      @on-close="getMoneyShow = false"
      @on-confirm="getMoneyConfirm"
    >
      <div slot="content">
        <div class="order-detail-item">
          <div class="order-detail-label">收款金额：</div>
          <div class="order-amount">{{receivablePayableAmount}}</div>
        </div>
        <div class="order-detail-item">
          <div class="order-detail-label">收款方式：</div>
          <div class="order-amount-way">
            <input type="radio" checked/>汇款支付
          </div>
        </div>
        <div class="order-amount-content">
          <p>需汇款1,000.00至以下账户，汇款成功后上传凭证信息，审核通过后到账</p>
          <div class="order-detail-item">
            <div class="order-detail-label">户名：</div>
            <div class="order-detail-value">{{collectMoneyAccount}}</div>
          </div>
          <div class="order-detail-item">
            <div class="order-detail-label">开户行：</div>
            <div class="order-detail-value">{{collectMoneyBank}}</div>
          </div>
          <div class="order-detail-item">
            <div class="order-detail-label">账号：</div>
            <div class="order-detail-value">{{collectMoneyNumber}}</div>
          </div>
        </div>
      </div>
    </YjModal>
    <YjModal
      title="线下汇款凭证"
      confirmBtn="确认提交"
      :modalShow="underLineCertifyShow"
      @on-close="underLineCertifyShow = false"
      @on-confirm="underLineCertifyConfirm"
    >
      <div slot="content">
        <div class="collect-money-info">
          <div class="order-detail-item">
            <div class="order-detail-label">收款方信息</div>
          </div>
          <div class="order-detail-item">
            <div class="order-detail-label">户名：</div>
            <div class="order-detail-value">{{collectMoneyAccount}}</div>
          </div>
          <div class="order-detail-item">
            <div class="order-detail-label">开户行：</div>
            <div class="order-detail-value">{{collectMoneyBank}}</div>
          </div>
          <div class="order-detail-item">
            <div class="order-detail-label">账户：</div>
            <div class="order-detail-value">{{collectMoneyNumber}}</div>
          </div>
        </div>
        <div class="payment-info">
          <div class="order-detail-item">
            <div class="order-detail-label">付款方信息</div>
          </div>
          <div class="order-detail-item">
            <div class="order-detail-label"><span class="red">* </span>付款户名：</div>
            <div class="order-detail-value"><input type="text" placeholder="请输入付款户名" v-model="paymentAccount"/></div>
          </div>
          <div class="order-detail-item">
            <div class="order-detail-label"><span class="red">* </span>账号：</div>
            <div class="order-detail-value"><input type="text" placeholder="请输入付款账号" v-model="paymentNumber"/></div>
          </div>
          <div class="order-detail-item">
            <div class="order-detail-label"> &nbsp;&nbsp;&nbsp;金额：</div>
            <div class="order-detail-value">{{receivablePayableAmount}}</div>
          </div>
          <div class="order-detail-item">
            <div class="order-detail-label"><span class="red">* </span>付款时间：</div>
            <div class="block">
              <el-date-picker
                v-model="timeValue"
                type="datetime"
                placeholder="选择日期时间">
              </el-date-picker>
            </div>
          </div>
        </div>
      </div>
    </YjModal>
    <YjModal
      title="线下汇款凭证"
      confirmBtn="我知道了"
      :modalShow="sendCertifyShow"
      @on-close="sendCertifyShow = false"
      @on-confirm="sendCertifyConfirm"
    >
      <div slot="content">
        <p class="send-certify">凭证已提交，优加健康将在3个工作日内完成审核。</p>
      </div>
    </YjModal>
	</div>
</template>

<script>
  //01就是线下支付  02是微信  03是支付宝
  import {
    reviewOrderCosts,
    savePic,
    getOrderDetail,
    underLineMoney,
    changeOrderState
  } from '@/api';
  import {
    getLocalStorage,
    setLocalStorage
  } from '@/assets/scripts/utils';
  import YjModal from "../../../components/common/yjModal/yjModal";

	export default {
    components: {YjModal},
    data () {
			return {
        orderStates: '',
        userName: '',
        reimbursementAmount: '',
        deductibles: '',
        vainAmount: '',
        total: '',
        receivablePayableAmount: '',
        insurance_name: '',
        product: '',
        poliy_number: '',
        imageData: {},
        getMoneyShow: false,
        underLineCertifyShow: false,
        sendCertifyShow: false,
        collectMoneyAccount: '优加健保健康科技（北京）有限公司',
        collectMoneyBank: '招商银行股份有限公司北京分行营业部',
        collectMoneyNumber: '110928713410802',
        paymentAccount:'',
        paymentNumber:'',
        timeValue:''
			}
		},
    methods: {
      jumpLink(url) {
        this.$router.push(url);
      },
      backChoose() {
        this.$router.push('/order/detail')
      },
      getMoneyHandler(){

        this.getMoneyShow = true;
      },
      getMoneyConfirm(){
        this.getMoneyShow = false;
        this.underLineCertifyShow = true;
      },
      underLineCertifyConfirm(){
        this.underLineCertifyShow = false;
        const orderId = JSON.parse(getLocalStorage('orderId'))
        underLineMoney(orderId, this.collectMoneyAccount, this.collectMoneyBank, this.collectMoneyNumber, this.paymentAccount,
          this.paymentNumber, this.receivablePayableAmount, this.timeValue, '01').then(data =>{
          console.log(data)
          if(data.data.code == '200'){
            this.sendCertifyShow = true;
          }else {
            this.$yjToast(data.data.msg)
          }
        })
      },
      sendCertifyConfirm(){
        const orderId = JSON.parse(getLocalStorage('orderId'))
        this.orderStates = '0020'
        changeOrderState(orderId,this.orderStates).then(() =>{
          this.sendCertifyShow = false;
          this.$refs.submit.querySelector('.button-submit').innerHTML = '银行转账凭证已提交，财务审核中'
          this.$refs.submit.querySelector('.button-submit').style.background = '#999'
          this.$refs.submit.querySelector('.button-submit').style.pointerEvents = 'none'
        })
      }
    },
    mounted: function(){
      const orderId = JSON.parse(getLocalStorage('orderId'))
      //获取订单详情
      getOrderDetail(orderId).then(data => {
        var result = data.data.data;
        if (result != null){
          this.$data.orderStates = result.orderStates;
          var state = this.$data.orderStates;
          if (state == '0020') {
            this.$refs.submit.querySelector('.button-submit').innerHTML = '银行转账凭证已提交，财务审核中'
            this.$refs.submit.querySelector('.button-submit').style.background = '#999'
            this.$refs.submit.querySelector('.button-submit').style.pointerEvents = 'none'
          }else if(state == '0021'){
            this.$refs.submit.querySelector('.button-submit').style.display = 'none'
          }
        }
      })
      //查看费用结算明细
      reviewOrderCosts(orderId).then(data => {
        console.log(data);
        var result = data.data;
        this.userName = result.userName;
        this.reimbursementAmount = result.reimbursementAmount;
        this.deductibles = result.deductibles;
        this.vainAmount = result.vainAmount;
        this.total = result.total;
        this.receivablePayableAmount = result.receivablePayableAmount;
        this.insurance_name = result.insurance_name;
        this.product = result.product;
        this.poliy_number = result.poliy_number;
      })
      /*if(this.receivablePayableAmount == '0'){
        this.$data.orderStates = '0021'
        this.$refs.submit.querySelector('.button-submit').style.display = 'none'
      }*/
      //图片回显
      savePic(orderId).then(data =>{
        this.imageData = data.data.data;
      })

    }
	}
</script>

<style scoped lang="less">
	@import '../../../assets/styles/base.less';

  .claim-result-container {
    width: 100%;
    height: 100vh;
    overflow-y: auto;
    padding-top: 1.333rem;
    position: fixed;
    left: 0;
    top: 0;
    background: #F8F8F8;
    z-index: 15;
  }

  .claim-result-header {
    width: 100%;
    height: 1.333rem;
    background: #E49A2D;
    position: fixed;
    top: 0;
    left: 0;
    color: @text-color-white;
  }

  .claim-result-back {
    width: 1.333rem;
    height: 1.333rem;
    line-height: 1.333rem;
    text-align: center;
    font-size: 0.3733rem;
    position: relative;
    z-index: 10;
  }

  .claim-result-title {
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

	.result-img {
		width: 100%;
    height: 6rem;
		margin-top: 0.4rem;
	}

	.order-detail-item {
		display: flex;
		padding-top: 0.4rem;
	}

	.order-detail-label {
		width: calc(~"100% - 5.333rem");
		color: #999999;
	}

	.order-detail-value {
		width: 9rem;
		text-align: right;
		color: #333333;
		margin-left: auto;
	}

	.pay-info {
		text-align: right;
		color: #E49A2D;
		padding: 0.4rem 0;
		border-top: 1px solid @border-default;
		margin-top: 0.4rem;
		font-size: 0.4266rem;
	}

  .card-with-padding{
    margin-bottom: 1.3rem;
    padding-bottom: 0.5rem;
  }

  .button-save {
    width: 10rem;
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

  .order-amount{
    color: red;
  }

  .order-amount-way input{
    width:0.4rem;
    height:0.4rem;
  }

  .order-amount-content{
    border: 1px solid #ccc;
    border-radius: 0.2rem;
    padding: 0.2rem;
    margin-top: 0.4rem;
  }

  .collect-money-info{
    border-bottom: 1px solid #eee;
    padding-bottom: 0.4rem;
  }
  .payment-info .red{
    color: red;
    font-weight: bold;
  }

  .payment-info input{
    width: 96%;
    height: 0.7rem;
    padding-left: 0.1rem;
    border: 1px solid #ccc;
  }
  .send-certify{
    margin-top:0.4rem;
    margin-bottom: 1rem;
    color: #666;
  }
</style>
