<template>
  <div class="vue-upload">
    <div class="card">
      <div class="card-upload-title">{{uploadTitle}}</div>
      <div class="upload-container">
        <div class="upload-wrapper" @click="uploadFile">
          <img src="../../../assets/images/camera.png" class="camera-img">
          <div class="upload-tip">点击{{uploadTitle}}</div>
        </div>
      </div>
      <div class="file-list">
        <div class="file-item" v-for="list in imageData['0301']">
          <div class="file-item-wrapper">
           <!-- <img src="../../../assets/images/icon_close@2x.png" class="file-delete" @click="deleteHandler(file_index)">-->
            <img :src="list.enclosureUrl" class="file-img" @click="previewImgHandler(list.enclosureUrl)">
          </div>
        </div>
      </div>
    </div>
    <div class="img-preview-wrapper" v-show="previewShow" @click="previewShow = false">
      <div class="img-preview-cover"></div>
      <div class="img-preview-content">
        <img :src="previewImg">
      </div>
    </div>
  </div>
</template>

<script>
  import {
    savePic,//图片回显
    saveFile,//图片上传
    //deleteFile,
    initJssdk
  } from '@/api';
  import {
    getLocalStorage
  } from '@/assets/scripts/utils';


  export default {

    data () {
      return {
        uploadTitle:'上传诊断书',
        configOK: false,
        orderId: '',
        imageData:{},
        previewShow: false
      }
    },
    mounted () {
      this.orderId = JSON.parse(getLocalStorage('orderId'));
      this.initJssdk();
      savePic(this.orderId).then(data =>{
        this.imageData = data.data.data;
      })
    },
    methods: {
      initJssdk () {
        var that = this;
        initJssdk().then(data => {
          that.$yjToast('初始化中..');
          wx.config({
            debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
            appId: data.data.appId, // 必填，公众号的唯一标识
            timestamp: data.data.timestamp, // 必填，生成签名的时间戳
            nonceStr: data.data.nonceStr, // 必填，生成签名的随机串
            signature: data.data.signature,// 必填，签名
            jsApiList: ['uploadImage', 'chooseImage'] // 必填，需要使用的JS接口列表
          });

          wx.ready(function(res){
            console.log(res);
            that.configOK = true;
          });
          wx.error(function(res){
            console.log(res);
          });
        });
      },
      uploadFile () {
        var that = this;
        if (this.configOK) {
          wx.chooseImage({
            count: 9, // 默认9
            sizeType: ['original', 'compressed'],
            sourceType: ['album', 'camera'],
            success: function (res) {
              var localIds = res.localIds;
              if(localIds.length > 1){

                var len = localIds.length;
                var i=0;

                function uploadImage(){
                  wx.uploadImage({
                    localId: localIds[i],
                    isShowProgressTips: 1,
                    success: function (res) {
                      var serviceId = res.serverId;
                      i++;
                      saveFile(that.orderId, serviceId, '03', '0301').then(data => {
                        if (data.data.success == 'OK') {
                          that.$yjToast('文件上传成功！');
                          savePic(that.orderId).then(data =>{
                            that.imageData = data.data.data;
                          })
                          if(i<len){
                            uploadImage();
                          }

                        } else {
                          that.$yjToast(data.data.message);
                        }
                      });
                    },
                    fail: function (res) {
                      //alert('上传图片失败，请重试')
                    },
                    complete: function (res) {
                      //alert('上传强行失败，未知错误请联系开发人员')
                      console.log(res);
                      var serviceId = res.serverId;

                    }
                  });
                }

                uploadImage();

              }else{
                //alert('获取的照片ID'+localIds);
                wx.uploadImage({
                  localId: localIds.toString(),
                  isShowProgressTips: 1,
                  success: function (res) {
                    var serviceId = res.serverId;
                    saveFile(that.orderId, serviceId, '03', '0301').then(data => {
                      if (data.data.success == 'OK') {
                        that.$yjToast('文件上传成功！');
                        savePic(that.orderId).then(data =>{
                          that.imageData = data.data.data;
                        })
                      } else {
                        that.$yjToast(data.data.message);
                      }
                    });
                  },
                  fail: function (res) {
                    //alert('上传图片失败，请重试')
                  },
                  complete: function (res) {
                    //alert('上传强行失败，未知错误请联系开发人员')
                    console.log(res);
                    var serviceId = res.serverId;

                  }
                });
              }
            },
            complete: function (res) {
              //alert('选择图片失败，未知错误请联系开发人员')
              console.log(res);
            }
          });
        } else {
          this.$yjToast('微信jssdk配置失败！');
        }
      },
     /* deleteHandler (idx) {
        const id = this.orderDetail.enclosureName[idx].enclosureId;
        deleteFile(id).then(data => {
          if (data.data.success == 'OK') {
            this.$yjToast('删除文件成功！');
            this.orderDetail.enclosureName.splice(idx, 1);
          } else {
            that.$yjToast(data.data.message);
          }
        })
      },*/
      previewImgHandler (img) {
        this.previewImg = img;
        this.previewShow = true;
      }
    }
  }
</script>

<style lang="less" scoped>
  @import '../../../assets/styles/base.less';

  .card-upload-title {
    padding: 0.48rem 0.32rem;
    border-bottom: 1px solid @border-default;
  }

  .upload-container {
    padding: 0.32rem;
  }

  .upload-wrapper {
    width: 100%;
    height: 6.32rem;
    position: relative;
  }

  .camera-img {
    width: 100%;
  }

  .upload-tip {
    width: 100%;
    font-size: 0.3733rem;
    color: @text-color-white;
    text-align: center;
    position: absolute;
    bottom: 0.5866rem;
  }

  .upload-info {
    padding: 0.3466rem 0.533rem 0.3466rem 0.3466rem;
    font-size: 0.32rem;
    line-height: 0.64rem;
    color: #9A9A9A;
  }

  .upload-info-label {
    color: #E49A2D;
  }

  .button-upload {
    width: 2rem;
    height: 0.8rem;
    color: #E49A2D;
    border: 1px solid #E49A2D;
    display: block;
    margin: 0.32rem auto 0 auto;

    .button-order();
  }

  .upload-submit {
    width: 100%;
    height: 1.3333rem;
    line-height: 1.3rem;
    text-align: center;
    background: @bg-orange;
    color: @text-color-white;
  }

  .file-list {
    width: 100%;
    padding: 0 0.32rem;
    display: flex;
    flex-wrap: wrap;
  }

  .file-item {
    width: 2.90rem;
    height: 2.90rem;
    float: left;
    margin-right: 0.32rem;
    margin-bottom: 0.32rem;
    margin-top: 0.32rem;
  }

  .file-item:nth-child(3n+3) {
    margin-right: 0;
  }

  .file-item-wrapper {
    position: relative;
  }

  .file-img {
    width: 2.90rem;
    height: 2.90rem;
    display: block;

    .border-radius(0.1333rem);
  }

 /* .file-delete {
    width: 0.5866rem;
    height: 0.5866rem;
    position: absolute;
    right: -0.2933rem;
    top: -0.2933rem;
    z-index: 1000;
  }*/

  .img-preview-content {
    width: 100%;
    height: 100vh;
    padding: 1rem 0;
    background: #000000;
    overflow-y: auto;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 10000;

    img {
      width: 100%;
    }
  }
</style>
