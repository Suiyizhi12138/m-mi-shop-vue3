<template>
  <header class="cart-header">
    <a href="javascript:" class="link-back" @click="goBack()">
      <i class="iconfont icon-arrow-left"></i>
    </a>
    <span class="header-title">{{title}}</span>
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
  setup() {
    const goBack = () => {
      window.history.back();
    };
    return {
      goBack
    };
  }
};
</script>

<style lang="scss" scoped>
.cart-header {
  height: 50px;
  line-height: 50px;
  text-align: center;
  display: flex;
  justify-content: flex-start;
  color: #666;
  background-color: #f5f5f5;
  .icon-arrow-left {
    width: 52px;
    height: 20px;
    font-size: 30px;
    color: #999;
  }
  .header-title {
    font-size: 16px;
    color: #333;
    width: 271px;
  }
  padding: 0 16px;
}
</style>