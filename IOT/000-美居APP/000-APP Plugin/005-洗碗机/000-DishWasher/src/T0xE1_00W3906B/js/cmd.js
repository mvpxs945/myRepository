import message from "@/common/util/smartMessage";
import nativeService from "@/common/services/nativeService";
const globalEvent = weex.requireModule("globalEvent");
const bridgeModule = weex.requireModule("bridgeModule");


var statusObj = {
  boxUp:{
    workingState:{
      name:"工作状态",value:0x00,
      // view:{0:"省电",1:"待机",2:"预约",3:"运行",4:"错误",5:"软水档位设置",8:"在线一",9:"在线二"}
    },
    program:{
      name:"程序",value:0x00,
      // view:{0:"空档",1:"智能洗",2:"强力洗",3:"即时洗",4:"节能洗",5:"玻璃洗",6:"1小时洗",7:"超快洗",8:"预冲洗",9:"90分钟洗",10:"自清洁洗",11:"水果洗"},
      viewArr:["空档","智能洗","强力洗","即时洗","节能洗","自定义洗","1小时洗","超快洗","预冲洗","90分钟洗","自清洁","水果洗","自定义洗"]
    },
    functionOptions:{
      name:"附加功能",value:0x00,
      //view:{0:"不附加",1:"加强干燥",2:"节能",3:"加速",4:"加强洗涤",5:"增加漂洗",6:"增加预洗",7:"半载"}
    },
    regionalOptions:{
      name:"洗涤区域",value:0x00,
      // view:{1:"上半区域",2:"下半区域",3:"上下区域交替"}
    },
    displaySign:{
      name:"显示标志",
      detail:{
          doorSwitch:{name:"门开关",value:0x00,view:{0:"开门",1:"关门"}},
          brightDishAgent:{name:"缺亮碟剂",value:0x00,view:{0:"不缺",1:"缺少"}},
          salt:{name:"缺盐",value:0x00,view:{0:"不缺",1:"缺少"}},
          startStop:{name:"启停",value:0x00,view:{0:"暂停",1:"启动"}},
          lockable:{name:"童锁",value:0x00,view:{0:"未锁",1:"已锁"}},
          keepFresh:{name:"保鲜",value:0x00,view:{0:"无保鲜",1:"正在保鲜"}},
          noWater:{name:"缺水",value:0x00,view:{0:"不缺",1:"缺水"}}
      }
    },
    programTimeRemaining:{
      name:"程序剩余时间",value:0x00
    },
    appointmentHour:{
      name:"预约时间（小时）",value:0x00
    },
    appointmentMinute:{
      name:"预约时间（分钟）",value:0x00
    },
    setAppointmentHour:{
      name:"设定的预约时间（小时）",value:0x00
    },
    setAppointmentMinute:{
      name:"设定的预约时间（分钟）",value:0x00
    },
    washingStage:{
      name:"洗涤阶段",value:0x00,
      // view:{0:"未洗涤，不标",1:"预洗/智能洗为'智能分析'",2:"主洗",3:"漂洗",4:"干燥",5:"结束"}
    },
    errorCode:{
      name:"错误代码",value:0x00,
      //view:{1:"进水故障",3:"加热故障",4:"溢流故障",8:"分水阀定位故障",9:"触摸提示"}
    },
    realTimeTemperature:{
      name:"实时温度",value:0x00
    },
    waterLevel:{
      name:"软水档位",value:0x01
    },
    fenpeiqiLevel:{
      name:"分配器",value:0x01
    },
    setKeepTime:{
      name:"设定保管时间",value:0x00
    },
    keepTime:{
      name:"保管时间",value:0x00
    },
    // washingTimes:{
    //     name:"洗涤次数",value:0x01
    // },
    mainWashingTemperature:{
      name:"主洗温度",value:45
    },
    piaoWashTemperature:{
      name:"漂洗温度",value:50
    },
    countSalt:{
      name:"投放盐次数",value:21
    },
    countBrightDishAgent:{
      name:"投放亮碟剂次数",value:0
    },
    isError:{
      name:"是否故障",value:false
    }
  }
};

export default {
  //10进制转换8位2进制的方法
  tranformTo2Bit: function(val) {
    var _str_val = val.toString(2);
    var _str = "";
    if (_str_val.length < 8) {
      for (var i = 0; i < 8 - _str_val.length; i++) {
        _str += "0"; //补零
      }
    }
    var str_2 = _str + _str_val;
    return str_2;
  },
  // 查询指令   上柜00,下柜01
  createQueryMessage() {
    var messageBody = message.createMessageBody(1); 
    message.setByte(messageBody, 0, 0x00);
    var sendMessage = message.createMessage(0xe1, 0x03, messageBody);
    //nativeService.alert(sendMessage);    
    return sendMessage;
  },
   // 查询统计指令
   createCountQueryMessage() {
    var messageBody = message.createMessageBody(34); 
    message.setByte(messageBody, 0, 1);
    var sendMessage = message.createMessage(0xe1, 0x03, messageBody);
    //nativeService.alert(sendMessage);    
    return sendMessage;
  },
  //控制启动指令
  createControlMessage(mode, additionalMode) {
    var messageBody = message.createMessageBody(24); 
    message.setByte(messageBody, 0, 0x08);
    message.setByte(messageBody, 1, 0x03);
    message.setByte(messageBody, 2, mode);
    message.setByte(messageBody, 3, additionalMode);
    message.setBit(messageBody, 5, 3, 0x01);
    var sendcmd = message.createMessage(0xe1, 0x02, messageBody);
    //nativeService.alert(sendcmd);    
    return sendcmd;
  },
   //预约中直接启动指令
   createOrderControlMessage(mode, additionalMode) {
    var messageBody = message.createMessageBody(24); 
    message.setByte(messageBody, 0, 0x08);
    message.setByte(messageBody, 1, 0x03);
    message.setByte(messageBody, 2, mode);
    message.setByte(messageBody, 3, additionalMode);
    message.setBit(messageBody, 5, 3, 0x01);
    message.setByte(messageBody, 7, 0);
    message.setByte(messageBody, 8, 0);
    var sendcmd = message.createMessage(0xe1, 0x02, messageBody);
    //nativeService.alert(sendcmd);    
    return sendcmd;
  },
   //关机指令
   cmdShutDown(){
    var messageBody = message.createMessageBody(19); 
    message.setByte(messageBody, 0,0x08);
    message.setByte(messageBody, 1,0x00);
    var sendMessage = message.createMessage(0xe1, 0x02, messageBody);
    //nativeService.alert(sendMessage);
    return sendMessage;
  },
  //取消工作指令
  cmdCancelWash(){
    var messageBody = message.createMessageBody(19); 
    message.setByte(messageBody, 0,0x08);
    message.setByte(messageBody, 1,0x01);
    var sendMessage = message.createMessage(0xe1, 0x02, messageBody);
    //nativeService.alert(sendMessage);
    return sendMessage;
  },
  //暂停or继续指令
  cmdStartPause(pauseRecord){
    var messageBody = message.createMessageBody(12); 
    message.setByte(messageBody, 0,0x83);
    message.setByte(messageBody, 1,pauseRecord);
    var sendMessage = message.createMessage(0xe1, 0x02, messageBody);
    //nativeService.alert(sendMessage);
    return sendMessage;
  },
  //解锁
  cmdNotLock(){
    var messageBody = message.createMessageBody(12); 
    message.setByte(messageBody, 0,0x83);
    message.setByte(messageBody, 1, 4);
    var sendMessage = message.createMessage(0xe1, 0x02, messageBody);
    //nativeService.alert(sendMessage);
    return sendMessage;
  },
   //上锁
   cmdLock(){
    var messageBody = message.createMessageBody(12); 
    message.setByte(messageBody, 0,0x83);
    message.setByte(messageBody, 1, 3);
    var sendMessage = message.createMessage(0xe1, 0x02, messageBody);
    //nativeService.alert(sendMessage);
    return sendMessage;
  },
  //预约指令
  cmdOrderWashing:function(mode,additionalMode,timeH,timeM){
    var messageBody = message.createMessageBody(13);
    message.setByte(messageBody,0,0x08);
    message.setByte(messageBody,1,0x02);
    message.setByte(messageBody,2,mode);
    message.setByte(messageBody,3,additionalMode);
    message.setByte(messageBody,7,timeH);
    message.setByte(messageBody,8,timeM);
    var sendMessage = message.createMessage(0xE1,0x02,messageBody);
    //nativeService.alert(sendMessage); 
    return sendMessage;
  },
  //取消预约指令
  cmdCancelOrderWashing:function(){
      var messageBody = message.createMessageBody(13);
      message.setByte(messageBody,0,0x08);
      message.setByte(messageBody,1,0x04);
      var sendMessage = message.createMessage(0xE1,0x02,messageBody);
      //nativeService.alert(sendMessage);   
      return sendMessage;
  },
   //设定保管时间
   cmdSetSafeKeep:function(value){
    var messageBody = message.createMessageBody(12);
    message.setByte(messageBody,0,0x86);
    message.setByte(messageBody,1,value);
    var sendMessage = message.createMessage(0xE1,0x02,messageBody);
    return sendMessage;
  },
  //启动保管
  cmdSafeKeep:function(value){
    var messageBody = message.createMessageBody(15);
    message.setByte(messageBody,0,0x81);
    message.setByte(messageBody,4,value);
    var sendMessage = message.createMessage(0xE1,0x02,messageBody);
    return sendMessage;
  },
   //设置软水盐档位
   cmdSetSalt:function(value){
    var messageBody = message.createMessageBody(12);
    message.setByte(messageBody,0,0x80);
    message.setByte(messageBody,1,value);
    var sendMessage = message.createMessage(0xE1,0x02,messageBody);
    return sendMessage;
  },
   //设置亮碟剂档位
   cmdSetBrightDish:function(value){
    var messageBody = message.createMessageBody(12);
    message.setByte(messageBody,0,0x84);
    message.setByte(messageBody,1,value);
    var sendMessage = message.createMessage(0xE1,0x02,messageBody);
    return sendMessage;
  },
  //设置自定义洗涤
  cmdStartDiyWashing: function(washTime, washTemperature, dryTemperature){
    var messageBody = message.createMessageBody(6);
    message.setByte(messageBody,0,0x82);
    message.setByte(messageBody,1,washTime);
    message.setByte(messageBody,3,washTemperature);
    message.setByte(messageBody,5,dryTemperature);
    var sendMessage = message.createMessage(0xE1,0x02,messageBody);
    return sendMessage;
},

  //解析串口指令
  analysisCmd: function(requestCmd) {
    var obj =statusObj.boxUp;
  if((parseInt(requestCmd[9])==2 || parseInt(requestCmd[9])==3 || parseInt(requestCmd[9]) ==4) && parseInt(requestCmd[10])==0){
    obj.workingState.value = parseInt(requestCmd[11]);    
    obj.program.value = parseInt(requestCmd[12]);      
    obj.functionOptions.value = parseInt(requestCmd[13]); 
    var byte15Str = this.tranformTo2Bit(parseInt(requestCmd[15]));
    //nativeService.alert(byte15Str);
    obj.displaySign.detail.doorSwitch.value = parseInt(byte15Str[7-0]); 
    obj.displaySign.detail.brightDishAgent.value = parseInt(byte15Str[7-1]); 
    obj.displaySign.detail.salt.value = parseInt(byte15Str[7-2]); 
    obj.displaySign.detail.startStop.value = parseInt(byte15Str[7-3]); 
    obj.displaySign.detail.lockable.value = parseInt(byte15Str[7-4]); 
    obj.displaySign.detail.keepFresh.value = parseInt(byte15Str[7-5]); 
    // nativeService.toast(parseInt(byte15Str[7-3]));
    obj.displaySign.detail.noWater.value = parseInt(byte15Str[7-6]);  
    obj.programTimeRemaining.value = parseInt(requestCmd[16]); 
    obj.appointmentHour.value = parseInt(requestCmd[17]); 
    obj.appointmentMinute.value = parseInt(requestCmd[18]); 
    obj.washingStage.value = parseInt(requestCmd[19]); 
    obj.errorCode.value = parseInt(requestCmd[20]); 
    //故障
    if(obj.errorCode.value > 0){
        obj.isError.value = true;
    }else{
        obj.isError.value = false;
    }
    
    obj.realTimeTemperature.value = parseInt(requestCmd[21]); 
    obj.waterLevel.value = parseInt(requestCmd[23]); 
    obj.setKeepTime.value = parseInt(requestCmd[27]);
    obj.keepTime.value = parseInt(requestCmd[28]);
    //obj.washingTimes.value = parseInt(requestCmd[29]); 
    obj.setAppointmentHour.value = parseInt(requestCmd[29]);
    obj.setAppointmentMinute.value = parseInt(requestCmd[30]);
    obj.mainWashingTemperature.value = parseInt(requestCmd[31]); 
    obj.piaoWashTemperature.value = parseInt(requestCmd[33]);  
    obj.fenpeiqiLevel.value = parseInt(requestCmd[34]); 
   }
    return statusObj;
  },
  // type=query/control 下发指令类型
  sendCmd(type,cmd,show,callback){
    var self = this;
    if(show){
      nativeService.showLoading();
    }
    nativeService.startCmdProcess(type,cmd,function(suc){
      if(show){
        nativeService.hideLoading();
      }
      var result = suc.replace(/\[|]/g, ""); //去掉中括号
      var arr = result.split(",");
      var statusObj = self.analysisCmd(arr);
      if(callback != undefined){
        callback(statusObj);
      }
    },function(fail){
      if(show){
        nativeService.hideLoading();
      }
    });
  },
  addEventListener(callback){
    var self = this;
    globalEvent.removeEventListener("receiveMessage");
    globalEvent.addEventListener("receiveMessage", function(event) {
      var arr = event.data.replace(/\[|]/g, "").split(",");
      var analysisObj = self.analysisCmd(arr); //解析04上行指令
      callback(analysisObj);
    });
  },
  queryStatus(callback){
    var self = this;
    var cmd = self.createQueryMessage();
    nativeService.startCmdProcess("query",cmd,function(suc) {
          var arr = suc.replace(/\[|]/g, "").split(",");//去掉中括号
          // nativeService.alert('查询返回：'+arr);
          var statusObj = self.analysisCmd(arr);
          if(callback != undefined){
            callback(statusObj);
          }
        },function(fail) {

      });
  },
};
