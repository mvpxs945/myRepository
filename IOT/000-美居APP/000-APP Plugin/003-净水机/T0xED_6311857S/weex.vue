<template>
    <div class="wrapper" :style="objClass">
        <div class="upWrapper" :style="{'height':upHeight,'backgroundImage':bgColor}">
            <midea-header :title="'净饮机'" bgColor="rgba(255,255,255,0)" :isImmersion="true" :titleText="fontColor"  :showRightImg1="true" :showRightImg2="true" :showLeftImg="true" :leftImg="leftImg" :rightImg1="rightImg1" :rightImg2="rihgtImg2" @leftImgClick="goBack" @rightImg1Click="lock" @rightImg2Click="goMore"></midea-header>
            <div class="firstFloor">
                <!-- <image src="./assets/img/powerSwitch_w.png" style="width:50px;height:50px;" @click="powerSwitch"></image> -->
            </div>
            <div class="secondFloor">
                <text class="secondFloor-text" :style="{'color':fontColor}">{{outTDS}}</text>
                <div class="thirdFloor">
                    <text class="thirdFloor-text" :style="{'color':fontColor}">出水水质</text>
                </div>
            </div>
            <!-- <div class="thirdFloor">
                <text class="thirdFloor-text" :style="{'color':fontColor}">出水水质</text>
            </div> -->
            <div class="fourthFloor">
                <text class="fourthFloor-text" :style="{'color':fontColor}">当天用水量{{waterToday}}L</text>
            </div>
            <div class="fifthFloor">
                <text class="fifthFloor-text" :style="{'color':fontColor}">滤芯寿命剩余{{filterLife}}%</text>
            </div>
            <div class="sixFloor">
                <div class="sixFloor-wrapper">
                    <image class="sixFloor-img" :src="summerImg" @click="chooseSummer"></image>
                    <text class="sixFloor-text">夏季</text>
                </div>
                <div class="sixFloor-wrapper">
                    <image class="sixFloor-img" :src="winterImg" @click="chooseWinter"></image>
                    <text class="sixFloor-text">冬季</text>
                </div>
            </div>
        </div>
        <div class="downWrapper" :style="downClass">
            <midea-cell title="温度"
                    :hasArrow="true"
                    :hasBottomBorder="true"
                    :rightText="temperatureIndex1+'° '+temperatureIndex2+'° '+temperatureIndex3+'°'"
                    @mideaCellClick="pickTemperature"
            ></midea-cell>
            <midea-cell title="定量"
                        :hasArrow="true"
                        :hasBottomBorder="true"
                        :rightText="outWaterIndex=='持续'?'持续':outWaterIndex+'ml'"
                        @mideaCellClick="pickOutWater"
            ></midea-cell>
        </div>
        <midea-dialog :title="dialogTitle"
                        :content="dialogContent"
                        mainBtnColor="rgb(38,122,255)"
                        :show="dialogShow"
                        :confirmText="confirmText"
                        @mideaDialogConfirmBtnClicked="confirmBtn"
                        @mideaDialogCancelBtnClicked="cancelBtn"
        ></midea-dialog>
        <midea-dialog :title="errorTitle"
                        :content="errorContent"
                        mainBtnColor="rgb(38,122,255)"
                        :show="errorShow"
                        confirmText="电话报修"
                        @mideaDialogConfirmBtnClicked="errorConfirmBtn"
                        @mideaDialogCancelBtnClicked="errorCancelBtn"
        ></midea-dialog>
            
    </div>
</template>

<style>
.upWrapper{
    /* background-image:linear-gradient(to bottom right,rgba(82,117,245,1),rgba(77,104,247,1));  */
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
}
.firstFloor{
    width: 750px;
    height: 50px;
    flex-direction: row;
    align-items: center;
    justify-content: flex-end;
    padding-right: 36px;
}
.secondFloor{
    width: 750px;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}
.secondFloor-text{
    font-size: 220px;
    font-family: PingFangSC-Light;
}
.thirdFloor{
    width: 750px;
    flex-direction: row;
    align-items: center;
    justify-content: center;
}
.thirdFloor-text{
    font-size: 32px;
    font-family: PingFangSC-Regular;
}
.fourthFloor{
    width: 750px;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    margin-top: 50px;
}
.fourthFloor-text{
    font-size: 32px;
    font-family: PingFangSC-Regular;
}
.fifthFloor{
    width: 750px;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    padding-top: 70px;
}
.fifthFloor-text{
    font-size: 36px;
    font-family: PingFangSC-Regular;
}
.sixFloor{
    width: 320px;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding-bottom: 100px;
    padding-top: 100px;
}
.sixFloor-wrapper{
    flex-direction: column;
    align-items: center;
    justify-content: center;
}
.sixFloor-img{
    width: 80px;
    height: 80px;
}
.sixFloor-text{
    color: white;
    font-size: 28px;
    font-family: PingFangSC-Regular;
    margin-top: 16px;
}
.downWrapper-mode{
    width: 750px;
    margin-top: 60px;
}
</style>

<script>
import nativeService from '@/common/services/nativeService';
import cmd from './common/cmd.js';
import mideaHeader from './components/mheader.vue';
import mideaDialog from './components/dialog.vue'
import mideaNavList from './components/navList.vue';
import mideaCell from './components/cell.vue';
const globalEvent=weex.requireModule('globalEvent');
const stream=weex.requireModule('stream');
const picker = weex.requireModule('picker');

export default {
    components:{mideaHeader,
                mideaDialog,
                mideaNavList,
                mideaCell
    },
    data(){
        return {
            height:0,
            status:{},
            bgColor:'linear-gradient(to bottom right,rgba(82,117,245,1),rgba(77,104,247,1));',
            fontColor:'white',
            outTDS:'一',
            waterToday:0,
            filterLife:0,
            leftImg:'./assets/img/back_w.png',
            rightImg1:'./assets/img/lock_w.png',
            rightImg2:'./assets/img/menu_w.png',
            summerImg:'./assets/img/summer_p.png',
            winterImg:'./assets/img/winter_p.png',
            temperatureIndex1:0,//热水设置温度
            temperatureIndex2:0,//热水设置温度
            temperatureIndex3:0,//热水设置温度
            outWaterIndex:0,
            dialogShow:false,
            dialogFlag:0,//判断dialog类型1-购买滤芯 2-开关机 3/4-冬夏模式切换
            dialogTitle:'',
            dialogContent:'',
            confirmText:'',
            dayConsumption:[],
            errorTitle:'',
            errorContent:'',
            errorShow:false,
            errorFlag:0,
        }
    },
    methods: {
        goBack(){
            nativeService.goBack();
        },
        goMore(){
            nativeService.goTo('moreFunction.js')
        },
        //初始化
        initStatus(status){
            //开机
            if(status.powerSwitch==1){
                //童锁
                this.fontColor='white';
                this.leftImg='./assets/img/back_w.png';
                this.rightImg2='./assets/img/menu_w.png';
                if(status.lock==0){
                    this.rightImg1='./assets/img/lock_w.png';
                }else{
                    this.rightImg1='./assets/img/lock_p.png';
                }
                //制水
                if(status.isPurifying==0){
                    this.bgColor='linear-gradient(to bottom right,rgba(82,117,245,1),rgba(77,104,247,1))';
                }else{
                    this.bgColor='linear-gradient(to bottom right,rgba(255,187,0,1),rgba(255,170,16,1))';
                }
                //水质
                if(parseInt(status.outTDS)<=70){
                    this.outTDS='优';
                }else{
                    this.outTDS='中';
                }
                //滤芯寿命
                this.filterLife=status.filterLife1;
                //出水温度
                this.temperatureIndex1=status.hotWaterTemp1;
                this.temperatureIndex2=status.hotWaterTemp2;
                this.temperatureIndex3=status.hotWaterTemp3;
                //定量出水
                if(parseInt(status.outWater)==0){
                    this.outWaterIndex='持续 '
                }else{
                    this.outWaterIndex=((parseInt(status.outWater)-1)*60+120);
                }
                //冬夏模式
                if(status.seasonSwitch==0){
                    this.summerImg='./assets/img/summer_p.png'
                    this.winterImg='./assets/img/winter_n.png'
                }else{
                    this.summerImg='./assets/img/summer_n.png'
                    this.winterImg='./assets/img/winter_p.png'
                }

            }
            if(status.hotWaterSensorOpen==1){
                this.errorTitle="加热温度传感器故障";
                this.errorContent="加热温度传感器故障";
                this.errorShow=true;
            }
            if(status.inSensorError==1){
                this.errorTitle="进水温度传感器故障";
                this.errorContent="进水温度传感器故障";
                this.errorShow=true;
            }
            if(status.overHot==1){
                this.errorTitle="干烧保护故障";
                this.errorContent="干烧保护故障";
                this.errorShow=true;
            }
            if(status.overTime==1){
                this.errorTitle="制水保护故障";
                this.errorContent="制水保护故障";
                this.errorShow=true;
            }
            if(status.outSensorError==1){
                this.errorTitle="出水传感器故障";
                this.errorContent="出水传感器故障";
                this.errorShow=true;
            }
            if(status.communication==1){
                this.errorTitle="通讯故障";
                this.errorContent="通讯故障";
                this.errorShow=true;
            }
            //滤芯到期
            if(parseInt(status.filterLife1)<=5){
                if(parseInt(status.filterLife1)==0){
                    this.dialogTitle='购买滤芯';
                    this.dialogContent='滤芯已到期 请及时购买'
                    this.dialogFlag=1;
                    this.confirmText='购买'
                    this.dialogShow=true;
                }else{
                    this.dialogTitle='购买滤芯';
                    this.dialogContent='滤芯即将到期 请及时购买'
                    this.dialogFlag=1;
                    this.confirmText='购买';
                    this.dialogShow=true;
                }
            }
            this.getTodayWater();
        },
        //ajax获取净水量 deviceId设备ID time 时间颗粒度
        getWaterCount(deviceId,time){
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
                        'queryType':time
                    }
                }
            },function(res){
                var arr=res.data.result.data;
                if(time=='day'){
                    self.dayConsumption=self.handleConsumption(arr);
                }
                self.waterToday=self.dayConsumption.reduce(function(a,b){return parseInt(a)+parseInt(b)});
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
        //获取设备ID
        getTodayWater(){
            var self=this;
            nativeService.getDeviceInfo().then((res)=>{
                self.getWaterCount(res.result.deviceId,'day');
            }).catch((err)=>{
                nativeService.hideLoading();
            })
        },
        chooseSummer(){
            if(this.status.seasonSwitch==1){
                    this.dialogTitle='冬夏模式';
                    this.dialogContent='确定要切换到夏季模式吗？'
                    this.dialogFlag=3;
                    this.confirmText='确认'
                    this.dialogShow=true;
                };
        },
        chooseWinter(){
            if(this.status.seasonSwitch==0){
                    this.dialogTitle='冬夏模式';
                    this.dialogContent='确定要切换到冬季模式吗？'
                    this.dialogFlag=4;
                    this.confirmText='确认'
                    this.dialogShow=true;
                };
        },
        pickTemperature() { 
            var self=this;
            var min=40;
            var max=99;
            var items=new Array();
            for(var i=0;i<max-min+1;i++){
                items[i]=min+i;
            }
            var pickItem = [
                    {
                        index: this.temperatureIndex1-40,
                        item: items,
                        label: ""
                    },
                    {
                        index: this.temperatureIndex2-40,
                        item: items,
                        label: ""
                    },
                    {
                        index: this.temperatureIndex3-40,
                        item: items,
                        label: ""
                    },
            ]
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
                    this.temperatureIndex1 =parseInt(dataArr[0])+40;
                    this.temperatureIndex2 =parseInt(dataArr[1])+40;
                    this.temperatureIndex3 =parseInt(dataArr[2])+40;
                    nativeService.showLoading();
                    this.sendWaterTemp(parseInt(dataArr[0])+40,parseInt(dataArr[1])+40,parseInt(dataArr[2])+40);
                }
            });
        },
        //定量：0-持续 1-120ml 、2-180ml 、3-240ml以此类推，上线420ml
        pickOutWater() { 
            var self=this;
            var items=new Array();
            items[0]='持续';
            for(var i=1;i<7;i++){
                items[i]=120+(i-1)*60;
            }
            var temp=this.outWaterIndex;
            if(this.outWaterIndex=='持续'){
                temp=0;
            }
            var pickItem = [
                {
                    index: temp,
                    item: items,
                    label: ""
                }
            ]
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
                    if(parseInt(dataArr[0])==0){
                        self.outWaterIndex='持续'
                    }else{
                        self.outWaterIndex = (parseInt(dataArr[0])-1)*60+120;
                    }
                    nativeService.showLoading();
                    self.sendOutWater(parseInt(dataArr[0]));
                }
            });
        },
        powerSwitch(){
            if(this.status.powerSwitch==0){
                this.sendTurnOn();
            }else{
                this.dialogTitle='关机提示';
                this.dialogContent='是否确定关闭净饮机？';
                this.dialogFlag=2;
                this.confirmText='确认';
                this.dialogShow=true;
            }
        },
        confirmBtn(){
            this.dialogShow=false;
            switch(this.dialogFlag){
                case 1:
                nativeService.jumpNativePage({
                    "pageName": "electronicBusinessPage", 
                    // "url":"https://item.m.jd.com/product/42701568890.html?dl_abtest=o&ShareTm=J35Bso20ukbkNgemhVfBUyJN2xsus%2Fvsq0Ecw8Ca3BMYO6a9yZpzvSGJXViPjCeeiBk2EjkYHVawEQIZInMPvQOUqKtvo9ZIPopzFp2Oe7kKfU5BeMARfz3ZB5MQKug1JmAcaThzvYZrwnVsty18xQKL2DQCwtUKIVBHo5Kl1c0%3D&ad_od=share&utm_source=androidapp&utm_medium=appshare&utm_campaign=t_335139774&utm_term=Wxfriends"
                    "url":"https://m.midea.cn/promote/w/build/index/aWwTfmdaS0xQ9MTEzNw?__sus=d/dRBtBo6DDFRVhvzKER8WC5iyAsZVPh21X/dhWKO3NAKU1BEvW+/zLi7JlFANTZc4NgA4Zm/r+3sY2bxrOCVg==&__smkey=fae255eb0a876001a1338ed6386560e&__cmkey=&__user_flag=1&__cus=&__fromuid=34519512&from=singlemessage"
                });
                break;
                case 2:
                this.sendTurnOff();
                break;
                case 3:
                this.sendSeasonMode(0);
                break;
                case 4:
                this.sendSeasonMode(1);
                break;
            }
        },
        cancelBtn(){
            this.dialogShow=false;
        },
        errorConfirmBtn(){
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
        errorCancelBtn(){
            this.errorShow=false;
        },
        //童锁
        lock(){
            var obj=this.status;
            if(obj.lock==0){
                this.sendLock(1);
            }else{
                this.sendLock(0);
            }
        },
        //发送查询指令
        sendQuery(){
            var self=this;
            nativeService.startCmdProcess("query",cmd.queryStatus(),function(res){
                self.status=cmd.analyse(res);
                self.initStatus(self.status);
                nativeService.hideLoading();
            },function(res){
                nativeService.hideLoading();
                nativeService.toast("网络较差 请稍后再试")
            })
        },
        //开机
        sendTurnOn(){
            var self=this;
            nativeService.showLoading();
            nativeService.startCmdProcess("control",cmd.turnOn(),function(res){
                self.status=cmd.analyse(res);
                self.initStatus(self.status);
                nativeService.hideLoading();
            },function(res){
                nativeService.hideLoading();
                nativeService.toast("网络较差 请稍后再试")
                self.sendQuery();
            })
        },
        //关机
        sendTurnOff(){
            var self=this;
            nativeService.showLoading();
            nativeService.startCmdProcess("control",cmd.turnOff(),function(res){
                self.status=cmd.analyse(res);
                self.initStatus(self.status);
                nativeService.hideLoading();
            },function(res){
                nativeService.hideLoading();
                nativeService.toast("网络较差 请稍后再试")
                self.sendQuery();
            })
        },
        //童锁指令
        sendLock(index){
            var self=this;
            nativeService.showLoading();
            nativeService.startCmdProcess("control",cmd.lockDevice(index),function(res){
                self.status=cmd.analyse(res);
                self.initStatus(self.status);
                nativeService.hideLoading();
            },function(res){
                nativeService.hideLoading();
                nativeService.toast("网络较差 请稍后再试")
                self.sendQuery();
            })
        },
        //冬夏模式指令
        sendSeasonMode(index){
            var self=this;
            nativeService.showLoading();
            nativeService.startCmdProcess("control",cmd.seasonMode(index),function(res){
                self.status=cmd.analyse(res);
                self.initStatus(self.status);
                nativeService.hideLoading();
            },function(res){
                nativeService.hideLoading();
                nativeService.toast("网络较差 请稍后再试")
                self.sendQuery();
            })
        },
        //水温控制指令
        sendWaterTemp(index1,index2,index3){
            var self=this;
            nativeService.showLoading();
            nativeService.startCmdProcess("control",cmd.setWaterTemp(index1,index2,index3),function(res){
                self.status=cmd.analyse(res);
                self.initStatus(self.status);
                nativeService.hideLoading();
            },function(res){
                nativeService.hideLoading();
                nativeService.toast("网络较差 请稍后再试")
                self.sendQuery();
            })
        },
        //定量出水指令
        sendOutWater(index){
            var self=this;
            nativeService.showLoading();
            nativeService.startCmdProcess("control",cmd.setOutWater(index),function(res){
                self.status=cmd.analyse(res);
                self.initStatus(self.status);
                nativeService.hideLoading();
            },function(res){
                nativeService.hideLoading();
                nativeService.toast("网络较差 请稍后再试")
                self.sendQuery();
            })
        },
    },
    created() {
        var self=this;
        this.height=Math.floor(750/this.$getConfig().env.deviceWidth*this.$getConfig().env.deviceHeight);
        nativeService.showLoading();
        this.sendQuery();
        //监听设备主动上报
        globalEvent.addEventListener('receiveMessage',function(res){
            var msg=res.data.split(",");
            self.status=cmd.analyse(msg);
            self.initStatus(self.status);
        })
    },
    computed:{
        //适配屏幕高度
        objClass:function(){
            return {height:this.height+'px'}
        },
        upHeight:function(){
            return this.height*0.80+'px'
        },
        downClass:function(){
            return {height:this.height*0.20+'px'}
        }
    }
}
</script>

