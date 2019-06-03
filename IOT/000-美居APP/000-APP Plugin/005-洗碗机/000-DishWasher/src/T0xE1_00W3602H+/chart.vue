<template>
<div class="wrapper">
    <midea-header title="水电统计" :isImmersion="true" bgColor="rgb(78,112,246)" titleColor="white"
      leftImg="assets/img/public_ic_white@3x.png" 
      @headerClick="headerClick"></midea-header>
    
    <div ref="swipeArea" class="swipe-area" v-on:swipe="onSwipe($event,item)">
        <div style="margin-top:40px" class="flex_center">
            <text class="water_dec">已累计为你节省   水量 | </text><text class="water_value">{{waterSaved}}</text>
            <text class="water_dec"> L   电量 | </text><text class="water_value">{{waterSaved}}</text><text class="water_dec"> 度</text>
        </div>
        
        <div class="section-content">
            <div class="date-content flex_center">
                <div :class="['date_item','flex_center',item.isActive && 'date_item_active',item.hasBorder && 'has_border',,i==0?'border-left':i==2?'border-right':'']" v-for="(item,i) in dateCheck1"
                    @click="setDateClick(item,'chart1')" :key="i">
                    <text>{{item.name}}</text>
                </div>
            </div>
            <div class="water-content">
                <div class="water-title flex_center_sp">
                    <text class="water_dec">单位:  升</text>
                    <div class="flex_center water-detail">
                        <image class="water-icon" src='./assets/img/water.png'/>
                        <text class="water_dec">用水总量:  </text>
                        <text class="water_value">{{waterSaved}}</text>
                        <text class="water_dec">  L</text>
                    </div>
                </div>
                <midea-linechart-view class="linechart" :data="chartJson1"></midea-linechart-view>
            </div>
            <div class="water-content">
                <div class="water-title flex_center_sp">
                    <text class="water_dec">单位:  度</text>
                    <div class="flex_center water-detail">
                        <image class="water-icon" src='./assets/img/electonic.png'/>
                        <text class="water_dec">用电总量:  </text>
                        <text class="water_value">{{waterSaved}}</text>
                        <text class="water_dec">  度</text>
                    </div>
                </div>
                <midea-linechart-view class="linechart" :data="chartJson2"></midea-linechart-view>
            </div>
        </div>
    </div>
   
</div>
</template>
<style scoped>
.flex_center {
  flex-direction: row;
  justify-content: center;
  align-items: center;
}
.flex_center_sp {
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}

.flex_column_center {
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
}
.wrapper {
    background-color: #4e70f6;
}
.water_dec{
    font-size: 28px;
    color: #fff;
}
.swipe-area {
  display: flex;
  flex: 1;
}
.section-content {
  width: 750px;
  margin: 30px;
  margin-top:60px;
}
.date-content{
  width: 690px;
  height: 60px;
  border-color: #fff;
  border-width: 2px;
  border-radius: 10px;
}
.date_item{
  width: 230px;
  height: 60px;
  line-height: 60px;
  color: #fff;
}
.date_item_active{
  background-color:#fff;
  height: 60px;
  color: #4e70f6;
}
.border-left {
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
}
.border-right {
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
}
.has_border{
  border-right-color: #fff;
  border-right-width: 2px;
}
.water-title {
  width: 690px;
  margin-top: 50px;
}
.water-detail {
  margin-left: -100px;
}
.water_value{
  font-size: 50px;
  color:white;
}
.water-icon {
  width: 24px;
  height: 32px;
  margin-left: 10px;
  margin-right: 10px;
}

.linechart {
  width: 690px;
  height: 350px;
}
</style>
<script>

import mideaHeader from './components/header.vue'
import nativeService from "@/common/services/nativeService";
import httpRequest from "./js/http.js"

export default {
  components: { mideaHeader },
  data() {
    return {
      waterSaved:'100',
      dateCheck1:[
          {key: 0,name:'周',hasBorder:true,isActive: true,
           xValue:['周一','周二','周三','周四','周五','周六','周日']
            },
          {key: 1,name:'月',hasBorder:true,isActive: false,
            xValue:['1日','7日','14日','21日','31日']
          },
          {key: 2,name:'年',hasBorder:false,isActive: false,
            xValue:['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月']
          },
      ],
      dateCheck2:[
          {key: 0,name:'周',hasBorder:true,isActive: true,
           xValue:['周一','周二','周三','周四','周五','周六','周日']
            },
          {key: 1,name:'月',hasBorder:true,isActive: false,
            xValue:['1日','7日','14日','21日','31日']
          },
          {key: 2,name:'年',hasBorder:false,isActive: false,
            xValue:['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月']
          },
      ],
      chartJson1: {
                "x": {
                    "value": [1, 2, 3, 4, 5, 6, 7],
                    "label": ['周一','周二','周三','周四','周五','周六','周日']
                },
                "y": [
                    {
                        "value": [0, 0, 0, 0, 0, 0, 0],
                        "title": "水量(L)",
                        "color": "#2AD2FC", //折线颜色
                        "starcolor": "#ffffff", //区域背景渐变开始颜色（从下自上）
                        "endcolor": "#2AD2FC", //区域背景渐变结束颜色（从下自上）
                        "smooth":1,  //0直线，1平滑
                    },
                   
                ],
                "description": "",
                "legend": {
                    "position": "TOP_LEFT", //"TOP_LEFT"/"TOP_RIGHT"
                    "orientation": "HORIZONTAL" //"HORIZONTAL"/"BOTTOM_RIGHT"
                },
                "unit": {
                    "x": "",
                    "y": "L"
                }
            },

             chartJson2: {
                "x": {
                    "value": [1, 2, 3, 4, 5, 6, 7],
                    "label": ['周一','周二','周三','周四','周五','周六','周日']
                },
                "y": [
                    {
                        "value": [0, 0, 0, 0, 0, 0, 0],
                        "title": "电量(度)",
                        "color": "#1B81FB", //折线颜色
                        "starcolor": "#ffffff", //区域背景渐变开始颜色（从下自上）
                        "endcolor": "#1B81FB", //区域背景渐变结束颜色（从下自上）
                        "smooth":1,  //0直线，1平滑
                    }
                   
                ],
                "description": "",
                "legend": {
                    "position": "TOP_LEFT", //"TOP_LEFT"/"TOP_RIGHT"
                    "orientation": "HORIZONTAL" //"HORIZONTAL"/"BOTTOM_RIGHT"
                },
                "unit": {
                    "x": "",
                    "y": "度"
                }
            }
    };
  },

  methods: {
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
    setDateClick(item,which){
        var query_type = 'week';
        if(item.name=='周'){
            query_type = 'week';
        }else if(item.name=='月'){
            query_type = 'month';
        }else if(item.name=='年'){
            query_type = 'year';
        }
        this.chartFun(item,which,query_type);
    },
    onSwipe(event, item) {
      this.eventObject = event;
      if (event.direction == "up" || event.direction == "down") {
        var path = "standby.js";
        nativeService.goTo(path, false, true);
      }
    },
    chartFun(item,which,query_type){
        var self = this;
        var currentArr = which == "chart1"? this.dateCheck1:which =="chart2" ?this.dateCheck2:[];
        var chartObj1 = JSON.parse(JSON.stringify(this.chartJson1));
        var chartObj2 = JSON.parse(JSON.stringify(this.chartJson2));
        for(var i=0; i<currentArr.length; i++){
            if(item.key==currentArr[i].key){
                currentArr[i].isActive = true;
            }else{
                currentArr[i].isActive = false;
            }
        }
        httpRequest.WaterDisherConsumption(query_type,function(ret){
            self.waterSaved = ret.savedWater;
            var result = ret.data;
            var yE = [], yW = [], xLabel = [];
            for(var i=0; i<result.length; i++){
                yE.push(result[i].yElectricity);
                yW.push(result[i].yWater);
                xLabel.push(result[i].xTime);
            }
            chartObj1.y[0].value = yW;
            chartObj2.y[0].value = yE;
            chartObj1.x.label = xLabel;
            chartObj2.x.label = xLabel;
            if(which=="chart1"){
                self.dateCheck1 = currentArr;
                self.chartJson1 = JSON.parse(JSON.stringify(chartObj1));
            }else if(which=="chart2"){
                self.dateCheck2 = currentArr;
                self.chartJson2 = JSON.parse(JSON.stringify(chartObj2));
            }
        });
    }
  },
  created() { 
    var self = this;
    var query_type = 'week';
    var item = {key: 0,name:'周',hasBorder:true,isActive: true,
                xValue:['周一','周二','周三','周四','周五','周六','周日']};
    self.chartFun(item,'chart1',query_type);
    self.chartFun(item,'chart2',query_type);
  },
  mounted() {   
    
  }
};
</script>