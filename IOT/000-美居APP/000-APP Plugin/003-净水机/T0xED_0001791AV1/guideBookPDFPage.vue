<template>
    <div class="wrapper" @viewappear="viewappear">
        <midea-header :title="'说明书'" :titleText="'#000000'" :bgColor="'#ffffff'" :isImmersion="false" :showRightImg="false" @leftImgClick="goBack"></midea-header>
        <web v-if="isShow" ref="webview" class="webview" @pagestart="onPageStart" @pagefinish="onPageFinish" :src="link"> </web>
    </div>
</template>
<style scoped>
.wrapper {
  background-color: #ffffff;
}
.webview {
  flex: 1;
  width: 750px;
  border-top-color: #f9f9f9;
  border-top-width: 1px;
}
.indicator {
  margin-top: 16px;
  height: 40px;
  width: 40px;
  color: #0078ff;
}
.loading {
  position:absolute;
  top: 176px;
  width: 750px;
  flex: 1;
  width: 750px;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}
</style>
<script>  
import nativeService from '@/common/services/nativeService';
import mideaHeader from './components/header.vue';

module.exports = {
    components: {
        mideaHeader
    },
    data() {
        return {
            isShow: true,
            link: "",
        }
    },
    methods: {
        goBack() {
            nativeService.goBack();
        },
        onPageStart() {
            nativeService.showLoading();
        },
        onPageFinish() {
            nativeService.hideLoading();  
        },
        getBook(){
            var self=this;
            nativeService.getItem('bookUrl',function(res){
                var url=res.data;
                self.link=url ;
            })
        },
    },
    created() {
        this.getBook();
    }
};
</script>