import nativeService from "@/common/services/nativeService";
const picker = weex.requireModule("picker");
import cmdFun from "./dualCmd.js";

export default {
    pickOrderTime:function(mode,callback) {
        var self = this;
        var myDate = new Date();//获取系统当前时间,东8区相差8小时
        var currentHour = myDate.getHours();
        var currentMinute = myDate.getMinutes();
  
        var itemsDay = ['今天','明天'];
        var itemsHour = [],itemsMinute = [];
        for(var i=0; i<24; i++){
            itemsHour.push(i+'');
        };
        for(var key=0; key<=59; key++){
            itemsMinute.push(key+'');
        };
        var orderObj = {
            dayIndex:0,
            hourIndex:0,
            minuteIndex:0,
        };
        var pickItem = [
            {index: orderObj.dayIndex,item: itemsDay,label: ""},
            {index: orderObj.hourIndex,item: itemsHour,max:20,min: 10,label: "时"},
            {index: orderObj.minuteIndex,item: itemsMinute,label: "分"},
        ];
        picker.pick({
              'items': pickItem,
              'title': '请选择时间', //取消和确定中间那标题
              'cancelTxt': '取消', //取消按钮文字
              'confirmTxt': '确定', //确定按钮文字,
              'cancelTxtColor': '#020F13', //取消颜色
              'confirmTxtColor': '#020F13', //标题颜色
              'titleColor': '#020F13', //标题颜色
              'titleBgColor': '#E7EDEF' //标题栏颜色
          }, event => {
              var data = event.data;
              var dataArr = data.replace("[", "").replace("]", "").split(",");
              orderObj.dayIndex = dataArr[0];
              orderObj.hourIndex = dataArr[1];
              orderObj.minuteIndex = dataArr[2];
  
              var day = 0;
              var sendAllMinutes = parseInt(itemsHour[orderObj.hourIndex])*60+parseInt(itemsMinute[orderObj.minuteIndex]);
              var currentAllMinutes = currentHour*60+currentMinute;
              if(itemsDay[orderObj.dayIndex]=='今天'){
                day = 0;
                if(sendAllMinutes<=currentAllMinutes){
                  nativeService.toast("选择的时间不能少于当前时间哦");
                  return;
                }
              }
              if(itemsDay[orderObj.dayIndex]=='明天'){
                day = 1;
                sendAllMinutes = day*24*60+parseInt(itemsHour[orderObj.hourIndex])*60+parseInt(itemsMinute[orderObj.minuteIndex]);
              }
              var sendHour = parseInt((sendAllMinutes - currentAllMinutes)/60);
              var sendMinute = (sendAllMinutes - currentAllMinutes)%60;
  
              var sendCmd = cmdFun.cmdOrderWashing(mode,0,sendHour,sendMinute);
              nativeService.showLoading();
              nativeService.startCmdProcess("control",sendCmd,function(suc) {
                  nativeService.hideLoading();
                  var arr = suc.replace(/\[|]/g, "").split(",");//去掉中括号
                  var analysisObj = cmdFun.analysisCmd(arr);
                  if(callback != undefined){
                    callback(analysisObj);
                  }
                },
                function(fail) {
                  nativeService.hideLoading();
                }
              );
          });
      },
}