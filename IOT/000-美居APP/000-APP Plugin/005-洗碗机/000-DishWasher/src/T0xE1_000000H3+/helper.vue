<template>
  <div class="wrapper" :style="{'height':screenH+'px','padding-bottom':(isipx?ipxBottom+'px':'0px')}">
    <midea-header title="智能助手" :isImmersion="true" bgColor="rgb(92,117,245)" titleColor="white"
      leftImg="assets/img/public_ic_white@3x.png" 
      @headerClick="headerClick"
      ></midea-header>
      <div class="container">
        <div class="dish-detail flex-row-center" :style="{height:(screenH*0.5-100-(isipx?176:128))+'px'}">
          <div v-if="currentStepIndex==2" style="position:relative;">
            <text class="white dish-num">{{dishNum}}</text>
            <text class="white dish-unit">种餐具</text>
          </div>
          <div v-if="currentStepIndex==1" class="flex-row-center">
            <text class="white dish-num" v-if="dirtyTime ==5">5</text>
            <text class="white dish-num" v-if="dirtyTime !=5">30</text>
            <text class="white dish-unit-large" v-if="dirtyTime ==60">分以上</text>
            <text class="white dish-unit-large" v-if="dirtyTime ==30">分以内</text>
            <text class="white dish-unit" v-if="dirtyTime==5">分以内</text>
          </div>
          <div v-if="currentStepIndex==0" class="flex-row-center">
            <image class="dirty_bg" :src="dirtyIcon"/>
          </div>
        </div>
        <div class="foot-section" :style="{'height':(screenH*0.5+100)+'px','background-color':'#ffffff'}">
          <div class="step_section flex-row-center">
            <div class="step_item flex-row-center" v-for="(item,i) in stepObj" :key="i">
              <text :class="['step_text',currentStepIndex==i?'step_current':'']" >{{item.name}}</text>
              <text class="step_text step_sep" v-if="i!= (stepObj.length-1)">--</text>
            </div>
          </div>
          <div class="step_list">
            <midea-nav-list :list="currentStepList" :cols="colsNum" height="200"
            @itemClicked="itemClicked"/>
          </div>
          <div class="btn_section" :style="{'bottom':(isipx?ipxBottom+'px':'60px')}">
            <div class="flex-row-center" v-if="currentStepIndex==1">
              <div class="footer_btn">
                <midea-button text="上一步" :textStyle="textStyle" :btnStyle="orderBtnStyle"  @mideaButtonClicked="prevGo"></midea-button>
                <midea-button text="下一步" :textStyle="startStyle" :btnStyle="startBtnStyle" @mideaButtonClicked="nextGo"></midea-button>
              </div>
            </div>
            <div class="flex-row-center" v-if="currentStepIndex==2">
              <div class="footer_btn">
                <midea-button text="上一步" :textStyle="textStyle" :btnStyle="orderBtnStyle"  @mideaButtonClicked="prevGo"></midea-button>
                <midea-button text="确定" :textStyle="startStyle" :btnStyle="sureBtnStyle" @mideaButtonClicked="sureSelect"></midea-button>
              </div>
            </div>
            <div v-if="currentStepIndex==0">
              <midea-button text="下一步" :textStyle="startStyle" :btnStyle="kownBtnStyle" @mideaButtonClicked="nextGo"></midea-button>
            </div>
          </div>
        </div>
      </div> 
  </div>
</template>
<style scoped>
.flex-row-center {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}
.flex-column-center {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.white {
  color: #fff;
}
.dirty_bg {
  width: 200px;
  height: 300px;
}
.dish-num {
  width: 400px;
  font-size: 180px;
  text-align: center;
}
.dish-unit {
  width: 200px;
  position: absolute;
  top:20px;
  left:250px;
  font-size: 28px;
}
.dish-unit-large {
  width: 200px;
  position: absolute;
  top:20px;
  left:300px;
  font-size: 28px;
}


.flex_space {
  flex-direction: row;
  justify-content: space-between;
}
.container {
  width: 750px;
  position: relative;
  margin-top: -1px;
}
.dish-detail {
  width: 750px;
  background-color: rgb(92,117,245);
  background-color: -moz-linear-gradient(top, rgb(92,117,245) 0%, rgb(78,104,246) 100%);
  background-color: -webkit-linear-gradient(top, rgb(92,117,245) 0%, rgb(78,104,246) 100%);
  background-color: linear-gradient(to bottom, rgb(92,117,245) 0%, rgb(78,104,246) 100%);
  background-color: -o-linear-gradient(top,rgb(92,117,245), rgb(78,104,246));
}
.step_title{
  position: relative;
}
.step_bg{
  flex-direction: row;
  justify-content: center;
  width: 750px;
  margin-top: 50px;
}
.step_img{
  width: 570;
  height: 66px;
}
.step_section{
  flex-direction: row;
  justify-content: center;
  width: 750px;
  height: 100px;
  line-height: 100px;
  margin-top: -2px;
  background-color:rgb(92,117,245); 
}
.step_item{
  flex-direction: row;
  justify-content: center;
}
.step_text{
  font-size: 28px;
  color: #fff;
  height: 100px;
  line-height: 100px;
  text-align: center;
}
.step_sep{
  margin-left: 20px;
  margin-right: 20px;
}
.step_current{
  font-size: 32px;
}

.step_list{
  margin-top: 60px;
  width: 750px;
  padding-left: 55px;
  padding-right: 55px;
}
.btn_section{
  position: absolute;
  width: 750px;
}
.footer_btn {
  width: 690px;
  /* height: 150px; */
  margin-left: 30px;
  margin-right: 30px;
  margin-top: 30px;
  flex-direction: row;
  justify-content: space-between;
}

</style>
<script>
import mideaHeader from './components/header.vue'
import mideaButton from "@/midea-component/button.vue";
import mideaNavList from './components/navList.vue';
import nativeService from "@/common/services/nativeService";

export default {
  components: { mideaHeader,mideaButton,mideaNavList },
  data() {
    return {
      screenH: 750 / weex.config.env.deviceWidth * weex.config.env.deviceHeight,
      ipxBottom: 108,
      startBtnStyle: {
        backgroundColor:"#fff",
        width: "345px",
        borderColor: "rgb(102,102,102)",
        borderWidth: "1px",
        borderRadius: "2px",
        marginBottom:'0px',
        marginTop:'0px',
      },
      sureBtnStyle: {
        backgroundColor:"#fff",
        borderColor: "rgb(102,102,102)",
        borderWidth: "1px",
        borderRadius: "2px",
        width: "345px",
        marginBottom:'0px',
        marginTop:'0px',
      },
      kownBtnStyle:{
        backgroundColor:"#fff",
        borderColor: "rgb(102,102,102)",
        borderWidth: "1px",
        borderRadius: "2px",
        width: "690px",
        marginBottom:'0px',
        marginTop:'0px',
      },
      clickSelRecord: 0,
      stepImg: 'assets/img/helper/assistant_step_bg_1@2x.png',
      stepObj:[
        {
          order:'step1',name:'污渍度',
          canGoToNext: true,
          stepIcon:[
            {"title":"轻度",curStep:1,"hasBg": true,"bgColor":"#ffffff","isActive":false,"img":"assets/img/helper/assistant_1_low@2x.png","img_actived":"assets/img/helper/assistant_1_low_sel@2x.png"},
            {"title":"中度",curStep:1,"hasBg": true,"bgColor":"#ffffff","isActive":true,"img":"assets/img/helper/assistant_1_middle@2x.png","img_actived":"assets/img/helper/assistant_1_middle_sel@2x.png"},
            {"title":"重度",curStep:1,"hasBg": true,"bgColor":"#ffffff", "isActive":false,"img":"assets/img/helper/assistant_1_heavy@2x.png","img_actived":"assets/img/helper/assistant_1_heavy_sel@2x.png"},
          ],
          isHasPrevStepBtn:false
        },
         {
          order:'step2',name:'置放时间',  
          canGoToNext: true,         
          stepIcon:[
            {"title":"即时",curStep:2,"hasBg": true,"bgColor":"#ffffff","isActive":false,"img":"assets/img/helper/assistant_2_now@2x.png","img_actived":"assets/img/helper/assistant_2_now_sel@2x.png"},
            {"title":"半个小时内",curStep:2,"hasBg": true,"bgColor":"#ffffff","isActive":true,"img":"assets/img/helper/assistant_2_half-hour@2x.png","img_actived":"assets/img/helper/assistant_2_half-hour_sel@2x.png"},
            {"title":"半个小时以上",curStep:2,"hasBg": true,"bgColor":"#ffffff","isActive":false,"img":"assets/img/helper/assistant_2_half-hour2@2x.png","img_actived":"assets/img/helper/assistant_2_half-hour2_sel@2x.png"},
          ],
          isHasPrevStepBtn:true
        },
         {
          order:'step3',name:'选餐具',   
          canGoToNext: false,
          selectedNum:0,        
          stepIcon:[
           {"title":"碗",curStep:3,"hasBg": true, "bgColor":"#ffffff","isActive":false,"img":"assets/img/helper/assistant_3_bowl@2x.png","img_actived":"assets/img/helper/assistant_3_bowl_sel@2x.png"},
           {"title":"碟子",curStep:3,"hasBg": true, "bgColor":"#ffffff","isActive":false,"img":"assets/img/helper/assistant_3_plate@2x.png","img_actived":"assets/img/helper/assistant_3_plate _sel@2x.png"},
           {"title":"红酒杯",curStep:3,"hasBg": true, "bgColor":"#ffffff","isActive":false,"img":"assets/img/helper/assistant_3_wine-glass@2x.png","img_actived":"assets/img/helper/assistant_3_wine-glass_sel@2x.png"},
           {"title":"玻璃杯",curStep:3,"hasBg": true, "bgColor":"#ffffff","isActive":false,"img":"assets/img/helper/assistant_3_glass@2x.png","img_actived":"assets/img/helper/assistant_3_glass_sel@2x.png"},
           {"title":"炒菜锅",curStep:3,"hasBg": true, "bgColor":"#ffffff","isActive":false,"img":"assets/img/helper/assistant_3_pot@2x.png","img_actived":"assets/img/helper/assistant_3_pot_sel@2x.png"},
           {"title":"奶瓶",curStep:3,"hasBg": true, "bgColor":"#ffffff","isActive":false,"img":"assets/img/helper/assistant_3_feeding-bottle@2x.png","img_actived":"assets/img/helper/assistant_3_feeding-bottle_sel@2x.png"},
           {"title":"水果",curStep:3,"hasBg": true, "bgColor":"#ffffff","isActive":false,"img":"assets/img/helper/assistant_3_fruit@2x.png","img_actived":"assets/img/helper/assistant_3_fruit_sel@2x.png"},
          ],
          isHasPrevStepBtn:true
        },
      ],
      currentStepList:[
          {"title":"轻度",curStep:1,"hasBg": true,"bgColor":"#ffffff","isActive":false,"img":"assets/img/helper/assistant_1_low@2x.png","img_actived":"assets/img/helper/assistant_1_low_sel@2x.png"},
          {"title":"中度",curStep:1,"hasBg": true,"bgColor":"#ffffff","isActive":true,"img":"assets/img/helper/assistant_1_middle@2x.png","img_actived":"assets/img/helper/assistant_1_middle_sel@2x.png"},
          {"title":"重度",curStep:1,"hasBg": true,"bgColor":"#ffffff", "isActive":false,"img":"assets/img/helper/assistant_1_heavy@2x.png","img_actived":"assets/img/helper/assistant_1_heavy_sel@2x.png"},
      ],
      currentStepIndex:0,
      isBowl: false, 
      isWineCup: false,
      icon:{
        dirtyLow:'assets/img/helper/assist_low.png',
        dirtyMid:'assets/img/helper/assist_middle.png',
        dirtyHeavy:'assets/img/helper/assist_heavy.png',
      },
      colsNum:3,
      dishNum:0,
      dirtyTimeIndex:1,
      dirtyIndex:1,
    };
  },
  methods: {
    headerClick: function(tag){
      console.log('headerClick:'+tag);
      switch(tag){
        case 'leftImgClick':
          nativeService.goTo('weex.js',{});
          break;
        case 'rightImgClick':
          break;
        case 'secondImgClick':
          break;
        }
    },

    jumpNext(which) {
      var path = which + ".js";
      nativeService.goTo(path,false, true);
    },
    itemClicked(index,item){
      var {stepObj,currentStepIndex,currentStepList} = this;
        for(var i=0; i< currentStepList.length; i++){
          if(currentStepList[i].isActive){
            if(item.title=='红酒杯'&&currentStepList[i].title=='碗'){
               nativeService.toast('红酒杯不建议与碗一起清洗');
               return;
            }
             if(item.title=='碗'&&currentStepList[i].title=='红酒杯'){
               nativeService.toast('红酒杯不建议与碗一起清洗');
               return;
            }
          }
        }
        for(var key=0; key<currentStepList.length; key++){
          if(key==item.index){
             if(currentStepList[key].isActive){
              // stepObj[currentStepIndex].canGoToNext = false;
              if(currentStepIndex==2){
                currentStepList[key].isActive = false;
                this.clickSelRecord = this.clickSelRecord-1;
                stepObj[currentStepIndex].stepIcon[key].isActive = false;
              }
             }else{
              currentStepList[key].isActive = true;
              stepObj[currentStepIndex].canGoToNext = true;
              if(currentStepIndex==2){
                this.clickSelRecord = this.clickSelRecord+1;
              }
              stepObj[currentStepIndex].stepIcon[key].isActive = true;
             }
          }else{
            if(currentStepIndex==0||currentStepIndex==1){
              currentStepList[key].isActive = false;
              stepObj[currentStepIndex].stepIcon[key].isActive = false;
            }
          }
        }
        if(currentStepIndex == 2){
          this.dishNum = 0; 
        }
        for(var j=0; j< currentStepList.length; j++){
          if(currentStepIndex == 0){
            if(currentStepList[j].isActive){
              this.dirtyIndex = j;
              break;
            }
          }else if(currentStepIndex == 1){
            if(currentStepList[j].isActive){
              this.dirtyTimeIndex = j;
              
              break;
            }
          }else if(currentStepIndex == 2){
            if(currentStepList[j].isActive){
              this.dishNum++; 
            }
          }
        }
        this.currentStepList = currentStepList;
        this.stepObj = stepObj;

    },
    nextGo(){
      //nativeService.alert(this.stepObj);
      var {stepObj} = this;
      if(stepObj[this.currentStepIndex].canGoToNext){               
        this.currentStepIndex = this.currentStepIndex+1;
        if(this.currentStepIndex==2){
           this.colsNum = 4;
        }else{
          this.colsNum = 3;
        }
        this.currentStepList = stepObj[this.currentStepIndex].stepIcon;
      }else{
        nativeService.toast('当前还没选择~');
        return;
      }
    },
    prevGo(){
      var {stepObj} = this;
      this.currentStepIndex = this.currentStepIndex-1;
      if(this.currentStepIndex==2){
        this.colsNum = 4;
      }else{
        this.colsNum = 3;
      }
      this.currentStepList = stepObj[this.currentStepIndex].stepIcon;
    },
    sureSelect(){
      if(this.currentStepIndex==2 && this.clickSelRecord>0){
        var {stepObj} = this;
        var hasSelectList = [];
        for(var i=0; i<stepObj.length; i++){
          var stepIconList = stepObj[i].stepIcon;
          for(var key=0; key<stepIconList.length; key++){
            if(stepIconList[key].isActive){
              hasSelectList.push(stepIconList[key]);
            }
          }
        }
        var sendMode = 4, modeDec = '';
       
        for(var i=0; i<hasSelectList.length; i++){
          if(hasSelectList[i].title=='重度'||hasSelectList[i].title=='半个小时以上'||hasSelectList[i].title=='炒菜锅'){
            sendMode = 2;
            modeDec = '强力洗';
           // nativeService.toast(sendMode);
            nativeService.setItem("smartSelectedMode", {
              name: modeDec,
              sendMode: sendMode
            });
            this.jumpNext('smartSelectedMode'); 
            return;
          }
          if(hasSelectList[i].title=='红酒杯'||hasSelectList[i].title=='奶瓶'){
              sendMode = 5;
              modeDec = '玻璃洗';
            }
          if(hasSelectList[i].title=='水果'){
              sendMode = 11;
              modeDec = '水果洗';
            }
          if(hasSelectList[i].title=='中度' && hasSelectList[i+1].title=='即时'){
                sendMode = 3;
                modeDec = '即时洗';
              }
          if(hasSelectList[i].title=='轻度' && hasSelectList[i+1].title=='半个小时内'){
                sendMode = 4;
                modeDec = '节能洗';
              }
          if(hasSelectList[i].title=='轻度' && hasSelectList[i+1].title=='即时'){
                sendMode = 7;
                modeDec = '超快洗';
              }
        }
         
        nativeService.setItem("smartSelectedMode", {
            name: modeDec,
            sendMode: sendMode
          });
        this.jumpNext('smartSelectedMode'); 
        // nativeService.alert(hasSelectList);
        // nativeService.alert(sendMode);
        return;
      }else {
        nativeService.toast('当前还没选择~');
        return;
      }
    }
   
  },
  created() {},
  computed: {
    isipx: function() {
      return weex && (
                weex.config.env.deviceModel === 'iPhone10,3' || weex.config.env.deviceModel === 'iPhone10,6' //iphoneX
                || weex.config.env.deviceModel === 'iPhone11,8' //iPhone XR
                || weex.config.env.deviceModel === 'iPhone11,2' //iPhone XS
                || weex.config.env.deviceModel === 'iPhone11,4' || weex.config.env.deviceModel === 'iPhone11,6' //iPhone XS Max
                );
    },
    orderBtnStyle() {
      return {
        backgroundColor: "#fff",
        borderRadius: "2px",
        width: "345px",
        borderColor: "rgb(102,102,102)",
        borderWidth: "1px",
        marginBottom:'0px',
        marginTop:'0px',
      };
    },
    textStyle() {
      return {
        color: "#000000"
      };
    },
    startStyle() {
      return {
        color: "#000000"
      };
    },
    dirtyIcon(){
      var icon = this.dirtyIndex == 0 ? this.icon.dirtyLow: this.dirtyIndex == 1?this.icon.dirtyMid:this.icon.dirtyHeavy;
      return icon;
    },
    dirtyTime(){
      return this.dirtyTimeIndex ==0 ?5:this.dirtyTimeIndex==1?30:60;
    }
  }
};
</script>