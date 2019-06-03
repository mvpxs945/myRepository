<template>
  <div ref="container" v-if="show" class="container">
    <midea-mask @click="layoutClick"></midea-mask>
    <div><scroller class="error-lay dialog-box" ref="dialog" :style="{'height':dialogHeight+'px','top':dialogTop+'px'}">
      <div v-for="(item,i) in errorData.list" :key="i" :class="['border-bottom']">
        <div class="dialog-content">
          <text class="content-title">{{item.errorDec}}</text>
          <div class="flex_column_center">
            <text class="content-box">{{item.box}}</text>
          </div>
          <div class="flex_column_center">
            <div class="flex_center"  v-for="(errorItem,k) in item.errorContentList" :key="k">
              <text class="content">{{errorItem}}</text>
            </div>
          </div>
        </div>
      </div>
      <div class="dialog-footer">
        <div class="footer-btn cancel" v-if="errorData.cancelText!=''" @click="secondaryClicked">
          <text class="btn-text" :style="{'color': errorData.secondBtnColor }">{{errorData.cancelText}}</text>
        </div>
        <div class="footer-btn confirm" v-if="errorData.cancelText!=''" @click="primaryClicked">
          <text class="btn-text" :style="{'color': errorData.mainBtnColor }">{{errorData.confirmText}}</text>
        </div>
    </div>
    </scroller></div>
  </div>
</template>

<style scoped>
  .container {
    width: 750px;
    align-items: center;
    justify-content: center;
  }
  .flex_center {
    flex-direction: row;
    justify-content: center;
  }
  .flex_column_center {
    flex-direction: column;
    justify-content: center;
  }
  .mask {
    top: 0;
    width: 750px;
    justify-content: center;
    align-items: center;
  }
  .dialog-box {
    background-color: #FFF;
    width: 558px;
    border-radius:10px;
    position:fixed;
    left:96px;
    z-index:100;
    top:128px;
  }
  .dialog-content {
    padding-top: 36px;
    padding-bottom: 36px;
    padding-left: 36px;
    padding-right: 36px;
  }
  .content-title {
    color: #333333;
    font-size: 36px;
    height: 50px;
    line-height: 50px;
    text-align: center;
    margin-bottom: 15px;
  }
  .content-box {
    color: rgba(38,122,255,0.8);
    text-align: center;
    height: 40px;
    width: 112px;
    line-height: 40px;
    font-size: 24px;
    border-radius: 20px;
    background-color: #dbe9f8;
    margin-bottom: 15px;
    margin-left: 187px;
  }

  .content-subtext {
    color: #666666;
    font-size: 26px;
    line-height: 36px;
    text-align: center;
  }
  .content-lay {
    height: 270px;
  }
  .content{
    color: #666666;
    font-size: 28px;
    height: 50px;
    line-height: 50px;
  }
  .dialog-footer {
    flex-direction: row;
    align-items: center;
    border-top-color: #F3F3F3;
    border-top-width: 1px;
    /*H5处理兼容*/
    border-top: 1px solid #F3F3F3;
  }
  .border-bottom {
    border-bottom-color: #C7C7C7;
    border-bottom-width: 1px;
    /*H5处理兼容*/
    border-bottom: 1px solid #C7C7C7;
  }
  .footer-btn {
    flex-direction: row;
    align-items: center;
    justify-content: center;
    flex: 1;
    height: 90px;
  }

  .cancel {
    border-right-color: #F3F3F3;
    border-right-width: 1px;
    /*H5处理兼容*/
    border-right: 1px solid #F3F3F3;
  }

  .btn-text {
    font-size: 36px;
    color: #666666;
  }

  .no-prompt {
    width: 486px;
    align-items: center;
    justify-content: center;
    flex-direction: row;
    margin-top: 24px;
  }

  .no-prompt-icon {
    width: 24px;
    height: 24px;
    margin-right: 12px;
  }

  .no-prompt-text {
    font-size: 24px;
    color: #A5A5A5;
  }
</style>

<script>
  import  mideaMask from './mask.vue';
  import nativeService from "@/common/services/nativeService";
  const dom= weex.requireModule('dom');
  module.exports = {
    components: { mideaMask },
    props: {
      show: {
        type: Boolean,
        default: false
      },
      errorData:{
        type:Object,
        default:()=> ({}),
      },
      maskBgColor: {
        type: String,
        default: 'rgba(0,0,0,0.6)'
      },
    },
    data: () => ({
      maskHeight:0,
    }),
    created () {
      var env=weex.config.env;
      this.maskHeight=env.deviceHeight / env.deviceWidth * 750;
      
    },
    methods: {
      checkDomHeight(){
          var self=this;
          var wrapper=self.$refs.container;
          var dialog=self.$refs.dialog;
          dom.getComponentRect(wrapper, function(result){
              //nativeService.toast(result);
              var size=result.size||{};
              self.wrapperHeight=size.height;
              dom.getComponentRect(dialog, function(result){
                    var size=result.size||{};
                    self.dialogHeight=size.height;
                    //weex.requireModule('modal').toast({"message":"3223",duration:5})
                    self.boxMarginTop=(self.wrapperHeight- self.dialogHeight)/2; 
              });
          });
      },
      secondaryClicked () {
        this.$emit('cancel', {
          type: 'cancel'
        });
      },
      primaryClicked (e) {
        this.$emit('confirm', {
          type: 'confirm'
        });
      },
      noPromptClicked (e) {
        const isChecked = !this.isChecked;
        this.noPromptIcon = isChecked ? icon.checked : icon.unChecked;
        this.$emit('mideaDialogNoPromptClicked', { isChecked });
      },
      layoutClick(){
         this.$emit('close', {});
      }

      
    },
    computed:{
      dialogTop:function(){
        const {errorData,dialogHeight} =this;
        let dialogTop= (this.maskHeight-dialogHeight)/2;
        if(dialogTop <= 128){
          dialogTop = 128;
        }
        return dialogTop;
      },
      dialogHeight:function(){
        const {errorData} = this;
        let height = 0;
        let dialogSize = errorData.list.length;
        for(let i=0;i<dialogSize;i++){
          let errorListSize = errorData.list[i].errorContentList.length;
          height = height+(36+50+15+40+15+errorListSize*50+36);
        }
        height = height+90;
        if(height >= this.maskHeight - 128*2){
          height = this.maskHeight - 128*2;
        }
        return height;
      }
    },
    mounted(){
    }
  };
</script>
