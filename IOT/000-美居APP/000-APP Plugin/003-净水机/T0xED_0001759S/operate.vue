<template>
    <div class="knowSmartSetting" :style="objClass">
        <midea-header :title="'操作指引'" :titleText="'#000000'" :bgColor="'#ffffff'" :isImmersion="true" :leftImg="'./assets/img/ic_menu_back_black_n@2x.png'" :showRightImg="false" @leftImgClick="goBack"></midea-header>
        <div class="knowSmartSettingWrapper" :style="wrapper">
            <web src="http://121.40.99.173:8778/midea-handbook/ED/00071104/index.html" style="width:750px;" :style="wrapper"></web>
        </div>
    </div>
</template>
<script>
import nativeService from '@/common/services/nativeService'
import mideaHeader from './components/header.vue'
import cmd from './common/cmd.js'; 

export default {
    components:{mideaHeader},
    data(){
        return{
            height:1000,
            deviceSn:0,
        }
    },
    methods:{
        goBack(){
            nativeService.goBack();
        }
    },
    created() {
       this.height=Math.floor(750/this.$getConfig().env.deviceWidth*this.$getConfig().env.deviceHeight);
       var self=this;
       nativeService.getItem("device_sn",function(sn){
            self.deviceSn=sn.data;
            cmd.dataReport('KH_0xED_0001759S','view','page_view','operate',self.deviceSn,{});//埋点
        })
    },
    computed:{
        objClass:function(){
            return {height:this.height+'px'}
        },
        wrapper:function(){
            return {height:this.height*0.886+'px'}
        }
    }
}
</script>
<style>
.knowSmartSetting{
    background-color: rgb(242,242,242)
}
.knowSmartSettingWrapper{
    width: 750px;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: #fff;
}
</style>
