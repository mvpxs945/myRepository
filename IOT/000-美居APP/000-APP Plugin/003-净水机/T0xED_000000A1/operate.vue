<template>
    <div class="knowSmartSetting" :style="objClass">
        <midea-header :title="'操作指引'" :titleText="'#000000'" :bgColor="'#ffffff'" :isImmersion="true" :leftImg="'./assets/img/ic_menu_back_black_n@2x.png'" :showRightImg="false" @leftImgClick="goBack"></midea-header>
        <div class="knowSmartSettingWrapper" :style="wrapper">
            <web src="https://mp.weixin.qq.com/s?__biz=MzAwODYxMzA2Mw==&mid=502878474&idx=1&sn=c764f1917f1838e8fa3d64a29b77a12b#wechat_redirect" style="width:750px;" :style="wrapper"></web>
        </div>
    </div>
</template>
<script>
import nativeService from '@/common/services/nativeService'
import mideaHeader from './components/header.vue'

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
        }
    },
    created() {
       this.height=Math.floor(750/this.$getConfig().env.deviceWidth*this.$getConfig().env.deviceHeight);
    //    console.log(this.height)
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
