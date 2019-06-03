<template>
<div class="wrapper" :style="{'height':screenH+'px'}">
  <midea-header title="更多设置" :isImmersion="true" bgColor="#ffffff" :leftImg="icon.leftImg" titleColor="#4A4A4A"
      @headerClick="headerClick"></midea-header>  
  <div class="demo_section">
    <div class="margin-div"></div>
    <div><scroller class="guide_list" >
      <div v-for="(item,i) in list" :key="i" @click="jumpNext(item)" :class="['guide_list_item','guide_item_boder']">
        <div class="icon_title">
          <text class="guide_item_text">{{item.name}}</text>
        </div>
        <div class="flex_center">
          <text v-if="item.subTitle" class="item_sec_desc">{{item.subTitle}}</text>
          <image class="next_img" :src="icon.arrowRight"/>
        </div>
      </div>
    </scroller></div>
   </div>
</div>
</template>
<script>
import nativeService from "@/common/services/nativeService";
import mideaHeader from "./components/header.vue";
import bigData from "./js/bigData.js";
import cmdFun from "./js/cmd.js";


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
      list: [
        { name: "用水明细", subTitle:'',isMargin:true},
        { name: "用户指南", subTitle:'',isMargin:false},
        { name: "软水盐档位", subTitle:'',isMargin:false},
        { name: "联系客服",subTitle:'400-889-9315',isMargin:false},
      ],
    };
  },
  methods: {
    jumpNext(item) {
      var path = '';
      if(item.name=='用水明细'){
        // bigData.dataReport('PAGE_WATER');
        path = "chart.js";
        nativeService.goTo(path, false, true); 
      }else if(item.name=='用户指南'){
        // bigData.dataReport('PAGE_USER_GUIDE');
        path = "settingIndex.js";
        nativeService.goTo(path, {}); 
      }else if(item.name=='软水盐档位'){
        // bigData.dataReport('PAGE_CHANGE_SALT');
        path = "settingSalt.js";
        nativeService.goTo(path, {}); 
      }else if(item.name=='联系客服'){
        // bigData.dataReport('BTN_SERVICE');
        var params ={
          tel: '400-889-9315',
          title: '联系客服',
          desc:'拨打热线电话：400-889-9315',
        }
        nativeService.callTel(params).then((resp) => {
            //nativeService.toast(resp)
          }).catch((error) => {
            nativeService.toast(error)
          })
      }
    },
    headerClick: function(tag){
      console.log('headerClick:'+tag);
      switch(tag){
        case 'leftImgClick':
          nativeService.goBack();
          break;
        }
    },
    analysisFun: function(status) {
      var self = this;
      let isLackSalt = (status.boxUp.displaySign.detail.salt.value == 0x01);
      self.list[2].subTitle = (isLackSalt?'缺盐':'充足');
    },

    queryStatus: function() {
      var self = this;
      cmdFun.queryStatus(function(statusObj){
        self.analysisFun(statusObj);
      });
    }
  },
  created() {
    var self = this;
    self.isIOS = weex.config.env.platform == "IOS" ? true : false;
    self.queryStatus();
  },
};
</script>
<style scoped>
.guide_list {
  width: 750px;
  flex:1;
  height: 1500px;
  position: relative;
}
.margin-div {
  width: 750px;
  height: 20px;
  background-color: #EDEDED;
}

.flex_center {
  flex-direction: row;
  justify-content: center;
  align-items: center;
}
.guide_list_item {
  width: 750px;
  height: 100px;
  padding-left:25px;
  padding-right: 32px; 
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  position: relative;
  background-color: #ffffff;
  
}
.guide_item_boder {
  border-width: 2px;
  border-style: solid;
  border-color: rgb(250, 250, 250);
}
.guide_item_text {
  height: 100px;
  line-height: 100px;
  font-family: PingFangSC-Regular;
  font-size: 29px;
  color: #333333;
}
.item_sec_desc{
  font-size: 28px;
  height: 100px;
  font-family: PingFangSC-Regular;
  line-height: 100px;
  margin-right: 20px;
  color: #949494;
}
.next_img {
  width:16px;
  height:28px;
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