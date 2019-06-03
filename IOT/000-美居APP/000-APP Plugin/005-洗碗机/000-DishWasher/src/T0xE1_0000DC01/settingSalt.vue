<template>
<div class="wrapper" @viewappear="viewappear" @viewdisappear="viewdisappear" :style="{height:screenH+'px'}">
  <midea-header title="软水盐档位" :isImmersion="true" titleColor="#333333"
    :leftImg="icon.leftImg" @headerClick="headerClick">
  </midea-header>
  <div class="container">
    <div :style="{'width':'750px','height':'20px','background-color':'#ECECEC'}"></div>
    <div class="section_up">
      <div class="">
        <text class="desc_title">软水盐作用</text>
        <text class="desc_content"> 专用盐可保持软水器树脂活性，防止内胆和餐具上结垢。软水器档位设置范围为H1-H7。可咨询当地自来水公司，了解当地水质硬度，根据硬度表查询最佳设定档位：</text>   
      </div>
    </div>
    <div class="section_down">
      <text class="desc_title">当前档位</text>
      <div v-for="(item,index) in list" :key="index" @click="setUpSaltGear(index)" class="list-item flex_center">
        <text :class="[item.checked?'list-item-text-on':'list-item-text']">{{item.title}}</text>
        <image v-if="item.checked" class="list-item-check" :src="icon.checkOn" />
      </div>
    </div>
  </div>
</div>
</template>
<style scoped>
.wrapper {
  width: 750px;
  background-color: #fff;
}
.text_white {
  color:#fff;
}
.flex_center {
  flex-direction: row;
  justify-content: center;
  align-items: center;
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
  width: 750px;
  height: 250px;
  padding: 32px;
}
.section_down {
  margin-top: 20px;
  padding: 32px;
}
.desc_content {
  margin-top: 15px;
  letter-spacing: 3px;
  line-height: 44px;
  font-size: 28px;
  font-family: PingFangSC-Regular;
  color: #4A4A4A;
}
.desc_title {
  font-family: PingFangSC-Regular;
  font-size: 26px;
  color: rgba(74,74,74,0.50);
  height: 36px;
  line-height: 36px;
}
.list-item {
  width: 686px;
  height: 105px;
  line-height: 105px;
  border-bottom-color: #EDEDED;
  border-bottom-width: 1px;
}

.list-item-check {
  width: 60px;
  height: 60px;
}

.list-item-text {
  font-family: PingFangSC-Regular;
  font-size: 32px;
  color: #4A4A4A;
  flex: 1;
}

.list-item-text-on {
  font-family: PingFangSC-Regular;
  font-size: 32px;
  color: #3872E6;
  flex: 1;
}


.margin_top {
  margin-top: 20px;
}

</style>
<script>
import nativeService from "@/common/services/nativeService";

import mideaHeader from "./components/header.vue";
import cmdFun from "./js/cmd.js"; //解析指令
const globalEvent = weex.requireModule("globalEvent");

export default {
  components: {mideaHeader},
  data() {
    return {
      screenH: 750 / weex.config.env.deviceWidth * weex.config.env.deviceHeight,
      countQuery:-1,
      icon: {
        leftImg: "./assets/img/back_black.png",
        checkOn: "./assets/img/check_on.png",
      },
      curBox:'TYPE_BOX_UP',
      list:[
            { title: '1档', value: 1,checked: false},
            { title: '2档', value: 2,checked: false},
            { title: '3档', value: 3,checked: false},
            { title: '4档', value: 4,checked: false},
            { title: '5档', value: 5,checked: false},
            { title: '6档', value: 6,checked: false},
            { title: '7档', value: 7,checked: false},
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
      for(let i=0;i<self.list.length;i++){
        if(index == i){
          self.list[i].checked = true;
        }else{
          self.list[i].checked = false;
        }
      }
      var gear = self.list[index].value;
      var sendCmd = cmdFun.cmdSetSalt('TYPE_BOX_UP',gear);
      var sendCmd = cmdFun.cmdSetSalt(gear);
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
      var boxUpLevel = status.boxUp.waterLevel.value;
      for(let i=0;i<self.list.length;i++){
        if(self.list[i].value == boxUpLevel){
          self.list[i].checked = true;
        }else{
          self.list[i].checked = false;
        }
      }
      /** 下柜 */
    
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