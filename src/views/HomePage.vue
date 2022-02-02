<template>
  <div class="home-page">
    <!-- 顶部广告 -->
    <div v-if="isShowAd" class="top-ad">
      <img src="../assets/images/home/top-ad.png" alt="ad-img" />
      <div class="close-btn" @click="closeAd"></div>
    </div>
    <back-top></back-top>
    <router-view></router-view>

    <!-- 首页底部按钮 -->
    <footer class="footer-home">
      <router-link to="/home" class="link-button link-home">
        <img src="../assets/icon/icon-home.png" alt="home-icon" />
        <img src="../assets/icon/icon-home-selected.png" alt="home-icon" />

        <!-- <img  src="https://m.mi.com/static/img/icon-home.c1947eda40.png" alt="首页图标"> -->
        <!-- <img  src="https://m.mi.com/static/img/icon-home-selected.598ca2c8f9.png" alt="首页图标"> -->
        <span>首页</span>
      </router-link>
      <router-link to="/category" class="link-button link-category">
        <img src="../assets/icon/icon-category.png" alt="category-icon" />
        <img src="../assets/icon/icon-category-selected.png" alt="category-icon" />
        <!-- <img  src="https://m.mi.com/static/img/icon-category.be93273636.png" alt="分类图标"> -->
        <!-- <img  src="https://m.mi.com/static/img/icon-category-selected.252b82a2d7.png" alt="分类图标"> -->
        <span>分类</span>
      </router-link>
      <router-link to="/mi-blog" class="link-button link-blog">
        <img src="../assets/icon/icon-star.png" alt="star-icon" />
        <img src="../assets/icon/icon-star-selected.png" alt="star-icon" />
        <!-- <img  src="https://m.mi.com/static/img/icon-star.d051789804.png" alt=""> -->
        <!-- <img  src="https://m.mi.com/static/img/icon-star-selected.52a68e3664.png" alt=""> -->
        <span>米圈</span>
      </router-link>
      <router-link to="/cart" class="link-button link-cart">
        <img src="../assets/icon/icon-cart.png" alt="cart-icon" />
        <img src="../assets/icon/icon-cart-selected.png" alt="cart-icon" />
        <!-- <img  src="https://m.mi.com/static/img/icon-cart.585c3aa4d3.png" alt=""> -->
        <!-- <img  src="https://m.mi.com/static/img/icon-cart-selected.0099b47830.png" alt=""> -->
        <span>购物车</span>
        <span class="cart-item-amount">{{totalAmount}}</span>
      </router-link>
      <router-link to="/user" class="link-button link-user">
        <img src="../assets/icon/icon-user.png" alt="user-icon" />
        <img src="../assets/icon/icon-user-selected.png" alt="user-icon" />
        <!-- <img  src="https://m.mi.com/static/img/icon-user.23496a0116.png" alt=""> -->
        <!-- <img  src="https://m.mi.com/static/img/icon-user-selected.fceea5d907.png" alt=""> -->
        <span>我的</span>
      </router-link>
    </footer>
  </div>
</template>

<script>
import { reactive, toRefs } from "vue";
import BackTop from "@/components/common/BackTop";
import { useStore } from 'vuex'

export default {
  
  computed: {
    totalAmount(){
      return this.$store.getters.cartTotalAmount
    }

  },
  setup() {
    const state = reactive({
      isShowAd: false
    });
    const Store = useStore
    const closeAd = () => {
      state.isShowAd = false;
    };
    return {
      ...toRefs(state),
      closeAd,
     
    };
  },
  components: {
    BackTop
  }
};
</script>

<style lang="scss" scoped>
.home-page {
  .top-ad {
    width: 100%;
    height: 50px;
    position: fixed;
    top: 0px;
    left: 0px;
    z-index: 99;
    img {
      width: 100%;
      height: 50px;
    }
    .close-btn {
      width: 8%;
      height: 50px;
      //background-color: #ff6700;
      position: absolute;
      z-index: 19;
      left: 0px;
      top: 0px;
    }
  }
  .footer-home {
    width: 100%;
    height: 52px;
    position: fixed;
    bottom: 0;
    display: flex;
    align-items: center;
    background-color: #fff;
    a.link-button {
      display: block;
      position: relative;
      height: 52px;
      width: 52px;
      margin-top: 10px;
      box-sizing: border-box;
      flex: 1;
      font-size: 12px;
      display: flex;
      flex-direction: column;
      color: #666;
      img {
        width: 20px;
        height: 20px;
        display: block;
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
      }
      img:nth-child(2) {
        display: none;
      }
      span {
        margin-top: 25px;
      }
      span.span-active {
        color: #ff6700;
      }
    }
    a.router-link-active {
      img:nth-child(1) {
        display: none;
      }
      img:nth-child(2) {
        display: block;
      }
      span {
        color: #ff6700;
      }
    }
    a.link-cart {
      position: relative;
      .cart-item-amount {
        position: absolute;
        display: block;
        width: 16px;
        height: 16px;
        line-height: 16px;
        text-align: center;
        top: -28px;
        right: 16px;
        font-size: 10px;
        border-radius: 50%;
        background-color: #ff6700;
        color: #fff;
        overflow: hidden;
      }
    }
  }
}
</style>