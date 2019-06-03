<template>
    <div class="weex-wrapper" :style="weexHeight">
        <scroller :show-scrollbar="false" offset-accuracy="2" @scroll="changeHeaderBg" >
            <div ref="scroller" class="scroller-wrapper" :style="{'paddingTop':headerHeight}">
                <!-- 右上角Lottie动画 -->
                <midea-lottie-view v-if="lottieData" class="lottie" :data="lottieData" :loop="true" :autoPlay="true"></midea-lottie-view>
                <image src="./assets/img/watercleaner_img_ing.png" class="img"></image>
                <div class="upWrapper" v-if="configData.hasOutTDS">
                    <div class="upFirstFloor">
                        <text class="upFirstFloor-text">{{outTDS}}</text>
                        <text class="upFirstFloor-unit">TDS</text>
                    </div>
                    <div class="upSecondFloor">
                        <text class="upSecondFloor-text">{{tdsStatus}}</text>
                    </div>
                    <div class="upThirdFloor">
                        <text class="upThirdFloor-text">{{inTDS}}</text>
                    </div>
                </div>
                <div class="upWrapper" v-if="!configData.hasOutTDS">
                    <div class="upFirstFloor">
                        <text class="upFirstFloor-text">{{totalWater}}</text>
                        <text class="upFirstFloor-unit">升</text>
                    </div>
                    <div class="upThirdFloor">
                        <text class="upThirdFloor-text">总净水量</text>
                    </div>
                </div>
                <div class="barchart-wrapper">
                    <midea-barchart-view class="barchart" :data="chartJson"></midea-barchart-view>
                </div>
                <div class="down-wrapper">
                    <div class="cell-wrapper">
                        <div style="width:160px;height:160px;backgroundColor:#50CFFF"></div>
                        <midea-cell :title="'七天生产净水总量 '+total7water+' L'"
                                    :hasArrow="true"
                                    :height="160"
                                    @mideaCellClick="goUseLog"
                        ></midea-cell>
                    </div>
                    <div class="cell-wrapper" v-for="(item,i) in configData.filterList" :key="i">
                        <div style="width:160px;height:160px;backgroundColor:#50CFFF"></div>
                        <midea-cell :title="item.name"
                                    :desc="'预计剩余天数 '+item.days+' 天'"
                                    :rightText="item.life+'%'"
                                    :hasArrow="true"
                                    :height="160"
                                    @mideaCellClick="goFilter(i)"
                        ></midea-cell>
                    </div>
                </div>
            </div>
        </scroller>
        <midea-header class="header" :title="'净水机'" :bgColor="bgColor" :titleText="'#000000'" :isImmersion="true" :showRightImg="true" :showLeftImg="true" @leftImgClick="goBack" @rightImgClick="goMore"></midea-header>
        <midea-dialog   :title="filterName+'滤芯到期'"
                        :content="filterTip"
                        :show="filterShow"
                        confirmText="购买"
                        cancelText="返回"
                        @mideaDialogConfirmBtnClicked="confirmDialog1"
                        @mideaDialogCancelBtnClicked="cancelDialog1"
        ></midea-dialog>
        <midea-dialog   :title="errorTitle"
                        :content="errorTip"
                        :show="errorShow"
                        confirmText="报修"
                        cancelText="返回"
                        @mideaDialogConfirmBtnClicked="confirmDialog2"
                        @mideaDialogCancelBtnClicked="cancelDialog2"
        ></midea-dialog>
    </div>
</template>
<style>
.weex-wrapper{
    background-color: #f9f9f9;
}
.header{
    position: fixed;
    top: 0;
    left: 0;
}
.lottie{
    width:570px;
    height:550px;
    position:absolute;
    right: 0;
    top: 0;
}
.img{
    width: 1000px;
    height: 1000px;
    position: absolute;
    right:-500px;
    top: -500px;
}
.scroller-wrapper{
    background-color: #f9f9f9;
    z-index: 1;
}
.upWrapper{
    width: 750px;
    height: 660px;
    flex-direction: column;
    justify-content: center;
    align-items: center; 
}
.upFirstFloor{
    flex-direction: row;
    justify-content: center;
    align-items: flex-end;
}
.upFirstFloor-text{
    font-size: 200px;
    font-family: PingFangSC-Regular;
    color: #000000;
    letter-spacing: 0;
    padding-left: 48px;
    /* line-height: 200px; */
}
.upFirstFloor-unit{
    font-family: PingFangSC-Regular;
    font-size: 28px;
    color: #000000;
    letter-spacing: 0;
    padding-bottom: 60px;
    /* line-height: 36px; */
}
.upSecondFloor{
    width: 150px;
    height: 64px;
    border-radius: 32px;
    background-color: rgba(91,210,255,0.1);
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
.upSecondFloor-text{
    font-family: PingFangSC-Medium;
    font-size: 32px;
    color: #50CFFF;
    letter-spacing: 0;
    text-align: center;
    /* line-height: 32px; */
}
.upThirdFloor{
    margin-top: 40px;
}
.upThirdFloor-text{
    font-family: PingFangSC-Regular;
    font-size: 24px;
    color: #8A8A8F;
    text-align: center;
    /* line-height: 24px; */
}
.barchart-wrapper{
    width: 686px;
    height: 350px;
    background-color: white;
    margin-left: 32px;
}
.barchart{
    width: 686px;
    height: 350px;
}
.down-wrapper{
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    margin-top: 32px;
}
.cell-wrapper{
    width: 686px;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
}
</style>
<script>
import nativeService from '@/common/services/nativeService';
import cmd from './js/cmd.js';
import config from './js/config.js';

import mideaHeader from './components/header.vue';
import mideaDialog from './components/dialog.vue'
import mideaCell from './components/cell1.vue';

import lottieDemo1 from './assets/setting/init.json';
import lottieDemo2 from './assets/setting/off.json';
import lottieDemo3 from './assets/setting/normal.json';
import lottieDemo4 from './assets/setting/bad.json';

const globalEvent=weex.requireModule('globalEvent');
const stream=weex.requireModule('stream');
const dom = weex.requireModule('dom');

export default {
    components:{
        mideaHeader,
        mideaDialog,
        mideaCell,
    },
    data(){
        return {
            configData:config.getConfigValue(),
            status:{},
            height:0,
            scrollerHeight:0,
            bgColor:'rgba(249,249,249,0)',
            washImg:"./assets/img/ic_wash_on.png",
            inTDS:'',
            outTDS:'0',
            city:'',
            tdsStatus:'可直饮',
            totalWater:0,
            total7water:0,
            filterName:'',
            filterSrc:'',
            lottieDemo1:lottieDemo1,
            lottieDemo2:lottieDemo2,
            lottieDemo3:lottieDemo3,
            lottieDemo4:lottieDemo4,
            chartJson:{},
            filterTip:'',
            filterShow:false,
            errorTitle:'',
            errorTip:'',
            errorShow:false,
        }
    },
    methods:{
        goBack(){
            nativeService.goBack();
        },
        goMore(){
            nativeService.goTo('moreFunction.js');
        },
        goUseLog(){
            nativeService.goTo('useLog.js');
        },
        goFilter(i){
            nativeService.setItem("filterKey",i);
            nativeService.goTo('filter.js');
        },
        confirmDialog1(){
            this.filterShow=false;
            nativeService.jumpNativePage({
                "pageName": "electronicBusinessPage", 
                "url":this.filterSrc,
            })
        },
        cancelDialog1(){
            this.filterShow=false;
        },
        confirmDialog2(){
            this.errorShow=false;
            nativeService.callTel({
                operation:"callTel",
                tel:4008899315,
                title:"客户服务",
                desc:"拨打热线电话：400-889-9315",
            }).then((res)=>{

            }).catch((err)=>{
                
            })
        },
        cancelDialog2(){
            this.errorShow=false;
        },
        initStatus(status){
            this.chartJson={
                "x": {
                    "value": [1, 2, 3, 4, 5, 6, 7],
                    "label": ["11.6", "11.7", "11.8", "11.9", "11.10", "11.11", "11.12"]
                },
                "y": [
                    {
                        "value": [1, 6, 2, 1, 2, 3, 7,],
                        "title": "冷藏室",
                        "color": "#1B81FB", //柱子颜色
                        "background": "#ffffff"
                    }
                ],
                "xAxisColor": "#000000", //x轴线的颜色，如果不设置，则默认是白色线
                "xAxisLabelColor": "#000000", //x label的字体颜色，如果不设置，则默认是白色线 
                "yAxisColor": "#000000", //y轴线的颜色，如果不设置，则默认是白色线
                "yAxisLabelColor": "#000000", // label的字体颜色，如果不设置，则默认是白色线 
                // "background": "#ffffff", //不传，则默认使用透明背景
                "borderRadius": "0",//柱子顶部的圆角，默认为0px
                "description": "图标描叙",
                "legend": {
                    "position": "TOP_RIGHT", //"TOP_LEFT"/"TOP_RIGHT"
                    "orientation": "BOTTOM_RIGHT", //"HORIZONTAL"/"BOTTOM_RIGHT"
                    "show": false //是否显示标识
                },
                "unit": {
                    "x": "",
                    "y": ""
                }
            };

            //TDS
            this.outTDS=status.outTDS;
            if(this.configData.hasInTDS){
                this.inTDS='净水机原水TDS为 '+status.inTDS;
            }else{
                this.getLocation();
            }

            //故障提醒
            if(status.rfidError==1){
                this.errorTitle="RFID模组通讯故障";
                this.errorTip="RFID模组与控制板通讯异常";
                this.errorShow=true;
            }else if(status.overTime==1){
                this.errorTitle="强制待机";
                this.errorTip="制水时间超过两个小时，请检查设备状况";
                this.errorShow=true;
            }else if(status.communication==1){
                this.errorTitle="显示板通讯故障";
                this.errorTip="显示板与电源板通讯异常";
                this.errorShow=true;
            }else if(status.tdsError==1){
                this.errorTitle="TDS模组通讯故障";
                this.errorTip="TDS模组与控制板通讯异常";
                this.errorShow=true;
            }else if(status.rfidOffStandard==1){
                this.errorTitle="RFID模组非标准故障";
                this.errorTip="RFID模组未检测到滤芯";
                this.errorShow=true;
            }

            this.getDeviceId();
            this.getFilterList(status.filterLife)
        },
        //获取滤芯寿命
        getFilterList(arr){
            var list=this.configData.filterList;
            for(var i=0;i<list.length;i++){
                list[i].life=arr[i];
                list[i].days=Math.floor(parseInt(list[i].maxDays)*parseInt(arr[i])/100);
                //判断滤芯寿命是否到期
                if(parseInt(arr[i])<=5){
                    this.filterName=list[i].name;
                    this.filterSrc=list[i].src;
                    if(parseInt(arr[i])==0){
                        this.filterTip="你的滤芯已经到期，请及时更换";
                        this.filterShow=true;
                    }else{
                        this.filterTip="你的滤芯即将到期，请及时更换";
                        this.filterShow=true;
                    }
                }
            }
            this.configData.filterList=list;
        },
        //获取用户地址
        getLocation(){
            var self=this;
            let gpsParam = {
                desiredAccuracy: "10",  //定位的精确度，单位：米
                alwaysAuthorization: "0",  //是否开启实时定位功能，0: 只返回一次GPS信息（默认），1:APP在前台时，每移动distanceFilter的距离返回一次回调。2:无论APP在前后台，每移动distanceFilter的距离返回一次回调（注意耗电）
                distanceFilter: "10", //alwaysAuthorization为1或2时有效，每移动多少米回调一次定位信息
            }
            nativeService.showLoading();
            nativeService.getGPSInfo(gpsParam).then((data) => {
                if(data.status==0){
                    self.city=data.city;
                }else{
                    nativeService.toast("定位失败")
                }
                nativeService.hideLoading();
            }).catch((error) => {
                if (typeof error == 'string') {
                    try {
                        error = JSON.parse(error)
                    } catch (e) { }
                }
                if (error.errorCode == '-1') {
                    nativeService.toast("获取权限失败，请设置权限")
                } else {
                    nativeService.toast("定位失败")
                }
                nativeService.hideLoading();
            })
        },
        //ajax获取净水总量
        getTotal(deviceId){
            var self=this;
            stream.fetch({
                method: 'POST',
                url: "http://api.midea-hotwater.com:13145/ed/v1/api",
                type: 'json',
                headers: { 'Content-Type': 'application/json' },
                body:{
                    'msg':"PureWaterConsumption",
                    'params':{
                        'applianceId':deviceId,
                        'queryType':'total',
                    }
                }
            },function(res){
                self.totalWater=parseInt(res.data.result.yWater);
            },function(error){
                // nativeService.alert(error);
            })
        },
        getDeviceId(){
            var self=this;
            nativeService.getDeviceInfo().then((res)=>{
                self.getTotal(res.result.deviceId);
                self.get7total(res.result.deviceId);
            }).catch((err)=>{
                nativeService.toast("获取设备信息失败")
            })
        },
        //ajax获取7天净水总量
        get7total(deviceId){
            var self=this;
            stream.fetch({
                method: 'POST',
                url: "http://api.midea-hotwater.com:13145/ed/v1/api",
                type: 'json',
                headers: { 'Content-Type': 'application/json' },
                body:{
                    'msg':"PureWaterConsumption",
                    'params':{
                        'applianceId':deviceId,
                        'queryType':'week',
                    }
                }
            },function(res){
                var arr=res.data.result.data;
                var num=0;
                for(var i=0;i<arr.length;i++){
                    num+=parseInt(arr[i].yWater);
                }
                self.total7water=num;
            },function(error){
                // nativeService.alert(error);
            })
        },
        changeHeaderBg(e){
            let tabItem = this.$refs.scroller;
            dom.getComponentRect(tabItem, (result) => {
                let size = result.size || {};
                this.scrollerHeight = size.height;
            });
            var dValue=Math.abs(Math.floor(parseInt(this.scrollerHeight)-parseInt(this.height)));
            var cValue=Math.floor(-e.contentOffset.y);
            this.bgColor='rgba(249,249,249,'+Math.abs((cValue/dValue).toFixed(1))+')';
            // nativeService.toast('dValue: '+dValue+' cValue: '+cValue+' 商: '+Math.abs((cValue/dValue).toFixed(1))+' 屏幕: '+this.height+' div: '+this.scrollerHeight)
        },
        sendQuery(){
            var self=this;
            nativeService.showLoading();
            nativeService.startCmdProcess("query",cmd.createQueryMessage(),function(res){
                self.status=cmd.analyse(res);
                self.initStatus(self.status);
                nativeService.hideLoading();
            },function(res){
                nativeService.hideLoading();
            })
        },
    },
    created(){
        var self=this;
        this.height=Math.floor(750/this.$getConfig().env.deviceWidth*this.$getConfig().env.deviceHeight);
        this.sendQuery();
        // 监听设备主动上报
        globalEvent.addEventListener('receiveMessage',function(res){
            var msg=res.data.split(",");
            self.status=cmd.analyse(msg);
            self.initStatus(self.status);
        })
    },
    mounted(){
        this.lottieData=JSON.stringify(this.lottieDemo3);
    },
    computed:{
        weexHeight:function(){
            return {height:this.height+'px'}
        },
        isipx: function () {
            return weex && (
                weex.config.env.deviceModel === 'iPhone10,3' || weex.config.env.deviceModel === 'iPhone10,6' //iphoneX
                || weex.config.env.deviceModel === 'iPhone11,8' //iPhone XR
                || weex.config.env.deviceModel === 'iPhone11,2' //iPhone XS
                || weex.config.env.deviceModel === 'iPhone11,4' || weex.config.env.deviceModel === 'iPhone11,6' //iPhone XS Max
                );
        },
        headerHeight:function(){
            var h=this.isipx?'128px':'176px';
            return h;
        }
    }
}
</script>


