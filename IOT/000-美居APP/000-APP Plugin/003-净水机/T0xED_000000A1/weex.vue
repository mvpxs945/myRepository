<template>
    <div class="wrapper" :style="objClass">
        <midea-header :title="'净水机'" bgColor="rgba(255,255,255,0)" :titleText="'#ffffff'" :isImmersion="true" :showRightImg="true" :showLeftImg="true" @leftImgClick="goBack" @rightImgClick="goMore"></midea-header>
        <div class="first-up" :style="upClass">
            <div class="first-up-firFloor">
                <text class="first-up-firFloor-text">{{status}}</text>
            </div>
            <div class="first-up-bottom">
                <div class="pp">
                    <text class="pp-num">{{PACResidue}}%</text>
                    <text class="pp-name">PAC</text>
                </div>
                <div class="c1">
                    <text class="c1-num">{{ROResidue}}%</text>
                    <text class="c1-name">RO</text>
                </div>
                <div class="ro">
                    <text class="ro-num">{{CResidue}}%</text>
                    <text class="ro-name">C</text>
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
            ROResidue:0,
            CResidue:0,
            PACResidue:0,
            height:1334,
            washImg:'./assets/img/ic_wash_on@2x.png',
            isWashing:false,
            beforeShow:false,//确认冲洗对话框
            afterShow:false,//取消冲洗对话框
            errorShow:false,
            errorTitle:"E2 通信故障",
            errorInfo:"电源板与显示板连接异常",
            filterShow:false,
            overTip:"",
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
                self.PACResidue=msg[26];
                self.ROResidue=msg[27];
                self.CResidue=msg[28];
                if(parseInt(msg[26],10)<=5||parseInt(msg[27],10)<=5||parseInt(msg[28],10)<=5){
                    if(parseInt(msg[26],10)==0||parseInt(msg[27],10)==0||parseInt(msg[28],10)==0){
                        self.overTip="您的滤芯到期，请及时更换"
                        self.filterShow=true;
                    }else{
                        self.overTip="您的滤芯即将到期，请及时更换"
                        self.filterShow=true;
                    }
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
    width: 260px;
    height: 50px;
}
.first-up-firFloor-text{
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
    margin-bottom: 120px;
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
