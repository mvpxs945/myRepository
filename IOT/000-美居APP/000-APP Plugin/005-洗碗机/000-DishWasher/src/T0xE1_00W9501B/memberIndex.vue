<template>
<div class="wrapper">
  <midea-header title="更多功能" :isImmersion="true" bgColor="#ffffff" :leftImg="icon.leftImg" 
      @headerClick="headerClick"></midea-header>  
  <div class="demo_section">
    <div><scroller class="guide_list">
      <div v-for="(item,i) in list" :key="i"
        @click="jumpNext(item)" :class="['guide_list_item','guide_item_boder',item.isMargin?'guide_item_top':'']">
        <div class="icon_title">
          <text class="guide_item_text">{{item.name}}</text>
        </div>
        <div class="flex_center">
          <text v-if="item.subTitle" class="item_sec_desc">{{item.subTitle}}</text>
          <image v-if="item.hasArrow" class="next_img" src="assets/img/arrow_right.png"/>
          <midea-switch2 v-if="item.isSwitch" :ref="'sensorOn'+i" class="power-switch" @change="keepSwith"></midea-switch2>
        </div>
      </div>
    </scroller></div>
   </div>
</div>
</template>
<script>
import nativeService from "@/common/services/nativeService";
import mideaSwitch2 from "@/midea-component/switch2.vue";

import mideaHeader from "./components/header.vue";
import bigData from "./js/bigData.js";
import cmdFun from "./js/dualCmd.js";

export default {
  components: {
    mideaHeader,
    mideaSwitch2,
  },
  data() {
    return {
      icon:{
        leftImg:"./assets/img/public_ic_back@3x.png",
      },
      list: [
        // { name: "用户指南", subTitle:'',isMargin:true,hasArrow:true,isSwitch:false},

        { name: "感应开关", subTitle:'',isMargin:true,hasArrow:false,isSwitch:true},
        { name: "软水盐", subTitle:'',isMargin:false,hasArrow:true,isSwitch:false},
        { name: "亮碟剂", subTitle:'',isMargin:false,hasArrow:true,isSwitch:false},
        // { name: "水电统计",subTitle:'',isMargin:false},
        // { name: "语音设置",subTitle:'',isMargin:true},
        { name: "联系客服",subTitle:'400-969-9999',isMargin:true,hasArrow:true,isSwitch:false},
      ],
    };
  },
  methods: {
    jumpNext(item) {
      var path = '';
      if(item.name=='用户指南'){
        bigData.dataReport('PAGE_USER_GUIDE');
        path = "settingIndex.js";
        nativeService.goTo(path, {}); 
      }else if(item.name=='软水盐'){
        bigData.dataReport('PAGE_CHANGE_SALT');
        path = "settingSalt.js";
        nativeService.goTo(path, {}); 
      }else if(item.name=='亮碟剂'){
        bigData.dataReport('PAGE_CHANGE_BRIGHT');
        path = "settingBrightDish.js";
        nativeService.goTo(path, {}); 
      }else if(item.name=='语音设置'){
        bigData.dataReport('PAGE_VOICE');
        path = "settingVoice.js";
        nativeService.goTo(path, {}); 
      }else if(item.name=='联系客服'){
        bigData.dataReport('BTN_SERVICE');
        var params ={
          tel: '400-969-9999',
          title: '联系客服',
          desc:'拨打热线电话：400-969-9999',
        }
        nativeService.callTel(params).then((resp) => {
            //nativeService.toast(resp)
          }).catch((error) => {
            nativeService.toast(error)
          })
      }else if(item.name=='水电统计'){
        bigData.dataReport('PAGE_WATER');
        path = "chart.js";
        nativeService.goTo(path, false, true); 
      }
    },
    headerClick: function(tag){
      console.log('headerClick:'+tag);
      switch(tag){
        case 'leftImgClick':
          nativeService.goBack();
          break;
        case 'rightImgClick':
          nativeService.goTo('memberIndex.js',{});
          break;
        case 'secondImgClick':
          break;
        }
    },
    keepSwith: function(event){
      var self = this;
      var isSensorOn = event.value;
      let value = isSensorOn?0x01:0x00;
      let cmd = cmdFun.cmdSetSensor(value);
      nativeService.showLoading();
      nativeService.startCmdProcess("control",cmd,function(suc) {
        nativeService.hideLoading();
        var arr = suc.replace(/\[|]/g, "").split(",");//去掉中括号
        // let statusObj = cmdFun.analysisCmd(arr);
        // self.analysisFun(statusObj);
        // nativeService.alert(arr);
        if(isSensorOn){
          nativeService.toast('洗碗机感应开关已打开');
        }else{
          nativeService.toast('洗碗机感应开关已关闭');
        }
      },function(fail) {
        nativeService.hideLoading();
        nativeService.toast('当前网络不佳,请稍后重试');
      });

    },
    analysisFun: function(status) {
      var self = this;
      let isUpLackSalt = (status.boxUp.displaySign.detail.salt.value == 0x01);
      let isUpLackBright = (status.boxUp.displaySign.detail.brightDishAgent.value == 0x01);
      let isDownLackSalt = (status.boxDown.displaySign.detail.salt.value == 0x01);
      let isDownLackBright = (status.boxDown.displaySign.detail.brightDishAgent.value == 0x01);
      let isSensorOn = (status.boxUp.sensor.value == 0x00);
      self.list[1].subTitle = (isUpLackSalt?'上柜缺少':'上柜充足')+','+(isDownLackSalt?'下柜缺少':'下柜充足');
      self.list[2].subTitle = (isUpLackBright?'上柜缺少':'上柜充足')+','+(isDownLackBright?'下柜缺少':'下柜充足');
      Vue.set(self.$refs['sensorOn0'][0],'checked',isSensorOn);
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
.wrapper {
  background-color: rgb(242, 242, 242);
}
.guide_list {
  height: 1500px;
  position: relative;
}
.flex_center {
  flex-direction: row;
  justify-content: center;
  align-items: center;
}
.member_bg{
  width: 750px;
  height: 399px;
}
.member_item{
  position: absolute;
  top: 40px;
  width: 750px;
}
.member_icon{
  width: 148px;
  height: 148px;
}
.member_title{
  font-size: 32px;
  margin-top: 30px;
}
.member_sub_title{
  font-size: 26px;
  margin-top: 10px;
  color: #5aa6fd;
}
.member_dec_title{
  font-size: 26px;
  margin-top: 10px;
  color: #afafaf;
}

.icon_title{
  flex-direction: row;
  align-items: center;
}
.item_img{
  width: 40px;
  height: 40px;
}
.guide_list_item {
  width: 750px;
  height: 100px;
  padding-left:32px;
  padding-right: 32px; 
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  position: relative;
  background-color: #fff;
  
}
.guide_item_boder {
  border-width: 2px;
  border-style: solid;
  border-color: rgb(250, 250, 250);
}
.guide_item_text {
  font-size: 30px;
  height: 100px;
  line-height: 100px;
}
.guide_item_top {
  margin-top: 24px;
}
.item_sec_desc{
  font-size: 28px;
  height: 100px;
  line-height: 100px;
  margin-right: 20px;
  color: #949494;
}
.next_img {
  width:10px;
  height:20px;
}

.demo_section {
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