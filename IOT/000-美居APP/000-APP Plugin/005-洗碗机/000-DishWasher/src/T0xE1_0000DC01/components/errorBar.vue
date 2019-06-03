<template>
    <div class="wrapper" >
        <div v-if="isShow" class="error-section flex-row-center">
            <text class="error-text">{{msg}}</text>
            <text class="error-check" v-if="!isHiddenTitle" @click="errorShow">查看详情</text>
            <image class="right-img" :src="rightImg" @click="closeDialog"/>
        </div>
        <div v-if="!isShow" class="error-section-hidden flex-row-center">
        </div>
    </div>
</template>
<style scoped>
.error-section {
    width: 710px;
    height: 86px;
    z-index:100;
    background-color: rgba(0,0,0,0.2);
    border-radius: 16px;
}
.error-section-hidden {
    width: 750px;
    height: 86px;
}

.flex-row-center {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
}
.error-text {
    height: 86px;
    line-height: 86px;
    font-size: 25px;
    color: #fff;
    flex: 1;
    margin-left: 20px;
    margin-right: 20px;
}
.error-check {
    width: 140px;
    height: 50px;
    background-color: rgba(255,255,255,0.35);
    border-radius: 25px;
    line-height: 50px;
    font-size: 25px;
    color: #fff;
    text-align: center;
}

.right-img {
    width: 58px;
    height: 58px;
    padding: 5px;
    margin: 10px;
}
</style>
<script>
export default {
    props:{
        msg: { type: String,default: '' },
        isHiddenTitle:{ type: Boolean,default: false },
        leftImg: {
            type: String,
            default: './assets/img/warn_voice.png'
        },
        rightImg: {
            type: String,
            default: './assets/img/warn_cancel.png'
        },
    },
    data(){
        return{
            isShow:true,
            
        }
    },
    methods:{
        closeDialog: function(){
            var self = this;
            self.isShow = false;
            this.$emit('errorClose',{});
        },
        errorShow:function(){
            var self = this;
            self.isShow = false;
            this.$emit('errorShow',{});
        }
    }
}
</script>


