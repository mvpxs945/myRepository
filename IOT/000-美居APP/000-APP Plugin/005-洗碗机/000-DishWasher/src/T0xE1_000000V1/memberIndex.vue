<template>
<div class="wrapper">
  <midea-header title="更多功能" :isImmersion="true" bgColor="#ffffff" :leftImg="icon.leftImg" 
      @headerClick="headerClick"></midea-header>  
  <div class="demo_section">
    <div><scroller class="guide_list">
      <div v-for="(item,i) in list" :key="i"
        @click="jumpNext(item)" :class="['guide_list_item','guide_item_boder',item.isMargin?'guide_item_top':'']">
        <div class="icon_title">
          <text class="guide_item_text">{{item.name}}</text>
        </div>  
        <div class="flex_center">
          <text v-if="item.subTitle" class="item_sec_desc">{{item.subTitle}}</text>
          <image v-if="i!=2" class="next_img" src="assets/img/arrow_right.png"/> 
        </div>
      </div>
    </scroller></div>
   </div>
</div>
</template>
<script>
import nativeService from "@/common/services/nativeService";
import mideaHeader from "./components/header.vue";
import bigData from "./js/bigData.js";
import cmdFun from "./js/cmd.js";


export default {
  components: {
    mideaHeader,
  },
  data() {
    return {
      icon:{
        leftImg:"./assets/img/public_ic_back@3x.png",
      },
      list: [
        { name: "用户指南", subTitle:'',isMargin:true},
        { name: "软水盐", subTitle:'',isMargin:false},
        { name: "亮碟剂", subTitle:'',isMargin:false},
        // { name: "水电统计",subTitle:'',isMargin:false},
        // { name: "语音设置",subTitle:'',isMargin:true},
        { name: "联系客服",subTitle:'400-889-9315',isMargin:true},
      ],
    };
  },
  methods: {
    jumpNext(item) {
      var path = '';
      if(item.name=='用户指南'){
        bigData.dataReport('PAGE_USER_GUIDE');
        path = "settingIndex.js";
        nativeService.goTo(path, {}); 
      }else if(item.name=='软水盐'){
        bigData.dataReport('PAGE_CHANGE_SALT');
        path = "settingSalt.js";
        nativeService.goTo(path, {}); 
      }else if(item.name=='亮碟剂'){
        // bigData.dataReport('PAGE_CHANGE_BRIGHT');
        // path = "settingBrightDish.js";
        // nativeService.goTo(path, {}); 
      }else if(item.name=='语音设置'){
        bigData.dataReport('PAGE_VOICE');
        path = "settingVoice.js";
        nativeService.goTo(path, {}); 
      }else if(item.name=='联系客服'){
        bigData.dataReport('BTN_SERVICE');
        var params ={
          tel: '400-889-9315',
          title: '联系客服',
          desc:'拨打热线电话：400-889-9315',
        }
        nativeService.callTel(params).then((resp) => {
            //nativeService.toast(resp)
          }).catch((error) => {
            nativeService.toast(error)
          })
      }else if(item.name=='水电统计'){
        bigData.dataReport('PAGE_WATER');
        path = "chart.js";
        nativeService.goTo(path, false, true); 
      }
    },
    headerClick: function(tag){
      console.log('headerClick:'+tag);
      switch(tag){
        case 'leftImgClick':
          nativeService.goBack();
          break;
        case 'rightImgClick':
          nativeService.goTo('memberIndex.js',{});
          break;
        case 'secondImgClick':
          break;
        }
    },
    analysisFun: function(status) {
      var self = this;
      let isLackSalt = (status.boxUp.displaySign.detail.salt.value == 0x01);
      let isLackBright = (status.boxUp.displaySign.detail.brightDishAgent.value == 0x01);
      self.list[1].subTitle = (isLackSalt?'缺少':'充足');
      self.list[2].subTitle = (isLackBright?'缺少':'充足');
    },

    queryStatus: function() {
      var self = this;
      cmdFun.queryStatus(function(statusObj){
        self.analysisFun(statusObj);
      });
    }
  },
  created() {
    var self = this;
    self.isIOS = weex.config.env.platform == "IOS" ? true : false;
    self.queryStatus();
  },
};
</script>
<style scoped>
.wrapper {
  background-color: rgb(242, 242, 242);
}
.guide_list {
  height: 1500px;
  position: relative;
}
.flex_center {
  flex-direction: row;
  justify-content: center;
  align-items: center;
}
.member_bg{
  width: 750px;
  height: 399px;
}
.member_item{
  position: absolute;
  top: 40px;
  width: 750px;
}
.member_icon{
  width: 148px;
  height: 148px;
}
.member_title{
  font-size: 32px;
  margin-top: 30px;
}
.member_sub_title{
  font-size: 26px;
  margin-top: 10px;
  color: #5aa6fd;
}
.member_dec_title{
  font-size: 26px;
  margin-top: 10px;
  color: #afafaf;
}

.icon_title{
  flex-direction: row;
  align-items: center;
}
.item_img{
  width: 40px;
  height: 40px;
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

.demo_section {
}
.demo_title {
  font-size: 34px;
}
.demo_content {
  font-size: 28px;
}
.guide_img {
  resize: contain;
}
</style>