<template>
  <div class="confirm-modal-container" v-if="agreementModalShow">
    <div class="confirm-modal-cover"></div>
    <div class="confirm-modal-content">
      <div class="confirm-modal-wrapper">
        <div class="confirm-modal-title">确认携带以下文件</div>
        <div class="confirm-modal-tip">
          <ul>
            <li class="tipTitle">请服务人员确认携带以下文件：</li>
            <li>1、《医疗垫付协议》</li>
            <li>2、《个人保险医疗理赔申请书》</li>
            <li>3、《保险金领款授权书》</li>
            <li>4、《垫付确认书》</li>
            <li class="tipTitle">请服务人员提醒用户携带以下文件：</li>
            <li>1、本次申请疾病的所有首诊、随访病历、检查报告原件（如有，包括且不限定以下：CT、核磁共振、B超、X光、心电图、血液检验等检查结果报告单）</li>
            <li>2、被保险人身份证原件</li>
            <li>3、银行卡原件</li>
            <li>4、入院通知单原件（如有请提供）</li>
            <li>5、社保就诊手册、近两年体检报告（如有请提供）</li>
            <li>6、本次入院记录、住院病历首页、检查报告（如有请提供）</li>
            <li>7、已发生费用清单（或住院发票）（如有请提供）</li>
          </ul>
        </div>
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
      agreementModalShow: {
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

  ul,li{
    margin:0;
    padding:0;
  }
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
    height: 8rem;
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
    color: #666;
    margin-top: 0.3733rem;
    overflow-y: scroll;
    height: 4.5rem;
  }
  .confirm-modal-tip .tipTitle{
    line-height: 1rem;
    /*margin-left: -0.4rem;*/
  }

  .confirm-modal-wrapper {
    padding: 0.6666rem 0.8rem;
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
