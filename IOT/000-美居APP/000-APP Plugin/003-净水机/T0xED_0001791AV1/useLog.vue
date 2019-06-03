<template>
    <div class="useLog" :style="objClass">
        <midea-header :title="'使用日志'" :titleText="'#000000'" :bgColor="'#ffffff'" :isImmersion="true" :showLeftImg="true" :showRightText="true" :rightText="'月度报表'" :showRightImg="false" @leftImgClick="goBack" @rightTextClick="goMonthReport"></midea-header>
        <midea-tab ref="mTab" :tabArray="tabData" @tabClicked="tabClicked"></midea-tab>
        <div class="barchart-wrapper">
            <div class="barchart-up">
                <image src="./assets/img/watercleaner_icon_wet@3x.png" style="width:56px;height:56px;"></image>
                <div class="up-desc">
                    <text class="desc-up">{{waterSum}}L</text>
                    <text class="desc-down">近{{unit}}生产净水</text>
                </div>
            </div>
            <div style="width:686px;height:320px;backgroundColor:#50CFFF;marginTop:76px;"></div>
        </div>
        <div class="bottom">

        </div>
    </div>
</template>
<style>
.useLog{
    
}
.barchart-wrapper{
    width: 686px;
    margin-left: 32px;
    margin-top: 52px;
}
.barchart-up{
    width: 500px;
    height: 60px;
    margin-left: 8px;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center; 
}
.up-desc{
    flex-direction: column;
    justify-content: space-around;
    align-items: flex-start; 
    margin-left: 10px;
}
.desc-up{
    font-family: PingFangSC-Medium;
    font-size: 32px;
    color: #000000;
    letter-spacing: -0.57px;
    /* line-height: 36px; */
    padding-bottom: 4px;
}
.desc-down{
    padding-top: 4px;
    font-family: PingFangSC-Regular;
    font-size: 24px;
    color: #8A8A8F;
    letter-spacing: 0;
    /* line-height: 28px; */
}
.bottom{
    width: 686px;
    height: 500px;
    margin-left: 32px;
    position: absolute;
    bottom: 32px;
    background-color: #f9f9f9;
}
</style>
<script>
import nativeService from '@/common/services/nativeService';
import mideaHeader from './components/header.vue';
import mideaTab from './components/mTab.vue';
import cmd from './js/cmd.js';
import config from './js/config.js';

const animation = weex.requireModule('animation');
const stream=weex.requireModule('stream');

export default {
    components:{
        mideaHeader,
        mideaTab
        },
    data(){
        return{
            height:1000,
            deviceSn:0,
            tabData:[
                {"name":"7天","selected":true},
                {"name":"1个月","selected":false},
                {"name":"1年","selected":false}
            ],
            waterSum:0,
            unit:0,
        }
    },
    methods:{
        goBack(){
            nativeService.goBack();
        },
        goMonthReport(){
            nativeService.goTo("monthReport.js");
        }
    },
    created() {
       this.height=Math.floor(750/this.$getConfig().env.deviceWidth*this.$getConfig().env.deviceHeight);
      
    },
    computed:{
        
    }
}
</script>
