<template>
    <div class="moreFunction" :style="{'height':height}">
        <midea-header :title="'更多功能'" :titleText="'#000000'" :bgColor="'#ffffff'" :isImmersion="true" :showRightImg="false" @leftImgClick="goBack"></midea-header>
        <scroller :show-scrollbar="false">
            <div style="width:750px;height:20px;background-color:#f9f9f9"></div>
            <div style="flex:1;">
                <midea-cell title="产品信息"
                            :hasArrow="true"
                            @mideaCellClick="goInfo"
                ></midea-cell>
                <midea-cell title="电子说明书"
                            :hasArrow="true"
                            @mideaCellClick="goDirection"
                ></midea-cell>
                <!-- <midea-cell title="固件版本检查"
                            :hasArrow="true"
                            @mideaCellClick="goSet"
                ></midea-cell> -->
                <midea-cell title="在线客服"
                            :hasArrow="true"
                            :hasBottomBorder="false"
                            @mideaCellClick="goServe"
                ></midea-cell>
                <div class="center">
                    <text class="center-text">常见问题</text>
                </div>
                <midea-cell v-for="(item,i) in questionList" :key="i"
                            :title="item.question"
                            :hasArrow="true"
                            :hasBottomBorder="i==(questionList.length-1)?false:true"
                            @mideaCellClick="goFAQ(i)"
                ></midea-cell>
            </div>
        </scroller>
        <div style="width:750px;height:220px;background-color:white;align-self:flex-end;"></div>
    </div>
</template>
<style>
.moreFunction{
    background-color:#f9f9f9;
}
.center{
    width: 750px;
    height: 100px;
    padding-left: 32px;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center; 
    background-color: #f9f9f9;
}
.center-text{
    font-family: PingFangSC-Regular;
    font-size: 28px;
    color: #666666;
    letter-spacing: -1px;
    /* line-height: 32px; */
}
</style>
<script>
import nativeService from '@/common/services/nativeService';
import cmd from './js/cmd.js';
import config from './js/config.js'
import mideaCell from './components/cell2.vue';
import mideaHeader from './components/header.vue';

export default {
    components:{
        mideaCell,
        mideaHeader,
    },
    data(){
        return{
            height:0,
            questionList:config.getConfigValue().FAQ,
            code:config.getConfigValue().code,
            codeType:config.getConfigValue().codeType,
        }
    },
    methods:{
        goBack(){
            nativeService.goBack();
        },
        goInfo(){
            nativeService.goTo("productInfo.js");
        },
        goDirection(){
            var self=this;
            nativeService.sendCentralCloundRequest("/pdgw-ap/message/getProdMessage&version=5.0&codeType="+self.codeType+"&code="+self.code, {
                'method': 'POST',           
                'headers': {
                    'Content-Type': 'application/json'
                },
                'data': {}
            }).then((res)=>{
                var link=res.data.pProductBathList[0].docMainContentPath;
                if (link) {
                    if (link.indexOf(".pdf") > -1) {
                        if (weex.config.env.platform == 'android') {
                            nativeService.jumpNativePage({
                                "pageName": "PDFViewerPage", //跳转的目标页面
                                "url": link, //传参，为json格式字符串
                            })
                        } else {
                            nativeService.setItem('bookUrl',link);
                            nativeService.goTo("guideBookPDFPage.js");
                        }
                    } else {
                        if (link.indexOf("ce7.midea.com/ms/modelversion/index.html") > -1) {
                            link += "&from=weex"
                        }
                        nativeService.weexBundleToWeb({
                            "url": link, //跳转的目标页面
                            "title": "说明书"
                        })
                    }
                } else {
                    nativeService.toast('查询不到该型号的说明书')
                }
            })
        },
        goFAQ(i){
            nativeService.setItem('questionKey',i);
            nativeService.goTo("FAQ.js")
        },
        goServe(){
            nativeService.jumpNativePage({
                "pageName": "onlineService", 
            })
        }
    },
    created() {
       this.height=parseInt(Math.floor(750/this.$getConfig().env.deviceWidth*this.$getConfig().env.deviceHeight))+220;
    },
}
</script>



