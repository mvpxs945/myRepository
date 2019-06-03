<template>
    <div class="knowSmartSetting" :style="objClass">
        <midea-header :title="'操作指引'" :titleText="'#000000'" :bgColor="'#ffffff'" :isImmersion="true" :leftImg="'./assets/img/ic_menu_back_black_n2x.png'" :showRightImg="false" @leftImgClick="goBack"></midea-header>
        <div class="knowSmartSettingWrapper" :style="wrapper">
            <web :src="url" style="width:750px;" :style="wrapper"></web>
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
            url:"",
        }
    },
    methods:{
        goBack(){
            nativeService.goBack();
        }
    },
    created() {
        var self=this;
       this.height=Math.floor(750/this.$getConfig().env.deviceWidth*this.$getConfig().env.deviceHeight);
       //根据A0子型号展示不同的电子说明书
       nativeService.getItem("device_subType",function(res){
           if(parseInt(res.data,10)==261){
               self.url="http://www.midea-weixin.com/webmanual/MRC1693A/index.html";
           }else{
               self.url="http://121.40.99.173:8778/midea-handbook/ED/0001693A/index.html"
           }
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
