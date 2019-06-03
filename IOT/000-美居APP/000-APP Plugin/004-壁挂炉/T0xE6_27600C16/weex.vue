<template>
    <div class="wrapper" :style="{'height':objHeight}" >
        <div class="up" :style="{'height':upHeight,'background-image':upBgColor}">
            <midea-header :title="'燃气壁挂炉'" :isImmersion="true" :bgColor="headerBgColor" :titleText="titleText" :leftImg="leftImg" :rightImg="rightImg" :showRightImg="true" :showLeftImg="true" @leftImgClick="goBack" @rightImgClick="goMore"></midea-header>
            <div class="up-wrapper">
                <div class="up-first">
                    <midea-tab :tabArray="tabData" :fontColor="fontColor"  @tabClicked="tabClicked"></midea-tab>
                    <!-- <image :src="power" style="width:76px;height:76px" @click="powerControl"></image> -->
                </div>
                <div class="up-second" v-if="heatOffFlag">
                    <text class="up-second-text" :style="{'color':fontAllColor}">{{setTemperature}}</text>
                    <text class="up-second-unit" :style="{'color':fontAllColor}">o</text>
                </div>
                <div class="up-third" v-if="heatOffFlag">
                    <text class="up-third-text" :style="{'color':fontAllColor}">设置温度 {{fireStatus}}</text>
                </div>
                <div class="up-fourth" v-if="heatOffFlag">
                    <text class="up-fourth-text" :style="{'color':fontAllColor}">实际温度{{truthTemperature}}° 室外温度{{outTemperature}}°</text>
                </div>
                <div class="up-fifth" v-if="heatOffFlag">
                    <image :src="less" style="width:72px;height:72px" @click="minusTemperature"></image>
                    <image :src="add" style="width:72px;height:72px" @click="plusTemperature"></image>
                </div>
                <div class="heatOff">
                    <text class="heatOff-title" v-if="!heatOffFlag">采暖功能已关闭</text>
                    <text class="heatOff-info" v-if="!heatOffFlag">需点击右上角“...”开启采暖功能</text>
                </div>
            </div>
        </div>
        <div class="down" :style="{'height':downHeight}">
            <div class="down-wrapper">
                <midea-nav-list :list="navList" :cols="cols" @itemClicked="itemClicked" @itemLongpress="setSelfTemperature"></midea-nav-list>
            </div>
        </div>
        <midea-dialog   :title="dialogTitle" :content="dialogContent" mainBtnColor="rgb(38,122,255)"  :show="powerShow"
                        @mideaDialogConfirmBtnClicked="mideaDialogConfirmBtnClicked1" 
                        @mideaDialogCancelBtnClicked="mideaDialogCancelBtnClicked1"></midea-dialog>
        <midea-dialog   :title="dialogTitle" :content="dialogContent" mainBtnColor="rgb(38,122,255)"  :show="modeShow"
                        @mideaDialogConfirmBtnClicked="mideaDialogConfirmBtnClicked2" 
                        @mideaDialogCancelBtnClicked="mideaDialogCancelBtnClicked1"></midea-dialog>
        <midea-dialog   :title="dialogTitle" :content="dialogContent" mainBtnColor="rgb(38,122,255)"  :show="errorShow" confirmText="电话报修"
                        @mideaDialogConfirmBtnClicked="mideaDialogConfirmBtnClicked3" 
                        @mideaDialogCancelBtnClicked="mideaDialogCancelBtnClicked2"></midea-dialog>
    </div>
</template>

<style>
.wrapper{
}
.up{
    background-image: linear-gradient(to bottom, rgb(255,189,0),rgb(255,205,0));
}
.up-wrapper{
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
}
.up-first{
    margin-top: 30px;
    padding-left: 215px;
    width: 700px;
    height: 100px;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
}
.up-second{
    margin-top: 20px;
    width: 750px;
    height: 240px;
    flex-direction: row;
    justify-content: center;
    align-items: flex-start;
}
.up-second-text{
    font-size: 220px;
    font-family: Roboto-Light;
    color: white;
}
.up-second-unit{
    font-size: 50px;
    font-family: PingFangSC-Light;
    color: white;
    padding-top: 40px;
}
.up-third{
    margin-top: 20px;
}
.up-third-text{
    font-size: 32px;
    font-family: PingFangSC-Regular;
    color:white;
}
.up-fourth{
    margin-top: 48px;
}
.up-fourth-text{
    font-size: 36px;
    font-family: PingFangSC-Regular;
    color:white;
}
.up-fifth{
    margin-top: 56px;
    width: 288px;
    height: 74px;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
}
.down{
    background-color: white;
}
.down-wrapper{
    margin-top: 112px;
}
.heatOff{
    margin-top: 200px;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
}
.heatOff-title{
    font-size: 36px;
    color: #ffffff;
    font-family: PingFangSC-Regular;
}
.heatOff-info{
    font-size: 28px;
    color: #ffffff;
    font-family: PingFangSC-Regular;
}
</style>

<script>
import nativeService from '@/common/services/nativeService';
import cmd from './common/cmd.js';
import base from './base.js';
import mideaHeader from './components/mheader.vue';
import mideaDialog from '@/component/dialog.vue';
import mideaTab from './components/tab.vue';
import mideaNavList from './components/navList.vue';
const globalEvent=weex.requireModule('globalEvent');
const stream=weex.requireModule('stream');
const picker = weex.requireModule('picker');

export default {
    components:{
        mideaHeader,
        mideaDialog,
        mideaTab,
        mideaNavList,
    },
    mixins: [base],
    data(){
        return {
            height:0,
            objHeight:"",
            upHeight:"",
            downHeight:"",
            status:{},//设备当前状态
            upBgColor:"",//上层背景色
            headerBgColor:"rgb(255,189,0)",//header背景色
            titleText:"white",//header字体色
            leftImg:"./assets/img/ic_menu_back_white_n2x.png",
            rightImg:"./assets/img/ic_menu_white_n2x.png",
            power:"./assets/img/power.png",
            powerShow:false,//电源开关dialog
            heatOffFlag: true,//采暖开关标志
            dialogTitle:"",
            dialogContent:"",
            modeFlag:0,//区分采暖和沐浴，0为采暖，1为沐浴
            modeIndex:0,//区分点击哪个模式
            modeShow:false,//模式选择dialog
            fontColor:"rgb(255,189,0)",
            fontAllColor:"white",
            setTemperature:0,
            truthTemperature:0,//实际温度
            outTemperature:0,//室外温度
            fireStatus:"",//根据火焰反馈显示加热中
            tabData:[
                {"name":"采暖","selected":true},
                {"name":"卫浴","selected":false}
            ],
            navList:[
                {
                    "title":"开机",
                    "img":"./assets/img/power_off2x.png"
                },
                {
                    "title":"外出节能",
                    "img":"./assets/img/out_off2x.png"
                },
                // {
                //     "title":"智能居家",
                //     "img":"./assets/img/at_home_off2x.png"
                // },
                // {
                //     "title":"智能睡眠",
                //     "img":"./assets/img/sleep_off2x.png"
                // },
                {
                    "title":"采暖预约",
                    "img":"./assets/img/order_off2x.png"
                },
            ],
            heatNavList:[
                {
                    "title":"开机",
                    "img":"./assets/img/power_off2x.png"
                },
                {
                    "title":"外出节能",
                    "img":"./assets/img/out_off2x.png"
                },
                // {
                //     "title":"智能居家",
                //     "img":"./assets/img/at_home_off2x.png"
                // },
                // {
                //     "title":"智能睡眠",
                //     "img":"./assets/img/sleep_off2x.png"
                // },
                {
                    "title":"采暖预约",
                    "img":"./assets/img/order_off2x.png"
                },
            ],
            bathNavList:[
                // {
                //     "title":"沐浴随温",
                //     "img":"./assets/img/shower_off2x.png"
                // },
                {
                    "title":"开机",
                    "img":"./assets/img/power_off2x.png"
                },
                {
                    "title":"专属水温",
                    "img":"./assets/img/exclusive_off2x.png",
                    "tip":"(长按设定)"
                },
            ],
            cols:3,
            timer1:"",//定时器
            timer2:"",//定时器
            timer3:"",//定时器
            errorShow:0,//故障提示
            temperatureIndex:0,//卫浴专属水温设置温度
            add:"",
            less:"",
            isSet:false,//定时器判断标志
            isTab:false,//tab切换标志
        }
    },
    methods:{
        goBack(){
            nativeService.backToNative();
        },
        goMore(){
            if(this.status.powerFlag==1){
                nativeService.goTo("moreFunction.js",{ viewTag: 'moreFunction' });
            }
        },
        powerControl(){
            if(this.status.powerFlag==1){
                this.dialogTitle="关机提示";
                this.dialogContent="采暖及卫浴会全部关闭，是否确认?";
                this.powerShow=true;
            }else if(this.status.powerFlag==0){
                nativeService.showLoading();
                this.status.powerFlag=1;
                this.sendTurnOn();
            }
        },
        mideaDialogConfirmBtnClicked1(){
            nativeService.showLoading();
            this.status.powerFlag=0;
            this.powerShow=false;
            this.sendTurnOff();
        },
        mideaDialogConfirmBtnClicked2(){
            nativeService.showLoading();
            this.modeShow=false;
            if(this.modeFlag==0){
                if(this.modeIndex==1){
                    this.sendHeatMode(1)
                }
                //去除 居家 睡眠
                // else if(this.modeIndex==1){
                //     this.sendHeatMode(2)
                // }else if(this.modeIndex==2){
                //     this.sendHeatMode(3)
                // }
            }else if(this.modeFlag==1){
                if(this.modeIndex==0){
                    this.sendBathMode(0);
                }else if(this.modeIndex==1){
                    this.sendBathMode(1);
                }
            }
        },
        mideaDialogConfirmBtnClicked3(){
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
        mideaDialogCancelBtnClicked1(){
            this.powerShow=this.modeShow=false;
        },
        mideaDialogCancelBtnClicked2(){
            this.errorShow=false;
            nativeService.goTo("instruction.js");
        },
        //获取设备当前状态
        initStatus(){
            var self=this;
            // var msg=[170,51,237,0,0,0,0,0,0,3,1,1,255,0,231,251,0,0,36,0,0,0,36,0,42,0,0,42,0,0,0,0,0,0,0,0,0,0,0,24,0,0,0,0,0,0,0,0]
            // self.status=cmd.analyse(msg);
            if(parseInt(self.status.outTemperature)!=-127&&parseInt(self.status.outTemperature)!=-126&&parseInt(self.status.outTemperature)!=-125){
                self.outTemperature=self.status.outTemperature;
            }else{
                switch(parseInt(self.status.outTemperature)){
                    case -127:
                    self.dialogTitle="无探头";
                    self.dialogContent="未检测到室外温度传感器探头";
                    self.errorShow=true;
                    break;
                    case -126:
                    self.dialogTitle="短路故障";
                    self.dialogContent="室外温度传感器探头短路故障";
                    self.errorShow=true;
                    break;
                    case -125:
                    self.dialogTitle="断路故障";
                    self.dialogContent="室外温度传感器探头断路故障";
                    self.errorShow=true;
                    break;
                }
            }
            //根据modeFlag显示回水温度和设置温度
            if(self.modeFlag==0){
                if(parseInt(self.status.heatOutWaterTemperature)<100){
                    self.truthTemperature=self.status.heatOutWaterTemperature;
                }
                self.setTemperature=self.status.currentHeatSetTemperature;
            }else if(self.modeFlag==1){
                if(parseInt(self.status.bathOutWaterTemperature)<100){
                    self.truthTemperature=self.status.bathOutWaterTemperature;
                }
                self.setTemperature=self.status.currentBathSetTemperature;
            }
            //故障检测
            switch(parseInt(self.status.error)){
                case 0:
                break;
                case 1:
                self.dialogTitle="故障码：E1";
                self.dialogContent="点火失败";
                self.errorShow=true;
                break;
                case 2:
                self.dialogTitle="故障码：E1";
                self.dialogContent="意外熄火";
                self.errorShow=true;
                break;
                case 3:
                self.dialogTitle="故障码：E2";
                self.dialogContent="伪火";
                self.errorShow=true;
                break;
                case 4:
                self.dialogTitle="故障码：E2";
                self.dialogContent="残火";
                self.errorShow=true;
                break;
                case 5:
                self.dialogTitle="故障码：E3";
                self.dialogContent="机械温控器过热保护故障";
                self.errorShow=true;
                break;
                case 6:
                self.dialogTitle="故障码：E4";
                self.dialogContent="采暖出水温度探头过热保护";
                self.errorShow=true;
                break;
                case 7:
                self.dialogTitle="故障码：E5";
                self.dialogContent="风压故障或风机故障";
                self.errorShow=true;
                break;
                case 8:
                self.dialogTitle="故障码：E6";
                self.dialogContent="电磁阀驱动电路故障";
                self.errorShow=true;
                break;
                case 9:
                self.dialogTitle="故障码：E7";
                self.dialogContent="水压故障";
                self.errorShow=true;
                break;
                case 10:
                self.dialogTitle="故障码：E8";
                self.dialogContent="水泵卡死";
                self.errorShow=true;
                break;
                case 11:
                self.dialogTitle="故障码：F0";
                self.dialogContent="供暖出水温度传感器短路";
                self.errorShow=true;
                break;
                case 12:
                self.dialogTitle="故障码：F0";
                self.dialogContent="供暖出水温度传感器断路";
                self.errorShow=true;
                break;
                case 13:
                self.dialogTitle="故障码：F2";
                self.dialogContent="结冰故障";
                self.errorShow=true;
                break;
                case 14:
                self.dialogTitle="故障码：F3";
                self.dialogContent="卫浴出水温度传感器短路";
                self.errorShow=true;
                break;
                case 15:
                self.dialogTitle="故障码：F3";
                self.dialogContent="卫浴出水温度传感器断路";
                self.errorShow=true;
                break;
                case 16:
                self.dialogTitle="故障码：F4";
                self.dialogContent="供暖出水温度异常,探头脱落";
                self.errorShow=true;
                break;
                case 17:
                self.dialogTitle="故障码：F5";
                self.dialogContent="卫浴出水温度异常,探头脱落";
                self.errorShow=true;
                break;
                case 18:
                self.dialogTitle="故障码：EF";
                self.dialogContent="冷凝水堵塞";
                self.errorShow=true;
                break;
                case 19:
                self.dialogTitle="故障码：FE";
                self.dialogContent="燃气泄漏故障";
                self.errorShow=true;
                break;
                case 20:
                self.dialogTitle="故障码：EC";
                self.dialogContent="主板和显示板通信失败";
                self.errorShow=true;
                break;
                case 21:
                self.dialogTitle="故障码：EE";
                self.dialogContent="卫浴超时";
                self.errorShow=true;
                break;
                case 22:
                self.dialogTitle="故障码：EA";
                self.dialogContent="CO报警";
                self.errorShow=true;
                break;
            }
        },
        //初始化首页样式
        initStyle(){
            var self=this;
            if(self.status.powerFlag==1){
                self.upBgColor="linear-gradient(to bottom, rgb(255,189,0),rgb(255,205,0))"
                self.headerBgColor="rgb(255,189,0)";
                self.titleText="white";
                self.leftImg="./assets/img/ic_menu_back_white_n2x.png";
                self.rightImg="./assets/img/ic_menu_white_n2x.png";
                self.power="./assets/img/power.png";
                self.fontColor="rgb(255,205,0)";
                self.add="./assets/img/plus2.png";
                self.less="./assets/img/minus2.png";
                self.fontAllColor="white";
                self.heatNavList[0].img="./assets/img/power_off2x.png";
                self.heatNavList[0].title="关机";
                self.bathNavList[0].img="./assets/img/power_off2x.png";
                self.bathNavList[0].title="关机";
                //火焰反馈
                if(self.status.flameFeedback==0){
                    self.fireStatus="";
                }else if(self.status.flameFeedback==1){
                    self.fireStatus="加热中";
                }
                //模式
                if(self.status.summerMode==0){
                    if(self.status.outMode==0){
                        self.heatNavList[1].img="./assets/img/out_off2x.png";
                    }else if(self.status.outMode==1){
                        self.heatNavList[1].img="./assets/img/out_on2x.png";
                    }
                    // if(self.status.homeMode==0){
                    //     self.heatNavList[1].img="./assets/img/at_home_off2x.png";
                    // }else if(self.status.homeMode==1){
                    //     self.heatNavList[1].img="./assets/img/at_home_on2x.png";
                    // }
                    // if(self.status.sleepMode==0){
                    //     self.heatNavList[2].img="./assets/img/sleep_off2x.png";
                    // }else if(self.status.sleepMode==1){
                    //     self.heatNavList[2].img="./assets/img/sleep_on2x.png";
                    // }
                }else{
                    self.heatNavList[1].img="./assets/img/out_off2x.png";
                    // self.heatNavList[1].img="./assets/img/at_home_off2x.png";
                    // self.heatNavList[2].img="./assets/img/sleep_off2x.png";
                }
                // if(self.status.temperatureSensationSwitch==0){
                //     self.bathNavList[0].img="./assets/img/shower_off2x.png";
                // }else if(self.status.temperatureSensationSwitch==1){
                //     self.bathNavList[0].img="./assets/img/shower_on2x.png";
                // }
                self.bathNavList[1].img="./assets/img/exclusive_off2x.png";
                //根据当前界面是采暖还是卫浴来显示底部模式
                if(self.modeFlag==0){
                    self.navList=self.heatNavList;
                }else if(self.modeFlag==1){
                    self.navList=self.bathNavList;
                }
            }else{
                self.upBgColor="linear-gradient(to bottom, rgb(231,231,234),rgb(217,217,223))"
                self.headerBgColor="rgb(231,231,234)";
                self.titleText="gray";
                self.leftImg="./assets/img/ic_menu_back_gray_n2x.png";
                self.rightImg="./assets/img/ic_menu_gray_n2x.png";
                self.power="./assets/img/power1.png";
                self.fontColor="gray";
                self.heatNavList[0].img="./assets/img/power_on2x.png";
                self.heatNavList[0].title="开机";
                self.heatNavList[1].img="./assets/img/out_off2x.png";
                // self.heatNavList[1].img="./assets/img/at_home_off2x.png";
                // self.heatNavList[2].img="./assets/img/sleep_off2x.png";
                // self.bathNavList[0].img="./assets/img/shower_off2x.png";
                self.bathNavList[0].img="./assets/img/power_on2x.png";
                self.bathNavList[0].title="开机";
                self.bathNavList[1].img="./assets/img/exclusive_off2x.png";
                if(self.modeFlag==0){
                    self.navList=self.heatNavList;
                }else if(self.modeFlag==1){
                    self.navList=self.bathNavList;
                }
                //火焰反馈
                if(self.status.flameFeedback==0){
                    self.fireStatus="";
                }else if(self.status.flameFeedback==1){
                    self.fireStatus="加热中";
                }
                self.add="./assets/img/plus1.png";
                self.less="./assets/img/minus1.png";
                self.fontAllColor="gray";
            }
        },
        initHeight(){
            this.objHeight=this.height+'px';
            this.upHeight=this.height*0.7076+'px';
            this.downHeight=this.height*0.2924+'px';
        },
        //判断采暖开关
        initHeatPower(){
            var self=this;
            if(self.status.summerMode==1){
                if(self.modeFlag==0){
                    self.heatOffFlag=false;
                }
            }else if(self.status.summerMode==0){
                self.heatOffFlag=true;
            }
        },
        tabClicked(index){
            var self=this;
            self.isTab=true;
            if(index==0){
                self.setTemperature=self.status.currentHeatSetTemperature;
                self.truthTemperature=self.status.heatOutWaterTemperature;
                self.modeFlag=0;
                self.cols=3;
                self.navList=self.heatNavList;
                self.initHeatPower();
            }else if(index==1){
                self.setTemperature=self.status.currentBathSetTemperature;
                self.truthTemperature=self.status.bathOutWaterTemperature;
                self.modeFlag=1;
                self.cols=2;
                self.navList=self.bathNavList;
                self.heatOffFlag=true;
            }
        },
        itemClicked(index){
            var self=this;
            if(index==0){self.powerControl()}
            if(self.status.powerFlag==1){
                if(self.modeFlag==0){
                    if(self.status.summerMode==0){//点击采暖中的模式
                        if(index==0){
                            
                        }else if(index==1){
                            self.modeIndex=1;
                            if(self.status.outMode==0){
                                self.dialogTitle="模式提示";
                                self.dialogContent="您确定要切换到外出节能模式吗?"
                                self.modeShow=true;
                            }else{
                                nativeService.showLoading();
                                this.sendHeatMode(0);
                            }
                        }else if(index==2){
                            nativeService.goTo("order.js",{ viewTag: 'order' })
                        }
                        //去除 智能居家 智能睡眠
                        // else if(index==1){
                        //     self.modeIndex=1;
                        //     if(self.status.homeMode==0){
                        //         self.dialogTitle="模式提示";
                        //         self.dialogContent="您确定要切换到智能居家模式吗?"
                        //         self.modeShow=true;
                        //     }
                        // }else if(index==2){
                        //     self.modeIndex=2;
                        //     if(self.status.sleepMode==0){
                        //         self.dialogTitle="模式提示";
                        //         self.dialogContent="您确定要切换到智能睡眠模式吗?"
                        //         self.modeShow=true;
                        //     }
                        // }
                    }
                }else if(self.modeFlag==1){//点击卫浴中的模式
                    if(index==0){
                    //去除沐浴随温
                    //     self.modeIndex=0;
                    //     if(parseInt(self.status.bathBackWaterTemp,10)<=100){
                    //         if(self.status.temperatureSensationSwitch==0){
                    //             self.dialogTitle="模式提示";
                    //             self.dialogContent="您确定要切换到沐浴随温模式吗?"
                    //             self.modeShow=true;
                    //         }else{
                    //             self.dialogTitle="模式提示";
                    //             self.dialogContent="您确定要关闭沐浴随温模式吗?"
                    //             self.modeShow=true;
                    //         }
                    //     }else{
                    //             self.dialogTitle="卫浴进水传感器故障";
                    //             self.dialogContent="卫浴进水温度传感器故障 无法开启沐浴随温模式"
                    //             self.errorShow=true;
                    //     }   
                    }else if(index==1){
                        self.modeIndex=1;
                        self.dialogTitle="模式提示";
                        self.dialogContent="您确定要设置为专属水温吗?"
                        self.modeShow=true;
                    }
                }
            }
        },
        //长按专属温度来设置温度
        setSelfTemperature(index){
            if(this.status.powerFlag==1){
                if(this.modeFlag==1){
                    //去除沐浴随温
                    if(index==1){
                        this.pickTemperature();
                    }
                }
            }
        },
        pickTemperature() { 
            var self=this;
            var min=parseInt(self.status.bathSetTemperatureMin);
            var max=parseInt(self.status.bathSetTemperatureMax);
            var items=new Array();//卫浴温度设置范围
            for(var i=0;i<(max-min+1);i++){
                items[i]=i+min;
            }
            var pickItem = [{
                index: this.temperatureIndex,
                item: items,
                label: "℃"
            }]
            picker.pick({
                'items': pickItem,
                'cancelTxt': '取消', //取消按钮文字
                'confirmTxt': '确定', //确定按钮文字,
                'cancelTxtColor': '#020F13', //取消颜色
                'confirmTxtColor': '#020F13', //标题颜色
                'titleColor': '#020F13', //标题颜色
                'titleBgColor': '#E7EDEF' //标题栏颜色
            }, event => {
                if (event.result == 'success') {
                    var dataArr = event.data.replace("[", "").replace("]", "").split(",");
                    this.temperatureIndex = parseInt(dataArr[0]);
                    nativeService.showLoading();
                    this.sendBathingTemp(parseInt(dataArr[0])+min);
                }
            });
        },
        //避免出现白色初始化背景
        avoidBg(){
            this.upBgColor="linear-gradient(to bottom, rgb(255,189,0),rgb(255,205,0))";
        },
        //减温度
        minusTemperature(){
            if(this.status.powerFlag==1 && this.status.outMode==1 && this.modeFlag==0){
                nativeService.toast("请关闭外出节能");
            }else{
                var self=this;
                self.isSet=true;
                self.isTab=false;
                clearInterval(self.timer1);
                clearTimeout(self.timer2);
                clearTimeout(self.timer3);
                if(this.status.powerFlag==1){
                    if(self.modeFlag==0){
                        //采暖最小设置温度
                        if(self.setTemperature>parseInt(self.status.heatSetTemperatureMin)){
                            self.setTemperature--;
                            self.timer2=setTimeout(function(){
                                if(self.isTab){
                                    self.isTab=false;
                                }else{
                                    nativeService.showLoading();
                                    self.sendHeatTemperature(self.setTemperature);
                                }
                            },1000)
                        }else{
                            if(self.isTab){
                                self.isTab=false;
                            }else{
                                nativeService.showLoading();
                                self.sendHeatTemperature(self.setTemperature);
                            }
                            nativeService.alert("已达到加热状态下的采暖设置最小温度")
                        }
                    }else if(self.modeFlag==1){
                        //卫浴最小设置温度
                        if(self.setTemperature>parseInt(self.status.bathSetTemperatureMin)){
                            self.setTemperature--;
                            self.timer3=setTimeout(function(){
                                if(self.isTab){
                                    self.isTab=false;
                                }else{
                                    nativeService.showLoading();
                                    self.sendBathTemperature(self.setTemperature);
                                }
                            },1000)
                        }else{
                            if(self.isTab){
                                self.isTab=false;
                            }else{
                                nativeService.showLoading();
                                self.sendBathTemperature(self.setTemperature);
                            }
                            nativeService.alert("已达到加热状态下的卫浴设置最小温度")
                        }
                    }
                }
            }
        },
        //加温度
        plusTemperature(){
            if(this.status.powerFlag==1 && this.status.outMode==1 && this.modeFlag==0){
                nativeService.toast("请关闭外出节能");
            }else{
                var self=this;
                self.isSet=true;
                self.isTab=false;
                clearInterval(self.timer1);
                clearTimeout(self.timer2);
                clearTimeout(self.timer3);
                if(this.status.powerFlag==1){
                    if(self.modeFlag==0){
                        if(self.setTemperature<parseInt(self.status.heatSetTemperatureMax)){
                            self.setTemperature++;
                            self.timer2=setTimeout(function(){
                                if(self.isTab){
                                    self.isTab=false;
                                }else{
                                    nativeService.showLoading();
                                    self.sendHeatTemperature(self.setTemperature);
                                }
                            },1000)
                        }else{
                            if(self.isTab){
                                self.isTab=false;
                            }else{
                                nativeService.showLoading();
                                self.sendHeatTemperature(self.setTemperature);
                            }
                            nativeService.alert("已达到加热状态下的采暖设置最大温度")
                        }
                    }else if(self.modeFlag==1){
                        if(self.setTemperature<parseInt(self.status.bathSetTemperatureMax)){
                            self.setTemperature++;
                            self.timer3=setTimeout(function(){
                                if(self.isTab){
                                    self.isTab=false;
                                }else{
                                    nativeService.showLoading();
                                    self.sendBathTemperature(self.setTemperature);
                                }
                            },1000)
                        }else{
                            if(self.isTab){
                                self.isTab=false;
                            }else{
                                nativeService.showLoading();
                                self.sendBathTemperature(self.setTemperature);
                            }
                            nativeService.alert("已达到加热状态下的卫浴设置最大温度")
                        }
                    }
                }
            }
        },
        //开机的透传指令
        sendTurnOn(){
            var self=this;
            nativeService.startCmdProcess("control",cmd.turnOn(),function(result) {
                self.status=cmd.analyse(result);
                self.initStatus();
                self.initStyle();
                nativeService.hideLoading();   
            },
            function(result) {
                nativeService.hideLoading()
                nativeService.toast("网络较差，请稍后重试");
                self.sendQuery();
            })
        },
         //关机的透传指令
        sendTurnOff(){
            var self=this;
            nativeService.startCmdProcess("control",cmd.turnOff(),function(result) {
                self.status=cmd.analyse(result);
                self.initStatus();
                self.initStyle();
                nativeService.hideLoading();   
            },
            function(result) {
                nativeService.hideLoading()
                nativeService.toast("网络较差，请稍后重试");
                self.sendQuery();
            })
        },
        //发送采暖模式选择的透传指令
        sendHeatMode(mode){
            var self=this;
            nativeService.startCmdProcess("control",cmd.chooseHeatMode(mode),function(result) {
                self.status=cmd.analyse(result);
                self.initStatus();
                self.initStyle();
                nativeService.hideLoading();   
            },
            function(result) {
                nativeService.hideLoading()
                nativeService.toast("网络较差，请稍后重试");
                self.sendQuery();
            })
        },
        //发送卫浴模式选择的透传指令
        sendBathMode(mode){
            var self=this;
            if(mode==0){
                if(self.status.temperatureSensationSwitch==0){
                    nativeService.startCmdProcess("control",cmd.chooseSensationMode(1),function(result) {
                        self.status=cmd.analyse(result);
                        self.initStatus();
                        self.initStyle();
                        // self.bathNavList[1].img="./assets/img/exclusive_off2x.png";
                        nativeService.hideLoading();   
                    },
                    function(result) {
                        nativeService.hideLoading()
                        nativeService.toast("网络较差，请稍后重试");
                        self.sendQuery();
                    })
                }else{
                    nativeService.startCmdProcess("control",cmd.chooseSensationMode(0),function(result) {
                        self.status=cmd.analyse(result);
                        self.initStatus();
                        self.initStyle();
                        // self.bathNavList[1].img="./assets/img/exclusive_off2x.png";
                        nativeService.hideLoading();   
                    },
                    function(result) {
                        nativeService.hideLoading()
                        nativeService.toast("网络较差，请稍后重试");
                        self.sendQuery();
                    })
                }
            }else if(mode==1){
                nativeService.startCmdProcess("control",cmd.bathSetTemperature(self.status.exclusiveTemperature),function(result) {
                    self.status=cmd.analyse(result);
                    self.initStatus();
                    self.initStyle();
                    // self.bathNavList[1].img="./assets/img/exclusive_on2x.png";
                    nativeService.hideLoading();   
                },
                function(result) {
                    nativeService.hideLoading()
                    nativeService.toast("网络较差，请稍后重试");
                    self.sendQuery();
                })
            }
        },
        //发送采暖设置温度
        sendHeatTemperature(temp){
            var self=this;
            nativeService.startCmdProcess("control",cmd.heatSetTemperature(temp),function(result) {
                self.status=cmd.analyse(result);
                self.isSet=false;
                self.initStatus();
                self.initStyle();
                self.polling();
                nativeService.hideLoading();   
            },
            function(result) {
                nativeService.hideLoading()
                nativeService.toast("网络较差，请稍后重试");
                self.isSet=false;
                self.sendQuery();
                self.polling();
            })
        },
        //发送卫浴设置温度
        sendBathTemperature(temp){
            var self=this;
            nativeService.startCmdProcess("control",cmd.bathSetTemperature(temp),function(result) {
                self.status=cmd.analyse(result);
                self.isSet=false
                self.initStatus();
                self.initStyle();
                self.polling();
                self.bathNavList[1].img="./assets/img/exclusive_off2x.png";
                nativeService.hideLoading();   
            },
            function(result) {
                nativeService.hideLoading()
                nativeService.toast("网络较差，请稍后重试");
                self.isSet=false;
                self.sendQuery();
                self.polling();
            })
        },
        //发送卫浴专属水温温度
        sendBathingTemp(index){
            var self=this;
            nativeService.startCmdProcess("control",cmd.setBathingTemp(index),function(result) {
                self.status=cmd.analyse(result);
                self.initStatus();
                self.initStyle();
                nativeService.hideLoading();   
            },
            function(result) {
                nativeService.hideLoading()
                nativeService.toast("网络较差，请稍后重试");
                self.sendQuery();
            })
        },
        //查询设备当前状态
        sendQuery(){
            var self=this;
            nativeService.startCmdProcess("query",cmd.queryStatus(),function(res){
                self.status=cmd.analyse(res);
                if(self.isSet){
                    return;
                }
                self.initStatus();
                self.initStyle();
                self.initHeatPower();
                nativeService.hideLoading();
            },function(res){
                nativeService.hideLoading();
                // nativeService.toast("网络较差，请稍后重试");
            })
        },
        //轮询4s一次
        polling(){
            var self=this;
            self.timer1=setInterval(function(){
                self.sendQuery();
            },4000)
        },
    },
    created(){
        var self=this;
        self.height=Math.floor(750/self.$getConfig().env.deviceWidth*self.$getConfig().env.deviceHeight);
        nativeService.showLoading();
        clearInterval(self.timer1);
        self.avoidBg();
        self.initHeight();
        self.sendQuery();
        self.polling();
        //获取设备主动上报的信息
        // globalEvent.addEventListener('receiveMessage',function(res){
        //     self.status=cmd.analyse(res.data);
        //     nativeService.alert(res);
        //     self.initStatus();
        //     self.initStyle();
        // })
    },
}
</script>
