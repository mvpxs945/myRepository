<template>
  <div ref="container" v-if="show" class="container">
    <midea-mask @click.capture.stop="layoutClick"></midea-mask>
    <div ref="dialog" class="dialog-box">
      <text class="content-title">使用贴士</text>
      <div class="">
        <slider class="slider" auto-play="false" infinite="false" :index="tipIndex" @change="onchange">
          <div v-for="(item,i) in tipsList" :key="i" class="dialog-content flex_column_center">
              <image class="tip-img" :src="item.url"/>
              <text class="tip-title">{{item.tipTitle}}</text>
              <text class="tip-content">{{item.tipContent}}</text>
          </div>
          <indicator class="indicator"></indicator>
        </slider>
      </div>
      <text class="btn-text" @click="jumpToNext">{{tipIndex == tipsList.length-1?'知道了':'下一贴'}}</text>
    </div>
  </div>
</template>

<style scoped>
  .container {
    width: 750px;
    align-items: center;
    justify-content: center;
  }
  .flex_center {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }
  .flex_column_center {
    align-items: center;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .mask {
    top: 0;
    width: 750px;
    justify-content: center;
    align-items: center;
  }

  .dialog-box {
    background-color: #FFF;
    width: 710px;
    border-radius:20px;
    position:fixed;
    left:20px;
    z-index:100;
    top:200px;
  }

  .content-title {
    color: #3872E6;
    font-family: PingFangSC-Medium;
    font-weight: 600;
    font-size: 33px;
    text-align: center;
    height: 120px;
    line-height: 120px;
    border-bottom-color: #D9D9D9;
    border-bottom-width: 1px;
  }
  .dialog-content {
    width: 710px;
  }
  .slider {
    position: relative;
    width: 710px;
    height: 830px;
  }
  .tip-img {
    width: 584px;
    height: 438px;
    margin-top: 40px;
  }
  .tip-title {
    color: #3872E6;
    font-family: PingFangSC-Medium;
    font-weight: 600;
    font-size: 32px;
    text-align: center;
    height: 40px;
    line-height: 40px;
  }
  .tip-content {
    font-family: PingFangSC-Medium;
    font-size: 25px;
    color: rgba(56,114,230,0.70);
    text-align: center;
    line-height: 36px;
    width: 540px;
    margin-top: 20px;
  }

.indicator {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  height: 60px;
  itemColor: rgba(56,114,230,0.30);
  itemSelectedColor: #3872E6;;
}

  .btn-text {
    width: 710px;
    font-size: 33px;
    font-family: PingFangSC-Regular;
    color: #3872E6 ;
    height: 100px;
    line-height: 100px;
    border-top-color: #D9D9D9;
    border-top-width: 1px;
    text-align: center;
  }
 
</style>

<script>
  import  mideaMask from './mask.vue';
  import nativeService from "@/common/services/nativeService";
  const dom= weex.requireModule('dom');
  module.exports = {
    components: { mideaMask },
    props: {
      show: {
        type: Boolean,
        default: false
      },
      maskBgColor: {
        type: String,
        default: 'rgba(0,0,0,0.6)'
      },
      list:{
        type: Array,
        default: () => ([])
      },
    },
    data: () => ({
      tipsList:[
        {url:'assets/img/tips_wash_fen.png',tipTitle:'放置洗涤粉',tipContent:'有效漂洗食物残渣，清除餐具上面的污染物、油污等顽渍，令餐具焕然一新'},
        {url:'assets/img/tips_wash_bright.png',tipTitle:'放置软水盐',tipContent:'洗碗机专用盐，有效除去水垢，提升洗净效果，结束后餐具和机器内壁光亮一新'},
        {url:'assets/img/tips_wash_position.png',tipTitle:'餐具摆放',tipContent:'去除较大残渣后，由大到小逐个倾斜摆放；刀、叉、筷、勺按指示摆放在上搁架。正确摆放餐具有助于获得较好清洁效果'},
        {url:'assets/img/tips_mode_recommand.png',tipTitle:'选择洗涤模式',tipContent:'根据污染严重程度和餐具多少选择合适的洗涤模式以获得较好的洗涤效果'},
      ],
      tipIndex:0,
      timeDelay:60,
    }),
    created () {
      var env=weex.config.env;
      this.maskHeight=env.deviceHeight / env.deviceWidth * 750;
      this.dialogTop= (this.maskHeight-300)/2;
    },
    mounted(){
    //  this.timeDelayFun();
    },

    methods: {
      timeDelayFun:function(){
        var self = this;
        setTimeout(function(){
          self.timeDelay = self.timeDelay-1;
          if(self.timeDelay == 0){
            self.timeDelay = 60;
            self.show = false;
            return;
          } 
          self.timeDelayFun();
        },1000);
      },
      jumpToNext:function(){
        var self = this;
        if(self.tipIndex == self.tipsList.length-1){
          self.tipIndex = 0;
          self.show = false;
          nativeService.setItem("isFirst",'false');
          this.$emit('tipClose',{});
          return;
        }
        self.tipIndex++;
      },
      onchange:function(event){
        this.tipIndex = event.index;
      },
      layoutClick(event){
        //  this.$emit('close', {});
        event.preventDefault();
      }
    }
  };
</script>
