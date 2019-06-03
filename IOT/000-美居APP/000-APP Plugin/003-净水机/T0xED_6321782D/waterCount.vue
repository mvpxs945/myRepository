<template>
    <div class="waterCount" :style="objClass">
        <midea-header :title="'净水量统计'" bgColor="rgba(255,255,255,0)" :titleText="'#ffffff'" :isImmersion="true" :showRightImg="false" @leftImgClick="goBack"></midea-header>
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
                        <text class="waterCount-down-right-text">本</text><text class="waterCount-down-right-text">{{countUnit}}</text><text class="waterCount-down-right-text">净水总量</text><text class="count-font-size">{{waterCount}}</text><text class="waterCount-down-right-text">升</text>
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
import mideaHeader from './components/header.vue';
import mideaTab from './components/tab.vue';
import cmd from './common/cmd.js'; 
var stream=weex.requireModule('stream');

export default {
    components:{mideaHeader,mideaTab},
    data(){
        return{
            tabData:[
                {"name":"周","selected":true},
                {"name":"月","selected":false},
                {"name":"年","selected":false},
            ],
            countUnit:"日",
            chartJson:{},
            waterCount:0,
            height:1000,
            weekConsumption:[],
            monthConsumption:[],
            yearConsumption:[],
            weekX:{
                value:[],
                label:[]
            },
            monthX:{
                value:[],
                label:[]
            },
            yearX:{
                value:[],
                label:[]
            },
            deviceId:'',
            deviceSn:0,
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
                cmd.dataReport('KH_0xED_6321782D','event','go_week','waterCount',this.deviceSn,{});//埋点
                chartData.x.value=this.weekX.value;
                chartData.x.label=this.weekX.label;
                chartData.y[0].value=this.weekConsumption;
                this.countUnit="周";
                this.waterCount=this.weekConsumption.reduce(function(a,b){return parseInt(a)+parseInt(b)});
                break;
                case 1:
                cmd.dataReport('KH_0xED_6321782D','event','go_month','waterCount',this.deviceSn,{});//埋点
                chartData.x.value=this.monthX.value;
                chartData.x.label=this.monthX.label;
                chartData.y[0].value=this.monthConsumption;
                this.countUnit="月";
                this.waterCount=this.monthConsumption.reduce(function(a,b){return parseInt(a)+parseInt(b)});
                break;
                case 2:
                cmd.dataReport('KH_0xED_6321782D','event','go_year','waterCount',this.deviceSn,{});//埋点
                chartData.x.value=this.yearX.value;
                chartData.x.label=this.yearX.label;
                chartData.y[0].value=this.yearConsumption;
                this.countUnit="年";
                this.waterCount=this.yearConsumption.reduce(function(a,b){return parseInt(a)+parseInt(b)});
                break;
            }
            this.chartJson=JSON.parse(JSON.stringify(chartData))
        },
        
    },
    created() {
        this.height=Math.floor(750/this.$getConfig().env.deviceWidth*this.$getConfig().env.deviceHeight);
        //初始化本周设备净水量
        var self=this;
        nativeService.showLoading();
        nativeService.getItem("device_sn",function(sn){
            self.deviceSn=sn.data;
            cmd.dataReport('KH_0xED_6321782D','view','page_view','waterCount',self.deviceSn,{});//埋点
        })
        nativeService.getItem("device_id",function(id){
            self.deviceId=id.data;
            self.weekX.value=[1,2,3,4,5,6,7];
            self.yearX.value=[1,2,3,4,5,6,7,8,9,10,11,12];
            self.weekX.label=["周一","周二","周三","周四","周五","周六","周日"];
            self.yearX.label=["1月","2月","3月","4月","5月","6月","7月","8月","9月","10月","11月","12月"];
            if(getDays()==30){
                self.monthX.value=[1,2.3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30];
                self.monthX.label=["1","","","","5","","","","","10","","","","","15","","","","","20","","","","","25","","","","","30"];
            }else if(getDays()==31){
                self.monthX.value=[1,2.3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31];
                self.monthX.label=["1","","","","5","","","","","10","","","","","15","","","","","20","","","","","25","","","","","","31"];
            }else if(getDays()==29){
                self.monthX.value=[1,2.3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29];
                self.monthX.label=["1","","","","5","","","","","10","","","","","15","","","","","20","","","","","25","","","","29"];
            }else if(getDays()==28){
                self.monthX.value=[1,2.3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28];
                self.monthX.label=["1","","","","5","","","","","10","","","","","15","","","","","20","","","","","25","","","28"];
            }
            stream.fetch({
                method: 'POST',
                url: "http://api.midea-hotwater.com:13145/ed/v1/api",
                type: 'json',
                headers: { 'Content-Type': 'application/json' },
                body:{
                    'msg':"PureWaterConsumption",
                    'params':{
                        'applianceId':id.data,
                        'queryType':'week'
                    }
                }
            },function(res){
                if(res.ok){
                    var consumption=res.data.result.data;
                    if(consumption.length!=0){
                        self.weekConsumption=getConsumption(consumption);
                        self.waterCount=self.weekConsumption.reduce(function(a,b){return parseInt(a)+parseInt(b)});
                        self.countUnit="周";
                        self.chartJson={
                            "x": {
                                "value": [1,2,3,4,5,6,7],
                                "label": ["周一","周二","周三","周四","周五","周六","周日"]
                            },
                            "y": [
                                {
                                    "value": self.weekConsumption,
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
                    }
                fetch('month');
                fetch('year');
                }
                nativeService.hideLoading();
            },function(error){
                nativeService.hideLoading();
                // nativeService.alert(error);
            })
        })
        //ajax
        function fetch(time) {
            var that=this;
            stream.fetch({
                method: 'POST',
                url: "http://api.midea-hotwater.com:13145/ed/v1/api",
                type: 'json',
                headers: { 'Content-Type': 'application/json' },
                body:{
                    'msg':"PureWaterConsumption",
                    'params':{
                        'applianceId':self.deviceId,
                        'queryType':time
                    }
                }
            },function(res){
                if(res.ok){
                    var consumption=res.data.result.data;
                    if(consumption.length!=0){
                        if(time=='week'){
                            self.weekConsumption=getConsumption(consumption);
                        }else if(time=='month'){
                            self.monthConsumption=getConsumption(consumption);
                        }else if(time=='year'){
                            self.yearConsumption=getConsumption(consumption);
                        }
                    }
                }
            },function(error){
                // nativeService.alert(error);
            })
        }
        function getConsumption(arr){
            var result=[];
            for(var i=0;i<arr.length;i++){
                result[i]=parseInt(arr[i].yWater,10);
            }
            return result;
        }
        //判断本月多少天
        function getDays(arr){
            var myDate=new Date();
            var thisM=myDate.getMonth()+1;
            if(thisM==1||thisM==3||thisM==5||thisM==7||thisM==8||thisM==10||thisM==12){
                return 31;
            }else if(thisM==2){
                if((myDate.getFullYear()%4==0&&myDate.getFullYear()%100!=0)||myDate.getFullYear()%400==0){
                    return 29;
                }else{
                    return 28;
                }
            }else{
                return 30;
            }
        }
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

