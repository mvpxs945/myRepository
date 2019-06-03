<template>
    <div class="wrapper" @viewappear="viewappear">
        <midea-header :title="'布谷净水器'" bgColor="rgba(255,255,255,0)" :isImmersion="true" titleText="white"  :showRightImg1="false" :showRightImg2="true" :showLeftImg="true" @leftImgClick="goBack" @rightImg1Click="goShare" @rightImg2Click="goMore"></midea-header>
        <scroller :show-scrollbar="false">
            <div class="scroller-wrapper">
                <div class="first">
                    <text class="first-text">{{currentStatus}}</text>
                </div>
                <div class="second" ref="secondDiv" @swipe="onSwipe($event)">
                    <div class="second-left">
                        <div class="second-left-up">
                            <image src="./assets/img/shadow.png" style="width:560px;height:560px;position:absolute;margin-left:-50px;margin-top:-50px;"></image>
                            <midea-lottie-view v-if="lottieData" class="lottie" :data="lottieData" :loop="true" :autoPlay="true"></midea-lottie-view>
                            <div class="second-left-up-text" style="justifyContent:flex-end;paddingBottom:45px;">
                                <text class="second-left-up-text-up">{{inTDS}}</text>
                                <text class="second-left-up-text-down">进水TDS</text>
                            </div>
                            <div class="second-left-up-text" style="justifyContent:flex-start;paddingTop:45px;">
                                <!-- <text class="second-left-up-text-up">{{outTDS}}</text> -->
                                <div class="second-left-up-text-num">
                                    <text :class="[outTDSList.bai.isFight?'second-left-up-text-up-isFight':'second-left-up-text-up']">{{outTDSList.bai.num}}</text>
                                    <text :class="[outTDSList.shi.isFight?'second-left-up-text-up-isFight':'second-left-up-text-up']">{{outTDSList.shi.num}}</text>
                                    <text :class="[outTDSList.ge.isFight?'second-left-up-text-up-isFight':'second-left-up-text-up']">{{outTDSList.ge.num}}</text>
                                </div>
                                <text class="second-left-up-text-down">直饮TDS</text>
                            </div>
                        </div>
                        <div class="second-left-down">
                            <text class="second-left-down-text">{{randomTips}}</text>
                        </div>
                    </div>
                    <div class="second-right" >
                        <div>
                            <midea-barchart-view class="barchart" :data="inTDSData"></midea-barchart-view>
                            <text class="second-right-text" >(进水TDS)</text>
                            <midea-barchart-view class="barchart" :data="outTDSData"></midea-barchart-view>
                            <text class="second-right-text" >(直饮TDS)</text>
                        </div>
                        <text class="second-right-text">最近30次制水TDS值</text>
                    </div>
                </div>
                <div class="third">
                    <div class="third-page" :style="{'background-color':pageLeft}"></div>
                    <div class="third-page" :style="{'background-color':pageRight}"></div>
                </div>
                <div class="fourth">
                    <text class="fourth-title">净水总量</text>
                    <div class="fourth-down">
                        <image src="./assets/img/water_total.png" style="width:180px;height:180px;"></image>
                        <div class="fourth-text-wrapper">
                            <text class="fourth-text-up">累计净水量{{waterCount}}L</text>
                            <text class="fourth-text-down">净水量相当于{{bottle}}罐桶装矿泉水，大约为你省下了{{money}}元人民币</text>
                        </div>
                    </div>
                </div>
                <div class="fifth">
                    <div class="fifth-up">
                        <text class="fifth-text">净水量{{xWaterCount}}L</text>
                        <midea-tab :tabArray="tabData" @tabClicked="tabClicked"></midea-tab>
                    </div>
                    <div class="fifth-down">
                        <midea-barchart-view class="barchart" :data="chartJson"></midea-barchart-view>
                    </div>
                </div>
                <div class="sixth">
                    <text class="sixth-title">滤芯状态</text>
                    <div class="sixth-content">
                        <midea-progresscycle-view class="circleprogress" :data="circleJson"></midea-progresscycle-view>
                        <div class="sixth-filter-wrapper">
                            <text class="sixth-filter">{{filterLife}}</text>
                        </div>
                        <div class="cellBox" @click="goFilterLife">
                            <div class="cellBox-left">
                                <text class="cellBox-left-title">MIX一体复合滤芯</text>
                                <text class="cellBox-left-desc">预计剩余天数{{days}}</text>
                            </div>
                            <image src="./assets/img/tips_sigh.png" style="width:40px;height:40px" v-if="isShowSigh"></image>
                            <image src="./assets/img/list_enter_bai35.png" style="width:14px;height:20px;" ></image>
                        </div>
                    </div>
                </div>
                <div class="tips" :style="{'backgroundColor':tipColor}" v-if="tipFlag">
                    <text class="tips-info">{{tipInfo}}</text>
                    <div class="tips-button" @click="goOther" v-if="btnFlag">
                        <text class="tips-button-info">{{tipButton}}</text>
                    </div>
                    <image src="./assets/img/no_network_close.png" style="width:50px;height:50px" v-if="isShowX" @click="closeX"></image>
                </div>
            </div>
        </scroller>
    </div>
</template>

<style>
.wrapper{
    background-image:linear-gradient(to bottom right,rgba(69,215,217,1),rgba(0,134,255,1));
}
.lottie{
    width:560px;
    height:560px;
    position:absolute;
    margin-left:-50px;
    margin-top:-50px;
}
.scroller-wrapper{
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
}
.first-text{
    color: rgba(255,255,255,0.7);
    font-size: 28px;
    font-family: PingFangSC-Regular;
}
.tips{
    width: 700px;
    height: 82px;
    padding-left: 20px;
    padding-right: 20px;
    position: absolute;
    top:40px;
    left: 25px;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    /* background-color: rgba(0,0,0, 0.35); */
    border-radius: 16px;
    z-index: 100;
}
.tips-info{
    width: 480px;
    height: 50px;
    padding-top: 10px;
    color: white;
    font-size: 25px;
    font-family: PingFangSC-Regular;
}
.tips-button{
    width: 140px;
    height: 50;
    border-radius: 25px;
    background-color: rgba(255, 255, 255, 0.3);
    flex-direction: column;
    align-items: center;
    justify-content: center;
}
.tips-button-info{
    color: white;
    font-size: 25px;
    font-family: PingFangSC-Regular;
}
.second{
    flex-direction: row;
    align-items: center;
    /* justify-content: flex-start; */
}
.second-left{
    margin-left: 750px;
    width: 750px;
    height: 750px;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}
.second-left-up{
    width: 480px;
    height: 480px;
}
.second-left-up-text{
    width: 458px;
    height: 229px;
    flex-direction: column;
    align-items: center;
}
.second-left-up-text-num{
    flex-direction: row;
    align-items: center;
    justify-content: center;
}
.second-left-up-text-up{
    color: rgba(255,255,255,0.7);
    font-size: 90px;
    font-family: iconfont1;
    /* font-weight: bold; */
}
.second-left-up-text-up-isFight{
    color: rgba(255,255,255,1);
    font-size: 90px;
    font-family:iconfont1;
    /* font-weight: bold; */
}
.second-left-up-text-down{
    color: rgba(255,255,255,0.7);
    font-size: 28px;
    margin-top: -15px;
}
.second-left-down-text{
    color: rgba(255,255,255,0.7);
    font-size: 28px;
    font-family: PingFangSC-Regular;
    margin-top: 50px;
}
.second-right{
    width: 750px;
    height: 750px;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
}
.second-right-text{
    font-size: 22px;
    font-family: PingFangSC-Regular;
    color: rgba(255,255,255,0.7);
    
}
.third{
    width: 750px;
    height: 50px;
    border-bottom-color: rgba(255,255,255,0.15);
    border-bottom-style: solid;
    border-bottom-width: 1px;
    flex-direction: row;
    align-items: flex-start;
    justify-content: center;
}
.third-page{
    width: 10px;
    height: 10px;
    border-radius: 5px;
    margin-left: 10px;
}
.fourth{
    padding-left: 34px;
    width: 750px;
    margin-top: 50px;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
}
.fourth-title{
    font-size: 32px;
    color: white;
    font-family: PingFangSC-Regular;
}
.fourth-down{
    margin-top: 30px;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
}
.fourth-text-wrapper{
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
}
.fourth-text-up{
    font-size: 28px;
    color: white;
    font-family: PingFangSC-Regular;
}
.fourth-text-down{
    width: 420px;
    font-size: 24px;
    color: rgba(255,255,255,0.7);
    font-family: PingFangSC-Regular;
    margin-top: 10px;
}
.fifth{
    margin-top: 50px;
    padding-left: 34px;
    padding-bottom: 50px;
    width: 750px;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border-bottom-color: rgba(255,255,255,0.15);
    border-bottom-style: solid;
    border-bottom-width: 1px;
}
.fifth-up{
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    width: 700px;
}
.fifth-text{
    font-size: 32px;
    color: white;
    font-family: PingFangSC-Regular;
}
.barchart{
    width: 700px;
    height: 300px;
}
.circleprogress{
    top:25px;
    left: 0px;
    width: 170px;
    height: 170px;
}
.sixth{
    margin-top: 50px;
    padding-left: 34px;
    width: 750px;
    height: 300px;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
}
.sixth-title{
    font-size: 32px;
    color: white;
    font-family: PingFangSC-Regular;
}
.sixth-content{
    margin-top: 30px;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
}
.sixth-filter-wrapper{
    width: 120px;
    height: 120px;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    position: absolute;
    left:6px;
    top:32px;
}
.sixth-filter{
    color: white;
    font-size: 31px;
    font-family: iconfont1;
    font-weight: bold;
}
.cellBox{
    width: 500px;
    height: 160px;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
}
.cellBox-left{
    width: 400px;
    height: 160px;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
}
.cellBox-left-title{
    color: white;
    font-size: 28px;
    font-family: PingFangSC-Regular;
}
.cellBox-left-desc{
    color: rgba(255,255,255,0.7);
    font-size: 25px;
    font-family: PingFangSC-Regular;
}
</style>

<script>
import nativeService from '@/common/services/nativeService';
import cmd from './common/cmd.js';
import base from './base.js';
import mideaHeader from './components/mheader2.vue';
import mideaCircleProgress from './components/circleProgress.vue';
import mideaDialog from '@/component/dialog.vue';
import mideaTab from './components/tab.vue';
import mideaCell from './components/mcell.vue';
import mideaNavList from './components/navList.vue';
import lottieDemo from './assets/setting/data.json';
const globalEvent=weex.requireModule('globalEvent');
const stream=weex.requireModule('stream');
const picker = weex.requireModule('picker');
const animation = weex.requireModule('animation');

export default {
    components:{
        mideaHeader,
        mideaTab,
        mideaCircleProgress,
        mideaCell
    },
    mixins: [base],
    data(){
        return {
            leftImg:"./assets/img/return.png",
            rightImg1:"./assets/img/share.png",
            rightImg2:"./assets/img/more.png",
            status:{},//解析到的状态
            currentStatus:"设备待机中",
            tipFlag:false,
            tipInfo:'设备离线，请检查当前网络状态',
            tipButton:'查看详情',
            tipColor:'rgba(0,0,0, 0.35)',
            btnFlag:true,
            isShowX:false,
            switchFlag:true,//false-左,true-右
            switchTimer:'',
            inTDS:'000',//进水TDS
            outTDSList:{
                'bai':{
                    'num':'',
                    'isFight':false
                },
                'shi':{
                    'num':'',
                    'isFight':false
                },
                'ge':{
                    'num':'',
                    'isFight':false
                },
            },
            inTDSData:{},//进水TDS数据
            outTDSData:{},//出水TDS数据
            randomTips:'',//随机温馨小提示
            waterCount:0,//总净水量
            bottle:0,//换算纯净水
            money:0,//换算人民币
            tabData:[
                {"name":"日","selected":true},
                {"name":"周","selected":false},
                {"name":"月","selected":false},
                {"name":"年","selected":false},
            ],
            dayConsumption:[],
            weekConsumption:[],
            monthConsumption:[],
            yearConsumption:[],
            pageLeft:"#FFFFFF",
            pageRight:"rgba(255,255,255,0.3)",
            xWaterCount:0,//每日、周、月、年净水总量
            chartJson:{},//净水量柱状图
            circleJson:{},//环形进度条
            days:'',//滤芯剩余天数
            filterLife:'',
            isShowSigh:false,
            otherSrc:"guide.js",
            SN:'',
            timer1:'',
            helpItemKey:0,
            lottieData:'',
            lottieDemo:lottieDemo,
        }
    },
    methods:{
        goBack(){
            nativeService.goBack();
        },
        goShare(){
            nativeService.showSharePanel(this.messageParam).then(
                (resp) => {
                    nativeService.toast("分享调用成功!")
                }
            ).catch((error) => {
                nativeService.toast("分享调用失败")
            })
        },
        goMore(){
            nativeService.goTo("moreFunction.js");
        },
        goFilterLife(){
            nativeService.goTo("filterLife.js");
        },
        closeX(){
            this.tipFlag=false;
        },
        //10秒知道切换TDS跟TDS统计
        autoSwitch(){
            var ac=this.$refs.secondDiv;
            if(this.switchFlag==true){
                this.switchFlag=false;
                this.pageLeft="rgba(255,255,255,0.3)"
                this.pageRight="#FFFFFF"
                animation.transition(ac,{
                    styles:{
                        transform:"translate("+(-750)+"px,0px)"
                    },
                    duration:300,
                    timingFunction:'ease-out',
                    delay:0,
                },function(){
                    
                })
            }else{
                this.switchFlag=true;
                this.pageLeft="#FFFFFF"
                this.pageRight="rgba(255,255,255,0.3)"
                animation.transition(ac,{
                    styles:{
                        transform:"translate("+0+"px,0px)"
                    },
                    duration:300,
                    timingFunction:'ease-out',
                    delay:0,
                },function(){
                    
                })
            }
        },
        startAutoSwitch(){
            var self=this;
            this.switchTimer=setInterval(function(){
                self.autoSwitch();
            },10000)
        },
        onSwipe(event){
            var self=this;
            var ac=this.$refs.secondDiv;
            if(event.direction=="left"&&this.switchFlag==true){
                clearInterval(this.switchTimer)
                this.switchFlag=false;
                this.pageLeft="rgba(255,255,255,0.3)"
                this.pageRight="#FFFFFF"
                animation.transition(ac,{
                    styles:{
                        transform:"translate("+(-750)+"px,0px)"
                    },
                    duration:300,
                    timingFunction:'ease-out',
                    delay:0,
                },function(){
                    self.startAutoSwitch();
                })
            }
            else if(event.direction=="right"&&this.switchFlag==false){
                clearInterval(this.switchTimer)
                this.switchFlag=true;
                this.pageLeft="#FFFFFF"
                this.pageRight="rgba(255,255,255,0.3)"
                animation.transition(ac,{
                    styles:{
                        transform:"translate("+0+"px,0px)"
                    },
                    duration:300,
                    timingFunction:'ease-out',
                    delay:0,
                },function(){
                    self.startAutoSwitch();
                })
            }
        },
        tabClicked(index){
            var chartData=JSON.parse(JSON.stringify(this.chartJson))
            switch(index){
                case 0:
                chartData.x.value=[1,2.3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24];
                chartData.x.label=["0","","","","4","","","","","9","","","","","14","","","","","19","","","","23"];
                chartData.y[0].value=this.dayConsumption;
                this.xWaterCount=this.dayConsumption.reduce(function(a,b){return parseInt(a)+parseInt(b)});
                break;
                case 1:
                chartData.x.value=[1,2.3,4,5,6,7];
                chartData.x.label=["周一","周二","周三","周四","周五","周六","周日"];
                chartData.y[0].value=this.weekConsumption;
                this.xWaterCount=this.weekConsumption.reduce(function(a,b){return parseInt(a)+parseInt(b)});
                break;
                case 2:
                chartData.x.value=this.getDays()[1];
                chartData.x.label=this.getDays()[0];
                chartData.y[0].value=this.monthConsumption;
                this.xWaterCount=this.monthConsumption.reduce(function(a,b){return parseInt(a)+parseInt(b)});
                break;
                case 3:
                chartData.x.value=[1,2.3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30];
                chartData.x.label=["1月","2月","3月","4月","5月","6月","7月","8月","9月","10月","11月","12月"];
                chartData.y[0].value=this.yearConsumption;
                this.xWaterCount=this.yearConsumption.reduce(function(a,b){return parseInt(a)+parseInt(b)});
                break;
            }
            this.chartJson=JSON.parse(JSON.stringify(chartData))
        },
        //判断本月多少天
        getDays(){
            var myDate=new Date();
            var thisM=myDate.getMonth()+1;
            if(thisM==1||thisM==3||thisM==5||thisM==7||thisM==8||thisM==10||thisM==12){
                return [["1","","","","5","","","","","10","","","","","15","","","","","20","","","","","25","","","","","","31"],[1,2.3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31]];
            }else if(thisM==2){
                if((myDate.getFullYear()%4==0&&myDate.getFullYear()%100!=0)||myDate.getFullYear()%400==0){
                    return [["1","","","","5","","","","","10","","","","","15","","","","","20","","","","","25","","","","29"],[1,2.3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29]];
                }else{
                    return [["1","","","","5","","","","","10","","","","","15","","","","","20","","","","","25","","","28"],[1,2.3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28]];
                }
            }else{
                return [["1","","","","5","","","","","10","","","","","15","","","","","20","","","","","25","","","","","30"],[1,2.3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30]];
            }
        },
        //ajax获取TDS deviceId设备ID time次数
        getTDS(deviceId,time){
            var self=this;
            stream.fetch({
                method: 'POST',
                url: "http://47.111.41.65/kwha/ed/v1/api",
                type: 'json',
                headers: { 'Content-Type': 'application/json' },
                body:{
                    'msg':"getBuguTds",
                    'params':{
                        'applianceId':deviceId,
                        'count':time
                    }
                }
            },function(res){
                var tdsArr=res.data.result.tds;
                self.inTDSData={
                    "x": {
                        "value": [1,2.3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30],
                        "label": ["1","","","","5","","","","","10","","","","","15","","","","","20","","","","","25","","","","","30"]
                    },
                    "y": [
                        {
                            "value": self.handleTDSArr(tdsArr).inTDS,
                            "label":[],
                            "color": "#add8fe", 
                        }
                    ],
                    "description": "",
                    "borderRadius":"4",
                    "legend": {
                        "position": "TOP_LEFT", //"TOP_LEFT"/"TOP_RIGHT"
                        "orientation": "HORIZONTAL", //"HORIZONTAL"/"BOTTOM_RIGHT"
                        "show":false
                    },
                }
                self.outTDSData={
                    "x": {
                        "value": [1,2.3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30],
                        "label": ["1","","","","5","","","","","10","","","","","15","","","","","20","","","","","25","","","","","30"]
                    },
                    "y": [
                        {
                            "value": self.handleTDSArr(tdsArr).outTDS,
                            "label":[],
                            "color": "#00edff", 
                        }
                    ],
                    "description": "",
                    "borderRadius":"4",
                    "legend": {
                        "position": "TOP_LEFT", //"TOP_LEFT"/"TOP_RIGHT"
                        "orientation": "HORIZONTAL", //"HORIZONTAL"/"BOTTOM_RIGHT"
                        "show":false
                    },
                }
            },function(error){
                // nativeService.alert(error);
            })
        },
        handleTDSArr(arr){
            var inTDS=new Array(30).fill(0);
            var outTDS=new Array(30).fill(0);
            for(var i=0;i<arr.length;i++){
                inTDS[i]=parseInt(arr[i].inTds);
                outTDS[i]=parseInt(arr[i].outTds);
            }
            return {'inTDS':inTDS,'outTDS':outTDS};
        },
        //ajax获取净水量 deviceId设备ID time 时间颗粒度
        getWaterCount(deviceId,time){
            var self=this;
            stream.fetch({
                method: 'POST',
                url: "http://47.111.41.65/kwha/ed/v1/api",
                type: 'json',
                headers: { 'Content-Type': 'application/json' },
                body:{
                    'msg':"PureWaterConsumption",
                    'params':{
                        'applianceId':deviceId,
                        'queryType':time
                    }
                }
            },function(res){
                var arr=res.data.result.data;
                if(time=='day'){
                    self.dayConsumption=self.handleConsumption(arr);
                }else if(time=='week'){
                    self.weekConsumption=self.handleConsumption(arr);
                }else if(time=='month'){
                    self.monthConsumption=self.handleConsumption(arr);
                }else if(time=='year'){
                    self.yearConsumption=self.handleConsumption(arr);
                }
                self.xWaterCount=self.dayConsumption.reduce(function(a,b){return parseInt(a)+parseInt(b)});
                self.chartJson={
                    "x": {
                        "value": [1,2.3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24],
                        "label": ["0","","","","4","","","","","9","","","","","14","","","","","19","","","","23"]
                    },
                    "y": [
                        {
                            "value": self.dayConsumption,
                            "label":[],
                            "color": "#00edff", 
                        }
                    ],
                    "description": "",
                    "borderRadius":"4",
                    "legend": {
                        "position": "TOP_LEFT", //"TOP_LEFT"/"TOP_RIGHT"
                        "orientation": "HORIZONTAL", //"HORIZONTAL"/"BOTTOM_RIGHT"
                        "show":false
                    },
                }
            },function(error){
                // nativeService.alert(error);
            })
        },
        handleConsumption(arr){
            var result=[];
            for(var i=0;i<arr.length;i++){
                result[i]=parseInt(arr[i].yWater,10);
            }
            return result;
        },
        //获得总净水量
        getTotal(deviceId){
            var self=this;
            stream.fetch({
                method: 'POST',
                url: "http://47.111.41.65/kwha/ed/v1/api",
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
                self.waterCount=parseInt(res.data.result.yWater);
                self.bottle=parseInt(self.waterCount/5);
                self.money=parseInt(self.waterCount*2);
            },function(error){
                // nativeService.alert(error);
            })
        },
        //获取设备ID
        getDeviceId(){
            var self=this;
            nativeService.getDeviceInfo().then((res)=>{
                self.SN=res.result.deviceSn;
                self.getTDS(res.result.deviceId,30);
                self.getWaterCount(res.result.deviceId,'day');
                self.getWaterCount(res.result.deviceId,'week');
                self.getWaterCount(res.result.deviceId,'month');
                self.getWaterCount(res.result.deviceId,'year');
                self.getTotal(res.result.deviceId);
            }).catch((err)=>{

            })
        },
        //设置数字的颜色
        setFontColor(str){
            var arr1=str.split('');
            var arr=new Array(3).fill(0);
            for(var i=0;i<arr1.length;i++){
                arr[2-i]=arr1[arr1.length-1-i];
            }
            var obj={
                'bai':{
                    'num':'',
                    'isFight':false
                },
                'shi':{
                    'num':'',
                    'isFight':false
                },
                'ge':{
                    'num':'',
                    'isFight':false
                },
            };
            obj.bai.num=arr[0];
            obj.shi.num=arr[1];
            obj.ge.num=arr[2];
            if(parseInt(str)>=100){
                obj.bai.isFight=true;
                obj.shi.isFight=true;
                obj.ge.isFight=true;
            }else if(parseInt(str)<100&&parseInt(str)>=10){
                obj.bai.isFight=false;
                obj.shi.isFight=true;
                obj.ge.isFight=true;
            }else if(parseInt(str)<10&&parseInt(str)>0){
                obj.bai.isFight=false;
                obj.shi.isFight=false;
                obj.ge.isFight=true;
            }else{
                obj.bai.isFight=false;
                obj.shi.isFight=false;
                obj.ge.isFight=false;
            }
            return obj;
        },
        initStatus(status){
             this.circleJson={
                "completedColor":"#43A6FF", //环形进度条完成后的颜色
                "incompletedColor":"#ADDBF9", //环形进度条未完成后的颜色
                "thickness":6, //环形进度条宽度，默认4
                "cornerRadius" : 60,  //环形的半径，默认是width/2
                "totalCounter" : 360, //环形进度条的最大值，默认是360
                "progressCounter" : parseInt((100-status.filter1Life)/100*360), //设置进度值，默认是从0-360, 默认为0
                "autoProgress" : false, //设置是否需要自动执行环形进度，默认false, 如果设置为true，则每秒进度值+1操作
                "clockwise" : true, //环形自动执行进度的方向，默认是true，即顺时针方向，false为逆时针方向
                "startingSlice" : 0, //环形进度开始的起始位置，当totalCounter为360的时候，0: 0点钟位置起点，90:3点钟位置起点 180:6点钟位置起点
                "pointShow" : false, //环形进度中的进度球是否需要显示，默认不显示
                "pointRadius" : 3, //默认是环形进度宽度的一半
                "pointColor" :  "#43A6FF", //环形进度中的进度球颜色
            };
            if(status.washing==1&&status.filtrating==0){
                this.currentStatus="自动清洗中";
            }else if(status.washing==0&&status.filtrating==1){
                this.currentStatus="设备努力工作中";
            }else if(status.washing==0&&status.filtrating==0){
                this.currentStatus="设备待机中";
            }
            this.inTDS=this.coverTDS(status.inTDS)
            this.outTDSList=this.setFontColor(status.outTDS.toString());
            if(parseInt(status.outTDS)>=100){
                this.otherSrc="helpItem.js";
                this.helpItemKey=12;
                this.isShowX=false;
                this.tipFlag=true;
                this.tipInfo="水质异常:请检查滤芯是否损坏或者过期";
                this.tipButton="查看详情";
                this.inTDS='000';
                this.btnFlag=true;
                this.outTDSList=this.setFontColor(status.outTDS.toString());
            }
            if(status.overtime==1){
                this.otherSrc="helpItem.js";
                this.helpItemKey=13;
                this.isShowX=false;
                this.tipFlag=true;
                this.tipInfo="E6 制水时间过长，请检查设备状况";
                this.tipButton="查看详情";
                this.inTDS='000';
                this.btnFlag=true;
                this.outTDSList=this.setFontColor(status.outTDS.toString());
            }
            // if(status.stopcockError==1){
            //     this.otherSrc="helpItem.js";
            //     this.helpItemKey=15;
            //     this.isShowX=false;
            //     this.tipFlag=true;
            //     this.tipInfo="E9 水龙头通信故障";
            //     this.tipButton="查看详情";
            //     this.inTDS='000';
            //     this.btnFlag=true;
            //     this.outTDSList=this.setFontColor(status.outTDS.toString());
            // }
            if(status.tdsError==1){
                this.otherSrc="helpItem.js";
                this.helpItemKey=16;
                this.isShowX=false;
                this.tipFlag=true;
                this.tipInfo="EA TDS模组通信故障";
                this.tipButton="查看详情";
                this.inTDS='---';
                this.btnFlag=true;
                this.outTDSList={
                    'bai':{
                        'num':'-',
                        'isFight':false
                    },
                    'shi':{
                        'num':'-',
                        'isFight':false
                    },
                    'ge':{
                        'num':'-',
                        'isFight':false
                    },
                };
            }
            if(status.isGenuine==1){
                this.otherSrc="helpItem.js";
                this.helpItemKey=14;
                this.tipColor="rgba(255,118,95,0.85)";
                this.tipFlag=true;
                this.tipInfo="滤芯异常 请检查设备状况";
                this.tipButton="查看详情";
                this.filterLife='- -';
                this.circleJson.progressCounter=360;
                this.days=' - ';
                this.isShowSigh=true;
                this.inTDS='000';
                this.btnFlag=true;
                this.outTDSList=this.setFontColor(status.outTDS.toString());
            }else{
                this.filterLife=status.filter1Life+'%';
                this.days=parseInt(parseInt(this.filterLife)*360/100)+'';
            }
            if(status.filter1Life<=5){
                    if(status.filter1Life==0){
                        this.otherSrc="buyFilter.js";
                        this.isShowX=true;
                        this.tipFlag=true;
                        this.tipInfo="滤芯已到期 请及时更换滤芯";
                        this.tipButton="";
                        this.btnFlag=false;
                        this.isShowSigh=true;
                    }else{
                        this.otherSrc="buyFilter.js";
                        this.isShowX=true;
                        this.tipFlag=true;
                        this.tipInfo="滤芯即将到期 请提前购买滤芯以备更换";
                        this.tipButton="";
                        this.btnFlag=false;
                    }
            }
            if(status.filter1Life>5&&status.isGenuine==0&&status.communicationFault==0&&status.overtime==0&&status.tdsError==0&&status.stopcockError==0&&parseInt(status.outTDS)<100){
                this.tipFlag=false;
                this.isShowSigh=false;
            }
            this.randomTips=this.getTips();
        },
        //将TDS数值补充为3位数 89-》089
        coverTDS(tds){
            if(parseInt(tds)<9){
                return '00'+tds;
            }else if(parseInt(tds)<100&&parseInt(tds)>=10){
                return '0'+tds;
            }else{
                return ''+tds;
            }
        },
        //根据异常类型跳转不同的页面
        goOther(){
            nativeService.setItem('helpKey',this.helpItemKey);
            nativeService.goTo(this.otherSrc);
        },
        //随机产生一句提示
        getTips(){
            var num=parseInt(Math.random()*12,10);
            var str='';
            switch(num){
                case 0:
                str="晨起空腹喝杯水，补水、排毒好处多多哟～";
                return str;
                case 1:
                str="每天多喝水，皮肤更水嫩，补水更养颜哟～";
                return str;
                case 2:
                str="下班回家，喝一杯温水，可以缓解一天的疲劳哟～";
                return str;
                case 3:
                str="喝水不要过冷或过烫，饮暖开水对身体更为有益呢～";
                return str;
                case 4:
                str="喝水不宜大口，小口吞咽慢慢喝最好呢～";
                return str;
                case 5:
                str="运动后体内极易缺水，一定要适量补水哦～";
                return str;
                case 6:
                str="多喝水可以帮助身体消耗掉多余的脂肪呢～";
                return str;
                case 7:
                str="净化后的水，泡茶、冲咖啡口感更好呢～";
                return str;
                case 8:
                str="餐前半小时补水，不仅养胃还能调动食欲哟～";
                return str;
                case 9:
                str="不要饮用存放过久的水，新鲜的直饮水更健康哦～";
                return str;
                case 10:
                str="水是生命之源，不渴也要记得喝水哦～";
                return str;  
                case 11:
                str="睡前适度喝点水，可以改善睡眠效果哦～";
                return str;              
            }
        },
        sendQuery(){
            var self=this;
            nativeService.startCmdProcess("query",cmd.createQueryMessage(),function(res){
                self.status=cmd.analyse(res);
                self.initStatus(self.status);
                nativeService.hideLoading();
            },function(res){
                nativeService.hideLoading();
                self.otherSrc="helpItem.js";
                self.helpItemKey=11;
                self.isShowX=true;
                self.tipFlag=true;
                self.tipInfo="设备离线 请检查当前网络状态";
                self.tipButton="查看详情";
            })
        },
        //刷新页面
        viewappear(){
            this.sendQuery();
        },
        //轮询4s一次
        polling(){
            var self=this;
            self.timer1=setInterval(function(){
                self.sendQuery();
            },4000)
        },
    },
    beforeCreate(){
        var domModule = weex.requireModule('dom');
        nativeService.getPath((path) => {
            let fontUrl = path + 'assets/setting/bugu_font.ttf'
            domModule.addRule('fontFace', {
                'fontFamily': "iconfont1",
                'src': "url('" + fontUrl + "')"
            });
        })
    },
    created(){
        nativeService.showLoading();
        var self=this;
        self.getDeviceId();
        self.sendQuery();
        self.startAutoSwitch();
        // self.polling();
        // 监听设备主动上报
        globalEvent.addEventListener('receiveMessage',function(res){
            var msg=res.data.split(",");
            self.status=cmd.analyse(msg);
            self.initStatus(self.status);
        })
        // cmd.dataReport('KH_0xED_63201936','view','page_view','mainPage',self.SN,{});//埋点
    },
    mounted(){
        this.lottieData=JSON.stringify(this.lottieDemo);
    }
}
</script>
