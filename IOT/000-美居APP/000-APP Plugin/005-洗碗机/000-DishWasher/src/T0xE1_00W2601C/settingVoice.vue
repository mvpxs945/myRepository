<template>
    <div class="wrapper" :style="{height:screenH+'px'}">
        <midea-header title="语音设置" :isImmersion="true" bgColor="#ffffff" :leftImg="icon.leftImg" 
            @headerClick="headerClick"></midea-header>
        <div class="demo_section">
            <audio :src="audioSrc" ref="audioPlay"></audio>
            <text class="audio-title">可以选择下面的语音，播放不同的语音哦~</text>
            <div><scroller class="guide_list">
                <div v-for="(item,i) in audioList" :key="i" class="guide_list_item flex-row-sp  guide_item_boder"
                    @click="itemClick(i)">
                    <text class="guide_item_text">{{item.name}}</text>
                    <div v-if="selectIndex == i" class="guide_check"></div>
                </div>
            </scroller></div>
        </div>
        <div class="standby-footer" :style="{'height':(isipx?112+ipxBottom+'px':112+'px'),'padding-bottom':(isipx?ipxBottom+'px':'0px')}">
            <div class="flex-row-center">
                <div class="btn-lay flex-row-center btn-boder" @click="btnClick('AUDIO_UPDATE')">
                    <text class="btn-text-left">更新语音包</text>
                </div>
                <div class="btn-lay flex-row-center btn-boder " @click="btnClick('AUDIO_BACK')">
                    <text class="btn-text-right">还原</text>
                </div>
            </div>
        </div>
        <midea-dialog class="dialog" :show="isShowDialog" cancelText="取消" confirmText="确认" title="语音包下载"
                mainBtnColor="#267AFF" secondBtnColor="#267AFF"
                @cancel="dialogClick('CancelBtnClicked')"
                @confirm="dialogClick('ConfirmBtnClicked')"
                :errorContentList="errorContentList">
        </midea-dialog>
        <midea-progess :show="isShowProgress" title='语音包下载中' :value="progress">
        </midea-progess>

    </div>
</template>
<script>
import nativeService from "@/common/services/nativeService";
import mideaHeader from "./components/header.vue";
import mideaDialog from "./components/errorDialog.vue";
import mideaProgess from "@/midea-component/mProgressDialog.vue";

import cmdFun from "./js/cmd.js";
import bigData from "./js/bigData.js";

export default {
    components:{
        mideaHeader,
        mideaDialog,
        mideaProgess,
    },
    data(){
        return {
            screenH: 750 / weex.config.env.deviceWidth * weex.config.env.deviceHeight,
            icon:{
                leftImg:'assets/img/public_ic_back@3x.png',
                btnOrder: "./assets/img/btn_order.png",
                btnStart: "./assets/img/btn_start.png",
            },
            isShowDialog:false,
            isShowProgress:false,
            progress:0,
            errorContentList:[
                '确定要下载语音包吗,',
                '更新语音包需要花一些时间哦~',
                '语音包下载过程中,无法进行其它操作'
            ],
            audioList:[
                {name:'经典女声',src:'./assets/img/audio/1.wav'},
                {name:'经典男声',src:'./assets/img/audio/2.wav'},
                {name:'英文女声',src:'./assets/img/audio/3.wav'},
                {name:'英文男声',src:'./assets/img/audio/4.wav'},
                {name:'可爱萝莉',src:'./assets/img/audio/5.wav'},
                {name:'讲故事的老师',src:'./assets/img/audio/6.wav'},
                {name:'活泼小正太',src:'./assets/img/audio/7.wav'},
            ],
            selectIndex:0,
        }
    },
    methods:{
        headerClick: function(tag){
            console.log('headerClick:'+tag);
            switch(tag){
                case 'leftImgClick':
                    nativeService.goBack();
                    break;
                case 'rightImgClick':
                    break;
                case 'secondImgClick':
                    break;
            }
        },
        itemClick:function(index){
            this.selectIndex = index;
        },
        btnClick:function(tag){
            var self = this;
            switch(tag){
                case 'AUDIO_UPDATE':
                    self.isShowDialog = true;
                    break;
                case 'AUDIO_BACK':
                    var cmdBytes = cmdFun.cmdQuikRever();
                    nativeService.showLoading();
                    nativeService.startCmdProcess(cmdBytes, function (messageBack) {
                        nativeService.hideLoading();
                        self.analysisFun(messageBack);
                    },function(fail) {
                        nativeService.hideLoading();
                    });
                    break;
                case '':
                    break;
            }
        },
        dialogClick:function(tag){
            var self = this;
            switch(tag){
                case 'CancelBtnClicked':
                    self.isShowDialog = false;
                    break;
                case 'ConfirmBtnClicked':
                    self.isShowDialog = false;
                    self.isShowProgress = true;
                    var cmdBytes = cmdFun.cmdCreateVoiceMsgBody(self.selectIndex+1);
                    nativeService.startCmdProcess(cmdBytes, function (messageBack) {
                        self.analysisFun(messageBack);
                    },function(fail) {
                        self.isShowProgress = false;
                    });
                break;
            }
        },
        viewdisappear: function() {
            globalEvent.removeEventListener("receiveMessage");
        },
        viewappear: function() {
            var self = this;
            self.listenerFun();
            self.queryStatus();
        },
        listenerFun: function() {
            var self = this;
            globalEvent.addEventListener("receiveMessage", function(event) {
                var arr = event.data.replace(/\[|]/g, "").split(",");
                if ((parseInt(arr[9]) == 3 || parseInt(arr[9]) == 4) && parseInt(arr[10]) == 1) {
                    return;
                }
                self.analysisFun(arr);
            });
        },
        analysisFun:function(messageBack){
            var self = this;
            if (messageBack[10] == 0xCA) {//属于语音包类型上报
                if (messageBack[11] == 1) {//下载语音完成并更新完
                    self.isShowProgress = true;
                    self.progress = parseInt(messageBack[14]);
                }else if (messageBack[11] == 2) {//下载取消
                    self.progress = 0;
                }else if(messageBack[11] == 3){// 下载完成
                   
                }else if (messageBack[11] == 4) {//下载语音后解压并更新完
                    self.isShowProgress = false;
                    self.progress = 0;
                    nativeService.toast('语音包下载完成')
                }else if (messageBack[11] == 5) {//快速还原成功
                    nativeService.toast('成功还原上次语音包~~');
                }
                return;
            }
        },
        queryStatus:function(){
            var self = this;
            var cmdBytes = cmdFun.cmdRequestVoiceStatus();
            nativeService.startCmdProcess(cmdBytes,function(messageBack){
                self.analysisFun(messageBack);
            },function(fail){

            });
        }
    },
    computed:{
        isipx: function() {
            return weex && (
                        weex.config.env.deviceModel === 'iPhone10,3' || weex.config.env.deviceModel === 'iPhone10,6' //iphoneX
                        || weex.config.env.deviceModel === 'iPhone11,8' //iPhone XR
                        || weex.config.env.deviceModel === 'iPhone11,2' //iPhone XS
                        || weex.config.env.deviceModel === 'iPhone11,4' || weex.config.env.deviceModel === 'iPhone11,6' //iPhone XS Max
                        );
        },
        audioSrc: function(){
            var self = this;
            let src = self.audioList[self.selectIndex].src;
            return src;
        }
    },
    created(){
        var self = this;
        self.isIOS = weex.config.env.platform == "IOS" ? true : false;
        if (self.isIOS) {
            self.listenerFun();
        }
        self.queryStatus();
    }
    
}
</script>
<style scoped>
.flex-row-center {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}
.flex-row-sp {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}

.flex-column-center {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.wrapper {
  background-color: rgb(242, 242, 242);
}

.audio-title {
  font-size: 25px;
  height: 100px;
  line-height: 100px;
  padding-left: 40px;
  padding-top: 10px;
  color: #9d9d9d;
}
.guide_list {
  position: relative;
}
.guide_list_item {
  position: relative;
  width: 750px;
  height: 100px;
  padding-left:32px;
  padding-right: 32px; 
  background-color: #fff;
}
.guide_item_boder {
  border-width: 2px;
  border-style: solid;
  border-color: rgb(250, 250, 250);
}
.guide_item_text {
  font-size: 30px;
  height: 100px;
  line-height: 100px;
  width: 406px;
}
.guide_check {
  width:20px;
  height:30px;
  border-bottom: 3px solid #408aff;
  border-right: 3px solid #408aff;
  -webkit-transform: rotate(45deg);
  -moz-transform: rotate(45deg);
  transform: rotate(45deg);
}


.standby-footer {
  position: absolute;
  background-color: #fff;
  width: 750px;
  height: 112px;
  left: 0px;
  bottom: 0px;
}

.btn-lay {
  width: 375px;
  height: 112px;
  line-height: 112px;
}
.btn-boder {
  border-width: 1px;
  border-style: solid;
  border-color: rgb(242, 242, 242);
}

.btn-text-right {
    color:#408aff;
}
.btn-text-left {
    color:#408aff;
}
.btn-img {
  flex: 1;
}
</style>





