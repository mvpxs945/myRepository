<template>
<div class="wrapper">
    <midea-header title="用水明细" :isImmersion="true" bgColor="#fff" titleColor="#4A4A4A" fontSize="33"
      leftImg="assets/img/back_black.png" @headerClick="headerClick"></midea-header>
    <div class="swipe-area">
        <div :style="{'width':'750px','height':'20px','background-color':'#EDEDED'}"></div>
        <div class="water-lay flex_column_center">
            <div class="water-data flex_center">
                <text class="water_value">{{waterSaved}}</text>
                <text class="water_unit"> L</text>
            </div>
            <text class="water_dec">布谷洗碗机累计为您大约节省水量</text>
        </div>
        <div class="section-content flex_column_center">
          <div class="water-content flex_center_sp">
              <text class="content-desc">用水总量： {{waterUsed}} L</text>
              <div class="date-content flex_center">
                <div :class="['date_item','flex_center',(item.key == dateIndex) && 'date_item_active',item.hasBorder && 'has_border',i==0?'border-left':i==2?'border-right':'']" 
                  v-for="(item,i) in dateCheck1" @click="setDateClick(item,'chart1')" :key="i">
                    <text class="date-text">{{item.name}}</text>
                </div>
            </div>
          </div>
          <midea-barchart-view class="barchart" :data="waterJson"></midea-barchart-view>
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
  justify-content: center;
  align-items: center;
}
.wrapper {
    background-color: #fff;
}
.swipe-area {
  display: flex;
  flex: 1;
}
.water-lay {
  margin: 32px;
  background-color:#3872E6;
  border-radius: 15px;
  height: 250px;
}
.water-data {
  margin-bottom: 32px;
}
.water_dec{
  font-family: PingFangSC-Regular;
  font-size: 28px;
  color: rgba(255,255,255,0.70);
}
.water_unit {
  font-family: bugu;
  font-size: 84px;
  color: rgba(255,255,255,0.70);
  text-align: center;
  line-height: 84px;
}
.water_value {
  font-family: bugu;
  font-size: 84px;
  color: #fff;
  text-align: center;
  line-height: 84px;
}

.section-content {
  width: 750px;
  margin-top:60px;
}
.water-content {
  width: 750px;
  height: 80px;
  padding-left: 32px;
  padding-right: 60px;
}
.content-desc {
  font-family: PingFangSC-Regular;
  font-size: 30px;
  color: #4A4A4A;
}

.date-content{
  width: 210px;
  height: 50px;
  line-height: 50px;
  border-radius: 50px;
  border: 2px solid #3872E6;
  border-width: 2px;
  border-color: #3872E6;
}
.date_item{
  width: 70px;
  color: #3872E6;
}
.date-text {
  font-size: 20px;
  font-family: PingFangSC-Regular;
  height: 48px;
  line-height: 48px;
}
.date_item_active{
  width: 70px;
  background-color:#3872E6;
  color: #fff;
}
.border-left {
  border-top-left-radius: 25px;
  border-bottom-left-radius: 25px;
}
.border-right {
  border-top-right-radius: 25px;
  border-bottom-right-radius: 25px;
}
.has_border{
  border-right-color: #3872E6;
  border-right-width: 2px;
}

.barchart {
  width: 690px;
  height: 350px;
  margin-left: 10px;
}
</style>
<script>

import mideaHeader from './components/header.vue';
import nativeService from "@/common/services/nativeService";
import httpRequest from "./js/http.js";
export default {
  components: { mideaHeader },
  data() {
    return {
      waterSaved:0,
      waterUsed:0,
      queryType:'week',
      consumption:[],
      dateIndex:0,
      dateCheck1:[
        {key: 0,name:'周',hasBorder:false,isActive: true},
        {key: 1,name:'月',hasBorder:true,isActive: false},
        {key: 2,name:'年',hasBorder:false,isActive: false},
      ],
    };
  },

  methods: {
    headerClick: function(tag){
      console.log('headerClick:'+tag);
      switch(tag){
        case 'leftImgClick':
          nativeService.goBack();
          break;
        }
    },
    setDateClick(item,which){
        var self = this;
        self.dateIndex = item.key;
        if(self.dateIndex == 0){
          self.dateCheck1[0].hasBorder = false;
          self.dateCheck1[1].hasBorder = true;
          self.dateCheck1[2].hasBorder = false;
        }else if(self.dateIndex == 1){
          self.dateCheck1[0].hasBorder = false;
          self.dateCheck1[1].hasBorder = false;
          self.dateCheck1[2].hasBorder = false;
        }else if(self.dateIndex == 2){
          self.dateCheck1[0].hasBorder = true;
          self.dateCheck1[1].hasBorder = false;
          self.dateCheck1[2].hasBorder = false;
        }
        self.queryType = item.name == '周'? 'week':item.name == '月'?'month':'year';
        this.chartFun(item,which,self.queryType);
    },
    chartFun(item,which,query_type){
        var self = this;
        httpRequest.WaterDisherConsumption(query_type,function(ret){
            if(ret.savedWater == '') {
              self.waterSaved = 0;
              self.waterUsed = 0;
              if(query_type == 'week'){
                self.consumption = [0,0,0,0,0,0,0];
              }else if(query_type == 'month'){
                self.consumption = [0,0,0,0,0,0,0];
              }else if(query_type == 'year'){
                self.consumption = [0,0,0,0,0,0,0,0,0,0,0,0];
              }
              return;
            }
            self.waterSaved = parseInt(ret.savedWater);
            var result = ret.data;
            var yW = [], xLabel = [];
            let waterTemp = 0;
            if(ret.queryType == 'week'){
              for(let i=0; i<result.length; i++){
                yW.push(parseInt(result[i].yWater));
                waterTemp = waterTemp + parseInt(result[i].yWater);
              }
            }else if(ret.queryType == 'month'){
              let temp = 0;
              for(let i=0; i<result.length; i++){
                temp = temp+parseInt(result[i].yWater);
                if(i==0 || i==4 || i==9 || i==14 || i==19 || i==24 || i== result.length-1) {
                  yW.push(temp);
                  temp = 0;
                }
                waterTemp = waterTemp + parseInt(result[i].yWater);
              }
            }else if(ret.queryType == 'year'){
              for(let i=0; i<result.length; i++){
                yW.push(parseInt(result[i].yWater));
                waterTemp = waterTemp + parseInt(result[i].yWater);
              }
            }
            self.waterUsed = waterTemp;
            self.consumption = yW;
        });
    }
  },
  created() { 
    var self = this;
    var query_type = 'week';
    var item = {key: 0,name:'周',hasBorder:true,isActive: true};
    self.chartFun(item,'chart1','week');
  },
  beforeCreate(){
    //	引入外部字体
    // var domModule = weex.requireModule('dom');
    // domModule.addRule('fontFace', {
    //   'fontFamily': "bugu",
    //   'src': "url('./assets/bugu_font.ttf')"
    // });
    var domModule = weex.requireModule('dom');
    nativeService.getPath((path) => {
      let fontUrl = path + 'assets/bugu_font.ttf';
      domModule.addRule('fontFace', {
        'fontFamily': "bugu",
        'src': "url('" + fontUrl + "')"
        });
    });
  },
  computed:{
    waterJson:function(){
      var self = this;
      var myDate=new Date();
      let year = myDate.getFullYear();
      let month = myDate.getMonth();
      myDate = new Date(year,month+1,0);
      let lastDay = myDate.getDate();
      let weekXValue = [1,2,3,4,5,6,7];
      let weekXLabel = ['周一','周二','周三','周四','周五','周六','周日'];
      let monthXValue = [1,5,10,15,20,25,lastDay];
      let monthXLabel = ['1','5','10','15','20','25',''+lastDay];
      let yearXValue = [1,2,3,4,5,6,7,8,9,10,11,12];
      let yearXLabel = ["1月","2月","3月","4月","5月","6月","7月","8月","9月","10月","11月","12月"];
      let waterJson = {
        "x": {"value": [1, 2, 3, 4, 5, 6, 7], "label": ['周一','周二','周三','周四','周五','周六','周日']},
        "y": [{"value": [0, 0, 0, 0, 0, 0, 0], "color": "#3872E6"}],
        "borderRadius": "4",
        "xAxisColor":"#ECECEC",
        "xAxisLabelColor":"#4A4A4A",
        "yAxisColor":"#ECECEC",
        "yAxisLabelColor":"#4A4A4A",
        "legend": {
            "position": "TOP_LEFT", //"TOP_LEFT"/"TOP_RIGHT"
            "orientation": "HORIZONTAL",//"HORIZONTAL"/"BOTTOM_RIGHT"
            "show": false,
        },
        "unit": {
          "x": "",
          "y": ""
        }
      };
      if(self.queryType == 'week'){
        waterJson.x.label=weekXLabel;
        waterJson.x.value= weekXValue;
      }else if(self.queryType == 'month'){
        waterJson.x.label= monthXLabel;
        waterJson.x.value= monthXValue;
      }else if(self.queryType == 'year'){
        waterJson.x.label= yearXLabel;
        waterJson.x.value= yearXValue;
      }
      waterJson.y[0].value= self.consumption;
      return waterJson;
    }
  }

};
</script>