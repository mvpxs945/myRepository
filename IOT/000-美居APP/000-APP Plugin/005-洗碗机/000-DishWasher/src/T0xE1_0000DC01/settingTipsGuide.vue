<template>
<div :style="{'height':screenH+'px'}">
  <midea-header title='使用贴士' :isImmersion="true" :leftImg="icon.leftImg"  @headerClick="headerClick" bgColor="#ffffff" titleColor="#4A4A4A"></midea-header>
  <div class="contain">
    <div class="margin-div"></div>
    <slider class="slider" auto-play="false" infinite="false" :index="tipIndex" @change="onchange">
      <div v-for="(item,i) in tipsList" :key="i" class="dialog-content flex_column_center">
        <image class="tip-img" :src="item.url"/>
        <text class="tip-title">{{item.tipTitle}}</text>
        <text class="tip-content">{{item.tipContent}}</text>
      </div>
      <indicator class="indicator"></indicator>
    </slider>
  </div>
</div>
</template>
<style scoped>
.contain{
  flex: 1;
}
.margin-div {
  width: 750px;
  height: 20px;
  background-color: #EDEDED;
}
.flex_column_center {
  flex-direction: column;
  justify-content: start;
  align-items: center;
}
.dialog-content {
  width: 750px;
}
.slider {
  position: relative;
  width: 750px;
  flex: 1;
}
.tip-img {
  width: 584px;
  height: 438px;
  margin-top: 40px;
}
.tip-title {
  color: #3872E6;
  font-family: PingFangSC-Medium;
  font-weight: 600;
  font-size: 32px;
  text-align: center;
  height: 40px;
  line-height: 40px;
}
.tip-content {
  font-family: PingFangSC-Medium;
  font-size: 25px;
  color: rgba(56,114,230,0.70);
  text-align: center;
  line-height: 36px;
  width: 540px;
  margin-top: 20px;
}

.indicator {
  position: absolute;
  left: 0px;
  right: 0px;
  bottom: 40px;
  height: 60px;
  item-size: 15px;
  itemColor: rgba(56,114,230,0.30);
  itemSelectedColor: #3872E6;
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
      tipIndex:0,
      icon:{
        leftImg:"./assets/img/back_black.png",
        arrowRight:"./assets/img/arrow_right_enter.png",
      },
      tipsList:[
        {url:'assets/img/tips_wash_fen.png',tipTitle:'放置洗涤粉',tipContent:'有效漂洗食物残渣，清除餐具上面的污染物、油污等顽渍，令餐具焕然一新'},
        {url:'assets/img/tips_wash_bright.png',tipTitle:'放置软水盐',tipContent:'洗碗机专用盐，有效除去水垢，提升洗净效果，结束后餐具和机器内壁光亮一新'},
        {url:'assets/img/tips_wash_position.png',tipTitle:'餐具摆放',tipContent:'去除较大残渣后，由大到小逐个倾斜摆放；刀、叉、筷、勺按指示摆放在上搁架。正确摆放餐具有助于获得较好清洁效果'},
        {url:'assets/img/tips_mode_recommand.png',tipTitle:'选择洗涤模式',tipContent:'根据污染严重程度和餐具多少选择合适的洗涤模式以获得较好的洗涤效果'},
      ],
    };
  },

  methods: {
    headerClick: function(tag) {
      switch (tag) {
        case "leftImgClick":
          var path = "settingIndex.js";
          nativeService.goBack();
          break;
      }
    },
    onchange:function(){

    }
  },
};
</script>