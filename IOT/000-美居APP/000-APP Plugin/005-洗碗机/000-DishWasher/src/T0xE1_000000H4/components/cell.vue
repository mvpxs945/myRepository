<template>
  <div
    :class="['midea-cell',clickActivied&& 'active-cell', 
    hasTopBorder && 'cell-top-border', hasBottomBorder && 'cell-bottom-border', 
    hasMargin && 'cell-margin', hasVerticalIndent && 'cell-indent', desc && 'has-desc']"
    :style="outputCellStyle"
    @click="cellClicked"
    >
    
    <slot name="itemImg">
      <image v-if="itemImg&&itemImg!=''" :src="itemImg" class="item-img"/>
    </slot>
    <slot name="label">
      <div v-if="label">
        <text class="cell-label-text">{{label}}</text>
      </div>
    </slot>
    <div class="cell-title">
      <slot name="title">
        <text class="cell-content">{{title}}</text>
        <text class="cell-desc-text"
              v-if="desc">{{desc}}</text>
       </slot>
    </div>
    
    <slot name="value"></slot>
    <slot name="text"></slot>
    <slot name="rightText">
        <div v-if="rightText" :style="{marginRight:hasArrow?'24px':'0px'}">
           <text class="right-text">{{rightText}}</text>
        </div>
    </slot>
    <image :src="arrowIcon" :style="{top:((height-24)/2)+'px'}"
           class="cell-arrow-icon"
           v-if="hasArrow"/>
  </div>
</template>

<style scoped>
  .midea-cell {
    height: 108px;
    position: relative;
    flex-direction: row;
    align-items: center;
    padding-left: 32px;
    padding-right: 32px;
    background-color: #ffffff;
  }

  .active-cell:active{
     background-color:#f5f5f5;
  }

  .cell-margin {
    margin-bottom: 24px;
  }

  .cell-title {
    flex: 1;
  }

  .cell-indent {
    padding-bottom: 30px;
    padding-top: 30px;
  }

  .has-desc {
    padding-bottom: 18px;
    padding-top: 18px;
  }

  .cell-top-border {
    border-top-color: #e2e2e2;
    border-top-width: 1px;
  }

  .cell-bottom-border {
    border-bottom-color: #e2e2e2;
    border-bottom-width: 1px;
  }

  .cell-label-text {
    font-size: 30px;
    color: #666666;
    width: 188px;
    margin-right: 10px;
  }

  .right-text{
      font-size: 24px;
      color: #999;
  }

  .cell-arrow-icon {
    width: 12px;
    height: 24px;
    position: absolute;
    right: 32px;
  }

  .cell-content {
    color: #333333;
    font-size: 30px;
    line-height: 40px;
  }

  .cell-desc-text {
    color: #999999;
    font-size: 24px;
    line-height: 30px;
    margin-top: 10px;
  }
  .item-img{
    width:80px;
    height:80px;
    margin-right:24px;
  }

</style>

<script>
  module.exports = {
    props: {
      height: {
        type: String,
        default: '100'
      },
      label: {
        type: String,
        default: ''
      },
      title: {
        type: String,
        default: ''
      },
      desc: {
        type: String,
        default: ''
      },
      rightText: {
        type: String,
        default: ''
      },
      clickActivied: {
        type: Boolean,
        default: false
      },
      hasTopBorder: {
        type: Boolean,
        default: false
      },
      hasMargin: {
        type: Boolean,
        default: false
      },
      hasBottomBorder: {
        type: Boolean,
        default: true
      },
      hasArrow: {
        type: Boolean,
        default: false
      },
      hasVerticalIndent: {
        type: Boolean,
        default: false
      },
      cellStyle: {
        type: Object,
        default: () => ({})
      },
      itemImg: {
        type: String,
        default: ''
      }
    },
    computed:{
      outputCellStyle () {
        const { height,cellStyle} = this;
        return {"height":height+"px", ...cellStyle };
      }
    },
    data: () => ({
      arrowIcon:"./img/arrow_right.png"
    }),
    methods: {
      cellClicked (e) {
        this.$emit('mideaCellClick', { e });
      }
    }
  };
</script>
