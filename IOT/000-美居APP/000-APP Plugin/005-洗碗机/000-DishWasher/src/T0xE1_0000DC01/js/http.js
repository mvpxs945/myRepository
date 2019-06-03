import nativeService from "@/common/services/nativeService";
var stream = weex.requireModule('stream');
var device = {
    applianceId:'',
    userId:'',
    sn:'',
};
export default {
    initDeviceInfo:function(){
        nativeService.getDeviceInfo().then(
            (resData) => {
              device.applianceId = resData.result.deviceId;
              device.sn = resData.result.deviceSn;
              nativeService.setItem("device",device);
            }
          ).catch((error) => {
        });
        nativeService.getUserInfo().then(
            (resp) => {
              device.userId = resp.userId;
              nativeService.setItem("device",device);
            }
          ).catch((error) => {
        });
    },
    washerExperience:function(action,exp,callback){
        var POST_URL = 'http://api.midea-hotwater.com:13145/e1/v1/api';
        nativeService.getItem("device",function(deviceInfo){
            var deviceObj = JSON.parse(deviceInfo.data);
            var requestData = {
                msg:"diskWasherExperience",
                params:{
                    applianceId:deviceObj.applianceId,
                    userId:deviceObj.userId,
                    sn:deviceObj.sn,
                    action:action,
                    exp:exp,
                }
            };
            stream.fetch({
                method: 'POST',
                url: POST_URL,
                headers:{'Content-Type':'application/json'},
                type:'json',
                body:JSON.stringify(requestData)
              }, function(ret) {
                if(ret.ok){
                    var callbackData = ret.data.result;
                    callback(callbackData);
                }
              },function(response){
                console.log('get in progress:'+response.length);
              });
        });
    },
    WaterDisherConsumption:function(query_type,callback){
        // var POST_URL = 'http://121.43.198.16:8080/datacount/washm/we/bydev';
        // var POST_URL = 'http://api.midea-hotwater.com:13145/e1/v1/api';
        var POST_URL = 'http://47.111.41.65/kwha/e1/v1/api';
        nativeService.getItem("device",function(deviceInfo){
            var deviceObj = JSON.parse(deviceInfo.data);
            var requestData = {
                msg:"WaterDisherConsumption",
                params:{
                    // applianceId:'1099512704037',
                    applianceId:deviceObj.applianceId,
                    userId:deviceObj.userId,
                    queryType:query_type,
                }
            };
            stream.fetch({
                method: 'POST',
                url: POST_URL,
                headers:{'Content-Type':'application/json'},
                type:'json',
                body:JSON.stringify(requestData)
              }, function(ret) {
                nativeService.alert(JSON.stringify(ret));
                if(ret.ok){
                    var callbackData = ret.data.result;
                    callback(callbackData);
                }
              },function(response){
                console.log('get in progress:'+response.length);
              });
        });
    }


}