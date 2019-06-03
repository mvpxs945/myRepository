<template>
    <div :style="{height:(screenH)+'px'}">
        <midea-header title="消息提醒" :isImmersion="true" titleColor="#000" bgColor="#fff"
            :leftImg="icon.leftImg" rightText="联系客服" @headerClick="headerClick">
        </midea-header>
        <div class="container">
            <div class="error-list">
                <div class="list-item row-center" ref="errorItem" v-for="(item,index) in errorList" :key="index" @swipe="slideMenu($event,index)">
                    <div class="list-item-content">
                        <div class="list-item-img-lay row-center">
                            <image class="list-item-img" :src="icon.product"/>
                        </div>
                        <div class="">
                            <text class="list-item-title">{{item.errorDec}}</text>
                            <text class="list-item-text">{{item.errorContentList.join('')}}</text>
                        </div>
                    </div>
                    <text class="list-item-del" @click="itemDel(index)">删除</text>
                </div>
            </div>

        </div>
    </div>
    
</template>
<style scoped>
.container {
    flex:1;
    background-color: #fafafa;
    width: 750px;
}
.row-center {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
}

.error-list {
    margin-top: 20px;
}
.list-item {
    width:875px;
    height: 170px;
    flex-direction: row;
    flex-wrap: nowrap;
    background-color: #fff;
    border-top: 2px solid #fafafa;
    border-top-width: 2px;
    border-top-color: #fafafa;
}
.list-item-content {
    width: 750px;
    flex-direction: row;
}
.list-item-img {
    width: 80px;
    height: 80px;
}
.list-item-img-lay {
    width: 100px;
    height: 100px;
    border-radius:50px; 
    background-color: #fafafa;
    margin-left: 20px;
    margin-right: 20px;
}
.list-item-title {
    font-size: 28px;

}
.list-item-text {
    font-size: 28px;

}

.list-item-del {
    width: 125px;
    height: 170px;
    line-height: 170px;
    background-color: #f00;
    color: white;
    font-size: 32px;
    text-align: center;
}

</style>
<script>
import nativeService from "@/common/services/nativeService";
import mideaHeader from "./components/header.vue";
const animation = weex.requireModule('animation');
export default {
    components: {
        mideaHeader
    },
    data(){
        return {
            screenH: 750 / weex.config.env.deviceWidth * weex.config.env.deviceHeight,
            icon: {
                leftImg: "./assets/img/public_ic_back@3x.png",
                product:"./assets/img/icon.png"
            },
            errorList:[],
        }
    },
    methods:{
        headerClick: function(tag) {
            switch (tag) {
                case "leftImgClick":
                    nativeService.goBack();
                break;
                case "rightTextClick":
                    var params ={
                        tel: '400-969-9999',
                        title: '联系客服',
                        desc:'拨打热线电话：400-969-9999',
                    }
                    nativeService.callTel(params).then((resp) => {
                        //nativeService.toast(resp)
                        }).catch((error) => {
                        nativeService.toast(error)
                    });
                break;
            }
        },
        itemDel: function(index){
            this.rightSlide();
            this.errorList.splice(index, 1);
        },
        slideMenu:function(event,index){
            let errorItem = this.$refs.errorItem;
            let ele = this.$refs.errorItem[index];
            let direction = event.direction;
            if(direction == "left"){
                this.leftSlide(ele);
            }else if(direction == "right"){
                this.rightSlide();
            }
        },
        leftSlide:function(ele){
            this.rightSlide();
            animation.transition(ele,{
                styles: {
                    transform: "translateX(-125px)" // 向左移动300px以显示菜单
                },
                duration: 200, //动画持续事件
                timingFunction: "linear",// 动画速度曲线
                needLayout: false, // 节点动画执行时是否产生布局动画即LayoutAnimation
                delay: 0 // 延迟执行动画
                }
            );
        },
        rightSlide:function(){
            let listItems = this.$refs.errorItem;
            for (let i = 0; i < listItems.length; i++) {
                animation.transition(listItems[i],{
                    styles: {
                        transform: "translateX(0px)"
                    },
                    duration: 200, //ms
                    timingFunction: "linear",
                    needLayout: false,
                    delay: 0 //ms
                });
            }
        }
    },
    created(){
        var self = this;
        nativeService.getItem('error',function(res){
            var arr = res.data.split(',');
            for(let i=0;i<arr.length;i++){
                let type = arr[i];
                let temp ={};
                switch(type){
                    case 'ERROR_UP_LACK_SALT':
                        temp = {
                            errorDec:"缺盐(上抽屉)",
                            errorContentList:["请在上抽屉里加满盐"]
                        }
                        self.errorList.push(temp);
                    break;
                    case 'ERROR_UP_LACK_BRIGHT':
                        temp = {
                            errorDec:"缺亮碟剂(上抽屉)",
                            errorContentList:["请在上抽屉里加满亮碟剂"]
                        }
                        self.errorList.push(temp);
                    break;
                    case 'ERROR_UP_DOOR_OPEN':
                        temp = {
                            errorDec:"门开(上抽屉)",
                            errorContentList:["请关上门试试是否解决"]
                        }
                        self.errorList.push(temp);
                    break;
                    case 'ERROR_UP_E1':
                        temp = {
                            errorDec:"E1:进水故障(上抽屉)",
                            errorContentList:["请确认以下三点是否解决","1.水压太低","2.进水管堵塞/打折","3.水龙头未打开"]
                        }
                        self.errorList.push(temp);
                    break;
                    case 'ERROR_UP_E3':
                        temp = {
                            errorDec:"E3:加热异常(上抽屉)",
                            errorContentList:["请联系客服人员"]
                        }
                        self.errorList.push(temp);
                    break;
                    case 'ERROR_UP_E4':
                        temp = {
                            errorDec:"E4:发生溢流(上抽屉)",
                            errorContentList:["请确认以下四点是否解决","1.使用清洁精","2.排水管堵塞/打折","3.地面不平","4.外部积水流入机器"]
                        }
                        self.errorList.push(temp);
                    break;
                    case 'ERROR_UP_EC':
                        temp = {
                            errorDec:"EC:BLDC故障(上抽屉)",
                            errorContentList:["请联系客服人员"]
                        }
                        self.errorList.push(temp);
                    break;
                    case 'ERROR_UP_EH':
                        temp = {
                            errorDec:"EH:盖板电机故障(上抽屉)",
                            errorContentList:["请联系客服人员"]
                        }
                        self.errorList.push(temp);
                    break;


                    case 'ERROR_DOWN_LACK_SALT':
                        temp = {
                            errorDec:"缺盐(下抽屉)",
                            errorContentList:["请在下抽屉里加满盐"],
                        }
                        self.errorList.push(temp);
                    break;
                    case 'ERROR_DOWN_LACK_BRIGHT':
                        temp = {
                            errorDec:"缺亮碟剂(下抽屉)",
                            errorContentList:["请在下抽屉里加满亮碟剂"],
                        }
                        self.errorList.push(temp);
                    break;
                    case 'ERROR_DOWN_DOOR_OPEN':
                        temp = {
                            errorDec:"门开(下抽屉)",
                            errorContentList:["请关上门试试是否解决"],
                        }
                        self.errorList.push(temp);
                    break;
                    case 'ERROR_DOWN_E1':
                        temp = {
                            errorDec:"E1:进水故障(下抽屉)",
                            errorContentList:["请确认以下三点是否解决","1.水压太低","2.进水管堵塞/打折","3.水龙头未打开"],
                        }
                        self.errorList.push(temp);
                    break;
                    case 'ERROR_DOWN_E3':
                        temp = {
                            errorDec:"E3:加热异常(下抽屉)",
                            errorContentList:["请联系客服人员"],
                        }
                        self.errorList.push(temp);
                    break;
                    case 'ERROR_DOWN_E4':
                        temp = {
                            errorDec:"E4:发生溢流(下抽屉)",
                            errorContentList:["请确认以下四点是否解决","1.使用清洁精","2.排水管堵塞/打折","3.地面不平","4.外部积水流入机器"],
                        }
                        self.errorList.push(temp);
                    break;
                    case 'ERROR_DOWN_EC':
                        temp = {
                            errorDec:"EC:BLDC故障(下抽屉)",
                            errorContentList:["请联系客服人员"],
                        }
                        self.errorList.push(temp);
                    break;
                    case 'ERROR_DOWN_EH':
                        temp = {
                            errorDec:"EH:盖板电机故障(下抽屉)",
                            errorContentList:["请联系客服人员"],
                        }
                        self.errorList.push(temp);
                    break;
                }
            }
        });
    }
}
</script>


