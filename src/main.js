//ES6 导入模块的方式 相当于原先 require('')
import Vue from 'vue' // const Vue = require('vue')
// 导入根组件
import App from './App.vue'
// import ElementUI from 'element-ui'; //走马灯的引入插件
import VueLazyload from 'vue-lazyload' //图片懒加载的引入插件

//按需导入ElementUI
import {
    Button,
    Pagination,
    Input,
    InputNumber,
    Switch,
    Form,
    FormItem,
    Radio,
    RadioGroup,
    MessageBox,
    Message,
    Carousel,
    CarouselItem,
    Row,
    Col
  } from 'element-ui'

  // 自定义自己的全局组件
  // Vue.use(ElementUI);

  Vue.use(Carousel);
  Vue.use(CarouselItem);
  Vue.use(Button) //自动导入element-ui/lib/theme-chalk/button.css
  Vue.use(Pagination)
  Vue.use(InputNumber)
  Vue.use(Form)
  Vue.use(FormItem)
  Vue.use(Radio)
  Vue.use(RadioGroup)
  Vue.use(Input)
  Vue.use(Switch)
  Vue.use(Row)
  Vue.use(Col)
  
  Vue.prototype.$message = Message
  Vue.prototype.$confirm = MessageBox.confirm
  


// 走马灯的轮播样式
// 如果使用了按需导入，并且注册了，就不需要引入全局的样式了
// import 'element-ui/lib/theme-chalk/index.css';
// 首页静态底部，头部css样式导入
import "./statics/site/css/style.css"

Vue.config.productionTip = false

Vue.use(VueLazyload,{ 
    //注意：一定要用require导入才行
    loading:require('./statics/site/images/01.gif')
})

// 导入过滤器，我这样写只是为了让webpack打包的时候，找到它打包 
import './filters'

// 导入路由对象  import router from './router/index.js'(让webpack打包的时候，找到它打包)
import router from './router'
// 导入Vuex
import store from './store'

// 创建根实例，整个项目中只需要有一个根实例
// 使用render函数，渲染根组件
new Vue({
   // 渲染根组件
  render: h => h(App),
 router,
 store,

}).$mount('#app')  //$mount('#app') 相当于el:"#app"
