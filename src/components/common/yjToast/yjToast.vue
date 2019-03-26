<template>
  <div class="yj-toast" v-if="toastShow">
    <div class="toast-content">{{ content }}</div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        toastShow: false,
        content: ''
      }
    },
    methods: {
      closeToast () {
        this.toastShow = false;
      }
    },
    watch: {
      toastShow (newVal) {
        if (newVal) {
          setTimeout(() => {
            this.toastShow = false;
          }, 3000);
        }
      }
    }
  }
</script>

<style lang="less" scoped>
  @import '../../../assets/styles/base.less';

  .toast-content {
    max-width: 70%;
    padding: 0.16rem 0.4rem;
    position: fixed;
    left: 50%;
    top: 30%;
    font-size: 0.3733rem;
    background: #000000;
    opacity: 0.3;
    color: @text-color-white;
    transform: translate(-50%, -50%);
    z-index: 1000;

    .border-radius(0.1333rem);
  }
</style>