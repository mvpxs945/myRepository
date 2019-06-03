<template>
    <div class="filterLife" :style="objClass">
        <midea-header :title="title" bgColor="rgba(255,255,255,0)" :titleText="'#ffffff'" :isImmersion="true" :showRightImg="false" @leftImgClick="goBack"></midea-header>
        <div class="filterLife-up" :style="upClass">
            <div class="filterLife-up-wrapper">
                <div class="filterLife-up-secFloor">
                    <text class="filterLife-secFloor-text">约剩余{{life}}%</text>
                </div>
                <div class="filterLife-up-thiFloor">
                    <midea-progress :value="life" :barHeight='32' :barWidth='686' :barColor="'#ffffff'" :needGradient="false"></midea-progress>
                </div>
                <div class="filterLife-up-fouFloor">
                    <text class="filterLife-fouFloor-one">0%</text>
                    <text class="filterLife-fouFloor-one">50%</text>
                    <text class="filterLife-fouFloor-one">100%</text>
                </div>
            </div>
        </div>
        <div class="filterLife-down" :style="downClass">
            <div class="filterLife-down-wrapper">
                <div class="filterLife-down-name">
                    <image class="filterLife-down-icon" src="./assets/img/ic_exegesis2x.png" style="width:30px;height:30px;display:block;"></image>
                    <text class="filterLife-name-text">{{name}}</text>
                </div>
                <div class="filterLife-down-info">
                    <text class="filterLife-info-text">{{info}}</text>
                </div>
                <!-- <div class="filterLife-down-buy" >
                    <text class="filterLife-buy-text" @click="goBuy">去购买</text>
                </div> -->
            </div>
        </div>
    </div>
</template>
<script>
import nativeService from '@/common/services/nativeService';
import mideaProgress from './components/progress.vue';
import mideaHeader from './components/header.vue';
import cmd from './common/cmd.js'; 

export default {
    components:{
        mideaProgress,
        mideaHeader,
    },
    data(){
        return {
            height:1334,
            title:'',
            life:0,
            name:'',
            info:'',
        }
    },
    methods:{
        goBack(){
            nativeService.goBack();
        },
        goBuy(){
            nativeService.goTo("changeFilter.js")
        },
        getFilterLife(index){
            var self=this;
            nativeService.showLoading();
            nativeService.startCmdProcess("query",cmd.createQueryMessage(),function(res){
                    if(typeof res=='string'){
                        var msg=JSON.parse(res);
                    }else{
                        var msg=res;
                    }
                    self.life=msg[index];
                    nativeService.hideLoading();
                },function(res){
                    nativeService.hideLoading();
                    nativeService.toast("网络较差，请稍后重试");
                })
        }
    },
    created(){
        var self=this
        this.height=Math.floor(750/this.$getConfig().env.deviceWidth*this.$getConfig().env.deviceHeight);
        nativeService.getItem("key",function(i){
            switch(i.data){
                case "0":
                self.title="PP滤芯";
                self.getFilterLife(26);
                self.name="PP复合滤芯";
                self.info="PP复合滤芯主要拦截水中的泥沙、铁锈、悬浮物、余氯及异物等,使用周期6-12个月（因使用地域、水质、使用量及季节不同，实际使用周期有所不同）";
                break;
                case "1":
                self.title="前置C滤芯";
                self.getFilterLife(27);
                self.name="活性炭滤芯";
                self.info="C滤芯即活性炭滤芯，主要吸附异色，异味，余氯，部分有机物（三氯甲烷，四氧化碳），使用周期6-12个月（因使用地域、水质、使用量及季节不同，实际使用周期有所不同）";
                break;
                case "2":
                self.title="RO滤芯";
                self.getFilterLife(28);
                self.name="RO滤芯";
                self.info="RO滤芯即反渗透滤芯，主要拦截有机物（三氯甲烷，四氧化碳）、重金属（砷，铅，镉），使用周期24-26个月（因使用地域、水质、使用量及季节不同，实际使用周期有所不同）";
                break;
                case "3":
                self.title="后置C滤芯";
                self.getFilterLife(29);
                self.name="活性炭滤芯";
                self.info="C滤芯即活性炭滤芯，主要吸附异色，异味，余氯，部分有机物（三氯甲烷，四氧化碳），使用周期6-12个月（因使用地域、水质、使用量及季节不同，实际使用周期有所不同）";
                break;
            }
        })
    },
    computed:{
        objClass:function(){
            // console.log("总高度"+this.height+'px')
            return{height:this.height+'px'}
        },
        upClass:function(){
            // console.log("上屏高度"+this.height*0.5+'px')
            return{height:this.height*0.4175+'px'}
        },
        downClass:function(){
            return{height:this.height*0.55+'px'}
        }
    },
}
</script>
<style>
.filterLife{
    background-image: linear-gradient(to bottom, rgb(93,117,246),rgb(78,105,247));
}
.filterLife-up{
    width: 750px;
}
.filterLife-up-wrapper{
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    width: 750px;
    height: 240px;
    margin-top: 118px;
}
.filterLife-up-left{
    margin-left: 36px;
}
.filterLife-up-center{
    width: 480px;
    margin-left: 50px;
}
.filterLife-up-title{
    display: block;
    width: 480px;
    text-align: center;
    color:white;
}
.filterLife-secFloor-text{
    font-size: 36px;
    font-family: PingFangSC-Regular;
    color:white;
}
.filterLife-up-fouFloor{
    width: 686px;
    height: 34px;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
}
.filterLife-fouFloor-one{
    display: block;
    font-size: 24px;
    font-family: PingFangSC-Regular;
    color: white;
}
.filterLife-down{
    width:750px;
    background-color: white;
}
.filterLife-down-wrapper{
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    width: 750px;
    height: 550px;
    margin-top: 56px;
}
.filterLife-down-name{
    height: 50px;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
}
.filterLife-name-text{
    font-size: 32px;
    font-family: PingFangSC-Medium;
    text-align: center;
    display: block;
    margin-left: 16px;
}
.filterLife-down-info{
    width: 686px;
    height: 338px;
    margin-top: 96px;
}
.filterLife-info-text{
    font-size: 28px;
    font-family: PingFangSC-Regular;
    display: block;
    width: 686px;
}
.filterLife-down-buy{
    width: 686px;
    height: 82px;
    border-style: solid;
    border-color: black;
    border-width: 2px;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
}
.filterLife-buy-text{
    text-align: center;
    display: block;
    width: 686px;
}
</style>


