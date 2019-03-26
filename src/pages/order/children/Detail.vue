<!--suppress ALL -->
<template>
  <div class="order-detail-container">
      <div class="order-detail-header">
        <div class="order-detail-back" @click="backChoose">返回</div>
        <div class="order-detail-title">订单详情</div>
      </div>
      <pull-to :top-load-method="refresh">
        <div class="order-detail-wrapper" :class="!showDetail ? 'order-detail-wrapper-sm' : ''">
          <div class="order-detail-list">
            <div class="order-detail-item">
              <div class="order-detail-label">订单编号</div>
              <div class="order-detail-value">{{orderNumber}}</div>
            </div>
            <div class="order-detail-item">
              <div class="order-detail-label">申请人</div>
              <div class="order-detail-value">{{applyName}}</div>
            </div>
            <div class="order-detail-item">
              <div class="order-detail-label">住院医院</div>
              <div class="order-detail-value">{{hosptailName}}</div>
            </div>
            <div class="order-detail-item">
              <div class="order-detail-label">就诊科室</div>
              <div class="order-detail-value">{{departmentName}}</div>
            </div>
            <!--<div class="order-detail-item">
                        <div class="order-detail-label">住院时间</div>
                        <div class="order-detail-value">282828193939</div>
                    </div>-->
          </div>
          <div class="order-detail-list">
            <div class="order-detail-item">
              <div class="order-detail-label">患者联系人</div>
              <div class="order-detail-value">{{linkName}}</div>
            </div>
            <div class="order-detail-item">
              <div class="order-detail-label">客户联系方式</div>
              <div class="order-detail-value"><a :href="'tel:'+ linkPhone" class="orange">{{linkPhone}}</a></div>
            </div>
            <!--<div class="order-detail-item">
                        <div class="order-detail-label">联系人与住院人关系</div>
                        <div class="order-detail-value">282828193939</div>
                    </div>-->
            <div class="order-detail-item">
              <div class="order-detail-label">备注提醒</div>
              <div class="order-detail-value">{{remark}}</div>
            </div>
            <div class="order-detail-item">
              <div class="order-detail-label">描述</div>
              <div class="order-detail-value">{{description}}</div>
            </div>
          </div>
          <!--<div class="order-detail-list">
                    <div class="order-detail-item">
                        <div class="order-detail-label">订单审核人</div>
                        <div class="order-detail-value">贾老师</div>
                    </div>
                    <div class="order-detail-item">
                        <div class="order-detail-label">联系方式</div>
                        <div class="order-detail-value">13245678901</div>
                    </div>
                </div>-->
        </div>
        <div class="order-detail-trigger" @click="showDetail = !showDetail">
          <span>{{ showDetail ? '收起信息' : '展开信息' }}</span>
          <img src="../../../assets/images/icon_fold@2x.png" v-show="showDetail" class="icon-more">
          <img src="../../../assets/images/icon_unfold@2x.png" v-show="!showDetail" class="icon-more">
        </div>
        <div class="piece">订单操作流程确认</div>
        <div class="order-progress">
          <div class="order-progress-list">
            <div class="order-progress-item order-progress-item-not" ref="itemWrap0">
              <div class="order-progress-bar">
                <!-- <div class="order-progress-line1"></div> -->
                <div class="order-progress-dot">1</div>
                <div class="order-progress-line2"></div>
              </div>
              <div class="order-process-info">
                <div class="order-progress-title">
                  <p>确认订单信息</p>
                  <p class="order-progress-time">{{currentTime}}</p>
                </div>
              </div>
              <div class="order-progress-opts">
                <!--<div class="order-progress-status" v-if="orderStates >= '0007'">已完成</div>-->
                <button class="order-btn button-progress" @click="OrderInfoConfirm" style="pointer-events:auto">去确认</button>
              </div>
            </div>
            <div class="order-progress-item order-progress-item-not" ref="itemWrap1">
              <div class="order-progress-bar">
                <div class="order-progress-line1"></div>
                <div class="order-progress-dot">2</div>
                <div class="order-progress-line2"></div>
              </div>
              <div class="order-process-info">
                <div class="order-progress-title">
                  <p>与患者联系人沟通服务细节</p>
                  <!--<input v-model="hospitalDetail"/>-->
                </div>
              </div>
              <div class="order-progress-opts">
                <!--<div class="order-progress-status" v-if="orderStates >= '0008'">已完成</div>-->
                <button class="order-btn button-progress" @click="hospitalDetailHandler">去沟通</button>
              </div>
            </div>
            <div class="order-progress-item order-progress-item-not" ref="itemWrap2">
              <div class="order-progress-bar">
                <div class="order-progress-line1"></div>
                <div class="order-progress-dot">3</div>
                <div class="order-progress-line2"></div>
              </div>
              <div class="order-process-info">
                <div class="order-progress-title">
                  <p>检查并携带相关协议无误</p>
                </div>
              </div>
              <div class="order-progress-opts">
                <!--<div class="order-progress-status" v-if="orderStates >= '0010'">已确认</div>-->
                <button class="order-btn button-progress" @click="agreementHandler">去确认</button>
              </div>
            </div>
            <div class="order-progress-item order-progress-item-not" ref="itemWrap3">
              <div class="order-progress-bar">
                <div class="order-progress-line1"></div>
                <div class="order-progress-dot">4</div>
                <div class="order-progress-line2"></div>
              </div>
              <div class="order-process-info">
                <div class="order-progress-title">
                  <p>提交押金垫付已签署文件</p>
                </div>
              </div>
              <div class="order-progress-opts">
                <!--<div class="order-progress-status" v-if="isOrderStates" @click="jumpLink('/order/upload',orderStates)">已审核</div>-->
                <!--<div class="order-progress-status" v-if="orderStates >= '0011'" @click="jumpLink('/order/upload',orderStates)">审核中</div>-->
                <button class="order-btn button-progress"
                        @click="jumpLink('/order/upload',orderStates)">去上传
                </button>
              </div>
            </div>
            <div class="order-progress-item order-progress-item-not" ref="itemWrap4">
              <div class="order-progress-bar">
                <div class="order-progress-line1"></div>
                <div class="order-progress-dot">5</div>
                <div class="order-progress-line2"></div>
              </div>
              <div class="order-process-info">
                <div class="order-progress-title">
                  <p>上传“住院押金条”</p>
                </div>
              </div>
              <div class="order-progress-opts">
                <!--<div class="order-progress-status" v-if="orderStates >= '0015'" @click="jumpLink('/order/uploaddeposit',orderStates)">已审核</div>
                <button class="button-progress" @click="jumpLink('/order/uploaddeposit',orderStates)" v-else>去上传</button>-->
                <button class="order-btn button-progress"
                        @click="jumpLink('/order/uploaddeposit',orderStates)">去上传
                </button>
              </div>
            </div>
            <div class="order-progress-item order-progress-item-not" ref="itemWrap5">
              <div class="order-progress-bar">
                <div class="order-progress-line1"></div>
                <div class="order-progress-dot">6</div>
                <div class="order-progress-line2"></div>
              </div>
              <div class="order-process-info">
                <div class="order-progress-title">
                  <p>用户出院，上传“结算费用明细”</p>
                </div>
              </div>
              <div class="order-progress-opts">
                <!--<div class="order-btn order-progress-status" v-if="orderStates >= '0016'"
                     @click="jumpLink('/order/ClaimResult',orderStates)">查看理赔结果
                </div>-->
                <button class="order-btn button-progress" @click="loop">去上传</button>
              </div>
            </div>
            <!--<div class="order-progress-item order-progress-item-not" ref="itemWrap6">
              <div class="order-progress-bar">
                <div class="order-progress-line1"></div>
                <div class="order-progress-dot">7</div>
                <div class="order-progress-line2"></div>
              </div>
              <div class="order-process-info">
                <div class="order-progress-title">
                  <p>费用结算确认</p>
                </div>
              </div>
              <div class="order-progress-opts">
                &lt;!&ndash;<div class="order-btn order-progress-status">完成</div>&ndash;&gt;
                <button class="order-btn button-progress" @click="orderCostHandler">去确认</button>
              </div>
            </div>-->
          </div>
        </div>
        <HospitalDetaiModal
          :hospitalDetaiModalShow="hospitalDetailShow"
          @transferRemark='getRemark'
          @on-close="hospitalDetailShow = false"
          @on-confirm="hospitalDetailConfirm"
        ></HospitalDetaiModal>
        <AgreementModal
          :agreementModalShow="agreementShow"
          @on-close="agreementShow = false"
          @on-confirm="agreementConfirm"
        ></AgreementModal>
        <!--<OrderCostModal
          :orderCostModalShow="orderCostShow"
          @on-close="orderCostShow = false"
          @on-confirm="orderCostConfirm"
        ></OrderCostModal>-->
      </pull-to>
  </div>
</template>

<script>
  import {
    getOrders,
    getOrderDetail,
    confirmOrderInfo,
    communicatHospitalDetail,
    confirmAgreement,
    confirmOrderCosts
  } from '@/api';
  import {
    getLocalStorage,
    setLocalStorage
  } from '@/assets/scripts/utils';
  import PullTo from 'vue-pull-to';

  export default {
    components: {
      PullTo
    },
    data() {
      return {
        showDetail: false,
        orderNumber: '',
        applyName: '',
        hosptailName: '',
        departmentName: '',
        linkName: '',
        linkPhone: '',
        remark: '',
        description: '',
        currentTime: '',
        remarkDetail: '',
        hospitalDetailShow: false,
        agreementShow: false,
        //orderCostShow: false,
        orderStates: '',
      }
    },
    methods: {
      refresh(loaded) {
        var that = this;
        setTimeout(() => {

          const orderId = JSON.parse(getLocalStorage('orderId'));
          console.log(orderId);
          var that = this;
          //this.$data.currentTime = this.curTime();
          getOrderDetail(orderId).then(data => {
            var result = data.data.data;
            //order-progress-status
            if (result != null) {
              that.$data.orderNumber = result.orderNumber;
              that.$data.applyName = result.name;
              that.$data.hosptailName = result.hosptailName;
              that.$data.departmentName = result.departmentName;
              that.$data.linkName = result.linkName;
              that.$data.linkPhone = result.linkPhone;
              that.$data.remark = result.remark;
              that.$data.description = result.description;
              that.$data.orderStates = result.orderStates;
              var state = that.$data.orderStates;
              if (state == '0007') {
                that.$refs.itemWrap0.className = 'order-progress-item';
                that.$refs.itemWrap0.querySelector('.order-btn').className = 'order-btn order-progress-status'
                that.$refs.itemWrap0.querySelector('.order-btn').innerHTML = '已完成'
                that.$refs.itemWrap0.querySelector('.order-btn').style.pointerEvents = 'none'
                that.$refs.itemWrap1.querySelector('.order-btn').style.pointerEvents = 'auto'
              }
              else if (state == '0008') {
                that.$refs.itemWrap0.className = 'order-progress-item';
                that.$refs.itemWrap0.querySelector('.order-btn').className = 'order-btn order-progress-status'
                that.$refs.itemWrap0.querySelector('.order-btn').innerHTML = '已完成'
                that.$refs.itemWrap0.querySelector('.order-btn').style.pointerEvents = 'none'
                that.$refs.itemWrap1.className = 'order-progress-item';
                that.$refs.itemWrap1.querySelector('.order-btn').className = 'order-btn order-progress-status'
                that.$refs.itemWrap1.querySelector('.order-btn').innerHTML = '已完成'
                that.$refs.itemWrap1.querySelector('.order-btn').style.pointerEvents = 'none'
                that.$refs.itemWrap2.querySelector('.order-btn').style.pointerEvents = 'auto'
              }
              else if (state == '0010') {
                that.$refs.itemWrap0.className = 'order-progress-item';
                that.$refs.itemWrap0.querySelector('.order-btn').className = 'order-btn order-progress-status'
                that.$refs.itemWrap0.querySelector('.order-btn').innerHTML = '已完成'
                that.$refs.itemWrap0.querySelector('.order-btn').style.pointerEvents = 'none'
                that.$refs.itemWrap1.className = 'order-progress-item';
                that.$refs.itemWrap1.querySelector('.order-btn').className = 'order-btn order-progress-status'
                that.$refs.itemWrap1.querySelector('.order-btn').innerHTML = '已完成'
                that.$refs.itemWrap1.querySelector('.order-btn').style.pointerEvents = 'none'
                that.$refs.itemWrap2.className = 'order-progress-item';
                that.$refs.itemWrap2.querySelector('.order-btn').className = 'order-btn order-progress-status'
                that.$refs.itemWrap2.querySelector('.order-btn').innerHTML = '已完成'
                that.$refs.itemWrap2.querySelector('.order-btn').style.pointerEvents = 'none'
                that.$refs.itemWrap3.querySelector('.order-btn').style.pointerEvents = 'auto'
              }
              else if (state == '0015') {
                that.$refs.itemWrap0.className = 'order-progress-item';
                that.$refs.itemWrap0.querySelector('.order-btn').className = 'order-btn order-progress-status'
                that.$refs.itemWrap0.querySelector('.order-btn').innerHTML = '已完成'
                that.$refs.itemWrap0.querySelector('.order-btn').style.pointerEvents = 'none'
                that.$refs.itemWrap1.className = 'order-progress-item';
                that.$refs.itemWrap1.querySelector('.order-btn').className = 'order-btn order-progress-status'
                that.$refs.itemWrap1.querySelector('.order-btn').innerHTML = '已完成'
                that.$refs.itemWrap1.querySelector('.order-btn').style.pointerEvents = 'none'
                that.$refs.itemWrap2.className = 'order-progress-item';
                that.$refs.itemWrap2.querySelector('.order-btn').className = 'order-btn order-progress-status'
                that.$refs.itemWrap2.querySelector('.order-btn').innerHTML = '已完成'
                that.$refs.itemWrap2.querySelector('.order-btn').style.pointerEvents = 'none'
                that.$refs.itemWrap3.className = 'order-progress-item';
                that.$refs.itemWrap3.querySelector('.order-btn').className = 'order-btn order-progress-status'
                that.$refs.itemWrap3.querySelector('.order-btn').innerHTML = '已审核'
                //that.$refs.itemWrap3.querySelector('.order-btn').style.pointerEvents = 'none'
                that.$refs.itemWrap4.querySelector('.order-btn').style.pointerEvents = 'auto'
              }
              else if (state == '0014') {
                that.$refs.itemWrap0.className = 'order-progress-item';
                that.$refs.itemWrap0.querySelector('.order-btn').className = 'order-btn order-progress-status'
                that.$refs.itemWrap0.querySelector('.order-btn').innerHTML = '已完成'
                that.$refs.itemWrap0.querySelector('.order-btn').style.pointerEvents = 'none'
                that.$refs.itemWrap1.className = 'order-progress-item';
                that.$refs.itemWrap1.querySelector('.order-btn').className = 'order-btn order-progress-status'
                that.$refs.itemWrap1.querySelector('.order-btn').innerHTML = '已完成'
                that.$refs.itemWrap1.querySelector('.order-btn').style.pointerEvents = 'none'
                that.$refs.itemWrap2.className = 'order-progress-item';
                that.$refs.itemWrap2.querySelector('.order-btn').className = 'order-btn order-progress-status'
                that.$refs.itemWrap2.querySelector('.order-btn').innerHTML = '已完成'
                that.$refs.itemWrap2.querySelector('.order-btn').style.pointerEvents = 'none'
                that.$refs.itemWrap3.className = 'order-progress-item';
                that.$refs.itemWrap3.querySelector('.order-btn').className = 'order-btn order-progress-status'
                that.$refs.itemWrap3.querySelector('.order-btn').innerHTML = '审核中'
              }
              else if (state == '0017') {
                that.$refs.itemWrap0.className = 'order-progress-item';
                that.$refs.itemWrap0.querySelector('.order-btn').className = 'order-btn order-progress-status'
                that.$refs.itemWrap0.querySelector('.order-btn').innerHTML = '已完成'
                that.$refs.itemWrap0.querySelector('.order-btn').style.pointerEvents = 'none'
                that.$refs.itemWrap1.className = 'order-progress-item';
                that.$refs.itemWrap1.querySelector('.order-btn').className = 'order-btn order-progress-status'
                that.$refs.itemWrap1.querySelector('.order-btn').innerHTML = '已完成'
                that.$refs.itemWrap1.querySelector('.order-btn').style.pointerEvents = 'none'
                that.$refs.itemWrap2.className = 'order-progress-item';
                that.$refs.itemWrap2.querySelector('.order-btn').className = 'order-btn order-progress-status'
                that.$refs.itemWrap2.querySelector('.order-btn').innerHTML = '已完成'
                that.$refs.itemWrap2.querySelector('.order-btn').style.pointerEvents = 'none'
                that.$refs.itemWrap3.className = 'order-progress-item';
                that.$refs.itemWrap3.querySelector('.order-btn').className = 'order-btn order-progress-status'
                that.$refs.itemWrap3.querySelector('.order-btn').innerHTML = '已审核'
                //that.$refs.itemWrap3.querySelector('.order-btn').style.pointerEvents = 'none'
                that.$refs.itemWrap4.className = 'order-progress-item';
                that.$refs.itemWrap4.querySelector('.order-btn').className = 'order-btn order-progress-status'
                that.$refs.itemWrap4.querySelector('.order-btn').innerHTML = '已审核'
                //that.$refs.itemWrap4.querySelector('.order-btn').style.pointerEvents = 'none'
                that.$refs.itemWrap5.querySelector('.order-btn').style.pointerEvents = 'auto'
              }
              else if (state == '0016') {
                that.$refs.itemWrap0.className = 'order-progress-item';
                that.$refs.itemWrap0.querySelector('.order-btn').className = 'order-btn order-progress-status'
                that.$refs.itemWrap0.querySelector('.order-btn').innerHTML = '已完成'
                that.$refs.itemWrap0.querySelector('.order-btn').style.pointerEvents = 'none'
                that.$refs.itemWrap1.className = 'order-progress-item';
                that.$refs.itemWrap1.querySelector('.order-btn').className = 'order-btn order-progress-status'
                that.$refs.itemWrap1.querySelector('.order-btn').innerHTML = '已完成'
                that.$refs.itemWrap1.querySelector('.order-btn').style.pointerEvents = 'none'
                that.$refs.itemWrap2.className = 'order-progress-item';
                that.$refs.itemWrap2.querySelector('.order-btn').className = 'order-btn order-progress-status'
                that.$refs.itemWrap2.querySelector('.order-btn').innerHTML = '已完成'
                that.$refs.itemWrap2.querySelector('.order-btn').style.pointerEvents = 'none'
                that.$refs.itemWrap3.className = 'order-progress-item';
                that.$refs.itemWrap3.querySelector('.order-btn').className = 'order-btn order-progress-status'
                that.$refs.itemWrap3.querySelector('.order-btn').innerHTML = '已审核'
                //that.$refs.itemWrap3.querySelector('.order-btn').style.pointerEvents = 'none'
                that.$refs.itemWrap4.className = 'order-progress-item';
                that.$refs.itemWrap4.querySelector('.order-btn').className = 'order-btn order-progress-status'
                that.$refs.itemWrap4.querySelector('.order-btn').innerHTML = '审核中'
              }
              else if (state == '0019') {
                that.$refs.itemWrap0.className = 'order-progress-item';
                that.$refs.itemWrap0.querySelector('.order-btn').className = 'order-btn order-progress-status'
                that.$refs.itemWrap0.querySelector('.order-btn').innerHTML = '已完成'
                that.$refs.itemWrap0.querySelector('.order-btn').style.pointerEvents = 'none'
                that.$refs.itemWrap1.className = 'order-progress-item';
                that.$refs.itemWrap1.querySelector('.order-btn').className = 'order-btn order-progress-status'
                that.$refs.itemWrap1.querySelector('.order-btn').innerHTML = '已完成'
                that.$refs.itemWrap1.querySelector('.order-btn').style.pointerEvents = 'none'
                that.$refs.itemWrap2.className = 'order-progress-item';
                that.$refs.itemWrap2.querySelector('.order-btn').className = 'order-btn order-progress-status'
                that.$refs.itemWrap2.querySelector('.order-btn').innerHTML = '已完成'
                that.$refs.itemWrap2.querySelector('.order-btn').style.pointerEvents = 'none'
                that.$refs.itemWrap3.className = 'order-progress-item';
                that.$refs.itemWrap3.querySelector('.order-btn').className = 'order-btn order-progress-status'
                that.$refs.itemWrap3.querySelector('.order-btn').innerHTML = '已审核'
                //that.$refs.itemWrap3.querySelector('.order-btn').style.pointerEvents = 'none'
                that.$refs.itemWrap4.className = 'order-progress-item';
                that.$refs.itemWrap4.querySelector('.order-btn').className = 'order-btn order-progress-status'
                that.$refs.itemWrap4.querySelector('.order-btn').innerHTML = '已审核'
                //that.$refs.itemWrap4.querySelector('.order-btn').style.pointerEvents = 'none'
                that.$refs.itemWrap5.className = 'order-progress-item';
                that.$refs.itemWrap5.querySelector('.order-btn').className = 'order-btn order-progress-status'
                that.$refs.itemWrap5.querySelector('.order-btn').innerHTML = '查看理赔结果'
                //that.$refs.itemWrap6.querySelector('.order-btn').style.pointerEvents = 'auto'
              }
              else if (state == '0018') {
                that.$refs.itemWrap0.className = 'order-progress-item';
                that.$refs.itemWrap0.querySelector('.order-btn').className = 'order-btn order-progress-status'
                that.$refs.itemWrap0.querySelector('.order-btn').innerHTML = '已完成'
                that.$refs.itemWrap0.querySelector('.order-btn').style.pointerEvents = 'none'
                that.$refs.itemWrap1.className = 'order-progress-item';
                that.$refs.itemWrap1.querySelector('.order-btn').className = 'order-btn order-progress-status'
                that.$refs.itemWrap1.querySelector('.order-btn').innerHTML = '已完成'
                that.$refs.itemWrap1.querySelector('.order-btn').style.pointerEvents = 'none'
                that.$refs.itemWrap2.className = 'order-progress-item';
                that.$refs.itemWrap2.querySelector('.order-btn').className = 'order-btn order-progress-status'
                that.$refs.itemWrap2.querySelector('.order-btn').innerHTML = '已完成'
                that.$refs.itemWrap2.querySelector('.order-btn').style.pointerEvents = 'none'
                that.$refs.itemWrap3.className = 'order-progress-item';
                that.$refs.itemWrap3.querySelector('.order-btn').className = 'order-btn order-progress-status'
                that.$refs.itemWrap3.querySelector('.order-btn').innerHTML = '已审核'
                //that.$refs.itemWrap3.querySelector('.order-btn').style.pointerEvents = 'none'
                that.$refs.itemWrap4.className = 'order-progress-item';
                that.$refs.itemWrap4.querySelector('.order-btn').className = 'order-btn order-progress-status'
                that.$refs.itemWrap4.querySelector('.order-btn').innerHTML = '已审核'
                //that.$refs.itemWrap4.querySelector('.order-btn').style.pointerEvents = 'none'
                that.$refs.itemWrap5.className = 'order-progress-item';
                that.$refs.itemWrap5.querySelector('.order-btn').className = 'order-btn order-progress-status'
                that.$refs.itemWrap5.querySelector('.order-btn').style.pointerEvents = 'auto'
                that.$refs.itemWrap5.querySelector('.order-btn').innerHTML = '审核中'
              }
              else if (state == '0020') {
                that.$refs.itemWrap0.className = 'order-progress-item';
                that.$refs.itemWrap0.querySelector('.order-btn').className = 'order-btn order-progress-status'
                that.$refs.itemWrap0.querySelector('.order-btn').innerHTML = '已完成'
                that.$refs.itemWrap0.querySelector('.order-btn').style.pointerEvents = 'none'
                that.$refs.itemWrap1.className = 'order-progress-item';
                that.$refs.itemWrap1.querySelector('.order-btn').className = 'order-btn order-progress-status'
                that.$refs.itemWrap1.querySelector('.order-btn').innerHTML = '已完成'
                that.$refs.itemWrap1.querySelector('.order-btn').style.pointerEvents = 'none'
                that.$refs.itemWrap2.className = 'order-progress-item';
                that.$refs.itemWrap2.querySelector('.order-btn').className = 'order-btn order-progress-status'
                that.$refs.itemWrap2.querySelector('.order-btn').innerHTML = '已完成'
                that.$refs.itemWrap2.querySelector('.order-btn').style.pointerEvents = 'none'
                that.$refs.itemWrap3.className = 'order-progress-item';
                that.$refs.itemWrap3.querySelector('.order-btn').className = 'order-btn order-progress-status'
                that.$refs.itemWrap3.querySelector('.order-btn').innerHTML = '已审核'
                //that.$refs.itemWrap3.querySelector('.order-btn').style.pointerEvents = 'none'
                that.$refs.itemWrap4.className = 'order-progress-item';
                that.$refs.itemWrap4.querySelector('.order-btn').className = 'order-btn order-progress-status'
                that.$refs.itemWrap4.querySelector('.order-btn').innerHTML = '已审核'
                //that.$refs.itemWrap4.querySelector('.order-btn').style.pointerEvents = 'none'
                that.$refs.itemWrap5.className = 'order-progress-item';
                that.$refs.itemWrap5.querySelector('.order-btn').className = 'order-btn order-progress-status'
                that.$refs.itemWrap5.querySelector('.order-btn').innerHTML = '查看理赔结果'
              }
              else if (state == '0021') {
                that.$refs.itemWrap0.className = 'order-progress-item';
                that.$refs.itemWrap0.querySelector('.order-btn').className = 'order-btn order-progress-status'
                that.$refs.itemWrap0.querySelector('.order-btn').innerHTML = '已完成'
                that.$refs.itemWrap0.querySelector('.order-btn').style.pointerEvents = 'none'
                that.$refs.itemWrap1.className = 'order-progress-item';
                that.$refs.itemWrap1.querySelector('.order-btn').className = 'order-btn order-progress-status'
                that.$refs.itemWrap1.querySelector('.order-btn').innerHTML = '已完成'
                that.$refs.itemWrap1.querySelector('.order-btn').style.pointerEvents = 'none'
                that.$refs.itemWrap2.className = 'order-progress-item';
                that.$refs.itemWrap2.querySelector('.order-btn').className = 'order-btn order-progress-status'
                that.$refs.itemWrap2.querySelector('.order-btn').innerHTML = '已完成'
                that.$refs.itemWrap2.querySelector('.order-btn').style.pointerEvents = 'none'
                that.$refs.itemWrap3.className = 'order-progress-item';
                that.$refs.itemWrap3.querySelector('.order-btn').className = 'order-btn order-progress-status'
                that.$refs.itemWrap3.querySelector('.order-btn').innerHTML = '已审核'
                //that.$refs.itemWrap3.querySelector('.order-btn').style.pointerEvents = 'none'
                that.$refs.itemWrap4.className = 'order-progress-item';
                that.$refs.itemWrap4.querySelector('.order-btn').className = 'order-btn order-progress-status'
                that.$refs.itemWrap4.querySelector('.order-btn').innerHTML = '已审核'
                //that.$refs.itemWrap4.querySelector('.order-btn').style.pointerEvents = 'none'
                that.$refs.itemWrap5.className = 'order-progress-item';
                that.$refs.itemWrap5.querySelector('.order-btn').className = 'order-btn order-progress-status'
                that.$refs.itemWrap5.querySelector('.order-btn').innerHTML = '查看理赔结果'
              }
            }
          })
          loaded('done');
      }, 2000);
      },
      jumpLink(url, orderStatus) {
        if (orderStatus != null && orderStatus != '') {
          this.$router.push({path: url, query: {'orderStatus': orderStatus}});
        } else {
          this.$router.push(url);
        }
      },
      backChoose() {
        this.$router.push('/order/list')
      },
      loop(){
        var status = this.orderStates
        if(status=='0019'||status=='0020'||status=='0021'){
          this.jumpLink('/order/ClaimResult',status)
        }
        if(status=='0018'|| status=='0017'){
          this.jumpLink('/order/uploadfee',status)
        }
      },
      /*curTime() {
        var date = new Date();
        var y = date.getFullYear();
        var m = date.getMonth() + 1;
        m = m < 10 ? ('0' + m) : m;
        var d = date.getDate();
        d = d < 10 ? ('0' + d) : d;
        var h = date.getHours();
        var minute = date.getMinutes();
        var second = date.getSeconds();
        minute = minute < 10 ? ('0' + minute) : minute;
        second = second < 10 ? ('0' + second) : second;
        return y + '-' + m + '-' + d + ' ' + h + ':' + minute + ':' + second;
      },*/
      OrderInfoConfirm() {
        var that = this;
        var orderId = that.$data.orderNumber;
        confirmOrderInfo(orderId).then(data => {
          if (data.data.success == 'OK') {
            that.$data.orderStates = data.data.data.orderStates;
            that.$refs.itemWrap0.className = 'order-progress-item';
            that.$refs.itemWrap0.querySelector('.order-btn').className = 'order-btn order-progress-status'
            that.$refs.itemWrap0.querySelector('.order-btn').innerHTML = '已完成'
            that.$refs.itemWrap0.querySelector('.order-btn').style.pointerEvents = 'none'
            that.$refs.itemWrap1.querySelector('.button-progress').style.pointerEvents = 'auto'
          } else {
            this.$yjToast(data.data.message);
          }
        })
      },
      hospitalDetailHandler() {
        this.hospitalDetailShow = true;
      },
      getRemark(msg) {
        this.remarkDetail = msg
      },
      hospitalDetailConfirm: function () {
        var orderId = this.$data.orderNumber;
        var remark = this.$data.remarkDetail;
        var that = this;

        communicatHospitalDetail(orderId, remark).then(data => {
          this.hospitalDetailShow = false;
          if (data.data.success == 'OK') {
            that.$data.orderStates = data.data.data.orderStates;
            that.$refs.itemWrap1.className = 'order-progress-item';
            that.$refs.itemWrap1.querySelector('.order-btn').className = 'order-btn order-progress-status'
            that.$refs.itemWrap1.querySelector('.order-btn').innerHTML = '已完成'
            that.$refs.itemWrap1.querySelector('.order-btn').style.pointerEvents = 'none'
            that.$refs.itemWrap2.querySelector('.button-progress').style.pointerEvents = 'auto'
          } else {
            this.$yjToast(data.data.message);
          }
        })
      },
      agreementHandler() {
        this.agreementShow = true;
      },
      agreementConfirm() {
        var that = this;
        var orderId = this.$data.orderNumber;
        confirmAgreement(orderId).then(data => {
          this.agreementShow = false;
          if (data.data.success == 'OK') {
            that.$data.orderStates = data.data.data.orderStates;
            that.$refs.itemWrap2.className = 'order-progress-item';
            that.$refs.itemWrap2.querySelector('.order-btn').className = 'order-btn order-progress-status'
            that.$refs.itemWrap2.querySelector('.order-btn').innerHTML = '已完成'
            that.$refs.itemWrap2.querySelector('.order-btn').style.pointerEvents = 'none'
            that.$refs.itemWrap3.querySelector('.button-progress').style.pointerEvents = 'auto'
          } else {
            this.$yjToast(data.data.message);
          }
        })
      },
      /*orderCostHandler() {
        this.orderCostShow = true;
      },
      orderCostConfirm() {
        var that = this;
        var orderId = this.$data.orderNumber;
        confirmOrderCosts(orderId).then(data => {
          this.orderCostShow = false;
          if (data.data.success == 'OK') {
            //that.$data.orderStates = data.data.data.orderStates;
            that.$refs.itemWrap6.className = 'order-progress-item';
            that.$data.orderStates = '0020'
            that.$refs.itemWrap6.querySelector('.order-btn').className = 'order-btn order-progress-status'
            that.$refs.itemWrap6.querySelector('.order-btn').innerHTML = '完成'
            that.$refs.itemWrap6.querySelector('.order-btn').style.pointerEvents = 'none'
          } else {
            this.$yjToast(data.data.message);
          }
        })
      }*/
    },
    mounted: function () {
      const orderId = JSON.parse(getLocalStorage('orderId'));
      console.log(orderId);
      var that = this;
      //this.$data.currentTime = this.curTime();
      getOrderDetail(orderId).then(data => {
        var result = data.data.data;
        //order-progress-status
        if (result != null) {
          that.$data.orderNumber = result.orderNumber;
          that.$data.applyName = result.name;
          that.$data.hosptailName = result.hosptailName;
          that.$data.departmentName = result.departmentName;
          that.$data.linkName = result.linkName;
          that.$data.linkPhone = result.linkPhone;
          that.$data.remark = result.remark;
          that.$data.description = result.description;
          that.$data.orderStates = result.orderStates;
          var state = that.$data.orderStates;
          if (state == '0007') {
            that.$refs.itemWrap0.className = 'order-progress-item';
            that.$refs.itemWrap0.querySelector('.order-btn').className = 'order-btn order-progress-status'
            that.$refs.itemWrap0.querySelector('.order-btn').innerHTML = '已完成'
            that.$refs.itemWrap0.querySelector('.order-btn').style.pointerEvents = 'none'
            that.$refs.itemWrap1.querySelector('.order-btn').style.pointerEvents = 'auto'
          }
          else if (state == '0008') {
            that.$refs.itemWrap0.className = 'order-progress-item';
            that.$refs.itemWrap0.querySelector('.order-btn').className = 'order-btn order-progress-status'
            that.$refs.itemWrap0.querySelector('.order-btn').innerHTML = '已完成'
            that.$refs.itemWrap0.querySelector('.order-btn').style.pointerEvents = 'none'
            that.$refs.itemWrap1.className = 'order-progress-item';
            that.$refs.itemWrap1.querySelector('.order-btn').className = 'order-btn order-progress-status'
            that.$refs.itemWrap1.querySelector('.order-btn').innerHTML = '已完成'
            that.$refs.itemWrap1.querySelector('.order-btn').style.pointerEvents = 'none'
            that.$refs.itemWrap2.querySelector('.order-btn').style.pointerEvents = 'auto'
          }
          else if (state == '0010') {
            that.$refs.itemWrap0.className = 'order-progress-item';
            that.$refs.itemWrap0.querySelector('.order-btn').className = 'order-btn order-progress-status'
            that.$refs.itemWrap0.querySelector('.order-btn').innerHTML = '已完成'
            that.$refs.itemWrap0.querySelector('.order-btn').style.pointerEvents = 'none'
            that.$refs.itemWrap1.className = 'order-progress-item';
            that.$refs.itemWrap1.querySelector('.order-btn').className = 'order-btn order-progress-status'
            that.$refs.itemWrap1.querySelector('.order-btn').innerHTML = '已完成'
            that.$refs.itemWrap1.querySelector('.order-btn').style.pointerEvents = 'none'
            that.$refs.itemWrap2.className = 'order-progress-item';
            that.$refs.itemWrap2.querySelector('.order-btn').className = 'order-btn order-progress-status'
            that.$refs.itemWrap2.querySelector('.order-btn').innerHTML = '已完成'
            that.$refs.itemWrap2.querySelector('.order-btn').style.pointerEvents = 'none'
            that.$refs.itemWrap3.querySelector('.order-btn').style.pointerEvents = 'auto'
          }
          else if (state == '0015') {
            that.$refs.itemWrap0.className = 'order-progress-item';
            that.$refs.itemWrap0.querySelector('.order-btn').className = 'order-btn order-progress-status'
            that.$refs.itemWrap0.querySelector('.order-btn').innerHTML = '已完成'
            that.$refs.itemWrap0.querySelector('.order-btn').style.pointerEvents = 'none'
            that.$refs.itemWrap1.className = 'order-progress-item';
            that.$refs.itemWrap1.querySelector('.order-btn').className = 'order-btn order-progress-status'
            that.$refs.itemWrap1.querySelector('.order-btn').innerHTML = '已完成'
            that.$refs.itemWrap1.querySelector('.order-btn').style.pointerEvents = 'none'
            that.$refs.itemWrap2.className = 'order-progress-item';
            that.$refs.itemWrap2.querySelector('.order-btn').className = 'order-btn order-progress-status'
            that.$refs.itemWrap2.querySelector('.order-btn').innerHTML = '已完成'
            that.$refs.itemWrap2.querySelector('.order-btn').style.pointerEvents = 'none'
            that.$refs.itemWrap3.className = 'order-progress-item';
            that.$refs.itemWrap3.querySelector('.order-btn').className = 'order-btn order-progress-status'
            that.$refs.itemWrap3.querySelector('.order-btn').innerHTML = '已审核'
            //that.$refs.itemWrap3.querySelector('.order-btn').style.pointerEvents = 'none'
            that.$refs.itemWrap4.querySelector('.order-btn').style.pointerEvents = 'auto'
          }
          else if (state == '0014') {
            that.$refs.itemWrap0.className = 'order-progress-item';
            that.$refs.itemWrap0.querySelector('.order-btn').className = 'order-btn order-progress-status'
            that.$refs.itemWrap0.querySelector('.order-btn').innerHTML = '已完成'
            that.$refs.itemWrap0.querySelector('.order-btn').style.pointerEvents = 'none'
            that.$refs.itemWrap1.className = 'order-progress-item';
            that.$refs.itemWrap1.querySelector('.order-btn').className = 'order-btn order-progress-status'
            that.$refs.itemWrap1.querySelector('.order-btn').innerHTML = '已完成'
            that.$refs.itemWrap1.querySelector('.order-btn').style.pointerEvents = 'none'
            that.$refs.itemWrap2.className = 'order-progress-item';
            that.$refs.itemWrap2.querySelector('.order-btn').className = 'order-btn order-progress-status'
            that.$refs.itemWrap2.querySelector('.order-btn').innerHTML = '已完成'
            that.$refs.itemWrap2.querySelector('.order-btn').style.pointerEvents = 'none'
            that.$refs.itemWrap3.className = 'order-progress-item';
            that.$refs.itemWrap3.querySelector('.order-btn').className = 'order-btn order-progress-status'
            that.$refs.itemWrap3.querySelector('.order-btn').innerHTML = '审核中'
          }
          else if (state == '0017') {
            that.$refs.itemWrap0.className = 'order-progress-item';
            that.$refs.itemWrap0.querySelector('.order-btn').className = 'order-btn order-progress-status'
            that.$refs.itemWrap0.querySelector('.order-btn').innerHTML = '已完成'
            that.$refs.itemWrap0.querySelector('.order-btn').style.pointerEvents = 'none'
            that.$refs.itemWrap1.className = 'order-progress-item';
            that.$refs.itemWrap1.querySelector('.order-btn').className = 'order-btn order-progress-status'
            that.$refs.itemWrap1.querySelector('.order-btn').innerHTML = '已完成'
            that.$refs.itemWrap1.querySelector('.order-btn').style.pointerEvents = 'none'
            that.$refs.itemWrap2.className = 'order-progress-item';
            that.$refs.itemWrap2.querySelector('.order-btn').className = 'order-btn order-progress-status'
            that.$refs.itemWrap2.querySelector('.order-btn').innerHTML = '已完成'
            that.$refs.itemWrap2.querySelector('.order-btn').style.pointerEvents = 'none'
            that.$refs.itemWrap3.className = 'order-progress-item';
            that.$refs.itemWrap3.querySelector('.order-btn').className = 'order-btn order-progress-status'
            that.$refs.itemWrap3.querySelector('.order-btn').innerHTML = '已审核'
            //that.$refs.itemWrap3.querySelector('.order-btn').style.pointerEvents = 'none'
            that.$refs.itemWrap4.className = 'order-progress-item';
            that.$refs.itemWrap4.querySelector('.order-btn').className = 'order-btn order-progress-status'
            that.$refs.itemWrap4.querySelector('.order-btn').innerHTML = '已审核'
            //that.$refs.itemWrap4.querySelector('.order-btn').style.pointerEvents = 'none'
            that.$refs.itemWrap5.querySelector('.order-btn').style.pointerEvents = 'auto'
          }
          else if (state == '0016') {
            that.$refs.itemWrap0.className = 'order-progress-item';
            that.$refs.itemWrap0.querySelector('.order-btn').className = 'order-btn order-progress-status'
            that.$refs.itemWrap0.querySelector('.order-btn').innerHTML = '已完成'
            that.$refs.itemWrap0.querySelector('.order-btn').style.pointerEvents = 'none'
            that.$refs.itemWrap1.className = 'order-progress-item';
            that.$refs.itemWrap1.querySelector('.order-btn').className = 'order-btn order-progress-status'
            that.$refs.itemWrap1.querySelector('.order-btn').innerHTML = '已完成'
            that.$refs.itemWrap1.querySelector('.order-btn').style.pointerEvents = 'none'
            that.$refs.itemWrap2.className = 'order-progress-item';
            that.$refs.itemWrap2.querySelector('.order-btn').className = 'order-btn order-progress-status'
            that.$refs.itemWrap2.querySelector('.order-btn').innerHTML = '已完成'
            that.$refs.itemWrap2.querySelector('.order-btn').style.pointerEvents = 'none'
            that.$refs.itemWrap3.className = 'order-progress-item';
            that.$refs.itemWrap3.querySelector('.order-btn').className = 'order-btn order-progress-status'
            that.$refs.itemWrap3.querySelector('.order-btn').innerHTML = '已审核'
            //that.$refs.itemWrap3.querySelector('.order-btn').style.pointerEvents = 'none'
            that.$refs.itemWrap4.className = 'order-progress-item';
            that.$refs.itemWrap4.querySelector('.order-btn').className = 'order-btn order-progress-status'
            that.$refs.itemWrap4.querySelector('.order-btn').innerHTML = '审核中'
          }
          else if (state == '0019') {
            that.$refs.itemWrap0.className = 'order-progress-item';
            that.$refs.itemWrap0.querySelector('.order-btn').className = 'order-btn order-progress-status'
            that.$refs.itemWrap0.querySelector('.order-btn').innerHTML = '已完成'
            that.$refs.itemWrap0.querySelector('.order-btn').style.pointerEvents = 'none'
            that.$refs.itemWrap1.className = 'order-progress-item';
            that.$refs.itemWrap1.querySelector('.order-btn').className = 'order-btn order-progress-status'
            that.$refs.itemWrap1.querySelector('.order-btn').innerHTML = '已完成'
            that.$refs.itemWrap1.querySelector('.order-btn').style.pointerEvents = 'none'
            that.$refs.itemWrap2.className = 'order-progress-item';
            that.$refs.itemWrap2.querySelector('.order-btn').className = 'order-btn order-progress-status'
            that.$refs.itemWrap2.querySelector('.order-btn').innerHTML = '已完成'
            that.$refs.itemWrap2.querySelector('.order-btn').style.pointerEvents = 'none'
            that.$refs.itemWrap3.className = 'order-progress-item';
            that.$refs.itemWrap3.querySelector('.order-btn').className = 'order-btn order-progress-status'
            that.$refs.itemWrap3.querySelector('.order-btn').innerHTML = '已审核'
            //that.$refs.itemWrap3.querySelector('.order-btn').style.pointerEvents = 'none'
            that.$refs.itemWrap4.className = 'order-progress-item';
            that.$refs.itemWrap4.querySelector('.order-btn').className = 'order-btn order-progress-status'
            that.$refs.itemWrap4.querySelector('.order-btn').innerHTML = '已审核'
            //that.$refs.itemWrap4.querySelector('.order-btn').style.pointerEvents = 'none'
            that.$refs.itemWrap5.className = 'order-progress-item';
            that.$refs.itemWrap5.querySelector('.order-btn').className = 'order-btn order-progress-status'
            that.$refs.itemWrap5.querySelector('.order-btn').innerHTML = '查看理赔结果'
            //that.$refs.itemWrap6.querySelector('.order-btn').style.pointerEvents = 'auto'
          }
          else if (state == '0018') {
            that.$refs.itemWrap0.className = 'order-progress-item';
            that.$refs.itemWrap0.querySelector('.order-btn').className = 'order-btn order-progress-status'
            that.$refs.itemWrap0.querySelector('.order-btn').innerHTML = '已完成'
            that.$refs.itemWrap0.querySelector('.order-btn').style.pointerEvents = 'none'
            that.$refs.itemWrap1.className = 'order-progress-item';
            that.$refs.itemWrap1.querySelector('.order-btn').className = 'order-btn order-progress-status'
            that.$refs.itemWrap1.querySelector('.order-btn').innerHTML = '已完成'
            that.$refs.itemWrap1.querySelector('.order-btn').style.pointerEvents = 'none'
            that.$refs.itemWrap2.className = 'order-progress-item';
            that.$refs.itemWrap2.querySelector('.order-btn').className = 'order-btn order-progress-status'
            that.$refs.itemWrap2.querySelector('.order-btn').innerHTML = '已完成'
            that.$refs.itemWrap2.querySelector('.order-btn').style.pointerEvents = 'none'
            that.$refs.itemWrap3.className = 'order-progress-item';
            that.$refs.itemWrap3.querySelector('.order-btn').className = 'order-btn order-progress-status'
            that.$refs.itemWrap3.querySelector('.order-btn').innerHTML = '已审核'
            //that.$refs.itemWrap3.querySelector('.order-btn').style.pointerEvents = 'none'
            that.$refs.itemWrap4.className = 'order-progress-item';
            that.$refs.itemWrap4.querySelector('.order-btn').className = 'order-btn order-progress-status'
            that.$refs.itemWrap4.querySelector('.order-btn').innerHTML = '已审核'
            //that.$refs.itemWrap4.querySelector('.order-btn').style.pointerEvents = 'none'
            that.$refs.itemWrap5.className = 'order-progress-item';
            that.$refs.itemWrap5.querySelector('.order-btn').className = 'order-btn order-progress-status'
            that.$refs.itemWrap5.querySelector('.order-btn').style.pointerEvents = 'auto'
            that.$refs.itemWrap5.querySelector('.order-btn').innerHTML = '审核中'
          }
          else if (state == '0020') {
            that.$refs.itemWrap0.className = 'order-progress-item';
            that.$refs.itemWrap0.querySelector('.order-btn').className = 'order-btn order-progress-status'
            that.$refs.itemWrap0.querySelector('.order-btn').innerHTML = '已完成'
            that.$refs.itemWrap0.querySelector('.order-btn').style.pointerEvents = 'none'
            that.$refs.itemWrap1.className = 'order-progress-item';
            that.$refs.itemWrap1.querySelector('.order-btn').className = 'order-btn order-progress-status'
            that.$refs.itemWrap1.querySelector('.order-btn').innerHTML = '已完成'
            that.$refs.itemWrap1.querySelector('.order-btn').style.pointerEvents = 'none'
            that.$refs.itemWrap2.className = 'order-progress-item';
            that.$refs.itemWrap2.querySelector('.order-btn').className = 'order-btn order-progress-status'
            that.$refs.itemWrap2.querySelector('.order-btn').innerHTML = '已完成'
            that.$refs.itemWrap2.querySelector('.order-btn').style.pointerEvents = 'none'
            that.$refs.itemWrap3.className = 'order-progress-item';
            that.$refs.itemWrap3.querySelector('.order-btn').className = 'order-btn order-progress-status'
            that.$refs.itemWrap3.querySelector('.order-btn').innerHTML = '已审核'
            //that.$refs.itemWrap3.querySelector('.order-btn').style.pointerEvents = 'none'
            that.$refs.itemWrap4.className = 'order-progress-item';
            that.$refs.itemWrap4.querySelector('.order-btn').className = 'order-btn order-progress-status'
            that.$refs.itemWrap4.querySelector('.order-btn').innerHTML = '已审核'
            //that.$refs.itemWrap4.querySelector('.order-btn').style.pointerEvents = 'none'
            that.$refs.itemWrap5.className = 'order-progress-item';
            that.$refs.itemWrap5.querySelector('.order-btn').className = 'order-btn order-progress-status'
            that.$refs.itemWrap5.querySelector('.order-btn').innerHTML = '查看理赔结果'
          }
          else if (state == '0021') {
            that.$refs.itemWrap0.className = 'order-progress-item';
            that.$refs.itemWrap0.querySelector('.order-btn').className = 'order-btn order-progress-status'
            that.$refs.itemWrap0.querySelector('.order-btn').innerHTML = '已完成'
            that.$refs.itemWrap0.querySelector('.order-btn').style.pointerEvents = 'none'
            that.$refs.itemWrap1.className = 'order-progress-item';
            that.$refs.itemWrap1.querySelector('.order-btn').className = 'order-btn order-progress-status'
            that.$refs.itemWrap1.querySelector('.order-btn').innerHTML = '已完成'
            that.$refs.itemWrap1.querySelector('.order-btn').style.pointerEvents = 'none'
            that.$refs.itemWrap2.className = 'order-progress-item';
            that.$refs.itemWrap2.querySelector('.order-btn').className = 'order-btn order-progress-status'
            that.$refs.itemWrap2.querySelector('.order-btn').innerHTML = '已完成'
            that.$refs.itemWrap2.querySelector('.order-btn').style.pointerEvents = 'none'
            that.$refs.itemWrap3.className = 'order-progress-item';
            that.$refs.itemWrap3.querySelector('.order-btn').className = 'order-btn order-progress-status'
            that.$refs.itemWrap3.querySelector('.order-btn').innerHTML = '已审核'
            //that.$refs.itemWrap3.querySelector('.order-btn').style.pointerEvents = 'none'
            that.$refs.itemWrap4.className = 'order-progress-item';
            that.$refs.itemWrap4.querySelector('.order-btn').className = 'order-btn order-progress-status'
            that.$refs.itemWrap4.querySelector('.order-btn').innerHTML = '已审核'
            //that.$refs.itemWrap4.querySelector('.order-btn').style.pointerEvents = 'none'
            that.$refs.itemWrap5.className = 'order-progress-item';
            that.$refs.itemWrap5.querySelector('.order-btn').className = 'order-btn order-progress-status'
            that.$refs.itemWrap5.querySelector('.order-btn').innerHTML = '查看理赔结果'
          }
        }
      })
    }
  }
</script>

<style scoped lang="less">
  @import '../../../assets/styles/base.less';

  button.order-progress-status{
    border:0px;
    background-color:transparent;
  }
  .order-detail-container {
    width: 100%;
    height: 100vh;
    overflow-y: auto;
    padding-top: 1.333rem;
    position: fixed;
    left: 0;
    top: 0;
    background: #F8F8F8;
    z-index: 15;
  }

  .order-detail-header {
    width: 100%;
    height: 1.333rem;
    background: #E49A2D;
    position: fixed;
    z-index: 99;
    top: 0;
    left: 0;
    color: @text-color-white;
  }

  .order-detail-back {
    width: 1.333rem;
    height: 1.333rem;
    line-height: 1.333rem;
    text-align: center;
    font-size: 0.3733rem;
    position: relative;
    z-index: 10;
  }

  .order-detail-title {
    width: 100%;
    height: 1.333rem;
    line-height: 1.333rem;
    text-align: center;
    position: absolute;
    left: 0;
    top: 0;
    font-size: 0.4rem;
  }

  .order-detail-list {
    border-bottom: 1px solid #EBECF1;
    font-size: 0.3733rem;
    padding-bottom: 0.3733rem;
    background: @bg-white;
  }

  .order-detail-item {
    display: flex;
    align-items: center;
    line-height: 0.38rem;
    padding: 0.4rem 0.32rem 0 0.32rem;
  }

  .order-detail-label {
    width: calc(~"100% - 5.333rem");
    color: #999999;
  }

  .order-detail-value {
    width: 5.333rem;
    text-align: right;
    color: #333333;
    margin-left: auto;
  }

  .order-detail-wrapper-sm {
    height: 1.9466rem;
    overflow-y: hidden;
    border-bottom: 1px solid #EBECF1;
  }

  .order-detail-trigger {
    width: 100%;
    height: 0.8rem;
    line-height: 0.8rem;
    text-align: center;
    background: @bg-white;
    display: flex;
    align-items: center;
    justify-content: center;
    border-bottom: 1px solid #EBECF1;
    color: #E49A2D;
  }

  .order-progress-list {
    width: 100%;
    padding: 0.5333rem 0.32rem;
    background: @bg-white;
    border-bottom: 1px solid #EBECF1;
    border-top: 1px solid #EBECF1;
  }

  .order-progress-item {
    display: flex;
    margin-top: 0.3866rem;

    &:first-child {
      margin-top: 0;
    }

    &:last-child {
      .order-progress-line2 {
        display: none;
      }
    }
  }

  .order-progress-item-not .order-progress-title {
    color: #A7A7A7;
  }

  .order-progress-bar {
    padding-top: 0.06rem;
    position: relative;
  }

  .order-process-info {
    font-size: 0.3733rem;
    height: 1.2rem;
    padding: 0 0.4rem;
    display: flex;
  }

  .order-progress-title {
    color: #333333;
  }

  .order-progress-time {
    color: #999999;
    font-size: 0.32rem;
    margin-top: 0.2rem;
  }

  .order-progress-dot {
    width: 0.4rem;
    height: 0.4rem;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.32rem;
    border-radius: 100%;
    background: #E49A2D;
    color: @text-color-white;
    position: relative;
    z-index: 10;
  }

  .order-progress-line1 {
    width: 2px;
    height: 0.60rem;
    background: #E49A2D;
    position: absolute;
    left: calc(~"50% - 1px");
    top: -0.55rem;
  }

  .order-progress-line2 {
    width: 2px;
    height: 0.60rem;
    background: #E49A2D;
    position: absolute;
    left: calc(~"50% - 1px");
  }

  .order-progress-item-not .order-progress-line1, .order-progress-item-not .order-progress-line2 {
    background: #EEEEEE;
  }

  .order-progress-item-not .order-progress-dot {
    background: @bg-white;
    border: 1px solid #EEEEEE;
    color: #C4C5CE;
  }

  .order-progress-opts {
    margin-left: auto;
  }

  .order-progress-status {
    color: #999999;
    font-size: 0.3733rem;
  }

  .icon-more {
    width: 0.2133rem;
    margin-left: 0.1333rem;
  }

  .button-progress{
    pointer-events:none;
  }

  .orange{
    color: #E49A2D;
  }
</style>
