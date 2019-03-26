<template>
  <div class="order-list-container">
    <div class="white-bar">
      <div class="order-tabs">
        <div class="order-tab" :class="{'order-tab-active':index == num}" v-for="(tab, index) in orderTab" :key="tab.name" @click="orderTabHandler(index)">
          <span>{{ tab.name }}</span>
        </div>
      </div>
    </div>
    <div class="order-item" v-for="item in progressOrderList" v-if="num==0" id="progressList">
      <div class="order-info">
        <div class="fll">
          <img src="../../../assets/images/patient-photo.png" alt="患者头像" class="patient-img fll">
          <div class="fll order-in">
            <p class="color3">{{item.userName}}</p>
            <p class="color9">{{ item.orderDateStr }}</p>
          </div>
        </div>
        <div class="flr status">新订单</div>
      </div>
      <p class="order-question">{{item.bespeakConfig.telephoneDoctor.customerConsultationQuestion}}</p>
      <div class="laber-left fll">咨询科室：</div>
      <div class="laber-right fll">{{item.bespeakConfig.telephoneDoctor.medicalSectionName}}</div>
      <router-link :to="'return-consult-detail/'+item.orderMainId" class="view-detail" v-if="item.isReferral == '0001'">查看详情</router-link>
      <router-link :to="'detail/'+item.orderMainId" class="view-detail" v-else>查看详情</router-link>
    </div>

    <div class="order-item" v-for="item in completeOrderList"  v-if="num==1" id="completeList">
      <div class="order-info">
        <div class="fll">
          <img src="../../../assets/images/patient-photo.png" alt="患者头像" class="patient-img fll">
          <div class="fll order-in">
            <p class="color3">{{item.userName}}</p>
            <p class="color9">{{ item.orderDateStr }}</p>
          </div>
        </div>
        <div class="flr status" v-if="item.customerServiceOrderStatus == '0009'">待评价</div>
        <div class="flr color9" v-if="item.customerServiceOrderStatus == '0011'">已评价</div>
        <div class="flr color9 " v-if="item.customerServiceOrderStatus == '0012'">已取消</div>
      </div>
      <p class="order-question">{{item.bespeakConfig.telephoneDoctor.customerConsultationQuestion}}</p>
      <div class="laber-left fll">咨询科室：</div>
      <div class="laber-right fll">{{item.bespeakConfig.telephoneDoctor.medicalSectionName}}</div>
      <router-link :to="'return-consult-detail/'+item.orderMainId" class="view-detail" v-if="item.isReferral == '0001'">查看详情</router-link>
      <router-link :to="'detail/'+item.orderMainId" class="view-detail" v-else>查看详情</router-link>
    </div>
    <div class="nothing-wrap" v-if="progressOrderList.length<=0 && num==0">
      <img src="../../../assets/images/no-order.png" alt="">
      <div class="no-text">暂无进行中订单</div>
    </div>
    <div class="nothing-wrap" v-if="completeOrderList.length<=0 && num==1">
      <img src="../../../assets/images/no-order.png" alt="">
      <div class="no-text">暂无已完成订单</div>
    </div>
  </div>
</template>

<script>
  import {
    initJssdk,
    doctorList
  } from '@/api';
  import {
    getLocalStorage,
    setLocalStorage
  } from '@/assets/scripts/utils';

  export default {
    data () {
      return {
        orderTab: [
          {
            name: '进行中'
          },
          {
            name: '已完成'
          }
        ],
        completeOrderList: [],
        progressOrderList: [],
        num: 0,
        orderList:[],
        tabList:[],
      }
    },
    created(){
      this.$nextTick(() => { this.getlocal() })
    },
    mounted: function(){
      document.title = '订单列表'
      this.getTabList()
      this.$nextTick(function(){
        window.addEventListener('scroll', this.handleScroll)
      })
    },
    methods: {
      orderTabHandler (index) {
        this.num = index
        this.getTabList()
      },
      getTabList(){
        doctorList().then(data => {
          console.log(data.data)
          if(data.data.code == '200'){
            this.progressOrderList = data.data.progressOrderMainList
            this.completeOrderList = data.data.completeOrderMainList
          }else {
            this.$yjToast(data.data.msg);
          }
        })
      },
      getlocal(){
        let select = localStorage.getItem("id");
        let anchorElement = document.getElementById(select)
        if(select){
          anchorElement.scrollIntoView()
        }
      }
    }
  }
</script>

<style lang="less" scoped>
  @import '../../../assets/styles/doctor-base.less';

  .order-list-container {
    background: @bg-dct-grey;
    min-height: 100vh;
    overflow: hidden;
  }

  .order-tabs {
    width: 100%;
    height: 90px;
    line-height: 90px;
    display: flex;
    align-items: center;
    font-size: 32px;
    color: #999999;
    background: @bg-dct-white;
    -moz-box-shadow:0px 2px 5px #e2e2e2;
    -webkit-box-shadow:0px 2px 5px #e2e2e2;
    box-shadow:0px 2px 5px #e2e2e2;
  }

  .order-tab {
    width: 50%;
    text-align: center;
    span {
      padding: 0 20%;
      display: inline-block;
    }
  }

  .order-tab-active {
    color: @bg-dct-orange;
    span{
      border-bottom: 4px solid @bg-dct-orange;
    }
  }

  .order-item{
    padding: 38px;
    background: #ffffff;
    width: 100%;
    overflow: hidden;
    margin-bottom: 20px;
  }
  .order-info{
    font-size: 24px;
    overflow: hidden;
  }
  .order-in{
    margin-left: 20px;
    margin-top: 6px;
  }
  .status{
    color: @text-dct-orange;
  }
  .order-question{
    font-size: 32px;
    color: #333333;
    font-weight: bold;
    margin: 26px 0 12px 0;
    overflow: hidden;
    display:-webkit-box; //将对象作为弹性伸缩盒子模型显示;
    text-overflow:ellipsis;//溢出部分用省略号代替
    -webkit-line-clamp:2; //设置文本显示两行
    -webkit-box-orient:vertical; //从上到下排列子元素;
    white-space:normal;
  }
  .view-detail{
    float: right;
    color: @text-dct-orange;
    border: 2px solid @bg-dct-orange;
    padding: 4px 8px;
    border-radius: 16px;
  }
  .white-bar{
    height: 100px;
    width: 100%;
    background: #ffffff;
    position: relative;
    z-index: 0;
  }
  .nothing-wrap{
    height: calc(100vh - 100px);
    width: 100%;
    background: #ffffff;
    padding: 400px 0;
    text-align: center;
    img{
      width:160px;
      height: 160px;
    }
    .no-text{
      font-size: 32px;
      color: #333333;
      font-weight: bold;
      margin-top: 20px;
    }
  }
</style>
