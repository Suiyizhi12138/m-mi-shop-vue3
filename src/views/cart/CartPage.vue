<template>
  <div class="cart-page">
    <common-header :title="'购物车'"></common-header>
    <nav class="nav-login" v-show="!isLogin">
      <router-link to="/user/login" class="flex-between">
        <div class="nav-left">登录后享受更多优惠</div>
        <div class="nav-right">去登陆></div>
      </router-link>
     
    </nav>
    <div class="cart-content" v-if="cartItems.length>0">
      <div class="cart-item flex-start" v-for="(item,index) in cartItems" :key="index">
        <div class="cart-left flex-center">
          <div
            class="check-btn flex-center"
            @click="checkItem(index)"
            :class="{'check-btn-active':checkedItemIndexs.indexOf(index)>-1}"
          >
            <img src="../../assets/icon/cart/check_press.png" alt="icon" />
          </div>
        </div>
        <!-- //商品图片 -->
        <div class="cart-center">
          <img :src="item.product_sku.imgs[0]" alt="商品图片" />
        </div>
        <div class="cart-right flex-between">
          <div class="cart-info-box flex-wrap">
            <div class="cart-item-name">{{item.product_sku.product.zh_name}}</div>
            <div class="cart-item-type">{{item.product_sku.name.replace(/-/,' ')}}</div>
            <div class="cart-item-price">售价{{item.product_sku.price*1}}元</div>
            <div class="item-count-box flex-start">
              <a href="javascript:void(0)" @click="decAmount(index)">
                <i class="iconfont icon-jianhao"></i>
              </a>
              <span>{{item.amount}}</span>
              <a href="javascript:void(0)" @click="incAmount(index)">
                <i class="iconfont icon-jiahao"></i>
              </a>
            </div>
          </div>
          <div class="cart-delete-box">
            <i class="iconfont icon-delete" @click="deleteItem(item.id)"></i>
          </div>
        </div>
      </div>
    </div>
    <div class="cart-null-info " v-else>
      购物车还是空的
      <router-link to="/" class="btn-other">
        去逛逛
      </router-link>
    </div>
    <div class="cart-tips">
      <p>温馨提示：产品是否购买成功，以最终下单为准，请尽快结算</p>
    </div>
    <div class="footer-btn-box flex-start">
      <div class="count-info flex-column">
        <p class="count-amount">共{{checkedTotalAmount}}件，金额：</p>
        <p class="count-totoal">
          <span class="price-number">{{checkedTotalPrice}}</span>元
        </p>
      </div>
      <div class="btn-buy flex-column">
       <router-link to="category">继续购物</router-link>
      </div>
      <div class="btn-handler flex-column">
        <a href="javascript:" @click="submitCart">
          去结算
        </a>
      </div>
    </div>
  </div>
</template>
<script>
import { onMounted, reactive, toRefs, computed } from "vue";
import FetchAPI from "@/utils/fetchApi";
import { Toast } from "vant";
import CommonHeader from "@/components/common/CommonHeader";
import { useStore } from "vuex";
import { useRouter } from 'vue-router'
import Session from '@/utils/session.js'

export default {
  created() {
    if(localStorage.getItem('_user_token')){
      this.$store.dispatch("getCartItems");
    } 
  },
  setup() {
    const state = reactive({
      //cartItems: [],//购物车项目
      checkedItemIndexs: [], //选中的购物车项目下标 array[index1,index2,index3]
      checkedItems: [], //选中的购物车项目 array[{},{},{}]
      checkedTotalAmount: 0, //选中总件数
      checkedTotalPrice: 0, //选中总价
      isLogin: false,//是否登录
    });
    const store = useStore();
    const router = useRouter();
    onMounted(()=>{
      if(localStorage.getItem('_user_token')){
        state.isLogin = true
      }
    })
    //选中购物车项目
    const checkItem = index => {
      //如果该项不在数组中则加入
      if (state.checkedItemIndexs.indexOf(index) == -1) {
        state.checkedItemIndexs.push(index);
        state.checkedItems.push(cartItems._value[index]);
        //计算总数和总价
        computeCheckedItems();
      }
      //如果已经存在则删除
      else {
        state.checkedItemIndexs.splice(
          state.checkedItemIndexs.indexOf(index),
          1
        );
        state.checkedItems.splice(
          state.checkedItems.indexOf(
            state.checkedItems[index]
          ),
          1
        );
        //计算总数和总价
        computeCheckedItems();
      }
    };
    const computeCheckedItems = () => {
      let totalAmount = 0;
      let totalPrice = 0;
      state.checkedItems.forEach(item => {
        totalAmount += item.amount;
        totalPrice += parseFloat(item.product_sku.price*item.amount);
      });
      state.checkedTotalAmount = totalAmount;
      state.checkedTotalPrice = totalPrice;
    };
    //删除购物车项目
    const deleteItem = id => {
      FetchAPI.deleteCartItem(id).then(res => {
        if (res.status == 200) {
          FetchAPI.getCartItems().then(res => {
            localStorage.setItem("_full_cart", JSON.stringify(res.data));
            Toast.clear();
            window.location.reload();
          });
        }
      });
      Toast.loading("删除中");
    };
    const cartItems = computed(() => {
      return store.getters.cartItems;
    });
    //计步器增
    const incAmount = index => {
      if (
        cartItems._value[index].amount <
        cartItems._value[index].product_sku.limit
      ) {
        cartItems._value[index].amount++;
        computeCheckedItems()
      } else {
        Toast.fail("购买数量不能超过限购数");
      }
    };
    //计步器减
    const decAmount = index => {
      if (cartItems._value[index].amount > 1) {
        cartItems._value[index].amount--;
        computeCheckedItems()
      } else {
        Toast.fail("购买数量不能为0");
      }
    };
    //结算购物车
    const submitCart = () => {
        //判定是否选中购物车项目
        if(state.checkedItems.length==0){
          Toast.fail('请选择要购买的商品')
        }else{
          //储存购物车项目
         Session.setStore('_buy_items',state.checkedItems)
         Session.removeStore('_buy_item')
          router.push({name:"check_order"})
        }
    };
    //是否已登录
    let  isLogin = computed(()=>{
      return store.getters.userLoginStatus == 2;
    })

    return {
      ...toRefs(state),
      checkItem,
      deleteItem,
      cartItems,
      incAmount,
      decAmount,
      submitCart,
      isLogin
    };
  },
  components: {
    CommonHeader
  }
};
</script>

<style lang="scss" scoped> 
.cart-page {
  overflow: hidden;
  min-height: 100%;
  text-align: left;
  padding-bottom: 50px;
  background-color: #f5f5f5;
  .nav-login{
    height: 55px;
    padding: 0 16px;
    background-color: #fff;
    a{
      height: 55px;
      text-align: center;
    }
    .nav-left{
      font-size: 16px;
      font-weight: 500;  
    }
    .nav-right{
      font-size: 12px;
      color: #999;

    }
  }
  .cart-content {
    overflow: hidden;
    background-color: #f5f5f5;
    .cart-item {
      background-color: #fff;
      margin-top: 10px;
      height: 120px;
      .cart-left {
        width: 30px;
        .check-btn {
          width: 20px;
          height: 20px;
          border: 1px solid #999;
          border-radius: 50%;

          img {
            width: 20px;
            height: 20px;
            display: none;
          }
        }
        .check-btn-active {
          border: none;
          img {
            display: block;
          }
        }
      }
      .cart-center {
        width: 96px;
        height: 96px;
        border-radius: 2px;
        border: 1px solid #eee;
        background-color: #fff;
        display: flex;
        justify-content: center;
        align-items: center;
        img {
          max-height: 90px;
        }
      }
      .cart-right {
        margin-left: 10px;
        .cart-info-box {
          width: 170px;
          .cart-item-name,
          .cart-item-type,
          .cart-item-price {
            width: 170px;
          }
          .cart-item-name,
          .cart-item-type {
            font-size: 14px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
          .cart-item-price {
            color: #999;
            font-size: 12px;
            line-height: 20px;
          }
          .item-count-box {
            width: 96px;
            height: 35px;
            border: 1px solid #eee;
            a {
              display: block;
              width: 35px;
              height: 35px;
              line-height: 35px;
              text-align: center;
              background-color: #eee;
              i {
                font-size: 20px;
              }
            }
            span {
              width: 35px;
              height: 35px;
              line-height: 35px;
              text-align: center;
              font-size: 16px;
            }
          }
        }
        .cart-delete-box {
          position: relative;
          width: 40px;
          height: 120px;
          .icon-delete {
            font-size: 20px;
            color: #999;
            position: absolute;
            right: 0px;
            bottom: 15px;
          }
        }
      }
    }
  }
  .cart-null-info {
    background: url(https://m.mi.com/static/img/cartnull.daaf7926f8.png) no-repeat 0;
    font-size: 12px;
    background-color: #ebebeb; 
    width: 375px;
    height: 60px;
    color: #999;
    display: flex;
    justify-content: center;
    align-items: center;
    line-height: 26px;
    text-align: center;
    background-size: 44px 36px;
    background-position: 15% 50%;
    .btn-other{
      width: 66px;
      height: 26px;
      border: 1px solid #999;
      margin-left: 5px;
    }
  }
  .cart-tips {
    height: 40px;
    margin: 10px 0;
    padding-left: 10px;
    font-size: 12px;
    color: #999;
    line-height: 40px;
    text-align: center;
    background-color: #fff;
  }
  .footer-btn-box {
    position: fixed;
    width: 100%;
    height: 50px;
    bottom: 0px;
    z-index: 9;
    background-color: #fff;
    div {
      flex: 1;
      height: 50px;
    }
    div.count-info {
      color: #999;
      font-size: 12px;
      span.price-number {
        color: #ff6700;
        font-weight: 900;
        font-size: 18px;
      }
    }
    div.btn-buy {
      background-color: #eee;
      color: #666;
    }
    div.btn-handler {
      background-color: #ff6700;
      a{
        color: #fff;
      }
    }
  }
}
</style>