<template>
    <div class="productInfo" :style="objClass">
        <midea-header :title="'产品信息'" :titleText="'#000000'" :bgColor="'#ffffff'" :isImmersion="true" :showRightImg="false" @leftImgClick="goBack"></midea-header>
        <div style="width:750px;height:20px;background-color:#f9f9f9"></div>
        <div class="wrapper" :style="wrapper">
            <midea-cell v-for="(item,i) in infoList" :key="i"
                        :title="item.name"
                        :rightText="item.value"
                        :hasArrow="false"
            ></midea-cell>
        </div>
    </div>
</template>
<script>
import nativeService from '@/common/services/nativeService';
import cmd from './js/cmd.js';
import config from './js/config.js';

import mideaHeader from './components/header.vue';
import mideaCell from './components/cell2.vue';

const animation = weex.requireModule('animation');
const stream=weex.requireModule('stream');

export default {
    components:{
        mideaHeader,
        mideaCell
    },
    data(){
        return{
            height:1000,
            deviceSn:0,
            productInfo:config.getConfigValue().productInfo,
            infoList:[],
        }
    },
    methods:{
        goBack(){
            nativeService.goBack();
        },
        initInfo(){
            var productInfo=this.productInfo;
            this.infoList=[
                {name:'产品型号',value:productInfo.model},
                {name:'额定功率（W）',value:productInfo.ratedPower},
                {name:'额定电压（V）',value:productInfo.ratedVoltage},
                {name:'适配输出电流（A）',value:productInfo.lout},
                {name:'额定水压（MPa）',value:productInfo.ratedPressure},
                {name:'RO膜工作水压（MPa）',value:productInfo.roPressure},
                {name:'反渗透出水净水流量（L/min）',value:productInfo.roOutWater},
                {name:'反渗透出水额定总净水量（L）',value:productInfo.roTotalWater},
                {name:'适应水质',value:productInfo.waterQuality},
                {name:'适应环境温度（℃）',value:productInfo.temperature},

            ]
        }
    },
    created() {
        this.height=Math.floor(750/this.$getConfig().env.deviceWidth*this.$getConfig().env.deviceHeight);
        this.initInfo();
    },
    computed:{
        
    }
}
</script>
<style>
.productInfo{
    background-color: rgb(242,242,242)
}
.wrapper{
    width: 750px;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    background-color: #fff;
    flex:1;
}
</style>
