import axios from 'axios';
import Vue from 'vue';
import { API_URL, APP_URL, getLocalStorage} from '../assets/scripts/utils.js';

const REQ_INSTANCE = axios.create({
  timeout: 50000,
  withCredentials: true,
  baseURL: API_URL,
});

/**
 * [请求统一处理代码]
 * @param  {[type]} config [description]
 * @return {[type]}        [description]
 */
REQ_INSTANCE.interceptors.request.use(config => {
  Vue.yjToast('加载中...');

  //线上
  config.data['openid'] = getLocalStorage('access_token') || '12345';
  config.data['openId'] = getLocalStorage('access_token') || '12345';
  config.data['wechatOpenId'] = getLocalStorage('access_token') || '12345';
  config.data['userId'] = JSON.parse(getLocalStorage('uid'));
  config.data['doctorId'] = JSON.parse(getLocalStorage('doctorId'));

  //本地
  // config.data['openId'] = 'oRIU60SOngq1631KzmF8pHPZzjj4';
  // config.data['openid'] = 'oRIU60SOngq1631KzmF8pHPZzjj4';
  // config.data['wechatOpenId'] = 'oRIU60SOngq1631KzmF8pHPZzjj4';

  return config;
}, error => {
  console.log(error);
  return Promise.reject(error)
})

/**
 * [响应统一处理代码]
 * @param  {[type]} response [description]
 * @return {[type]}          [description]
 */
REQ_INSTANCE.interceptors.response.use(response => {
  Vue.yjToast.end();
  if (response.status > 300) {
    Vue.yjToast('服务器出错，请联系客服！');
  }
  return response;
}, error => {
  return Promise.reject(error)
})


/**
 * [获取优加服务列表]
 * @return {[type]} [description]
 */
export const getServices = () => {
  return REQ_INSTANCE.post('/WeixinApi/query/yjService', {

  })
}

/**
 * [判断用户是否享有该服务]
 * @param  {[type]} openid   [description]
 * @param  {[type]} yjServiceId [description]
 * @param  {[type]} yjServiceName [description]
 * @return {[type]}               [description]
 */
export const checkService = (yjServiceId, yjServiceName) => {
  return REQ_INSTANCE.post('/WeixinApi/query/isService', {
    yjServiceId: yjServiceId,
    yjServiceName: yjServiceName
  })
}

/**
 * [登录验证]
 * @param  {[type]} openid      [description]
 * @param  {[type]} phone      [description]
 * @param  {[type]} rsPassword [description]
 * @return {[type]}            [description]
 */
export const userValid = (phone, password, openid) => {
  return REQ_INSTANCE.post('/OfflineSystem/login/Validate', {
    phone: phone,
    rsPassword: password,
    openid: openid
  })
}

/**
 * [获取用户订单列表]
 * @param  {[type]}  phone  [description]
 * @return {[type]} [description]
 */
export const getOrders = (phone) => {
  return REQ_INSTANCE.post('/OfflineSystem/find/orderList', {
    phone: phone
  })
}

/**
 * [获取订单详情]
 * @param  {[type]} orderId [description]
 * @return {[type]}    [description]
 */
export const getOrderDetail = (id) => {
  var param = {orderId: id}
  return REQ_INSTANCE.post('/OfflineSystem/find/orderDetail', param);
}

/**
 * [取消订单]
 * @param  {[type]} orderId [description]
 * @return {[type]}         [description]
 */
export const cancelOrder = (orderId) => {
  return REQ_INSTANCE.post('/WeixinApi/colseOrder', {
    orderId: orderId
  })
}

/**
 * [删除订单]
 * @param  {[type]} orderId [description]
 * @return {[type]}         [description]
 */
export const deleteOrder = (orderId) => {
  return REQ_INSTANCE.post('//WeixinApi/colseByOrder', {
    orderId: orderId
  })
}

/**
 * [校验手机号码]
 * @param  {[type]} phone [description]
 * @param  {[type]} code  [description]
 * @return {[type]}       [description]
 */
export const checkMobileCode = (phone, code) => {
  return REQ_INSTANCE.post('/WeixinApi/audit/MobileCode', {
    phone: phone,
    code: code
  })
}

/**
 * [更换手机号]
 * @param  {[type]} phone [description]
 * @param  {[type]} openid [description]
 * @return {[type]}       [description]
 */
export const updatePhone = (phone) => {
  return REQ_INSTANCE.post('/WeixinApi/update/Mobile', {
    phone: phone
  })
}

/**
 * [微信绑定]
 * @param  {[type]} name     [description]
 * @param  {[type]} idNumber [description]
 * @param  {[type]} phone    [description]
 * @param  {[type]} wechatOpenId    [description]
 * @return {[type]}          [description]
 */
export const bindWechat = (name, idNumber, phone) => {
  return REQ_INSTANCE.post('/userInfo/bound/weChatBoundSysUser', {
    name: name,
    idNumber: idNumber,
    phone: phone
  });
}

/**
 * [解绑]
 * @return {[type]} [description]
 */
export const unBindWechat = () => {
  return REQ_INSTANCE.post('/WeixinApi/bound/unbindWeChat', {

  })
}

/**
 * [判断微信是否绑定]
 * @return {[type]} [description]
 */
export const isBind = () => {
  return REQ_INSTANCE.post('/WeixinApi/bound/judgeWechatIsBound', {

  })
}

/**
 * [发送手机验证码]
 * @param  {[type]} phone [description]
 * @return {[type]}       [description]
 */
export const sendCode = (phone) => {
  return REQ_INSTANCE.post('/WeixinApi/send/MobileCode', {
    phone: phone
  });
}

/**
 * [验证验证码]
 * @param  {[type]} phone [description]
 * @param  {[type]} code  [description]
 * @return {[type]}       [description]
 */
export const codeCheck = (phone, code) => {
  return REQ_INSTANCE.post('/newsystem/audit/MobileCode', {
    phone: phone,
    code: code
  })
}

/**
 * [修改密码]
 * @param  {[type]} phone [description]
 * @param  {[type]} rsPassword  [description]
 * @return {[type]}       [description]
 */
export const editPassword = (phone, password) => {
  return REQ_INSTANCE.post('/OfflineSystem/update/reaidentStaffPassword', {
    phone: phone,
    rsPassword: password
  })
}

/**
 * [确认订单信息]
 * @param  {[type]} orderId [description]
 * @return {[type]}       [description]
 */
export const confirmOrderInfo = (orderId) => {
  return REQ_INSTANCE.post('/OfflineSystem/find/confirmOrder', {
    orderId: orderId
  })
}

/**
 * [沟通住院细节]
 * @param  {[type]} orderNumber [description]
 * @param  {[type]} customerRemark  [description]
 * @return {[type]}       [description]
 */
export const communicatHospitalDetail = (orderId, remark) => {
  return REQ_INSTANCE.post('/OfflineSystem/confirmUser', {
    orderNumber: orderId,
    customerRemark: remark
  })
}

/**
 * [检查并确认相关协议无误]
 * @param  {[type]} orderNumber [description]
 * @return {[type]}       [description]
 */
export const confirmAgreement = (orderId) => {
  return REQ_INSTANCE.post('/OfflineSystem/confirmStuff', {
    orderNumber: orderId
  })
}

/**
 * [上传图片]
 * @param  {[type]} orderId [description]
 * @return {[type]}       [description]
 */
export const upload = (orderId) => {
  return REQ_INSTANCE.post('/medicalservice/push', {
    orderNumber: orderId
  })
}

/**
 * [修改订单状态]
 * @param  {[type]} orderNumber [description]
 * @param  {[type]} orderStates [description]
 * @return {[type]}       [description]
 */
export const changeOrderState = (orderId,orderState) => {
  return REQ_INSTANCE.post('/OfflineSystem/modfiyStates', {
    orderNumber: orderId,
    orderStates: orderState
  })
}

/**
 * [查看费用结算]
 * @param  {[type]} orderNumber [description]
 * @return {[type]}       [description]
 */
export const reviewOrderCosts = (orderId) => {
  return REQ_INSTANCE.post('/OfflineSystem/checkOrderCost', {
    orderNumber: orderId
  })
}

/**
 * [确认费用结算]
 * @param  {[type]} orderNumber [description]
 * @return {[type]}       [description]
 */
export const confirmOrderCosts = (orderId) => {
  return REQ_INSTANCE.post('/OfflineSystem/confirmOrderCost', {
    orderNumber: orderId
  })
}

/**
 * [初始化jssdk配置]
 * @return {[type]} [description]
 */
export const initJssdk = () => {
  return REQ_INSTANCE.post('/medicalservice/newWeiXinJsapiSignature', {
     url: APP_URL
  });
}

/**
 * [保存文件信息]  图片回显
 * @param  {[type]} orderNumber   [description]
 * @return {[type]}             [description]
 */
export const savePic = (orderNumber) => {
  return REQ_INSTANCE.post('/OfflineSystem/findEnclos', {
    orderNumber: orderNumber
  })
}

//上传图片
export const saveFile = (orderNumber, serverId, enclosureType, enclosureName) => {
  return REQ_INSTANCE.post('/medicalservice/uploadAndDownMedia', {
    orderNumber: orderNumber,
    serverId: serverId,
    enclosureType: enclosureType,
    enclosureName: enclosureName
  })
}

/**
 * [删除文件]
 * @param  {[type]} enclosureId [description]
 * @return {[type]}             [description]
 */
export const deleteFile = (enclosureId) => {
  return REQ_INSTANCE.post('/medicalservice/delete', {
    enclosureId: enclosureId
  });
}

/**
 * [用户身份验证]
 * @param  {[type]} name     [description]
 * @param  {[type]} idNumber [description]
 * @param  {[type]} openid [description]
 * @return {[type]}          [description]
 */
export const checkUserInfo = (name, idNumber) => {
  return REQ_INSTANCE.post('/WeixinApi/find/pduan', {
    name: name,
    idNumber: idNumber
  });
}

/**
 * [评价详情]
 * @param  {[type]} orderMainId [description]
 * @return {[type]}             [description]
 */
export const commentDetail = (orderMainId) => {
  return REQ_INSTANCE.post('/CustomerApr/QueryAppointmentHospital', {
    orderMainId: orderMainId
  });
}

/**
 * [初始化用户信息]
 * @return {[type]} [description]
 */
export const getUserinfo = () => {
  return REQ_INSTANCE.post('/WeixinApi/find/userDetail', {

  });
}

/** [通过code获得基本用户信息]
 * @param  {[type]} code [description]
 * @return {[type]}             [description]
 */
export const codeGetOpenid = (code) => {
  return REQ_INSTANCE.post('/portal/user/getOAuth2UserInfo', {

  });
}

/**
 * [绑定用户]
 * @param  {[type]} idNumber [description]
 * @param  {[type]} username [description]
 * @param  {[type]} phone    [description]
 * @param  {[type]} wechatOpenId     [description]
 * @return {[type]}          [description]
 */
export const bindUser = (idNumber, username, phone) => {
  return REQ_INSTANCE.post('/WeixinApi/bound/weChatBoundSysUser', {
    idNumber: idNumber,
    name: username,
    phone: phone
  });
}

/**
 * [费用结算确认收款]
 * @param  {[type]}  [description]
 */
export const underLineMoney = (orderId, collectMoneyAccount, collectMoneyBank, collectMoneyNumber, paymentAccount, paymentNumber, receivablePayableAmount, timeValue, paymentStyle) => {
  return REQ_INSTANCE.post('/Receipt/add', {
    orderNumber: orderId,
    collectionName: collectMoneyAccount,
    collectionBank: collectMoneyBank,
    collectionNumber: collectMoneyNumber,
    paymentName: paymentAccount,
    paymentNumber: paymentNumber,
    paymentMoney: receivablePayableAmount,
    paymentDate: timeValue,
    paymentStyle: paymentStyle
  });
}


//电话医生 医生版接口
/**
 * [用户登录]
 * @param  {[type]} telephone  [description]
 * @param  {[type]} doctorPassword [description]
 * @param  {[type]} openid [description]
 * @return {[type]}          [description]
 */
export const doctorSignin = (telephone, doctorPassword, ) => {
  return REQ_INSTANCE.post('/telePhoneDoctor/doctorLogin', {
    telephone: telephone,
    doctorPassword: doctorPassword
  });
}

/**
 * [初始化医生版电话医生信息]
 * @param  {[type]} openid [description]
 * @return {[type]}          [description]
 */
export const getDoctorUserinfo = ( ) => {
  return REQ_INSTANCE.post('/TelePhoneDoctorInterface/queryDoctorByOpneId', {

  });
}

/**
 * [订单列表]
 * @param  {[type]} doctorId  [description]
 * @return {[type]}          [description]
 */
export const doctorList = () => {
  return REQ_INSTANCE.post('/telePhoneDoctor/doctorOrderMainList', {

  });
}

/**
 * [订单详情]
 * @param  {[type]} orderMainId [description]
 * @return {[type]}          [description]
 */
export const doctorDetail = (orderMainId) => {
  return REQ_INSTANCE.post('/telePhoneDoctor/telePhoneDoctorOrderMainDetail', {
    orderMainId: orderMainId
  });
}

/**
 * [电话医生图片回显]
 * @param  {[type]} openId [description]
 * @param  {[type]}  [description]
 */
export const phoneFindFile = (orderNumber) => {
  return REQ_INSTANCE.post('/alicom/findImg', {
    orderNumber: orderNumber,
  });
}

/**
 * [立即回拨]
 * @param  {[type]}  [description]
 * @param  {[type]}  [description]
 * @return {[type]}          [description]
 */
export const callPhone = (orderNumber) => {
  return REQ_INSTANCE.post('/alicom/boPhone', {
    orderNumber: orderNumber
  });
}

/**
 * [完成服务]
 * @param  {[type]} OrderMainId [description]
 * @param  {[type]}  DoctorsAdvice [description]
 * @param  {[type]}  SuggestMedications [description]
 * @return {[type]}          [description]
 */
export const submitService = (orderMainId,doctorsAdvice,suggestMedications) => {
  return REQ_INSTANCE.post('/telePhoneDoctor/doctorOrderStatusChange', {
    orderMainId: orderMainId,
    doctorsAdvice: doctorsAdvice,
    suggestMedications: suggestMedications
  });
}
/**
 * [提交信息文本]
 * @param  {[type]} OrderMainId [description]
 * @param  {[type]}  DoctorsAdvice [description]
 * @param  {[type]}  SuggestMedications [description]
 * @return {[type]}          [description]
 */
export const submitText = (orderMainId,doctorsAdvice,suggestMedications) => {
  return REQ_INSTANCE.post('/TelePhoneDoctorInterface/saveDoctorAdviceAndSuggestMedications', {
    orderMainId: orderMainId,
    doctorsAdvice: doctorsAdvice,
    suggestMedications: suggestMedications
  });
}

/**
 * [个人中心]
 * @param  {[type]} doctorId [description]
 * @return {[type]}          [description]
 */
export const personCenter = () => {
  return REQ_INSTANCE.post('/telePhoneDoctor/doctorDetail', {

  });
}

/**
 * [我的收入]
 * @param  {[type]} doctorId [description]
 * @return {[type]}          [description]
 */
export const doctorIncome = () => {
  return REQ_INSTANCE.post('/telePhoneDoctor/doctorIncome', {

  });
}

/**
 * [回显医生评价]
 * @param  {[type]} orderMainId [description]
 * @return {[type]}          [description]
 */
export const reviewdoctorComment = (orderMainId) => {
  return REQ_INSTANCE.post('/TelePhoneDoctorInterface/queryTelePhoneDoctorAppraise', {
    orderMainId: orderMainId
  });
}

/**
 * [线下人员个人中心入口]
 * @param  {[type]} openid [description]
 * @param  {[type]}  [description]
 */
export const outLineUser = () => {
  return REQ_INSTANCE.post('/TelePhoneDoctorInterface/queryUserByOpneId', {

  });
}

/**
 * [医生个人中心入口]
 * @param  {[type]} openid [description]
 * @param  {[type]}  [description]
 */
export const doctorUser = () => {
  return REQ_INSTANCE.post('/TelePhoneDoctorInterface/queryDoctorByOpneId', {

  });
}

/**
 * [医生退出]
 * @param  {[type]} openid [description]
 * @param  {[type]}  [description]
 */
export const doctorOutLogin = () => {
  return REQ_INSTANCE.post('/TelePhoneDoctorInterface/doctorUnbindByOpneId', {

  });
}

/**
 * [上传录音完成]
 * @param  {[type]} openid [description]
 * @param  {[type]}  [description]
 */
export const findVoice = (orderMainId) => {
  return REQ_INSTANCE.post('/telePhoneDoctor/findVoice', {
    orderMainId: orderMainId
  });
}

/**
 * [用户评价]
 * @param  {[type]} doctorId [description]
 * @param  {[type]}  [description]
 */
export const doctorComment = () => {
  return REQ_INSTANCE.post('/telePhoneDoctor/doctorCommentByUser', {

  });
}

/**
 * [提交个人简介]
 * @param  {[type]} doctorId [description]
 * @param  {[type]} doctorIntroduce [description]
 */
export const updateDoctorInfo = (doctorIntroduce) => {
  return REQ_INSTANCE.post('/telePhoneDoctor/updateDoctor', {
    doctorIntroduce: doctorIntroduce
  });
}

/*医护招募接口*/
/**
 * [提交信息]
 * @param  {[type]}  [description]
 * @param  {[type]}  [description]
 */
export const nurseEmploy = (userName,sex,area,detailAddress,cardNumber,hospitalIds,nurseNumber,bank,bankCardNum,mobile,isWeixin) => {
  return REQ_INSTANCE.post('/newsystem/save', {
    userName: userName,
    sex: sex,
    area: area,
    detailAddress: detailAddress,
    cardNumber: cardNumber,
    hospitalIds: hospitalIds,
    nurseNumber: nurseNumber,
    bank: bank,
    bankCardNum: bankCardNum,
    mobile: mobile,
    isWeixin: isWeixin
  });
}

/**
 * [上传接口]
 * @param  {[type]}  [description]
 * @param  {[type]}  [description]
 */
export const nurseUpload = (serverId,enclosureType) => {
  return REQ_INSTANCE.post('/newsystem/nurseUploadfile', {
    serverId: serverId,
    enclosureType: enclosureType
  });
}
export const nurseUploadH5 = (enclosureType) => {
  return REQ_INSTANCE.post('/newsystem/nurseUploadfileH5', enclosureType);
}

/**
 * [删除图片接口]
 * @param  {[type]}  [description]
 * @param  {[type]}  [description]
 */
export const nurseDeletePic = (enclosureType,mobile,isWeixin) => {
  return REQ_INSTANCE.post('/newsystem/delete/file', {
    enclosureType: enclosureType,
    mobile: mobile,
    isWeixin : isWeixin
  });
}

