<template>
    <div class="moreFunction" :style="{'height':height}">
        <midea-header :title="'更多设置'" :titleText="'#000000'" :bgColor="'#ffffff'" :isImmersion="true" :showRightImg="false" @leftImgClick="goBack"></midea-header>
        <div style="width:750px;height:20px;background-color:rgb(242,242,242)"></div>
        <div style="flex:1;">
            <midea-cell title="产品指南"
                        :hasArrow="true"
                        @mideaCellClick="goGuide"
            ></midea-cell>
            <midea-cell title="使用帮助"
                        :hasArrow="true"
                        @mideaCellClick="goSet"
            ></midea-cell>
        </div>
        <div style="width:750px;height:220px;background-color:white;align-self:flex-end;"></div>
    </div>
</template>
<script>
import nativeService from '@/common/services/nativeService';
import cmd from './common/cmd.js'; 
import mideaCell from './components/cell.vue';
import mideaHeader from './components/mheader1.vue';
import mideaDialog from '@/component/dialog.vue';
import mideaSwitch from '@/midea-component/switch2.vue';

export default {
    components:{
        mideaCell,
        mideaHeader,
        mideaDialog,
        mideaSwitch
    },
    data(){
        return{
            height:0,
        }
    },
    methods:{
        goBack(){
            nativeService.goBack();
        },
        goGuide(){
            nativeService.goTo("guide.js");
        },
        goSet(){
            nativeService.goTo("help.js");
        },
    },
    created() {
       this.height=parseInt(Math.floor(750/this.$getConfig().env.deviceWidth*this.$getConfig().env.deviceHeight))+220;
    },
}
</script>
<style>
.moreFunction{
    background-color:rgb(255, 255, 255)
}
</style>


