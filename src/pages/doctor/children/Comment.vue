<template>
    <div class="comment">
      <div class="comment-card" v-for="item in comments">
        <div class="comment-info">
          <span class="fll">{{item.user.userName}}</span>
          <span class="fll">问诊</span>
          <div class="score-stars fll">
            <img class="score-img" :src="simg <= (item.bespeakConfig.telephoneDoctor.evaluation?item.bespeakConfig.telephoneDoctor.evaluation:5) ? starHL : star" v-for="simg in [1,2,3,4,5]">
          </div>
          <div class="flr laber-left">{{item.orderDate | dayFilter}}</div>
        </div>
        <div class="evaluation-content">
          {{item.bespeakConfig.telephoneDoctor.evaluationContent}}
        </div>
      </div>
    </div>
</template>

<script>
  import {doctorComment} from '@/api'
  var moment = require('moment');
    const star = require('../../../assets/images/star.png');
    const starHL = require('../../../assets/images/star-HL.png');
    export default {
        data(){
          return {
            star: star,
            starHL: starHL,
            scorePeople: 4,
            comments: []
          }
        },
      methods: {

      },
      filters: {
        dayFilter (value) {
          return moment(value).format('YYYY-MM-DD')
        }
      },
      mounted(){
        document.title = '用户评价'
        doctorComment().then(data =>{
          console.log(data.data.data)
          if(data.data.code == '200'){
            this.comments = data.data.data
          }
        })
      }
    }
</script>

<style lang="less" scoped>
  @import '../../../assets/styles/doctor-base.less';
  .comment{
    overflow: scroll;
  }
  .comment-card{
    width: 100%;
    background: #ffffff;
    border-top: 1px solid #E1E1E1;
    padding: 40px;
  }
  .comment-info{
    span{
      font-size: 28px;
      color: #999999;
      margin-right: 30px;
    }
  }
  .score-stars {
    margin-top: 4px;
    float: left;
    width: 180px;
    display: flex;
    justify-content: space-between;
    img {
      width: 30px;
      height: 28px;
      margin-right: 10px;
    }
  }
  .evaluation-content{
    padding-top: 26px;
    clear: both;
    font-size: 32px;
    color: #333333;
  }
</style>
