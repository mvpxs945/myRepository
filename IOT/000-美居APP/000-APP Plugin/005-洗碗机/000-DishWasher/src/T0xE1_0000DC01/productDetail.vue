<template>
<div class="wrapper">
  <midea-header title='产品指南' :isImmersion="true" :leftImg="icon.leftImg" @headerClick="headerClick" bgColor="#ffffff" titleColor="#4A4A4A"></midea-header>
  <div class="contain">
    <div class="margin-div"></div>
    <slider class="slider" auto-play="false" infinite="false">
      <div v-for="(item,index) in list" :key="index">
        <image class="size" :src="item.url"/>
      </div>
      <indicator class="indicator" v-if="list.length > 1"></indicator>
    </slider>

  </div>
</div>
</template>
<style scoped>
.wrapper{
  background-color: #fff;
}
.contain{
  position: relative;
  flex: 1;
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
    width: 750px;
    height: 1024px;
    resize:contain;
  }
  .slider {
    position: relative;
    width: 750px;
    height: 1130px;
  }
  .indicator {
    position: absolute;
    height: 60px;
    left: 0;
    right: 0;
    bottom: 40px;
    item-size: 10px;
    item-color: rgba(56,114,230,0.30);
    item-selected-color: #3872E6;
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
      title:'',
      list: []
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
      }
    },
  },
  created() { 
    var self = this;
    nativeService.getItem("guideObj", function(obj) {
      var dataJson = JSON.parse(obj.data);
      self.guideObj = dataJson;
      self.title = dataJson.name;
      if(dataJson.type == "product_page1") {
        self.list = [
          {url:'./assets/img/guide/product_img1.jpg',order:'01'},
          {url:'./assets/img/guide/product_img2.jpg',order:'02'},
          {url:'./assets/img/guide/product_img3.jpg',order:'01'},
          {url:'./assets/img/guide/product_img4.jpg',order:'02'},
          {url:'./assets/img/guide/product_img5.jpg',order:'02'},
        ]
      }else if (dataJson.type == "product_page2") {
        self.list = [
          {url:'assets/img/guide/product_install1.jpg',order:'01'},
          {url:'assets/img/guide/product_install2.jpg',order:'01'},
        ]
      }else if (dataJson.type == "product_page3") {
        self.list = [
          {url:'assets/img/guide/product_use1.jpg',order:'01'},
          {url:'assets/img/guide/product_use2.jpg',order:'01'},
          {url:'assets/img/guide/product_use3.jpg',order:'01'},
          {url:'assets/img/guide/product_use4.jpg',order:'01'},
          {url:'assets/img/guide/product_use5.jpg',order:'01'},
          {url:'assets/img/guide/product_use6.jpg',order:'01'},
          {url:'assets/img/guide/product_use7.jpg',order:'01'},
        ]
      }else if (dataJson.type == "product_page4") {
        self.list = [
          {url:'assets/img/guide/product_function.jpg',order:'01'},
        ]
      }else if (dataJson.type == "product_page5") {
        self.list = [
          {url:'assets/img/guide/product_material.jpg',order:'01'},
        ]
      }else if (dataJson.type == "product_page6") {
        self.list = [
          {url:'assets/img/guide/product_clean1.jpg',order:'01'},
          {url:'assets/img/guide/product_clean2.jpg',order:'02'},
        ]
      }else if (dataJson.type == "product_page7") {
        self.list = [
          {url:'assets/img/guide/product_water_system1.jpg',order:'01'},
          {url:'assets/img/guide/product_water_system2.jpg',order:'02'},
        ]
      }else if (dataJson.type == "product_page8") {
        self.list = [
          {url:'assets/img/guide/product_error1.jpg',order:'01'},
          {url:'assets/img/guide/product_error2.jpg',order:'02'},
          {url:'assets/img/guide/product_error3.jpg',order:'01'},
          {url:'assets/img/guide/product_error4.jpg',order:'02'},
        ]
      }
    });
  },
  mounted() {
    
  }
};
</script>