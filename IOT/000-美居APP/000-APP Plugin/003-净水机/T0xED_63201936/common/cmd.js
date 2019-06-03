import nativeService from '@/common/services/nativeService';
const bridgeModule = weex.requireModule('bridgeModule');
import message from '@/common/util/smartMessage.js';

var status={
    filtrating:0,//过滤状态 0-未过滤 1-过滤中
    washing:0,//冲洗状态 0-为冲洗 1-冲洗中
    isGenuine:0,//滤芯正伪 0-正版 1-盗版
    overtime:0,//工作超时故障 0-无 1-有
    communicationFault:0,//通讯故障 0-无 1-有
    stopcockError:0,//水龙头通讯故障 0-无 1-有
    tdsError:0,//TDS模组通讯异常 0-无 1-有
    filter1Life:0,//滤芯1的寿命 百分比
    filter2Life:0,//滤芯2的寿命 百分比
    filter3Life:0,//滤芯3的寿命 百分比
    filter4Life:0,//滤芯4的寿命 百分比
    filter5Life:0,//滤芯5的寿命 百分比
    inTDS:0,//进水TDS值 46低位 47高位
    outTDS:0,//出水TDS值 48低位 49高位
}
export default{
    analyse(res){
        if(typeof res=='string'){
            var msg=JSON.parse(res);
        }else{
            var msg=res;
        }
        var byteArr=new Array(8);
        //Byte13
        byteArr=this.conver2str(msg[13]);
        status.filtrating=byteArr[5];
        status.washing=byteArr[6];

        //Byte14
        byteArr=this.conver2str(msg[14]);
        status.isGenuine=byteArr[4];

        //Byte24
        byteArr=this.conver2str(msg[24]);
        status.overtime=byteArr[4];
        status.communicationFault=byteArr[5];

        //Byte25
        byteArr=this.conver2str(msg[25]);
        status.stopcockError=byteArr[4];
        status.tdsError=byteArr[5];

        //Byte26
        status.filter1Life=msg[26];

        //Byte27
        status.filter2Life=msg[27];

        //Byte28
        status.filter3Life=msg[28];

        //Byte29
        status.filter4Life=msg[29];

        //Byte30
        status.filter5Life=msg[30];

        //Byte46 47
        status.inTDS=parseInt(msg[46])+parseInt(msg[47])*256;

        //Byte48 49
        status.outTDS=parseInt(msg[48])+parseInt(msg[49])*256;

        return status;
    },
    //查询设备当前状态
    createQueryMessage(){
        var messageBody=message.createMessageBody(2);
        message.setByte(messageBody,0,0x01);
        message.setByte(messageBody,1,0x01);
        var sendMessage=message.createMessage(0xED,0x03,messageBody);
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
    //埋点
    /**
     * actionType = ['view','smart']   view=页面进入    smart=事件点击
     * subAction = ['']  操作名
     * pageName =
     * widgetName= KH_0xED_xxxxxxx(八位sn)
     * iot_device_id= 完整32位sn码
      */
     dataReport(widgetName,actionType,subAction,pageName,sn,extra1) {
        let param = {
            operation: 'burialPoint',
            actionType: actionType,
            subAction: subAction,
            pageName: pageName,
            iot_device_id: sn,
            widget_name: widgetName, // constant
            widget_version: '1.0.0', // constant
            extra1: extra1 //浏览页面，如不需设备信息，可不传该字段 ‘key’:’value’,
        };
        bridgeModule.commandInterface(JSON.stringify(param), function(resData) {//成功回调
            // nativeService.alert(resData);
        }, function (error) {//失败的回调
            // nativeService.alert('upload error');
        });
    },
}