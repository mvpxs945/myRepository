<template>
    <div class="wrapper">
        <scroller show-scrollbar="false" scroll-direction="horizontal" class="scroller">
            <div class="scroller-wrapper" :style="{width:tabsWidth}" ref="test">
                <div class="tab-wrapper">
                    <div :ref="'text'+index" :style="{width:tabWidth}" 
                    v-for="(item,index) in tabArray" 
                    :key="index" class="tab-item" @click="tabClicked(index)">
                        <text :class="[isPowerOn?(item.selected?'tab-txt-selected':'tab-txt'):(item.selected?'tab-txt-selected-powerOff':'tab-txt-powerOff')]">{{item.name}}</text>
                    </div>
                </div>
                <div ref="indicator" class="tab-indicator" :style="{width:tabWidth}"></div>
            </div>
        </scroller>
    </div>
</template>

<style>
.scroller {
  height: 96px;
  display: flex;
  flex-direction: column;
}
.scroller-wrapper {
  height: 96px;
  display: flex;
  flex-direction: column;
}
.tab-wrapper {
  display: flex;
  flex-direction: row;
  height: 96px;
}
.tab-item {
  align-items: center;
  justify-content: center;
  text-align: center;
}
.tab-txt {
    color:#fff;
    font-size: 28px;
    height: 96px;
    line-height: 96px;
}

.tab-txt-powerOff {
    color:#9a999d;
    font-size: 28px;
    height: 96px;
    line-height: 96px;
}

.tab-txt-selected {
    color:#fff;
    font-size: 36px;
    height: 96px;
    line-height: 96px;
}

.tab-txt-selected-powerOff {
    color:#717172;
    font-size: 36px;
    height: 96px;
    line-height: 96px;
}

</style>

<script>
import nativeService from '@/common/services/nativeService';
const modal = weex.requireModule('modal');
const dom = weex.requireModule('dom');
const animation = weex.requireModule('animation');
export default {
    name: 'mideaFlowTab',
    props: {
        tabArrayData: {
            type: Array,
        },
        isPowerOn: {
            type:Boolean
        },
        isLockOn: {
            type:Boolean
        }
    },
    methods: {
        tabClicked(index) {
            var self = this;
            if(self.isPowerOn){
                if(self.isLockOn){
                    nativeService.toast("设备处于童锁状态，请解锁后操作");
                }else{
                     /** 添加每个按钮滑到中间的动态效果 */
                    var len = this.tabArray.length;
                    for (var i = 0; i < this.tabArray.length; i++) {
                        this.tabArray[i].selected = false;
                    }
                    Vue.set(this.tabArray[index], "selected", true);
                    var xDis = index * (750 / len) + "px";
                    if (len > 5) {
                        xDis = index * 150 + "px";
                    }
                    var elName = "text" + index;
                    var el = this.$refs[elName][0];
                    var offsetD = 0;
                    if(len >=5){
                        offsetD = -300;
                    }
                    dom.scrollToElement(el, {offset: offsetD});
                    this.$emit('tabClicked', index);
                }
            }
        }
    },
    data: function () {
        return {
        }
    },
    computed:{
        tabArray:function(){
            const {tabArrayData} =this;
            var self = this;
            if(self.tabArrayData.length >5){
                var tabTemp = [];
                for (var i = 0; i < this.tabArrayData.length; i++) {
                    tabTemp.push(tabArrayData[i]);
                }
                return tabTemp;
            }
            return self.tabArrayData;
        }
    },
    created() {
        var len = this.tabArray.length;
        this.tabsWidth = "750px";
        if (len > 5) {
            this.tabWidth = "150px";
            this.tabsWidth = 150 * len + "px";
        } else {
            this.tabWidth = (750 / len) + "px";
        }
    }
}
</script>




