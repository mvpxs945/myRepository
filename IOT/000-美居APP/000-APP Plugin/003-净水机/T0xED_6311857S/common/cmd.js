import nativeService from '@/common/services/nativeService';
import message from '@/common/util/smartMessage.js';

var status={
    powerSwitch:0,//开关机 0-开机 1-关机
    isPurifying:0,//过滤状态 0-未过滤 1-过滤中
    seasonSwitch:0,//冬夏模式开关 0-夏季 1-冬季
    hotWaterTemp1:0,//热水温度
    hotWaterTemp2:0,//热水温度
    hotWaterTemp3:0,//热水温度
    hotWaterSensorOpen:0,//热水传感器开路故障 0-无 1-有
    hotWaterSensorShort:0,//热水传感器短路故障 0-无 1-有
    enviSensorShort:0,//环境传感器短路路故障 0-无 1-有
    inSensorError:0,//进水温度传感器故障 0-无 1-有
    overHot:0,//过热故障 0-无 1-有
    overTime:0,//水泵工作时间过长故障 0-无 1-有
    outSensorError:0,//出水传感器故障 0-无 1-有
    outSensorShort:0,//出水传感器短路故障 0-无 1-有
    communication:0,//通讯故障 0-无 1-有
    lock:0,//童锁开关 0-关 1-开
    filterLife1:0,//滤芯1寿命 0-100
    outWater:0,//出水量
    inTDS:0,//进水TDS
    outTDS:0,//出水TDS
}
export default{
    analyse(res){
        if(typeof res=='string'){
            var msg=JSON.parse(res);
        }else{
            var msg=res;
        }
        var byteArr=new Array(8);
        //Byte12
        byteArr=this.conver2str(msg[12]);
        status.powerSwitch=byteArr[0];

        //Byte13
        byteArr=this.conver2str(msg[13]);
        status.isPurifying=byteArr[5];

        //Byte15
        byteArr=this.conver2str(msg[15]);
        status.seasonSwitch=byteArr[0];

        //Byte20
        status.hotWaterTemp1=msg[20];

        //Byte23
        byteArr=this.conver2str(msg[23]);
        status.hotWaterSensorOpen=byteArr[3];
        status.hotWaterSensorShort=byteArr[4];
        
        //Byte24
        byteArr=this.conver2str(msg[24]);
        status.inSensorError=byteArr[1];
        status.overHot=byteArr[3];
        status.overTime=byteArr[4];
        status.outSensorError=byteArr[5];
        status.communication=byteArr[7];

        //Byte25
        byteArr=this.conver2str(msg[25]);
        status.lock=byteArr[2];
        
        //Byte26
        status.filterLife1=msg[26];

        //Byte31
        status.hotWaterTemp2=msg[31];

        //Byte32
        status.hotWaterTemp3=msg[32];

        //Byte45
        status.outWater=msg[45];

        //Byte46,47
        status.inTDS=parseInt(msg[46])+parseInt(msg[47])*256;

        //Byte48,49
        status.outTDS=parseInt(msg[48])+parseInt(msg[49])*256;

        return status;
    },
    //查询设备当前状态
    queryStatus(){
        var messageBody=message.createMessageBody(2);
        message.setByte(messageBody,0,0x01);
        message.setByte(messageBody,1,0x01);
        var sendMessage=message.createMessage(0xED,0x03,messageBody);
        return sendMessage;
    },
    //开机
    turnOn(){
        var messageBody=message.createMessageBody(2);
        message.setByte(messageBody,0,0x01);
        message.setByte(messageBody,1,0x01);
        var sendMessage=message.createMessage(0xED,0x02,messageBody);
        return sendMessage;
    },
    //关机
    turnOff(){
        var messageBody=message.createMessageBody(2);
        message.setByte(messageBody,0,0x02);
        message.setByte(messageBody,1,0x01);
        var sendMessage=message.createMessage(0xED,0x02,messageBody);
        return sendMessage;
    },
    //冬夏模式
    seasonMode(index){
        var messageBody=message.createMessageBody(20);
        message.setByte(messageBody,0,0x14);
        message.setByte(messageBody,1,0x01);
        message.setByte(messageBody,2,parseInt(index,10));
        var sendMessage=message.createMessage(0xED,0x02,messageBody);
        return sendMessage;
    },
    //童锁
    lockDevice(index){
        var messageBody=message.createMessageBody(20);
        message.setByte(messageBody,0,0x14);
        message.setByte(messageBody,1,0x04);
        message.setByte(messageBody,2,parseInt(index,10));
        var sendMessage=message.createMessage(0xED,0x02,messageBody);
        return sendMessage;
    },
    //定量出水 0-持续出水 1/2/3/4/5/6 电控端需要120+n*60,例如index=2，那么选择的数值是120+2*60=240
    setOutWater(index){
        var messageBody=message.createMessageBody(20);
        message.setByte(messageBody,0,0x14);
        message.setByte(messageBody,1,0x02);
        message.setByte(messageBody,2,parseInt(index,10));
        var sendMessage=message.createMessage(0xED,0x02,messageBody);
        return sendMessage;
    },
    //水温 
    setWaterTemp(index1,index2,index3){
        var messageBody=message.createMessageBody(20);
        message.setByte(messageBody,0,0x14);
        message.setByte(messageBody,1,0x03);
        message.setByte(messageBody,2,parseInt(index1,10));
        message.setByte(messageBody,3,parseInt(index2,10));
        message.setByte(messageBody,4,parseInt(index3,10));
        var sendMessage=message.createMessage(0xED,0x02,messageBody);
        return sendMessage;
    },
    //将一个十进制数字转换成二进制数组(前四位低位，后四位高位)
    conver2str(num){
        var byte=parseInt(num,10)
        var arr=new Array(8).fill(0);
        if(byte!=0){
            var numArr=(byte.toString(2)).split("").reverse();
            for(var i=0;i<numArr.length;i++){
                arr[i]=parseInt(numArr[i],10);
            }
            return arr;
        }else{
            return arr;
        }
    },
}