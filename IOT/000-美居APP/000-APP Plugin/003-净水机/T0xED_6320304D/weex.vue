<template>
    <div class="wrapper" :style="objClass">
        <div class="first-up" :style="upClass">
            <midea-header :title="'净水机'" :bgColor="'rgba(255,255,255,0)'" :titleText="'#ffffff'" :isImmersion="true" :showRightImg="true" :showLeftImg="true" @leftImgClick="goBack" @rightImgClick="goMore"></midea-header>
            <div class="first-up-firstFloor">
                <div class="firstFloor-wrapper">
                    <text class="first-up-firstFloor-text">{{totalWater}}</text>
                    <text class="first-up-firstFloor-unit">升</text>
                </div>
                <text class="first-up-secFloor-text">净水总量</text>
            </div>
            <div class="first-up-thiFloor">
                <text class="first-up-thiFloor-text">{{status}}</text>
            </div>
            <div class="first-up-bottom">
                <div class="bottom-wrapper" v-for="(item,i) in filterList" :key="i">
                    <text class="bottom-life">{{item.text}}%</text>
                    <text class="bottom-text">{{item.name}}</text>
                </div>
                
            </div>
            <div style="width:750px;height:150px;"></div>
        </div>
        <div class="first-down" :style="downClass">
            <div class="first-down-btn">
                    <image :src="washImg" style="width:112px;height:112px" @click="wash"></image>
                    <text class="first-down-btn-text">冲洗</text>
            </div>
        </div>
        <div class="ipx" v-if="isipx"></div>
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
        <midea-dialog :title="washTitle"
                            :content="washContent"
                            mainBtnColor="rgb(38,122,255)"
                            :show="washShow"
                            @mideaDialogConfirmBtnClicked="mideaDialogConfirmBtnClicked3"
                            @mideaDialogCancelBtnClicked="mideaDialogCancelBtnClicked"
            ></midea-dialog>
    </div>
</template>
<script>
import nativeService from '@/common/services/nativeService';
import cmd from './common/cmd.js';
import mideaHeader from './components/header.vue';
import mideaDialog from './components/dialog.vue';
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
            totalWater:0,
            status:'待机中',
            deviceId:0,
            deviceSn:0,
            filterList:[
                {name:"PP滤芯",text:0},
                {name:"C'+C\"滤芯",text:0},
                {name:"RO滤芯",text:0},
            ],
            height:1334,
            errorTitle:"",
            errorInfo:"",
            errorShow:false,
            filterShow:false,
            overTip:"",
            washTitle:'',
            washContent:'',
            washShow:false,
            isWashing:false,
            washImg:"./assets/img/ic_wash_on@2x.png"
        }
    },
    methods: {
        goMore(){
            // cmd.dataReport('KH_0xED_63202029','event','go_moreFunction','weex',this.deviceSn,{});//埋点
            nativeService.goTo("moreFunction.js");
        },
        goBack(){
            nativeService.goBack();
        },
        wash(){
            if(this.isWashing==false){
                this.washTitle="是否确定冲洗？";
                this.washContent="";
                this.washShow=true;
            }
            else{
                this.washTitle="是否确定取消冲洗？";
                this.washContent="";
                this.washShow=true;
            }
        },
        //客服电话
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
        //购买链接
        mideaDialogConfirmBtnClicked2(){
            this.filterShow=false;
            nativeService.jumpNativePage({
                "pageName": "electronicBusinessPage", 
                "url":"https://m.midea.cn/promote/w/build/index/aWwTfmdaS0xQ9MTEzNw?__sus=d/dRBtBo6DDFRVhvzKER8WC5iyAsZVPh21X/dhWKO3NAKU1BEvW+/zLi7JlFANTZc4NgA4Zm/r+3sY2bxrOCVg==&__smkey=fae255eb0a876001a1338ed6386560e&__cmkey=&__user_flag=1&__cus=&__fromuid=34519512&from=singlemessage"
            })
        },
        //冲洗
        mideaDialogConfirmBtnClicked3(){
            nativeService.showLoading();
            var self=this;
            nativeService.startCmdProcess("query",cmd.createQueryMessage(),function(res){
                if(typeof res=='string'){
                    var msg=JSON.parse(res);
                }else{
                    var msg=res;
                }
                nativeService.setItem('status',msg);
                if(self.isWashing==true){
                    nativeService.startCmdProcess("control",cmd.createCancelWashMessage(),function(res){
                        nativeService.hideLoading();
                        self.washShow=false;
                        self.status="待机中";
                        self.washImg='./assets/img/ic_wash_on@2x.png';
                        self.isWashing=false;
                    },function(res){
                        nativeService.hideLoading();
                        nativeService.toast("网络较差，请稍后重试");
                    })
                }else{
                    if(cmd.conver2str(parseInt(msg[13],10))[5]==1){
                        nativeService.hideLoading();
                        self.washShow=false;
                        nativeService.toast("制水过程中无法冲洗")
                    }else{
                        nativeService.startCmdProcess("control",cmd.createControlWashMessage(),function(result) {
                        nativeService.hideLoading();
                        self.washShow=false;
                        self.status="冲洗中";
                        self.washImg='./assets/img/ic_wash_un@2x.png';
                        self.isWashing=true;
                        },
                        function(result) {
                            nativeService.hideLoading()
                            nativeService.toast("网络较差，请稍后重试");
                        })
                    }
                }
                    
            },function(res){
                nativeService.toast("网络较差，请稍后重试");
            })
        },
        mideaDialogCancelBtnClicked(){
            this.errorShow=this.filterShow=this.washShow=false;
        },
        //ajax获取净水总量
        getTotal(deviceId){
            var self=this;
            stream.fetch({
                method: 'POST',
                url: "http://api.midea-hotwater.com:13145/ed/v1/api",
                type: 'json',
                headers: { 'Content-Type': 'application/json' },
                body:{
                    'msg':"PureWaterConsumption",
                    'params':{
                        'applianceId':deviceId,
                        'queryType':'total',
                    }
                }
            },function(res){
                self.totalWater=parseInt(res.data.result.yWater);
            },function(error){
                // nativeService.alert(error);
            })
        },
    },
    created() {
        this.height=Math.floor(750/this.$getConfig().env.deviceWidth*this.$getConfig().env.deviceHeight);
        if(this.isipx){
            this.height=parseInt(this.height,10)-68;
        }
        var self=this;
        nativeService.showLoading();
        //获取deviveId
        nativeService.getDeviceInfo().then((res)=>{
            nativeService.setItem("device_id",res.result.deviceId);
            nativeService.setItem("device_sn",res.result.deviceSn);
            self.deviceId=res.result.deviceId;
            self.deviceSn=res.result.deviceSn;
            self.getTotal(self.deviceId);
            // cmd.dataReport('KH_0xED_63202029','view','page_view','weex',res.result.deviceSn,{});//埋点
            //保存当前设备状态到公共状态
            nativeService.startCmdProcess("query",cmd.createQueryMessage(),function(res){
                if(typeof res=='string'){
                    var msg=JSON.parse(res);
                }else{
                    var msg=res;
                }
                nativeService.setItem('status',res);
                self.filterList[0].text=msg[26];
                self.filterList[1].text=msg[27];
                self.filterList[2].text=msg[28];
                if(parseInt(msg[26],10)<=5||parseInt(msg[27],10)<=5||parseInt(msg[28],10)<=5){
                    if(parseInt(msg[26],10)==0||parseInt(msg[27],10)==0||parseInt(msg[28],10)==0){
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
                self.errorTitle="E6 强制待机";
                self.errorInfo="制水工作时间过长";
                self.errorShow=true;
            }else if(cmd.conver2str(parseInt(msg[24],10))[5]==1){
                self.errorTitle="E5 通信故障";
                self.errorInfo="电源板与显示板连接异常";
                self.errorShow=true;
            }else if(cmd.conver2str(parseInt(msg[13],10))[6]==1){
                self.status="冲洗中";
                self.washImg='./assets/img/ic_wash_un@2x.png';
                self.isWashing=true;
                self.TDS=0;
            }else if(cmd.conver2str(parseInt(msg[13],10))[5]==1){
                self.status="制水中";
                self.washImg='./assets/img/ic_wash_on@2x.png';
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
        isipx: function () {
            return weex && (
                weex.config.env.deviceModel === 'iPhone10,3' || weex.config.env.deviceModel === 'iPhone10,6' //iphoneX
                || weex.config.env.deviceModel === 'iPhone11,8' //iPhone XR
                || weex.config.env.deviceModel === 'iPhone11,2' //iPhone XS
                || weex.config.env.deviceModel === 'iPhone11,4' || weex.config.env.deviceModel === 'iPhone11,6' //iPhone XS Max
                );
        },
        //适配屏幕高度
        objClass:function(){
            return {height:this.height+'px'}
        },
        upClass:function(){
            return {height:this.height*0.81+'px'}
        },
        downClass:function(){
            return {height:this.height*0.195+'px'};
        },
    }
}
</script>

<style>
.wrapper{
    background-image: linear-gradient(to bottom, rgb(93,117,246),rgb(78,105,247));
}
.first-up{
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    width: 750px;
}
.first-up-firstFloor{
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
.firstFloor-wrapper{
    width: 750px;
    height: 250px;
    flex-direction: row;
    justify-content: center;
    align-items: flex-start;
}
.first-up-firstFloor-text{
    font-size: 220px;
    font-family: Roboto-Light;
    /* font-weight: light; */
    color: white;
    padding-left: 30px;
}
.first-up-firstFloor-unit{
    color: white;
    padding-top: 40px;
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
}
.first-up-thiFloor-text{
    text-align: center;
    font-size: 36px;
    font-family: PingFangSC-Regular;
    color: white;
}
.first-up-bottom{
    width: 450px;
    height: 78px;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
}
.bottom-wrapper{
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
.bottom-text{
    font-size:24px;
    font-family: PingFangSC-Regular;
    color: rgba(255, 255, 255, 0.6);
    text-align: center;
}
.bottom-life{
    font-size:28px;
    font-family: PingFangSC-Regular;
    color: white;
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
    margin-top: 16px;
}
.ipx{
    width: 750px;
    height: 68px;
    background-color: white;
}
</style>
