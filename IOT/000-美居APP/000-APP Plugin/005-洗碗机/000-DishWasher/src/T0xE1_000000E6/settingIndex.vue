<template>
<div @viewappear="viewappear" @viewdisappear="viewdisappear" :style="{height:(screenH)+'px'}">
  <midea-header title="洗碗机" :isImmersion="true" bgColor="#ffffff"
    :leftImg="icon.leftImg" @headerClick="headerClick"/>
  <div class="contanier"><scroller class="guide_list">
    <midea-video class="video" :src="src" autoplay="true" controls @start="onstart" @pause="onpause" @finish="onfinish" @fail="onfail"></midea-video>
    <div class="guide_list_item" 
      v-for="(item,i) in list" :key="i" @click="jumpNext(item)">
      <text class="guide_item_text">{{item.name}}</text>
      <image style="width:12px;height:23px;" src="./assets/img/arrow_right.png"/>
    </div>
  </scroller></div>
</div>
</template>

<script>
import nativeService from "@/common/services/nativeService";

import mideaHeader from './components/header.vue'
import mideaItem from './components/item.vue';
import httpRequest from './js/http.js';
import bigData from './js/bigData.js';

const modal = weex.requireModule('modal');

export default {
  components: {
    mideaItem,
    mideaHeader,
  },
  data() {
    return {
      state: "----",
      screenH: 750 / weex.config.env.deviceWidth * weex.config.env.deviceHeight,
      src:"https://chuyu-meiyun.oss-cn-shenzhen.aliyuncs.com/H3_video.mp4",
      isTopShow: false,
      loadMore:true,
      startIndex:16,
      icon:{
        leftImg:"./assets/img/public_ic_back@3x.png",
      },
      list:[ 
            {name:"快速开始使用",type:'quickGuide',record:3},
            {name:"了解你的洗碗机",type:'howWorkGuide',record:4},
            {name:"使用贴士",type:'tipsGuide',record:5},
            {name:"学习摆放碗碟",type:'learningGuide',record:6},
            {name:"保管是什么",type:'safeKeepGuide',record:7},
            // {name:"智能助手是什么",type:'helperGuide' ,record:8},
            {name:"注意事项",type:'attentionGuide',record:9},
            {name:"故障排除",type:'fualtGuide',record:10},
            //{"name":"联系客服",type:'connectGuide',"hasSeparate":true,record:11},
            {name:"常见问题",type:'problemGuide',record:12}
          ]
    };
  },
  methods: {
    viewdisappear: function() {
      this.state = "onpause";
    },
    viewappear: function() {
    },

    onstart(event) {
      this.state = "onstart";
    },
    onpause(event) {
      this.state = "onpause";
    },
    onfinish(event) {
      this.state = "onfinish";
    },
    onfail(event) {
      this.state = "onfail";
    },
    showDel(item){},
    jumpNext(item){
      bigData.dataReportByName(item.name);
      if(item.type=='learningGuide'){
        var path = "settingLearningGuide.js";
        nativeService.goTo(path,false, true);
        return;
      }else if(item.type=='tipsGuide'){
        var path = "settingTipsGuide.js";
        nativeService.goTo(path,false, true);
          return;
      }else if(item.type=='attentionGuide'){
        var path = "settingAttentionGuide.js";
        nativeService.goTo(path,false, true);
        return;
      }else{
        nativeService.setItem("guideObj", {
            name: item.name,
            type: item.type
          });
          var path = "settingPage.js";
          nativeService.goTo(path,false, true);
        }
    },
    headerClick: function(tag){
      console.log('headerClick:'+tag);
      switch(tag){
        case 'leftImgClick':
          var path = "memberIndex.js";
          nativeService.goBack();
          break;
        case 'rightImgClick':
          break;
        case 'secondImgClick':
          break;
        }
    },
  }
  
};
</script>
<style scoped>
.contanier {
  flex: 1;
}
.video {
  width: 750px;
  height: 350px;
  margin-top: 20px;
  padding-left: 32px;
  padding-right: 32px;
}
.guide_list {
  width: 750px;
  /* height: 2000px; */
  flex:1;
  position: relative;
  background-color: #f2f2f2;
}
.guide_list_item{
  height: 100px;
  padding-left: 32px;
  padding-right: 32px;
  border-bottom-color: #c7c7c7;
  border-bottom-width: 1px;
  flex-direction: row;
  justify-content:space-between;
  align-items: center;
  background-color: #ffffff;
}
.guide_item_text{
  font-size: 30px;
  height: 100px;
  line-height: 100px;
}

</style>