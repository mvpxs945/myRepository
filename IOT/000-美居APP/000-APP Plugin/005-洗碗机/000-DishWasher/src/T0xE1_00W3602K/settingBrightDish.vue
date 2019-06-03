<template>
<div class="wrapper" @viewappear="viewappear" @viewdisappear="viewdisappear" :style="{height:(screenH)+'px'}">
  <midea-header title="亮碟剂" :isImmersion="true" 
    :titleColor="style.header.titleColor" :fontSize="style.header.fontSize" bgColor="rgb(92,117,245)"
    :leftImg="icon.leftImg" @headerClick="headerClick">
  </midea-header>
  <div class="container">
    <div class="section_up">
      <div class="gear_up flex_column_center">
        <text class="gear_label">档位</text>
        <div class="line"></div>
        <div class="box_up_gear_lay flex_center_sp">
          <div v-for="(item,index) in boxUpList" :key="index" 
            :class="['flex_center','border',item.checked?'item_selected':'item_unselect',]"
            @click="setUpSaltGear(index)">
            <text :class="[item.checked?'text_selected':'text_unselect']" >{{item.title}}</text>
          </div>
        </div>
      </div>
      <div v-if="false" class="gear_down flex_column_center">
        <text class="gear_label">下柜档位</text>
        <div class="line"></div>
        <div class="box_up_gear_lay flex_center_sp">
          <div v-for="(item,index) in boxDownList" :key="index" 
          :class="['flex_center','border',item.checked?'item_selected':'item_unselect',]"
          @click="setDownSaltGear(index)">
            <text :class="[item.checked?'text_selected':'text_unselect']">{{item.title}}</text>
          </div>
        </div>
      </div>
    </div>
    <div class="section_down">
      <div class="flex_column_center">
        <text class="desc_title">亮碟剂</text>
        <text class="desc_content">  根据餐具的干燥效果而定，如果餐具又较多水分残留，则往高档位调；有白，蓝色附加物时，则往低档位调。</text>   
      </div>
      <div v-if="false" class="btn_buy flex_column_center">
          <text class="btn_buy_text">去购买</text>
      </div>
    </div>
  </div>
</div>
</template>
<style scoped>
.wrapper {
  width: 750px;
  background-color: rgb(92,117,245);
  background-color: -moz-linear-gradient(top, rgb(92,117,245) 0%, rgb(78,104,246) 100%);
  background-color: -webkit-linear-gradient(top, rgb(92,117,245) 0%, rgb(78,104,246) 100%);
  background-color: linear-gradient(to bottom, rgb(92,117,245) 0%, rgb(78,104,246) 100%);
  background-color: -o-linear-gradient(top,rgb(92,117,245), rgb(78,104,246));
}

.container {
  flex: 1;
}

.text_white {
  color:#fff;
}
.flex_center {
  flex-direction: row;
  justify-content: center;
}
.flex_center_sp {
  flex-direction: row;
  justify-content: space-between;
}
.flex_column_center {
  flex-direction: column;
  justify-content: center;
}
.section_up {
  flex: 1;
  margin-top: 20px;
}
.box_up_gear_lay {
  width: 700px;
  height: 100px;
  margin-left: 25px;
  margin-right: 25px;
  margin-top: -45px;
}
.line {
  width: 700px;
  margin-left: 25px;
  margin-right: 25px;
  margin-top: 50px;
  height: 2px;
  background-color: #fff;
}
.gear_up {
  margin-top: 120px;
  margin-bottom: 20px;
}
.gear_down {
  margin-top: 20px;
  margin-bottom: 20px;
}
.gear_label{
  font-size: 36px;
  margin: 20px;
  color: #fff;
}
.item_selected {
  width: 80px;
  height: 80px;
  border-radius: 40px;
  background-color: #fff;
}
.text_selected {
  font-size: 36px;
  color: #6175ff;
  text-align: center;
  height: 80px;
  line-height: 80px;
  margin-top: -3px;
}
.item_unselect {
  width: 80px;
  height: 80px;
  border-radius: 40px;
  background-color: #6175ff; 
}
.text_unselect {
  font-size: 30px;
  color: #fff;
  text-align: center;
  height: 80px;
  line-height: 80px;
  margin-top: -3px;
}
.border {
  border-width: 3px;
  border-style: solid;
  border-color: #fff;
}

.section_down {
  flex: 1;
  background-color: #fff;
  padding: 20px;
}
.desc_content {
  color: rgb(180, 180, 180);
  letter-spacing: 3px;
  line-height: 48px;
  font-size: 28px;
}
.desc_title {
  color:#000;
  text-align: center;
  margin: 20px;
  font-size: 32px;
}
.margin_top {
  margin-top: 20px;
}

.btn_buy {
  position: absolute;
  width: 700px;
  height: 80px;
  border-width: 2px;
  border-style: solid;
  border-color: rgb(180, 180, 180);
  left: 25px;
  bottom: 50px;
}
.btn_buy_text {
  font-size: 32px;
  color:#000;
  text-align: center;
}

</style>
<script>
import nativeService from "@/common/services/nativeService";

import mideaHeader from "./components/header.vue";
import cmdFun from "./js/cmd.js"; //解析指令

const globalEvent = weex.requireModule("globalEvent");
const modal = weex.requireModule("modal");
export default {
  components: {mideaHeader},
  data() {
    return {
      screenH: 750 / weex.config.env.deviceWidth * weex.config.env.deviceHeight,
      icon: {
        leftImg: "./assets/img/public_ic_white@3x.png",
      },
      curBox:'TYPE_BOX_UP',
      style: {
        header: {
          bgColor: "#6175FF",
          fontSize: "32",
          titleColor: "#fff"
        }
      },
      boxUpList:[
            { title: '1档', value: 1, checked: false},
            { title: '2档', value: 2, checked: false},
            { title: '3档', value: 3, checked: false},
            { title: '4档', value: 4, checked: false},
            { title: '5档', value: 5, checked: false},
      ],
      boxDownList:[
            { title: '1档', value: 1,checked: false},
            { title: '2档', value: 2,checked: false},
            { title: '3档', value: 3,checked: false},
            { title: '4档', value: 4,checked: false},
            { title: '5档', value: 5,checked: false},
      ],
    };
  },

  methods: {
    headerClick: function(tag) {
      switch (tag) {
        case "leftImgClick":
          nativeService.goBack();
          break;
      }
    },
    setUpSaltGear:function(index){
      var self=this;
      for(let i=0;i<self.boxUpList.length;i++){
        if(index == i){
          self.boxUpList[i].checked = true;
        }else{
          self.boxUpList[i].checked = false;
        }
      }
      var gear = self.boxUpList[index].value;
      var sendCmd = cmdFun.cmdSetBrightDish(gear);
      nativeService.showLoading();
      nativeService.startCmdProcess("control",sendCmd,function(result) {
          nativeService.hideLoading();
          var arr = result.replace(/\[|]/g, "").split(",");//去掉中括号
          var analysisObj = cmdFun.analysisCmd(arr);
          self.analysisFun(analysisObj);
        },function(result) {
          nativeService.hideLoading();
        }
      );
    },
    setDownSaltGear:function(index){
      var self=this;
      for(let i=0;i<self.boxDownList.length;i++){
        if(index == i){
          self.boxDownList[i].checked = true;
        }else{
          self.boxDownList[i].checked = false;
        }
      }
      var gear = self.boxDownList[index].value
      var sendCmd = cmdFun.cmdSetBrightDish('TYPE_BOX_DOWN',gear);
      nativeService.showLoading();
      nativeService.startCmdProcess("control",sendCmd,function(result) {
          nativeService.hideLoading();
          var arr = result.replace(/\[|]/g, "").split(",");//去掉中括号
          var analysisObj = cmdFun.analysisCmd(arr);
          self.analysisFun(analysisObj);
        },function(result) {
          nativeService.hideLoading();
        }
      );
    },
    queryStatus: function() {
      var self = this;
      var cmd = cmdFun.createQueryMessage();
      nativeService.startCmdProcess("query",cmd,function(suc) {
          var result = suc.replace(/\[|]/g, ""); //去掉中括号
          var arr = result.split(",");
          var statusObj = cmdFun.analysisCmd(arr);
          self.analysisFun(statusObj);
        },function(fail) {}
      );
     
    },
    analysisFun(status) {
      var self = this;
      /** 上柜 */

      var boxUpLevel = status.boxUp.fenpeiqiLevel.value;
      for(let i=0;i<self.boxUpList.length;i++){
        if(self.boxUpList[i].value == boxUpLevel){
          self.boxUpList[i].checked = true;
        }else{
          self.boxUpList[i].checked = false;
        }
      }
      
    },
    listenerFun(){
      var self = this;        
      globalEvent.addEventListener("receiveMessage", function(e) {
        var arr = e.replace(/\[|]/g, "").split(",");//去掉中括号
        var analysisObj = cmdFun.analysisCmd(arr); //解析04上行指令
        self.analysisFun(analysisObj);
      });
    },
    viewdisappear(){
      globalEvent.removeEventListener("receiveMessage");
    },
    viewappear(){
      this.listenerFun();
    },
  },
  created() {
    var self = this;
    self.isIos = weex.config.env.platform == "iOS" ? true : false;
    if (self.isIos){
      self.listenerFun();
    }
    self.queryStatus();
  },
  mounted() {}
};
</script>