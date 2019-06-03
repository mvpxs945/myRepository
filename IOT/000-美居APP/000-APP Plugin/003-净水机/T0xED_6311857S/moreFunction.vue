<template>
    <div class="moreFunction" :style="objClass">
        <midea-header :title="'更多功能'" :titleText="'#000000'" :bgColor="'#ffffff'" :isImmersion="true" :leftImg="'./assets/img/back_b.png'" :showRightImg="false" @leftImgClick="goBack"></midea-header>
        <midea-cell v-for="(item,i) in list" :key="i"
                    :title="item.name"
                    :rightText="'约剩余'+item.text+'%'"
                    :hasArrow="true"
                    :hasBottomBorder="true"
                    @mideaCellClick="goFilterLife(i)"
                    style="margin-top:24px"
        ></midea-cell>
        <midea-cell title="净水量统计"
                    :hasArrow="true"
                    :hasBottomBorder="true"
                    @mideaCellClick="goWaterCount"
        ></midea-cell>
        <midea-cell title="电子说明书"
                    :hasArrow="true"
                    :hasBottomBorder="true"
                    @mideaCellClick="goGuide"
        ></midea-cell>
        <midea-cell title="故障排除"
                    :hasArrow="true"
                    :hasBottomBorder="false"
                    @mideaCellClick="goError"
        ></midea-cell>
    </div>
</template>
<script>
import nativeService from '@/common/services/nativeService';
import cmd from './common/cmd.js'; 
import mideaCell from './components/cell.vue';
import mideaHeader from './components/mheader.vue'

export default {
    components:{
        mideaCell,
        mideaHeader
    },
    data(){
        return{
            height:1000,
            list:[
                {"name":"纳滤膜滤芯","text":0},
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
        goGuide(){
            nativeService.goTo('guide.js')
        },
        goError(){
            nativeService.goTo('error.js')
        },
        //发送查询指令
        sendQuery(){
            var self=this;
            nativeService.startCmdProcess("query",cmd.queryStatus(),function(res){
                var status=cmd.analyse(res);
                self.list[0].text=status.filterLife1;
                nativeService.hideLoading();
            },function(res){
                nativeService.hideLoading();
                nativeService.toast("网络较差 请稍后再试")
            })
        },
    },
    created() {
        this.height=Math.floor(750/this.$getConfig().env.deviceWidth*this.$getConfig().env.deviceHeight);
        nativeService.showLoading();
        this.sendQuery();
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
    background-color:#f9f9f9;
}
</style>


