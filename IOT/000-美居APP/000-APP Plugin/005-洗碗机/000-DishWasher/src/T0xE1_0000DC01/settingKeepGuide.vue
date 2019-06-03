<template>
<div class="wrapper" :style="{'height':screenH+'px'}">
  <midea-header title="用户指南" :isImmersion="true" bgColor="#ffffff" :leftImg="icon.leftImg" @headerClick="headerClick"></midea-header>
  <div class="margin-div"></div>
  <div><scroller class="guide_list">
      <div class="flex_center">
        <text class="demo_title">{{guideTitle}}</text>
        <div class="demo_div"></div>
        <text class="demo_content">{{guideText}}</text>
      </div>
    </scroller></div> 
</div>
</template>
<style scoped>

.flex_center {
  flex-direction: column;
  justify-content: center;
}

.guide_list {
  height: 1000px;
  flex:1;
  position: relative;
  /* margin-top: 30px; */
  padding-left: 30px;
  padding-right: 30px;
  padding-top: 20px;
  padding-bottom: 40px;
}
.margin-div {
  width: 750px;
  height: 20px;
  background-color: #EDEDED;
}

.demo_title {
  font-family: PingFangSC-Semibold;
  font-size: 34px;
  font-weight: 300;
  color: #333333;
  height: 100px;
  line-height: 100px;
}
.demo_content {
  font-family: PingFangSC-Regular;
  font-size: 28px;
  margin-top: 40px;
  color: #999999;
  line-height: 38px;
}
.demo_div {
  height: 1px;
  background-color: #ECECEC;
}
</style>
<script>
import mideaHeader from "./components/header.vue";
import nativeService from "../common/services/nativeService";
import errorCon from "./js/errorCon.js";


export default {
  components: { mideaHeader },
  data() {
    return {
      screenH: 750 / weex.config.env.deviceWidth * weex.config.env.deviceHeight,
      guideObj: {},
      guideText: "",
      guideTitle: "",
      icon:{
        arrowDown:"./assets/img/arrow_down_black.png",
        arrowUp:"./assets/img/arrow_up_black.png",
        leftImg:"./assets/img/back_black.png",
      },
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
    itemClick: function(item) {
      var self = this;
      item.select = !item.select;
    }
  },
  created() {
    var self = this;
    nativeService.getItem("guideObj", function(obj) {
      var dataJson = JSON.parse(obj.data);
      self.guideObj = dataJson;
      if(dataJson.type == "safeKeepGuide") {
        self.guideTitle = "保管是什么";
        self.guideText = "长时间不用机器，选择保管，风机间断工作，保证内胆和餐具干燥、无异味。";
      }else if (dataJson.type == "safeDryGuide") {
        self.guideTitle = "干燥是什么";
        self.guideText = "选择干燥，洗涤结束后风机启动，热风和餐具余热共同作用，除去餐具上的水分，达到更好的干燥效果。";
      }
    });
  },
};
</script>