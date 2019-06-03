<template>
    <div class="moreFunction" :style="objClass">
        <midea-header :title="'更多功能'" :titleText="'#000000'" :bgColor="'#ffffff'" :isImmersion="true" :leftImg="'./assets/img/ic_menu_back_black_n2x.png'" :showRightImg="false" @leftImgClick="goBack"></midea-header>
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
        <!-- <midea-cell title="更换滤芯"
                    :hasMargin="true"
                    :hasArrow="true"
                    @mideaCellClick="goBuy"
        ></midea-cell> -->
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
                {"name":"PP滤芯","text":0},
                {"name":"前置C滤芯","text":0},
                {"name":"RO滤芯","text":0},
                {"name":"后置C滤芯","text":0},
            ],
        }
    },
    methods:{
        goBack(){
            nativeService.goBack()
        },
        goWaterCount(){
            nativeService.goTo('waterCount.js')
        },
        goFilterLife(index){
            nativeService.setItem("key",index);
            nativeService.goTo('filterLife.js')
        },
        goBuy(){
            nativeService.jumpNativePage({
                "pageName": "electronicBusinessPage", 
                "url":"https://m.midea.cn/promote/w/build/index/aWwTfmdaS0xQ9MTEzNw?__sus=d/dRBtBo6DDFRVhvzKER8WC5iyAsZVPh21X/dhWKO3NAKU1BEvW+/zLi7JlFANTZc4NgA4Zm/r+3sY2bxrOCVg==&__smkey=fae255eb0a876001a1338ed6386560e&__cmkey=&__user_flag=1&__cus=&__fromuid=34519512&from=singlemessage"
            })
        },
        goOperate(){
            nativeService.goTo('operate.js')
        }
    },
    created() {
       this.height=Math.floor(750/this.$getConfig().env.deviceWidth*this.$getConfig().env.deviceHeight);
       var self=this;
       nativeService.showLoading();
       nativeService.startCmdProcess("query",cmd.createQueryMessage(),function(res){
            if(typeof res=='string'){
                var msg=JSON.parse(res);
            }else{
                var msg=res;
            }
            self.list[0].text=msg[26];
            self.list[1].text=msg[27];
            self.list[2].text=msg[28];
            self.list[3].text=msg[29];
            nativeService.hideLoading();
        },function(res){
            nativeService.hideLoading();
            nativeService.toast("网络较差，请稍后重试");
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


