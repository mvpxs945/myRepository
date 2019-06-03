<template>
    <div class="wrapper" :style="objClass">
        <midea-header :title="'净水机'" bgColor="rgba(255,255,255,0)" :titleText="'#ffffff'" :isImmersion="true" :showRightImg="true" :showLeftImg="true" @leftImgClick="goBack" @rightImgClick="goMore"></midea-header>
        <div class="first-up" :style="upClass">
            <div class="first-up-firFloor">
                <text class="first-up-firFloor-text">{{water}}</text>
                <text class="first-up-firFloor-unit">升</text>
            </div>
            <div class="first-up-secFloor">
                <text class="first-up-secFloor-text">总净水量</text>
            </div>
            <div class="first-up-secFloor">
                <text class="first-up-tipFloor-text">(满10000L自动清零)</text>
            </div>
            <div class="first-up-thiFloor">
                <text class="first-up-thiFloor-text">{{status}}</text>
            </div>
            <div class="first-up-bottom">
                <div class="pp">
                    <text class="pp-num">{{filter.PPResidue}}%</text>
                    <text class="pp-name">PAC</text>
                </div>
                <div class="c1">
                    <text class="c1-num">{{filter.ROResidue}}%</text>
                    <text class="c1-name">RO</text>
                </div>
                <div class="ro">
                    <text class="ro-num">{{filter.CResidue}}%</text>
                    <text class="ro-name">CB</text>
                </div>
            </div>
        </div>
        <div class="first-down" :style="downClass">
            <div class="first-down-btn">
                    <image :src="washImg" style="width:112px;height:112px" @click="wash"></image>
                    <text class="first-down-btn-text">冲洗</text>
            </div>
        </div>
        <midea-dialog title="是否确定冲洗"
                            content="冲洗过程中您将无法操作机器"
                            mainBtnColor="rgb(38,122,255)"
                            :show="beforeShow"
                            @mideaDialogConfirmBtnClicked="mideaDialogConfirmBtnClicked1"
                            @mideaDialogCancelBtnClicked="mideaDialogCancelBtnClicked"
            ></midea-dialog>
            <midea-dialog title="是否取消冲洗"
                            :show="afterShow"
                            mainBtnColor="rgb(38,122,255)"
                            @mideaDialogConfirmBtnClicked="mideaDialogConfirmBtnClicked2"
                            @mideaDialogCancelBtnClicked="mideaDialogCancelBtnClicked"
            ></midea-dialog>
            <midea-dialog :title="errorTitle"
                            :content="errorInfo"
                            :show="errorShow"
                            confirmText="报修"
                            cancelText="返回"
                            mainBtnColor="rgb(38,122,255)"
                            @mideaDialogConfirmBtnClicked="mideaDialogConfirmBtnClicked3"
                            @mideaDialogCancelBtnClicked="mideaDialogCancelBtnClicked"
            ></midea-dialog>
    </div>
</template>
<script>
import nativeService from '@/common/services/nativeService';
import cmd from './common/cmd.js';
import mideaHeader from './components/header.vue';
import mideaDialog from '@/component/dialog.vue'
const globalEvent=weex.requireModule('globalEvent');
const stream=weex.requireModule('stream');

export default {
    components:{mideaHeader,
                mideaDialog,
    },
    data(){
        return {
            status:'',
            deviceId:0,//设备ID
            water:0,//总净水量
            filter:{
                    ROResidue:0,
                    CResidue:0,
                    PPResidue:0,
                    UFResidue:0,
            },
            height:1334,
            washImg:'./assets/img/ic_wash_on@2x.png',
            isWashing:false,
            beforeShow:false,//确认冲洗对话框
            afterShow:false,//取消冲洗对话框
            errorShow:false,
            errorTitle:"E2 通信故障",
            errorInfo:"电源板与显示板连接异常",
        }
    },
    methods: {
        goMore(){
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
        //冲洗功能
        mideaDialogConfirmBtnClicked1(){
            nativeService.showLoading();
            var self=this;
            nativeService.startCmdProcess("query",cmd.createQueryMessage(),function(res){
                if(typeof res=='string'){
                    var msg=JSON.parse(res);
                }else{
                    var msg=res;
                }
                nativeService.setItem('status',msg);
                if(cmd.conver2str(parseInt(msg[13],10))[5]==1){
                    nativeService.toast("制水过程中无法冲洗")
                }else{
                    nativeService.startCmdProcess("control",cmd.createControlWashMessage(),function(result) {
                    nativeService.hideLoading();
                    self.beforeShow=false;
                    self.status="冲洗中";
                    self.washImg='./assets/img/ic_wash_un@2x.png';
                    self.isWashing=true;
            },
            function(result) {
                nativeService.hideLoading()
                nativeService.toast("网络较差，请稍后重试");
            })

                }
            },function(res){
                nativeService.toast("网络较差，请稍后重试");
            })
        },
        // //取消冲洗
        mideaDialogConfirmBtnClicked2(){
            nativeService.showLoading();
            var self=this;
            nativeService.startCmdProcess("control",cmd.createCancelWashMessage(),function(res){
                nativeService.hideLoading();
                self.afterShow=false;
                self.status="待机中";
                self.washImg='./assets/img/ic_wash_on@2x.png';
                self.isWashing=false;
            },function(res){
                nativeService.hideLoading();
                nativeService.toast("网络较差，请稍后重试");
            })
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
        mideaDialogCancelBtnClicked(){
            this.beforeShow=this.afterShow=this.errorShow=false;
        },
        goBack(){
            nativeService.goBack();
        }
    },
    created() {
        this.height=Math.floor(750/this.$getConfig().env.deviceWidth*this.$getConfig().env.deviceHeight);
        var self=this;
        nativeService.showLoading();
        //获取deviveId
        nativeService.getDeviceInfo().then((res)=>{
            nativeService.setItem("device_id",res.result.deviceId);
            self.deviceId=res.result.deviceId;
            //保存当前设备状态到公共状态
            nativeService.startCmdProcess("query",cmd.createQueryMessage(),function(res){
                if(typeof res=='string'){
                    var msg=JSON.parse(res);
                }else{
                    var msg=res;
                }
                nativeService.setItem('status',res);
                self.filter.PPResidue=msg[26];
                self.filter.ROResidue=msg[27];
                self.filter.CResidue=msg[28];
                self.water=parseInt(msg[17],10)+parseInt(msg[18],10)*256;
                self.currentWater=parseInt(msg[17],10)+parseInt(msg[18],10)*256;
                if(parseInt(msg[26],10)<=5||parseInt(msg[27],10)<=5||parseInt(msg[28],10)<=5){
                    nativeService.alert("您的滤芯即将到期，请及时更换")
                }
                nativeService.hideLoading();
                analyze(msg);
            },function(res){
                nativeService.toast("网络较差，请稍后重试");
            })
        }).catch((err)=>{
            nativeService.hideLoading();
            nativeService.toast("获取设备信息失败")
        })
        //获取设备主动上报的信息
        globalEvent.addEventListener('receiveMessage',function(res){
            var msg=res.data.split(",");
            nativeService.setItem('status',res.data);
            analyze(msg);
            self.water=parseInt(msg[17],10)+parseInt(msg[18],10)*256;
        })
        //解析上报指令
        function analyze(msg){
            if(cmd.conver2str(parseInt(msg[24],10))[4]==1){
                self.errorTitle="E4 强制待机";
                self.errorInfo="制水工作时间过长";
                self.errorShow=true;
            }else if(cmd.conver2str(parseInt(msg[24],10))[5]==1){
                self.errorTitle="E2 通信故障";
                self.errorInfo="电源板与显示板连接异常";
                self.errorShow=true;
            }else if(cmd.conver2str(parseInt(msg[13],10))[6]==1){
                self.status="冲洗中";
                self.washImg='./assets/img/ic_wash_un@2x.png';
                self.isWashing=true;
            }else if(cmd.conver2str(parseInt(msg[13],10))[5]==1){
                self.status="制水中";
            }else if(cmd.conver2str(parseInt(msg[13],10))[6]==0&&cmd.conver2str(parseInt(msg[13],10))[5]==0){
                self.status="待机中";
                self.washImg='./assets/img/ic_wash_on@2x.png';
                self.isWashing=false;
            }
        }
    },
    mounted(){
    },
    computed:{
        //适配屏幕高度
        objClass:function(){
            return {height:this.height+'px'}
        },
        upClass:function(){
            return {height:this.height*0.62+'px'}
        },
        downClass:function(){
            return {height:this.height*0.31+'px'}
        }
    }
}
</script>

<style>
.wrapper{
    background-image: linear-gradient(to bottom, rgb(93,117,246),rgb(78,105,247));
}
.first-up{
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    width: 750px;
}
.first-up-firFloor{
    width: 750px;
    height: 250px;
    margin-top:60px;
    flex-direction: row;
    justify-content: center;
    align-items: flex-start;
}
.first-up-firFloor-text{
    font-size: 220px;
    font-family: Roboto-Light;
    color: white;
    padding-left: 40px;
}
.first-up-firFloor-unit{
    padding-top: 50px;
    color: white;
}
.first-up-secFloor{
    margin-top: -10px;
}
.first-up-secFloor-text{
    text-align: center;
    font-size: 36px;
    font-family: PingFangSC-Regular;
    color: white;
}
.first-up-tipFloor-text{
    text-align: center;
    font-size: 24px;
    font-family: PingFangSC-Regular;
    color: white;
}
.first-up-thiFloor{
    width: 260px;
    height: 50px;
    margin-top: 20px;
}
.first-up-thiFloor-text{
    width: 260px;
    text-align: center;
    font-size: 36px;
    font-family: PingFangSC-Regular;
    color: white;
}
.first-up-bottom{
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    width: 500px;
    height: 80px;
    margin-top: 40px;
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
    flex-direction: row;
    justify-content: center;
    align-items: center;
}
.first-down-btn{
    width: 112px;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
}
.first-down-btn-text{
    font-size: 28px;
    margin-top: 6px;
}
</style>
