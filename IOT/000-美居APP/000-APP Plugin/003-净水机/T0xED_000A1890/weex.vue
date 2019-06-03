<template>
    <div class="wrapper" :style="objClass">
        <midea-header :title="'净水机'" bgColor="rgba(255,255,255,0)" :titleText="'#ffffff'" :isImmersion="true" :showRightImg="true" :showLeftImg="true" @leftImgClick="goBack" @rightImgClick="goMore"></midea-header>
        <div class="first-up" :style="upClass">
            <div class="first-up-firstFloor">
                <text class="first-up-firstFloor-text">{{TDS}}</text>
                <text class="first-up-firstFloor-unit">mg/L</text>
            </div>
            <div class="first-up-secFloor">
                <text class="first-up-secFloor-text">出水TDS值</text>
            </div>
            <div class="first-up-thiFloor">
                <text class="first-up-thiFloor-text">{{status}}</text>
            </div>
        </div>
        <div class="first-down" :style="downClass">
            <midea-cell v-for="(item,i) in filterList" :key="i"
                    :title="item.name"
                    :rightText="'约剩余'+item.text+'%'"
            ></midea-cell>
        </div>
        <midea-dialog   :title="errorTitle"
                        :content="errorInfo"
                        :show="errorShow"
                        confirmText="报修"
                        cancelText="返回"
                        mainBtnColor="rgb(38,122,255)"
                        @mideaDialogConfirmBtnClicked="mideaDialogConfirmBtnClicked1"
                        @mideaDialogCancelBtnClicked="mideaDialogCancelBtnClicked"
        ></midea-dialog>
        <midea-dialog   title="滤芯到期"
                        :content="overTip"
                        :show="filterShow"
                        confirmText="购买"
                        cancelText="返回"
                        mainBtnColor="rgb(38,122,255)"
                        @mideaDialogConfirmBtnClicked="mideaDialogConfirmBtnClicked2"
                        @mideaDialogCancelBtnClicked="mideaDialogCancelBtnClicked"
        ></midea-dialog>
    </div>
</template>
<script>
import nativeService from '@/common/services/nativeService';
import cmd from './common/cmd.js';
import mideaHeader from './components/header.vue';
import mideaDialog from '@/component/dialog.vue';
import mideaCell from './components/cell.vue';
var globalEvent=weex.requireModule('globalEvent');

export default {
    components:{mideaHeader,
                mideaDialog,
                mideaCell
    },
    data(){
        return {
            TDS:0,
            status:'待机中',
            deviceId:0,
            filterList:[
                {name:"FIST滤芯",text:0},
            ],
            height:1334,
            errorTitle:"",
            errorInfo:"",
            errorShow:false,
            filterShow:false,
            overTip:"您的滤芯即将到期，请及时更换",
        }
    },
    methods: {
        goMore(){
            nativeService.goTo("moreFunction.js");
        },
        goBack(){
            nativeService.goBack();
        },
        mideaDialogConfirmBtnClicked1(){
            nativeService.callTel({
                operation:"callTel",
                tel:4008899315,
                title:"客户服务",
                desc:"拨打热线电话：400-889-9315",
            }).then((res)=>{

            }).catch((err)=>{
                
            })
        },
        mideaDialogConfirmBtnClicked2(){
            this.filterShow=false;
            nativeService.jumpNativePage({
                "pageName": "electronicBusinessPage", 
                "url":"https://m.midea.cn/promote/w/build/index/aWwTfmdaS0xQ9MTEzNw?__sus=d/dRBtBo6DDFRVhvzKER8WC5iyAsZVPh21X/dhWKO3NAKU1BEvW+/zLi7JlFANTZc4NgA4Zm/r+3sY2bxrOCVg==&__smkey=fae255eb0a876001a1338ed6386560e&__cmkey=&__user_flag=1&__cus=&__fromuid=34519512&from=singlemessage"
            })
        },
        mideaDialogCancelBtnClicked(){
            this.errorShow=this.filterShow=false;
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
                self.TDS=parseInt(msg[48],10)+parseInt(msg[49],10)*256;
                self.filterList[0].text=msg[26];
                if(parseInt(msg[26],10)<=5){
                    if(parseInt(msg[26],10)==0){
                        self.overTip="您的滤芯到期，请及时更换"
                        self.filterShow=true;
                    }else{
                        self.overTip="您的滤芯即将到期，请及时更换"
                        self.filterShow=true;
                    }
                }
                analyze(msg);
                nativeService.hideLoading();
            },function(res){
                nativeService.hideLoading();
                nativeService.toast("网络较差，请稍后重试");
            })
        }).catch((err)=>{
            nativeService.hideLoading();
            nativeService.toast("获取设备信息失败!")
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
                self.status="故障中";
            }else if(cmd.conver2str(parseInt(msg[24],10))[5]==1){
                self.errorTitle="E2 通信故障";
                self.errorInfo="电源板与显示板连接异常";
                self.errorShow=true;
                self.status="故障中";
            }else if(cmd.conver2str(parseInt(msg[13],10))[6]==1){
                self.status="冲洗中";
                self.washImg='./assets/img/ic_wash_un@2x.png';
                self.isWashing=true;
                self.TDS=0;
            }else if(cmd.conver2str(parseInt(msg[13],10))[5]==1){
                self.status="制水中";
                self.TDS=parseInt(msg[48],10)+parseInt(msg[49],10)*256;
            }else if(cmd.conver2str(parseInt(msg[13],10))[6]==0&&cmd.conver2str(parseInt(msg[13],10))[5]==0){
                self.status="待机中";
                self.washImg='./assets/img/ic_wash_on@2x.png';
                self.isWashing=false;
                self.TDS=0;
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
            return {height:this.height*0.58+'px'}
        },
        downClass:function(){
            return {height:this.height*0.35+'px'}
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
    justify-content: flex-start;
    align-items: center;
    width: 750px;
}
.first-up-firstFloor{
    width: 750px;
    height: 250px;
    margin-top:120px;
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
.first-up-thiFloor{
    padding-top:80px;
}
.first-up-thiFloor-text{
    text-align: center;
    font-size: 36px;
    font-family: PingFangSC-Regular;
    color: white;
}
.first-down{
    width: 750px;
    background-color: white;
}
</style>
