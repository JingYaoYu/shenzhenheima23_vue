<template>
 <div>
  <div  @click="substrict" class="left">-</div>
  <!-- {{goodsId}}-{{count}} -->
  <div class="middle">{{initCount}}</div>
  <div @click='add' class="right">+</div>

 </div>




</template>

<style scoped>
.left,.middle,.right{
    border: 1px solid rgba(92,92,92,0.3);
    width:25px;
    height: 30px;
    display: inline-block;
    text-align: center;
    line-height:  30px;
}

.middle{
    width:30px;
    margin: 0 2px;
}

</style>
 
<script>
export default{
    // 父组件传来的值用props接收
    // props:['goodsId','count'],
     props:{
            goodsId:{
                Type:String,
                required: true
            },
            count:{
                Type:Number,
                default:1 //不传值时的默认值
            }
         },
       data(){
            return {
                initCount:0
            }
        },
       created(){
        this.initCount =this.count;
      
       },
       methods:{
          substrict(){
           if(this.initCount===1) return;
            this.initCount--

          this.notify()
       },
       add(){
        this.initCount++

        this.notify()
       },
       
        notify(){
         // 子组件，通过触发自定义事件，传递载荷
            this.$emit('goodsCountChange',{
                goodsId:this.goodsId,
                count:this.initCount
           })
              
        }
    }
      

   
}

    



</script>