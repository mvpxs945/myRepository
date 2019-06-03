import nativeService from "@/common/services/nativeService";
export default {
    formatDateToString:function(date,fmt){
        var self = this;
        let o = {
            'y+': date.getFullYear(),
            'M+': date.getMonth() + 1,
            'd+': date.getDate(),
            'h+': date.getHours(),
            'm+': date.getMinutes(),
            's+': date.getSeconds()
        };
        if(fmt.indexOf('yyyy') > -1){
            fmt = fmt.replace('yyyy',o["y+"]+'');
        }
        if(fmt.indexOf('MM') > -1){
            fmt = fmt.replace('MM',self.padLeftZero(o["M+"]));
        }
        if(fmt.indexOf('dd')> -1){
            fmt = fmt.replace('dd',self.padLeftZero(o["d+"]));
        }
        if(fmt.indexOf('hh')> -1){
            fmt = fmt.replace('hh',self.padLeftZero(o["h+"]));
        }
        if(fmt.indexOf('mm')> -1){
            fmt = fmt.replace('mm',self.padLeftZero(o["m+"]));
        }
        if(fmt.indexOf('ss')> -1){
            fmt = fmt.replace('ss',self.padLeftZero(o["s+"]));
        }
        return fmt;
    },
    padLeftZero:function(str) {
        if(parseInt(str) < 10) {
            str = '0'+str;
        }
        return str;
    },
    formatStringToDate:function(str){
        var date = new Date();
        date.setFullYear(parseInt(str.substr(0,4)));
        date.setMonth(parseInt(str.substr(5,2))-1);
        date.setDate(parseInt(str.substr(8,2)));
        date.setHours(parseInt(str.substr(11,2)));
        date.setMinutes(parseInt(str.substr(14,2)));
        date.setSeconds(parseInt(str.substr(17,2)));
        return date;
    },
    // 10进制转化为16进制
    formatToHex:function(cmdArr) {
        var cmdStr = '';
        for(let i=0;i<cmdArr.length;i++){
            cmdArr[i]= cmdArr[i].toString(16);
        }
        cmdStr = cmdArr.join(",");
        return cmdStr;
    },
}