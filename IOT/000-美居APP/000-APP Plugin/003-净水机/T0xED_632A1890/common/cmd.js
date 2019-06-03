import message from '@/common/util/smartMessage.js';
const bridgeModule = weex.requireModule('bridgeModule');
import nativeService from '@/common/services/nativeService';


export default{
    //查询固定参数指令
    createQuretFixedMessage(){
        var messageBody=message.createMessageBody(2);
        message.setByte(messageBody,0,0x02);
        message.setByte(messageBody,1,0x01);
        var sendMessage=message.createMessage(0xED,0x03,messageBody);
        return sendMessage;
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
