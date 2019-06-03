<template>
    <div class="help" :style="objClass">
        <midea-header :title="'产品指南'" :titleText="'#000000'" :bgColor="'#ffffff'" :isImmersion="true" :showRightImg="false" @leftImgClick="goBack"></midea-header>
        <div style="width:750px;height:20px;background-color:rgb(242,242,242)"></div>
        <scroller>
            <div class="wrapper">
                <midea-cell v-for="(item,i) in list" :key="i"
                        :title="item.name"
                        :hasArrow="true"
                        @mideaCellClick="goGuide(i)"
                ></midea-cell>
            </div>
        </scroller>
        <!-- 适配小米8等底部 -->
        <div style="width:750px;height:220px;background-color:rgb(242,242,242);align-self:flex-end;"></div>
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
                {'name':'产品简介'},
                {'name':'安装说明'},
                {'name':'使用说明'},
                {'name':'清洁保养'},
            ]
        }
    },
    methods:{
        goBack(){
            nativeService.goBack();
        },
        goGuide(i){
            nativeService.setItem("guideKey",i);
            nativeService.goTo('guideItem.js');
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
