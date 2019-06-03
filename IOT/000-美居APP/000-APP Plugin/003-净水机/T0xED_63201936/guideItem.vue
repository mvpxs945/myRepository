<template>
<div class="wrapper">
  <midea-header :title="pageTitle" :titleText="'#000000'" :bgColor="'#ffffff'" :isImmersion="true" :showRightImg="false" @leftImgClick="goBack"></midea-header>
  <div style="width:750px;height:20px;background-color:rgb(242,242,242)"></div>
  <div class="contain">
    <slider class="slider" auto-play="false" infinite="false">
      <div v-for="(item,index) in items" style="width:750px" :key="index" class="flex_center">
        <image class="size" resize="stretch" :src="item.url"/>
      </div>
      <indicator class="indicator" v-if="items.length > 1"></indicator>
    </slider>
  </div>
</div>
</template>
<style scoped>
.wrapper{
  background-color:white;
}
.contain{
  flex: 1;
}
.flex_center {
  flex-direction: row;
  justify-content: center;
}
.img_section{
  align-items: center;
}
.size {
    resize:contain;
    width: 750px;
    height: 1000px;
  }
  .slider {
    flex: 1;
    position: relative;
    width: 750px;
  }
  .indicator {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 50px;

    height: 60px;
    /* background-color: rgba(0, 0, 0, 0.3); */
    item-size:10;
    item-color: #DDDDDD;
    item-selected-color: rgb(0, 180, 255);
  }
</style>
<script>

import mideaHeader from './components/mheader1.vue'
import nativeService from "../common/services/nativeService";
export default {
  components: { mideaHeader },
  data() {
    return {
      items: [],
      pageTitle:''
    };
  },

  methods: {
    goBack(){
      nativeService.goBack()
    },
    itemSwitch(){
      var self=this;
      nativeService.getItem("guideKey",function(i){
        switch(i.data){
          case "0":
              self.pageTitle='产品简介';
              self.items=[
                  {url:'./assets/img/intro/intro1.jpg',order:'01'},
                  {url:'./assets/img/intro/intro2.jpg',order:'02'},
                  {url:'./assets/img/intro/intro3.jpg',order:'03'},
                  {url:'./assets/img/intro/intro4.jpg',order:'04'},
                  {url:'./assets/img/intro/intro5.jpg',order:'05'},
              ];
          break;
          case "1":
              self.pageTitle='安装说明';
              self.items=[
                  {url:'assets/img/fix/fix1.jpg',order:'01'},
                  {url:'assets/img/fix/fix2.jpg',order:'02'},
                  {url:'assets/img/fix/fix3.jpg',order:'03'},
                  {url:'assets/img/fix/fix4.jpg',order:'04'},
              ];
          break;
          case "2":
              self.pageTitle='使用说明';
              self.items=[
                  {url:'assets/img/use/use1.jpg',order:'01'},
                  {url:'assets/img/use/use2.jpg',order:'02'},
                  {url:'assets/img/use/use3.jpg',order:'03'},
                  {url:'assets/img/use/use4.jpg',order:'04'},
                  {url:'assets/img/use/use5.jpg',order:'05'},
                  {url:'assets/img/use/use6.jpg',order:'06'},
              ];
          break;
          case "3":
              self.pageTitle='清洁保养';
              self.items=[
                  {url:'assets/img/clean/clean1.jpg',order:'01'},
                  {url:'assets/img/clean/clean2.jpg',order:'02'},
                  {url:'assets/img/clean/clean3.jpg',order:'03'},
                  {url:'assets/img/clean/clean4.jpg',order:'04'},
                  {url:'assets/img/clean/clean5.jpg',order:'05'},
                  {url:'assets/img/clean/clean6.jpg',order:'06'},
                  {url:'assets/img/clean/clean7.jpg',order:'07'},
              ];
          break;
        }
      })
    }
  },
  created() { 
    var self = this;
    self.itemSwitch();
  },
  mounted() {
    
  }
};
</script>