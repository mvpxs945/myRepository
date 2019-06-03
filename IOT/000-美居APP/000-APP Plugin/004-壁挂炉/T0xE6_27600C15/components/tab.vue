<template>
    <div class="wrapper">
        <div class="tab-wrapper" ref="tabItem">
            <div v-for="(item,index) in tabArray"  :key="index" class="tab-item" @click="tabClicked(index)">
                <text class="tab-txt" :style="[item.selected?{'color':fontColor,'background-color':'white'}:{'color':'white'}]">{{item.name}}</text>
            </div>
        </div>
    </div>
</template>

<style>
.wrapper {
  padding: 0px;
  margin: 0px;
}
.tab-wrapper {
  width: 270px;
  flex-direction: row;
  border-radius: 6px;
  overflow: hidden;
  border-style:solid;
  border-width: 1px;
  border-color: white;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}
.tab-item {
  height: 50px;
  width:135px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}
.tab-txt {
  font-size: 28px;
  line-height: 50px;
  text-align: center;
  height: 50px;
  width:135px;
  color:white;
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
        fontColor:"",
    },
    methods: {
        tabClicked(index) {
            var len = this.tabArray.length;
            for (var i = 0; i < this.tabArray.length; i++) {
                this.tabArray[i].selected = false;
            }
            Vue.set(this.tabArray[index], "selected", true);
            this.$emit('tabClicked', index)
        },
    },
    data: function () {
        return {
            
        }
    },
}
</script>

