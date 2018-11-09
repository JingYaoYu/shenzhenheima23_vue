import Vue from 'vue'
import moment from 'moment'

// 顶部时间的过滤器 input获取的时间参数
Vue.filter('dateFmt',(input,formatStr='YYYY-MM-DD')=>{
return moment(input).format(formatStr)
})