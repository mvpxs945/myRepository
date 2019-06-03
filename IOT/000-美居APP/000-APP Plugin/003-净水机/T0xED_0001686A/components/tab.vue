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
   width:680px;
   flex-direction:row;
   height:60px;
   border-style: solid;
   border-width: 2px;
   border-color: white;
   border-radius: 10px;
   overflow: hidden;
}
.tab-item{
   flex:1;
   width:227px;
  height: 60px;
   color:white;
   flex-direction: row;
   align-items: center;
   justify-content: center;
   border-left-style:solid;
   border-left-width: 1px;
   border-left-color: white;
}
.tab-txt{
  display:block;
  width:227px;
  height: 60px;
  padding-top: 16px;
  font-size:28px;
  color: white;
  text-align: center;

}
.tab-txt-selected{
   background-color: white;
   color:#5d75f6;
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