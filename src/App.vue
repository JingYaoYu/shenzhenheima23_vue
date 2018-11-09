<template>
  <div id="app">

     <!--首页头部结构  -->
    <div class="header">
        <!-- 1.0 导航栏头部 -->
        <div class="head-top">
            <div class="section">
                <div class="left-box">
                    <span>黑马买买买</span>
                    <a target="_blank" href="#"></a>
                    <a target="_blank" href="#"></a>
                </div>
                <div id="menu" class="right-box">
                    <span v-if='!isLogin'>
                        <a href="" class="">登录</a>
                        <strong>|</strong>
                        <a href="" class="">注册</a>
                        <strong>|</strong>
                    </span>
                    <span v-if='isLogin'>
                        <router-link to="/vipCenter" class="">会员中心</router-link>
                        <strong>|</strong>
                        <a @click='logout'>退出</a>
                        <strong>|</strong>
                    </span>
                    <router-link to="/shopcart" class="">
                        <i id="shoppingCartCount" class="iconfont icon-cart"></i>购物车(
                        <span>
                            <span>{{this.$store.getters.getBuyCount}}</span>
                        </span>)
                    </router-link>
                </div>
            </div>
        </div>

        <!-- 2.0 导航条 -->
        <div class="head-nav">
            <div class="section">
                <div id="menu2" class="nav-box menuhd">
                    <ul>
                        <li class="index">
                            <a href="#" class="">
                                <span class="out" style="top: 0px;">首页</span>
                            </a>
                        </li>
                        <li class="news">
                            <a href="#" class="">
                                <span class="out" style="top: 0px;">每日精选</span>
                            </a>
                        </li>
                        <li class="photo">
                            <a href="#" class="">
                                <span class="out" style="top: 0px;">秒杀专区</span>
                            </a>
                        </li>
                        <li class="video">
                            <a href="#" class="">
                                <span class="out" style="top: 0px;">黑马超市</span>
                            </a>
                        </li>
                        <li class="down">
                            <a href="#" class="">
                                <span class="out" style="top: 0px;">会员权益</span>
                            </a>
                        </li>
                        <li class="goods">
                            <router-link to="/goodslist" class="router-link-exact-active ">
                                <span class="out" style="top: 0px;">购物商城</span>
                        </router-link>
                        </li>
                    </ul>
                </div>
                <div class="search-box">
                    <div class="input-box">
                        <input id="keywords" name="keywords" type="text" onkeydown="if(event.keyCode==13){};" placeholder="输入关健字" x-webkit-speech="">
                    </div>
                    <a href="javascript:;">
                        <i class="iconfont icon-search"></i>
                    </a>
                </div>
            </div>
        </div>
    </div>
    
    <!-- 中间路由 -->
      <!-- 路由出口 -->
  <!-- 路由匹配到的组件将渲染在这里 -->
    <router-view></router-view>

    <!-- 首页底部结构 -->
    <div class="footer">
      <div class="section">
                    <div class="foot-nav">
                        <a href="">关于我们</a>
                        <strong>|</strong>
                        <a href="">联系我们</a>
                        <strong>|</strong>
                        <a href="">联系客服</a>
                        <strong>|</strong>
                        <a href="">合作招商</a>
                        <strong>|</strong>
                        <a href="">商家帮助</a>
                        <strong>|</strong>
                        <a href="">营销中心</a>
                        <strong>|</strong>
                        <a href="">隐私政策</a>
                    </div>
                    <div class="foot-box">
                        <div class="copyright">
                            <p>版权所有 黑马买买买 </p>
                            <p>公司地址： 联系电话：</p>
                            <p class="gray">Copyright © 2009-2018 itcast Corporation,All Rights Reserved.</p>
                        </div>
                        <div class="service">
                            <p>周一至周日 9:00-24:00</p>
                            <a href="#">
                                <i class="iconfont icon-phone"></i>在线客服</a>
                        </div>
                    </div>
      </div>
    </div> 

  </div>
</template>



<script>
// import $ from 'jquery'
// 导入公共bus
import {bus} from './common/commonvue.js'
// 导出的vue对象
export default {
    data(){
      return{
       isLogin:false
      }  
    },
   created(){
    bus.$on('loginSuccess',()=>{
        // console.log(isLogin);  true
        this.isLogin=true
    })
    this.checkOutLogin()
   } ,
//检测登录状态    
  methods:{
   checkOutLogin(){
    this.$axios.get('site/account/islogin').then(response=>{
        // console.log(response.data) {code: "logined"}
        if(response.data.code==='logined'){
           this.isLogin=true
        }else{
          this.isLogin=false
        }  
    })  
   },
   logout(){
    this.$axios.get('site/account/logout').then(response=>{
        // console.log(response.data); {status: 0, message: "用户已注销"}
    this.$confirm('确认要退出登录吗?', '提示', {
          confirmButtonText: '退出',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
           if(response.data.response===0){
            this.isLogin=false;
            this.$router.push({path:'/login'})
        }
        }).catch(() => {
        });

       
    })   
   }
  },
  // 我们组件的template中的内容，已经加载完毕
  mounted() {
    $('#menu2 li a').wrapInner('<span class="out"></span>')
    $('#menu2 li a').each(function() {
      $('<span class="over">' + $(this).text() + '</span>').appendTo(this)
    })

    $('#menu2 li a').hover(
      function() {
        $('.out', this)
          .stop()
          .animate({ top: '48px' }, 300) // move down - hide
        $('.over', this)
          .stop()
          .animate({ top: '0px' }, 300) // move down - show
      },
      function() {
        $('.out', this)
          .stop()
          .animate({ top: '0px' }, 300) // move up - show
        $('.over', this)
          .stop()
          .animate({ top: '-48px' }, 300) // move up - hide
      }
    )
  }
}

</script>



<style scoped>
/* 导入hoverNav的样式 */

@import './statics/site/jquery_plugins/hoverNav/css/style.css';

/* 会更改商品数量并且更新localStorage中的商品数量
会删除商品并且删除localStorage中的商品信息
理解声明式导航和编程式导航的区别
理解$router与$route的区别
会使用路由元数据配合导航守卫进行是否登录验证 */
</style>


