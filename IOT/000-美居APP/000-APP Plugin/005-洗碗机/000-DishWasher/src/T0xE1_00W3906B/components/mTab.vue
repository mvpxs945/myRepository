<template>
    <div class="wrapper">
        <div class="tab-wrapper border" :style="{'background-color':cuStyle.bgColor, 'border-color': cuStyle.borderColor}" ref="tabItem">
            <div v-for="(item,index) in tabArray" :key="index" class="tab-item" :style="[item.selected?cuStyle.tabselectedBg:cuStyle.tabUnselectedBg]" @click="tabClicked(index)">
                <text class="tab-txt" 
                :style="[item.selected?{color:cuStyle.tabselectedBg.tabtxtselectedColor}:{color:cuStyle.tabUnselectedBg.tabtxtUnselectedColor},
                    ]">{{item.name}}</text>
            </div>
        </div>
    </div>
</template>

<style>
.wrapper {
  width: 270px;
  padding: 0px;
  display: flex;
}
.tab-wrapper {
  text-align: center;
  font-size: 28px;
  width: 270px;
  flex-direction: row;
  height: 50px;
}
.border{
  border-width: 2px;
  border-style: solid;
  border-color:#ffffff;
  border-radius: 6px;
}
.tab-item {
  flex:1;
  align-items: center;
  justify-content: center;
  text-align: center;
}
.tab-txt {
  font-size: 28px;
  height: 50px;
  line-height: 50px;
  color: white;
}
.tab-txt-selected {
  color: #FFB632;
}
.tab-indicator {
  border-top-style: solid;
  border-top-color: #0e90ff;
  border-top-width: 2px;
  position: relative;
  align-items: center;
}
.indicator-wrapper {
  width: 375px;
  align-items: center;
  justify-content: center;
  top: -4px;
}
</style>

<script>
const modal = weex.requireModule('modal');
const animation = weex.requireModule('animation');
const dom = weex.requireModule('dom');
export default {
    name: 'mideaTab',
    props: {
        tabArray: {
            type: Array
        },
        cuStyle:{
            bgColor:'#6175FF',
            borderColor:'#ffffff',
            tabselectedBg:{
                backgroundColor:"#4D4D4D",
                borderColor:"#ffffff",
                tabtxtselectedColor:'#ffffff',
            },
            tabUnselectedBg:{
                backgroundColor:"#6175FF",
                borderColor:"#ffffff",
                tabtxtUnselectedColor:'ffffff',
            }
        },        
    },
    methods: {
        tabClicked(index) {
            var len = this.tabArray.length;
            for (var i = 0; i < this.tabArray.length; i++) {
                this.tabArray[i].selected = false;
            }
            Vue.set(this.tabArray[index], "selected", true);
            var strLen = this.tabArray[index].name.length;
            this.setIndicatorWidth(index)
            var xDis = index * (750 / len) + "px";
            var ref = this.$refs.indicator;
            animation.transition(ref, {
                styles: {
                    transform: 'translate(' + xDis + ',0px)',
                    transformOrigin: 'center center'
                },
                duration: 250, //ms
                timingFunction: 'ease',
                delay: 0 //ms
            }, function () {

            });
            this.$emit('tabClicked', index)
        },
        setIndicatorWidth(index) {
            let tabItem = this.$refs.tabItem;
            dom.getComponentRect(tabItem.children[index].children[0], (result) => {
                let size = result.size || {};
                this.indicatorWidth = size.width + "px";
            });
        }
    },
    data: function () {
        return {
            indicatorWrapperWidth: 0,
            indicatorWidth: 0,
        }
    },
    created() {
        var len = this.tabArray.length;
        this.indicatorWrapperWidth = (750 / len) + "px";
    },
    mounted() {
        this.setIndicatorWidth(0)
    }
}
</script>

