import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

// 在Vue原型上挂在一个属性 $axios
import axios from 'axios'
//设置baseURL之后，发送请求的时候会把baseURL和路径拼接起来
axios.defaults.baseURL = 'http://47.106.148.205:8899/'
axios.defaults.withCredentials = true //让axios发送请求让ajax请求头携带cookie
Vue.prototype.$axios = axios

// 导入组件
// import goodslist from '../components/goods/goodslist.vue'
// import goodsinfo from '../components/goods/goodsinfo.vue'
// import shopcart from '../components/shopcart/shopcart.vue'
// import order from '../components/order/order.vue'
// import login from '../components/account/login.vue'
// import pay from '../components/pay/payorder.vue'
// import paysuccess from '../components/pay/paysuccess.vue'
// import vipCenter from '../components/vip/vipCenter.vue'
// import myOrders from '../components/vip/myOrders.vue'
// import orderInfo from '../components/vip/orderInfo.vue'

const goodslist = () => import(/* webpackChunkName: "goodslist" */ '../components/goods/goodslist.vue')
const goodsinfo = () => import(/* webpackChunkName: "goodsinfo" */ '../components/goods/goodsinfo.vue')
const shopcart = () => import(/* webpackChunkName: "shopcart" */ '../components/shopcart/shopcart.vue')
const order = () => import(/* webpackChunkName: "order" */ '../components/order/order.vue')
const login = () => import(/* webpackChunkName: "login" */ '../components/account/login.vue')
const pay = () => import(/* webpackChunkName: "pay" */ '../components/pay/payorder.vue')
const paysuccess = () => import(/* webpackChunkName: "paysuccess" */ '../components/pay/paysuccess.vue')
const vipCenter = () => import(/* webpackChunkName: "vipCenter" */ '../components/vip/vipCenter.vue')
const myOrders = () => import(/* webpackChunkName: "myOrders" */ '../components/vip/myOrders.vue')
const orderInfo = () => import(/* webpackChunkName: "orderInfo" */ '../components/vip/orderInfo.vue')


// 创建 router 实例
const router = new VueRouter({
  // 定义路由
  routes: [
    //goodslist重定向
    { path: '/', redirect: '/goodslist' },

    { path: '/goodslist', component: goodslist },
    { path: '/goodsinfo/:goodsId', component: goodsinfo },
    { path: '/shopcart', component: shopcart },
    { path: '/login', component: login },

    { path: '/order', component: order, meta: { checkoutLogin: true } },
    {path: '/pay' ,component:pay,meta: { checkoutLogin: true } },
    {path:'/paysuccess',component:paysuccess,meta: { checkoutLogin: true }},
    {path:'/vipCenter',component:vipCenter,meta: { checkoutLogin: true }},
    {path:'/myOrders',component:myOrders,meta: { checkoutLogin: true }},
    {path:'/orderInfo',component:orderInfo,meta: { checkoutLogin: true }},
  
  ]
})

// 这个方法可以拦截所有跳转页面  不调用next()方法就不能进行跳转
router.beforeEach((to, from, next) => {
  //    console.log(to) {name: undefined, meta: {…}, path: "/goodsinfo/92", hash: "", query: {…}, …};

  // console.log(to); fullPath: "/goodsinfo/89"
  if (to.path !== '/login') {
    localStorage.setItem('wantVisitPath', to.fullPath)
  }
  if (to.meta.checkoutLogin) {
    axios.get('site/account/islogin').then(response => {
      //console.log(response.data);//{code: "nologin"}
      if (response.data.code === 'logined') {
        //已登录过
        next()
      } else {
        //未登录过
        router.push({ path: '/login' })
      }
    })
  } else {
    next()
  }
})
//es6中导出一个成员
export default router
