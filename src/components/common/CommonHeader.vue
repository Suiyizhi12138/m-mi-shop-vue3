<template>
  <header class="cart-header">
      <a href="javascript:" class="link-back" @click="goBack()">
        <i class="iconfont icon-arrow-left"></i>
      </a>
      <span class="header-title">{{title}}</span>
      <router-link to="/search">
        <i class="iconfont icon-search"></i>
      </router-link>
    </header>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true
    }
  },
  setup(){
     const goBack = () => {
      window.history.back()
    }
    return {
      goBack
    }
  }


}
</script>

<style lang="scss" scoped>
.cart-header{
     height: 50px;
     line-height: 50px;
     text-align: center;
     background-color: #f5f5f5;
     display: flex;
     justify-content: space-between;
     color: #666;
     .icon-arrow-left{
       width: 20px;
       height: 20px;
       font-size: 30px;
       color: #999;
     }
     .header-title{
       font-size: 16px;
     }
     .icon-search{
       width: 20px;
       height: 20px;
       font-size: 24px;
     }
     padding: 0 16px;
   }

</style>