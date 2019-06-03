import nativeService from '@/common/services/nativeService';
import message from '@/common/util/smartMessage.js';

var status={
    antifreezing:0,//防冻工作：0-未防冻、1-一级防冻、2-二级防冻
    powerFlag:0,//开关机：0-关机、1-开机
    flameFeedback:0,//火焰反馈：0-无火焰、1-有火焰
    heatingWork:0,//采暖工作：0-采暖未工作、1-采暖工作中
    bathingWork:0,//卫浴工作：0-卫浴未工作、1-卫浴工作中
    winterMode:0,//冬季模式：0-关、1-开
    summerMode:0,//夏季模式：0-关、1-开
    normalMode:0,//普通模式：0-关、1-开
    outMode:0,//外出模式：0-关、1-开
    homeMode:0,//在家模式：0-关、1-开
    sleepMode:0,//睡眠模式：0-关、1-开
    heatingOrder:0,//采暖预约：0-预约模式1（倒计时）1-预约模式2（全天4段预约）2-预约模式3（24小时预约）
    cloudIntelligence:0,//云智能:0-关、1-开
    temperatureSensationSwitch:0,//随温感 ：0-关、1-开
    bathShower:0,//卫浴淋浴模式：0-关、1-开
    exclusiveTemperature:0,//专属水温:0~99
    error:0,//0：无故障 1：点火失败（E1）2：意外熄火（E1）：伪火（E2）4：残火（E2）5：机械温控器过热保护故障（E3）6：采暖出水温度探头过热保护（E4）7：风压故障或风机故障（E5）8：电磁阀驱动电路故障（E6）9：水压故障（E7）
    // 10：水泵卡死（E8）11：供暖出水温度传感器 短路 (F0) 12：供暖出水温度传感器 断路 (F0)13：结冰故障 (F2)14：卫浴出水温度传感器 短路 (F3)15：卫浴出水温度传感器 断路 (F3)16：供暖出水温度异常,探头脱落 (F4)
    // 17：卫浴出水温度异常,探头脱落(F4)18：冷凝水堵塞 (EF)19：燃气泄漏故障 (FE)20：主板和显示板通信失败 (EC)21：卫浴超时 (EE)20：CO报警 (EA)
    bathOutWaterTemperature:0,//卫浴出水温度 0~99、253:短路故障、254：断路故障
    bathOutWaterTemperatureSmall:0,//卫浴出水温度小数 0~9
    bathSetTemperatureMax:0,//卫浴设置温度最大值 0~99
    bathSetTemperatureMin:0,//卫浴设置温度最小值 0~99
    currentBathSetTemperature:0,//当前模式卫浴设置温度 0~99
    currentBathSetTemperatureSmall:0,//当前模式卫浴设置温度小数 0或5
    heatOutWaterTemperature:0,//采暖出水温度 0~99、253:短路故障、254：断路故障
    heatSetTemperatureMax:0,//采暖设置温度最大值 0~99
    heatSetTemperatureMin:0,//采暖设置温度最小值 0~99
    currentHeatSetTemperature:0,//当前模式采暖设置温度 0~99
    fanType:0,//风机类型 0-直流 1-单速交流 2-双速交流
    gasValveManufacturer:0,//燃气阀厂家 0-三国、2-艾珂 
    proportionerMinElec:0,//比例阀最小电流设置 0~255
    heatProportionerMaxElec:0,//采暖比例阀最大电流设置 0~255
    proportionerMaxElec:0,//比例阀最大电流设置 0~255
    proportionerFireElec:0,//比例阀点火电流设置 0~255
    heatBackWaterTempDiff:0,//采暖回水温差设置 0~50
    heatOutTempCompensate:0,//采暖室外温度补偿系数 0~99
    heatPumpRun:0,//采暖水泵运行方式设置 0-转三分钟停七分钟
    heatFire:0,//采暖燃烧方式 0-稳火燃烧 1-周期燃烧
    heatBathFunction:0,//采暖卫浴功能选择 0-采暖卫浴两用 1-单采暖
    bathExchanger:0,//卫浴换热器类型选择 0-板换 1-套管
    heatExchanger:0,//采暖换热器类型选择 0-散热片 1-地暖
    bathWaterSample:0,//卫浴水采样传感器选择 0-频率式 1-开关式
    waterGageSensor:0,//水压传感器选择 0-模拟式 1-开关式
    sectioning:0,//分段阀设置 0-使用分段阀 1-屏蔽分段阀
    waterGage:0,//水压值 0~40
    currentBathWater:0,//当前卫浴水流量 例：34=3.4L
    outTemperature:0,//室外温度 0~99 、250：无探头、253：短路故障、254：短路故障
    inTemperature:0,//室内温度 0~99 、250：无探头、253：短路故障、254：短路故障
    temperatureSensation:0,//随温感温度 0~99 、250：无探头、253：短路故障、254：短路故障
    ignitorOutput:0,//点火器输出 0-不输出 1-输出
    mainGasValveOutput:0,//燃气主阀输出  0-不输出 1-输出
    teeValveOutput:0,//三通阀输出 0-采暖端 1-卫浴端
    fanOutput:0,//风机输出 0-不输出 1-输出
    heatPumpOutput:0,//采暖水泵输出 0-不输出 1-输出
    sectioning1Output:0,//分段阀1输出 0-不输出 1-输出
    sectioning2Output:0,//分段阀2输出 0-不输出 1-输出
    zeroCoolPumpOutput:0,//零冷水水泵输出  0-不输出 1-输出
    fireFeedback:0,//火焰反馈 0-无火焰 1-有火焰
    inTemperatureSwitch:0,//室内温度开关信号 0-断开 1-吸合
    sectioningOutputPercent:0,//比例阀输出百分比 0~100
    heatBackWaterTemp:0,//采暖回水温度 0~99 、250：无探头、253：短路故障、254：短路故障、
    bathBackWaterTemp:0,//卫浴回水温度 0~99 、250：无探头、253：短路故障、254：短路故障、
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
        if(byteArr[0]==0&&byteArr[1]==0){
            status.antifreezing=0;
        }else if(byteArr[0]==1&&byteArr[1]==0){
            status.antifreezing=1;
        }else if(byteArr[0]==0&&byteArr[1]==1){
            status.antifreezing=2;
        }
        status.powerFlag=byteArr[2];
        status.flameFeedback=byteArr[3];
        status.heatingWork=byteArr[4];
        status.bathingWork=byteArr[5];

        //Byte14
        byteArr=this.conver2str(msg[14]);
        status.winterMode=byteArr[0];
        status.summerMode=byteArr[1];
        status.normalMode=byteArr[2];
        status.outMode=byteArr[3];
        status.homeMode=byteArr[4];
        status.sleepMode=byteArr[5];
        if(byteArr[6]==0&&byteArr[7]==0){
            status.heatingOrder=0;
        }else if(byteArr[6]==1&&byteArr[7]==0){
            status.heatingOrder=1;
        }else if(byteArr[6]==0&&byteArr[7]==1){
            status.heatingOrder=2;
        }

        //Byte15
        byteArr=this.conver2str(msg[15]);
        status.cloudIntelligence=byteArr[0];
        status.temperatureSensationSwitch=byteArr[1];
        status.bathShower=byteArr[2];

        //Byte16
        status.error=parseInt(msg[16]);
        
        //Byte17
        status.exclusiveTemperature=parseInt(msg[17]);

        //Byte18
        status.bathOutWaterTemperature=parseInt(msg[18]);

        //Byte19
        status.bathOutWaterTemperatureSmall=parseInt(msg[19]);

        //Byte20
        status.bathSetTemperatureMax=parseInt(msg[20]);

        //Byte21
        status.bathSetTemperatureMin=parseInt(msg[21]);

        //Byte22
        status.currentBathSetTemperature=parseInt(msg[22]);

        //Byte23
        status.currentBathSetTemperatureSmall=parseInt(msg[23]);

        //Byte24
        status.heatOutWaterTemperature=parseInt(msg[24]);

        //Byte25
        status.heatSetTemperatureMax=parseInt(msg[25]);

        //Byte26
        status.heatSetTemperatureMin=parseInt(msg[26]);

        //Byte27
        status.currentHeatSetTemperature=parseInt(msg[27]);

        //Byte28
        byteArr=this.conver2str(msg[28]);
        if(byteArr[0]==0&&byteArr[1]==0){
            status.fanType=0;
        }else if(byteArr[0]==1&&byteArr[1]==0){
            status.fanType=1;
        }else if(byteArr[0]==0&&byteArr[1]==1){
            status.fanType=2;
        }
        status.gasValveManufacturer=byteArr[2];

        //Byte29
        status.proportionerMinElec=parseInt(msg[29]);

        //Byte30
        status.heatProportionerMaxElec=parseInt(msg[30]);

        //Byte31
        status.proportionerMaxElec=parseInt(msg[31]);

        //Byte32
        status.proportionerFireElec=parseInt(msg[32]);

        //Byte33
        status.heatBackWaterTempDiff=parseInt(msg[33]);

        //Byte34
        status.heatOutTempCompensate=parseInt(msg[34]);

        //Byte35
        byteArr=this.conver2str(msg[35]);
        status.heatPumpRun=byteArr[0];
        status.heatFire=byteArr[1];
        status.heatBathFunction=byteArr[2];
        status.bathExchanger=byteArr[3];
        status.heatExchanger=byteArr[4];
        status.bathWaterSample=byteArr[5];
        status.waterGageSensor=byteArr[6];
        status.sectioning=byteArr[7];

        //Byte37
        status.waterGage=parseInt(msg[37]);

        //Byte38
        status.currentBathWater=parseInt(msg[38]);

        //Byte39
        byteArr=this.conver2str(msg[39]);
        status.outTemperature=this.conver10str(byteArr);

        //Byte40
        status.inTemperature=parseInt(msg[40]);

        //Byte41
        status.temperatureSensation=parseInt(msg[41]);

        //Byte42
        byteArr=this.conver2str(msg[42]);
        status.ignitorOutput=byteArr[0];
        status.mainGasValveOutput=byteArr[1];
        status.teeValveOutput=byteArr[2];
        status.fanOutput=byteArr[3];
        status.heatPumpOutput=byteArr[4];
        status.sectioning1Output=byteArr[5];
        status.sectioning2Output=byteArr[6];
        status.zeroCoolPumpOutput=byteArr[7];
        
        //Byte43
        byteArr=this.conver2str(msg[43]);
        status.fireFeedback=byteArr[0];
        status.inTemperatureSwitch=byteArr[1];

        //Byte44
        status.sectioningOutputPercent=parseInt(msg[44]);

        //Byte45
        status.heatBackWaterTemp=parseInt(msg[45]);

        //Byte46
        status.bathBackWaterTemp=parseInt(msg[46]);

        return status;
    },
    //查询设备当前状态
    queryStatus(){
        var messageBody=message.createMessageBody(20);
        message.setByte(messageBody,0,0x01);
        message.setByte(messageBody,1,0x01);
        var sendMessage=message.createMessage(0xE6,0x03,messageBody);
        return sendMessage;
    },
    //开机
    turnOn(){
        var messageBody=message.createMessageBody(20);
        message.setByte(messageBody,0,0x01);
        message.setByte(messageBody,1,0x01);
        var sendMessage=message.createMessage(0xE6,0x02,messageBody);
        return sendMessage;
    },
    //关机
    turnOff(){
        var messageBody=message.createMessageBody(20);
        message.setByte(messageBody,0,0x02);
        message.setByte(messageBody,1,0x01);
        var sendMessage=message.createMessage(0xE6,0x02,messageBody);
        return sendMessage;
    },
    //当前模式下采暖设置温度
    heatSetTemperature(temp){
        var messageBody=message.createMessageBody(20);
        message.setByte(messageBody,0,0x04);
        message.setByte(messageBody,1,0x13);
        message.setByte(messageBody,2,parseInt(temp,10));
        var sendMessage=message.createMessage(0xE6,0x02,messageBody);
        return sendMessage;
    },
    //当前模式下卫浴设置温度
    bathSetTemperature(temp){
        var messageBody=message.createMessageBody(20);
        message.setByte(messageBody,0,0x04);
        message.setByte(messageBody,1,0x12);
        message.setByte(messageBody,2,parseInt(temp,10));
        var sendMessage=message.createMessage(0xE6,0x02,messageBody);
        return sendMessage;
    },
    //模式选择 index:0-普通模式、1-外出模式、2-在家模式、3-睡眠模式、4-采暖预约（预约模式1）、5-采暖预约（预约模式2）、6-采暖预约（预约模式3）、7-云智能
    chooseHeatMode(index){
        var messageBody=message.createMessageBody(20);
        message.setByte(messageBody,0,0x04);
        message.setByte(messageBody,1,0x02);
        if(index==0){
            message.setByte(messageBody,2,0x01);
        }else if(index==1){
            message.setByte(messageBody,2,0x02);
        }else if(index==2){
            message.setByte(messageBody,2,0x04);
        }else if(index==3){
            message.setByte(messageBody,2,0x08);
        }else if(index==4){
            message.setByte(messageBody,2,0x00);
        }else if(index==5){
            message.setByte(messageBody,2,0x10);
        }else if(index==6){
            message.setByte(messageBody,2,0x20);
        }else if(index==7){
            message.setByte(messageBody,2,0x40);
        }
        var sendMessage=message.createMessage(0xE6,0x02,messageBody);
        return sendMessage;
    },
    //随温感模式选择 0-关 1-开
    chooseSensationMode(index){
        var messageBody=message.createMessageBody(20);
        message.setByte(messageBody,0,0x04);
        message.setByte(messageBody,1,0x15);
        if(index==0){
            message.setByte(messageBody,2,0x00);
        }else if(index==1){
            message.setByte(messageBody,2,0x01);
        }
        var sendMessage=message.createMessage(0xE6,0x02,messageBody);
        return sendMessage;
    },
    //设置卫浴专属水温温度
    setBathingTemp(index){
        var messageBody=message.createMessageBody(20);
        message.setByte(messageBody,0,0x04);
        message.setByte(messageBody,1,0x16);
        message.setByte(messageBody,2,parseInt(index,10));
        var sendMessage=message.createMessage(0xE6,0x02,messageBody);
        return sendMessage;
    },
    //关闭采暖 index为0-关闭采暖、1-开启采暖
    offHeating(index){
        var messageBody=message.createMessageBody(20);
        message.setByte(messageBody,0,0x04);
        message.setByte(messageBody,1,0x01);
        if(index==0){
            message.setByte(messageBody,2,0x02);
        }else{
            message.setByte(messageBody,2,0x01);
        }
        var sendMessage=message.createMessage(0xE6,0x02,messageBody);
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
    //将一个有符号八位二进制转换为十进制，[a,b,c,d,e,f,g,h],h为符号位，0正1负
    conver10str(arr){
        var num=0;
        if(parseInt(arr[7])==0){
            for(var i=0;i<7;i++){
                num=num+Math.pow(2,i)*parseInt(arr[i]);
            }
        }else{
            for(var i=0;i<7;i++){
                if(parseInt(arr[i])==1){
                    arr[i]=0;
                    break;
                }else{
                    arr[i]=1;
                }
            }
            for(var i=0;i<7;i++){
                if(parseInt(arr[i])==0){
                    arr[i]=1;
                }else{
                    arr[i]=0;
                }
            }
            for(var i=0;i<7;i++){
                num=num+Math.pow(2,i)*parseInt(arr[i]);
            }
            num=0-num;
        }
        return num;
    }
}