<template>
    <div class="moreFunction" :style="{'height':height+'px'}">
        <midea-header :title="'滤芯状态'" :titleText="'#000000'" :bgColor="'#ffffff'" :isImmersion="true" :showRightImg2="true" @leftImgClick="goBack" @rightImg2Click="goGuide"></midea-header>
        <div class="wrapper">
            <div class="filter">
                <midea-progresscycle-view class="circleprogress" :data="circleJson"></midea-progresscycle-view>
                <div class="filter-text">
                    <text class="filter-name">MIX一体复合滤芯</text>
                    <text class="filter-info1"  v-if="!isError">剩余{{filterLife}}%</text>
                    <text class="filter-info2"  v-if="isError">滤芯异常</text>
                </div>
            </div>
            <div class="content-wrapper">
                <text class="content">{{filterInfo1}}</text>
                <text class="content">{{filterInfo2}}</text>
                <text class="content">{{filterInfo3}}</text>
            </div>
        </div>
        <div class="buy"  >
            <!-- <text class="buy-text">购买滤芯</text> -->
        </div>
    </div>
</template>
<style>
.moreFunction{
    background-color:rgb(255, 255, 255);
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
}
.circleprogress{
    top: 0;
    left: 0;
    width: 450px;
    height: 450px;
}
.filter{
    width: 450px;
    height: 450px;
}
.wrapper{
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
}
.filter-text{
    position: absolute;
    top:200px;
    left: 75px;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}
.filter-name{
    font-size: 37px;
    color: #4a4a4a;
    font-family: PingFangSC-Regular;
}
.filter-info1{
    font-size: 37px;
    color: #28a7e8;
    font-family: iconfont1;
}
.filter-info2{
    font-size: 37px;
    color: #f5a623;
    font-family: PingFangSC-Regular;
}
.content-wrapper{
    margin-top: 120px;
}
.content{
    color:#8b8b8b;
    font-size: 29px;
    font-family: PingFangSC-Regular;
    width: 615px;
    margin-top: 24px;
}
.buy{
    width: 620px;
    height: 300px;
    margin-top: 160px;
    border-radius: 50px;
    /* background-color: #28a7e8; */
    background-color: white;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}
.buy-text{
    color:white;
    font-size: 28px;
    font-family: PingFangSC-Regular;
}
</style>
<script>
import nativeService from '@/common/services/nativeService';
import cmd from './common/cmd.js'; 
import mideaCell from './components/cell.vue';
import mideaHeader from './components/mheader1.vue';
import mideaDialog from '@/component/dialog.vue';
import mideaSwitch from '@/midea-component/switch2.vue';
import mideaCircleProgress from './components/circleProgress.vue';

export default {
    components:{
        mideaCell,
        mideaHeader,
        mideaDialog,
        mideaSwitch,
        mideaCircleProgress
    },
    data(){
        return{
            height:0,
            circleJson:{},//环形进度条
            filterLife:0,
            status:{},
            filterInfo1:'',//滤芯描述语言
            filterInfo2:'',//滤芯描述语言
            filterInfo3:'',//滤芯描述语言
            isError:false,//滤芯异常
        }
    },
    methods:{
        goBack(){
            nativeService.goBack()
        },
        goGuide(){
            nativeService.setItem('helpKey',21);
            nativeService.goTo('helpItem.js');
        },
        goBuy(){
            nativeService.goTo('buyFilter.js');
        },
        sendQuery(){
            var self=this;
            nativeService.startCmdProcess("query",cmd.createQueryMessage(),function(res){
                self.status=cmd.analyse(res);
                self.initDesc();
                self.circleJson={
                "completedColor":"#bbe1f8", //环形进度条完成后的颜色
                "incompletedColor":"#28a7e8", //环形进度条未完成后的颜色
                "thickness":10, //环形进度条宽度，默认4
                "cornerRadius" : 225,  //环形的半径，默认是width/2
                "totalCounter" : 360, //环形进度条的最大值，默认是360
                "progressCounter" : parseInt((100-self.status.filter1Life)/100*360), //设置进度值，默认是从0-360, 默认为0
                "autoProgress" : false, //设置是否需要自动执行环形进度，默认false, 如果设置为true，则每秒进度值+1操作
                "clockwise" : true, //环形自动执行进度的方向，默认是true，即顺时针方向，false为逆时针方向
                "startingSlice" : 0, //环形进度开始的起始位置，当totalCounter为360的时候，0: 0点钟位置起点，90:3点钟位置起点 180:6点钟位置起点
                "pointShow" : false, //环形进度中的进度球是否需要显示，默认不显示
                "pointRadius" : 5, //默认是环形进度宽度的一半
                "pointColor" :  "#28a7e8", //环形进度中的进度球颜色
                };
                self.initCircleColor();
                nativeService.hideLoading();
            },function(res){
                nativeService.hideLoading();
                nativeService.toast("网络较差，请稍后重试");
            })
        },
        initDesc(){
            var self=this;
            self.filterLife=self.status.filter1Life;
            self.filterInfo1="1.有效滤除水中的泥沙、铁锈、悬浮物、余氯及异味等";
            self.filterInfo2="2.拦截水中的有机物（三氯甲烷、四氯化碳）、重金属（砷、铅、镉）";
            self.filterInfo3="3.吸附余氯、异色异味，提升口感";
        },
        initCircleColor(){
            var self=this;
            if(self.status.isGenuine==1){
                self.isError=true;
                self.circleJson.completedColor="#f5a623";
                self.circleJson.incompletedColor="#f5a623";
            }
        },
        //埋点
        getDeviceId(){
            var self=this;
            nativeService.getDeviceInfo().then((res)=>{
                // cmd.dataReport('KH_0xED_63201936','view','page_view','filterLife',res.result.deviceSn,{});//埋点
            }).catch((err)=>{

            })
        },
    },
    beforeCreate(){
        var domModule = weex.requireModule('dom');
        nativeService.getPath((path) => {
            let fontUrl = path + 'assets/setting/bugu_font.ttf'
            domModule.addRule('fontFace', {
                'fontFamily': "iconfont1",
                'src': "url('" + fontUrl + "')"
            });
        })
    },
    created() {
       this.height=parseInt(Math.floor(750/this.$getConfig().env.deviceWidth*this.$getConfig().env.deviceHeight))+220;
       nativeService.showLoading();
       this.sendQuery();
    //    this.getDeviceId();
    },
}
</script>


