// ************ push 相关 *************
const util = {
    dateFormat(dateTime, fmt) {
        // 对Date的扩展，将 Date 转化为指定格式的String
        // 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符， 
        // 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字) 
        // 例子： 
        // dateFormat(new Date(), "yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423 
        // dateFormat(new Date(), "yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18 
        if (!dateTime) {
            return dateTime
        }
        if (typeof dateTime == 'string' && !isNaN(dateTime)) {
            dateTime = +dateTime
        }
        dateTime = new Date(dateTime)
        var o = {
            "M+": dateTime.getMonth() + 1, //月份 
            "d+": dateTime.getDate(), //日 
            "h+": dateTime.getHours(), //小时 
            "m+": dateTime.getMinutes(), //分 
            "s+": dateTime.getSeconds(), //秒 
            "q+": Math.floor((dateTime.getMonth() + 3) / 3), //季度 
            "S": dateTime.getMilliseconds() //毫秒 
        };
        if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (dateTime.getFullYear() + "").substr(4 - RegExp.$1.length));
        for (var k in o)
            if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        return fmt;
    },

    getParameters(url, key) {
        let theRequest = new Object();
        if (url.indexOf("?") != -1) {
            let queryString = url.substr(url.indexOf("?") + 1);
            let strs = queryString.split("&");
            for (let i = 0; i < strs.length; i++) {
                theRequest[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);
            }
        }
        return key ? theRequest[key] : theRequest
    },
}

export default util