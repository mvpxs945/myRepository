<template>
  <div ref="container" v-if="show" class="container">
    <midea-mask @click="layoutClick"></midea-mask>
    <div ref="dialog" class="dialog-box" :style="{top:dialogTop+'px'}">
      <div class="dialog-content">
        <slot name="title">
          <text v-if="title" class="content-title">{{title}}</text>
        </slot>
        <slot name="content">
          <text v-if="content" class="content-subtext">{{content}}</text>
        </slot>
        <slot name="errorContentList">
          <div v-if="errorContentList" class="content-lay flex_column_center" :style="{'height':errorContentList.length*40+'px'}">
            <div class="flex_center"  v-for="(item,i) in errorContentList" :key="i">
              <text class="content">{{item}}</text>
            </div>
          </div>
        </slot>
      </div>
      <div class="dialog-footer">
        <div class="footer-btn cancel"
             v-if="!single"
             @click="secondaryClicked">
          <text class="btn-text"
                :style="{ color: secondBtnColor }">{{cancelText}}</text>
        </div>
        <div class="footer-btn confirm"
             @click="primaryClicked">
          <text class="btn-text"
                :style="{ color: mainBtnColor }">{{confirmText}}</text>
        </div>
      </div>
    </div>
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
    top:350px;
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
    text-align: center;
    margin-bottom: 24px;
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
    margin-top: 10px;
  }

  .dialog-footer {
    flex-direction: row;
    align-items: center;
    border-top-color: #F3F3F3;
    border-top-width: 1px;
    /*H5处理兼容*/
    border-top: 1px solid #F3F3F3;
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
  import  mideaMask from './mask.vue'
  const dom= weex.requireModule('dom');
  module.exports = {
    components: { mideaMask },
    props: {
      show: {
        type: Boolean,
        default: false
      },
      single: {
        type: Boolean,
        default: false
      },
      title: {
        type: String,
        default: ''
      },
      content: {
        type: String,
        default: ''
      },
      cancelText: {
        type: String,
        default: '取消'
      },
      confirmText: {
        type: String,
        default: '确定'
      },
      mainBtnColor: {
        type: String,
        default: '#00B9EF'
      },
      secondBtnColor: {
        type: String,
        default: '#666666'
      },
      showNoPrompt: {
        type: Boolean,
        default: true
      },
      noPromptText: {
        type: String,
        default: '不再提示'
      },
      isChecked: {
        type: Boolean,
        default: false
      },
      maskBgColor: {
        type: String,
        default: 'rgba(0,0,0,0.6)'
      },
      errorContentList: {
        default: []
      },

    },
    data: () => ({
      
    }),
    created () {
      //var self=this;
      /* setTimeout(function(){
          self.checkDomHeight();
       },300);*/
      var env=weex.config.env;
      this.maskHeight=env.deviceHeight / env.deviceWidth * 750;
      this.dialogTop= (this.maskHeight-300)/2-50;
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
      
    }
  };
</script>
