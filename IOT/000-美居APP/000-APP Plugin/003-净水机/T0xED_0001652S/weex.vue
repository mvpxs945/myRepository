<template>
    <div class="wrapper" :style="objClass">
        <midea-header :title="'净饮机'" bgColor="rgba(255,255,255,0)" :titleText="'#ffffff'" :isImmersion="true" :showRightImg="true" :showLeftImg="true" @leftImgClick="goBack" @rightImgClick="goMore"></midea-header>
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
            <div class="first-up-tirFloor">
                <text class="first-up-tirFloor-text">{{status}}</text>
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
const globalEvent=weex.requireModule('globalEvent');
const stream=weex.requireModule('stream');

export default {
    components:{mideaHeader,
                mideaDialog,
                mideaCell
    },
    data(){
        return {
            status:'',
            deviceId:0,//设备ID
            water:0,
            filterList:[
                {name:"PPC滤芯",text:0},
                {name:"前置PPC滤芯",text:0},
                {name:"RO滤芯",text:0},
                {name:"后置PPC滤芯",text:0},
            ],
            // filterArr:[0,0,0,0],
            height:1334,
            washImg:'./assets/img/ic_wash_on@2x.png',
            errorShow:false,
            errorTitle:"",
            errorInfo:"",
            filterShow:false,
            overTip:"",
        }
    },
    methods: {
        goMore(){
            nativeService.goTo("moreFunction.js");
        },
        mideaDialogConfirmBtnClicked2(){
            this.filterShow=false;
            nativeService.jumpNativePage({
                "pageName": "electronicBusinessPage", 
                "url":"https://m.midea.cn/promote/w/build/index/aWwTfmdaS0xQ9MTEzNw?__sus=d/dRBtBo6DDFRVhvzKER8WC5iyAsZVPh21X/dhWKO3NAKU1BEvW+/zLi7JlFANTZc4NgA4Zm/r+3sY2bxrOCVg==&__smkey=fae255eb0a876001a1338ed6386560e&__cmkey=&__user_flag=1&__cus=&__fromuid=34519512&from=singlemessage"
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
            this.errorShow=this.filterShow=false;
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
                //更新滤芯寿命
                self.water=parseInt(msg[17],10)+parseInt(msg[18],10)*256;
                filterSwitch(parseInt(msg[35],10)+parseInt(msg[36],10)*256,1000,1);
                filterSwitch(parseInt(msg[37],10)+parseInt(msg[38],10)*256,1000,2);
                filterSwitch(parseInt(msg[39],10)+parseInt(msg[40],10)*256,2000,3);
                filterSwitch(parseInt(msg[41],10)+parseInt(msg[42],10)*256,1000,4);
                nativeService.setItem('filterLife',self.filterList);
                if(self.filterList[0].text<=5||self.filterList[1].text<=5||self.filterList[2].text<=5||self.filterList[3].text<=5){
                    if(self.filterList[0].text==0||self.filterList[1].text==0||self.filterList[2].text==0||self.filterList[3].text==0){
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
            self.water=parseInt(msg[17],10)+parseInt(msg[18],10)*256;
            analyze(msg);
        })
        //解析上报指令
        function analyze(msg){
            if(cmd.conver2str(parseInt(msg[23],10))[3]==1){
                self.errorTitle="热水传感器开路";
                self.errorInfo="热水传感器连接线故障，或热水器传感器损坏";
                self.status="故障中";
                self.errorShow=true;
            }else if(cmd.conver2str(parseInt(msg[23],10))[4]==1){
                self.errorTitle="热水传感器短路";
                self.errorInfo="热水传感器连接线故障，或热水器传感器损坏";
                self.status="故障中";
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
        //通过滤芯水量转换为滤芯寿命
        function filterSwitch(real,max,num){
            switch (num){
                case 1:
                self.filterList[0].text=parseInt((max-real)/max*100,10)>0?parseInt((max-real)/max*100,10):0
                case 2:
                self.filterList[1].text=parseInt((max-real)/max*100,10)>0?parseInt((max-real)/max*100,10):0
                case 3:
                self.filterList[2].text=parseInt((max-real)/max*100,10)>0?parseInt((max-real)/max*100,10):0
                case 4:
                self.filterList[3].text=parseInt((max-real)/max*100,10)>0?parseInt((max-real)/max*100,10):0
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
.first-up-firFloor{
    width: 750px;
    height: 250px;
    margin-top:120px;
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
.first-up-tirFloor{
    padding-top: 80px;
}
.first-up-tirFloor-text{
    width: 260px;
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
