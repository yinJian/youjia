<template>
  <div>
    <router-view />
  </div>
</template>

<script>
import {
  getUserinfo,
  getDoctorUserinfo
} from '@/api';
import {
  setLocalStorage
} from '@/assets/scripts/utils';

export default {
  name: 'App',
  mounted () {
    this.initUserinfo();
  },
  methods: {
    initUserinfo () {
      getUserinfo().then(data => {
        if (data.data.success == 'OK') {
          const userinfo = {
            phone: data.data.data.phone,
            password: data.data.data.rsPassword
          };
          setLocalStorage('uid', data.data.data.userId);
          this.$store.commit('updateUserinfo', {
            userinfo: userinfo
          });
        } else {

        }
      });
      getDoctorUserinfo().then(data => {
        if(data.data.code == '200'){
          setLocalStorage('doctorId', data.data.data.doctorId);
        }else {
          setLocalStorage('doctorId', '');
        }
      })
    },
  }
}
</script>

<style lang="less">
  @import './assets/styles/base.less';
  @import './assets/styles/date-picker-bottom.css';

  body, html {
    margin: 0;
    padding: 0;
    background: @bg-default;
    color: @text-color-default;
    font-family: PingFangSC-Regular, "Helvetica Neue", Helvetica, "Hiragino Sans GB", Arial, "Microsoft Yahei", "微软雅黑";
  }
  div, p, span, section, textarea, input, button, a {
    box-sizing: border-box;
  }
  p, ul {
    margin: 0;
  }
  a {
    text-decoration: none;
    color: @text-color-default;
  }

  /**
   * 公共样式
   */
  .container-with-bar {
    padding-bottom: 1.5rem;
  }

  .bottom-bar {
    width: 100%;
    height: 1.3333rem;
    position: fixed;
    bottom: 0;
    left: 0;
    display: flex;
    z-index: 99;
    font-size: 0.48rem;
    //border-top: 1px solid #EBECF1;
  }

  .no-scroll {
    overflow: hidden;
  }

  .card {
    width: 100%;
    background: @bg-white;
    font-size: 0.3733rem;
    margin-top: 0.21333rem;
    border-top: 1px solid @border-default;
    border-bottom: 1px solid @border-default;
  }

  .card-no-margin {
    margin-top: 0;
  }

  .card-with-padding {
    width: 100%;
    background: @bg-white;
    font-size: 0.3733rem;
    margin-top: 0.21333rem;
    padding: 0 0.32rem;
    border-top: 1px solid @border-default;
    border-bottom: 1px solid @border-default;
  }

  .card-title {
    width: 100%;
    display: flex;
    padding: 0.4266rem 0 0.32rem 0;
    border-bottom: 1px solid @border-default;
  }

  .card-title-opt {
    color: #E49A2D;
    margin-left: auto;
  }

  .card-item {
    width: 100%;
    display: flex;
    align-items: center;
    height: 1.3333rem;
    padding: 0 0.32rem;
    font-size: 0.3733rem;
    border-bottom: 1px solid @border-default;

    input {
      width: calc(~"100% - 0.58rem - 2.666rem");
      text-align: right;
      margin-left: auto;
      height: 100%;
      border: none;
      outline: none;
    }
  }

  .card-item:last-child {
    border-bottom: 0;
  }

  .card-desc-item {
    width: 100%;
  }

  .card-piece {
    padding: 0.4rem 0.32rem;
    font-size: 0.3733rem;
    color: #9A9A9A;
  }

  .card-desc-label {
    padding: 0 0.32rem;
    margin-top: 0.48rem;
  }

  .card-item-label {
    width: 8rem;
  }

  .card-default-value {
    width: calc(~"100% - 0.58rem - 2.666rem");
    text-align: right;
    margin-left: auto;
    color: @text-color-gray;
  }

  .card-item-value {
    width: calc(~"100% - 0.58rem - 2.666rem");
    text-align: right;
    margin-left: auto;
  }

  .icon-arrow-right {
    width: 0.2rem;
    height: 0.4rem;
    margin-left: auto;
  }

  .piece {
    padding: 0.4rem 0.32rem;
    font-size: 0.3733rem;
    color: #9A9A9A;
  }

  .button-progress {
    width: 1.7rem;
    height: 0.7rem;
    border-radius: 0.3733rem;
    color: #E49A2D;
    font-size: 0.32rem;
    background: @bg-white;
    border: 1px solid #E49A2D;
    outline: none;

    &:active {
      background: #F7F5F5;
    }
  }

  .gray{
    color: @text-color-gray;
  }

</style>
