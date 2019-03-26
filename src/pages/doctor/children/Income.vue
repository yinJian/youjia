<template>
  <div class="income">
    <div class="header">
      <h2>{{incomeDetail.tatalIncome}}</h2>
      <p>当前收入</p>
    </div>
    <div class="content">
      <ul>
        <li v-for="items in incomeDetail.data">
          <p class="month-total pl40">{{items.date}}<span>收入 {{items.money}} 元</span></p>
            <div class="card" v-for="item in items.list">
              <div class="card-item">
                <div class="card-item-label">
                  <div class="card-dct-title">快速问诊</div>
                  <p>{{ item.orderDate | dateFilter }}</p>
                </div>
                <div class="card-item-value">+20.00</div>
              </div>
            </div>
        </li>
      </ul>
      <div class="card" v-if="incomeDetail.data.length ==0">
        <div class="no-income">暂无收入</div>
      </div>
    </div>
  </div>
</template>

<script>
  import { doctorIncome } from  '@/api'
  var moment = require('moment');
  export default {
    data(){
      return {
        incomeDetail: {
          data: []
        },
      }
    },
    filters: {
      dateFilter (value) {
        return moment(value).format('YYYY-MM-DD HH:mm:ss')
      },
      dayFilter (value) {
        return moment(value).format('YYYY-MM-DD')
      }
    },
     mounted (){
       document.title = '我的收入'
       doctorIncome().then(data =>{
         if(data.data.code == '200'){
           console.log(data.data)
           this.incomeDetail = data.data
         }
       })
     }
  }
</script>

<style lang="less" scoped>
  @import '../../../assets/styles/doctor-base.less';

  .header{
    width: 100%;
    height: 340px;
    background-image: url("../../../assets/images/header-bg.png");
    background-size: 100% 340px;
    text-align: center;
    color: #ffffff;
    padding-top: 130px;

    p{
      font-size: 24px;
      color: #FFFFFF;
    }

    h2{
      font-size: 70px;
      color: #FFFFFF;
      font-weight: bold;
      margin: 0;
    }
  }

  .content{
    width: 100%;
    height:13rem;
    margin: 0 auto;

    ul li span{
      margin: 16px;
    }

  }

  .month-total{
    font-size: 24px;
    color: #999999;
    line-height: 60px;
    height: 60px;
  }
  .card{
    margin-top: 0;
    border: 0;
    height: 160px;
  }
  .card-item{
    height: 160px;
    padding: 30px 40px;
  }
  .card-item-label{
    width: 15rem;
    font-size: 0.26rem;
    p{
      font-size: 28px;
      color: #999999;
      margin-top: 20px;
    }
  }
  .card-item-value{
    font-size: 36px;
    color: #F39700;
    font-weight: bold;
  }
  .no-income{
    padding: 1rem;
    text-align: center;
    font-size:0.46rem;
    background: #fff;
  }
</style>
