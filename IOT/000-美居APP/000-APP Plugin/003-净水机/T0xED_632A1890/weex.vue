<template>
    <div class="wrapper" :style="objClass">
        <div class="first-up" :style="upClass">
            <midea-header :title="'净水机'" bgColor="rgba(255,255,255,0)" :titleText="'#ffffff'" :isImmersion="true" :showRightImg="true" :showLeftImg="true" @leftImgClick="goBack" @rightImgClick="goMore"></midea-header>
            <div class="first-up-firstFloor">
                <text class="first-up-firstFloor-text">{{outTDS}}</text>
                <text class="first-up-firstFloor-unit">mg/L</text>
            </div>
            <div class="first-up-secFloor">
                <text class="first-up-secFloor-text">出水TDS值</text>
            </div>
            <div class="first-up-fouFloor">
                <text class="first-up-fouFloor-text">进水TDS {{inTDS}}mg/L</text>
            </div>
        </div>
        <div class="first-down" :style="downClass">
            <midea-cell v-for="(item,i) in filterList" :key="i"
                    :title="item.name"
                    :rightText="'约剩余'+item.text+'%'"
            ></midea-cell>
        </div> 
        <midea-dialog :title="errorTitle"
                        :content="errorInfo"
                        :show="errorShow"
                        confirmText="报修"
                        cancelText="返回"
                        mainBtnColor="rgb(38,122,255)"
                        @mideaDialogConfirmBtnClicked="mideaDialogConfirmBtnClicked3"
                        @mideaDialogCancelBtnClicked="mideaDialogCancelBtnClicked"
        ></midea-dialog>
        <midea-dialog   title="滤芯到期"
                        :content="overTip"
                        :show="filterShow"
                        confirmText="购买"
                        cancelText="返回"
                        mainBtnColor="rgb(38,122,255)"
                        @mideaDialogConfirmBtnClicked="mideaDialogConfirmBtnClicked4"
                        @mideaDialogCancelBtnClicked="mideaDialogCancelBtnClicked"
        ></midea-dialog>
    </div>
</template>
<script>
import nativeService from '@/common/services/nativeService';
import cmd from './common/cmd.js';
import mideaHeader from './components/header.vue';
import mideaDialog from './components/dialog.vue'
import mideaCell from './components/cell.vue';
const globalEvent=weex.requireModule('globalEvent');
const stream=weex.requireModule('stream');

export default {
    components:{mideaHeader,
                mideaDialog,
                mideaCell
    },
    data(){
        return {
            inTDS:0,
            deviceId:0,//设备ID
            deviceSn:0,
            height:1334,
            washImg:'./assets/img/ic_wash_on2x.png',
            isWashing:false,
            errorShow:false,
            errorTitle:"E5 通信故障",
            errorInfo:"电源板与显示板连接异常",
            outTDS:0,
            overTip:'您的滤芯即将到期，请及时更换',
            filterShow:false,
            filterList:[
                {name:"FIST滤芯",text:0},
            ],
        }
    },
    methods: {
        goMore(){
            // cmd.dataReport('KH_0xED_63202008','event','go_moreFunction','weex',this.deviceSn,{});//埋点
            nativeService.goTo("moreFunction.js");
        },
        wash(){
            if(this.isWashing==false){
                this.beforeShow=true;
            }
            else{
                this.afterShow=true;
            }
        },
        mideaDialogConfirmBtnClicked3(){
            nativeService.callTel({
                operation:"callTel",
                tel:4008899315,
                title:"客户服务",
                desc:"拨打热线电话：400-889-9315",
            }).then((res)=>{

            }).catch((err)=>{

            })
        },
        mideaDialogConfirmBtnClicked4(){
            this.filterShow=false;
            nativeService.jumpNativePage({
                "pageName": "electronicBusinessPage", 
                "url":"https://m.midea.cn/promote/w/build/index/aWwTfmdaS0xQ9MTEzNw?__sus=d/dRBtBo6DDFRVhvzKER8WC5iyAsZVPh21X/dhWKO3NAKU1BEvW+/zLi7JlFANTZc4NgA4Zm/r+3sY2bxrOCVg==&__smkey=fae255eb0a876001a1338ed6386560e&__cmkey=&__user_flag=1&__cus=&__fromuid=34519512&from=singlemessage"
            })
        },
        mideaDialogCancelBtnClicked(){
            this.beforeShow=this.afterShow=this.errorShow=this.filterShow=false;
        },
        goBack(){
            nativeService.goBack();
        },
        initStatus(res){
            var self=this;
            if(typeof res=='string'){
                var msg=JSON.parse(res);
            }else{
                var msg=res;
            }
            self.filterList[0].text=msg[26];
            self.outTDS=parseInt(msg[48],10)+parseInt(msg[49],10)*256;
            self.inTDS=parseInt(msg[46],10)+parseInt(msg[47],10)*256;
            //故障
            if(cmd.conver2str(parseInt(msg[24],10))[4]==1){
                self.errorTitle="E6 强制待机";
                self.errorInfo="制水工作时间过长";
                self.errorShow=true;
                self.status="故障中";
            }else if(cmd.conver2str(parseInt(msg[24],10))[5]==1){
                self.errorTitle="E5 通信故障";
                self.errorInfo="电源板与显示板连接异常";
                self.errorShow=true;
                self.status="故障中";
            }
            //状态判断
            if(cmd.conver2str(parseInt(msg[13],10))[5]==1){
                self.outTDS=parseInt(msg[48],10)+parseInt(msg[49],10)*256;
                self.inTDS=parseInt(msg[46],10)+parseInt(msg[47],10)*256;
            }else{
                self.outTDS=0;
                self.inTDS=0;
            }
            //滤芯到期提醒
            if(parseInt(msg[26],10)<=5){
                if(parseInt(msg[26],10)==0){
                    self.overTip="您的滤芯到期，请及时更换"
                    self.filterShow=true;
                }else{
                    self.overTip="您的滤芯即将到期，请及时更换"
                    self.filterShow=true;
                    //滤芯寿命倒计时
                    if(parseInt(msg[45],10)!=127){
                        nativeService.alert("您的滤芯寿命大约还剩"+msg[45]+"天");
                    }
                }
            }
        }
    },
    created() {
        this.height=Math.floor(750/this.$getConfig().env.deviceWidth*this.$getConfig().env.deviceHeight);
        var self=this;
        nativeService.showLoading();
        //获取deviveId
        nativeService.getDeviceInfo().then((res)=>{
            nativeService.setItem("device_id",res.result.deviceId);
            nativeService.setItem("device_sn",res.result.deviceSn);
            self.deviceId=res.result.deviceId;
            self.deviceSn=res.result.deviceSn;
            // cmd.dataReport('KH_0xED_63202008','view','page_view','weex',res.result.deviceSn,{});//埋点
            //保存当前设备状态到公共状态
            nativeService.startCmdProcess("query",cmd.createQueryMessage(),function(res){
                self.initStatus(res);
                nativeService.hideLoading();
            },function(res){
                nativeService.hideLoading();
                nativeService.toast("网络较差，请稍后重试");
            })
        }).catch((err)=>{
            nativeService.hideLoading();
            nativeService.toast("获取设备信息失败")
        })
        //获取设备主动上报的信息
        globalEvent.addEventListener('receiveMessage',function(res){
            var msg=res.data.split(",");
            self.initStatus(msg);
        })
    },
    mounted(){
    },
    computed:{
        //适配屏幕高度
        objClass:function(){
            return {height:this.height+'px'}
        },
        upClass:function(){
            return {height:this.height*0.7025+'px'}
        },
        downClass:function(){
            return {height:this.height*0.31+'px'}
        }
    }
}
</script>

<style>
.wrapper{
}
.first-up{
    background-image: linear-gradient(to bottom, rgb(93,117,246),rgb(78,105,247));
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    width: 750px;
}
.first-up-firstFloor{
    width: 750px;
    height: 250px;
    margin-top:80px;
    flex-direction: row;
    justify-content: center;
    align-items: flex-start;
}
.first-up-firstFloor-text{
    font-size: 220px;
    font-family: Roboto-Light;
    color: white;
    padding-left: 40px;
}
.first-up-firstFloor-unit{
    padding-top: 50px;
    color: white;
}
.first-up-secFloor{
    
}
.first-up-secFloor-text{
    text-align: center;
    font-size: 32px;
    font-family: PingFangSC-Regular;
    color: white;
}
.first-up-fouFloor{
    width: 750px;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
.first-up-fouFloor-text{
    text-align: center;
    font-size: 36px;
    font-family: PingFangSC-Regular;
    color: white;
    margin-top:80px;
    padding-bottom: 250px;
}
.first-up-bottom{
    flex-direction: row;
    justify-content: center;
    align-items: center;
    width: 500px;
    height: 80px;
    /* margin-top: 100px; */
}
.first-up-bottom div{
    width: 62px;
    height: 78px;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
}
.pp-num,.c1-num,.ro-num{
    font-size:28px;
    font-family: PingFangSC-Regular;
    color: white;
    text-align: center;
}
.pp-name,.c1-name,.ro-name{
    font-size:24px;
    font-family: PingFangSC-Regular;
    color: rgba(255, 255, 255, 0.6);
    text-align: center;
}
.first-down{
    width: 750px;
    background-color: white;
}

</style>
