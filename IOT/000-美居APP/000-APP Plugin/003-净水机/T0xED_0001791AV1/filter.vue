<template>
    <div class="filter" :style="'height:'+height">
        <midea-header :title="'滤芯'" :titleText="'#000000'" :bgColor="'#ffffff'" :isImmersion="true" :showLeftImg="true" :showRightImg="false" @leftImgClick="goBack"></midea-header>
        <div class="filter-wrapper">
            <div class="icon">
                <div :class="[changeClass()]" v-if="filterList.length==4?false:true">
                    <div style="width:128px;height:128px;borderRadius:64px;backgroundColor:#5BD2FF;" v-for="(item,i) in filterList" :key="i" @click="changeFilter(i)">{{item.name}}</div>
                </div>
                <div :class="[changeClass()]" v-if="filterList.length==4?true:false">
                    <div style="width:120px;height:120px;borderRadius:60px;backgroundColor:#5BD2FF;" v-for="(item,i) in filterList" :key="i" @click="changeFilter(i)">{{item.name}}</div>
                </div>
            </div>
            <div class="desc">
                <div ref="desc" class="desc-wrapper" :style="styleObj">
                    <div class="desc-top">
                        <div class="desc-top-wrapper">
                            <div class="desc-top-wrapper-up">
                                <text class="top-text">{{life}}</text>
                                <text class="top-unit">%</text>
                            </div>
                            <text class="top-desc">剩余百分比</text>
                        </div>
                        <div class="center-border">
                            <div class="border-line"></div>
                        </div>
                        <div class="desc-top-wrapper">
                            <div class="desc-top-wrapper-up">
                                <text class="top-text">{{days}}</text>
                                <text class="top-unit">天</text>
                            </div>
                            <text class="top-desc">剩余天数约</text>
                        </div>
                    </div>
                    <text class="desc-text">{{desc}}</text>
                </div>
            </div>
            <div class="buy">
                <!-- <div class="buy-top">
                    <div class="buy-top-desc">
                        <text class="buy-top-desc-text">疯抢价</text>
                    </div>
                    <text class="sale">{{sale}}</text>
                    <text class="real">{{real}}</text>
                </div> -->
                <div class="buy-down" @click="goBuy">
                    <text class="buy-down-text">去购买</text>
                </div>
            </div>
        </div>
    </div>
</template>
<style>
.filter{
    background-color: white;
}
.filter-wrapper{
    flex:1;
    width: 750px;
    padding-bottom: 32px;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center; 
}
.icon{
    width: 750px;
    height: 500px;
    flex-direction: column;
    justify-content: center;
    align-items: center; 
}
.iconWrapper1{
    width: 192px;
    height: 192px;
    border-radius: 96px;
    border-color: #C7C7CC;
    border-width: 2px;
    border-style: solid;
    flex-direction: column;
    justify-content: space-around;
    align-items: center; 
}
.iconWrapper2{
    width: 192px;
    height: 384px;
    border-radius: 96px;
    border-color: #C7C7CC;
    border-width: 2px;
    border-style: solid;
    flex-direction: column;
    justify-content: space-around;
    align-items: center; 
}
.iconWrapper3{
    width: 576px;
    height: 192px;
    border-radius: 96px;
    border-color: #C7C7CC;
    border-width: 2px;
    border-style: solid;
    flex-direction: row;
    justify-content: space-around;
    align-items: center; 
}
.iconWrapper4{
    width: 640px;
    height: 184px;
    border-radius: 92px;
    border-color: #C7C7CC;
    border-width: 2px;
    border-style: solid;
    flex-direction: row;
    justify-content: space-around;
    align-items: center; 
}
.desc{
    width: 750px;
    height: 400px;
    padding-left: 34px;
    padding-right: 34px;
}
.desc-wrapper{
    width: 750px;
    height: 320px;
    padding-left: 34px;
    padding-right: 34px;
    position: absolute;
    left: 0;
}
.desc-top{
    flex-direction: row;
    justify-content: center;
    align-items: center; 
}
.desc-top-wrapper{
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
.desc-top-wrapper-up{
    flex-direction: row;
    justify-content: center;
    align-items: flex-end;
}
.center-border{
    width: 100px;
    height: 66px;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
}
.border-line{
    width: 50px;
    height: 66px;
    border-right-color: #E5E5E8;
    border-right-style: solid;
    border-right-width: 2px;
}
.top-text{
    font-family: PingFangSC-Semibold;
    font-size: 64px;
    color: #000000;
    letter-spacing: 0;
    text-align: justify;
    /* line-height: 70px; */
    padding-bottom: 28px;
}
.top-unit{
    font-family: PingFangSC-Regular;
    font-size: 26px;
    color: #000000;
    letter-spacing: 0;
    text-align: justify;
    /* line-height: 30px; */
    padding-bottom: 30px;
}
.top-desc{
    font-family: PingFangSC-Regular;
    font-size: 24px;
    color: rgba(102,102,102,0.6);
    letter-spacing: 0;
    text-align: center;
    /* line-height: 28px; */
}
.desc-text{
    font-family: PingFangSC-Regular;
    font-size: 28px;
    color: #666666;
    text-align: justify;
    /* line-height: 32px; */
    margin-top: 70px;
}
.buy{
    width: 750px;
    height: 150px;
    padding-left: 34px;
    padding-right: 34px;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: fixed;
    bottom:32px;
    left: 0;
}
.buy-top{
    flex-direction: row;
    justify-content: center;
    align-items: center; 
}
.buy-top-desc{
    width: 108px;
    height: 40px;
    background-color: #FF3B30;
    flex-direction: row;
    justify-content: center;
    align-items: center; 
}
.buy-top-desc-text{
    font-family: PingFangSC-Regular;
    font-size: 28px;
    color: #FFFFFF;
    text-align: justify;
    /* line-height: 32px; */
}
.sale{
    font-family: PingFangSC-Medium;
    font-size: 40px;
    color: #000000;
    text-align: justify;
    /* line-height: 44px; */
}
.real{
    font-family: PingFangSC-Regular;
    font-size: 28px;
    color: #C7C7CC;
    text-align: justify;
    /* line-height: 32px; */
    text-decoration: line-through;
}
.buy-down{
    width: 686px;
    height: 82px;
    margin-top: 28px;
    border-radius: 4px;
    background-color: #5BD2FF;
    flex-direction: row;
    justify-content: center;
    align-items: center; 
}
.buy-down-text{
    font-family: PingFangSC-Regular;
    font-size: 32px;
    color: #FFFFFF;
    letter-spacing: 0;
    text-align: center;
    /* line-height: 36px; */
}
</style>
<script>
import nativeService from '@/common/services/nativeService'
import mideaHeader from './components/header.vue'
import cmd from './js/cmd.js';
import config from './js/config.js';

const animation = weex.requireModule('animation');
const stream=weex.requireModule('stream');

export default {
    components:{mideaHeader},
    data(){
        return{
            height:1000,
            status:{},
            deviceSn:0,
            filterList:config.getConfigValue().filterList,
            life:'',
            days:'',
            name:'',
            desc:'',
            sale:'¥399',
            real:'¥499',
            filterSrc:'',
            styleObj:{opacity:'0',top:'80'},
        }
    },
    methods:{
        goBack(){
            nativeService.goBack();
        },
        goBuy(){
            var self=this;
            nativeService.jumpNativePage({
                "pageName": "electronicBusinessPage", 
                "url":self.filterSrc,
            })
        },
        initStatus(status){
            var self=this;
            nativeService.getItem("filterKey",function(i){
                var index=parseInt(i.data);
                self.life=status.filterLife[index];
                self.days=Math.floor(parseInt(self.filterList[index].maxDays)*parseInt(status.filterLife[index])/100);
                self.desc=self.filterList[index].desc;
                self.filterSrc=self.filterList[index].src;
            })
        },

        changeClass(){
            var iconClass='';
            switch(this.filterList.length){
                case 1:
                iconClass='iconWrapper1';
                break;
                case 2:
                iconClass='iconWrapper2';
                break;
                case 3:
                iconClass='iconWrapper3';
                break;
                case 4:
                iconClass='iconWrapper4';
                break;
            }
            return iconClass;
        },
        changeFilter(i){
            //动画
            var self=this;
            var desc = this.$refs.desc;
            animation.transition(desc, {
                styles: {
                    opacity: '0',
                    transform: 'translate(0px, 0px)',
                    transformOrigin: 'center center'
                },
                duration: 10, //ms
                timingFunction: 'ease-out',
                delay: 0 //ms
            }, function () {
                self.life=self.status.filterLife[i];
                self.days=Math.floor(parseInt(self.filterList[i].maxDays)*parseInt(self.status.filterLife[i])/100);
                self.desc=self.filterList[i].desc;
                self.filterSrc=self.filterList[i].src;
                animation.transition(desc, {
                    styles: {
                        opacity: '1',
                        transform: 'translate(0px, -80px)',
                        transformOrigin: 'center center'
                    },
                    duration: 800, //ms
                    timingFunction: 'ease-out',
                    delay: 0 //ms
                }, function () {
                })
            })
        },
        sendQuery(){
            var self=this;
            nativeService.showLoading();
            nativeService.startCmdProcess("query",cmd.createQueryMessage(),function(res){
                self.status=cmd.analyse(res);
                self.initStatus(self.status);
                nativeService.hideLoading();
                var desc = self.$refs.desc;
                animation.transition(desc, {
                    styles: {
                        opacity: '1',
                        transform: 'translate(0px, -80px)',
                        transformOrigin: 'center center'
                    },
                    duration: 1000, //ms
                    timingFunction: 'ease-out',
                    delay: 0 //ms
                }, function () {
                })
            },function(res){
                nativeService.hideLoading();
            })
        }
    },
    created() {
       this.height=Math.floor(750/this.$getConfig().env.deviceWidth*this.$getConfig().env.deviceHeight);
       this.sendQuery();
    //    this.move();
    },
    mounted(){
    },
    computed:{
    }
}
</script>
