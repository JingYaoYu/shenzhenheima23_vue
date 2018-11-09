 <template>
 
   <div>
        <div class="section">
            <div class="location">
                <span>当前位置：</span>
                <a href="#/" class="router-link-active">首页</a> &gt;
                <a href="#/site/goodslist" class="router-link-exact-active router-link-active">购物商城</a>
            </div>
        </div>
        <div class="section">
            <div class="wrapper">
                <div class="wrap-box">
                    <div class="left-220" style="margin: 0px;">
                        <div class="banner-nav">
                            <ul>

                                <li v-for="item in goodsData.catelist" :key="item.id">
                                    <h3>
                                        <i class="iconfont icon-arrow-right"></i>
                                        <span>{{item.title}}</span>
                                        <p>
                                            <span v-for="subitem in item.subcates" :key="subitem.id">
                                               {{subitem.title}}&nbsp;
                                            </span>
                                        </p>
                                    </h3>
                                    <div class="item-box">
                                        <dl>
                                            <dt>
                                                <a href="/goods/40.html">{{item.title}}</a>
                                            </dt>
                                            <dd>
                                                <a v-for="subitem in item.subcates" :key="subitem.id" href="/goods/43.html">{{subitem.title}}</a>
                                              
                                            </dd>
                                        </dl>
                                    </div>
                                </li>
                               
                            </ul>
                        </div>
                    </div>
                    <!--幻灯片-->
                    <div class="left-705">
                        <div class="banner-img">
                            <div id="focus-box" class="focus-box">
                                <!-- 走马灯的插件 -->
                               <el-carousel :interval="5000" arrow="always">
                                     <el-carousel-item v-for="item in goodsData.sliderlist" :key="item.id">
                                      <img :src="item.img_url " alt="" style="height:341px">
                                      </el-carousel-item>
                                    </el-carousel>
                    
                            </div>

                        </div>
                    </div>
                    <!--/幻灯片-->
                    <div class="left-220">
                        <ul class="side-img-list">
                           <li v-for="(item,index) in goodsData.toplist" :key="item.id"> 
                                <div class="img-box">
                                    <label>{{index+1}}</label>
                                    <img :src="item.img_url">
                                </div>
                                <div class="txt-box">
                                    <a href="/goods/show-98.html">{{item.title}}</a>
                                    <span>{{item.add_time | dateFmt}}</span>
                                </div>
                            </li>
                            
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        <div   v-for="item in goodsgroup" :key="item.level1cateid" class="section" >
            <div class="main-tit">
                <h2>{{item.catetitle}}</h2>
                <p>
                    <a v-for="subitem in goodsgroup.level2catelist" :key="subitem.subcateid"  href="/goods/43.html">{{subitem.subcatetitle}}</a>
                    <a href="/goods/40.html">更多
                    <i>+</i>
                    </a>

                </p>
            </div>
            <div class="wrapper clearfix">
                <div class="wrap-box">
                    <ul  class="img-list" >
                        <li v-for="subitem in item.datas"  :key="subitem.artID">
                            <router-link  :to="'/goodsinfo/'+subitem.artID" class="">
                                <div class="img-box">
                                    <img v-lazy="subitem.img_url">
                                </div>
                                <div class="info">
                                    <h3>{{subitem.artTitle}}</h3>
                                    <p class="price">
                                        <b>{{subitem.sell_price}}</b>元</p>
                                    <p>
                                        <strong>库存{{subitem.stock_quantity}}</strong>
                                        <span>市场价：
                                            <s>{{subitem.market_price}}</s>
                                        </span>
                                    </p>
                                </div>
                            </router-link>
                        </li>
                       
                    </ul>
                </div>
            </div>
        </div>
        
    </div>

 
 </template>

  <style>

  /* 走马灯样式 */
  .el-carousel__item img{
      width: 100%;
      height: 100%;
  }
  
  </style>

 <script>
//  导入axios模块
// import axios from 'axios'

// 导出相应数据
export default {
  data() {
    return {
      // 头部的数据
      goodsData: {},
      goodsgroup:[]
    }
  },

  created() {
    this.getGoodsData()
    this.getgoodsgroup()


  },

  methods: {
    getGoodsData() {
      const url = `site/goods/gettopdata/goods`
       
      this.$axios.get(url).then(response => {
        //   console.log(response.data);
        this.goodsData = response.data.message
      })
    },
   getgoodsgroup(){
    //    console.log(this);
       
      const url = `site/goods/getgoodsgroup`  
       this.$axios.get(url).then(response => {
        //   console.log(response.data);
        this.goodsgroup = response.data.message
      })
      
    }

  }
}
</script>
