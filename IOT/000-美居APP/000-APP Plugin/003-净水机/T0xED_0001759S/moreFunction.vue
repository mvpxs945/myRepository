<template>
    <div class="moreFunction" :style="objClass">
        <midea-header :title="'更多功能'" :titleText="'#000000'" :bgColor="'#ffffff'" :isImmersion="true" :leftImg="'./assets/img/ic_menu_back_black_n@2x.png'" :showRightImg="false" @leftImgClick="goBack"></midea-header>
        <midea-cell title="净水量统计"
                    :hasMargin="true"
                    :hasArrow="true"
                    :hasBottomBorder="false"
                    @mideaCellClick="goWaterCount"
                    style="margin-top:24px"
        ></midea-cell>
        <midea-cell v-for="(item,i) in list" :key="i"
                    :title="item.name"
                    :rightText="'约剩余'+item.text+'%'"
                    :hasArrow="true"
                    :hasBottomBorder="i==3?false:true"
                    @mideaCellClick="goFilterLife(i)"
        ></midea-cell>
        <midea-cell title="操作指引"
                    :hasMargin="true"
                    :hasArrow="true"
                    :hasBottomBorder="false"
                    @mideaCellClick="goOperate"
                    style="margin-top:24px"
        ></midea-cell>
        <midea-cell title="更换滤芯"
                    :hasMargin="true"
                    :hasArrow="true"
                    :hasBottomBorder="false"
                    @mideaCellClick="goChangeFilter"
        ></midea-cell>
    </div>
</template>
<script>
import nativeService from '@/common/services/nativeService';
import cmd from './common/cmd.js'; 
import mideaCell from './components/cell.vue';
import mideaHeader from './components/header.vue'

export default {
    components:{
        mideaCell,
        mideaHeader
    },
    data(){
        return{
            height:1000,
            list:[
                {"name":"PPC滤芯","text":0},
                {"name":"前置PPC滤芯","text":0},
                {"name":"RO滤芯","text":0},
                {"name":"后置PPC滤芯","text":0},
            ],
            deviceSn:0,
        }
    },
    methods:{
        goBack(){
            cmd.dataReport('KH_0xED_0001759S','event','back_weex','moreFunction',this.deviceSn,{});//埋点
            nativeService.goBack()
        },
        goWaterCount(){
            cmd.dataReport('KH_0xED_0001759S','event','go_waterCount','moreFunction',this.deviceSn,{});//埋点
            nativeService.goTo('waterCount.js')
        },
        goFilterLife(index){
            cmd.dataReport('KH_0xED_0001759S','event','go_filterLife','moreFunction',this.deviceSn,{});//埋点
            nativeService.setItem("key",index);
            nativeService.goTo('filterLife.js')
        },
        goChangeFilter(){
            cmd.dataReport('KH_0xED_0001759S','event','go_buyFilter','moreFunction',this.deviceSn,{});//埋点
            nativeService.jumpNativePage({
                "pageName": "electronicBusinessPage", 
                "url":"https://m.midea.cn/promote/w/build/index/aWwTfmdaS0xQ9MTEzNw?__sus=d/dRBtBo6DDFRVhvzKER8WC5iyAsZVPh21X/dhWKO3NAKU1BEvW+/zLi7JlFANTZc4NgA4Zm/r+3sY2bxrOCVg==&__smkey=fae255eb0a876001a1338ed6386560e&__cmkey=&__user_flag=1&__cus=&__fromuid=34519512&from=singlemessage"
            })
        },
        goOperate(){
            cmd.dataReport('KH_0xED_0001759S','event','go_operate','moreFunction',this.deviceSn,{});//埋点
            nativeService.goTo('operate.js')
        }
    },
    created() {
       this.height=Math.floor(750/this.$getConfig().env.deviceWidth*this.$getConfig().env.deviceHeight);
       var self=this;
       var listArray=this.list;//滤芯列表
       nativeService.getItem("device_sn",function(sn){
            self.deviceSn=sn.data;
        })
       nativeService.getItem("filterLife",function(arr){
            var realLife=JSON.parse(arr.data)
            listArray[0].text=realLife[0].text;
            listArray[1].text=realLife[1].text;
            listArray[2].text=realLife[2].text;
            listArray[3].text=realLife[3].text;
        })
    },
    computed:{
        objClass:function(){
            return {height:this.height+'px'}
        },
    }
}
</script>
<style>
.moreFunction{
    background-color:rgb(242, 242, 242)
}
</style>


