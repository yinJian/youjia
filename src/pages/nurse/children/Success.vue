<template>
  <div class="nurse-success">
    <div class="nurse-success-con">
      <img src="../../../assets/images/success-iconB.png" width="100" alt="">
      <p class="success-title">提交成功等待审核</p>
      <p class="success-info">客服电话：<span>010-57293649</span></p>
    </div>
  </div>
</template>

<script>
    export default {
        mounted(){
          document.title = "优加健康"
        }
    }
</script>

<style lang="less" scoped>
  @import '../../../assets/styles/base.less';
  .nurse-success{
    height: 100vh;
    background: @bg-white;
    overflow: hidden;
  }
  .nurse-success-con{
    width: 400px;
    height: 400px;
    margin: 200px auto;
    text-align: center;
  }
  .success-title{
    font-size: 36px;
    color: #333333;
    margin-top: 20px;
    line-height: 60px;
  }
  .success-info{
    font-size: 24px;
    color: #333333;
    span{
      color: #F39800;
    }
  }
</style>
