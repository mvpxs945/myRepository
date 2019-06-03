<template>
  <div class="wrapper">
      <div class="item-wrapper" v-for="(row,rowIndex) in dList" :key="rowIndex">
        <div class="item"  v-for="(item,index) in row.items" :key="index" 
        :class="[item.name?'border':'']" @click="itemClicked(index)" :style="{height:height+'px'}">
          <text  v-if="item.name"  class="item-txt">{{item.name}}</text>
        </div>
      </div>
  </div>
</template>

<style scoped>
.wrapper{
  background-color: #fff;
  padding-top: 20px;
  padding-bottom: 20px;
  opacity:1;
}
.item-wrapper {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
}

.item {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  flex:1;
  margin:15px;
}
.item-txt{
  line-height: 48px;
  font-size: 26px;
  color:#666;
  text-align: center;
  padding: 10px;
  } 
.border {
  border-width: 2px;
  border-style: solid;
  border-color: #666;
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
      hasBorder:{
        type:Boolean,
        default:false
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
        default: '48'
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
      }
    }
  }
</script>
