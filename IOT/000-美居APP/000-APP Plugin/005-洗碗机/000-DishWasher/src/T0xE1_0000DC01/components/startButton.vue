<template>
<div class="btn-wrapper" :style="widthStyle" @click="onClicked">
   <div class="midea-btn">
    <image v-if="img&&img!=''" class="btn-img" :src="img"/>
    <text :class="['btn-text']">{{text}}</text>
   </div>
</div>
</template>

<script>
export default {
    props: {
      text: {type: String,default: '确认'},
      img: {type: String,default: ''},
      width: {
        type: String,
        default: '375'
      },
      enable: {type:Boolean,default:true},
    },
    computed:{
      widthStyle: function(){
        return {"width":this.width+"px"};
      }
    },
    methods: {
      onClicked () {
        if(this.enable){
          this.$emit('Clicked',{});
        }
      }
    }
  }
</script>

<style scoped>
.btn-wrapper{
  align-items: center;
}
.btn-wrapper:active {
}

.midea-btn {
  height: 86px;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  
}
.btn-img {
  width: 60px;
  height: 60px;
  margin: 10px;
  margin-top: 15px;
}
/* .btn-opacity{
  opacity: 0.4;
} */
.btn-text {
  line-height: 86px;
  height: 86px;
  text-overflow: ellipsis;
  font-size: 28px;
  color: #fff;
  font-family: PingFangSC-Regular;
}
</style>
