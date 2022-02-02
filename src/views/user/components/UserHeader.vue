<template>
  <div class="user-header flex-between">
    <div class="user-header-left" @click="showPopLang">
      <div class="text">选择语言</div>
      <div class="trangle-down"></div>
    </div>
    <div class="user-header-right">
      <a href="javascript:">需要帮助</a>
    </div>
   <!-- //语言弹窗 -->
   <van-popup v-model:show="isShowPopLang" position="top" closeable>
     <div class="lang-content">
       <h2 class="lang-title">选择语言</h2>
       <a href="javascript:" @click="chooseLang">中文（简体）</a>
       <a href="javascript:" @click="chooseLang">English</a>
     </div>
   </van-popup>
  </div>
 
  
</template>

<script>
import { reactive,toRefs } from 'vue'
export default {
  setup(props,context){
   
    const state = reactive({
      isShowPopLang: false
    })
    const showPopLang = () => {
      state.isShowPopLang = true
    }
    const chooseLang = () => {
      state.isShowPopLang = false
    }
    
    
    return {
      ...toRefs(state),
      showPopLang,
      chooseLang
    }

  }

}
</script>

<style lang="scss" scoped>
.user-header{
  width: 375px;
  box-sizing: border-box;
  padding: 30px 25px;
  font-size: 12px;
  color: #999;
  .user-header-left{
    display: flex;
    align-items: center;
    .van-dtopdown-menu{
      span{
        font-size: 12px;
      }
    }
    .trangle-down{
      width: 0;
      height: 0;
      border-top: 5px solid #999;
      border-left: 4px solid transparent;
      border-right: 4px solid transparent;
      margin-left: 2px;
    }

  }
  .user-header-right{
    a{
      color: #999;
    }
  }
  .lang-content{
    height: 160px;
    padding: 16px;
    h2.lang-title{
      font-size: 24px;
      color: #333;
      padding: 16px 0;
    }
    a{
      display: block;
      height: 40px;
      font-size: 16px;
      color: #333;

      margin-top: 12px;
    }
  }
}
</style>