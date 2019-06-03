<template>
<div class="btn-wrapper" :style="widthStyle">
   <div class="midea-btn " @click="onClicked">
    <image v-if="img&&img!=''" class="btn-img" :src="img"/>
    <text class="btn-text">{{text}}</text>
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
    },
    computed:{
      widthStyle: function(){
        return {"width":this.width+"px"};
      }
    },
    methods: {
      onClicked () {
        this.$emit('Clicked',{});
      }
    }
  }
</script>

<style scoped>
.btn-wrapper{
  align-items: center;
}
.midea-btn {
  height: 150px;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}
.btn-img {
  width: 60px;
  height: 60px;
  margin: 10px;
  margin-top: 30px;
}
.btn-text {
  line-height: 40px;
  height: 40px;
  margin-bottom: 20px;
  text-overflow: ellipsis;
  font-size: 25px;
  color: #000;
}
</style>
