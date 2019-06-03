<template>
  <div ref="container" v-if="show" class="container" :style="{height:screenH+'px'}">
    <midea-header title="DIY程序设置" :isImmersion="true" bgColor="#ffffff" :leftImg="icon.leftImg" 
            @headerClick="headerClick"></midea-header>
    <div ref="dialog" class="dialog-box" :style="{height:(screenH-128)+'px'}">
        <div class="dialog-content" >
            <div><scroller class="guide_list" :style="{'height':+guideH+'px'}">
                <div v-for="(item,i) in list" :key="i" v-if="item.isShow"
                    @click="itemClick(i)" :class="['guide_list_item','guide_item_boder',item.isMargin?'guide_item_top':'']">
                    <div class="icon_title">
                        <text class="guide_item_text">{{item.name}}</text>
                    </div>
                    <div class="flex-row-sp">
                        <text v-if="item.subTitle" class="item_sec_desc">{{item.subTitle}}</text>
                        <image class="next_img" src="assets/img/arrow_right.png"/>
                    </div>
                </div>
            </scroller></div>
            <div class="btn-lay flex-row-center btn-boder btn-right" @click="btnClick('confirm')">
                    <text class="btn-text-right">保存</text>
            </div>
        </div>
        <div v-if="false" class="standby-footer" :style="{'height':(isipx?112+ipxBottom+'px':112+'px'),'padding-bottom':(isipx?ipxBottom+'px':'0px')}">
            <div class="flex-row-center">
                <div class="btn-lay flex-row-center btn-boder" @click="btnClick('cancel')">
                    <text class="btn-text-left">取消</text>
                </div>
                <div class="btn-lay flex-row-center btn-boder btn-right" @click="btnClick('confirm')">
                    <text class="btn-text-right">保存</text>
                </div>
            </div>
        </div>
    </div>
  </div>
</template>
<script>
const dom= weex.requireModule('dom');
const picker = weex.requireModule('picker');
import nativeService from "@/common/services/nativeService";
import mideaHeader from "./header.vue";


export default {
    props:{
        show: {
            type: Boolean,
            default: true
        },
    },
    components:{
        mideaHeader,
    },
    data () {
        return {
            screenH: 750 / weex.config.env.deviceWidth * weex.config.env.deviceHeight,
            ipxBottom:108,
            guideH:140,
            icon:{
                leftImg:'assets/img/public_ic_back@3x.png',
            },
            list: [
                { name: "DIY程序", subTitle:'DIY1',isMargin:true,value:0x00,isShow:true},
                { name: "主洗温度", subTitle:'60',isMargin:false,isShow:false},
                { name: "漂洗温度", subTitle:'50',isMargin:false,isShow:false},
            ],
          
            dataPick:{
                diyProgram:0,
                diyMainTemp:0,
                diyWashTemp:0,
            },
        }
    },
    methods: {
        headerClick: function(tag){
            console.log('headerClick:'+tag);
            switch(tag){
                case 'leftImgClick':
                    this.show = false;
                    this.$emit('cancel',{});
                    break;
                case 'rightImgClick':
                    break;
                case 'secondImgClick':
                    break;
            }
        },
        btnClick: function(tag){
            var self = this;
            switch(tag){
                case 'cancel':
                    this.show = false;
                    this.$emit('cancel',{});
                    break;
                case 'confirm':
                    this.show = false;
                    var curDiy ={
                        program:self.list[0].subTitle,
                        mainTemp:self.list[1].subTitle,
                        washTemp:self.list[2].subTitle,
                    };
                    this.$emit('confirm',curDiy);
                    break;
            }
        },

        itemClick:function(index){
            var self = this;
            if(index == 0){
                self.selectDiyProgram();
            }else if(index == 1){
                self.selectMainTemp();
            }else if(index == 2){
                self.selectWashTemp();
            }

        },
        selectDiyProgram() {
            var self = this;
            var itemsDay = ["DIY1", "DIY2","DIY3","DIY4","DIY5","DIY6"];
            var pickItem = [{index: self.dataPick.diyProgram,item: itemsDay,label: ""}];
            picker.pick({
                items: pickItem,
                title: "附加功能", //取消和确定中间那标题
                cancelTxt: "取消", //取消按钮文字
                confirmTxt: "确定", //确定按钮文字,
                cancelTxtColor: "#020F13", //取消颜色
                confirmTxtColor: "#020F13", //标题颜色
                titleColor: "#020F13", //标题颜色
                titleBgColor: "#E7EDEF" //标题栏颜色
                },event => {
                var data = event.data;
                var dataArr = data.replace("[", "").replace("]", "").split(",");
                self.dataPick.diyProgram = dataArr[0];
                self.list[0].subTitle =  itemsDay[dataArr[0]];
                if(self.list[0].subTitle == 'DIY1' || self.list[0].subTitle == 'DIY2'){
                    self.list[1].isShow = false;
                    self.list[2].isShow = false;
                    self.guideH = 140;
                }else {
                    self.list[1].isShow = true;
                    self.list[2].isShow = true;
                    self.guideH = 340;
                }
            });
        },
        selectMainTemp() {
            var self = this;
            var itemsDay = [];
            if(self.list[0].subTitle == 'DIY1' || self.list[0].subTitle == 'DIY2'){
                itemsDay = [60];
            }else {
                itemsDay = [45,50,55,60,65];
            }
            var pickItem = [{index: self.dataPick.diyMainTemp,item: itemsDay,label: ""}];
            picker.pick({
                items: pickItem,
                title: "附加功能", //取消和确定中间那标题
                cancelTxt: "取消", //取消按钮文字
                confirmTxt: "确定", //确定按钮文字,
                cancelTxtColor: "#020F13", //取消颜色
                confirmTxtColor: "#020F13", //标题颜色
                titleColor: "#020F13", //标题颜色
                titleBgColor: "#E7EDEF" //标题栏颜色
                },event => {
                var data = event.data;
                var dataArr = data.replace("[", "").replace("]", "").split(",");
                self.dataPick.diyMainTemp = dataArr[0];
                self.list[1].subTitle =  itemsDay[dataArr[0]];
            });
        },
        selectWashTemp() {
            var self = this;
            var itemsDay = [];
            if(self.list[0].subTitle == 'DIY1' || self.list[0].subTitle == 'DIY2'){
                itemsDay = [50];
            }else {
                itemsDay = [50,55,60,65,70];
            }
            var pickItem = [{index: self.dataPick.diyWashTemp,item: itemsDay,label: ""}];
            picker.pick({
                items: pickItem,
                title: "附加功能", //取消和确定中间那标题
                cancelTxt: "取消", //取消按钮文字
                confirmTxt: "确定", //确定按钮文字,
                cancelTxtColor: "#020F13", //取消颜色
                confirmTxtColor: "#020F13", //标题颜色
                titleColor: "#020F13", //标题颜色
                titleBgColor: "#E7EDEF" //标题栏颜色
                },event => {
                var data = event.data;
                var dataArr = data.replace("[", "").replace("]", "").split(",");
                self.dataPick.diyWashTemp = dataArr[0];
                self.list[2].subTitle =  itemsDay[dataArr[0]];
            });
        },
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
    },
    created:function(){
    },
}
</script>
<style scoped>
.flex-row-sp {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}
.flex-row-center {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}
.container {
    width: 750px;
    position: absolute;
    left: 0px;
    top: 0px;
    align-items: center;
    justify-content: center;
}
.dialog-box {
    background-color: rgb(242, 242, 242);
    width: 750px;
}
.guide_list {
  position: relative;
  height: 340px;
}

.guide_list_item {
  width: 750px;
  height: 100px;
  padding-left:32px;
  padding-right: 32px; 
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  position: relative;
  background-color: #fff;
  
}
.guide_item_boder {
  border-width: 2px;
  border-style: solid;
  border-color: rgb(250, 250, 250);
}
.guide_item_text {
  font-size: 30px;
  color: #949494;
  height: 100px;
  line-height: 100px;
}
.guide_item_top {
  margin-top: 24px;
}
.item_sec_desc{
  font-size: 28px;
  height: 100px;
  line-height: 100px;
  margin-right: 20px;
  color: #949494;
}
.next_img {
  width:10px;
  height:20px;
}

.mask {
    top: 0;
    width: 750px;
    justify-content: center;
    align-items: center;
}

.content-title {
  color: #333333;
  font-size: 32px;
  text-align: center;
  line-height: 100px;
  height: 100px;
  padding-left: 15px;

}

.content-lay {
    height: 270px;
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
  width: 686px;
  background-color: #387df6;
  margin: 32px;
  height: 100px;
  line-height: 100px;
  border-radius: 10px;
}
.btn-boder {
  border-width: 1px;
  border-style: solid;
  border-color: rgb(242, 242, 242);
}

.btn-text-right {
    color:#fff;
    font-size: 32px;
}
.btn-text-left {
    color:#000;
    font-size: 32px;
}
.btn-img {
  flex: 1;
}
</style>