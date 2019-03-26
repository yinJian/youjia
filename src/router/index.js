import App from '../App';

const Signin = () => import(/* webpackChunkName: "signin" */ '@/pages/signin/Signin');
const UserCenter = () => import(/* webpackChunkName: "user" */ '@/pages/user/UserCenter');
const User = () => import(/* webpackChunkName: "user" */ '@/pages/user/User');
const FindPassword = () => import(/* webpackChunkName: "signin" */ '@/pages/find-password/FindPassword');
const Order = () => import(/* webpackChunkName: "order" */ '@/pages/order/Order');
const OrderList = () => import(/* webpackChunkName: "order" */ '@/pages/order/children/List');
const OrderDetail = () => import(/* webpackChunkName: "order" */ '@/pages/order/children/Detail');
const OrderUpload = () => import(/* webpackChunkName: "order" */ '@/pages/order/children/Upload');
const ClaimResult = () => import(/* webpackChunkName: "order" */ '@/pages/order/children/ClaimResult');
const OrderUploadDeposit = () => import(/* webpackChunkName: "order" */ '@/pages/order/children/UploadDeposit');
const OrderUploadFee = () => import(/* webpackChunkName: "order" */ '@/pages/order/children/UploadFee');
const Uploads = () => import(/* webpackChunkName: "order" */ '@/pages/order/children/Uploads');

const Doctor = () => import(/* webpackChunkName: "doctor" */ '@/pages/doctor/Doctor');
const DoctorSignin = () => import(/* webpackChunkName: "doctor" */ '@/pages/doctor/children/Signin');
const DoctorList = () => import(/* webpackChunkName: "doctor" */ '@/pages/doctor/children/List');
const DoctorDetail = () => import(/* webpackChunkName: "doctor" */ '@/pages/doctor/children/Detail');
const DoctorReturnConsultDetail = () => import(/* webpackChunkName: "doctor" */ '@/pages/doctor/children/ReturnConsultDetail');
const DoctorPersonCenter = () => import(/* webpackChunkName: "doctor" */ '@/pages/doctor/children/PersonCenter');
const DoctorPersonInfo = () => import(/* webpackChunkName: "doctor" */ '@/pages/doctor/children/PersonInfo');
const DoctorPersonIntro = () => import(/* webpackChunkName: "doctor" */ '@/pages/doctor/children/PersonIntro');
const DoctorIncome = () => import(/* webpackChunkName: "doctor" */ '@/pages/doctor/children/Income');
const DoctorComment = () => import(/* webpackChunkName: "doctor" */ '@/pages/doctor/children/Comment');

const Nurse = () => import(/* webpackChunkName: "nurse" */ '@/pages/nurse/Nurse');
const NurseSignin = () => import(/* webpackChunkName: "nurse" */ '@/pages/nurse/children/Signin');
const NurseSuccess = () => import(/* webpackChunkName: "nurse" */ '@/pages/nurse/children/Success');
const NurseApply = () => import(/* webpackChunkName: "nurse" */ '@/pages/nurse/children/Apply');

export default [
    {
    path: '/',
    component: App,
    children: [
      {
        path: '',
        redirect: 'signin',
        meta: {
          auth: true
        }
      },
      {
        path: 'signin',
        name: 'Signin',
        component: Signin,
        meta: {
          auth: true
        }
      },
      {
        path: 'user-center',
        name: 'UserCenter',
        component: UserCenter,
        meta: {
          auth: true
        }
      },
      {
        path: 'user',
        name: 'User',
        component: User,
        meta: {
          auth: true
        }
      },
      {
        path: 'findpassword',
        name: 'FindPassword',
        component: FindPassword,
        meta: {
          auth: true
        },
      },
      {
        path: 'order',
        component: Order,
        children: [
          {
            path: '',
            redirect: 'list'
          },
          {
            path: 'list',
            name: 'OrderList',
            component: OrderList,
            meta: {
              auth: true
            },
          },
          {
            path: 'upload',
            name: 'OrderUpload',
            component: OrderUpload,
            meta: {
              auth: true
            },
          },
          {
            path: 'uploaddeposit',
            name: 'OrderUploadDeposit',
            component: OrderUploadDeposit,
            meta: {
              auth: true
            },
          },
          {
            path: 'uploadfee',
            name: 'OrderUploadFee',
            component: OrderUploadFee,
            meta: {
              auth: true
            },
          },
          {
            path: 'uploads',
            name: 'Uploads',
            component: Uploads,
            meta: {
              auth: true
            },
          },
          {
            path: 'claimresult',
            name: 'ClaimResult',
            component: ClaimResult,
            meta: {
              auth: true
            },
          },
          {
            path: 'detail',
            name: 'OrderDetail',
            component: OrderDetail,
            meta: {
              auth: true
            },
          }
        ]
      },
      {
        path: 'doctor',
        component: Doctor,
        children: [
          {
            path: '',
            redirect: 'signin'
          },
          {
            path: 'signin',
            name: 'DoctorSignin',
            component: DoctorSignin,
            meta: {
              auth: true
            },
          },
          {
            path: 'list',
            name: 'DoctorList',
            component: DoctorList,
            meta: {
              auth: true
            },
          },
          {
            path: 'detail/:id',
            name: 'DoctorDetail',
            component: DoctorDetail,
            meta: {
              auth: true
            },
          },
          {
            path: 'return-consult-detail/:id',
            name: 'DoctorReturnConsultDetail',
            component: DoctorReturnConsultDetail,
            meta: {
              auth: true
            },
          },
          {
            path: 'person-center',
            name: 'DoctorPersonCenter',
            component: DoctorPersonCenter,
            meta: {
              auth: true
            },
          },
          {
            path: 'person-info',
            name: 'DoctorPersonInfo',
            component: DoctorPersonInfo,
            meta: {
              auth: true
            },
          },
          {
            path: 'person-intro',
            name: 'DoctorPersonIntro',
            component: DoctorPersonIntro,
            meta: {
              auth: true
            },
          },
          {
            path: 'income',
            name: 'DoctorIncome',
            component: DoctorIncome,
            meta: {
              auth: true
            },
          },
          {
            path: 'comment',
            name: 'DoctorComment',
            component: DoctorComment,
            meta: {
              auth: true
            },
          }
        ]
      },
      {
        path: 'nurse',
        component: Nurse,
        children:[
          {
            path: '',
            redirect: 'signin'
          },
          {
            path: 'signin',
            name: 'NurseSignin',
            component: NurseSignin,
            meta: {
              auth: true
            }
          },
          {
            path: 'success',
            name: 'NurseSuccess',
            component: NurseSuccess,
            meta: {
              auth: true
            }
          },
          {
            path: 'apply/:phone',
            name: 'NurseApply',
            component: NurseApply,
            meta: {
              auth: true
            }
          }
        ]
      }
    ]
  }
];
