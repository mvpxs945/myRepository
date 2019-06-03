<template>
<div class="wrapper">
    <div>
      <midea-header 
      :title="guideObj.name" :isImmersion="true" bgColor="#ffffff"
      leftImg="./assets/img/public_ic_back@3x.png" 
      @headerClick="headerClick"
      ></midea-header>
    </div>
    <div><scroller class="guide_list demo_section" :style="{'height':(screenH-128)+'px'}">
          <div class="flex_center">
            <image v-if="guideImg" :src="guideImg" :style="{width:guideWidth,height:guideHeight}" class="guide_img"/>
          </div>
          <text v-if="guideText" class="demo_content">{{guideText}}</text>
          <div v-for="(item,index) in list" @click="itemClick(item)" :key="index">
            <div class="guide_list_item flex_center">
              <text class="item_section" v-if="item.title">{{item.title}}</text>
              <text :class="[item.title?'guide_item_text':'guide_item_text_none']">{{item.name}}</text>
              <image class="arrow_down" :src="item.select?icon.arrowUp:icon.arrowDown"/>
            </div>
            <div v-if="item.select" v-for="(detail,i) in item.detail" :key="i" >
              <div class="detail_list_item flex_column_center">
                <div class="">
                  <text class="detail_name">{{detail.name}}</text>
                  <text class="detail_desc">{{detail.dec}}</text>
                </div>
              </div>
            </div>
          </div>
    </scroller></div> 
</div>
</template>
<style scoped>

.flex_center {
  flex-direction: row;
  justify-content: center;
}
.flex_column_center {
  flex-direction: column;
  justify-content: flex-start;
}

.guide_list {
  height: 1000px;
  flex:1;
  position: relative;
  /* margin-top: 30px; */
}
.guide_list_item {
  height: 120px;
  border-bottom-color: #c7c7c7;
  border-bottom-width: 1px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  position: relative;
}
.guide_item_text {
  font-size: 30px;
  width: 570px;
  height: 120px;
  line-height: 120px;
  margin-left: 20px;
}
.guide_item_text_none {
  font-size: 30px;
  width: 630px;
  height: 120px;
  line-height: 120px;
  margin-left: 20px;
}
.item_section {
  width: 60px;
  height: 120px;
  line-height: 120px;
  font-size: 34px;
  color: #4abbfc;
  font-weight: bold;
}
.arrow_down {
  width: 24px;
  height: 12px;
  margin-left: 6px;
}
.detail_list_item {
  /* height: 120px; */
  border-bottom-color: #c7c7c7;
  border-bottom-width: 1px;
  position: relative;
  padding-left: 20px;
  background-color: #f8f8f8;
  padding-top: 10px;
  padding-bottom: 10px;
}
.detail_name {
  font-size: 28px;
  height: 50px;
  line-height: 50px;
  color: #000;
}
.detail_desc {
  flex-direction: row;
  align-items: center;
  font-size: 26px;
  color: rgba(0, 0, 0, 0.6);
  word-wrap: break-word;
}
.demo_section {
  padding-left: 30px;
  padding-right: 30px;
  padding-top: 20px;
  padding-bottom: 40px;
  border-top-color: #ebf4ff;
  border-top-width: 20px;
}
.demo_title {
  font-size: 34px;
}
.demo_content {
  font-size: 28px;
}
.guide_img {
  resize: contain;
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
      guideImg: "",
      guideWidth: "600px",
      guideHeight: "300px",
      guideText: "",
      icon:{
        arrowDown:"./assets/img/arrow_down_black.png",
        arrowUp:"./assets/img/arrow_up_black.png",
      },
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
        case "rightImgClick":
          break;
        case "secondImgClick":
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
      if (dataJson.type == "quickGuide") {
        self.guideImg = "assets/img/setting/qiuck@2x.png";
        self.guideWidth = "680px";
        self.guideHeight = "1100px";
      }else if (dataJson.type == "safeKeepGuide") {
        self.guideImg = "assets/img/setting/safeKeep@2x.png";
        self.guideWidth = "682px";
        self.guideHeight = "226px";
      }else if (dataJson.type == "helperGuide") {
        self.guideImg = "";
        self.guideText =
          "用户输入就餐情况（餐具，油污程度，放置时长），智能助手将自动推荐出合适的洗涤程序。";
      }else if (dataJson.type == "howWorkGuide") {
        self.guideImg = "assets/img/tips/howWork@2x.png";
        self.guideWidth = "668px";
        self.guideHeight = "1076px";
      }else if (dataJson.type == "problemGuide") {
        self.guideImg = "";
        self.guideText = "";
        self.list = errorCon.problem;
      }else if(dataJson.type == "fualtGuide") {
        self.guideImg = "";
        self.guideText = "";
        self.list = errorCon.error;
      }else if (dataJson.type == "connectGuide") {
        self.guideImg = "";
        self.guideText = "客服热线：400-889-9315";
      }
    }); //注obj为字符串
  },
  mounted() {}
};
</script>