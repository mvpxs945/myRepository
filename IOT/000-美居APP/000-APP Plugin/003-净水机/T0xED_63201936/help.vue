<template>
    <div class="help" :style="objClass">
        <midea-header :title="'使用帮助'" :titleText="'#000000'" :bgColor="'#ffffff'" :isImmersion="true" :showRightImg="false" @leftImgClick="goBack"></midea-header>
        <div style="width:750px;height:20px;background-color:rgb(242,242,242)"></div>
        <scroller>
            <div class="wrapper">
                <midea-cell v-for="(item,i) in list" :key="i"
                        :title="item.name"
                        :hasArrow="true"
                        @mideaCellClick="goHelp(i)"
                ></midea-cell>
            </div>
        </scroller>
        <div style="width:750px;height:220px;background-color:white;align-self:flex-end;"></div>
    </div>
</template>
<script>
import nativeService from '@/common/services/nativeService';
import mideaHeader from './components/mheader1.vue';
import mideaCell from './components/cell.vue';

export default {
    components:{
        mideaHeader,
        mideaCell    
    },
    data(){
        return{
            height:1000,
            list:[
                {'name':'布谷厨下净水机是采用哪种净水技术？'},
                {'name':'MIX一体复合滤芯区别于传统的多根滤芯有哪些好处？'},
                {'name':'为什么有浓缩水？浓缩水有什么用途？'},
                {'name':'布谷厨下式净水器废水比是多少？'},
                {'name':'首次使用，纯水为什么会有少量气泡和黑水？'},
                {'name':'出水为什么呈乳白色？'},
                {'name':'制水时为什么会有声音？'},
                {'name':'长期饮用纯水会不会缺少矿物质？'},
                {'name':'什么是TDS，TDS反映了什么？布谷厨下式净水器如何查看水质情况？'},
                {'name':'为什么今天安装，APP显示有昨天记录？'},
                {'name':'APP上的净水总量省钱描述是怎么计算的？'},
                {'name':'APP中始终显示设备离线，或无法连接WiFi，如何解决？'},
                {'name':'水龙头红灯亮、APP报警水质异常如何处理？'},
                {'name':'APP中报警制水时间过长,智能水龙头显示E6如何处理？'},
                {'name':'APP中报警滤芯异常，智能水龙头显示E7/E8是什么问题，如何处理？'},
                {'name':'APP中报警水龙头通讯故障，智能水龙头显示E9如何解决？'},
                {'name':'APP中报警TDS通讯故障，智能水龙头显示“---”如何解决？'},
                {'name':'净水器出水量下降异常如何解决？'},
                {'name':'打开水龙头不出水是什么问题？'},
                {'name':'布谷厨下式净水器冬季如何进行防冻保养？'},
                {'name':'滤芯需要多久更换一次？'},
                {'name':'滤芯有哪些状态？'},
                {'name':'布谷厨下式净水器尺寸多少，有多重？'},
                {'name':'布谷厨下式净水器标配包含什么？'},
            ]
        }
    },
    methods:{
        goBack(){
            nativeService.goBack();
        },
        goHelp(i){
            nativeService.setItem("helpKey",i);
            nativeService.goTo('helpItem.js');
        }
    },
    created() {
        this.height=parseInt(Math.floor(750/this.$getConfig().env.deviceWidth*this.$getConfig().env.deviceHeight))+220;
        nativeService.showLoading();
    },
    mounted(){
        nativeService.hideLoading();
    },
    computed:{
        objClass:function(){
            return {height:this.height+'px'}
        },
    }
}
</script>
<style>
.help{
    background-color: rgb(242,242,242)
}
.wrapper{
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
</style>
