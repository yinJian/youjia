<template>
    <div class="nurse-apply">
      <div class="card-item">
        <div class="card-item-label">姓名</div>
        <div class="card-default-value">
          <input type="text" placeholder="填写" v-model="name">
        </div>
      </div>
      <div class="card-item">
        <div class="card-item-label">性别</div>
        <div class="card-default-value radio-box" v-for="(item,index) in radios" :key="item.id">
          <span class="radio" :class="{'on':item.isChecked}"></span>
          <input v-model="radio" :value="item.value" class="input-radio" :checked='item.isChecked'  @click="check(index)" type="radio">{{item.label}}
        </div>
      </div>
      <group style="margin-top: 0" >
        <x-address 
        @on-hide="logHide" 
        @on-show="logShow" 
        :title="title"
        v-model="address" 
        :list="addressData" 
        @on-shadow-change="onShadowChange"
        placeholder="选择" 
        :show.sync="showAddress"
        ></x-address>
      </group>
      <div class="card-item">
        <div class="card-item-label">收件地址</div>
        <div class="card-default-value">
          <input type="text" placeholder="填写" v-model="receivesAddress" />
        </div>
      </div>
      <div class="bg-white">
        <div class="card">
          <div class="card-item">
            <div class="card-item-label">身份证号码</div>
            <div class="card-default-value">
              <input type="text" placeholder="填写" v-model="IDcard" maxlength="18" />
            </div>
          </div>
          <div class="upload-container">
            <div class="upload-card-title">请拍摄并上传身份证</div>
            <div class="upload-wrapper">
              <ul>
                <li>
                  <div @click="uploadFile('0401')" v-if="!list1">
                    <img src="../../../assets/images/IDcard-reserve.png" class="camera-img">
                    <p>点击上传带头像一面</p>
                  </div>
                  <div class="file-item" v-model="list1" v-if="list1">
                    <div class="file-item-wrapper">
                      <img src="../../../assets/images/icon_close@2x.png" class="file-delete" @click="deleteHandler('0401')">
                      <img :src="list1" class="file-img" @click="previewImgHandler(list1)">
                    </div>
                  </div>
                  <input 
                    accept="image/*" 
                    v-show="false" 
                    type="file" 
                    @change="pcUploadFile($event,'0401')" 
                    ref='pcFile1'>
                </li>
                <li>
                  <div @click="uploadFile('0402')" v-if="!list2">
                    <img src="../../../assets/images/IDcard-front.png" class="camera-img">
                    <p>点击上传带国徽一面</p>
                  </div>
                  <div class="file-item" v-model="list2" v-if="list2">
                    <div class="file-item-wrapper">
                      <img src="../../../assets/images/icon_close@2x.png" class="file-delete" @click="deleteHandler('0402')">
                      <img :src="list2" class="file-img" @click="previewImgHandler(list2)">
                    </div>
                  </div>
                  <input 
                    accept="image/*"
                    v-show="false" 
                    type="file" 
                    @change="pcUploadFile($event,'0402')"
                    ref='pcFile2'>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div class="card">
        <div class="card-item">
          <div class="card-item-label">所在医疗机构</div>
          <div class="card-default-value">
            <input type="text" placeholder="填写" v-model="medical">
          </div>
        </div>
        <div class="card-item">
          <div class="card-item-label">护士证/资格证号</div>
          <div class="card-default-value">
            <input type="number" placeholder="填写" maxlength="15" v-model="nurseCard">
          </div>
        </div>
        <div class="upload-container">
          <div class="upload-card-title">请拍摄并上传护士证</div>
          <div class="upload-wrapper">
            <ul>
              <li>
                <div @click="uploadFile('0403')" v-if="!list3">
                  <img src="../../../assets/images/nurse-front.png" class="camera-img">
                  <p>点击上传护士证</p>
                </div>
                <div class="file-item" v-model="list3" v-if="list3">
                  <div class="file-item-wrapper">
                    <img src="../../../assets/images/icon_close@2x.png" class="file-delete" @click="deleteHandler('0403')">
                    <img :src="list3" class="file-img" @click="previewImgHandler(list3)">
                  </div>
                </div>
                <input 
                  accept="image/*" 
                  v-show="false" 
                  type="file" 
                  @change="pcUploadFile($event,'0403')" 
                  ref='pcFile3'
                  >
              </li>
            </ul>
          </div>
        </div>
    </div>
    <div class="card mrb100">
      <div class="card-item">
        <div class="card-item-label">开户行名称</div>
        <div class="card-default-value">
          <input type="text" placeholder="填写" v-model="bankName">
        </div>
      </div>

      <div class="card-item">
        <div class="card-item-label">银行账号</div>
        <div class="card-default-value">
          <input type="number" placeholder="填写" v-model="bankCard">
        </div>
      </div>
    </div>
    <div class="img-preview-content" v-show="previewShow" @click="previewShow = false">
      <img :src="previewImg">
    </div>
    <div class="upload-submit" @click="submitNurseInfo">提交</div>
    <input type="hidden" value="15600130107" name="mobile">
  </div>
</template>

<script>
  import axios from 'axios';
  import {
    nurseEmploy,
    nurseUpload,//图片上传
    nurseUploadH5,
    nurseDeletePic, //图片删除
    initJssdk,
  } from '@/api'
  import { Group, XAddress, ChinaAddressV4Data, XButton, Cell, Value2nameFilter as value2name } from 'vux'
  import { API_URL, APP_URL} from '@/assets/scripts/utils.js';
  import { constants } from 'http';
    export default {
      components: {
        Group,
        XAddress,
        XButton,
        Cell,
      },
      data () {
        return {
          configOK: false,
          phone: '',
          list1:'',
          list2:'',
          list3:'',
          previewShow: false,
          previewImg: '',
          title: '地区',
          value_0_1: [],
          address: [],
          title2: '设置值',
          value2: ['天津市', '市辖区', '和平区'],
          value3: ['广东省', '中山市', '--'],
          addressData: ChinaAddressV4Data,
          value4: [],
          value5: ['广东省', '深圳 市', '南山区'],
          showAddress: false,
          radio: '1',
          radios:[
            {
              label: '男',
              value: 1,
              isChecked: true,
            },
            {
              label: '女',
              value: 0,
              isChecked: false,
            }
          ],
          name: '',
          receivesAddress: '',
          IDcard: '',
          medical: '',
          nurseCard: '',
          bankName: '',
          bankCard: ''
        }
      },
      mounted(){
        this.initJssdk();
        this.phone = this.$route.params.phone;
      },
      methods: {
        doShowAddress () {
          this.showAddress = true
          setTimeout(() => {
            this.showAddress = false
          }, 2000)
        },
        onShadowChange (ids, names) {
          console.log(ids, names)
        },
        changeData () {
          this.value2 = ['430000', '430400', '430407']
        },
        changeDataByLabels () {
          this.value2 = ['广东省', '广州市', '天河区']
        },
        changeDataByLabels2 () {
          this.value2 = ['广东省', '中山市', '--']
        },
        getName (value) {
          return value2name(value, ChinaAddressV4Data)
        },
        logHide (str) {
          console.log('on-hide', str)
        },
        logShow (str) {
          console.log('on-show')
        },
        check(index) {
          // 先取消所有选中项
          this.radios.forEach((item) => {
            item.isChecked = false;
          });
          //再设置当前点击项选中
          this.radio = this.radios[index].value;
          // 设置值，以供传递
          this.radios[index].isChecked = true;
        },
        // 提交信息
        submitNurseInfo(){
          if (!this.name) {
            this.$yjToast('请输入姓名！');
            return;
          }
          if (this.address.length == 0) {
            this.$yjToast('请选择省市区！');
            return;
          }
          if (!this.receivesAddress) {
            this.$yjToast('请输入详细地址！');
            return;
          }
          if (!this.IDcard) {
            this.$yjToast('身份证不能为空！');
            return;
          }
          if (!/^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/.test(this.IDcard)) {
            this.$yjToast('身份证格式不正确！');
            return;
          }
          if (!this.medical) {
            this.$yjToast('请输入所在医疗机构！');
            return;
          }
          if (!this.nurseCard) {
            this.$yjToast('请输入护士证/资格证号！');
            return;
          }
          if (!this.bankName) {
            this.$yjToast('请输入开户行名称！');
            return;
          }
          if (!this.bankCard) {
            this.$yjToast('请输入银行账号！');
            return;
          }
          if(!this.list1){
            this.$yjToast('请上传身份证正面！');
            return;
          }
          if(!this.list2){
            this.$yjToast('请上传身份证反面！');
            return;
          }
          if(!this.list3){
            this.$yjToast('请上传护士证！');
            return;
          }
          nurseEmploy(
            this.name,
            this.radio,
            this.address,
            this.receivesAddress,
            this.IDcard,
            this.medical,
            this.nurseCard,
            this.bankName,
            this.bankCard,
            this.phone,
            this.$store.state.isWeixin).then(data =>{
            if(data.data.code == 200){
              this.$router.push('/nurse/success')
            }
          })
        },
        initJssdk () {
          var self = this;
          initJssdk().then(data => {
            self.$yjToast('初始化中..');
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
              self.configOK = true;
            });
            wx.error(function(res){
              console.log(res);
            });
          });
        },
        // 上传图片
        uploadFile (enclosureType) {
          var self = this;
          if (this.$store.state.isWeixin) {
            if (this.configOK) {
              wx.chooseImage({
                count: 1, // 默认9
                sizeType: ['original', 'compressed'],
                sourceType: ['album', 'camera'],
                success: function (res) {
                  var localIds = res.localIds;
                  if(localIds.length > 0){
                    var len = localIds.length;
                    var i=0;
                    function uploadImage(){
                      wx.uploadImage({
                        localId: localIds[i],
                        isShowProgressTips: 1,
                        success: function (res) {
                          var serviceId = res.serverId;
                          i++;
                          nurseUpload(serviceId, enclosureType).then(data => {
                            if (data.data.code == '200') {
                              self.ifEnclosureType('上传', data.data)

                              if(i<len){
                                uploadImage();
                              }
                              self.reviewPic();
                            } else {
                              self.$yjToast(data.data.message);
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
          }else {
            switch (enclosureType) {
              case '0401':
                self.$refs.pcFile1.click()
                break;
              case '0402':
                self.$refs.pcFile2.click()
                break;
              case '0403':
                self.$refs.pcFile3.click()
                break;
            }
          }
        },

        pcUploadFile (ev,enclosureType) {
          var files = ev.target.files || ev.dataTransfer.files;
          if (!files.length) return

          const dFile = ev.target.files[0]
          this.imgCompress(ev, dFile, enclosureType)
        },

        deleteHandler (enclosureType) {
          nurseDeletePic(enclosureType,this.phone,this.$store.state.isWeixin).then(data => {
            if (data.data.code == '200') {
              let obj = { type : enclosureType }
              this.ifEnclosureType('删除', obj)
            } else {
              this.$yjToast(data.data.message);
            }
          })
        },

        ifEnclosureType (manner, data) {
          let uSrc = data.data
          if (manner == '删除') uSrc = ''
          this.$yjToast( manner + '文件成功！');
          if(data.type == '0401'){
            this.list1 = uSrc
          }else if(data.type == '0402'){
            this.list2 = uSrc
          }else if(data.type == '0403'){
            this.list3 = uSrc
          }
        },

        previewImgHandler (img) {
          this.previewImg = img;
          this.previewShow = true;
        },
        // 压缩图片
        imgCompress(ev, file, type) {
          let self = this;
          if (!file || !window.FileReader) return;
          if (/^image/.test(file.type)) {
              // 创建一个reader
              let reader = new FileReader();
              // 将图片2将转成 base64 格式
              reader.readAsDataURL(file);
              // 读取成功后的回调
              reader.onloadend =  function () {
                let result = this.result;
                let img = new Image();
                img.src = result;
                  //判断图片是否大于100K,是就直接上传，反之压缩图片
                  if (this.result.length <= (100 * 1024)) {
                    upImg(this.result , type)
                  }else {
                    img.onload = function () {
                      let src = compress(img);
                      upImg(src , type);
                    }
                  }
            }
          }
            // 压缩
            function compress(img) {
              let canvas = document.createElement("canvas");
              let ctx = canvas.getContext('2d');
                  //瓦片canvas
              let tCanvas = document.createElement("canvas");
              let tctx = tCanvas.getContext("2d");
              let initSize = img.src.length;
              let width = img.width;
              let height = img.height;
              //如果图片大于四百万像素，计算压缩比并将大小压至400万以下
              let ratio;
              if ((ratio = width * height / 4000000) > 1) {
                  console.log("大于400万像素")
                  ratio = Math.sqrt(ratio);
                  width /= ratio;
                  height /= ratio;
              } else {
                  ratio = 1;
              }
              canvas.width = width;
              canvas.height = height;
              //   铺底色
              ctx.fillStyle = "#fff";
              ctx.fillRect(0, 0, canvas.width, canvas.height);
              //如果图片像素大于100万则使用瓦片绘制
              let count;
              if ((count = width * height / 1000000) > 1) {
                  console.log("超过100W像素");
                  count = ~~(Math.sqrt(count) + 1); //计算要分成多少块瓦片
                //  计算每块瓦片的宽和高
                  let nw = ~~(width / count);
                  let nh = ~~(height / count);
                  tCanvas.width = nw;
                  tCanvas.height = nh;
                  for (let i = 0; i < count; i++) {
                  for (let j = 0; j < count; j++) {
                      tctx.drawImage(img, i * nw * ratio, j * nh * ratio, nw * ratio, nh * ratio, 0, 0, nw, nh);
                      ctx.drawImage(tCanvas, i * nw, j * nh, nw, nh);
                  }
                  }
                } else {
                    ctx.drawImage(img, 0, 0, width, height);
                }
                //进行最小压缩
                let ndata = canvas.toDataURL('image/jpeg', 0.3);
                tCanvas.width = tCanvas.height = canvas.width = canvas.height = 0;
                return ndata;
              }
            
            // 上传图片
            function upImg(src ,type) {
              const data = {
                  fileBase64: src,
                  enclosureType: type,
                  mobile : self.phone
                }
              axios({
                method: 'post',
                url: API_URL + '/newsystem/nurseUploadfileH5',
                data: {
                  fileBase64: src,
                  enclosureType: type,
                  mobile : self.phone
                },
                transformRequest: [function (data) {
                  let ret = ''
                  for (let it in data) {
                  ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
                  }
                  return ret
                }],
                headers: {
                  'Content-Type': 'application/x-www-form-urlencoded'
                }
              })
                .then((data) => {
                  if (data.data.code == '200') {
                    self.ifEnclosureType('上传', data.data)
                  } else {
                    self.$yjToast(data.data.message);
                  }
              })
              .catch((err) => {
                console.log(err);
              });
                ev.target.value = null

              // nurseUploadH5(oData).then( data => {
              //   if (data.data.code == '200') {
              //     this.ifEnclosureType('上传', data.data)
              //   } else {
              //     this.$yjToast(data.data.message);
              //   }
              //   ev.target.value = null
              // })
              // .catch(err => {
              //   console.log(err);
              // })
          }
        }
      }
    }
</script>
<style lang="less" scoped>
  @import '../../../assets/styles/base.less';

  input{
    font-size: 0.3733rem;
  }
  input::-webkit-input-placeholder{
    color: #A7A7A7;
    font-size: 0.3733rem;
  }

  .card-item{
    background: #ffffff;
  }
  .card-item input{
    width:auto;
  }

  .upload-container {
    padding: 0 0 30px 30px;
  }
  .upload-card-title{
    font-size: 28px;
    color: #C8C8C8;
    margin: 30px 0 20px;
  }
  .upload-wrapper {
    width: 100%;
    overflow: hidden;
    position: relative;
    left: 10px;
    span{
      line-height: 100px;
      font-size: 28px;
      color: #999999;
      margin-left: 20px;
    }
    li{
      width: 308px;
      float: left;
      text-align: center;
      margin-right: 40px;
    }
    p{
      margin: 10px 0;
    }
  }

  .camera-img {
    width: 308px;
    height: 216px;
    margin-bottom: 20px;
    max-width: 100%;
    max-height: 100%;
    float: left;
    margin-top: 10px;
  }

  .file-item {
    width: 308px;
    height: 216px;
    float: left;
    margin-right: 20px;
    margin-bottom: 20px;
    margin-top: 20px;
  }

  .file-item-wrapper {
    position: relative;
  }

  .file-img {
    width: 308px;
    height: 216px;
    display: block;

    .border-radius(4px);
  }

  .file-delete {
    width: 0.5866rem;
    height: 0.5866rem;
    position: absolute;
    right: -0.2933rem;
    top: -0.2933rem;
    z-index: 1000;
  }

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
  .upload-submit{
    width: 750px;
    height: 98px;
    line-height: 98px;
    text-align: center;
    font-size: 32px;
    color: #FFFFFF;
    background: #F39800;
    box-shadow: 0 -4px 10px 0 rgba(78,0,0,0.08);
    position: fixed;
    bottom: 0;
  }
  .mrb100{
    margin-bottom: 100px;
  }
  /*自定义单选框样式*/
  .radio-box{
    display: inline-block;
    position: relative;
    height: 36px;
    line-height: 36px;
    margin-right: 5px;
    width: 100px;
  }
  .radio {
    display: inline-block;
    width: 36px;
    height: 36px;
    vertical-align: middle;
    cursor: pointer;
    background-size: 36px;
    background-image: url('../../../assets/images/unselected.png');
  }
  .input-radio {
    display: inline-block;
    position: absolute;
    opacity: 0;
    margin: 0;
    width: 36px!important;
    height: 36px!important;
    cursor: pointer;
    left: 12px;
    outline: none;
    -webkit-appearance: none;
  }
  .on {
    background-image: url('../../../assets/images/selected.png');
  }

</style>
<style>
  /*修改vux插件样式*/
  .vux-no-group-title,.weui-cells{
    margin-top: 0!important;
    font-size: 0.3733rem!important;
  }
  .weui-cell{
    padding: 0 0.32rem!important;
    height: 1.3333rem!important;
  }
  .weui-cell_access .weui-cell__ft:after{
    height: 0.2rem!important;
    width: 0.2rem!important;
    top:-0.08rem!important;
  }
  .vux-popup-picker-placeholder{
    font-size: 0.3733rem!important;
  }
  .weui-cells:before{
    border-top:0!important;
  }
  .vux-popup-picker-value,.vux-popup-picker-placeholder{
    margin-right: 0.14rem!important;
  }
  .vux-popup-header{
    height: 1.2rem!important;
    line-height: 1.2rem!important;
    font-size: 0.3733rem!important;
  }

</style>
