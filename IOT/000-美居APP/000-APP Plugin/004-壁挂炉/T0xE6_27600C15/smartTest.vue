<template>
    <div class="wrapper" :style="{'height':objHeight}">
        <div class="up" :style="{'height':upHeight}">
            <image class="image-flash" src="./assets/img/ac.png" ref="ac"></image>
             <midea-header :title="'智能体检'" :titleText="'#ffffff'" :bgColor="'rgba(255,255,255,0)'" :isImmersion="true" :leftImg="'./assets/img/ic_menu_back_white_n2x.png'" :showRightImg="false" @leftImgClick="goBack"></midea-header>
            <div class="up-wrapper" >
                <div class="first">
                    <text class="first-text">{{score}}</text>
                    <text class="first-unit">分</text>
                </div>
                <div class="second" v-if="!statusFlag">
                    <text class="second-text">上次体检时间</text>
                </div>
                <div class="third" v-if="!statusFlag">
                    <text class="third-text">{{time}}</text>
                </div>
                <div class="fourth" v-if="statusFlag">
                    <text class="fourth-text">{{status}}</text>
                </div>
            </div>
        </div>
        <div class="down" :style="{'height':downHeight}">
            <div class="down-up">
                <midea-cell title="体检参数" :rightText="testNum+'项'"></midea-cell>
                <midea-cell title="故障信息"  rightText="0个故障"></midea-cell>
            </div>
            <div class="down-bottom" @click="testClick">
                <text class="down-bottom-text">{{startTest}}</text>
            </div>
        </div>
    </div>
</template>

<style>
.wrapper{
}
.up{
    background-image: linear-gradient(to bottom, rgb(93,117,246),rgb(78,105,247));
    width: 750px;
}
.box {
  width: 750px;
  height: 88px;
  display: inline-flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: space-between;
  align-items: center;
  /* padding-left: 20px; */
  /* border-bottom-width:1px;
  border-bottom-color:#e2e2e2;
  background-color: #e2e2e2; */
}
.image-flash{
    width: 1110px;
    height: 1110px;
    left: -180px;
    top: -180px;
    position: absolute;
}
.header-left-image-wrapper {
  width: 88px;
  height: 88px;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding-left: 20px;
}
.header-left-image {
  height: 58px;
  width: 58px;
}
.up-wrapper{
    width: 750px;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
}
.first{
    width: 750px;
    flex-direction: row;
    justify-content: center;
    align-items: flex-start;
    margin-top: 90px; 
}
.first-text{
    font-size: 160px;
    font-family: Roboto-Light;
    color: white;
}
.first-unit{
    padding-top: 35px;
    font-size: 32px;
    font-family: PingFangSC-Light;
    color: white;
}
.second{
    margin-top: 56px;
}
.second-text{
    font-size: 24px;
    font-family: PingFangSC-Regular;
    color: rgba(255,255,255,0.5);
}
.third{
    margin-top: 16px;
}
.third-text{
    font-size: 32px;
    font-family: PingFangSC-Regular;
    color: white;
}
.fourth{
    margin-top: 100px;
}
.fourth-text{
    font-size: 32px;
    font-family: PingFangSC-Regular;
    color: white;
}
.down{
    background-color: rgb(242,242,242);
    width: 750px;;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
}
.down-up{
    width: 750px;
}
.down-bottom{
    width: 750px;
    height: 100px;
    background-color: white;
    flex-direction: row;
    justify-content: center;
    align-items: center;
}
.down-bottom-text{
    font-size: 32px;
    font-family: PingFangSC-Regular;
    color: rgb(38,122,255);
}
</style>

<script>
import nativeService from '@/common/services/nativeService';
import cmd from './common/cmd.js';
import mideaHeader from './components/mheader.vue';
import mideaDialog from '@/component/dialog.vue';
import mideaTab from './components/tab.vue';
import mideaNavList from '@/component/navList.vue';
import mideaCell from '@/component/cell.vue';
const globalEvent=weex.requireModule('globalEvent');
const stream=weex.requireModule('stream');
const animation = weex.requireModule('animation');

export default {
    components:{
        mideaHeader,
        mideaDialog,
        mideaTab,
        mideaNavList,
        mideaCell
    },
    data(){
        return {
            height:0,
            objHeight:"",
            upHeight:"",
            downHeight:"",
            headerHeight:'',
            headerBgColor:"rgb(93,117,246)",//header背景色
            titleText:"white",//header字体色
            leftImg:"./assets/img/ic_menu_back_white_n2x.png",
            score:100,
            time:"0000-00-00 00:00:00",
            status:"正在扫描机器...",
            statusFlag:false,
            startTest:"开始体检",
            timer1:"",
            timer2:"",
            testNum:0,//体检参数
            angle:720,//旋转角度
        }
    },
    methods:{
        goBack(){
            nativeService.goBack();
        },
        testClick(){
            if(this.score==100){
                var date=new Date();
                this.time=date.toLocaleString();
                this.sendTime();
                this.changeScore();
                this.rotateImg();
                this.angle=this.angle+720;
            }
        },
        initHeight(){
            this.objHeight=this.height+'px';
            this.upHeight=parseInt(this.height*0.5097/2)*2+'px';
            this.downHeight=parseInt(this.height*0.4903/2)*2+'px';
        },
        //体检数字跳动
        changeScore(){
            var self=this;
            this.statusFlag=true;
            this.status="正在扫描机器...";
            this.score=0;
            this.testNum=0;
            this.timer2=setInterval(() => {
                if(self.testNum<22){
                    self.testNum++;
                }else{
                    clearInterval(self.timer2);
                }
            }, 329);
            this.timer1=setInterval(function(){
                if(self.score<75){
                    self.score++;
                }else{
                    clearInterval(self.timer1);
                    self.timer1=setInterval(function(){
                        if(self.score<90){
                            self.score++;
                        }else{
                            clearInterval(self.timer1);
                            self.timer1=setInterval(function(){
                                if(self.score<100){
                                    self.score++;
                                }else{
                                    clearInterval(self.timer1);
                                    self.status="体检完毕,机器正常";
                                    self.startTest="继续体检";
                                }
                            },50)
                        }
                    },200)
                }
            },50)
        },
        //图片旋转
        rotateImg(){
            var self=this;
            var ac=this.$refs.ac;
            animation.transition(ac,{
                styles:{
                    transform:"rotate("+self.angle+"deg)"
                },
                duration:8000,
                timingFunction:'linear',
                delay:0,
            },function(){
                
            })
        },
        sendTime(){
            var self=this;
            nativeService.getDeviceInfo().then((res)=>{
                var id=res.result.deviceId;
                stream.fetch({
                    method: 'POST',
                    url: "http://api.midea-hotwater.com:13145/e6/v1/api",
                    type: 'json',
                    headers: { 'Content-Type': 'application/json' },
                    body:{
                        'msg':"checkLog",
                        'params':{
                            'applianceId':id,
                            'action':'set',
                        }
                    }
                },function(res){
                    nativeService.hideLoading();
                },function(error){
                    nativeService.hideLoading();
                })
            }).catch((err)=>{
                nativeService.hideLoading();
                nativeService.toast("获取设备信息失败")
            })
        },
        getTime(){
            var self=this;
            nativeService.getDeviceInfo().then((res)=>{
                var id=res.result.deviceId;
                stream.fetch({
                    method: 'POST',
                    url: "http://api.midea-hotwater.com:13145/e6/v1/api",
                    type: 'json',
                    headers: { 'Content-Type': 'application/json' },
                    body:{
                        'msg':"checkLog",
                        'params':{
                            'applianceId':id,
                            'action':'get',
                        }
                    }
                },function(res){
                    nativeService.hideLoading();
                    self.time=res.data.result.data;
                },function(error){
                    nativeService.hideLoading();
                })
            }).catch((err)=>{
                nativeService.hideLoading();
                nativeService.toast("获取设备信息失败")
            })
        },
    },
    computed: {
    },
    created(){
        var self=this;
        self.height=Math.floor(750/self.$getConfig().env.deviceWidth*self.$getConfig().env.deviceHeight);
        nativeService.showLoading();
        clearInterval(self.tiemr1);
        clearInterval(self.tiemr2);
        self.initHeight();
        self.getTime();
    },
}
</script>
