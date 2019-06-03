<template>
<div class="wrapper"  :style="{'height':screenH+'px'}">
  <midea-header title="产品指南" :isImmersion="true" bgColor="#ffffff" :leftImg="icon.leftImg" @headerClick="headerClick"></midea-header>
  <div class="margin-div"></div>
  <div><scroller class="guide_list">
          <div v-for="(item,index) in list" @click="itemClick(item)" :key="index">
            <div class="guide_list_item flex_center">
              <text :class="['guide_item_text_none']">{{item.name}}</text>
              <image class="next_img" :src="icon.arrowRight"/>
            </div>
          </div>
    </scroller></div> 
</div>
</template>
<style scoped>
.margin-div {
  width: 750px;
  height: 20px;
  background-color: #EDEDED;
}
.flex_center {
  flex-direction: row;
  justify-content: center;
}
.flex_column_center {
  flex-direction: column;
  justify-content: flex-start;
}

.guide_list {
  flex:1;
  padding-bottom: 20px;
  position: relative;
  height: 1500px;
  /* margin-top: 30px; */
}
.guide_list_item {
  height: 100px;
  width: 750px;
  border-bottom-color: #EDEDED;;
  border-bottom-width: 1px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  position: relative;
  padding-left: 25px;
  padding-right: 32px;
}
.next_img {
  width:16px;
  height:28px;
}
.guide_item_text_none {
  font-size: 30px;
  flex: 1;
  color: #333333;
  height: 100px;
  line-height: 100px;
  font-family: PingFangSC-Regular;
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
        leftImg:"./assets/img/back_black.png",
        arrowRight:"./assets/img/arrow_right_enter.png",
      },
      list:[ 
            {name:"产品简介",type:'product_page1',record:1},
            {name:"安装说明",type:'product_page2',record:2},
            {name:"使用说明",type:'product_page3',record:3},
            {name:"常见功能",type:'product_page4',record:4},
            {name:"耗材说明",type:'product_page5',record:5},
            {name:"清洁保养",type:'product_page6',record:6},
            {name:"水软系统",type:'product_page7',record:7},
            {name:"异常自检",type:'product_page8',record:8},
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
      }
    },
    itemClick: function(item) {
      var self = this;
      nativeService.setItem("guideObj", {
            name: item.name,
            type: item.type
      });
      nativeService.goTo("productDetail.js",{});
    }
  },
  created() {
  },
};
</script>