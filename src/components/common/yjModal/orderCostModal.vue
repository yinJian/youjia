<template>
  <div class="confirm-modal-container" v-if="orderCostModalShow">
    <div class="confirm-modal-cover"></div>
    <div class="confirm-modal-content">
      <div class="confirm-modal-wrapper">
        <div class="confirm-modal-title">费用结算确认</div>
        <div class="confirm-modal-tip">已按照理赔结果收取用户对应金额，线下服务已完成。</div>
      </div>
      <div class="confirm-modal-btns">
        <div class="confirm-modal-cancel" @click="closeModal">取消</div>
        <div class="confirm-modal-confirm" @click="confirmModal">确认</div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      orderCostModalShow: {
        type: Boolean,
        default: true
      }
    },
    methods: {
      closeModal () {
        this.$emit('on-close');
      },
      confirmModal () {
        this.$emit('on-confirm');
      }
    }
  }
</script>

<style lang="less" scoped>
  @import '../../../assets/styles/base.less';

  .confirm-modal-container {
    position: relative;
    z-index: 20;
  }

  .confirm-modal-cover {
    width: 100%;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    background: #000;
    opacity: 0.3;
  }

  .confirm-modal-content {
    width: 7.2rem;
    height: 5.066rem;
    background: @bg-white;
    position: fixed;
    z-index: 20;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    margin: auto;
    border-radius: 0.1333rem;
  }

  .confirm-modal-title {
    font-size: 0.48rem;
    text-align: center;
  }

  .confirm-modal-tip {
    font-size: 0.35rem;
    line-height: 0.6rem;
    color: #999;
    margin-top: 0.3733rem;
  }

  .confirm-modal-wrapper {
    height: 4rem;
    padding: 0.6666rem 0.48rem;
  }

  .confirm-modal-btns {
    width: 100%;
    height: 1.0666rem;
    line-height: 1.0666rem;
    display: flex;
    align-items: center;
    border-top: 1px solid #EEEEEE;
    font-size: 0.4366rem;
  }

  .confirm-modal-cancel {
    width: 50%;
    text-align: center;
    border-right: 1px solid #EEEEEE;
  }

  .confirm-modal-confirm {
    width: 50%;
    text-align: center;
    color: #E49A2D;
  }

  .confirm-modal-input {
    width: 100%;
    height: 0.8rem;
    padding: 0 0.32rem;
    background:rgba(248,248,248,1);
    border-radius: 0.1066rem;
    margin-top: 0.48rem;
    outline: none;
    border: none;
  }
</style>
