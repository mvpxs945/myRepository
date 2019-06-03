<template>
    <div class="knowSmartSetting" :style="objClass">
        <midea-header :title="'故障排除'" :titleText="'#000000'" :bgColor="'#ffffff'" :isImmersion="true" :leftImg="'./assets/img/back_b.png'" :showRightImg1="false" :showRightImg2="false" @leftImgClick="goBack"></midea-header>
        <div class="knowSmartSettingWrapper" :style="wrapper">
            <web src="http://121.40.99.173:8778/midea-handbook/ED/0001698C/index.html" style="width:750px;" :style="wrapper"></web>
        </div>
    </div>
</template>
<script>
import nativeService from '@/common/services/nativeService'
import mideaHeader from './components/mheader.vue'

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
