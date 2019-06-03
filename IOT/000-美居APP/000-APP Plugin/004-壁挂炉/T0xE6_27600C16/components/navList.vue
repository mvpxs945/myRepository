
<template>
  <div>
      <div :class="[type=='spaceBetween'?'share-wrapper-sb':'share-wrapper']" v-for="row in dList">
             <div  :class="[type=='spaceBetween'?'share-inner-wrapper-sb':'share-inner-wrapper']" v-for="(item,index) in row.items" @click="itemClicked(index)" @longpress="itemLongpress(index)" :style="{height:height+'px'}">
                <image class="share-img" :src="item.img"></image>
                <text  v-if="item.title"  class="share-txt">{{item.title}}</text>
                <text v-if="item.tip" class="tip-txt">{{item.tip}}</text>
             </div>
      </div>
  </div>
</template>

<style scoped>
  .share-wrapper-sb{
    flex-direction:row;justify-content:space-between;
    flex-wrap: wrap;align-items:center;
  }
  .share-inner-wrapper-sb{
    align-items:center; justify-content:flex-start;
  }
  .share-wrapper{
    flex-direction:row;flex-wrap:wrap;
  }
  .share-inner-wrapper{
     flex:1;align-items: center;justify-content:flex-start;
  }
  .share-img{ 
    height:112px;width:112px;
  }
  .share-txt{
    padding-top:8px;line-height:32px;font-size:24px;color:#333;text-align:center;
  } 
  .tip-txt{
    font-size: 20px;color: rgba(0,0,0,0.3);
  }
</style>

<script>
  const modal = weex.requireModule('modal');
  
  export default {
    props: {
      list: {
        type: Array,
        default: () => ([])
      },
      cols: {
        type: Number,
        default: 4
      },
      type:{
        type: String,
        default: 'center'
      },
      height:{
        type: String,
        default: '180'
      }
    },
    data: () => ({
     
    }),
    computed: {
       dList(){
          const {list,cols} =this;
          var length=list.length;
          var mod=list.length%cols;
          if(mod!=0){
             var appendLen= cols-mod;
             for(var i=0;i<appendLen;i++){
                list.push({});
             }
          }
          var resultList=[];
          var obj={};
          var index=0;
          for(var j=0;j<list.length;j++){
             var item=list[j];
             item.index=index;
             index++;
             if(j%cols==0){
                obj.items=[];
             }
             obj.items.push(item);
             if(j%cols==cols-1){
                resultList.push(Object.assign({}, obj));
             } 
          } 
          return resultList;
        }
    },
    created () {
      
    },
    methods: {
      itemClicked(index){
         this.$emit('itemClicked',index)
      },
      itemLongpress(index){
        this.$emit('itemLongpress',index)
      }
    }
  }
</script>
