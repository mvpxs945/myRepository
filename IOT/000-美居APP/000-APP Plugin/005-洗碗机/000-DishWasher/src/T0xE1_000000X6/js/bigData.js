import nativeService from "@/common/services/nativeService";
const bridgeModule = weex.requireModule("bridgeModule");

var dataResource = [
    {type:'PAGE_MAIN',name:'主页',actionType:'view',subAction:'page_view',pageName:'mainPage',extra1:{}},
    {type:'PAGE_WATER',name:'水电统计',actionType:'view',subAction:'page_view',pageName:'waterElectricCountPage',extra1:{}},
    {type:'PAGE_USER_GUIDE',name:'用户指南',actionType:'view',subAction:'page_view',pageName:'userGuidePage',extra1:{}},
    {type:'PAGE_MATERIAL',name:'耗材购买',actionType:'view',subAction:'page_view',pageName:'materialBuyPage',extra1:{}},
    {type:'PAGE_QUICK_START',name:'快速开始使用',actionType:'view',subAction:'page_view',pageName:'quickStartPage',extra1:{}},
    {type:'PAGE_LEARN_WASHER',name:'了解你的洗碗机',actionType:'view',subAction:'page_view',pageName:'washerIntroducePage',extra1:{}},
    {type:'PAGE_USE_TIPS',name:'使用贴士',actionType:'view',subAction:'page_view',pageName:'useTipsPage',extra1:{}},
    {type:'PAGE_LEARN_BOWLS',name:'学习摆放碗筷',actionType:'view',subAction:'page_view',pageName:'learnPutBowlsPage',extra1:{}},
    {type:'PAGE_CHANGE_SALT',name:'软水盐更换',actionType:'view',subAction:'page_view',pageName:'saltChangePage',extra1:{}},
    {type:'PAGE_CHANGE_BRIGHT',name:'亮碟剂更换',actionType:'view',subAction:'page_view',pageName:'lightDishAgentChangePage',extra1:{}},
    {type:'PAGE_LEARN_KEEP',name:'保管是什么',actionType:'view',subAction:'page_view',pageName:'leranKeepingPage',extra1:{}},
    {type:'PAGE_LEARN_ATTENTION',name:'注意事项',actionType:'view',subAction:'page_view',pageName:'matterNeedAttentionPage',extra1:{}},
    {type:'PAGE_LEARN_ERROR',name:'故障排除',actionType:'view',subAction:'page_view',pageName:'errorPage',extra1:{}},
    {type:'PAGE_LEARN_FAQ',name:'常见问题',actionType:'view',subAction:'page_view',pageName:'FAQPage',extra1:{}},
    {type:'PAGE_LEARN_SMART_HELPER',name:'智能助手是什么',actionType:'view',subAction:'page_view',pageName:'learnSmartSettingPage',extra1:{}},
    {type:'PAGE_FUCTION_MORE',name:'更多功能',actionType:'view',subAction:'page_view',pageName:'memberPage',extra1:{}},

    {type:'START_INTENSIVE',name:'强力洗',actionType:'smart',subAction:'mode_intensive',pageName:'mainPage',extra1:{}},
    {type:'START_RAPID',name:'超快洗',actionType:'smart',subAction:'mode_rapid',pageName:'mainPage',extra1:{}},
    {type:'START_ECO',name:'节能洗',actionType:'smart',subAction:'mode_eco',pageName:'mainPage',extra1:{}},
    {type:'START_NORMAL',name:'即时洗',actionType:'smart',subAction:'mode_normal',pageName:'mainPage',extra1:{}},
    {type:'START_AUTO',name:'智能洗',actionType:'smart',subAction:'mode_auto',pageName:'mainPage',extra1:{}},
    {type:'START_CLEAN',name:'自清洗',actionType:'smart',subAction:'mode_clean',pageName:'mainPage',extra1:{}},
    {type:'START_GLASS',name:'玻璃洗',actionType:'smart',subAction:'mode_glass',pageName:'mainPage',extra1:{}},
    {type:'START_SOAK',name:'预冲洗',actionType:'smart',subAction:'mode_soak',pageName:'mainPage',extra1:{}},
    {type:'START_DIY',name:'自定义',actionType:'smart',subAction:'mode_diy',pageName:'mainPage',extra1:{}},
    {type:'START_FRUIT',name:'水果洗',actionType:'smart',subAction:'mode_fruit',pageName:'mainPage',extra1:{}},

    {type:'ORDER_INTENSIVE',name:'预约强力洗',actionType:'smart',subAction:'order_mode_intensive',pageName:'mainPage',extra1:{}},
    {type:'ORDER_RAPID',name:'预约超快洗',actionType:'smart',subAction:'order_mode_rapid',pageName:'mainPage',extra1:{}},
    {type:'ORDER_ECO',name:'预约节能洗',actionType:'smart',subAction:'order_mode_eco',pageName:'mainPage',extra1:{}},
    {type:'ORDER_NORMAL',name:'预约即时洗',actionType:'smart',subAction:'order_mode_normal',pageName:'mainPage',extra1:{}},
    {type:'ORDER_AUTO',name:'预约智能洗',actionType:'smart',subAction:'order_mode_auto',pageName:'mainPage',extra1:{}},
    {type:'ORDER_CLEAN',name:'预约自清洗',actionType:'smart',subAction:'order_mode_clean',pageName:'mainPage',extra1:{}},
    {type:'ORDER_GLASS',name:'预约玻璃洗',actionType:'smart',subAction:'order_mode_glass',pageName:'mainPage',extra1:{}},
    {type:'ORDER_SOAK',name:'预约预冲洗',actionType:'smart',subAction:'order_mode_soak',pageName:'mainPage',extra1:{}},
    {type:'ORDER_DIY',name:'预约自定义',actionType:'smart',subAction:'order_mode_diy',pageName:'mainPage',extra1:{}},
    {type:'ORDER_FRUIT',name:'预约水果洗',actionType:'smart',subAction:'order_mode_fruit',pageName:'mainPage',extra1:{}},

    {type:'BTN_SMART_HELPER',name:'智能助手',actionType:'smart',subAction:'btn_smart_helper',pageName:'mainPage',extra1:{}},
    {type:'BTN_LOCK',name:'童锁',actionType:'smart',subAction:'btn_lock',pageName:'mainPage',extra1:{}},
    {type:'BTN_BUY_SALT',name:'购买软水盐',actionType:'smart',subAction:'btn_buy_salt',pageName:'saltChangePage',extra1:{}},
    {type:'BTN_BUY_BRIGHT',name:'购买亮碟剂',actionType:'smart',subAction:'btn_buy_bright',pageName:'lightDishAgentChangePage',extra1:{}},
    {type:'BTN_SERVICE',name:'客服联系',actionType:'smart',subAction:'btn_service',pageName:'memberPage',extra1:{}},
    {type:'BTN_KEEP',name:'开启保管',actionType:'smart',subAction:'btn_keep',pageName:'mainPage',extra1:{}},
];

export default {
    /** 大数据埋点接口 start */
    /**
    * actionType = ['view','smart'] view=页面进入 smart=事件点击
    * subAction = [''] 操作名
    * pageName =
    * widgetName= KH_0xED_xxxxxxx(八位sn)
    * iot_device_id= 完整32位sn码
    */
    dataReport(type) {
        var self = this;
        for(let i=0;i<dataResource.length;i++){
            if(type == dataResource[i].type){
                self.dataAnalysis(dataResource[i]);
                break;
            }
        }
    },

    dataAnalysis:function(data){
        nativeService.getItem("device",function(deviceInfo){
            var deviceObj = JSON.parse(deviceInfo.data);
            let param = {
                operation: 'burialPoint',
                actionType: data.actionType,
                subAction: data.subAction,
                pageName: data.pageName,
                iot_device_id: deviceObj.sn,
                widget_name: 'KH_0xE1_000000X6', // constant
                widget_version: '1.0.0', // constant
                extra1: data.extra1 //浏览页面，如不需设备信息，可不传该字段 ‘key’:’value’,
            };
            bridgeModule.commandInterface(JSON.stringify(param), function(resData) {//成功回调
                // nativeService.alert(JSON.stringify(resData));
                }, function (error) {//失败的回调
                // nativeService.alert('upload error:'+JSON.stringify(error));
            });
        });
    },

    dataReportByMode(typeStr,mode){
        var self = this;
        var type ='';
        switch(mode){
            case 1:
                type = typeStr+'_AUTO';
                break;
            case 2:
                type = typeStr+'_INTENSIVE';
                break;
            case 3:
                type = typeStr+'_NORMAL';
                break;
            case 4:
                type = typeStr+'_ECO';
                break;
            case 5:
                type = typeStr+'_GLASS';
                break;
            case 7:
                type = typeStr+'_RAPID';
                break;
            case 8:
                type = typeStr+'_SOAK';
                break;
            case 10:
                type = typeStr+'_CLEAN';
                break;
            case 11:
                type = typeStr+'_FRUIT';
                break;
            case 12:
                type = typeStr+'_DIY';
                break;
        }
        self.dataReport(type);
    },

    dataReportByName(name){
        var self = this;
        if(name == "快速开始使用"){
            self.dataReport('PAGE_QUICK_START');
        }else if(name == "了解你的洗碗机"){
            self.dataReport('PAGE_LEARN_WASHER');
        }else if(name == "使用贴士"){
            self.dataReport('PAGE_USE_TIPS');
        }else if(name == "学习摆放碗碟"){
            self.dataReport('PAGE_LEARN_BOWLS');
        }else if(name == "保管是什么"){
            self.dataReport('PAGE_LEARN_KEEP');
        }else if(name == "智能助手是什么"){
            self.dataReport('PAGE_LEARN_SMART_HELPER');
        }else if(name == "注意事项"){
            self.dataReport('PAGE_LEARN_ATTENTION');
        }else if(name == "故障排除"){
            self.dataReport('PAGE_LEARN_ERROR');
        }else if(name == "常见问题"){
            self.dataReport('PAGE_LEARN_FAQ');
        }
    }
    
}

