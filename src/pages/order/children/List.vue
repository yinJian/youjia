<template>
  <div class="order-list-container">
    <div class="order-list-header">
      <div class="order-list-title">订单列表</div>
      <div class="order-tabs">
        <div class="order-tab" :class="tab.selected ? 'order-tab-active' : ''" v-for="(tab, index) in orderTab" :key="tab.name" @click="orderTabHandler(index)">
          <span>{{ tab.name }}</span>
        </div>
      </div>
    </div>
    <div class="card" v-for="(order,index) in tabList">
      <div class="order-number">
        订单编号：{{order.orderNumber}}
        <span v-show="order.orderStates=='0019'" class="wait-cash">等待收款</span>
        <span v-show="order.orderStates=='0020'" class="wait-cash">财务审核中</span>
      </div>
      <div class="order-info">
        <div class="order-info-list">
          <div class="order-info-item">
            <div class="order-info-label">申请人</div>
            <div class="order-info-value">{{order.name}}</div>
          </div>
          <div class="order-info-item">
            <div class="order-info-label">住院医院</div>
            <div class="order-info-value">{{order.hospitalName}}</div>
          </div>
         <!-- <div class="order-info-item">
            <div class="order-info-label">住院时间</div>
            <div class="order-info-value">2018-09-10</div>
          </div>-->
        </div>
      </div>
      <div class="order-opts" v-if="order.orderStates != '0012'">
        <div class="order-result-list">
          <div class="order-result" v-if="orderState1.indexOf(order.orderStates)!=-1">
            <img :src="orderImg.choose" class="order-result-img"/>
            <span class="order-result-success">已确认</span>
          </div>
          <div class="order-result order-result-failed" v-else>
            <img :src="orderImg.unchoose" class="order-result-img"/>
            <span>已确认</span>
          </div>

          <div class="order-result" v-if="orderState2.indexOf(order.orderStates)!=-1" >
            <img :src="orderImg.choose" class="order-result-img" />
            <span class="order-result-success">已垫付</span>
          </div>
          <div class="order-result order-result-failed" v-else>
            <img :src="orderImg.unchoose" class="order-result-img" />
            <span class="">已垫付</span>
          </div>

          <div class="order-result" v-if="orderState3.indexOf(order.orderStates)!=-1" >
            <img :src="orderImg.choose" class="order-result-img" />
            <span class="order-result-success">已结算</span>
          </div>
          <div class="order-result order-result-failed" v-else>
            <img :src="orderImg.unchoose" class="order-result-img" />
            <span>已结算</span>
          </div>

          <div class="order-result" v-if="orderState4.indexOf(order.orderStates)!=-1" >
            <img :src="orderImg.choose" class="order-result-img" />
            <span class="order-result-success">已收款</span>
          </div>
          <div class="order-result order-result-failed" v-else>
            <img :src="orderImg.unchoose" class="order-result-img" />
            <span>已收款</span>
          </div>
        </div>
      <!--<div class="order-detail-link" @click="deleteOrder(order.orderNumber)" v-if="order.orderStates >= '0017'">删除</div>-->
      </div>
      <div class="order-more" v-if="order.orderStates != '0012'">
        <div class="order-detail-link" @click="reviewOrderDetail(order.orderNumber)">查看详情</div>
      </div>
      <div class="order-more" v-if="order.orderStates == '0012'">
        <div class="order-detail-link order-detail-link-default">订单已取消</div>
      </div>

  </div>
  </div>
</template>

<script>
  import {
    getOrders,
    getOrderDetail,
    initJssdk
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
            name: '进行中',
            selected: true
          },
          {
            name: '已完成',
            selected: false
          }
        ],
        orderList:[],
        orderState1:['0007','0008','0010','0014','0015','0016','0017','0018','0019','0020','0021'],
        orderState2:['0017','0018','0019','0020','0021'],
        orderState3:['0019','0020','0021'],
        orderState4:['0021'],
        tabList:[],
        orderImg: {
          choose: require("../../../assets/images/icon_choose@2x.png"),
          unchoose: require("../../../assets/images/icon_unchoose@2x.png")
        }
      }
    },
    mounted: function(){
      const phone = JSON.parse(getLocalStorage('phone'));
      getOrders(phone).then(data => {
        if (data.data.success == 'OK') {
          var result = data.data.data;
          this.orderList = result;
          console.log(result)
          this.getTabList(0)
        }
      })
    },
    methods: {
      orderTabHandler (index) {
        this.orderTab.forEach(item => {
          item.selected = false;
        });
        this.orderTab[index].selected = true;
        this.getTabList(index)
      },
      getTabList (index) {
        var list = this.$data.orderList;
        var tabList = [];

        if(index==0){
          list.forEach(object => {
            if(object.orderStates != '0021'){
              tabList.push(object);
            }
          })
        }
        if(index==1){
          list.forEach(object => {
            if(object.orderStates == '0021'){
              tabList.push(object);
            }
          })
        }
        this.$data.tabList = tabList;
      },
      reviewOrderDetail (orderNumber) {
        getOrderDetail(orderNumber).then(data =>{
          if (data.data.success == 'OK') {
            setLocalStorage('orderId',orderNumber);
            this.$router.push('/order/detail');
          } else {
            this.$yjToast(data.data.message);
          }
        })
      }
    }
  }
</script>

<style lang="less" scoped>
  @import '../../../assets/styles/base.less';

  .order-list-container {
    width: 100%;
    height: 100vh;
    overflow-y: auto;
    padding-top: 2.533rem;
    position: fixed;
    left: 0;
    top: 0;
    background: @bg-default;
    z-index: 15;
  }

  .order-list-header {
    width: 100%;
    height: 1.333rem;
    background: #E49A2D;
    position: fixed;
    top: 0;
    left: 0;
    color: @text-color-white;
  }

  .order-list-title {
    width: 100%;
    height: 1.333rem;
    line-height: 1.333rem;
    text-align: center;
    position: relative;
    left: 0;
    top: 0;
    font-size: 0.5rem;
  }

  .order-tabs {
    width: 100%;
    height: 1.2rem;
    line-height: 1.12rem;
    display: flex;
    align-items: center;
    background: #E49A2D;
    font-size: 0.4266rem;
    color: @text-color-white;
  }

  .order-tab {
    width: 50%;
    text-align: center;
    color:#f1cc96;

    span {
      display: inline-block;
      border-bottom: 0.08rem solid #E49A2D;
    }
  }

  .order-tab-active {
    color:#fff;
    span {
      border-bottom: 0.08rem solid @bg-white;
    }
  }

  .order-number {
    padding: 0.4rem 0.32rem;
    border-bottom: 1px solid #EBECF1;
    color: #999999;
  }

  .order-info {
    padding: 0.4rem 0.32rem;
  }

  .order-info-item {
    display: flex;
    align-items: center;
    margin-top: 0.3733rem;

    &:first-child {
      margin-top: 0;
    }
  }

  .order-info-label {
    width: 1.6rem;
    color: #999999;
  }

  .order-info-value {
    width: calc(~"100% - 1.6rem");
    text-align: right;
    color: #333333;
  }

  .order-opts {
    width: 100%;
    height: 1.3333rem;
    padding: 0 0.32rem;
    display: flex;
    align-items: center;
    border-top: 1px solid @border-default;
  }

  .order-result-list {
    display: flex;
    align-items: center;
  }

  .order-result {
    display: flex;
    align-items: center;
    font-size: 0.32rem;
    color: #999999;
    margin-right: 0.5333rem;
  }

  .order-result-failed {
    color: #e2e2e2;
  }

  .order-result-success {
    color: #E49A2D;
  }

  .order-result-img {
    width: 0.32rem;
    height: 0.32rem;
    margin-right: 0.1333rem;
  }
  .order-more {
    width: 100%;
    height: 1.3333rem;
    padding: 0 0.32rem;
    border-top: 1px solid @border-default;
  }
  .order-detail-link {
    //width: 2.16rem;
    padding:0 0.2rem;
    height: 0.8rem;
    line-height: 0.8rem;
    border: 1px solid #E49A2D;
    color: #E49A2D;
    border-radius: 0.3rem;
    text-align: center;
    margin-left: 0.5rem;
    margin-top:0.25rem;
    float: right;
  }
  .order-detail-link-default {
    color: #333;
    border-color: #999999;
  }
  .wait-cash{
    color: red;
    float: right;
  }
</style>
