export default{
    MODE_AUTO:{
      src: "assets/img/sel_mode/program_all_icon_auto@2x.png",
      text: "智能洗",
      mode: 1,
      dec: "智能分析，自动选择，最佳的清洗方式",
      additionalMode: 0,
      time: '--',
      temp: '--',
      isDiyMode: false,
      stageStep:[
        {name:'预洗',value:1},{name:'主洗',value:2},{name:'漂洗',value:3},{name:'干燥',value:4}],
    },
    MODE_INTENSIVE:{
      src: "assets/img/sel_mode/program_all_icon_intensive@2x.png",
      text: "强力洗",
      mode: 2,
      dec: "重油污餐具清洗",
      additionalMode: 0,
      additionalArr:[
        {additionalMode:0,time:108,temp:70,title:'不附加',dec:'',isActive:false},
        {additionalMode:1,time:124,temp:72,title:'加强干燥',dec:'',isActive:false},
      ],
      time: 108,
      temp: 70,
      isDiyMode: false,
      stageStep:[{name:'预洗',value:1},{name:'主洗',value:2},{name:'漂洗',value:3},{name:'干燥',value:4}],
    },
    MODE_NORMAL:{
      src: "assets/img/sel_mode/program_all_icon_normal@2x.png",
      text: "即时洗",
      mode: 3,
      dec: "日常饭后及时清洗",
      additionalMode: 0,
      time: 59,
      temp: 60,
      isDiyMode: false,
      stageStep:[{name:'预洗',value:1},{name:'主洗',value:2},{name:'漂洗',value:3},{name:'干燥',value:4}],
    },
    MODE_ECO:{
      src: "assets/img/sel_mode/program_all_icon_ECO@2x.png",
      text: "节能洗",
      mode: 4,
      dec: "更充分的浸泡，省水省电",
      additionalMode: 0,
      additionalArr:[
        {additionalMode:0,time:160,temp:70,title:'不附加',dec:'',isActive:false},
        {additionalMode:1,time:171,temp:72,title:'加强干燥',dec:'',isActive:false},
      ],
      time: 160,
      temp: 70,
      isDiyMode: false,
      stageStep:[{name:'预洗',value:1},{name:'主洗',value:2},{name:'漂洗',value:3},{name:'干燥',value:4}],
    },
    MODE_GLASS:{
      src: "assets/img/sel_mode/program_all_icon_glass@2x.png",
      text: "玻璃洗",
      mode: 5,
      dec: "精致玻璃器皿专用",
      additionalMode: 0,
      modeArr:[],
      // additionalArr:[
      //   {additionalMode:0,time:56,temp:60,title:'不附加',dec:'',isActive:false},
      //   {additionalMode:1,time:73,temp:65,title:'加强干燥',dec:'',isActive:false},
      // ],
      time: 56,
      temp: 60,
      isDiyMode: true,
      stageStep:[{name:'预洗',value:1},{name:'主洗',value:2},{name:'漂洗',value:3},{name:'干燥',value:4}],
    },
    MODE_RAPID:{
      src: "assets/img/sel_mode/program_all_icon_rapid@2x.png",
      text: "超快洗",
      mode: 7,
      dec: "清污餐具，短时间洗涤",
      additionalMode: 0,
      additionalArr:[
        {additionalMode:0,time:29,temp:65,title:'不附加',dec:'',isActive:false},
        {additionalMode:1,time:54,temp:70,title:'加强干燥',dec:'',isActive:false},
      ],
      time: 29,
      temp: 65,
      isDiyMode: false,
      stageStep:[{name:'主洗',value:2},{name:'漂洗',value:3}],
    },
    MODE_SOAK:{
      src: "assets/img/sel_mode/program_all_icon_pre-wash_Soak@2x.png",
      text: "预冲洗",
      mode: 8,
      additionalMode: 0,
      dec: "简单冷水冲洗",
      isShowDec:true,
      time: 10,
      temp: '',
      isDiyMode: false,
      stageStep:[{name:'预洗',value:1}],
    },
    MODE_90MIN:{
      src: "assets/img/sel_mode/90min@2x.png",
      text: "90min洗",
      mode: 9,
      additionalMode: 0,
      time: 90,
      temp: 65,
      isDiyMode: false,
      stageStep:[{name:'主洗',value:2},{name:'漂洗',value:3},{name:'干燥',value:4}],
    },
    MODE_CLEAN:{
      src: "assets/img/sel_mode/program_all_icon_self-cleaning@2x.png",
      text: "自清洁",
      mode: 10,
      additionalMode: 0,
      time: 75,
      temp: 70,
      isDiyMode: false,
      stageStep:[{name:'主洗',value:2},{name:'漂洗',value:3},{name:'干燥',value:4}],
    },
    MODE_FRUIT:{
      src: "assets/img/sel_mode/program_all_icon_fruits@2x.png",
      text: "水果洗",
      mode: 11,
      additionalMode: 0,
      time: 7,
      temp: '',
      isDiyMode: true,
      stageStep:[{name:'预洗',value:1}],
    },
    MODE_DIY:{
      src: "assets/img/sel_mode/setting_diy.png",
      text: "DIY洗",
      mode: 12,
      additionalMode: 0,
      modeArr:[5,11],
      time: 56,
      temp: 60,
      isDiyMode: true,
      stageStep:[{name:'预洗',value:1}],
      // diyProgram:[
      //   {name:'DIY1',mainTemp:0, washTemp:0,mainTempRange:[60],washTempRange:[50],stageStep:[{name:'预洗',value:1}]},
      //   {name:'DIY2',mainTemp:0, washTemp:0,mainTempRange:[60],washTempRange:[50],stageStep:[{name:'预洗',value:1}]},
      //   {name:'DIY3',mainTemp:0, washTemp:0,mainTempRange:[45,50,55,60,65],washTempRange:[50,55,60,65,70],stageStep:[{name:'预洗',value:1},{name:'主洗',value:2},{name:'漂洗',value:3},{name:'干燥',value:4}]},
      //   {name:'DIY4',mainTemp:0, washTemp:0,mainTempRange:[45,50,55,60,65],washTempRange:[50,55,60,65,70],stageStep:[{name:'预洗',value:1},{name:'主洗',value:2},{name:'漂洗',value:3},{name:'干燥',value:4}]},
      //   {name:'DIY5',mainTemp:0, washTemp:0,mainTempRange:[45,50,55,60,65],washTempRange:[50,55,60,65,70],stageStep:[{name:'预洗',value:1},{name:'主洗',value:2},{name:'漂洗',value:3},{name:'干燥',value:4}]},
      //   {name:'DIY6',mainTemp:0, washTemp:0,mainTempRange:[45,50,55,60,65],washTempRange:[50,55,60,65,70],stageStep:[{name:'预洗',value:1},{name:'主洗',value:2},{name:'漂洗',value:3},{name:'干燥',value:4}]},
      // ],
      diySelectIndex:0,
    },
    MODE_Kill_GERM:{
      src: "assets/img/sel_mode/setting_diy.png",
      text: "紫外除菌",
      mode: 15,
      additionalMode: 0,
      time: 10,
      setTime: 10,
      isKillGrem:true,
      stageStep:[],
    },

    getSupportMode: function(){
      var self = this;
      var modeArr = [
        self.MODE_RAPID,
        self.MODE_INTENSIVE,
        self.MODE_ECO,
        self.MODE_SOAK,
        self.MODE_DIY,
        self.MODE_Kill_GERM
      ]
      return modeArr;
    },

    getMode: function(curMode){
      var self = this;
      let mode;
      switch(curMode){
          case 1:
          mode = self.MODE_AUTO;
          break;
          case 2: 
          mode = self.MODE_INTENSIVE;
          break;
          case 3:
          mode = self.MODE_NORMAL;
          break;
          case 4:
          mode = self.MODE_ECO;
          break;
          case 5:
          mode = self.MODE_GLASS;
          break;
          case 6:
           // mode = MODE_AUTO;
          break;
          case 7:
          mode = self.MODE_RAPID;
          break;
          case 8:
          mode = self.MODE_SOAK;
          break;
          case 9:
          mode = self.MODE_90MIN;
          break;
          case 10:
          mode = self.MODE_CLEAN;
          break;
          case 11:
          mode = self.MODE_FRUIT;
          break;
          case 12:
          mode = self.MODE_DIY;
          break;
          case 13:
          // mode = MODE_AUTO;
          break;
          case 14:
          // mode = MODE_AUTO;
          break;
          case 15:
          mode = self.MODE_Kill_GERM;
          break;
      }
      return mode;
    }
}