import nativeService from "@/common/services/nativeService";
const bridgeModule = weex.requireModule("bridgeModule");

var dataResource = [
    {type:'PAGE_MAIN',name:'进入首页',actionType:'common',pageName:'mainPage',subAction:'page_view',prevPageName:'mideaHomePage',extra1:{}},
    {type:'PAGE_FUCTION_MORE',name:'更多功能',actionType:'common',pageName:'memberPage',subAction:'page_view',prevPageName:'mainPage',extra1:{}},
    {type:'PAGE_USER_GUIDE',name:'用户指南',actionType:'common',pageName:'userGuidePage',subAction:'page_view',prevPageName:'memberPage',extra1:{}},
    {type:'PAGE_WATER',name:'水电统计',actionType:'common',pageName:'waterElectricCountPage',subAction:'page_view',prevPageName:'memberPage',extra1:{}},
    {type:'PAGE_CHANGE_SALT',name:'软水盐更换',actionType:'common',pageName:'saltChangePage',subAction:'page_view',actionResult:'4',prevPageName:'memberPage',extra1:{}},//actionResult:'3'软水盐默认档位3
    {type:'PAGE_CHANGE_BRIGHT',name:'亮碟剂更换',actionType:'common',pageName:'lightDishAgentChangePage',subAction:'page_view',actionResult:'3',prevPageName:'memberPage',extra1:{}},//actionResult:'3'亮碟剂默认档位3
    {type:'PAGE_QUICK_START',name:'快速开始使用',actionType:'common',pageName:'quickStartPage',subAction:'page_view',prevPageName:'userGuidePage',extra1:{}},
    {type:'PAGE_LEARN_WASHER',name:'了解你的洗碗机',actionType:'common',pageName:'washerIntroducePage',subAction:'page_view',prevPageName:'userGuidePage',extra1:{}},
    {type:'PAGE_USE_TIPS',name:'使用贴士',actionType:'common',pageName:'useTipsPage',subAction:'page_view',prevPageName:'userGuidePage',extra1:{}},
    {type:'PAGE_LEARN_BOWLS',name:'学习摆放碗筷',actionType:'common',pageName:'learnPutBowlsPage',subAction:'page_view',prevPageName:'userGuidePage',extra1:{}},
    
    {type:'PAGE_LEARN_KEEP',name:'保管是什么',actionType:'common',pageName:'leranKeepingPage',subAction:'page_view',prevPageName:'userGuidePage',extra1:{}},
    {type:'PAGE_LEARN_SMART_HELPER',name:'智能助手是什么',actionType:'common',pageName:'learnSmartSettingPage',subAction:'page_view',prevPageName:'userGuidePage',extra1:{}},
    {type:'PAGE_LEARN_ATTENTION',name:'注意事项',actionType:'common',pageName:'matterNeedAttentionPage',subAction:'page_view',prevPageName:'userGuidePage',extra1:{}},
    {type:'PAGE_LEARN_ERROR',name:'故障排除',actionType:'common',pageName:'errorPage',subAction:'page_view',prevPageName:'userGuidePage',extra1:{}},
    {type:'PAGE_LEARN_FAQ',name:'常见问题',actionType:'common',pageName:'FAQPage',subAction:'page_view',prevPageName:'userGuidePage',extra1:{}},   
    {type:'POPUP_ALARM',name:'报警',actionType:'popup',pageName:'mainPage',subAction:'page_view',actionResult:'1',prevPageName:'mideaHomePage',extra1:{}},//错误代码‘1’：E1:进水故障、‘3’：E3:加热异常、‘4’：E4:发生溢流

    //actionResult:none:不附加strDry:加强干燥、energy：节能、speedUp:加速、strWash:加强洗涤、strRinse：加强漂洗、addPrewash：增加预洗、half：半载
    {type:'START_INTENSIVE',name:'强力洗',actionType:'common',pageName:'mainPage',subAction:'mode_intensive',actionResult:'none',prevPageName:'mideaHomePage',extra1:{}},
    {type:'START_RAPID',name:'超快洗',actionType:'common',pageName:'mainPage',subAction:'mode_rapid',actionResult:'none',prevPageName:'mideaHomePage',extra1:{}},
    {type:'START_ECO',name:'节能洗',actionType:'common',pageName:'mainPage',subAction:'mode_eco',actionResult:'none',prevPageName:'mideaHomePage',extra1:{}},
    {type:'START_NORMAL',name:'即时洗',actionType:'common',pageName:'mainPage',subAction:'mode_normal',actionResult:'none',prevPageName:'mideaHomePage',extra1:{}},
    {type:'START_AUTO',name:'智能洗',actionType:'common',pageName:'mainPage',subAction:'mode_auto',actionResult:'none',prevPageName:'mideaHomePage',extra1:{}},
    {type:'START_CLEAN',name:'自清洗',actionType:'common',pageName:'mainPage',subAction:'mode_clean',actionResult:'none',prevPageName:'mideaHomePage',extra1:{}},
    {type:'START_GLASS',name:'玻璃洗',actionType:'common',pageName:'mainPage',subAction:'mode_glass',actionResult:'none',prevPageName:'mideaHomePage',extra1:{}},
    {type:'START_SOAK',name:'预冲洗',actionType:'common',pageName:'mainPage',subAction:'mode_soak',actionResult:'none',prevPageName:'mideaHomePage',extra1:{}},
    {type:'START_DIY',name:'自定义',actionType:'common',pageName:'mainPage',subAction:'mode_diy',actionResult:'none',prevPageName:'mideaHomePage',extra1:{}},
    {type:'START_FRUIT',name:'水果洗',actionType:'common',pageName:'mainPage',subAction:'mode_fruit',actionResult:'none',prevPageName:'mideaHomePage',extra1:{}},
    {type:'START_ONE_HOUR',name:'1小时洗',actionType:'common',pageName:'mainPage',subAction:'mode_oneHour',actionResult:'none',prevPageName:'mideaHomePage',extra1:{}},
    {type:'START_90MIN',name:'90min洗',actionType:'common',pageName:'mainPage',subAction:'mode_90min',actionResult:'none',prevPageName:'mideaHomePage',extra1:{}},
    {type:'START_KILLGERM',name:'紫外除菌',actionType:'common',pageName:'mainPage',subAction:'mode_killGerm',actionResult:'none',prevPageName:'mideaHomePage',extra1:{}},
    {type:'START_BOWL',name:'碗勺洗',actionType:'common',pageName:'mainPage',subAction:'mode_bowl',actionResult:'none',prevPageName:'mideaHomePage',extra1:{}},
    {type:'START_WASHGERM',name:'除菌洗',actionType:'common',pageName:'mainPage',subAction:'mode_washGerm',actionResult:'none',prevPageName:'mideaHomePage',extra1:{}},

    {type:'ORDER_INTENSIVE',name:'预约强力洗',actionType:'common',pageName:'mainPage',subAction:'order_mode_intensive',actionResult:'0天0时0分|none',prevPageName:'mideaHomePage',extra1:{}},//actionResult:'0天0时0分|none'预约时间|附加功能
    { type: 'ORDER_RAPID', name: '预约超快洗', actionType: 'common', pageName: 'mainPage', subAction: 'order_mode_rapid', actionResult:'0天0时0分|none',prevPageName:'mideaHomePage',extra1:{}},
    { type: 'ORDER_ECO', name: '预约节能洗', actionType: 'common', pageName: 'mainPage', subAction: 'order_mode_eco', actionResult:'0天0时0分|none',prevPageName:'mideaHomePage',extra1:{}},
    { type: 'ORDER_NORMAL', name: '预约即时洗', actionType: 'common', pageName: 'mainPage', subAction: 'order_mode_normal', actionResult:'0天0时0分|none',prevPageName:'mideaHomePage',extra1:{}},
    { type: 'ORDER_AUTO', name: '预约智能洗', actionType: 'common', pageName: 'mainPage', subAction: 'order_mode_auto', actionResult:'0天0时0分|none',prevPageName:'mideaHomePage',extra1:{}},
    { type: 'ORDER_CLEAN', name: '预约自清洗', actionType: 'common', pageName: 'mainPage', subAction: 'order_mode_clean', actionResult:'0天0时0分|none',prevPageName:'mideaHomePage',extra1:{}},
    { type: 'ORDER_GLASS', name: '预约玻璃洗', actionType: 'common', pageName: 'mainPage', subAction: 'order_mode_glass', actionResult:'0天0时0分|none',prevPageName:'mideaHomePage',extra1:{}},
    {type:'ORDER_SOAK',name:'预约预冲洗',actionType:'common',pageName:'mainPage',subAction:'order_mode_soak',actionResult:'0天0时0分|none',prevPageName:'mideaHomePage',extra1:{}},
    {type:'ORDER_DIY',name:'预约自定义',actionType:'common',pageName:'mainPage',subAction:'order_mode_diy',actionResult:'0天0时0分|none',prevPageName:'mideaHomePage',extra1:{}},
    {type:'ORDER_FRUIT',name:'预约水果洗',actionType:'common',pageName:'mainPage',subAction:'order_mode_fruit',actionResult:'0天0时0分|none',prevPageName:'mideaHomePage',extra1:{}},
    {type:'ORDER_ONE_HOUR',name:'预约1小时洗',actionType:'common',pageName:'mainPage',subAction:'order_mode_oneHour',actionResult:'0天0时0分|none',prevPageName:'mideaHomePage',extra1:{}},
    {type:'ORDER_90MIN',name:'预约90min洗',actionType:'common',pageName:'mainPage',subAction:'order_mode_90min',actionResult:'0天0时0分|none',prevPageName:'mideaHomePage',extra1:{}},
    {type:'ORDER_KILLGERM',name:'预约紫外除菌',actionType:'common',pageName:'mainPage',subAction:'order_mode_killGerm',actionResult:'0天0时0分|none',prevPageName:'mideaHomePage',extra1:{}},
    {type:'ORDER_BOWL',name:'预约碗勺洗',actionType:'common',pageName:'mainPage',subAction:'order_mode_bowl',actionResult:'0天0时0分|none',prevPageName:'mideaHomePage',extra1:{}},
    {type:'ORDER_WASHGERM',name:'预约除菌洗',actionType:'common',pageName:'mainPage',subAction:'order_mode_washGerm',actionResult:'0天0时0分|none',prevPageName:'mideaHomePage',extra1:{}},

    {type:'BTN_SMART_HELPER',name:'智能助手',actionType:'common',pageName:'mainPage',subAction:'btn_smart_helper',actionResult:'重度|半个小时以上|炒菜锅',prevPageName:'mideaHomePage',extra1:{}},//actionResult:‘污渍度|置放时间|餐具’
    {type:'BTN_LOCK',name:'童锁',actionType:'common',pageName:'mainPage',subAction:'btn_lock',prevPageName:'mideaHomePage',extra1:{}},
    {type:'BTN_SET_KEEP_TIME',name:'设置保管时间',actionType:'common',pageName:'mainPage',subAction:'btn_setKeepTime',actionResult:'72',prevPageName:'mideaHomePage',extra1:{}},//actionResult:'24'：保管时间
    {type:'BTN_KEEP',name:'开启保管',actionType:'common',pageName:'mainPage',subAction:'btn_keep',actionResult:'now',prevPageName:'mideaHomePage',extra1:{}},//actionResult:'now'：立即启动'over':洗完启动
    // {type:'BTN_ADDITION',name:'附加功能',actionType:'common',pageName:'mainPage',subAction:'btn_addition',actionResult:'',prevPageName:'mideaHomePage',extra1:{}},
    {type:'BTN_PURIFIER',name:'净水洗',actionType:'common',pageName:'mainPage',subAction:'btn_purifier',prevPageName:'mideaHomePage',extra1:{}},
    {type:'BTN_DRING',name:'烘干',actionType:'common',pageName:'mainPage',subAction:'btn_dring',actionResult:'24',prevPageName:'mideaHomePage',extra1:{}},//actionResult:'24'：烘干时间
    {type:'BTN_DEVICEOFF',name:'关机',actionType:'common',pageName:'mainPage',subAction:'btn_deviceOff',prevPageName:'mideaHomePage',extra1:{}},
    {type:'BTN_UP_DRAWER',name:'上抽屉',actionType:'common',pageName:'mainPage',subAction:'btn_upDrawer',prevPageName:'mideaHomePage',extra1:{}},
    {type:'BTN_DOWM_DRAWER',name:'下抽屉',actionType:'common',pageName:'mainPage',subAction:'btn_downDrawer',prevPageName:'mideaHomePage',extra1:{}},
    {type:'BTN_SERVICE',name:'客服联系',actionType:'common',pageName:'memberPage',subAction:'btn_service',prevPageName:'memberPage',extra1:{}},
    {type:'BTN_ORDER_STARTWASH',name:'预约中开始洗涤',actionType:'common',pageName:'orderPage',subAction:'btn_order_startWash',prevPageName:'mainPage',extra1:{}},
    {type:'BTN_ORDER_CANCEL',name:'取消预约',actionType:'common',pageName:'orderPage',subAction:'btn_order_cancel',prevPageName:'mainPage',extra1:{}},
    {type:'BTN_WORK_PAUSE',name:'暂停运行',actionType:'common',pageName:'runPage',subAction:'btn_work_pause',prevPageName:'mainPage',extra1:{}},
    {type:'BTN_WORK_CONTINUE',name:'继续运行',actionType:'common',pageName:'runPage',subAction:'btn_work_continue',prevPageName:'mainPage',extra1:{}},
    {type:'BTN_WORK_CANCEL',name:'取消运行',actionType:'common',pageName:'runPage',subAction:'btn_work_cancel',prevPageName:'mainPage',extra1:{}},
];

export default {
    /** 大数据埋点接口 start */
    /**
    * actionType = ['common','popup','operation'] common=主功能页功能 popup=弹窗提醒功能 operation=服务运营板块
    * pageName =
    * subAction = ['按钮名称_操作的动作'，‘page_view’,'input'] 按钮名称_操作的动作=点击 page_view=访问 input=输入文本
    * actionResult = ['温度、时间等参数']
    * prevPageName = ['上级页面名称']
    * widgetName= KH_0xE1_8位SN码 厨热_洗碗机 _8位SN码
    * iot_device_id= 完整32位sn码
    */
    dataReport(type,val) {
        var self = this;
        for(let i=0;i<dataResource.length;i++){
            if(type == dataResource[i].type){
                if(val != undefined){
                    dataResource[i].actionResult = val;
                }
                self.dataAnalysis(dataResource[i]);
                break;
            }
        }
    },

    dataAnalysis:function(data){
        nativeService.getItem("device",function(deviceInfo){
            var deviceObj = JSON.parse(deviceInfo.data);
            let param;
            if(data.actionResult != undefined){
                    param = {
                    operation: 'burialPoint',
                    widget_name: 'KH_0xE1_00W9601B', // constant
                    widget_version: '1.0.0', // constant
                    iot_device_id: deviceObj.sn,
                    actionType: data.actionType,
                    pageName: data.pageName,
                    subAction: data.subAction,
                    action_result: data.actionResult,
                    prev_page_name: data.prevPageName,
                    extra1: data.extra1,//浏览页面，如不需设备信息，可不传该字段 ‘key’:’value’,
                    
                };
            }else{
                    param = {
                    operation: 'burialPoint',
                    widget_name: 'KH_0xE1_00W9601B', // constant
                    widget_version: '1.0.0', // constant
                    iot_device_id: deviceObj.sn,
                    actionType: data.actionType,
                    pageName: data.pageName,
                    subAction: data.subAction,
                    prev_page_name: data.prevPageName,
                    extra1: data.extra1,//浏览页面，如不需设备信息，可不传该字段 ‘key’:’value’,                   
                };
            }
            bridgeModule.commandInterface(JSON.stringify(param), function(resData) {//成功回调
                // nativeService.alert(JSON.stringify(resData));
                }, function (error) {//失败的回调
                // nativeService.alert('upload error:'+JSON.stringify(error));
            });
        });
    },

    dataReportByMode(typeStr,mode,val){
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
        self.dataReport(type,val);
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
    },
    
}

