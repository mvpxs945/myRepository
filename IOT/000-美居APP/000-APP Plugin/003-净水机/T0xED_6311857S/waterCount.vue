<template>
    <div class="waterCount" :style="objClass">
        <midea-header :title="'净水量统计'" bgColor="rgba(255,255,255,0)" :titleText="'#ffffff'" :isImmersion="true" leftImg="./assets/img/back_w.png" :showRightImg1="false" :showRightImg2="false" @leftImgClick="goBack"></midea-header>
        <div class="waterCount-content">
            <div class="waterCount-content-up" style="width:680px">
                <midea-tab :tabArray="tabData" @tabClicked="tabClicked"></midea-tab>
            </div>
            <div class="waterCount-content-down">
                <div class="waterCount-down-header">
                    <div class="waterCount-down-header-left">
                        <text class="waterCount-down-left-text">单位：升</text>
                    </div>
                    <div class="waterCount-down-header-right">
                        <text class="waterCount-down-right-text">本</text><text class="waterCount-down-right-text">{{countUnit}}</text><text class="waterCount-down-right-text">净水总量</text><text class="count-font-size">{{xWaterCount}}</text><text class="waterCount-down-right-text">升</text>
                    </div>
                </div>
                <div class="waterCount-down-content">
                    <midea-barchart-view class="barchart" :data="chartJson"></midea-barchart-view> 
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import nativeService from '@/common/services/nativeService';
import mideaHeader from './components/mheader.vue';
import mideaTab from './components/tab.vue';
var stream=weex.requireModule('stream');

export default {
    components:{mideaHeader,mideaTab},
    data(){
        return{
            tabData:[
                {"name":"日","selected":true},
                {"name":"周","selected":false},
                {"name":"月","selected":false},
                {"name":"年","selected":false},
            ],
            countUnit:"日",
            chartJson:{},
            height:1000,
            deviceId:'',
            dayConsumption:[],
            weekConsumption:[],
            monthConsumption:[],
            yearConsumption:[],
            xWaterCount:0,//每日、周、月、年净水总量
        }
    },
    methods:{
        goBack(){
            nativeService.goBack()
        },
        tabClicked(index){
            var chartData=JSON.parse(JSON.stringify(this.chartJson))
            switch(index){
                case 0:
                chartData.x.value=[1,2.3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24];
                chartData.x.label=["0","","","","4","","","","","9","","","","","14","","","","","19","","","","23"];
                chartData.y[0].value=this.dayConsumption;
                this.countUnit='日';
                this.xWaterCount=this.dayConsumption.reduce(function(a,b){return parseInt(a)+parseInt(b)});
                break;
                case 1:
                chartData.x.value=[1,2.3,4,5,6,7];
                chartData.x.label=["周一","周二","周三","周四","周五","周六","周日"];
                chartData.y[0].value=this.weekConsumption;
                this.countUnit='周';
                this.xWaterCount=this.weekConsumption.reduce(function(a,b){return parseInt(a)+parseInt(b)});
                break;
                case 2:
                chartData.x.value=this.getDays()[1];
                chartData.x.label=this.getDays()[0];
                chartData.y[0].value=this.monthConsumption;
                this.countUnit='月';
                this.xWaterCount=this.monthConsumption.reduce(function(a,b){return parseInt(a)+parseInt(b)});
                break;
                case 3:
                chartData.x.value=[1,2.3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30];
                chartData.x.label=["1月","2月","3月","4月","5月","6月","7月","8月","9月","10月","11月","12月"];
                chartData.y[0].value=this.yearConsumption;
                this.countUnit='年';
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
                }else if(time=='week'){
                    self.weekConsumption=self.handleConsumption(arr);
                }else if(time=='month'){
                    self.monthConsumption=self.handleConsumption(arr);
                }else if(time=='year'){
                    self.yearConsumption=self.handleConsumption(arr);
                    nativeService.hideLoading();
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
                            "color": "#ffffff", 
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
        //获取设备ID
        getWater(){
            var self=this;
            nativeService.getDeviceInfo().then((res)=>{
                self.getWaterCount(res.result.deviceId,'day');
                self.getWaterCount(res.result.deviceId,'week');
                self.getWaterCount(res.result.deviceId,'month');
                self.getWaterCount(res.result.deviceId,'year');
            }).catch((err)=>{
                nativeService.hideLoading();
            })
        },
    },
    created() {
        this.height=Math.floor(750/this.$getConfig().env.deviceWidth*this.$getConfig().env.deviceHeight);
        //初始化本周设备净水量
        var self=this;
        nativeService.showLoading();
        self.getWater();
    },
    computed:{
        objClass:function(){
            return {height:this.height+'px'}
        }
    }
}
</script>
<style>
.waterCount{
    background-image: linear-gradient(to bottom, rgb(93,117,246),rgb(78,105,247));
}
.waterCount-content{
    width: 750px;
    height: 688px;
    margin-top: 52px;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
}
.waterCount-content-down{
    margin-top: 96px;
    width: 740px;
    height: 400px;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
}
.waterCount-down-header{
    width: 678px;
    height: 40px;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
}
.waterCount-down-header-right{
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
}
.waterCount-down-left-text,.waterCount-down-right-text{
    font-size: 28px;
    font-family: PingFangSC-Regular;
    color: white;
}
.count-font-size{
    font-size:52px;
    font-family: PingFangSC-Regular;
    color:white;
}
.barchart{
    width: 740px;
    height: 320px;
}
</style>

