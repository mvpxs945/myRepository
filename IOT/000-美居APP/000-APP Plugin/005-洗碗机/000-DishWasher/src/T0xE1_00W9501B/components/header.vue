<template>
    <div class="wrapper" style="width:750px;">
        <div :style="headerStyleObj" class="box">
            <div class="header-left-wrapper" @click="headerClick('leftImgClick')">
                <image v-if="leftImg && leftImg !=''" class="header-left-image" :src="leftImg"/>
            </div>
            <div @click="headerClick('middleTextClick')">
                <text v-if="title && title !='' " class="header-title" :style="{color:titleColor, fontSize:fontSize+'px'}">{{title}}</text>
            </div>
            <div v-if="rightImg && rightImg !=''" class="header-right-wrapper" @click="headerClick('rightImgClick')">
                <image class="header-right-image" :src="rightImg"/>
            </div>
            <div v-if="leftText && leftText !=''" class="header-left-wrapper" @click="headerClick('leftTextClick')">
                <text class="header-left-text" :style="{color:leftColor|titleColor, fontSize:fontSize+'px'}">{{leftText}}</text>
            </div>
            <div v-if="rightText && rightText !=''" class="header-text-wrapper" @click="headerClick('rightTextClick')">
                <text class="header-right-text" :style="{color:rightColor|titleColor, fontSize:28+'px'}">{{rightText}}</text>
            </div>
            <div v-if="secondImg && secondImg !=''" class="header-right-second" @click="headerClick('secondImgClick')">
                <image  class="header-second-image" :src="secondImg"/>
            </div>
        </div>
        
    </div>
</template>



<script>
import nativeService from '@/common/services/nativeService'
export default {
    props: {
        isImmersion: {type: Boolean,default: false},
        title: {type: String,default: ''},
        leftText: {type: String,default: ''},
        rightText: {type: String,default: ''},
        bgColor: {type: String,default: '#ffffff'},
        fontSize: {type: String,default: '32'},
        titleColor: {type: String,default: '#000000'},
        leftColor: {type: String,default: '#000000'},
        rightColor: {type: String,default: '#000000'},
        leftImg: {type: String,default: ''},
        rightImg: {type: String,default: ''},
        secondImg: {type: String,default: ''},
        custStyleObj: {
            type: Object,
            default: () => ({})
        }
    },
    data() {
        return {
        }
    },
    methods: {
        headerClick(tag) {
            this.$emit('headerClick',tag);
        }
    },
    computed:{
        isipx: function () {
            return weex && (
                weex.config.env.deviceModel === 'iPhone10,3' || weex.config.env.deviceModel === 'iPhone10,6' //iphoneX
                || weex.config.env.deviceModel === 'iPhone11,8' //iPhone XR
                || weex.config.env.deviceModel === 'iPhone11,2' //iPhone XS
                || weex.config.env.deviceModel === 'iPhone11,4' || weex.config.env.deviceModel === 'iPhone11,6' //iPhone XS Max
                );
        },
        statusBarHeight: function () {
            let result = '20'
            if (weex.config.env.statusBarHeight){
                if (weex.config.env.platform == 'iOS') {
                    //iOS使用pt为单位
                    result = weex.config.env.statusBarHeight
                } else {
                    //安卓使用px为单位
                    result = weex.config.env.statusBarHeight / weex.config.env.scale
                }
            }
            return result
        },
        headerStyleObj: function () {
            let result, isImmersion
            if (this.isImmersion != null){
                isImmersion = this.isImmersion
            } else {
                isImmersion = weex.config.env.isImmersion=="false"?false:true
            }
            if (isImmersion) {
                //全屏显示，weex自行处理状态栏高度
                result = {
                    backgroundColor: this.bgColor, 
                    paddingTop: this.statusBarHeight + 'wx', 
                    height: (+this.statusBarHeight + 44) + 'wx',
                    ...this.custStyleObj
                }
            } else {
                //非全屏显示，APP已经处理状态栏高度
                result = {
                    backgroundColor: this.bgColor, 
                    height: '44wx',
                    ...this.custStyleObj
                }
            }

            return result
        }
    },
};
</script>

<style scoped>
.wrapper {
    position: relative;
}
.box {
  width: 750px;
  height: 88px;
  display: inline-flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: space-between;
  align-items: center;
}

.immersion {
  padding-top: 40px;
  height: 128px;
}
.immersion-ipx {
  padding-top: 88px;
  height: 176px;
}
.header-title-wrapper {
    position: absolute;
    left:88px;
    top:0px;
}
.header-title {
  flex: 1;
  font-family: PingFangSC-Medium;
  font-weight: 600;
  width: 574px;
  lines: 1;
  text-overflow: ellipsis;
  text-align: center;
}
.header-left-wrapper {
  width: 88px;
  height: 88px;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding-left: 10px;
}

.header-left-image {
  height: 58px;
  width: 58px;
}
.header-left-text {
  font-family: PingFangSC-Medium;
  text-align: center;
  width: 88px;
  height: 88px;
  line-height: 88px;
  margin-left: -20px;
}
.header-right-wrapper {
  width: 88px;
  height: 88px;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  padding-right: 32px;
}
.header-text-wrapper {
  width: 160px;
  height: 88px;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  margin-left: -60px;
  padding-right: 32px;
}
.header-right-image {
  height: 44px;
  width: 44px;
}
.header-right-text {
  font-family: PingFangSC-Medium;
  text-align: center;
  width: 128px;
  height: 88px;
  line-height: 88px;
  margin-left: -60px;
}
.header-right-second {
  position: absolute;
  right: 88px;
  top:40px;
  width: 88px;
  height: 88px;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  padding-right: 20px;
}
.header-second-image {
  height: 44px;
  width: 44px;
}

</style>
