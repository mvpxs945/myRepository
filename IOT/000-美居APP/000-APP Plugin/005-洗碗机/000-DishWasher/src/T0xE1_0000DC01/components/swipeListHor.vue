<template>
    <div class="wrapper">
        <scroller show-scrollbar="false" scroll-direction="horizontal" class="scroller">
            <div class="scroller-wrapper flex-row-start"> 
            <div v-for="(item,index) in list" :key="index" @click="itemClick(index,item)">
                <div :class="['list-item','flex-column-center',(index == list.length-1)&&'list-item-last']" >
                    <image class="list-item-icon" :src="item.src" />
                    <text class="list-item-text">{{item.name}}</text>
                    <image class="list-item-bg" :src="item.selected?'assets/img/bg_mode_on.png':'assets/img/bg_mode.png'" />
                </div>
            </div>
            </div>
        </scroller>
    </div>
</template>
<style scoped>
.wrapper {
  height: 265px;
}

.flex-row-start {
  display: flex;
  flex-direction: row;
  justify-content: start;
  align-items: center;
}

.flex-row-center {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}
.flex-column-center {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.scroller-wrapper {
    height: 265px;
    width: 880px;
}

.list-item {
    width: 140px;
    height: 140px;
    margin-left: 30px;
}
.list-item-last {
    margin-right: 30px;
}

.list-item-selected {
    background:url('assets/img/bg_mode_on.png');
    background-size: cover;
}

.list-item-bg {
    position: absolute;
    width: 140px;
    height: 140px;
    left: 0px;
    top:0px;
}

.list-item-icon {
    width: 40px;
    height: 40px;
}
.list-item-text {
    font-family: PingFangSC-Regular;
    font-size: 24px;
    height: 36px;
    line-height: 36px;
    margin-top: 5px;
    color: #ffffff;
    text-align: center; 
}
</style>
<script>
import nativeService from '@/common/services/nativeService';
export default {
    props:{
        list:{
            type: Array,
            default: () => ([])
        },
    },
    data(){
        return {
        }
    },
    methods:{
        itemClick(index){
            const{list} = this;
            var curMode = {};
            for(let i=0;i<list.length;i++){
                let itemTemp = list[i];
                if(index == i){
                    itemTemp.selected = !itemTemp.selected;
                    if(itemTemp.selected){
                        curMode = itemTemp.mode;
                    }
                }else{
                    itemTemp.selected = false;
                }
            }
            this.$emit('itemClick', {mode: curMode})
        }
    }
}
</script>


