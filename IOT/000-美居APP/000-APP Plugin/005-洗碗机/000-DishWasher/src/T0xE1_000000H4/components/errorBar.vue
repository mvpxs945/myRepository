<template>
    <div class="wrapper" >
        <div v-if="isShow" class="error-section flex-row-center">
            <image class="left-img" :src="leftImg"/>
            <text class="error-text">{{msg}}</text>
            <image class="right-img" :src="rightImg" @click="closeDialog"/>
        </div>
        <div v-if="!isShow" class="error-section-hidden flex-row-center">
        </div>
    </div>
</template>
<style scoped>
.error-section {
    width: 750px;
    height: 66px;
    z-index:100;
    background-color: rgba(0,0,0,0.2);
}
.error-section-hidden {
    width: 750px;
    height: 66px;
}

.flex-row-center {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
}
.left-img {
    width: 40px;
    height: 40px;
    margin-left: 30px;
}
.error-text {
    height: 66px;
    line-height: 66px;
    font-size: 28px;
    color: #fff;
    flex: 1;
    margin-left: 30px;

}
.right-img {
    width: 40px;
    height: 40px;
    margin-right: 30px;
}
</style>
<script>
export default {
    props:{
        msg: {type: String,default: ''},
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
        }
    }
}
</script>


