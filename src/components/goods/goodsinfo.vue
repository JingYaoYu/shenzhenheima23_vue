<template>

    <div>
        <div class="section">
            <div class="location">
                <span>当前位置：</span>
                <a href="/index.html">首页</a> &gt;
                <a href="/goods.html">购物商城</a> &gt;
                <a href="/goods/42/1.html">商品详情</a>
            </div>
        </div>
        <!-- v-if="goods.goodsinfo"  用v-if来判断第一次是否真正有值（防止第一次报错） -->
        <div v-if="goods.goodsinfo"  class="section">
            <div class="wrapper clearfix">
                <div class="wrap-box">
                    <div class="left-925">
                        <div class="goods-box clearfix">
                            <!-- 放大镜的代码写在这里 -->
                            <div class="pic-box">
                                <div class="magnifier" id="magnifier1">
                                    <div class="magnifier-container">
                                        <div class="images-cover"></div>
                                        <!--当前图片显示容器-->
                                        <div class="move-view"></div>
                                        <!--跟随鼠标移动的盒子-->
                                    </div>
                                    <div class="magnifier-assembly">
                                        <div class="magnifier-btn">
                                            <span class="magnifier-btn-left">&lt;</span>
                                            <span class="magnifier-btn-right">&gt;</span>
                                        </div>
                                        <!--按钮组-->
                                        <div class="magnifier-line">
                                            <ul class="clearfix animation03">
                                                <li v-for="item in goods.imglist" :key="item.id">
                                                    <div class="small-img">
                                                        <img :src="item.original_path" />
                                                    </div>
                                                </li>
                                            </ul>
                                        </div>
                                        <!--缩略图-->
                                    </div>
                                    <div class="magnifier-view"></div>
                                    <!--经过放大的图片显示容器-->
                                </div>
                            </div>

                            <div class="goods-spec">
                                <h1>{{goods.goodsinfo.title}}</h1>
                                <p class="subtitle">{{goods.goodsinfo.sub_title}}</p>
                                <div class="spec-box">
                                    <dl>
                                        <dt>货号</dt>
                                        <dd id="commodityGoodsNo">{{goods.goodsinfo.goods_no}}</dd>
                                    </dl>
                                    <dl>
                                        <dt>市场价</dt>
                                        <dd>
                                            <s id="commodityMarketPrice">¥{{goods.goodsinfo.market_price}}</s>
                                        </dd>
                                    </dl>
                                    <dl>
                                        <dt>销售价</dt>
                                        <dd>
                                            <em id="commoditySellPrice" class="price">¥{{goods.goodsinfo.sell_price}}</em>
                                        </dd>
                                    </dl>
                                </div>
                                <div class="spec-box">
                                    <dl>
                                        <dt>购买数量</dt>
                                        <dd>
                                            <div class="stock-box">
                                              <el-input-number :min="1" :max="goods.goodsinfo.stock_quantity" size="small" v-model="buyCount"></el-input-number>
                                            </div>
                                            <span class="stock-txt">
                                                库存
                                                <em id="commodityStockNum">{{goods.goodsinfo.stock_quantity}}</em>件
                                            </span>
                                        </dd>
                                    </dl>
                                    <dl>
                                        <dd>
                                            <div id="buyButton" class="btn-buy">
                                                <button onclick="cartAdd(this,'/',1,'/shopping.html');" class="buy">立即购买</button>
                                                <button ref='addToShopCartRef'   @click="addToShopCart" class="add">加入购物车</button>
                                            </div>
                                        </dd>
                                    </dl>
                                </div>
                            </div>
                        </div>
                        <div id="goodsTabs" class="goods-tab bg-wrap">
                          <Affix>
                            <div id="tabHead" class="tab-head" style="position: static; top: 517px; width: 925px;">
                                <ul>
                                  
                                    <li>
                                        <a   href="javascript:;" :class="isShowComment ?'':'selected'" @click="isShowComment=false" >商品介绍</a>
                                    </li>
                                    <li>
                                        <a href="javascript:;" :class="isShowComment ?'selected':''"  @click="isShowComment=true">商品评论</a>
                                    </li>
                                
                                </ul>
                            </div>
                        </Affix>

                            <!-- 商品介绍 -->
                            <div v-show="!isShowComment" class="tab-content entry" style="display: block;">
                                <div v-html="goods.goodsinfo.content"></div>
                                内容
                            </div>
                            <!-- 商品评论 -->
                             <div v-show="isShowComment" class="tab-content" style="display: block;">
                                <div class="comment-box">
                                    <div id="commentForm" name="commentForm" class="form-box">
                                        <div class="avatar-box">
                                            <i class="iconfont icon-user-full"></i>
                                        </div>
                                        <div class="conn-box">
                                            <div class="editor">
                                                <textarea ref="textareaRef" id="txtContent" name="txtContent" sucmsg=" " datatype="*10-1000" nullmsg="请填写评论内容！"></textarea>
                                                <span class="Validform_checktip"></span>
                                            </div>
                                            <div class="subcon">
                                                <input id="btnSubmit" @click="postComment" name="submit" type="submit" value="提交评论" class="submit">
                                                <span class="Validform_checktip"></span>
                                            </div>
                                        </div>
                                    </div>
                                    <ul id="commentList" class="list-box">
                                        <p v-if="commentList.length===0" style="margin: 5px 0px 15px 69px; line-height: 42px; text-align: center; border: 1px solid rgb(247, 247, 247);">暂无评论，快来抢沙发吧！</p>
                                        <li v-for="item in commentList" :key="item.id">
                                            <div class="avatar-box">
                                                <i class="iconfont icon-user-full"></i>
                                            </div>
                                            <div class="inner-box">
                                                <div class="info">
                                                    <span>{{item.user_name}}</span>
                                                    <span>{{item.add_time | dateFmt('YYYY-MM-DD HH:mm:ss')}}</span>
                                                </div>
                                                <p>{{item.content}}</p>
                                            </div>
                                        </li>
                                    </ul>
                                    <div class="page-box" style="margin: 5px 0px 0px 62px;">
                                        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pageIndex" :page-sizes="[2, 5, 10, 20]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
                                        </el-pagination>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="left-220">
                        <div class="bg-wrap nobg">
                            <div class="sidebar-box">
                                <h4>推荐商品</h4>
                                <ul class="side-img-list">
                                    <li v-for="item in goods.hotgoodslist" :key="item.id">
                                        <div class="img-box">
                                            <router-link :to="'/goodsinfo/'+item.id" class="">
                                                <img v-lazy="item.img_url">
                                            </router-link>
                                        </div>
                                        <div class="txt-box">
                                            <!-- <router-link>相当于a标签 -->
                                             <!--to属性指定链接  -->
                                            <router-link :to="'/goodsinfo/'+item.id" class="">{{item.title}}</router-link>
                                            <span>{{item.add_time | dateFmt}}</span>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- 动画元素 -->
      
        <transition 
         v-on:before-enter="beforeEnter"
         v-on:enter="enter"
         v-on:after-enter="afterEnter" 
        >
           <div ref='animationRef'   v-if='goods.imglist' class="animationDiv" v-show="isShow"> 
                <img :src="goods.imglist[0].original_path" alt="">
           </div>
        </transition>
    </div>

</template>

<style scoped>
@import '../../statics/site/jquery_plugins/jqimgzoom/css/magnifier.css';

.animationDiv {
  position: absolute;
  width: 50px;
  height: 50px;
  left: 0px;
  top: 0px;
}

.animationDiv img {
  width: 100%;
  height: 100%;
}
</style>

<script>
//  导入axios的组件
// import axios from 'axios'

// 导入要用的相应图钉模块
import { Affix } from 'iview'

// 导入渲染图册的js
import '../../statics/site/jquery_plugins/jqimgzoom/js/magnifier.js'

export default {
  components: {
    Affix
  },
  data() {
    return {
      goods: {}, // 商品数据
      buyCount: 1, //InputNumber 计数器 必须要写个当前页数
      isShowComment: false, //是否显示商品的评论
      commentList: [], // 评论列表
      pageIndex: 1, //页码
      pageSize: 2, //页容量
      total: 0, //共有多少条
      isShow: false,
      addToShopCartOffset: null, //加入购物车的偏移量
      shopCartOffset:null ,//加入购物车数量的偏移位置
    
    }
  },
  created() {
    // 获取商品数据
    this.getGoodsData()
    // console.log(this);
    // 获取商品品论列表信息
    this.getCommentListData()
  },

  watch: {
    //    监控vue里面的$route属性
    $route() {
      this.getGoodsData()
    }
  },

  updated() {
    //放在这里是因为，我们点击了右边的连接之后，要重新图册
    $('#magnifier1').imgzoon({ magnifier: '#magnifier1' })
  },
  methods: {
    // 根据商品id获取商品详细信息
    getGoodsData() {
      // axios 配置
      const url = `site/goods/getgoodsinfo/${this.$route.params.goodsId}`

      this.$axios.get(url).then(response => {
        this.goods = response.data.message
     
    //   要加个延迟时间，等待元素渲染完成 
      setTimeout(() => {
        // 获取加入购物车的dom元素的偏移位置
        //  console.log(this);
        this.addToShopCartOffset = $(this.$refs.addToShopCartRef).offset()
        // console.log( this.addToShopCartOffset); {top: 447, left: 635.5}

        $(this.$refs.animationRef).css({
          top: this.addToShopCartOffset.top,
          left: this.addToShopCartOffset.left
        })

       this.shopCartOffset =$('#shoppingCartCount').offset();
        //  console.log(this.shopCartOffset); {top: 13, left: 1109.9375}
          
      },200)
     })
    },

    //获取商品评论列表
    getCommentListData() {
      // http://47.106.148.205:8899/site/comment/getbypage/goods/102?pageIndex=1&pageSize=1
      const url = `site/comment/getbypage/goods/${
        this.$route.params.goodsId
      }?pageIndex=${this.pageIndex}&pageSize=${this.pageSize}`
      this.$axios.get(url).then(response => {
        // console.log(response.data.message);
        this.total = response.data.totalcount
        this.commentList = response.data.message
      })
    },
    // 分页相关 -----更改了页容量
    handleSizeChange(pageSize) {
      // console.log(pageSize); 多少条
      this.pageIndex = 1 //重新查询新评论，因为还有可能其他人正在写评论

      this.pageSize = pageSize
      this.getCommentListData()
    },
    //  分页相关----- 更改了页码
    handleCurrentChange(pageIndex) {
      // console.log(pageIndex); 第几页
      this.pageIndex = pageIndex
      this.getCommentListData()
    },

    postComment() {
      //   <textarea ref="textareaRef" id="txtContent" name="txtContent" sucmsg=" " datatype="*10-1000" nullmsg="请填写评论内容！"></textarea>
      //  console.log(this.$refs.textareaRef); 获取文本域中的值一定要加value，否则会获取到上这是元素
      // console.log(this.$refs.textareaRef.value); ${this.$route.params.goodsId}
      const content = this.$refs.textareaRef.value
      if (content.trim().length == 0) {
        this.$message({
          message: '评论内容不能为空哟',
          type: 'warning'
        })
        return
      }
      const url = `site/validate/comment/post/goods/${
        this.$route.params.goodsId
      }`
      this.$axios.post(url, { commenttxt: content }).then(response => {
        //  console.log(response.data);{status: 0, message: "评论成功"}
        // 1提示
        this.$message({
          message: '评论成功',
          type: 'success'
        })
        // 2清除
        this.$refs.textareaRef.value = ''
        // 重新加载第一页
        this.pageIndex = 1
        this.getCommentListData()
      })
    },
    addToShopCart() {
      this.isShow = true;
    //准备好载荷
     const goods={
       goodsId: this.$route.params.goodsId,
       count:this.buyCount, 
     }   
    //   console.log(goods); // {goodsId: "92", count: 1}
     
      this.$store.commit('addGoods',goods)
    },

    // 动画的开始
    beforeEnter:function(el){
     el.style.top=this.addToShopCartOffset.top+'px';
     el.style.left=this.addToShopCartOffset.left+'px';
     el.style.transfrom='scale(1.0)';
    },
    enter: function (el, done){
      el.style.transition='all 0.5s';
    //  刷新动画帧
     el.offsetHeight;
     el.style.top= this.shopCartOffset.top-5+'px';
     el.style.left= this.shopCartOffset.left+'px';
     el.style.transform = 'scale(0.4)'

      done();
    },
     afterEnter: function(el) {
      this.isShow = false
    } 



  }
}
</script>