<template>
  <div class="wrapper" :style="{height:screenH+'px'}" @viewdisappear="viewdisappear" @viewappear="viewappear">
     <div>
      <midea-header title="推荐程序" :isImmersion="true" bgColor="rgb(92,117,245)" title-color="#ffffff"
      leftImg="assets/img/public_ic_white@3x.png" 
      rightImg="assets/img/home_btn_more@2x.png"
      @headerClick="headerClick"></midea-header>
    </div>
    <div class="container" :style="{height:(screenH-128)+'px'}">
        <div class="standby-status">
          <div class="tabFrame flex-column-center">
            <midea-tab v-if="false" :tabArray="[]" :cuStyle="{}" @tabClicked="tabClicked"/>
            <div class="tab-area"></div>
          </div>
          <div class="status flex-column-center">
              <text :class="[currentRecord.time >99 ? 'status-time-small':'status-time']">{{currentRecord.time}}</text>
              <text class="status-time-desc">{{Language.statusDes}}</text>
          </div>
          <div class="flex-column-center">
              <text v-if="false" class="status-work">待机中</text>
              <text class="status-temp">水温: {{currentRecord.temp}}℃</text>
              <text class="status-program">推荐程序: {{currentRecord.text}}</text>
              <text class="status-program-reason">{{currentRecord.dec}}</text>
          </div>
          <text :class="[currentRecord.time >99 ? 'status-unit':'status-unit-small']">{{Language.statusUnit}}</text>
        </div>
        <div class="standby-footer">
          <div class="btn-lay flex-row-center" :style="{'height':(isipx?112+ipxBottom+'px':112+'px'),'padding-bottom':(isipx?ipxBottom+'px':'0px')}">
            <midea-img-btn class="btn-img border-bottom" text="预约" :img="icon.btnOrder" @Clicked="btnClick('btn_order')"></midea-img-btn>
            <div v-if="false" class="btn-divider"></div>
            <midea-img-btn class="btn-img border-bottom" style="margin-left:-1px;" text="启动" :img="icon.btnStart" @Clicked="btnClick('btn_start')"></midea-img-btn>
          </div>
        </div>
      </div>
      
  </div>
</template>
<style scoped>
.wrapper {
  width: 750px;
  background-color: rgb(92,117,245);
  background-color: -moz-linear-gradient(top, rgb(92,117,245) 0%, rgb(78,104,246) 100%);
  background-color: -webkit-linear-gradient(top, rgb(92,117,245) 0%, rgb(78,104,246) 100%);
  background-color: linear-gradient(to bottom, rgb(92,117,245) 0%, rgb(78,104,246) 100%);
  background-color: -o-linear-gradient(top,rgb(92,117,245), rgb(78,104,246));
  color: white;
}
.flex-row-center {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}
.flex-column-center {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.tabFrame {
  margin-top: 45px;
}
.tab-area {
  width: 750px;
  height: 64px;
  position: relative;
}
.status {
  margin-top: 60px;
  color: #fff;
}
.status-time {
  font-family: Roboto-Light;
  color: #fff;
  font-size: 210px;
  height: 220px;
  line-height: 220px;
}
.status-time-small {
  font-family: Roboto-Light;
  color: #fff;
  font-size: 180px;
  height: 220px;
  line-height: 220px;
}
.status-time-desc {
  margin-top: 10px;
  font-size: 32px;
  color: #fff;
}
.status-unit {
  position: absolute;
  font-size: 40px;
  left: 530px;
  top: 200px;
  color: #fff;
}
.status-unit-small {
  position: absolute;
  font-size: 40px;
  left: 510px;
  top: 200px;
  color: #fff;
}
.status-temp {
  margin-top: 60px;
  font-size: 34px;
  color: #fff;
}
.status-program {
  margin-top: 110px;
  font-size: 36px;
  color: #fff;
}
.status-program-reason{
  margin-top: 40px;
  font-size: 28px;
  color: #fff;
}

.btn-lay {
  width: 750px;
  height: 112px;
  position: absolute;
  background-color: #fff;
  left: 0px;
  bottom: 0px;
}
.btn-img {
  flex: 1;
}
.border-left {
  border-width: 1px;
  border-style: solid;
  border-left-color: rgb(220, 220, 220);
}
.border-bottom {
  border-width: 1px;
  border-style: solid;
  border-bottom-color: rgb(220, 220, 220);
}
.standby-footer {
  position: absolute;
  background-color: #fff;
  width: 750px;
  height: 112px;
  left: 0px;
  bottom: 0px;
}
.btn-divider {
  width: 2px;
  height: 112px;
  background-color: rgb(220, 220, 220);
}
</style>
<script>
import nativeService from "@/common/services/nativeService";
import mideaImgBtn from "./components/imgButton.vue";
import mideaTab from "./components/mTab.vue";
import mideaHeader from "./components/header.vue";
import Language from "./value/string.js";
import cmdFun from "./js/dualCmd.js";
import modeFun from "./js/modeConfig.js";
import orderFun from "./js/order.js";
const globalEvent = weex.requireModule("globalEvent");
const picker = weex.requireModule("picker");

export default {
  components: {
    mideaHeader,
    mideaImgBtn,
    mideaTab
  },
  data() {
    return {
      screenH: 750 / weex.config.env.deviceWidth * weex.config.env.deviceHeight,
      ipxBottom: 108,
      Language:Language,
      icon:{
        btnOrder: "./assets/img/btn_order.png",
        btnStart: "./assets/img/btn_start.png",
      },
      selectContent: modeFun.getSupportMode(),
      currentRecord: {},
      orderObj:{
        dayIndex:0,
        hourIndex:0,
        minuteIndex:0,
      },

  
    };
  },
  methods: {
    headerClick: function(tag){
      console.log('headerClick:'+tag);
      switch(tag){
        case 'leftImgClick':
          nativeService.goTo('weex.js',{});
          break;
        case 'rightImgClick':
          break;
        case 'secondImgClick':
          break;
        }
    },
    analysisFun(analysisObj) {
      var self = this;
      var isError = analysisObj.boxUp.isError.value;
      var status = analysisObj.boxUp.workingState.value;
      if (status == 0 || status == 1 || status == 4 || isError) {
        //self.jumpNext("standby");
      }else if(status == 2 || status == 3){
        nativeService.goTo('weex.js',{});
      }
    },
    viewdisappear: function() {
      globalEvent.removeEventListener("receiveMessage");
    },
    viewappear: function() {
      var self = this;
      self.listenerFun();
    },
    queryStatus: function() {
      var self = this;
      cmdFun.queryStatus(function(statusObj){
        self.analysisFun(statusObj);
      });
    },
    btnClick: function(tag) {
      var self = this;
      var sendCmd ='';
      switch (tag) {
        case "btn_order":
          self.pickOrderTime();
          break;
        case "btn_start":
          sendCmd = cmdFun.createControlMessage(self.currentRecord.mode,0x00);
          nativeService.showLoading();
          nativeService.startCmdProcess("control",sendCmd,function(suc) {
              nativeService.hideLoading();
              var arr = suc.replace(/\[|]/g, "").split(",");//去掉中括号
              var statusObj = cmdFun.analysisCmd(arr);
              self.analysisFun(statusObj);
          },function(fail) {
              nativeService.hideLoading();
          });
          break;
      }
    },
    pickOrderTime:function() {
      var self = this;
      var myDate = new Date();//获取系统当前时间,东8区相差8小时
      var currentHour = myDate.getHours();
      var currentMinute = myDate.getMinutes();
  
      var itemsDay = ['今天','明天'];
      var itemsHour = [],itemsMinute = [];
      for(var i=0; i<24; i++){
          itemsHour.push(i+'');
      };
      for(var key=0; key<=59; key++){
          itemsMinute.push(key+'');
      };
      
      var pickItem = [{index: self.orderObj.dayIndex,item: itemsDay,label: ""},
        {index: self.orderObj.hourIndex,item: itemsHour,max: 20,min: 10,label: "时"},
        {index: self.orderObj.minuteIndex,item: itemsMinute,label: "分"}];
      picker.pick({
              'items': pickItem,
              'title': '请选择时间', //取消和确定中间那标题
              'cancelTxt': '取消', //取消按钮文字
              'confirmTxt': '确定', //确定按钮文字,
              'cancelTxtColor': '#020F13', //取消颜色
              'confirmTxtColor': '#020F13', //标题颜色
              'titleColor': '#020F13', //标题颜色
              'titleBgColor': '#E7EDEF' //标题栏颜色
          }, event => {
              var data = event.data;
              var dataArr = data.replace("[", "").replace("]", "").split(",");
              self.orderObj.dayIndex = dataArr[0];
              self.orderObj.hourIndex = dataArr[1];
              self.orderObj.minuteIndex = dataArr[2];
  
              var day = 0;
              var sendAllMinutes = parseInt(itemsHour[self.orderObj.hourIndex])*60+parseInt(itemsMinute[self.orderObj.minuteIndex]);
              var currentAllMinutes = currentHour*60+currentMinute;
              if(itemsDay[self.orderObj.dayIndex]=='今天'){
                day = 0;
                if(sendAllMinutes<=currentAllMinutes){
                  nativeService.toast("选择的时间不能少于当前时间哦");
                  return;
                }
              }
              if(itemsDay[self.orderObj.dayIndex]=='明天'){
                day = 1;
                sendAllMinutes = day*24*60+parseInt(itemsHour[self.orderObj.hourIndex])*60+parseInt(itemsMinute[self.orderObj.minuteIndex]);
              }
              var sendHour = parseInt((sendAllMinutes - currentAllMinutes)/60);
              var sendMinute = (sendAllMinutes - currentAllMinutes)%60;
  
              var sendCmd = cmdFun.cmdOrderWashing(self.currentRecord.mode,0,sendHour,sendMinute);
              nativeService.showLoading();
              nativeService.startCmdProcess("control",sendCmd,function(suc) {
                  nativeService.hideLoading();
                  var arr = suc.replace(/\[|]/g, "").split(",");//去掉中括号
                  var analysisObj = cmdFun.analysisCmd(arr);
                  self.analysisFun(analysisObj);
                },function(fail) {
                  nativeService.hideLoading();
                }
              );
          });
      },
    listenerFun(){
       var self = this;        
      globalEvent.addEventListener("receiveMessage", function(e) {
          var arr = e.replace(/\[|]/g, "").split(",");//去掉中括号
          var analysisObj = cmdFun.analysisCmd(arr); //解析04上行指令
          self.analysisFun(analysisObj);
        });
    },
  },
  created() {
    var self = this;
    self.queryStatus();
    nativeService.getItem("smartSelectedMode", function(obj) {
        var dataJson = JSON.parse(obj.data);
        var isHasMode = false;
        for(var i=0;i<self.selectContent.length;i++){
          if(dataJson.sendMode == self.selectContent[i].mode){
            self.currentRecord = self.selectContent[i];
            isHasMode = true;
            break;
          }
        }
        if(!isHasMode){
          self.currentRecord = self.selectContent[0];
        }
    }); 
  },
  computed:{
    isipx: function() {
      return weex && (
                weex.config.env.deviceModel === 'iPhone10,3' || weex.config.env.deviceModel === 'iPhone10,6' //iphoneX
                || weex.config.env.deviceModel === 'iPhone11,8' //iPhone XR
                || weex.config.env.deviceModel === 'iPhone11,2' //iPhone XS
                || weex.config.env.deviceModel === 'iPhone11,4' || weex.config.env.deviceModel === 'iPhone11,6' //iPhone XS Max
                );
    },
  }
  
};
</script>
