<template>
<div :style="{'height':screenH+'px'}">
  <midea-header title='注意事项' :isImmersion="true" :leftImg="icon.leftImg" @headerClick="headerClick" bgColor="#ffffff" titleColor="#4A4A4A"></midea-header>
  <div class="contain">
    <div class="margin-div"></div>
    <slider class="slider" auto-play="false" infinite="false">
      <div v-for="(item,index) in posters" style="width:750px" :key="index" class="flex_center">
        <image class="size" :style="{width:item.slideWidth,height:item.slideHeight}" :src="item.url"/>
      </div>
      <indicator class="indicator"></indicator>
    </slider>
  </div>
</div>
</template>
<style scoped>
.contain{
  flex: 1;
  background-color: #fff;
}
.margin-div {
  width: 750px;
  height: 20px;
  background-color: #EDEDED;
}
.flex_center {
  flex-direction: row;
  justify-content: center;
}
.img_section{
  align-items: center;
}
.size {
    padding-bottom: 100px;
    resize:contain;
  }
  .slider {
    position: relative;
    width: 750px;
    flex: 1;
  }
  .indicator {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 40px;
    height: 60px;
    /* background-color: rgba(0, 0, 0, 0.3); */
    item-size: 15px;
    itemColor: #DDDDDD;
    itemSelectedColor: rgb(0, 180, 255);
  }
</style>
<script>

import mideaHeader from './components/header.vue'
import nativeService from "../common/services/nativeService";
export default {
  components: { mideaHeader },
  data() {
    return {
      screenH: 750 / weex.config.env.deviceWidth * weex.config.env.deviceHeight,
      icon:{
        leftImg:"./assets/img/back_black.png",
        arrowRight:"./assets/img/arrow_right_enter.png",
      },
      posters: [
        {url:'assets/img/guide/attention_img1.png',order:'01',slideWidth:'720px',slideHeight:'960px'},
        {url:'assets/img/guide/attention_img2.png',order:'02',slideWidth:'720px',slideHeight:'960px'},                   
      ]
    };
  },

  methods: {
    headerClick: function(tag) {
      console.log("headerClick:" + tag);
      switch (tag) {
        case "leftImgClick":
          var path = "settingIndex.js";
          nativeService.goBack();
          break;
        case "rightImgClick":
          break;
        case "secondImgClick":
          break;
      }
    },
  },
  created() { 
  
  },
  mounted() {   
    
  }
};
</script>