import Vue from 'vue'
import Vuex from 'vuex'
// 按需导入localStorage中的方法
import { addLocalGoods,getTotalCount,updateLocalGoods,deleteLocalGoods} from '../common/localStorage.js'

Vue.use(Vuex)

// Vuex 是一个专为 Vue.js 应用程序开发的状态管理模式。
const store = new Vuex.Store({//创建一个store
    // 要操作的数据
    state: {
        buyCount: 0
      },
   
      // <!-- 就像计算属性一样，getter 的返回值会根据它的依赖被缓存起来，且只有当它的依赖值发生了改变才会被重新计算 -->
      getters: {//获取数据
        getBuyCount(state){
            return state.buyCount===0 ?getTotalCount() : state.buyCount
            // return state.buyCount
        } 
      },
       //   state是上面的，固定写法，要写
    //   goods载荷
    mutations: {//存储数据
      addGoods(state,goods) {
          // state.buyCount+=goods.count
          state.buyCount=addLocalGoods(goods)

      },

      updateGoods(state,goods){
        state.buyCount = updateLocalGoods(goods)
        // console.log(state.buyCount); 53 52 购买总数量
        
    },

    deleteGoods(state,goodsId){
        state.buyCount = deleteLocalGoods(goodsId)
    }
    },

})


// 导出仓库
export default store;