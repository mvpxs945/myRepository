<template>
<div class="wrapper">
    <midea-header title="水电统计" :isImmersion="true" bgColor="rgb(78,112,246)" titleColor="white"
      leftImg="assets/img/public_ic_white@3x.png" 
      @headerClick="headerClick"></midea-header>
    
    <div ref="swipeArea" class="swipe-area">
        <div style="margin-top:40px" class="flex_center">
            <text class="water_dec">已累计为你节省   水量 | </text><text class="water_value">{{waterSaved}}</text>
            <text class="water_dec"> 升   电量 | </text><text class="water_value">{{elecSaved}}</text><text class="water_dec"> 度</text>
        </div>
        
        <div class="section-content">
            <div class="date-content flex_center">
                <div :class="['date_item','flex_center',item.isActive && 'date_item_active',item.hasBorder && 'has_border',,i==0?'border-left':i==2?'border-right':'']" v-for="(item,i) in dateCheck1"
                    @click="setDateClick(item,'chart1')" :key="i">
                    <text :class="[item.isActive?'date_item_text_on':'date_item_text_off']">{{item.name}}</text>
                </div>
            </div>
            <div class="water-content">
                <div class="water-title flex_center_sp">
                    <text class="water_dec">单位:  升</text>
                    <div class="flex_center water-detail">
                        <image class="water-icon" src='./assets/img/water.png'/>
                        <text class="water_dec">{{title}}用水总量:  </text>
                        <text class="water_value">{{totalWater}}</text>
                        <text class="water_dec">  升</text>
                    </div>
                </div>
                <midea-barchart-view class="linechart" :data="chartJson1"></midea-barchart-view>
            </div>
            <div class="water-content">
                <div class="water-title flex_center_sp">
                    <text class="water_dec">单位:  度</text>
                    <div class="flex_center water-detail">
                        <image class="water-icon" src='./assets/img/electonic.png'/>
                        <text class="water_dec">{{title}}用电总量:  </text>
                        <text class="water_value">{{totalElec}}</text>
                        <text class="water_dec">  度</text>
                    </div>
                </div>
                <midea-barchart-view class="linechart" :data="chartJson2"></midea-barchart-view>
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
.date_item_text_on{
  color: #4e70f6;
  font-size: 28px;
}
.date_item_text_off{
  color: #fff;
  font-size: 28px;
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
  height: 360px;
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
      waterSaved:0,
      elecSaved:0,
      totalWater:0,
      totalElec:0,
      title:'本周',
      dateCheck1:[
          {key: 0,name:'周',hasBorder:true,isActive: true,
           xValue:['周一','周二','周三','周四','周五','周六','周日']
            },
          {key: 1,name:'月',hasBorder:true,isActive: false,
            xValue:['1','5','10','15','20','25','31']
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
                        "label":[],
                        "color": "#ffffff", //折线颜色
                    },
                   
                ],
                "description": "",
                "borderRadius": "4",
                "xAxisColor":"#ffffff",
                "xAxisLabelColor":"#ffffff",
                "yAxisColor":"#ffffff",
                "yAxisLabelColor":"#ffffff",
                "legend": {
                    "position": "TOP_LEFT", //"TOP_LEFT"/"TOP_RIGHT"
                    "orientation": "HORIZONTAL",//"HORIZONTAL"/"BOTTOM_RIGHT"
                    "show": false,
                },
                "unit": {
                    "x": "",
                    "y": ""
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
                        "label":[],
                        "color": "#ffffff", //折线颜色
                    }
                   
                ],
                "description": "",
                "description": "",
                "borderRadius": "4",
                "xAxisColor":"#ffffff",
                "xAxisLabelColor":"#ffffff",
                "yAxisColor":"#ffffff",
                "yAxisLabelColor":"#ffffff",
                "legend": {
                    "position": "TOP_LEFT", //"TOP_LEFT"/"TOP_RIGHT"
                    "orientation": "HORIZONTAL", //"HORIZONTAL"/"BOTTOM_RIGHT"
                    "show": false    
                },
                "unit": {
                    "x": "",
                    "y": ""
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
            this.title = '本周';
            query_type = 'week';
        }else if(item.name=='月'){
            query_type = 'month';
            this.title = '本月';
        }else if(item.name=='年'){
            query_type = 'year';
            this.title = '今年';
        }
        for(var i=0; i<this.dateCheck1.length; i++){
            if(item.key==this.dateCheck1[i].key){
                this.dateCheck1[i].isActive = true;
            }else{
                this.dateCheck1[i].isActive = false;
            }
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
        var chartObj1 = JSON.parse(JSON.stringify(this.chartJson1));
        var chartObj2 = JSON.parse(JSON.stringify(this.chartJson2));
        httpRequest.WaterDisherConsumption(query_type,function(ret){
            if(ret.savedWater == ''){
                self.waterSaved = 0;
            }else {
                self.waterSaved = parseInt(ret.savedWater);
            }
            if(ret.savedElectricity == ''){
                self.elecSaved = 0;
            }else{
                self.elecSaved = parseInt(ret.savedElectricity);
            }
            var result = ret.data;
            var yE = [], yW = [], xLabel = [];
            var waterTemp = 0;
            var elecTemp = 0;
            for(var i=0; i<result.length; i++){
                yE.push(parseInt(result[i].yElectricity));
                yW.push(parseInt(result[i].yWater));
                waterTemp+=parseInt(result[i].yWater);
                elecTemp+=parseInt(result[i].yElectricity);
            }
            self.totalWater = waterTemp;
            self.totalElec = elecTemp;
            if(item.name == '月'){
                var myDate=new Date();
                let year = myDate.getFullYear();
                let month = myDate.getMonth();
                myDate = new Date(year,month+1,0);
                let lastDay = myDate.getDate();
                var tempArr =[];
                for(let j=0;j<lastDay;j++){
                    if(j==0){
                        tempArr[j] = '1';
                    }else if(j == lastDay-1){
                        tempArr[j] = lastDay+'日';
                    }else if(j%5 == 0){
                        tempArr[j] = j+'';
                    }else {
                         tempArr[j] = '';
                    }
                }
                self.dateCheck1[1].xValue = tempArr;
            }
            chartObj1.y[0].value = yW;
            chartObj2.y[0].value = yE;
            if(item.name=='周'){
                chartObj1.x.label = self.dateCheck1[0].xValue;
                chartObj2.x.label = self.dateCheck1[0].xValue;
            }else if(item.name=='月'){
                chartObj1.x.label = self.dateCheck1[1].xValue;
                chartObj2.x.label = self.dateCheck1[1].xValue;
            }else if(item.name=='年'){
                chartObj1.x.label = self.dateCheck1[2].xValue;
                chartObj2.x.label = self.dateCheck1[2].xValue;
            }
            self.chartJson1 = JSON.parse(JSON.stringify(chartObj1));
            self.chartJson2 = JSON.parse(JSON.stringify(chartObj2));
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