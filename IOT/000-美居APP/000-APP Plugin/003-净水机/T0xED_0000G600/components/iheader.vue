<template>
    <div class="wrapper" style="width:750px;">
        <div :style="{backgroundColor:bgColor}" class="box" :class="[isImmersion?(isipx? 'immersion-ipx': 'immersion'):'']">
            <div class="header-left-image-wrapper" @click="leftImgClick">
                <image v-if="showLeftImg" class="header-left-image" :src="leftImg" style="margin-left:36px"></image>
            </div>
            <div @click="headerClick">
                <text class="header-title" :style="{color:titleText, fontSize:fontSize+'px'}">{{title}}</text>
            </div>
            <div class="header-right-image-wrapper" @click="rightImgClick">
                <slot name="rightContent">
                    <image v-if="showRightImg" class="header-right-image" :src="rightImg"></image>
                </slot>
            </div>
            <div v-if="showRightText" class="header-right" @click="rightTextClick">
                <text class="header-right-text" :style="{color: rightColor}">{{rightText}}</text>
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
            default: '#5d75f6'
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
            default: './assets/img/ic_menu_back_white_n@2x.png'
        },
        rightImg: {
            type: String,
            default: './assets/img/ic_menu_white_n@2x.png'
        },
        showLeftImg: {
            type: Boolean,
            default: true
        },
        showRightImg: {
            type: Boolean,
            default: false
        },
        showRightText: {
            type: Boolean,
            default: false
        },
        rightText: {
            type: String,
            default: ''
        },
        rightColor: {
            type: String,
            default: '#666666'
        }
    },
    computed: {
        isipx: function () {
            return weex && (weex.config.env.deviceModel === 'iPhone10,3' || weex.config.env.deviceModel === 'iPhone10,6'|| weex.config.env.deviceModel === 'iPhone11,2'|| weex.config.env.deviceModel === 'iPhone11,8'|| weex.config.env.deviceModel === 'iPhone11,6'|| weex.config.env.deviceModel === 'iPhone11,4');
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
        rightImgClick() {
            if (!this.showRightImg) {
                return;
            }
            this.$emit('rightImgClick')
        },
        rightTextClick() {
            if (!this.showRightText) {
                return;
            }
            this.$emit('rightTextClick')
        },
        headerClick() {
            this.$emit('headerClick')
        }
    },
};
</script>

<style scoped>
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
  padding-top: 68px;
  height: 156px;
}
.header-title {
  flex: 1;
  font-family: PingFangSC-Medium;
  /* font-weight: 600; */
  width: 574px;
  lines: 1;
  text-overflow: ellipsis;
  text-align: center;
}
.header-left-image-wrapper {
  width: 88px;
  height: 88px;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding-left: 36px;
}
.header-left-image {
  height: 58px;
  width: 58px;
}
.header-right-image-wrapper {
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
.header-right {
  position: absolute;
  right: 0px;
  height: 88px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.header-right-text {
  font-family: PingFangSC-Regular;
  font-size: 28px;
  padding-left: 20px;
  padding-right: 32px;
  text-align: right;
}
</style>