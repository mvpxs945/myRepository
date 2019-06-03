<template>
<div>
  <midea-header title="用户指南" :isImmersion="true" bgColor="#ffffff" :leftImg="icon.leftImg" @headerClick="headerClick"/>
  <div class="container"><scroller class="guide_list">
    <div class="margin-div"></div>
    <div class="guide_list_item" v-for="(item,i) in list" :key="i" @click="jumpNext(item)">
      <text class="guide_item_text">{{item.name}}</text>
      <image class="next_img" :src="icon.arrowRight"/>
    </div>
  </scroller></div>
</div>
</template>

<script>
import nativeService from "@/common/services/nativeService";
import mideaHeader from './components/header.vue'
import httpRequest from './js/http.js';
import bigData from './js/bigData.js';
export default {
  components: {
    mideaHeader,
  },
  data() {
    return {
      screenH: 750 / weex.config.env.deviceWidth * weex.config.env.deviceHeight,
      icon:{
        leftImg:"./assets/img/back_black.png",
        arrowRight:"./assets/img/arrow_right_enter.png",
      },
      list:[ 
            {name:"产品指南",type:'quickGuide',record:1},
            {name:"使用贴士",type:'tipsGuide',record:2},
            {name:"干燥是什么",type:'safeDryGuide',record:3},
            {name:"保管是什么",type:'safeKeepGuide',record:4},
            {name:"注意事项",type:'attentionGuide',record:5},
          ]
    };
  },
  methods: {
    jumpNext(item){
      // bigData.dataReportByName(item.name);
      if(item.type == 'quickGuide'){
        nativeService.goTo("settingProductGuide.js",false, true);
      }else if(item.type=='tipsGuide'){
        nativeService.goTo("settingTipsGuide.js",{});
      }else if(item.type == 'safeDryGuide' || item.type == 'safeKeepGuide'){
        nativeService.setItem("guideObj", {
            name: item.name,
            type: item.type
        });
        nativeService.goTo("settingKeepGuide.js",{});
      }else if(item.type=='attentionGuide'){
        nativeService.goTo("settingAttentionGuide.js",{});
      }
    },
    headerClick: function(tag){
      switch(tag){
        case 'leftImgClick':
          nativeService.goBack();
          break;
        }
    },
  }
  
};
</script>
<style scoped>
.container {
  flex: 1;
}
.guide_list {
  width: 750px;
  /* height: 2000px; */
  flex:1;
  position: relative;
  background-color: #ffffff;
}
.margin-div {
  width: 750px;
  height: 20px;
  background-color: #EDEDED;
}
.guide_list_item{
  height: 100px;
  padding-left: 25px;
  padding-right: 32px;
  border-bottom-color: #EDEDED;
  border-bottom-width: 1px;
  flex-direction: row;
  justify-content:space-between;
  align-items: center;
}

.guide_item_text{
  font-family: PingFangSC-Regular;
  font-size: 30px;
  height: 100px;
  line-height: 100px;
  color: #333333;
}
.next_img {
  width:16px;
  height:28px;
}
</style>