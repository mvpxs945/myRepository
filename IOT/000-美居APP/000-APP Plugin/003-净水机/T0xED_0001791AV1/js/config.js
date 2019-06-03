export default{
    getConfigValue(){
        var value={
            code:'MRO1791D-400G',//产品型号 （根据此信息获取电子说明书url）
            codeType:'70',//0-SN码精确查询 10-信号模糊查询 30-17位类型精确查询 40-产品编码精确查询 70-产品型号精确查询
            hasWash:false,//有无冲洗（决定首页布局）
            hasOutTDS:true,//有无净水TDS（决定首页布局）
            hasInTDS:false,//有无原水TDS（决定首页布局）

            //滤芯列表 name-名称 life-寿命百分比 maxDays-最大天数 days-实际天数 src-滤芯购买地址
            filterList:[
                {
                    name:'PCB',
                    life:0,
                    maxDays:360,
                    days:0,
                    src:'https://www.midea.cn/10000/1000000000100511229450.html',
                    desc:'PCB复合滤芯，过滤程度为粗滤，主要拦截肉眼可见物，使用周期6-12个月（因使用地域、水质、使用量及季节不同，实际使用周期有所不同）'
                },
                {
                    name:'RO',
                    life:0,
                    maxDays:720,
                    days:0,
                    src:'https://www.midea.cn/10000/1000000000100511229249.html',
                    desc:'RO滤芯即反渗透滤芯，主要拦截有机物（三氯甲烷、四氧化碳）、重金属（砷、铅、镉），使用周期24-36个月（因使用地域、水质、使用量及季节不同，实际使用周期有所不同）'
                },
            ],

            //产品信息页面展示信息
            productInfo:{
                model:'花生净水机',
                ratedPower:'30',
                ratedVoltage:'24VDC',
                lout:'2',
                ratedPressure:'0.1-0.4',
                roPressure:'0.4-0.8',
                roOutWater:'0.4',
                roTotalWater:'400',
                waterQuality:'市自来水',
                temperature:'4-38',
            },

            //常见问题
            FAQ:[
                {question:'净水机工作过程中有声音',anwser:'净水机在净化过滤过程中，水泵工作会有轻微的噪音发出，请用户放心使用'},
                {question:'净化水出水量下降异常',anwser:'1.滤芯堵塞---请按“冲洗”按键冲洗滤芯\n2.滤芯没有及时更换，超出使用时间---需要更换滤芯\n3.球阀或水龙头没有完全打开---检查进水球阀或水龙头是否完全打开\n4.储水罐中纯净水用完（若有）---等待制水，约半小时后再使用'},
                {question:'纯净水出水水质差',anwser:'1.滤芯失效---请与当地经销服务网点联系，及时更换\n2.打开饮用水水龙头开关，冲洗3-5分钟\n3.水源水质差--请确认水源是否为市政自来水'},
                {question:'净水机漏水',anwser:'部件损坏---请切断电源与水源，并拨打全国统一服务热线400-830-8289保障，待师傅上门维修'},
                {question:'更换滤芯后净水机不出水',anwser:'气堵---更换滤芯时请先断电，再断水，更换后，先通水再通电'},
                {question:'自来水停水后重新通水，打开净水龙头不出水',anwser:'气堵---先通水再通电，打开饮用水水龙头开关冲洗3-5分钟，如无法解决请拨打全国统一服务热线400-830-8289。'},
            ],

            //大数据埋点
            bigData:[
                {}
            ]
        }
        return value;
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