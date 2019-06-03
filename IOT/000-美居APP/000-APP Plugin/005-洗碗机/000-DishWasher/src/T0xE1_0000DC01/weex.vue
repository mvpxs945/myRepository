<template>
    <div class="wrapper" @viewdisappear="viewdisappear" @viewappear="viewappear">
        <midea-header :title=Language.title :isImmersion="true"
          :leftImg="icon.leftImg" :rightImg="icon.rightImg"
          @headerClick="headerClick" 
          :titleColor="style.header.titleColor"
          :fontSize="style.header.fontSize"
          :bgColor="style.header.bgColor"
        ></midea-header>
      <div class="container">
        <div v-if="curStatus=='standby'" class="container" :style="{'padding-bottom':(isipx?ipxBottom+'px':'0px')}" key="standby">
          <div class="standby-status">
            <div class="status flex-column-center" v-if="curMode.mode">
                <text class="status-mode-text">{{curMode.text}}</text>
                <text class="status-mode-desc">{{curMode.dec}}</text>
                <image class="status-standby-bg" :src="contentBg"></image>
                <midea-lottie-view class="status-working-bg" :data="standbyLottie" :loop="true"></midea-lottie-view>
            </div>
            <div class="status flex-column-center" v-if="!curMode.mode">
                <text class="status-mode-text">{{statusText}}</text>
                <image class="status-standby-bg" :src="contentBg"></image>
                <midea-lottie-view class="status-working-bg" :data="standbyLottie" :loop="true"></midea-lottie-view>
            </div>
          </div>
          <div class="standby-footer">
            <div class="salt-lay flex-row-center" @click="btnClick('saltAdd')">
              <text class="salt-title">软水盐</text>
              <text class="salt-text">{{isLackSalt?'缺盐':'充足'}}</text>
              <image class="salt-next" :src="icon.rightArrow"/>
            </div>
            <div class="salt-divider"></div>
            <mode-swipe-list class="status-mode-list" :list="flowTabData" @itemClick="itemClicked"></mode-swipe-list>
            <div :class="['btn-lay','flex-row-center',isBtnEnable?'btn-lay-enable':'btn-lay-disable']">
              <start-btn :enable="isBtnEnable" class="btn-img" text="预约"  @Clicked="btnClick('btn_order')"></start-btn>
              <div class="btn-divide"></div>
              <start-btn :enable="isBtnEnable" class="btn-img" text="启动"  @Clicked="btnClick('btn_start')"></start-btn>
            </div>
          </div>
        </div>
        <div v-if="curStatus=='working'" class="container" :style="{height:(screenH-128)+'px','padding-bottom':(isipx?ipxBottom+'px':'0px')}" key="working">
          <div class="standby-status flex-column-center">
            <div class="status flex-column-center">
                <image class="status-working-bg" :src="contentBg"></image>
                <midea-lottie-view class="status-working-bg" :data="workLottie" :loop="true"></midea-lottie-view>
                <text class="status-mode-text">{{statusText}}</text>
                <text class="status-mode-desc">{{descText}}</text>
            </div>
            <div v-if="!statusObj.isPause" class="status-stage flex-row-center">
              <span class="flex-column-center status-stage-item" v-for="(item,index) in curMode.stageStep" :key="index">
                <text  :class="[statusObj.curStage == item.value?'stage-step':'stage-step-normal']" >{{item.name}}</text>
                <div  :class="[statusObj.curStage == item.value?'stage_shape':'stage_shape_transparent']"></div>
              </span>
            </div>
          </div>
          <div class="standby-footer">
            <div class="working-setting" >
              <div v-if="curMode.mode != 11">
                <midea-cell title="干燥" desc="洗涤完成后速干" height="120">
                <div slot="value">
                  <bugu-switch-vue :checked="isDryOn" class="power-switch" @change="drySetting"></bugu-switch-vue>
                </div>
              </midea-cell>
              <midea-cell title="保管" :desc="keepDesc" height="120"  @mideaCellClick="btnClick('WashKeep')" v-if="isDryOn">
                <div slot="value">
                  <bugu-switch-vue :checked="isKeepOn" class="power-switch" @change="keepSwith"></bugu-switch-vue>
                </div>
              </midea-cell>
              </div>
            </div>
            <div class="btn-lay flex-row-center">
              <start-btn class="btn-img" text="停止"  @Clicked="cancelClick('btn_work_cancel')"></start-btn>
              <div class="btn-divide"></div>
              <start-btn class="btn-img" :text="statusObj.isPause?'继续':'暂停'"  @Clicked="btnClick('btn_work_pause')"></start-btn>
            </div>
          </div>
        </div>
        <div v-if="curStatus=='order'" class="container" :style="{height:(screenH-128)+'px','padding-bottom':(isipx?ipxBottom+'px':'0px')}" key="order">
          <div class="standby-status flex-column-center">
            <div class="status flex-column-center">
                <text class="status-mode-text">{{statusText}}</text>
                <text class="status-mode-desc">{{descText}}</text>
                <image class="status-standby-bg" :src="contentBg"></image>
                <midea-lottie-view class="status-working-bg" :data="workLottie" :loop="true"></midea-lottie-view>
            </div>
          </div>
          <div class="standby-footer">
            <div class="working-setting" >
              <div v-if="curMode.mode != 11">
              <midea-cell title="干燥" desc="洗涤完成后速干" height="120">
                <div slot="value">
                  <bugu-switch-vue :checked="isDryOn" class="power-switch" @change="drySetting"></bugu-switch-vue>
                </div>
              </midea-cell>
              <midea-cell title="保管" :desc="keepDesc" height="120"  @mideaCellClick="btnClick('WashKeep')" v-if="isDryOn">
                <div slot="value">
                  <bugu-switch-vue :checked="isKeepOn"  class="power-switch" @change="keepSwith"></bugu-switch-vue>
                </div>
              </midea-cell>
              </div>
            </div>
            <div class="btn-lay flex-row-center">
              <start-btn class="btn-img" text="取消预约"  @Clicked="cancelClick('btn_order_cancel')"></start-btn>
              <div class="btn-divide"></div>
              <start-btn class="btn-img" text="立即启动"  @Clicked="btnClick('btn_order_start')"></start-btn>
            </div>
          </div>
        </div>
        <div v-if="curStatus=='keepFresh' || curStatus=='drying'" class="container" :style="{height:(screenH-128)+'px','padding-bottom':(isipx?ipxBottom+'px':'0px')}" key="keepFresh">
          <div class="standby-status flex-column-center">
            <div class="status flex-column-center">
                <text class="status-mode-text">{{statusText}}</text>
                <text class="status-mode-desc">{{descText}}</text>
                <image class="status-standby-bg" :src="contentBg"></image>
                <midea-lottie-view class="status-working-bg" :data="workLottie" :loop="true"></midea-lottie-view>
            </div>
          </div>
          <div class="standby-footer" :key="keepFreshBtn">
            <div class="working-setting">
              <div v-if="curStatus=='drying'&& curMode.mode != 11">
                <midea-cell title="保管" :desc="keepDesc" height="120"  @mideaCellClick="btnClick('WashKeep')" :hasTopBorder="true" v-if="isDryOn">
                  <div slot="value">
                    <bugu-switch-vue :checked="isKeepOn" class="power-switch" @change="keepSwith"></bugu-switch-vue>
                  </div>
                </midea-cell>
              </div>
            </div>
            <div class="btn-lay flex-row-center" >
              <start-btn class="btn-img" text="停止"  @Clicked="cancelClick('btn_work_cancel')"></start-btn>
              <!-- <div class="btn-divide" v-if="curStatus=='drying'"></div>
              <start-btn v-if="curStatus=='drying'" class="btn-img" :text="statusObj.isPause?'继续':'暂停'"  @Clicked="btnClick('btn_work_pause')"></start-btn> -->
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
                @cancel="dialogClick('washCancel')"
                @confirm="dialogClick('washStart')"
                :errorContentList="keepContentList"></midea-dialog>
      <midea-diy-box :show="isDiyBoxShow" @confirm="diyConfirm" @cancel="diyCancel"></midea-diy-box>
      <tips-dialog :show="isFirstTips" cancelText="我已了解" confirmText="联系客服" title="使用贴士" @tipClose="tipClose"></tips-dialog>
      <div class="error-bar-lay" v-if="(isError || isDoorOpen || isWaterOut || isLackWater) && isErrorBoxShow && !isFirstTips">
        <error-bar :msg="errorDec" @errorShow="errorShow" :isHiddenTitle="isDoorOpen || isWaterOut || isLackWater"></error-bar>
      </div>
  </div>
</template>
<script>
/*
* 上下室的项目因为上下柜状态  上柜工作，下柜待机切换导致页面错乱，暂时做到一个页面内,同样将上下室里的预约也做到一起。
* 
*/
import nativeService from "@/common/services/nativeService";
import buguSwitchVue from "./components/switch.vue";

import mideaHeader from "./components/header.vue";
import mideaTab from "./components/mTab.vue";
import mideaFlowTab from "./components/mFlowTab.vue";
import navTextList from "./components/navTextList.vue";
import mideaCell from "./components/cellBugu.vue";

import mideaImgBtn from "./components/imgButton.vue";
import mideaDialog from './components/errorDialog.vue';
import errorBar from './components/errorBar.vue';
import mideaDiyBox from './components/diyBox.vue';
import startBtn from "./components/startButton.vue";
import modeSwipeList from "./components/swipeListHor.vue";
import tipsDialog from "./components/tipsDialog.vue";


import Language from "./value/string.js";
import cmdFun from "./js/cmd.js";
import modeFun from "./js/modeConfig.js";
import httpRequest from "./js/http.js";
import bigData from "./js/bigData.js";
import standbyJson from './assets/standby.json';
import workJson from './assets/work.json';

const globalEvent = weex.requireModule("globalEvent");
const picker = weex.requireModule("picker");

export default {
  components: {
    mideaHeader,
    mideaTab,
    mideaFlowTab,
    navTextList,
    mideaCell,
    buguSwitchVue,
    mideaImgBtn,
    mideaDialog,
    errorBar,
    mideaDiyBox,
    startBtn,
    modeSwipeList,
    tipsDialog
  },
  data() {
    return {
      screenH: 750 / weex.config.env.deviceWidth * weex.config.env.deviceHeight,
      standbyLottie:'',
      workLottie:'',
      workAfterLottie:'',
      ipxBottom: 108,
      Language: Language,
      curStatus: "standby",
      curMode:{},
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
      curBox: "TYPE_BOX_UP",
      isKeepOn:false, // 保管功能是否开启
      isDryOn:true,
      isError:false,
      isErrorBoxShow:false,
      isDoorOpen:false,
      isWaterOut:false,
      isLackSalt:false,
      isLackWater:false,
      isFirstTips:false,
      isDiyBoxShow:false,
      errorDec:"洗碗机有异常啦,点击查看详情~",
      errorContentList:[],
      isKeepShow:false,
      isCancelShow:false,
      isBtnEnable:false,
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
        leftImg: "./assets/img/back_white.png",
        rightImg: "./assets/img/more.png",
        secondImg: "./assets/img/share.png",
        start: "./assets/img/fun_start_blue.png",
        downArrow: "./assets/img/arrow_down.png",
        upArrow: "./assets/img/arrow_up.png",
        leftArrow: "./assets/img/arrow_left.png",
        rightArrow: "./assets/img/arrow_right_enter.png",
        btnOrder: "./assets/img/btn_order.png",
        btnStart: "./assets/img/btn_start.png",
        smartHelper:"./assets/img/ai_assistant.png",
        iconOn:"./assets/img/switch_on.png",
        iconOff:"./assets/img/switch_off.png",
      },
      style: {
        header: {
          bgColor: "rgba(255,255,255,0)",
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
        { modelName: "关闭", modelImg: "./assets/img/work_stop.png" },
        { modelName: "立即启动", modelImg: "./assets/img/work_start.png" }
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
          var cmd = cmdFun.washToNextStep();
          nativeService.showLoading();
          nativeService.startCmdProcess("control",cmd,function(suc) {
            nativeService.hideLoading();
            },function(fail) {
          });
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
    itemClicked: function(event) {
      this.curMode = event.mode;
      if(this.curMode.mode){
        this.isBtnEnable = true;
      }else{
        this.isBtnEnable = false;
      }
    },
    tipClose:function(event){
      this.isFirstTips = false;
    },
    errorShow:function(){
      var self = this;
      if(self.isError){
        nativeService.setItem("guideObj", {
            name: '异常自检',
            type: 'product_page8'
        });
        nativeService.goTo("productDetail.js",{});
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
        case 'washCancel':
          self.isCancelShow = false;
          break;
        case 'washStart':
          self.isCancelShow = false;
          if(self.curStatus == 'order'){
            self.btnClick('btn_order_cancel');
          }else{
            self.btnClick('btn_work_cancel');
          }
          break;
        }
      },
    drySetting:function(event){
      var self = this;
      var cmd = cmdFun.cmdDryingSet(event.value?0x00:0x01);
      // nativeService.alert('下行：'+cmd);
      nativeService.showLoading();
      nativeService.startCmdProcess("control",cmd,function(suc) {
        nativeService.hideLoading();
        self.isDryOn = event.value;
      },function(fail) {
        self.isDryOn = !event.value;
        nativeService.hideLoading();
        nativeService.toast('当前网络不佳,请稍后重试');
      });
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
        self.analysisFun(statusObj);
      },function(fail) {
        nativeService.hideLoading();
        nativeService.toast('当前网络不佳,请稍后重试');
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
      if(self.isKeepOn && self.statusObj.keepTime != 0) {return;}
      const itemsDay = ["24", "48", "72"];
      var pickItem = [{index: self.dataPick.day,item: itemsDay,label: "小时"}];
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
          var allHour = parseInt(itemsDay[dataArr[0]]);
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
      var self = this;
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
        self.btnClick('btn_work_cancel');
      }else if(curPage == 'working' && index == 1){
        self.btnClick('btn_work_pause');
      }else if(curPage == 'working' && index == 2){
        self.btnClick('btn_work_pause');
      }else if(curPage == 'order' && index == 0){
        self.btnClick('btn_order_cancel');
      }else if(curPage == 'order' && index == 1){
        self.btnClick('btn_order_start');
      }
    },
    cancelClick:function(tag){
      var self = this;
      if(tag == 'btn_work_cancel'){
        self.keepContentList = ['是否结束当前洗涤模式?'];
        self.isCancelShow = true;
      }else if( tag == 'btn_order_cancel'){
        self.keepContentList = ['是否取消当前预约模式?'];
        self.isCancelShow = true;
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
        if(self.isWaterOut){
          nativeService.toast('排水中,无法操作~');
          return;
        }
        if(self.isLackWater){
          nativeService.toast('缺水中,无法操作~');
          return;
        }
      }
      var sendCmd ='';
      switch (tag) {
        case "btn_order":
          if(!self.curMode.mode){
            nativeService.toast('您当前未选择模式');
            return;
          }
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
          bigData.dataReportByMode('ORDER',self.curMode.mode);
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
          if(!self.curMode.mode){
            nativeService.toast('您当前未选择模式');
            return;
          }
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
          if(self.curStatus == 'keepFresh'){
            sendCmd = cmdFun.cmdSafeKeep(0x00);
          }else {
            sendCmd = cmdFun.cmdCancelWash();
          }
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
          nativeService.goTo('helper.js',{});
          break;
        case 'addAddition':
          self.pickAddition();
          break;
        case 'setDiyProgram':
          self.setDiyProgram();
          break;
        case 'saltAdd':
          nativeService.goTo('settingSalt.js',{});
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
      var waterOut = (upStatusObj.displaySign.detail.waterOut.value == 0x01);

      self.isKeepOn = (upStatusObj.displaySign.detail.keepFresh.value == 0x01);
      self.isDryOn = (upStatusObj.displaySign.detail.drySwitch.value == 0x00);
      self.isLackSalt = (upStatusObj.displaySign.detail.salt.value == 0x01);
      self.isLackWater = (upStatusObj.displaySign.detail.noWater.value == 0x01);
      self.statusObj.setKeepTime =upStatusObj.setKeepTime.value;
      self.statusObj.keepTime = upStatusObj.keepTime.value;
      let pause = upStatusObj.displaySign.detail.startStop.value;

      if(deviceStatus == 0x00 || (deviceStatus == 0x03 && pause != 0x00 )){
        self.isLackWater = false;
      }
      //03-获取工作剩余时间，预约剩余时间，当前主洗阶段,暂停, 保管状态
      if(self.statusObj.keepTime > 0x00){
        self.curStatus = "keepFresh";
      }else if (deviceStatus == 0x00 || deviceStatus == 0x01 || isError) {
        self.curStatus = "standby";
        self.statusObj.status='待机中';
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
        self.statusObj.curStage = upStatusObj.washingStage.value;
        if(self.statusObj.curStage == 0x05){
          if(modeValue == 0x0B){
            nativeService.toast('您的果鲜已洗干净了~');
          }else {
            nativeService.toast('您的餐具已洗干净了~');
          }
          self.curStatus = "standby";
          self.statusObj.status='待机中';
          return;
        }
        if(self.statusObj.curStage == 0x04){
          self.curStatus = "drying";
        }else {
          self.curStatus = "working";
        }
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
      
        if(self.statusObj.curStage == 0x01 && modeValue == 0x01){ //智能洗 预洗阶段 没有时间显示
          self.statusObj.time = '--';
        }else {
          self.statusObj.time = upStatusObj.programTimeRemaining.value;
        }
      }
      /** 门状态 */
      self.isErrorBoxShow = isError || doorOpen || waterOut || self.isLackWater;
      self.isError = isError;
      self.isDoorOpen = doorOpen;
      self.isWaterOut = waterOut;
      if(self.isLackWater){
        self.errorDec = "洗碗机缺水啦,请及时加水~";
        self.errorContentList = ["请等待片刻静待排完残留水"];
      }
      if(waterOut){
        self.errorDec = "洗碗机关机排水中,请等待片刻~";
        self.errorContentList = ["请等待片刻静待排完残留水"];
      }
      if (doorOpen) {
        self.errorDec = "洗碗机门开了~";
        self.errorContentList = ["请关上门试试是否解决"];
      }
      if (errorCode == 1) {
        self.errorDec = "E1:进水故障";
      }else if(errorCode == 2) {
        self.errorDec = "E2:排水异常";
      }else if (errorCode == 3) {
        self.errorDec = "E6:加热故障";
      }else if (errorCode == 4) {
        self.errorDec = "E3:发生溢流";
      }else if (errorCode == 5) {
        self.errorDec = "E5:通讯故障";
      }else if (errorCode == 6) {
        self.errorDec = "E4:温度传感器故障";
      }else if (errorCode == 7) {
        self.errorDec = "E7:压力开关报警";
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
      self.showWelcome();
    },
    queryStatus: function() {
      var self = this;
      nativeService.showLoading();
      cmdFun.queryStatus(function(statusObj){
        nativeService.hideLoading();
        self.analysisFun(statusObj);
      });
    },
    initData:function() {
      var self = this;
      var supportMode = modeFun.getSupportMode();
      for(let i=0;i<supportMode.length;i++){
        let dataObj = {
          name:supportMode[i].text,
          selected:false,
          mode:supportMode[i],
          src:supportMode[i].src,
        }
        self.flowTabData.push(dataObj);
      }
    },
    showWelcome:function(){
      var self = this;
      nativeService.getItem('isFirst',function(result){
        if(result.data == 'undefined' || result.data == 'true') {
          self.isFirstTips = true;
        }
      });
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
      self.standbyLottie = JSON.stringify(standbyJson);
      self.workLottie = JSON.stringify(workJson);
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
      var desc = '有效去除异味,防霉防潮(默认72小时)';
      self.statusObj.setKeepTime = parseInt(self.statusObj.setKeepTime)
      self.statusObj.keepTime = parseInt(self.statusObj.keepTime);
      if(self.statusObj.setKeepTime == 0){
        self.statusObj.setKeepTime = 72;
      }
      if(self.isKeepOn && self.statusObj.keepTime != 0){
        desc='保管中,还剩余下: '+self.statusObj.keepTime+'小时';
      }else if(self.isKeepOn){
        desc= '保管时间设置为：'+self.statusObj.setKeepTime+'小时';
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
    contentBg:function(){
      var self = this;
      let bgSrc = './assets/img/bg_standby.png';
      if(self.curStatus == "standby"){
        bgSrc = './assets/img/bg_standby.png';
      }else {
        bgSrc = './assets/img/bg_working.png';
      }
      return bgSrc;
    },
    descText:function(){
      var self = this;
      let descText = '';
      if(self.curStatus == "standby"){
        descText = self.curMode.desc;
      }else if(self.curStatus == "working"){
        descText = self.curMode.text+"|剩余"+self.statusObj.time+"分";
      }else if(self.curStatus == "order"){
        let orderTimeArr = self.statusObj.ordertime.split(":");
        descText = self.curMode.text+"|"+orderTimeArr[0]+"小时"+orderTimeArr[1]+"分后启动";
      }else if(self.curStatus == "keepFresh"){
        descText ="剩余"+self.statusObj.keepTime+"小时";
      }else if(self.curStatus == "drying"){
        descText ="剩余"+self.statusObj.time+"分";
      }
      return descText;
    },
    statusText:function(){
      var self = this;
      let statusText = "待机中";
      if(self.curStatus == "standby"){
        statusText = "待机中";
      }else if(self.curStatus == "working"){
        if(self.statusObj.isPause){
          statusText = "暂停中";
        }else{
          statusText = "洗涤中";
        }
      }else if(self.curStatus == "order"){
        statusText = "预约中";
      }else if(self.curStatus == "keepFresh"){
        statusText = "保管中";
      }else if(self.curStatus == "drying"){
        if(self.statusObj.isPause){
          statusText = "暂停中";
        }else{
          statusText = "干燥中";
        }
      }
      return statusText;
    }
  },
 
};
</script>
<style scoped>
.wrapper {
  width: 750px;
  background-image:linear-gradient(to bottom right,rgba(56,114,230,1),rgba(113,168,230,1));
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
  top: 160px;
  margin: 20px;
  left: 0px;
}
.status {
  position: relative;
  margin-top: 88px;
  color: #fff;
  height: 584px;
  width: 750px;
}
.status-mode-text {
  font-family: PingFangSC-Regular;
  color: #fff;
  font-size: 56px;
}
.status-mode-desc {
  font-family: PingFangSC-Regular;
  font-size: 28px;
  margin-top: 5px;
  height: 76px;
  width: 270px;
  line-height: 38px;
  color: rgba(255,255,255,0.70);
  text-align: center;
}
.status-standby-bg {
  position: absolute;
  width:584px;
  height: 584px;
  left:83px;
  top:0px;
}
.status-working-bg {
  position: absolute;
  width:584px;
  height: 584px;
  top:0px;
  left:83px;
}

.status-mode-list {
  height: 265px;
  margin-bottom: 146px;
}

.salt-lay {
  height: 100px;
  margin-left: 32px;
}
.salt-title {
  flex: 1;
  font-size: 32px;
  color: #fff;
  line-height: 100px;
  height: 100px;
  font-family: PingFangSC-Regular;
}
.salt-text {
  font-size: 25px;
  line-height: 100px;
  height: 100px;
  margin-right: 25px;
  font-family: PingFangSC-Regular;
  color: rgba(255,255,255,0.70);
}
.salt-next {
  width: 16px;
  height: 28px;
  margin-right: 32px;
}
.salt-divider {
  width: 718px;
  margin-left: 32px;
  height: 1px;
  background-color:rgba(255,255,255,0.3);
}

.working-setting {
  margin-bottom: 200px;
  margin-left: 32px;
  margin-right: 32px;

}

.status-work {
  margin-top: 50px;
  font-size: 38px;
}


.standby-footer {
  position: absolute;
  width: 750px;
  left: 0px;
  bottom: 0px;
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
  width: 690px;
  height: 86px;
  position: absolute;
  left: 30px;
  bottom: 60px;
  border-radius: 43px;
  border: 2px solid rgba(255,255,255,0.35);
  border-width: 2px;
  border-color: rgba(255,255,255,0.35);
  background-color: rgba(255,255,255,0.15);
}
.btn-lay-enable {
  opacity: 1;
}
.btn-lay-disable {
  opacity: 0.4;
}
.btn-img {
  flex: 1;
}
.btn-divide {
  height: 82px;
  width: 2px;
  background-color: rgba(255,255,255,0.35);
}
.border-left {
  border: 2px solid #fff;
  border-width: 2px;
  border-style: solid;
  border-left-color: #ffffff;
  margin-left: -2px;
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
    width: 750px;
    height: 80px;
    text-align: center;
    color: #fff;
    display: flex;
    flex-direction: row;
}

.status-stage-item {
  width: 100px;
}

.stage-step {
    font-size: 33px;
    color: #fff;
    height: 46px;
    line-height: 46px;
}
.stage-step-normal {
    font-size: 33px;
    color: rgba(255,255,255,0.70);
    height: 46px;
    line-height: 46px;
}

.stage_shape {
  width: 10px;
  height: 10px;
  background-color: #ffffff;
  border-radius: 10px;
  margin-top: 10px;
}
.stage_shape_transparent {
  width: 10px;
  height: 10px;
  background-color: #ffffffff;
  border-radius: 10px;
  margin-top: 10px;
  margin-left: -21px;
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


