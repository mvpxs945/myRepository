<template>
    <div class="wrapper" @viewdisappear="viewdisappear" @viewappear="viewappear">
      <div class="content" :style="{'height':screenH+'px'}">
        <midea-header :title=Language.title :isImmersion="true"
          :leftImg="icon.leftImg"
          :rightImg="icon.rightImg"
          @headerClick="headerClick"
          :titleColor="style.header.titleColor"
          :fontSize="style.header.fontSize"
          :bgColor="style.header.bgColor"
        ></midea-header>
      <div class="container">
        <div v-if="curStatus=='standby'" :style="{'padding-bottom':(isipx?ipxBottom+'px':'0px')}" key="standby">
          <div class="standby-status">
            <div class="flex-column-center">
              <div class="tab-area">
                <midea-tab  v-if="false" class="tabFrame" :tabArray="tabData" :cuStyle="tabStyle" @tabClicked="tabClicked"/>
                <image :src="icon.smartHelper" class="smart-helper" @click="btnClick('smartHelper')"/>
              </div>
            </div>
            <div class="status flex-column-center">
                <text :class="[curMode.time >99 ? 'status-time-small':'status-time']">{{curMode.time}}</text>
                <text class="status-time-desc">{{Language.statusDes}}</text>
            </div>
            <div class="flex-column-center">
                <text v-if="false" class="status-work">待机中</text>
                <text class="status-temp">水温: {{curMode.temp}}℃</text>
            </div>
            <text :class="[curMode.time >99 ? 'status-unit':'status-unit-small']">{{Language.statusUnit}}</text>
            <div class="error-bar-lay" v-if="(isError || isDoorOpen) && isErrorBoxShow" @click="errorShow">
              <error-bar :msg="errorDec"></error-bar>
            </div>
          </div>
          <div class="standby-footer" :style="{'height':(isipx?((screenH*0.3 + 98 + ipxBottom) +'px'):((screenH*0.3 + 98) +'px'))}">
            <div>
              <div v-if="true" class="flow-tab-lay">
                <midea-flow-tab ref="flowTab" class="flow-tab" 
                  :tabArrayData="flowTabData" @tabClicked="flowTabClicked"></midea-flow-tab>
                <div v-if="false" class="left-arrow-lay flex-column-center">
                  <image class="down-arrow" :src="icon.leftArrow"/>
                </div>
                <div v-if="false" class="right-arrow-lay flex-column-center">
                  <image class="down-arrow" :src="icon.rightArrow"/>
                </div>
              </div>
            </div>
            <div>
              <midea-cell title="保管" :desc="keepDesc" height="120"  @mideaCellClick="btnClick('WashKeep')">
                <div slot="value">
                  <midea-switch2 ref="isKeepOn" :checked="isKeepOn" class="power-switch" @change="keepSwith"></midea-switch2>
                </div>
              </midea-cell>
              <midea-cell v-if="curMode.additionalArr" key="addition" title="附加功能" :right-text="additionTitle" :has-arrow="true" height="120" @mideaCellClick="btnClick('addAddition')">
              </midea-cell>
              <midea-cell v-if="curMode.diyProgram" key="diyProgram" title="DIY程序" :right-text="diyTitle" :has-arrow="true" height="120" @mideaCellClick="btnClick('setDiyProgram')">
              </midea-cell>
            </div>
            <div class="btn-lay flex-row-center" :style="{'bottom':(isipx?ipxBottom+'px':'0px')}">
              <midea-img-btn class="btn-img border-top" text="预约" :img="icon.btnOrder" @Clicked="btnClick('btn_order')"></midea-img-btn>
              <midea-img-btn class="btn-img border-top" text="启动" :img="icon.btnStart" @Clicked="btnClick('btn_start')"></midea-img-btn>
            </div>
          </div>
        </div>
        <div v-if="curStatus=='working'" class="container" :style="{height:(screenH-128)+'px','padding-bottom':(isipx?ipxBottom+'px':'0px')}" key="working">
          <div class="standby-status flex-column-center">
            <div class="flex-column-center">
              <div class="tab-area">
                <midea-tab v-if="false"  class="tabFrame" :tabArray="tabData" :cuStyle="tabStyle" @tabClicked="tabClicked"/>
              </div>
            </div>
            <div class="status-circle flex-column-center">
                <text :class="[statusObj.time > 99?'status-work-time-small':'status-work-time']">{{statusObj.time}}</text>
                <text class="status-work-time-desc">{{Language.timeLeft}}</text>
            </div>
            <text :class="[statusObj.time > 99?'status-work-unit-small':'status-work-unit']">{{Language.statusUnit}}</text>
            <text class="status-work-ing">{{statusObj.status}}</text>
            <div v-show="!statusObj.isPause" class="status-stage flex-row-center">
              <span class="flex-row-center" v-for="(item,index) in curMode.stageStep" :key="index">
                <text  :class="[statusObj.curStage == item.value?'stage-step':'stage-step-normal']" >{{item.name}}</text>
                <text v-if="index != (curMode.stageStep.length-1)" class="stage_shape">&#8594;</text>
              </span>
            </div>
          </div>
          <div class="down-block flex-row-sp" :style="{'bottom':(isipx?ipxBottom+60+'px':'60px')}">
              <div v-for="(model,index) in modeList" :key="index" @click="modelClick(curStatus,index)">
                  <image class="down-icon" :src="model.modelImg"/>
                  <text class="down-text">{{model.modelName}}</text>
              </div>
          </div>
        </div>
        <div v-if="curStatus=='order'" class="container" :style="{height:(screenH-128)+'px','padding-bottom':(isipx?ipxBottom+'px':'0px')}" key="order">
          <div class="standby-status flex-column-center">
            <div class="flex-column-center">
              <div class="tab-area">
          <midea-tab v-if="false"  class="tabFrame" :tabArray="tabData" :cuStyle="tabStyle" @tabClicked="tabClicked"/>
        </div>
            </div>
            <div class="status-circle flex-column-center">
                <text class="status-app-day">倒计时</text>
                <text class="status-app-time">{{statusObj.ordertime}}</text>
                <text class="status-app-time-desc">后启动</text>
            </div>
            <text v-if="false" class="status-work-unit">{{Language.statusUnit}}</text>
            <text class="status-work-ing">{{statusObj.status}}</text>
          </div>
          <div class="down-block flex-row-sp" :style="{'bottom':(isipx?ipxBottom+60+'px':'60px')}">
              <div v-for="(model,index) in orderList" :key="index" @click="modelClick(curStatus,index)">
                  <image class="down-icon" :src="model.modelImg"/>
                  <text class="down-text">{{model.modelName}}</text>
              </div>
          </div>
        </div>
      </div>
      <midea-dialog class="dialog" :show="(isError || isDoorOpen) && !isErrorBoxShow" cancelText="我已了解" confirmText="联系客服" :title="errorDec"
                mainBtnColor="#267AFF" secondBtnColor="#267AFF"
                @cancel="dialogClick('CancelBtnClicked')"
                @confirm="dialogClick('ConfirmBtnClicked')"
                :errorContentList="errorContentList"></midea-dialog>
      <midea-dialog class="dialog" :show="isCancelShow" cancelText="取消" confirmText="确认" title="温馨提醒"
                mainBtnColor="#267AFF" secondBtnColor="#267AFF"
                @cancel="dialogClick('cancelWash')"
                @confirm="dialogClick('washStart')"
                :errorContentList="keepContentList"></midea-dialog>
      <midea-diy-box :show="isDiyBoxShow" @confirm="diyConfirm" @cancel="diyCancel"></midea-diy-box>
      </div>
    </div>
</template>
<script>
/*
* 上下室的项目因为上下柜状态  上柜工作，下柜待机切换导致页面错乱，暂时做到一个页面内,同样将上下室里的预约也做到一起。
* 
*/
import nativeService from "@/common/services/nativeService";
import mideaSwitch2 from "@/midea-component/switch2.vue";

import mideaHeader from "./components/header.vue";
import mideaTab from "./components/mTab.vue";
import mideaFlowTab from "./components/mFlowTab.vue";
import navTextList from "./components/navTextList.vue";
import mideaCell from "./components/cell.vue";

import mideaImgBtn from "./components/imgButton.vue";
import mideaDialog from './components/errorDialog.vue';
import errorBar from './components/errorBar.vue';
import mideaDiyBox from './components/diyBox.vue';


import Language from "./value/string.js";
import cmdFun from "./js/cmd.js";
import modeDefault from "./js/modeConfigDf.js";
import modeFun from "./js/modeConfig.js";
import modeFunV2 from "./js/modeConfigV2.js";
import httpRequest from "./js/http.js";
import bigData from "./js/bigData.js";

const globalEvent = weex.requireModule("globalEvent");
const picker = weex.requireModule("picker");

export default {
  components: {
    mideaHeader,
    mideaTab,
    mideaFlowTab,
    navTextList,
    mideaCell,
    mideaSwitch2,
    mideaImgBtn,
    mideaDialog,
    errorBar,
    mideaDiyBox
  },
  data() {
    return {
      screenH: 750 / weex.config.env.deviceWidth * weex.config.env.deviceHeight,
      isX4V2: false,
      ipxBottom: 108,
      Language: Language,
      curStatus: "standby",
      cmdStatus: {},
      statusObj: {
        status: "工作中",
        time: "60",
        ordertime: "--",
        curStage: 1,
        isPause:false,
        setKeepTime:72,
        keepTime:0,
        
      },
      curMode:{},
      curBox: "TYPE_BOX_UP",
      isKeepOn:false, // 保管功能是否开启
      isError:false,
      isErrorBoxShow:false,
      isDoorOpen:false,
      isDiyBoxShow:false,
      errorDec:"洗碗机有异常啦,点击查看详情~",
      errorContentList:[],
      isKeepShow:false,
      isCancelShow:false,
      keepDec:"",
      keepContentList:[],
      errorData:{},

      dataPick:{
        hour:0,
        min:0,
        day:0,
        addition:0,
        diyProgram:0,
        diyMainTemp:0,
        diyWashTemp:0,
        itemProgram:[],
        itemMainTemp:[],
        itemWashTemp:[],
      },
      icon: {
        leftImg: "./assets/img/public_ic_white@3x.png",
        rightImg: "./assets/img/setting.png",
        secondImg: "./assets/img/child_unlock.png",
        start: "./assets/img/fun_start_blue.png",
        downArrow: "./assets/img/arrow_down.png",
        upArrow: "./assets/img/arrow_up.png",
        leftArrow: "./assets/img/arrow_left.png",
        rightArrow: "./assets/img/arrow_right_w.png",
        btnOrder: "./assets/img/btn_order.png",
        btnStart: "./assets/img/btn_start.png",
        smartHelper:"./assets/img/ai_assistant.png",
        iconOn:"./assets/img/switch_on.png",
        iconOff:"./assets/img/switch_off.png",
      },
      style: {
        header: {
          bgColor: "#5C75F6",
          fontSize: "32",
          titleColor: "#fff"
        }
      },
      tabStyle: {
        bgColor: "#6175FF",
        borderColor: "#ffffff",
        tabselectedBg: {
          backgroundColor: "#ffffff",
          borderColor: "#ffffff",
          tabtxtselectedColor: "#6175FF"
        },
        tabUnselectedBg: {
          backgroundColor: "#6175FF",
          borderColor: "#ffffff",
          tabtxtUnselectedColor: "#ffffff"
        }
      },
      tabData: [
        { name: "上抽屉", selected: true, isWorking: false },
        { name: "下抽屉", selected: false, isWorking: false }
      ],
      
      orderList: [
        { modelName: "取消预约", modelImg: "./assets/img/work_stop.png" },
        { modelName: "立即洗涤", modelImg: "./assets/img/work_start.png" }
      ],
      flowTabData: []
    };
  },
  methods: {
    headerClick: function(tag) {
      console.log("headerClick:" + tag);
      switch (tag) {
        case "leftImgClick":
          nativeService.backToNative();
          break;
        case "rightImgClick":
          nativeService.goTo("memberIndex.js", {});
          break;
        case "secondImgClick":
          break;
      }
    },
    tabClicked: function(index) {
      var self = this;
      self.curBox = index == 0 ? "TYPE_BOX_UP" : "TYPE_BOX_DOWN";
      for (var i = 0; i < self.tabData.length; i++) {
        if (i == index) {
          self.tabData[i].selected = true;
        } else {
          self.tabData[i].selected = false;
        }
      }
      self.updateUI();
    },
    flowTabClicked: function(event) {
      var self = this;
      self.curMode = self.flowTabData[event].mode;
    },
    itemClicked: function(event) {},

    errorShow:function(){
      var self = this;
      if (self.isError) {
        self.isErrorBoxShow = false;
      }
      if(self.isDoorOpen){
        return;
      }
    },

    dialogClick:function(tag){
      var self = this;
      switch(tag){
        case 'CancelBtnClicked':
          self.isErrorBoxShow = true;
          break;
        case 'ConfirmBtnClicked':
          self.isErrorBoxShow = true;
          var params ={
            tel: '400-889-9315',
            title: '联系客服',
            desc:'拨打热线电话：400-889-9315',
          }
          nativeService.callTel(params).then((resp) => {
              //nativeService.toast(resp)
            }).catch((error) => {
              nativeService.toast(error)
          });
          break;
        case 'keepAfterStart':
          self.isKeepShow = false;
          let keepValue1 = 0x01;
          self.keepCmdControl(keepValue1);
          break;
        case 'keepNowStart':
          self.isKeepShow = false;
          let keepValue2 = 0x02;
          self.keepCmdControl(keepValue2);
          break;
        case 'cancelWash':
          self.isCancelShow = false;
          break;
        case 'washStart':
          self.isCancelShow = false;
          if(self.curStatus == 'working'){
            self.btnClick('btn_work_cancel');
          }else if(self.curStatus == 'order'){
            self.btnClick('btn_order_cancel');
          }
          break;
        }
      },
    keepCmdControl:function(keepValue){
      //保管功能
      var self = this;
      
      var cmd = cmdFun.cmdSafeKeep(keepValue);
      // nativeService.alert('下行：'+cmd);
      nativeService.showLoading();
      nativeService.startCmdProcess("control",cmd,function(suc) {
        nativeService.hideLoading();
        var arr = suc.replace(/\[|]/g, "").split(",");//去掉中括号
        let statusObj = cmdFun.analysisCmd(arr);
        // nativeService.alert('上行：'+arr);
	 // 下发保管开启或关闭命令时，为了避免设备上报错误保管状态
          // nativeService.alert('keepValue：'+keepValue);
          if (keepValue == 0x01) {
            statusObj.boxUp.displaySign.detail.keepFresh.value = 1;
          } else {
            statusObj.boxUp.displaySign.detail.keepFresh.value = 0;
          }
        self.analysisFun(statusObj);
      },function(fail) {
        nativeService.hideLoading();
        nativeService.toast('当前网络不佳,请稍后重试');
        setTimeout(function(){
          Vue.set(self.$refs.isKeepOn,'checked',self.isKeepOn);
        },500);
      });
    },
    keepSwith: function(event) {
      var self = this;
      if(self.isError){
        setTimeout(function(){
          Vue.set(self.$refs.isKeepOn,'checked',self.isKeepOn);
        },1000);
        nativeService.toast('故障中,无法操作~');
        return;
      }
      if(self.isDoorOpen){
        setTimeout(function(){
          Vue.set(self.$refs.isKeepOn,'checked',self.isKeepOn);
        },1000);
        nativeService.toast('门开中,无法操作~');
        return;
      }
      self.isKeepOn = event.value;
      if(self.isKeepOn){
        bigData.dataReport('BTN_KEEP');
	let keepValue = 0x01;
        self.keepCmdControl(keepValue);
      }else {
        let keepValue = 0x00;
        self.keepCmdControl(keepValue);
      }
      
    },
    pickKeepTime() {
      var self = this;
      if(self.statusObj.keepTime != 0) {return;}
      const itemsDay = ["0", "1", "2"];
      const itemsHour = ["0","1","2","3","4","5","6","7","8","9","10","11","12",
        "13","14","15","16","17","18","19","20","21","22","23","24"];
      var pickItem = [{index: self.dataPick.day,item: itemsDay,label: "天"},
        {index: self.dataPick.hour,item: itemsHour,label: "时"}];
      picker.pick({
          items: pickItem,
          title: "请选择时间", //取消和确定中间那标题
          cancelTxt: "取消", //取消按钮文字
          confirmTxt: "确定", //确定按钮文字,
          cancelTxtColor: "#020F13", //取消颜色
          confirmTxtColor: "#020F13", //标题颜色
          titleColor: "#020F13", //标题颜色
          titleBgColor: "#E7EDEF" //标题栏颜色
        },event => {
          var data = event.data;
          var dataArr = data.replace("[", "").replace("]", "").split(",");
          self.dataPick.day = dataArr[0];
          self.dataPick.hour = dataArr[1];
          if(dataArr[0] == 0 && dataArr[1] == 0){
            nativeService.toast('保管设置时间应大于0小时哦~');
            return;
          }
          var allHour = parseInt(itemsDay[dataArr[0]]) * 24 + parseInt(itemsHour[dataArr[1]]);
          var sendCmd = cmdFun.cmdSetSafeKeep(allHour);
          // nativeService.alert('下行：'+sendCmd);
          nativeService.showLoading();
          nativeService.startCmdProcess("control",sendCmd,function(result) {
            nativeService.hideLoading();
            var arr = result.replace(/\[|]/g, "").split(",");//去掉中括号
            // nativeService.alert('上行：'+arr);
            var analysisObj = cmdFun.analysisCmd(arr);
            self.analysisFun(analysisObj);
          },function(fail) {
            nativeService.hideLoading();
            nativeService.toast('当前网络不佳,请稍后重试');
          }
          );
        }
      );
    },
    pickOrderTime() {
      var self = this;
      var myDate = new Date(); //获取系统当前时间
      var currentHour = myDate.getHours();
      var currentMinute = myDate.getMinutes();
      var itemsDay = ["今天", "明天"];
      var itemsHour = [],itemsMinute = [];
      for (var i = 0; i < 24; i++) {
        itemsHour.push(i + "");
      }
      for (var key = 0; key <= 59; key++) {
        itemsMinute.push(key + "");
      }
      self.dataPick.hour = currentHour;
      self.dataPick.min = currentMinute;
      var pickItem = [{index: self.dataPick.day,item: itemsDay,label: ""},
        {index: self.dataPick.hour,item: itemsHour,max: 20,min: 10,label: "时"},
        {index: self.dataPick.min,item: itemsMinute,label: "分"}];
      picker.pick({
          items: pickItem,
          title: "请选择时间", //取消和确定中间那标题
          cancelTxt: "取消", //取消按钮文字
          confirmTxt: "确定", //确定按钮文字,
          cancelTxtColor: "#020F13", //取消颜色
          confirmTxtColor: "#020F13", //标题颜色
          titleColor: "#020F13", //标题颜色
          titleBgColor: "#E7EDEF" //标题栏颜色
        },event => {
          var data = event.data;
          var dataArr = data.replace("[", "").replace("]", "").split(",");
          self.dataPick.day = dataArr[0];
          self.dataPick.hour = dataArr[1];
          self.dataPick.min = dataArr[2];
          var day = 0;
          var sendAllMinutes = parseInt(itemsHour[self.dataPick.hour]) * 60 +
            parseInt(itemsMinute[self.dataPick.min]);
          var currentAllMinutes = currentHour * 60 + currentMinute;
          if (itemsDay[self.dataPick.day] == "今天") {
            day = 0;
            if (sendAllMinutes <= currentAllMinutes) {
              nativeService.toast("选择的时间不能少于当前时间哦");
              return;
            }
          }
          if (itemsDay[self.dataPick.day] == "明天") {
            day = 1;
            sendAllMinutes = day * 24 * 60 +parseInt(itemsHour[self.dataPick.hour]) * 60 +
              parseInt(itemsMinute[self.dataPick.min]);
          }
          var sendHour = parseInt((sendAllMinutes - currentAllMinutes) / 60);
          var sendMinute = (sendAllMinutes - currentAllMinutes) % 60;
          bigData.dataReportByMode('ORDER',self.curMode.mode);
          var sendCmd = cmdFun.cmdOrderWashing(
            self.curMode.mode,self.curMode.additionalMode,sendHour,sendMinute);
          // nativeService.alert('下行：'+sendCmd);
          nativeService.showLoading();
          nativeService.startCmdProcess("control",sendCmd,function(suc) {
              nativeService.hideLoading();
              var arr = suc.replace(/\[|]/g, "").split(",");//去掉中括号
              // nativeService.alert('上行：'+arr);
              var analysisObj = cmdFun.analysisCmd(arr);
              self.analysisFun(analysisObj);
            },function(result) {
              nativeService.hideLoading();
              nativeService.toast('当前网络不佳,请稍后重试');
            }
          );
        }
      );
    },
    pickAddition() {
      var self = this;
      var additionalArr = self.curMode.additionalArr;
       var itemsDay =[];
      for(let i=0;i<additionalArr.length;i++){
        itemsDay[i] = additionalArr[i].title;
        if(additionalArr[i].additionalMode == self.curMode.additionalMode){
          self.dataPick.addition = i;
        }
      }
      var pickItem = [{index: self.dataPick.addition,item: itemsDay,label: ""}];
      picker.pick({
          items: pickItem,
          title: "附加功能", //取消和确定中间那标题
          cancelTxt: "取消", //取消按钮文字
          confirmTxt: "确定", //确定按钮文字,
          cancelTxtColor: "#020F13", //取消颜色
          confirmTxtColor: "#020F13", //标题颜色
          titleColor: "#020F13", //标题颜色
          titleBgColor: "#E7EDEF" //标题栏颜色
        },event => {
          var data = event.data;
          var dataArr = data.replace("[", "").replace("]", "").split(",");
          self.dataPick.addition = dataArr[0];
          self.curMode.additionalMode = self.curMode.additionalArr[dataArr[0]].additionalMode;
          self.curMode.time = self.curMode.additionalArr[dataArr[0]].time;
          self.curMode.temp = self.curMode.additionalArr[dataArr[0]].temp;
      });
    },
    setDiyProgram() {
      var self = this;
      this.isDiyBoxShow = true;
    },
    diyConfirm: function(event){
      this.isDiyBoxShow = false;
      var self = this;
      if(self.curMode.mode != 12) return;
      let diyMode = event.program;
      let diyMainTemp = parseInt(event.mainTemp);
      let diyWashTemp = parseInt(event.washTemp);
      switch(diyMode){
        case 'DIY1':
          diyMode = 1;
          self.curMode.diySelectIndex = 0;
          self.curMode.time = 18;
          self.curMode.temp = "--";
          self.curMode.stageStep = self.curMode.diyProgram[self.curMode.diySelectIndex].stageStep;
          break;
        case 'DIY2':
          diyMode = 2;
          self.curMode.diySelectIndex = 1;
          self.curMode.time = 29;
          self.curMode.temp = 35;
          self.curMode.stageStep = self.curMode.diyProgram[self.curMode.diySelectIndex].stageStep;
          break;
        case 'DIY3':
          diyMode = 3;
          self.curMode.diySelectIndex = 2;
          self.curMode.time = 100;
          self.curMode.temp = diyWashTemp;
          self.curMode.stageStep = self.curMode.diyProgram[self.curMode.diySelectIndex].stageStep;
          break;
        case 'DIY4':
          diyMode = 4;
          self.curMode.diySelectIndex = 3;
          self.curMode.time = 110;
          self.curMode.temp = diyWashTemp;
          self.curMode.stageStep = self.curMode.diyProgram[self.curMode.diySelectIndex].stageStep;
          break;
        case 'DIY5':
          diyMode = 5;
          self.curMode.diySelectIndex = 4;
          self.curMode.time = 120;
          self.curMode.temp = diyWashTemp;
          self.curMode.stageStep = self.curMode.diyProgram[self.curMode.diySelectIndex].stageStep;
          break;
        case 'DIY6':
          diyMode = 6;
          self.curMode.diySelectIndex = 5;
          self.curMode.time = 130;
          self.curMode.temp = diyWashTemp;
          self.curMode.stageStep = self.curMode.diyProgram[self.curMode.diySelectIndex].stageStep;
          break;
        default:
          diyMode = 0;
          break;
      }
      var sendCmd = cmdFun.cmdStartDiyWashing(diyMode,diyMainTemp,diyWashTemp);
      // nativeService.alert(sendCmd);
      nativeService.startCmdProcess("control",sendCmd,function(result) {
          var result_arr = result.replace(/\[|]/g, "").split(",");//去掉中括号;
          var analysisObj = cmdFun.analysisCmd(result_arr);
          self.analysisFun(analysisObj);
        },function(result) {
      });
    },
    diyCancel:function(event){
      this.isDiyBoxShow = false;
    },
    modelClick:function(curPage,index){
      var self = this;
      if(curPage == 'working' && index == 0){
        self.keepContentList = ['是否结束当前洗涤模式?'];
        self.isCancelShow = true;
        // self.btnClick('btn_work_cancel');
      }else if(curPage == 'working' && index == 1){
        self.btnClick('btn_work_pause');
      }else if(curPage == 'working' && index == 2){
        self.btnClick('btn_work_pause');
      }else if(curPage == 'order' && index == 0){
        self.keepContentList = ['是否取消当前预约模式?'];
        self.isCancelShow = true;
        // self.btnClick('btn_order_cancel');
      }else if(curPage == 'order' && index == 1){
        self.btnClick('btn_order_start');
      }
    },
    btnClick: function(tag) {
      var self = this;
      if(tag != 'btn_order_cancel' && tag != 'btn_work_cancel') {
        if(self.isError){
          nativeService.toast('故障中,无法操作~');
          return;
        }
        if(self.isDoorOpen){
          nativeService.toast('门开中,无法操作~');
          return;
        }
      }
      var sendCmd ='';
      switch (tag) {
        case "btn_order":
          self.pickOrderTime();
          break;
        case "btn_order_cancel":
          sendCmd = cmdFun.cmdCancelOrderWashing();
          // nativeService.alert('下发：'+sendCmd);
          nativeService.showLoading();
          nativeService.startCmdProcess("control",sendCmd,function(suc) {
            nativeService.hideLoading();
            var arr = suc.replace(/\[|]/g, "").split(",");//去掉中括号
            // nativeService.alert('上行：'+arr);
            var analysisObj = cmdFun.analysisCmd(arr);
            self.analysisFun(analysisObj);
            },function(result) {
              nativeService.hideLoading();
              nativeService.toast('当前网络不佳,请稍后重试');
          });
          break;
        case "btn_order_start":
          sendCmd = cmdFun.createOrderControlMessage(self.curMode.mode,self.curMode.additionalMode);
          // nativeService.alert('下发：'+sendCmd);
          nativeService.showLoading();
          nativeService.startCmdProcess("control",sendCmd,function(suc) {
            nativeService.hideLoading();
            var arr = suc.replace(/\[|]/g, "").split(",");//去掉中括号
            // nativeService.alert('上行：'+arr);
            var analysisObj = cmdFun.analysisCmd(arr);
            self.analysisFun(analysisObj);
            },function(result) {
              nativeService.hideLoading();
              nativeService.toast('当前网络不佳,请稍后重试');
          });
          break;
        case "btn_start":
          bigData.dataReportByMode('START',self.curMode.mode);
          sendCmd = cmdFun.createControlMessage(self.curMode.mode,self.curMode.additionalMode);
          // nativeService.alert('下发：'+sendCmd);
          nativeService.showLoading();
          nativeService.startCmdProcess("control",sendCmd,function(suc) {
              // nativeService.alert('上行：'+suc);
              nativeService.hideLoading();
              var arr = suc.replace(/\[|]/g, "").split(",");//去掉中括号
              var statusObj = cmdFun.analysisCmd(arr);
              self.analysisFun(statusObj);
          },function(fail) {
              nativeService.hideLoading();
              nativeService.toast('当前网络不佳,请稍后重试');
          });
          break;
        case "btn_work_cancel":
          sendCmd = cmdFun.cmdCancelWash();
          // nativeService.alert('下发：'+sendCmd);
          nativeService.showLoading();
          nativeService.startCmdProcess("control",sendCmd,function(suc) {
          nativeService.hideLoading();
          var arr = suc.replace(/\[|]/g, "").split(",");//去掉中括号
          // nativeService.alert('上行：'+arr);
          var statusObj = cmdFun.analysisCmd(arr);
          self.analysisFun(statusObj);
          },function(result) {
            nativeService.hideLoading();
            nativeService.toast('当前网络不佳,请稍后重试');
          });
          break;
        case "btn_work_pause":
          var pauseRecord = self.statusObj.isPause?0x01:0x02;
          sendCmd = cmdFun.cmdStartPause(pauseRecord);
          // nativeService.alert('下发：'+sendCmd);
          nativeService.showLoading();
          nativeService.startCmdProcess("control",sendCmd,function(suc) {
            nativeService.hideLoading();
            var arr = suc.replace(/\[|]/g, "").split(",");//去掉中括号
            // nativeService.alert('上行：'+arr);
            var analysisObj = cmdFun.analysisCmd(arr);
            self.analysisFun(analysisObj);
          },function(result) {
            nativeService.hideLoading();
            nativeService.toast('当前网络不佳,请稍后重试');
          });
          break;
        case 'WashKeep':
          self.pickKeepTime();
          break;
        case 'smartHelper':
          bigData.dataReport('BTN_SMART_HELPER');
          nativeService.goTo('helper.js',{});
          break;
        case 'addAddition':
          self.pickAddition();
          break;
        case 'setDiyProgram':
          self.setDiyProgram();
          break;
      }
    },
    listenerFun: function() {
      var self = this;
      globalEvent.addEventListener("receiveMessage", function(event) {
        // nativeService.alert("主动的我来了~"+event.data);
        var arr = event.data.replace(/\[|]/g, "").split(",");
        if (parseInt(arr[9]) == 4 && parseInt(arr[10]) == 1) {
          return;
        }
        var analysisObj = cmdFun.analysisCmd(arr); //解析04上行指令
        self.analysisFun(analysisObj);
      });
      globalEvent.addEventListener("receiveMessageFromApp", function(event) {
        if(event.messageType == 'deviceOnlineStatus'){
          var online = event.messageBody;
          if(online.onlineStatus == 'offline'){
            nativeService.toast('您的设备已离线,请稍后重试~');
            nativeService.backToNative();
          }
        }
      });
    },
    analysisFun: function(status) {
      var self = this;
      self.cmdStatus = status;
      var boxType = self.curBox;
      if(boxType == "TYPE_BOX_UP") {
        self.updateUpUI();
      }else if(boxType == "TYPE_BOX_DOWN"){
        self.updateDownUI();
      }
    },
    updateUpUI:function(){
      var self = this;
      var upStatusObj = self.cmdStatus.boxUp;
      //01-先判断设备状态
      var deviceStatus = upStatusObj.workingState.value;
      var modeValue = upStatusObj.program.value;
      /** 门故障处理 */
      var isError = upStatusObj.isError.value;
      var doorOpen = (upStatusObj.displaySign.detail.doorSwitch.value == 0x00);
      var errorCode = upStatusObj.errorCode.value;
      //03-获取工作剩余时间，预约剩余时间，当前主洗阶段,暂停, 保管状态
      if (deviceStatus == 0x00 || deviceStatus == 0x01 || isError) {
        self.curStatus = "standby";
        self.statusObj.status='待机中';
        for (let i = 0; i < self.flowTabData.length; i++) {
          if (self.flowTabData[i].mode.mode == modeValue) {
            // self.curMode = self.flowTabData[i].mode;
            break;
          }
        }
        self.statusObj.setKeepTime =upStatusObj.setKeepTime.value;
        self.statusObj.keepTime = upStatusObj.keepTime.value;
        self.isKeepOn = (upStatusObj.displaySign.detail.keepFresh.value == 0x01);
        Vue.set(self.$refs.isKeepOn,'checked',self.isKeepOn);
        // self.$refs.isKeepOn.myChecked = self.isKeepOn;
      } else if (deviceStatus == 0x02) {
        self.curStatus = "order";
        if(doorOpen){
          self.statusObj.status='预约中--门开了';
        }else{
          self.statusObj.status='预约中--'+upStatusObj.program.viewArr[modeValue];
        }
        var appHourUp = upStatusObj.appointmentHour.value <= 9 ? '0'+upStatusObj.appointmentHour.value:''+upStatusObj.appointmentHour.value;
        var appMinuteUp = upStatusObj.appointmentMinute.value <= 9? '0'+upStatusObj.appointmentMinute.value:''+upStatusObj.appointmentMinute.value;
        self.statusObj.ordertime = appHourUp+":"+appMinuteUp;
        for (let i = 0; i < self.flowTabData.length; i++) {
          if (self.flowTabData[i].mode.mode == modeValue) {
            self.curMode = self.flowTabData[i].mode;
            break;
          }
        }
      } else if (deviceStatus == 0x03) {
        self.curStatus = "working";
        for (let i = 0; i < self.flowTabData.length; i++) {
          if (self.flowTabData[i].mode.mode == modeValue) {
            self.curMode = self.flowTabData[i].mode;
            break;
          }
        }
        if (upStatusObj.displaySign.detail.startStop.value == 0x00) {
          self.statusObj.isPause = true;
          if(doorOpen){
            self.statusObj.status='暂停中--门开了';
          }else{
            self.statusObj.status='暂停中--'+upStatusObj.program.viewArr[modeValue];
          }
        } else {
          self.statusObj.isPause = false;
          self.statusObj.status='工作中--'+upStatusObj.program.viewArr[modeValue];
        }
        self.statusObj.curStage = upStatusObj.washingStage.value;
        if(self.statusObj.curStage == 0x01 && modeValue == 0x01){ //智能洗 预洗阶段 没有时间显示
          self.statusObj.time = '--';
        }else {
          self.statusObj.time = upStatusObj.programTimeRemaining.value;
        }
        
      }
      /** 门状态 */
      self.isErrorBoxShow = isError || doorOpen;
      self.isError = isError;
      self.isDoorOpen = doorOpen;
      if (doorOpen) {
        self.errorDec = "洗碗机门开了~";
        self.errorContentList = ["请关上门试试是否解决"];
      }
      if (errorCode == 1) {
        self.errorDec = "E1:进水故障";
        self.errorContentList = [
          "请确认以下三点是否解决",
          "1.水压太低",
          "2.进水管堵塞/打折",
          "3.水龙头未打开"
        ];
      }else if(errorCode == 3) {
        self.errorDec = "E3:加热异常";
        self.errorContentList = ["请联系专业维修人员", "400-889-9315"];
      }else if (errorCode == 4) {
        self.errorDec = "E4:发生溢流";
        self.errorContentList = [
          "请确认以下四点是否解决",
          "1.使用清洁精",
          "2.排水管堵塞/打折",
          "3.地面不平",
          "4.外部积水流入机器"
        ];
      }
    },
    updateDownUI: function() {
      
    },
    viewdisappear: function() {
      globalEvent.removeEventListener("receiveMessage");
    },
    viewappear: function() {
      var self = this;
      self.listenerFun();
      self.queryStatus();
    },
    queryStatus: function() {
      var self = this;
      nativeService.showLoading();
      cmdFun.queryStatus(function(statusObj){
      	if (statusObj.boxUp.isX4V2.value == 0x00) {
          self.isX4V2 = 1;
        } else if (statusObj.boxUp.isX4V2.value == 0x01) {
          self.isX4V2 = 2;
        }
        // self.isX4V2 = (statusObj.boxUp.isX4V2.value == 0x01);
        self.initData();
        self.analysisFun(statusObj);
      });
    },
    initData:function() {
      var self = this;
      var supportMode = modeDefault.getSupportMode();
      if (self.isX4V2 == 1) {
        supportMode = modeFun.getSupportMode();
      } else if (self.isX4V2 == 2) {
        supportMode = modeFunV2.getSupportMode();
      } else {
        supportMode = modeDefault.getSupportMode();
      }

      self.flowTabData = [];
      for(let i=0;i<supportMode.length;i++){
        let dataObj = {
          name:supportMode[i].text,
          selected:false,
          mode:supportMode[i]
        }
        if(i == 2){
          dataObj.selected = true;
          self.curMode = supportMode[i];
        }
        self.flowTabData.push(dataObj);
      }
    }
  },
  created() {
      var self = this;
      self.isIOS = weex.config.env.platform == "IOS" ? true : false;
      if (self.isIOS) {
        self.listenerFun();
      }
      self.initData();
      self.queryStatus();
      httpRequest.initDeviceInfo();
      bigData.dataReport('PAGE_MAIN');
    },
  mounted() {
	    let self = this;
  },
  computed:{
    additionTitle:function(){
      var self = this;
      let title ='';
      var addArr = self.curMode.additionalArr;
      for(let i=0;i<addArr.length;i++){
        if(self.curMode.additionalMode == addArr[i].additionalMode){
          title = addArr[i].title;
          break;
        }
      }
      return title;
    },
    diyTitle:function(){
      var self = this;
      let title =self.curMode.diyProgram[self.curMode.diySelectIndex].name;
      return title;
    },
    keepDesc:function(){
      var self = this;
      var desc = "有效去除异味,防霉防返潮(长达72小时)";
      self.statusObj.setKeepTime = parseInt(self.statusObj.setKeepTime)
      self.statusObj.keepTime = parseInt(self.statusObj.keepTime);
      if(self.statusObj.setKeepTime == 0){
        self.statusObj.setKeepTime = 72;
      }
      if(self.statusObj.keepTime != 0){
        desc='保管中,还剩余下: '+self.statusObj.keepTime+'小时';
      }else {
        desc = "有效去除异味,防霉防返潮(长达" + self.statusObj.setKeepTime + "小时)";
      }
      return desc;
    },
    isipx: function() {
      return weex && (
                weex.config.env.deviceModel === 'iPhone10,3' || weex.config.env.deviceModel === 'iPhone10,6' //iphoneX
                || weex.config.env.deviceModel === 'iPhone11,8' //iPhone XR
                || weex.config.env.deviceModel === 'iPhone11,2' //iPhone XS
                || weex.config.env.deviceModel === 'iPhone11,4' || weex.config.env.deviceModel === 'iPhone11,6' //iPhone XS Max
                );
    },
    bottomStyleObj: function(){
      let result;
      if(this.isipx){
        result = {
            height: (this.screenH*0.3 + 84 + 68) +'px',
            paddingBottom:'68px',
        }
      }else {
        result = {
          height: (this.screenH*0.3 + 84) +'px',
          paddingBottom:'0px',
        }
      }
      return result;
    },
    modeList: function(){
      var self = this;
      var modeList = [];
      if(self.statusObj.isPause){
        modeList = [
          { modelName: "取消工作", modelImg: "./assets/img/work_stop.png" },
          { modelName: "继续", modelImg: "./assets/img/work_start.png" }
        ];
      }else {
        modeList = [
          { modelName: "取消工作", modelImg: "./assets/img/work_stop.png" },
          { modelName: "暂停", modelImg: "./assets/img/work_pause.png" },
        ];
      }
      return modeList;
    },
  },
  
};
</script>
<style scoped>
.wrapper {
  width: 750px;
  background-color: #5D75F6;
  background-color: -moz-linear-gradient(top, #5D75F6 0%, #4E69F7 100%);
  background-color: -webkit-linear-gradient(top, #5D75F6 0%, #4E69F7 100%);
  background-color: linear-gradient(to bottom, #5D75F6 0%, #4E69F7 100%);
  background-color: -o-linear-gradient(top,#5D75F6, #4E69F7);
  color: white;
}
.container {
  position: relative;
  width: 750px;
  flex: 1;
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
.error-bar-lay {
  position: absolute;
  width: 750px;
  top: 0px;
  left: 0px;
}
.tabFrame {
  position: absolute;
  left: 240px;
  top: 66px;
}
.tab-area {
  width: 750px;
  height: 136px;
  position: relative;
}
.smart-helper {
  width: 70px;
  height: 70px;
  position: absolute;
  top:66px;
  right: 30px;
}
.status {
  margin-top: 80px;
  color: #fff;
}
.status-time {
  font-family: PingFangSC-Light;
  font-weight:300;
  color: #fff;
  font-size: 200px;
  height: 220px;
  line-height: 220px;
}
.status-time-small {
  font-family: PingFangSC-Light;
  font-weight:300;
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
  top: 210px;
  color: #fff;
}
.status-unit-small {
  position: absolute;
  font-size: 40px;
  left: 510px;
  top: 210px;
  color: #fff;
}

.status-work {
  margin-top: 50px;
  font-size: 38px;
}
.status-temp {
  margin-top: 50px;
  font-size: 38px;
  color: #fff;
}

.standby-footer {
  position: fixed;
  background-color: #fff;
  width: 750px;
  left: 0px;
  bottom: -2px;
}
.flow-tab {
  background-color: #5d75F6;
  width: 750px;
  
}
.flow-tab-lay {
  width: 750px;
  height: 96px;
  margin-top: -2px;
  position: relative;
  background-color: #5d75F6;
}

.left-arrow-lay {
  width: 86px;
  height: 96px;
  position: absolute;
  left: 0px;
  top: 0px;
  background-color: #5d75F6;
}
.right-arrow-lay {
  width: 86px;
  height: 96px;
  position: absolute;
  right: 0px;
  top: 0px;
  background-color: #5d75F6;
}

.down-arrow {
  width: 25px;
  height: 25px;
  margin-left: 25px;
  margin-right:25px;
}
.up-text {
  line-height: 84px;
  margin-left: 20px;
  font-size: 30px;
}
.up-mode-lay {
  flex: 1;
  background-color: #000;
  opacity: 0.1;
}
.up-mode {
  flex: none;
}
.power-switch {
  margin-left: 20px;
}
.btn-lay {
  width: 750px;
  height: 112px;
  position: absolute;
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
.border-top {
  border-width: 1px;
  border-style: solid;
  border-color: rgb(220, 220, 220);
}
.text-white {
  color: #fff;
}
.flex-row-sp {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
}
.status-lay {
  margin-top: 0px;
}
.status-circle {
    margin-top: 20px;
    width: 500px;
    height: 500px;
    border-width: 5px;
    border-color:#ffffff;
    border-style:solid;
    border-radius: 250px;
}
.status-work {
    margin-top: 150px;
    color:#fff;
}
.status-work-time {
    font-family: PingFangSC-Light;
    font-weight: 300;
    color: #fff;
    font-size: 220px;
    margin-bottom: -60px;
}
.status-work-time-small {
    font-family: PingFangSC-Light;
    font-weight: 300;
    color: #fff;
    font-size: 200px;
    margin-bottom: -60px;
}

.status-app-day {
    color: #fff;
    font-size: 40px;
    margin-top: -32px;
    margin-bottom: -15px;
} 

.status-app-time {
    font-family: PingFangSC-Light;
    font-weight: 300;
    color: #fff;
    font-size: 160px;
    margin-bottom: -60px;
} 

.status-app-time-desc {
    margin-top: 50px;
    font-size: 32px;
    color:#fff;
} 

.status-work-time-desc {
    margin-top: 30px;
    font-size: 32px;
    color:#fff;
} 
.status-work-ing {
    margin-top: 60px;
    font-size: 38px;
    width: 400px;
    color:#fff;
    height: 60px;
    line-height: 60px;
    text-align: center;
}
.status-stage {
    margin-top: 20px;
    font-size: 34px;
    width: 400px;
    height: 80px;
    line-height: 80px;
    text-align: center;
    color: #fff;
}
.stage-step {
    font-size: 40px;
    color: #fff;
}
.stage-step-normal {
    font-size: 32px;
    color: rgba(255,255,255,0.7)
}

.stage_shape {
  color: #d0eaf7;
  margin-left: 10px;
  margin-right: 10px;
}

.status-work-unit {
    font-size: 40px;
    position: absolute;
    left:500px;
    top:280px;
    color:#fff;
}
.status-work-unit-small {
    font-size: 40px;
    position: absolute;
    left:520px;
    top:280px;
    color:#fff;
}
.down-block {
    /* padding-top: 100px; */
    position: absolute;
    align-items: center;
    width: 750px;
    padding-left: 120px;
    padding-right: 120px;
    left: 0px;
    bottom: 60px;
}   
.down-icon {
    width: 112px;
    height: 112px;
}
    
.down-text {
    width: 130px;
    margin-top: 15px;
    text-align: center;
    font-size: 28px;
    height: 28px;
    color: #FFFFFF;
}

</style>


