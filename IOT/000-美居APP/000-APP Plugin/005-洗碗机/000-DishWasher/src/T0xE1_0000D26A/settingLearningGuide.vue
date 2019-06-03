<template>
<div>
   <div>
      <midea-header title= '学习摆放碗碟' :isImmersion="true"
      leftImg="./assets/img/public_ic_back@3x.png" 
      @headerClick="headerClick"
      bgColor="#ffffff"
      ></midea-header>
    </div>
    <div class="contain">
      <div class="">
        <slider class="slider" auto-play="false" infinite="false">
          <div v-for="(item,index) in posters" style="width:750px" :key="index">
              <image class="size" :style="{width:item.slideWidth,height:item.slideHeight}" :src="item.url"/>
          </div>
          <indicator class="indicator"></indicator>
        </slider>
      </div>
    </div>
</div>
</template>
<style scoped>
.contain{
  padding-top: 30px;
  padding-left: 20px;
}
.title{
  font-size: 50px;
  color: #2e9eee;
}
.title_content{
  font-size: 30px;
  margin-left: 70px;
  position: relative;
  top: -46px;
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
  width: 700px;
  height: 1100px;
}
.indicator {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  height: 60px;
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
      lackTypeObj: {},
      slideWidth: '600',
      slideHeight: '800',
      posters: [
          {url:'./assets/img/tips/img_change1@2x.png',order:'01',slideWidth:'700px',slideHeight:'745px'},
          {url:'./assets/img/tips/img_change2@2x.png',order:'02',slideWidth:'720px',slideHeight:'750px'},                   
      ],
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