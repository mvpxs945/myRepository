import message from '@/common/util/smartMessage.js';
const bridgeModule = weex.requireModule('bridgeModule');
import nativeService from '@/common/services/nativeService.js';

var status={
    powerSwitch:0,//开关机 0-开机 1-关机
    isPurifying:0,//过滤状态 0-未过滤 1-过滤中
    isWashing:0,//冲洗状态 0-无 1-冲洗
    rfidError:0,//RFID通讯故障 0-无 1-有
    overTime:0,//水泵工作时间过长故障 0-无 1-有
    communication:0,//通讯故障 0-无 1-有
    tdsError:0,//TDS通讯故障 0-无 1-有
    rfidOffStandard:0,//RFID非标准故障 0-无 1-有
    filterLife:[0,0,0,0,0],//滤芯1/2/3/4/5寿命 0-100
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
        status.isWashing=byteArr[6];

        //Byte14
        byteArr=this.conver2str(msg[14]);
        status.rfidError=byteArr[4];

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
        status.tdsError=byteArr[5];
        status.rfidOffStandard=byteArr[6];
        
        //Byte26
        status.filterLife[0]=msg[26];

        //Byte27
        status.filterLife[1]=msg[27];

        //Byte28
        status.filterLife[2]=msg[28];

        //Byte29
        status.filterLife[3]=msg[29];

        //Byte30
        status.filterLife[4]=msg[30];

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
    //查询状态指令
    createQueryMessage(){
        var messageBody=message.createMessageBody(2);
        message.setByte(messageBody,0,0x01);
        message.setByte(messageBody,1,0x01);
        var sendMessage=message.createMessage(0xED,0x03,messageBody);
        return sendMessage;
    },
    //冲洗指令
    createControlWashMessage(){
        var messageBody=message.createMessageBody(16);
        message.setByte(messageBody,0,0x04);
        message.setByte(messageBody,1,0x01);
        message.setByte(messageBody,2,0x80);//冲洗功能开
        
        var sendMessage=message.createMessage(0xED,0x02,messageBody);
        // nativeService.alert(sendMessage)
        return sendMessage;

    },
    //取消冲洗指令
    createCancelWashMessage(){
        var messageBody=message.createMessageBody(16);
        message.setByte(messageBody,0,0x04);
        message.setByte(messageBody,1,0x01);
        message.setByte(messageBody,2,0x00);//冲洗功能关
        var sendMessage=message.createMessage(0xED,0x02,messageBody);
        return sendMessage;
    },
    //将一个十进制数字转换成二进制数组(前四位低位，后四位高位)
    conver2str(num){
        var arr=new Array(8).fill(0);
        if(num!=0){
            var numArr=(num.toString(2)).split("").reverse();
            for(var i=0;i<numArr.length;i++){
                arr[i]=parseInt(numArr[i],10);
            }
            return arr;
        }else{
            return arr;
        }
    },

}
