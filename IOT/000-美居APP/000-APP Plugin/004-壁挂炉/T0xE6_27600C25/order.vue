<template>
    <div class="wrapper" :style="{'height':height}" @viewappear="viewappear">
        <midea-header :title="'采暖预约'" :isImmersion="true" :bgColor="'white'" :titleText="'black'" :leftImg="leftImg" :rightText="rightText" :showRightText="false" :showLeftImg="true" @leftImgClick="goBack"></midea-header>
        <scroller >
            <!-- <midea-header :title="'采暖预约'" :isImmersion="true" :bgColor="'white'" :titleText="'black'" :leftImg="leftImg" :rightText="rightText" :showRightText="true" :showLeftImg="true" @leftImgClick="goBack" @rightTextClick="editOrder"></midea-header> -->
            <div v-for="(item,i) in orderList" :key="i" >
                <midea-cell  height="160" :title="item.title" :desc="item.desc" :hasArrow="false" @mideaCellClick="goEdit(i)">
                    <midea-switch2 :checked="orderList[i].status"  @change="onMideachange(i)" slot="value"></midea-switch2>
                </midea-cell>
            </div>
        </scroller>
        <midea-dialog   title="提示" content="最多添加四个采暖预约" single="true" mainBtnColor="rgb(38,122,255)"  :show="tipShow"
                            @mideaDialogConfirmBtnClicked="mideaDialogConfirmBtnClicked" 
            ></midea-dialog>
        <div class="bottom" @click="addOrder">
            <text class="bottom-text"> 添加预约</text>
        </div>
    </div>
</template>

<style>
.wrapper{
    background-color: rgb(242,242,242);
    width: 750px;
    /* flex-direction: column;
    justify-content: space-between;
    align-items: center; */
}
.bottom{
    width: 750px;
    height: 96px;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    background-color: white;
}
.bottom-text{
    font-size: 32px;
    font-family: PingFangSC-Regular;
    color:rgb(38,122,255)
}
</style>

<script>
import nativeService from '@/common/services/nativeService';
import cmd from './common/cmd.js';
import base from './base';
import mideaHeader from './components/mheader.vue';
import mideaDialog from '@/component/dialog.vue';
import mideaCell from './components/cell.vue';
import mideaSwitch2 from '@/midea-component/switch2.vue';
const stream=weex.requireModule('stream');

export default {
    components:{
        mideaHeader,
        mideaDialog,
        mideaCell,
        mideaSwitch2
    },
    mixins: [base],
    data(){
        return{
            height:750 / weex.config.env.deviceWidth * weex.config.env.deviceHeight,
            upHeight:0,
            leftImg:"./assets/img/ic_menu_back_black_n2x.png",
            rightText:"编辑",
            orderList:[],
            backOrderList:[],//保存获取到的预约列表的原始数据
            switchChecked:true,
            tipShow:false,
        }
    },
    methods:{
        goBack(){
            nativeService.goBack({ viewTag: 'rootView' });
        },
        addOrder(){
            // if(this.orderList.length>=4){
            //     this.tipShow=true;
            // }else{
            //     nativeService.goTo("addOrder.js")
            // }
            nativeService.goTo("addOrder.js");
        },
        goEdit(i){
            nativeService.setItem("orderNum",i);
            nativeService.goTo("editOrder.js");
        },
        onMideachange(i){
            nativeService.showLoading();
            this.enableOrder(i);
        },
        mideaDialogConfirmBtnClicked(){
            this.tipShow=false;
        },
        enableOrder(i){
            var self=this;
            nativeService.getDeviceInfo().then((res)=>{
                var id=res.result.deviceId;
                var sn=res.result.deviceSn8;
                self.backOrderList[i].enable=!self.backOrderList[i].enable;
                stream.fetch({
                    method: 'POST',
                    url: "http://api.midea-hotwater.com:13145/e6/v1/api",
                    type: 'json',
                    headers: { 'Content-Type': 'application/json' },
                    body:{
                        'msg':"taskReservation",
                        'params':{
                            'applianceId':id,
                            'platform':sn,
                            'action':'update',
                            'task':[
                                self.backOrderList[i]
                            ]
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
        getOrderList(){
            var self=this;
            nativeService.getDeviceInfo().then((res)=>{
                var id=res.result.deviceId;
                var sn=res.result.deviceSn8;
                stream.fetch({
                    method: 'POST',
                    url: "http://api.midea-hotwater.com:13145/e6/v1/api",
                    type: 'json',
                    headers: { 'Content-Type': 'application/json' },
                    body:{
                        'msg':"taskReservation",
                        'params':{
                            'applianceId':id,
                            'platform':sn,
                            'action':'getAll',
                            'task':[

                            ]
                        }
                    }
                },function(res){
                    nativeService.hideLoading();
                    if(res.ok){
                        var orderArr=new Array();
                        var arr=res.data.result;
                        self.backOrderList=arr;
                        for(var i=0;i<arr.length;i++){
                            var obj={};
                            obj.status=arr[i].enable;
                            obj.title=arr[i].startTime+'-'+arr[i].endTime+' '+' '+arr[i].temp+'℃';
                            obj.desc=self.changeWeek(arr[i].week);
                            obj.id=arr[i].taskId;
                            orderArr.push(obj);
                        }
                        self.orderList=orderArr;
                    }
                },function(error){
                    nativeService.hideLoading();
                })
            }).catch((err)=>{
                nativeService.hideLoading();
                nativeService.toast("获取设备信息失败")
            })
        },
        //刷新order列表
        viewappear(){
            this.getOrderList();
        },
        //周字符串转换为周描述语言
        changeWeek(str){
            var arr=str.split(',');
            var str1='';
            if(arr.length==7){
                str1='每日';
            }else{
                for(var i=0;i<arr.length;i++){
                    switch(arr[i]){
                        case '0':
                        str1=str1+'周日 ';
                        break;
                        case '1':
                        str1=str1+'周一 ';
                        break;
                        case '2':
                        str1=str1+'周二 ';
                        break;
                        case '3':
                        str1=str1+'周三 ';
                        break;
                        case '4':
                        str1=str1+'周四 ';
                        break;
                        case '5':
                        str1=str1+'周五 ';
                        break;
                        case '6':
                        str1=str1+'周六 ';
                        break;
                    }
                }
            }
            return str1;
        }
    },
    created(){
        var self=this;
        // self.height=Math.floor((750/self.$getConfig().env.deviceWidth*self.$getConfig().env.deviceHeight/2))*2;
        self.upHeight=self.height-96;
        nativeService.showLoading();
        self.getOrderList();
    },
}
</script>

