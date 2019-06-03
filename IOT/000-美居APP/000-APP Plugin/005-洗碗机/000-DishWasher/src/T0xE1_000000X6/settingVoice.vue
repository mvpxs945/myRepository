<template>
    <div class="wrapper" :style="{height:screenH+'px'}">
        <midea-header title="语音设置" :isImmersion="true" bgColor="#ffffff" :leftImg="icon.leftImg" 
            @headerClick="headerClick"></midea-header>
        <div class="demo_section">
            <audio :src="audioSrc" ref="audioPlay"></audio>
            <text class="audio-title">可以选择下面的语音，播放不同的语音哦~</text>
            <div><scroller class="guide_list">
                <div v-for="(item,i) in audioList" :key="i" class="guide_list_item flex-row-sp  guide_item_boder"
                    @click="itemClick(i)">
                    <text class="guide_item_text">{{item.name}}</text>
                    <div v-if="selectIndex == i" class="guide_check"></div>
                </div>
            </scroller></div>
        </div>
        <div class="standby-footer" :style="{'height':(isipx?112+ipxBottom+'px':112+'px'),'padding-bottom':(isipx?ipxBottom+'px':'0px')}">
            <div class="flex-row-center">
                <div class="btn-lay flex-row-center btn-boder" @click="btnClick('btn_order')">
                    <text class="btn-text-left">更新语音包</text>
                </div>
                <div class="btn-lay flex-row-center btn-boder " @click="btnClick('btn_order')">
                    <text class="btn-text-right">还原</text>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import nativeService from "@/common/services/nativeService";
import mideaHeader from "./components/header.vue";

import bigData from "./js/bigData.js";


export default {
    components:{
        mideaHeader,
    },
    data(){
        return {
            screenH: 750 / weex.config.env.deviceWidth * weex.config.env.deviceHeight,
            icon:{
                leftImg:'assets/img/public_ic_back@3x.png',
                btnOrder: "./assets/img/btn_order.png",
                btnStart: "./assets/img/btn_start.png",
            },
            audioList:[
                {name:'经典女声',src:'./assets/img/audio/1.wav'},
                {name:'经典男声',src:'./assets/img/audio/2.wav'},
                {name:'英文女声',src:'./assets/img/audio/3.wav'},
                {name:'英文男声',src:'./assets/img/audio/4.wav'},
                {name:'可爱萝莉',src:'./assets/img/audio/5.wav'},
                {name:'讲故事的老师',src:'./assets/img/audio/6.wav'},
                {name:'活泼小正太',src:'./assets/img/audio/7.wav'},
            ],
            selectIndex:0,
        }
    },
    methods:{
        headerClick: function(tag){
            console.log('headerClick:'+tag);
            switch(tag){
                case 'leftImgClick':
                    nativeService.goBack();
                    break;
                case 'rightImgClick':
                    break;
                case 'secondImgClick':
                    break;
            }
        },
        itemClick:function(index){
            this.selectIndex = index;
        }
    },
    computed:{
        isipx: function() {
            return weex && (
                        weex.config.env.deviceModel === 'iPhone10,3' || weex.config.env.deviceModel === 'iPhone10,6' //iphoneX
                        || weex.config.env.deviceModel === 'iPhone11,8' //iPhone XR
                        || weex.config.env.deviceModel === 'iPhone11,2' //iPhone XS
                        || weex.config.env.deviceModel === 'iPhone11,4' || weex.config.env.deviceModel === 'iPhone11,6' //iPhone XS Max
                        );
        },
        audioSrc: function(){
            var self = this;
            let src = self.audioList[self.selectIndex].src;
            return src;
        }
    }
    
}
</script>
<style scoped>
.flex-row-center {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}
.flex-row-sp {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}

.flex-column-center {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.wrapper {
  background-color: rgb(242, 242, 242);
}

.audio-title {
  font-size: 25px;
  height: 100px;
  line-height: 100px;
  padding-left: 40px;
  padding-top: 10px;
  color: #9d9d9d;
}
.guide_list {
  position: relative;
}
.guide_list_item {
  position: relative;
  width: 750px;
  height: 100px;
  padding-left:32px;
  padding-right: 32px; 
  background-color: #fff;
}
.guide_item_boder {
  border-width: 2px;
  border-style: solid;
  border-color: rgb(250, 250, 250);
}
.guide_item_text {
  font-size: 30px;
  height: 100px;
  line-height: 100px;
  width: 406px;
}
.guide_check {
  width:20px;
  height:30px;
  border-bottom: 3px solid #408aff;
  border-right: 3px solid #408aff;
  -webkit-transform: rotate(45deg);
  -moz-transform: rotate(45deg);
  transform: rotate(45deg);
}


.standby-footer {
  position: absolute;
  background-color: #fff;
  width: 750px;
  height: 112px;
  left: 0px;
  bottom: 0px;
}

.btn-lay {
  width: 375px;
  height: 112px;
  line-height: 112px;
}
.btn-boder {
  border-width: 1px;
  border-style: solid;
  border-color: rgb(242, 242, 242);
}

.btn-text-right {
    color:#408aff;
}
.btn-text-left {
    color:#408aff;
}
.btn-img {
  flex: 1;
}
</style>





