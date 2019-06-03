<template>
    <div class="helpItem" :style="objClass">
        <midea-header :title="'常见问题'" :titleText="'#000000'" :bgColor="'#ffffff'" :showLeftImg="true" :leftImg="'./assets/img/ic_menu_back_black_n2x.png'" :isImmersion="true" :showRightImg="false" @leftImgClick="goBack"></midea-header>
        <div style="width:750px;height:20px;background-color:#f9f9f9"></div>
        <div class="wrapper" :style="wrapper">
            <text class="title">{{title}}</text>
            <text class="content">{{content}}</text>
        </div>
        <div style="width:750px;height:220px;background-color:white;align-self:flex-end;"></div>
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
            title:'TDS值是什么意思?',
            content:' 总溶解固体（缩写TDS），表明1升水中溶有多少毫克溶解性固体。TDS值越高，表示水中含有的溶解物越多。TDS值越低，表示出水越接近纯净水。\n 温馨提示：tds值受自来水水质、温度和待机时间影响会出现上下波动，主要为无害的一价离子，请放心使用。',
        }
    },
    methods:{
        goBack(){
            nativeService.goBack();
        },
    },
    created() {
       this.height=parseInt(Math.floor(750/this.$getConfig().env.deviceWidth*this.$getConfig().env.deviceHeight))+220;
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
.helpItem{
}
.wrapper{
    flex:1;
    width: 750px;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    background-color: #fff;
}
.title{
    margin-top: 20px;
    width: 680x;
    font-size: 35px;
    font-family: PingFangSC-Regular;
    color: #333333;
}
.content{
    margin-top: 80px;
    width: 680px;
    font-size: 26px;
    color: #999999;
    font-family: PingFangSC-Regular;
}
</style>
