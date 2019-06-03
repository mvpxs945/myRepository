<template>
    <div class="wrapper" :style="{'height':height}">
        <div class="up">
            <midea-header :title="'更改预约'" :isImmersion="true" :bgColor="'white'" :titleText="'black'" :leftImg="leftImg" :rightText="rightText" :showRightText="true" :showLeftImg="true" @leftImgClick="goBack" @rightTextClick="saveOrder"></midea-header>
            <div>
                <text class="title">采暖温度</text>
                <midea-cell :title="temperature" :cellStyle="{'padding-left':'32px'}" :hasTopBorder="true" @mideaCellClick="pickTemperature"></midea-cell>
            </div>
            <div>
                <text class="title">开始时间</text>
                <midea-cell :title="startTime" :cellStyle="{'padding-left':'32px'}"  @mideaCellClick="pickStartTime"></midea-cell>
            </div>
            <div>
                <text class="title">结束时间</text>
                <midea-cell :title="endTime" :cellStyle="{'padding-left':'32px'}"  @mideaCellClick="pickEndTime"></midea-cell>
            </div>
            <div>
                <text class="title">重复</text>
                <div class="chooseWeek">
                    <div v-for="(item,index) in week" :key="index" class="tab-item" @click="tabClicked(index)">
                        <text class="tab-txt" :class="[item.selected?'tab-txt-selected':'']">{{item.title}}</text>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style>
.wrapper{
    background-color: rgb(242,242,242);
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
}
.title{
    width: 750px;
    height: 90px;
    font-size: 28px;
    padding-top: 31px;
    padding-left: 32px;
    color: gray;
}
.chooseWeek{
    width: 750px;
    height: 100px;
    background-color: white;
    flex-direction: row;
    align-items: center;
    justify-content: center;
}
.tab-item{
    flex: 1;
    flex-direction: row;
    align-items: center;
    justify-content: center;
}
.tab-txt{
    width: 56px;
    height: 56px;
    border-style:solid;
    border-width: 1px;
    border-color: white;
    border-radius: 28px;
    font-size: 28px;
    font-family: PingFangSC-Medium;
    text-align: center;
    padding-top: 10px;
    background-color: rgb(199,199,204);
    color: white;
}
.tab-txt-selected{
    background-color: rgb(38,122,255)
}
</style>

<script>
import nativeService from '@/common/services/nativeService';
import cmd from './common/cmd.js';
import mideaHeader from './components/mheader.vue';
import mideaDialog from '@/component/dialog.vue';
import mideaCell from './components/cell.vue';
import mideaSwitch from '@/midea-component/switch2.vue';
const stream=weex.requireModule('stream');
const picker = weex.requireModule('picker')

export default {
    components:{
        mideaHeader,
        mideaDialog,
        mideaCell,
        mideaSwitch
    },
    data(){
        return{
            height:0,
            status:{},
            leftImg:"./assets/img/ic_menu_back_black_n2x.png",
            rightText:"保存",
            temperature:"0℃",
            sendTemp:30,//发送的温度
            startTime:"00:00",
            endTime:"00:00",
            temperatureIndex:0,
            week:[
                {"title":"日","selected":false},
                {"title":"一","selected":false},
                {"title":"二","selected":false},
                {"title":"三","selected":false},
                {"title":"四","selected":false},
                {"title":"五","selected":false},
                {"title":"六","selected":false},
            ],
        }
    },
    methods:{
        goBack(){
            nativeService.goBack();
        },
        saveOrder(){
            nativeService.showLoading();
            this.addOrder();
        },
        addOrder(){
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
                            'action':'add',
                            'task':[
                                {
                                    'taskId':'',
                                    'temp':self.sendTemp,
                                    'startTime':self.startTime,
                                    'endTime':self.endTime,
                                    'week':self.getWeek(self.week),
                                    'isRepeat':true,
                                    'enable':true,
                                }
                            ]
                        }
                    }
                },function(res){
                    nativeService.hideLoading();
                    if(res.ok){
                        nativeService.goBack();
                    }
                },function(error){
                    nativeService.hideLoading();
                })
            }).catch((err)=>{
                nativeService.hideLoading();
                nativeService.toast("获取设备信息失败")
            })
        },
        getWeek(obj){
            var arr=new Array();
            for(var i=0;i<obj.length;i++){
                if(obj[i].selected==true){
                    arr.push(i);
                }
            }
            return arr.join();
        },
        pickTemperature() {
            var self=this;
            // var min=parseInt(self.status.heatSetTemperatureMin);
            // var max=parseInt(self.status.heatSetTemperatureMax);
            var min=30;
            var max=80;
            var items=new Array();
            for(var i=0;i<(max-min+1);i++){
                items[i]=min+i;
            }
            var pickItem = [{
                index: this.temperatureIndex,
                item: items,
                label: "℃"
                }
            ]
            picker.pick({
                'items': pickItem,
                'cancelTxt': '取消', //取消按钮文字
                'confirmTxt': '确定', //确定按钮文字,
                'cancelTxtColor': '#020F13', //取消颜色
                'confirmTxtColor': '#020F13', //标题颜色
                'titleColor': '#020F13', //标题颜色
                'titleBgColor': '#E7EDEF' //标题栏颜色
            }, event => {
                if (event.result == 'success') {
                    var dataArr = event.data.replace("[", "").replace("]", "").split(",");
                    this.temperatureIndex = dataArr[0];
                    this.sendTemp = items[dataArr[0]];
                    this.temperature = this.sendTemp+"℃";
                }
            });
        },
        pickStartTime() {
            picker.pickTime({
                'value': this.startTime,
                'cancelTxt': '取消', //取消按钮文字
                'confirmTxt': '确定', //确定按钮文字,
                'cancelTxtColor': '#020F13', //取消颜色
                'confirmTxtColor': '#020F13', //标题颜色
                'titleColor': '#020F13', //标题颜色
                'titleBgColor': '#E7EDEF' //标题栏颜色
            }, event => {
                if (event.result === 'success') {
                    this.startTime = event.data;
                }
            })
        },
        pickEndTime(){
            picker.pickTime({
                'value': this.endTime,
                'cancelTxt': '取消', //取消按钮文字
                'confirmTxt': '确定', //确定按钮文字,
                'cancelTxtColor': '#020F13', //取消颜色
                'confirmTxtColor': '#020F13', //标题颜色
                'titleColor': '#020F13', //标题颜色
                'titleBgColor': '#E7EDEF' //标题栏颜色
            }, event => {
                if (event.result === 'success') {
                    this.endTime = event.data;
                }
            })
        },
        tabClicked(index){
            this.week[index].selected=!this.week[index].selected;
        },
        //查询设备当前状态
        sendQuery(){
            var self=this;
            nativeService.startCmdProcess("query",cmd.queryStatus(),function(res){
                self.status=cmd.analyse(res);
                self.temperature=self.status.heatSetTemperatureMin+"℃";
                nativeService.hideLoading();
            },function(res){
                nativeService.hideLoading();
                nativeService.toast("网络较差，请稍后重试");
            })
        },
    },
    created(){
        var self=this;
        self.height=Math.floor(750/self.$getConfig().env.deviceWidth*self.$getConfig().env.deviceHeight);
        nativeService.showLoading();
        self.sendQuery();
    },
}
</script>

