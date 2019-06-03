<template>
  <div class="wrapper">
     <div class="tab-wrapper">
         <div v-for="(item,index) in tabArray" :key="index" class="tab-item"  @click="tabClicked(index)">
              <text class="tab-txt" :class="[item.selected?'tab-txt-selected':'']">{{item.name}}</text>
         </div>
     </div>
  </div>
</template>

<style>
.wrapper {
   padding:0px;
   margin:0px;
   display:flex;
}
.tab-wrapper{
   width:280px;
   flex-direction:row;
   height:50px;
   border-style: solid;
   border-width: 1px;
   border-color: #8CD2FF;
   border-radius: 30px;
   overflow: hidden;
}
.tab-item{
   flex:1;
   width:70px;
   height: 50px;
   color:white;
   flex-direction: row;
   align-items: center;
   justify-content: center;
   border-left-style:solid;
   border-left-width: 1px;
   border-left-color: #8CD2FF;
}
.tab-txt{
  display:block;
  width:70px;
  height: 50px;
  padding-top: 10px;
  font-size:28px;
  color: white;
  text-align: center;
  /* border-left-style:solid;
   border-left-width: 2px;
   border-left-color: white; */

}
.tab-txt-selected{
   background-color: rgba(255,255,255,0.3);
   /* border-radius: 30px; */
}
</style>

<script>
 const modal = weex.requireModule('modal');
 const animation = weex.requireModule('animation');
  export default {
    name: 'mideaTab',
    props: {
      tabArray: {
        type: Array
      }
    },
    methods: {
      tabClicked(index) {
         var len=this.tabArray.length;
         for(var i=0;i<this.tabArray.length;i++){
            this.tabArray[i].selected=false;
         }
         Vue.set(this.tabArray[index],"selected",true);
         this.$emit('tabClicked',index)
      }
    },
    data:function () {
     return {
        
     }
    }
  }
</script>