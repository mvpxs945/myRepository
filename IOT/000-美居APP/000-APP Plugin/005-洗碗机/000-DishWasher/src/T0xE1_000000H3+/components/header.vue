<template>
    <div class="wrapper" style="width:750px;">
        <div :style="headerStyleObj" class="box">
            <div class="header-left-wrapper" >
                <image v-if="leftImg && leftImg !=''" class="header-left-image" :src="leftImg" @click="headerClick('leftImgClick')"/>
            </div>
            <div >
                <text v-if="title && title !='' " class="header-title" :style="{color:titleColor, fontSize:fontSize+'px'}" @click="headerClick('middleTextClick')">{{title}}</text>
            </div>
            <div class="header-lock-wrapper" >
                <image v-if="lockStateImg && lockStateImg !=''" class="header-lock-image" :src="lockStateImg" @click="onchange(event)"/>
                <!-- <image v-if="unlockImg && unlockImg !=''" class="header-lock-image" :src="unlockImg"/> -->
            </div>

            <div class="header-right-wrapper" >
                <image v-if="rightImg && rightImg !=''" class="header-right-image" :src="rightImg" @click="headerClick('rightImgClick')"/>
            </div>
            
        </div>
        <div v-if="leftText && leftText !=''" class="header-left-wrapper" >
                <text class="header-left-text" :style="{color:leftColor|titleColor, fontSize:fontSize+'px'}" @click="headerClick('leftTextClick')">{{leftText}}</text>
        </div>
        <div v-if="rightText && rightText !=''" class="header-left-wrapper" >
                <text class="header-right-text" :style="{color:rightColor|titleColor, fontSize:fontSize+'px'}" @click="headerClick('rightTextClick')">{{rightText}}</text>
        </div>
        <div v-if="secondImg && secondImg !=''" class="header-right-second" >
            <image  class="header-second-image" :src="secondImg" @click="headerClick('secondImgClick')"/>
        </div>
    </div>
</template>



<script>
import nativeService from '@/common/services/nativeService'
export default {
    props: {
        isImmersion: {type: Boolean,default: false},
        isLockOn: {type: Boolean,default: false},
        lockStateImg: {type: String,default: ''},
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
        },
    },
    data() {
        return {
            // lockImg:"./assets/img/btn_lock@3x.png",
            // unlockImg:"./assets/img/btn_unlock@3x.png",
        }
    },
    methods: {
        headerClick(tag) {
            this.$emit('headerClick',tag);
        },
        onchange(event) {
        this.isLockOn = !this.isLockOn;
        this.$emit("lockClick", { value: this.isLockOn });
        },
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
.header-right-image {
  height: 44px;
  width: 44px;
}
.header-right-text {
  font-family: PingFangSC-Medium;
  text-align: center;
  width: 88px;
  height: 88px;
  line-height: 88px;
  margin-left: -40px;
  
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

.header-lock-wrapper{
  position: absolute;
  right: 78px;
  width: 88px;
  height: 88px;
  display: flex;
  justify-content: center;
  align-items: flex-start;
}

.header-lock-image {
  height: 38px;
  width: 38px;
}

.header-second-image {
  height: 44px;
  width: 44px;
}

</style>