<template>
    <div class="knowSmartSetting" :style="objClass">
        <midea-header :title="'购买滤芯'" :titleText="'#000000'" :bgColor="'#ffffff'" :isImmersion="true" :showRightImg="false" @leftImgClick="goBack"></midea-header>
        <div class="knowSmartSettingWrapper" :style="wrapper">
            <web src="https://m.midea.cn/promote/w/build/index/aWwTfmdaS0xQ9MTEzNw?__sus=d/dRBtBo6DDFRVhvzKER8WC5iyAsZVPh21X/dhWKO3NAKU1BEvW+/zLi7JlFANTZc4NgA4Zm/r+3sY2bxrOCVg==&__smkey=fae255eb0a876001a1338ed6386560e&__cmkey=&__user_flag=1&__cus=&__fromuid=34519512&from=singlemessage" style="width:750px;" :style="wrapper"></web>
        </div>
    </div>
</template>
<script>
import nativeService from '@/common/services/nativeService'
import mideaHeader from './components/mheader1.vue'

export default {
    components:{mideaHeader},
    data(){
        return{
            height:1000,
        }
    },
    methods:{
        goBack(){
            nativeService.goBack();
        },
        //埋点
        getDeviceId(){
            var self=this;
            nativeService.getDeviceInfo().then((res)=>{
                // cmd.dataReport('KH_0xED_63201936','view','page_view','buyFilter',res.result.deviceSn,{});//埋点
            }).catch((err)=>{

            })
        },
    },
    created() {
       this.height=Math.floor(750/this.$getConfig().env.deviceWidth*this.$getConfig().env.deviceHeight);
    //    this.getDeviceId();
    },
    mounted(){
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
