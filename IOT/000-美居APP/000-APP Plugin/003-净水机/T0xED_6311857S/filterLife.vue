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
                <div class="filterLife-down-buy" @click="goBuy" >
                    <text class="filterLife-buy-text">去购买</text>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import nativeService from '@/common/services/nativeService';
import mideaProgress from './components/progress.vue';
import mideaHeader from './components/mheader.vue';
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
            nativeService.jumpNativePage({
                "pageName": "electronicBusinessPage", 
                "url":"https://m.midea.cn/promote/w/build/index/aWwTfmdaS0xQ9MTEzNw?__sus=d/dRBtBo6DDFRVhvzKER8WC5iyAsZVPh21X/dhWKO3NAKU1BEvW+/zLi7JlFANTZc4NgA4Zm/r+3sY2bxrOCVg==&__smkey=fae255eb0a876001a1338ed6386560e&__cmkey=&__user_flag=1&__cus=&__fromuid=34519512&from=singlemessage"
                // "url":"https://item.m.jd.com/product/42701568890.html?dl_abtest=o&ShareTm=J35Bso20ukbkNgemhVfBUyJN2xsus%2Fvsq0Ecw8Ca3BMYO6a9yZpzvSGJXViPjCeeiBk2EjkYHVawEQIZInMPvQOUqKtvo9ZIPopzFp2Oe7kKfU5BeMARfz3ZB5MQKug1JmAcaThzvYZrwnVsty18xQKL2DQCwtUKIVBHo5Kl1c0%3D&ad_od=share&utm_source=androidapp&utm_medium=appshare&utm_campaign=t_335139774&utm_term=Wxfriends"
            })
        },
        sendQuery(){
            var self=this;
            nativeService.startCmdProcess("query",cmd.queryStatus(),function(res){
                if(typeof res=='string'){
                    var msg=JSON.parse(res);
                }else{
                    var msg=res;
                }
                self.life=msg[26];
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
        nativeService.showLoading();
        nativeService.getItem("key",function(i){
            switch(i.data){
                case "0":
                self.sendQuery();
                self.title="纳滤膜滤芯";
                self.name="纳滤膜滤芯";
                self.info="滤除重金属，保留有益矿物质，五重深度净化系统，在去除有害物质之余，保留对人体有益的钾钙钠镁离子，优化饮用水质。";
                break;
            }
        })
    },
    computed:{
        objClass:function(){
            return{height:this.height+'px'}
        },
        upClass:function(){
            return{height:this.height*0.4175+'px'}
        },
        downClass:function(){
            return{height:this.height*0.60+'px'}
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
    margin-top: 48px;
}
.filterLife-info-text{
    font-size: 28px;
    font-family: PingFangSC-Regular;
    display: block;
    width: 686px;
    line-height: 42px;
}
.filterLife-down-buy{
    width: 686px;
    height: 82px;
    border-style: solid;
    border-color: black;
    border-width: 2px;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    border-radius: 6px;
}
.filterLife-buy-text{
    font-size: 32px;
    font-family: PingFangSC-Regular;
    color:black;
}
</style>


