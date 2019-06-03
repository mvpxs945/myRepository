<template>
    <div class="wrapper" style="width:750px;">
        <div :style="headerStyleObj" class="box">
            <div class="header-left-image-wrapper" @click="leftImgClick">
                <image v-if="showLeftImg" class="header-left-image" :src="leftImg" ></image>
            </div>
            <div @click="headerClick">
                <text class="header-title" :style="{color:titleText, fontSize:fontSize+'px'}">{{title}}</text>
            </div>
            <div class="rightWrapper">
                <div class="header-right-image-wrapper" @click="rightImg1Click">
                    <image v-if="showRightImg1" class="header-right-image" :src="rightImg1"></image>
                </div>
                <div class="header-right-image-wrapper" @click="rightImg2Click">
                    <image v-if="showRightImg2" class="header-right-image" :src="rightImg2"></image>
                </div>
            </div>
            <slot name="customerContent">
            </slot>
        </div>
    </div>
</template>
<script>
import nativeService from '@/common/services/nativeService'
export default {
    props: {
        title: {
            type: String,
            default: ''
        },
        bgColor: {
            type: String,
            default: ''
        },
        fontSize: {
            type: String,
            default: '32'
        },
        titleText: {
            type: String,
            default: '#000000'
        },
        isImmersion: {
            type: Boolean,
            default: false
        },
        leftImg: {
            type: String,
            default: './assets/img/return.png'
        },
        rightImg1: {
            type: String,
            default: './assets/img/share.png'
        },
        rightImg2: {
            type: String,
            default: './assets/img/more.png'
        },
        showLeftImg: {
            type: Boolean,
            default: true
        },
        showRightImg1: {
            type: Boolean,
            default: false
        },
        showRightImg2: {
            type: Boolean,
            default: false
        },
        rightColor: {
            type: String,
            default: '#666666'
        },
        custStyleObj: {
            type: Object,
            default: () => ({})
        }
    },
    computed: {
        isipx: function () {
            return weex && (
                weex.config.env.deviceModel === 'iPhone10,3' || weex.config.env.deviceModel === 'iPhone10,6' //iphoneX
                || weex.config.env.deviceModel === 'iPhone11,8' //iPhone XR
                || weex.config.env.deviceModel === 'iPhone11,2' //iPhone XS
                || weex.config.env.deviceModel === 'iPhone11,4' || weex.config.env.deviceModel === 'iPhone11,6' //iPhone XS Max
                );
        },
        statusBarHeight: function () {
            let result = '28'
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
            return {
                backgroundColor: this.bgColor, 
                paddingTop: this.statusBarHeight + 'wx', 
                height: (+this.statusBarHeight + 44) + 'wx',
                ...this.custStyleObj
            }
        }
    },
    data() {
        return {
        }
    },
    methods: {
        leftImgClick() {
            if (!this.showLeftImg) {
                return;
            }
            this.$emit('leftImgClick')
        },
        rightImg1Click() {
            if (!this.showRightImg1) {
                return;
            }
            this.$emit('rightImg1Click')
        },
        rightImg2Click() {
            if (!this.showRightImg2) {
                return;
            }
            this.$emit('rightImg2Click')
        },
        headerClick() {
            this.$emit('headerClick')
        },
    },
};
</script>

<style scoped>
.box {
  width: 750px;
  height: 88px;
  display: inline-flex;
  flex-direction: row;
  /* flex-wrap: nowrap; */
  justify-content: space-between;
  align-items: center;
  /* padding-left: 20px; */
  /* border-bottom-width:1px;
  border-bottom-color:#e2e2e2;
  background-color: #e2e2e2; */
}
.immersion {
  padding-top: 40px;
  height: 128px;
}
.immersion-ipx {
  padding-top: 88px;
  height: 176px;
}
.header-title {
  flex: 1;
  font-family: PingFangSC-Regular;
  /* font-weight: 600; */
  width: 300px;
  lines: 1;
  text-overflow: ellipsis;
  text-align: center;
  padding-left: 90px;
}
.header-left-image-wrapper {
  width: 88px;
  height: 88px;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding-left: 20px;
}
.header-left-image {
  height: 58px;
  width: 58px;
}
.rightWrapper{
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
}
.header-right-image-wrapper {
  width: 88px;
  height: 88px;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  padding-right: 20px;
}
.header-right-image {
  height: 58px;
  width: 58px;
}
</style>
