<template>
    <div class="moreFunction" :style="{'height':height}">
        <midea-header :title="'更多功能'" :titleText="'#000000'" :bgColor="'#ffffff'" :isImmersion="true" :leftImg="'./assets/img/ic_menu_back_black_n2x.png'" :showRightImg="false" @leftImgClick="goBack"></midea-header>
        <midea-cell title="采暖开关"
                    :hasArrow="false"
                    style="margin-top:24px"
        ><midea-switch2 :checked="switchStatus"  @change="onMideachange()" slot="value"></midea-switch2>
        </midea-cell>
        <div class="cell" @click="goSmartTest">
            <text class="cell-text">智能体检</text>
            <image src="./assets/img/arrow_right.png" class="cell-img"></image>
        </div>
        <div class="cell" @click="goInstruction">
            <text class="cell-text">说明书</text>
            <image src="./assets/img/arrow_right.png" class="cell-img"></image>
        </div>
        <midea-dialog   :title="dialogTitle" :content="dialogContent" mainBtnColor="rgb(38,122,255)"  :show="errorShow" confirmText="电话报修"
                        @mideaDialogConfirmBtnClicked="mideaDialogConfirmBtnClicked3" 
                        @mideaDialogCancelBtnClicked="mideaDialogCancelBtnClicked2"></midea-dialog>
    </div>
</template>
<script>
import nativeService from '@/common/services/nativeService';
import cmd from './common/cmd.js'; 
import mideaCell from './components/cell.vue';
import mideaHeader from './components/mheader.vue';
import mideaDialog from '@/component/dialog.vue';
import mideaSwitch2 from '@/midea-component/switch2.vue';

export default {
    components:{
        mideaCell,
        mideaHeader,
        mideaDialog,
        mideaSwitch2
    },
    data(){
        return{
            status:{},
            height:1000,
            errorShow:false,
            dialogTitle:"",
            dialogContent:"",
            switchStatus:false,
        }
    },
    methods:{
        goBack(){
            nativeService.goBack()
        },
        goSmartTest(){
            nativeService.goTo("smartTest.js");
        },
        goInstruction(){
            nativeService.goTo("instruction.js");
        },
        mideaDialogConfirmBtnClicked3(){
            this.errorShow=false;
            nativeService.callTel({
                operation:"callTel",
                tel:4008899315,
                title:"客户服务",
                desc:"拨打热线电话：400-889-9315",
            }).then((res)=>{

            }).catch((err)=>{
                
            })
        },
        mideaDialogCancelBtnClicked2(){
            this.errorShow=false;
            nativeService.goTo("errorInfo.js");
        },
        onMideachange(){
            nativeService.showLoading();
            if(this.switchStatus==true){
                this.sendHeratingSwitch(0);
            }else{
                this.sendHeratingSwitch(1);
            }
        },
        sendHeratingSwitch(index){
            var self=this;
            nativeService.startCmdProcess("control",cmd.offHeating(index),function(res){
                self.status=cmd.analyse(res);
                self.initStatus();
                nativeService.hideLoading();
            },function(res){
                self.initStatus();
                nativeService.hideLoading();
                nativeService.toast("网络较差，请稍后重试");
            }) 
        },
        initStatus(){
            var self=this;
            nativeService.showLoading();
            nativeService.startCmdProcess("query",cmd.queryStatus(),function(res){
                self.status=cmd.analyse(res);
                if(self.status.summerMode==0){
                    self.switchStatus=true;
                }else if(self.status.summerMode==1){
                    self.switchStatus=false;
                }
                nativeService.hideLoading();
            },function(res){
                nativeService.hideLoading();
                nativeService.toast("网络较差，请稍后重试");
            })
            //故障检测
            switch(parseInt(self.status.error)){
                case 0:
                break;
                case 1:
                self.dialogTitle="故障码：E1";
                self.dialogContent="点火失败";
                self.errorShow=true;
                break;
                case 2:
                self.dialogTitle="故障码：E1";
                self.dialogContent="意外熄火";
                self.errorShow=true;
                break;
                case 3:
                self.dialogTitle="故障码：E2";
                self.dialogContent="伪火";
                self.errorShow=true;
                break;
                case 4:
                self.dialogTitle="故障码：E2";
                self.dialogContent="残火";
                self.errorShow=true;
                break;
                case 5:
                self.dialogTitle="故障码：E3";
                self.dialogContent="机械温控器过热保护故障";
                self.errorShow=true;
                break;
                case 6:
                self.dialogTitle="故障码：E4";
                self.dialogContent="采暖出水温度探头过热保护";
                self.errorShow=true;
                break;
                case 7:
                self.dialogTitle="故障码：E5";
                self.dialogContent="风压故障或风机故障";
                self.errorShow=true;
                break;
                case 8:
                self.dialogTitle="故障码：E6";
                self.dialogContent="电磁阀驱动电路故障";
                self.errorShow=true;
                break;
                case 9:
                self.dialogTitle="故障码：E7";
                self.dialogContent="水压故障";
                self.errorShow=true;
                break;
                case 10:
                self.dialogTitle="故障码：E8";
                self.dialogContent="水泵卡死";
                self.errorShow=true;
                break;
                case 11:
                self.dialogTitle="故障码：F0";
                self.dialogContent="供暖出水温度传感器短路";
                self.errorShow=true;
                break;
                case 12:
                self.dialogTitle="故障码：F0";
                self.dialogContent="供暖出水温度传感器断路";
                self.errorShow=true;
                break;
                case 13:
                self.dialogTitle="故障码：F2";
                self.dialogContent="结冰故障";
                self.errorShow=true;
                break;
                case 14:
                self.dialogTitle="故障码：F3";
                self.dialogContent="卫浴出水温度传感器短路";
                self.errorShow=true;
                break;
                case 15:
                self.dialogTitle="故障码：F3";
                self.dialogContent="卫浴出水温度传感器断路";
                self.errorShow=true;
                break;
                case 16:
                self.dialogTitle="故障码：F4";
                self.dialogContent="供暖出水温度异常,探头脱落";
                self.errorShow=true;
                break;
                case 17:
                self.dialogTitle="故障码：F4";
                self.dialogContent="卫浴出水温度异常,探头脱落";
                self.errorShow=true;
                break;
                case 18:
                self.dialogTitle="故障码：EF";
                self.dialogContent="冷凝水堵塞";
                self.errorShow=true;
                break;
                case 19:
                self.dialogTitle="故障码：FE";
                self.dialogContent="燃气泄漏故障";
                self.errorShow=true;
                break;
                case 20:
                self.dialogTitle="故障码：EC";
                self.dialogContent="主板和显示板通信失败";
                self.errorShow=true;
                break;
                case 21:
                self.dialogTitle="故障码：EE";
                self.dialogContent="卫浴超时";
                self.errorShow=true;
                break;
                case 22:
                self.dialogTitle="故障码：EA";
                self.dialogContent="CO报警";
                self.errorShow=true;
                break;
            }
        }
    },
    created() {
       this.height=Math.floor(750/this.$getConfig().env.deviceWidth*this.$getConfig().env.deviceHeight);
       this.initStatus();
    },
}
</script>
<style>
.moreFunction{
    background-color:rgb(242, 242, 242)
}
.cell{
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 750px;
    height: 100px;
    padding-left: 34px;
    padding-right: 34px;
    margin-top: 24px;
    background-color: white;
}
.cell-text{
    font-size: 30px;
    color: #333333;
}
.cell-img{
    height: 50px;
    width: 46px;
}
</style>


