<template>
      <div class="vue-uploader">
        <div class="file-list">
          <div v-for="imageItem in list" v-if="list.length!=0" class="file-item">
            <img :src="imageItem.enclosureUrl" />
          </div>
          <section v-for="(file, index) of files" :class="file.scale?'file-item':'file-item-active'">
            <img :src="file.src" :dataTypes="file.dataTypes" alt=""  @click="file.scale = !file.scale">
            <p class="file-name" v-if="file.scale">{{file.name}}</p>
            <!--<span class="file-remove" @click="remove(index)" v-if="file.scale">+</span>-->
          </section>
          <section v-if="status == 'ready'" class="file-item" ref="adds">
            <div @click="add" class="add">
              <span>+</span>
            </div>
          </section>
        </div>
        <!--<section v-if="files.length != 0" class="upload-func" ref="submitBtn">
          <div class="operation-box">
            <button v-if="status == 'ready'" @click="submit">上传</button>
          </div>
        </section>-->
        <input type="file" name="image" accept="image/*" multiple @change="fileChanged" ref="file">
      </div>
</template>
<script>
  /*var array = []
  var obj = {
    '0301':'门诊病历影像件',
    '0302':'医疗垫付协议书',
    '0303':'理赔授权协议书',
    '0304':'理赔申请书',
    '0305':'身份证正面',
    '0306':'身份证反面',
    '0307':'用户保单复印件',
    '0308':'银行卡正面',
    '0309':'《社保卡》或《新农合》',
    '0310':'入院通知书',
    '0311':'住院押金条',
    '0312':'入院垫付确认书',
    '0313':'收款凭证截图',
    '0314':'补传的住院押金条',
    '0315':'住院发票',
    '0316':'诊断证明书',
    '0317':'出院小结',
    '0318':'结算费用明细清单',
    '0319':'住院病历',
    '0320':'出院垫付确认书'
  }
  array.push(obj)*/
  import axios from 'axios';
  import {
    getLocalStorage
  } from '@/assets/scripts/utils';

    export default {
        props: {
            src: {
                type: String,
                required: true
            },
            dataTypes: {
              type: String,
              required: true
            },
            list:{
              type:String|Array,
              required: false
            }
        },
        data () {
            return {
              status: 'ready',
              files: []
            }
        },
        methods: {
            add() {
                this.$refs.file.click()
            },
            submit: function () {
            if (this.files.length === 0) {
              console.warn('请选择上传图片!');
              return
            }
            const formData = new FormData()

            this.files.forEach((item) => {
              formData.append(item.name, item.file)
            })
            const orderId = JSON.parse(getLocalStorage('orderId'))
            formData.append('orderNumber',orderId)
            formData.append('enclosureType','03')
            formData.append('enclosureName', this.dataTypes)
            var that = this

            axios.interceptors.request.use(config=>{
              that.$yjToast('上传中...');
              return config;
            }, error => {
              console.log(error);
              return Promise.reject(error)
            })
            axios.post(this.src, formData, {
              headers: {
                'Content-Type' : 'multipart/form-data'
              }
            }).then(function (res) {
              console.log(res);
              that.$yjToast.end();
              if(res.data.success.toLocaleLowerCase() == 'ok' ){
                that.$yjToast('上传成功！')
              }else {
                that.$yjToast('上传失败！')
              }
            })
          },
            /*remove(index) {
                this.files.splice(index, 1)
            },*/
            fileChanged() {
                const list = this.$refs.file.files
                let len = list.length
                for (let i = 0; i < len; i++) {
                  if (!this.isContain(list[i])) {
                    const item = {
                      name: list[i].name,
                      size: list[i].size,
                      file: list[i],
                      scale: true
                    }
                    this.html5Reader(list[i], item)
                    this.files.push(item)
                  }
                }
                this.$yjToast('上传中...')
                this.submit()
                this.$refs.file.value = ''
            },
            // 将图片文件转成BASE64格式
            html5Reader(file, item){
                const reader = new FileReader()
                reader.onload = (e) => {
                    this.$set(item, 'src', e.target.result)
                }
                reader.readAsDataURL(file)
            },
            isContain(file) {
              return this.files.find((item) => item.name === file.name && item.size === file.size)
            }
        }
    }
</script>
<style>
.vue-uploader .file-list {
    padding: 10px 0px;
}
.vue-uploader .file-list:after {
    content: '';
    display: block;
    clear: both;
    visibility: hidden;
    line-height: 0;
    height: 0;
    font-size: 0;
}
.vue-uploader .file-list .file-item {
    float: left;
    position: relative;
    z-index: 0;
    width: 100px;
    text-align: center;
}
.vue-uploader .file-list .file-item-active{
    position: absolute;
    z-index: 1;
    width: 94vw;
    overflow:hidden;
}
.vue-uploader .file-list .file-item-active img{
   width:94vw;
}
.vue-uploader .file-list .file-item img{
    width: 80px;
    height: 80px;
    border: 1px solid #ececec;
    transform: scale(1);
    transition: all ease 0.2s;
}
/*.vue-uploader .file-list .file-item img.scale {
    position: absolute;
    z-index:99999;
    transform: scale(3);
}*/

.vue-uploader .file-list .file-item .file-remove {
    position: absolute;
    right: 12px;
    display: none;
    top: 4px;
    width: 14px;
    height: 14px;
    color: white;
    cursor: pointer;
    line-height: 12px;
    border-radius: 100%;
    transform: rotate(45deg);
    background: rgba(0, 0, 0, 0.5);
}
.vue-uploader .file-list .file-item:hover .file-remove {
    display: inline;
}
.vue-uploader .file-list .file-item .file-name {
    margin: 0;
    height: 40px;
    word-break: break-all;
    font-size: 14px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
}
.vue-uploader .add {
    width: 80px;
    height: 80px;
    margin-left: 10px;
    float: left;
    text-align: center;
    line-height: 80px;
    border: 1px dashed #ececec;
    font-size: 40px;
    color: #ccc;
    cursor: pointer;
}
/*.vue-uploader .upload-func {
    display: flex;
    padding: 10px;
    margin: 0px;
    background: #f8f8f8;
    border-top: 1px solid #ececec;
}*/
.vue-uploader .upload-func .progress-bar {
    flex-grow: 1;
}
.vue-uploader .upload-func .progress-bar section {
    margin-top: 5px;
    background: #00b4aa;
    border-radius: 3px;
    text-align: center;
    color: #fff;
    font-size: 12px;
    transition: all .5s ease;
}
.vue-uploader .upload-func .operation-box {
    flex-grow: 0;
    padding-left: 10px;
}
.vue-uploader .upload-func .operation-box button {
    padding: 4px 12px;
    color: #fff;
    background: #E49A2D;
    border: none;
    border-radius: 2px;
    cursor: pointer;
}
.vue-uploader > input[type="file"] {
    display: none;
}
.w100{
  width:100px;
  padding: 0 10px;
}
</style>
