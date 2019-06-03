<template>
    <div class="helpItem" :style="objClass">
        <midea-header :title="'常见问题'" :titleText="'#000000'" :bgColor="'#ffffff'" :showLeftImg="true" :isImmersion="true" :showRightImg="false" @leftImgClick="goBack"></midea-header>
        <div style="width:750px;height:20px;background-color:#f9f9f9"></div>
        <div class="wrapper" :style="wrapper">
            <text class="title">{{title}}</text>
            <text class="content">{{content}}</text>
        </div>
        <div style="width:750px;height:220px;background-color:white;align-self:flex-end;"></div>
    </div>
</template>
<script>
import cmd from './js/cmd.js';
import config from './js/config.js'

import nativeService from '@/common/services/nativeService'
import mideaHeader from './components/header.vue'

export default {
    components:{mideaHeader},
    data(){
        return{
            height:1000,
            questionList:config.getConfigValue().FAQ,
            title:'',
            content:'',
        }
    },
    methods:{
        goBack(){
            nativeService.goBack();
        },
        getFAQ(){
            var self=this;
            nativeService.getItem('questionKey',function(index){
                self.title=self.questionList[parseInt(index.data)].question;
                self.content=self.questionList[parseInt(index.data)].anwser;
            })
        }
    },
    created() {
       this.height=parseInt(Math.floor(750/this.$getConfig().env.deviceWidth*this.$getConfig().env.deviceHeight))+220;
       this.getFAQ();
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
