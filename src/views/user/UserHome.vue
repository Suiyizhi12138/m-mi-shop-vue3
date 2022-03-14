<template>
  <div class="user-page">
    <!-- 用户主页 -->
    <header class="user-home-header">
      <div class="header-content">
        <img src="https://s1.mi.com/m/images/m/default.png" alt />
        <div class="user-name" v-if="isLogin">
          <span class="user-name-text">{{userInfo?userInfo.personal_info.nick_name:''}}</span>
          <br />
          <span class="user-special-word">{{userInfo?'12138'+userInfo.id:''}}</span>
        </div>
        <div class="user-name user-btn" v-else>
          <router-link to="/user/login">登录</router-link>/
          <router-link to="/user/register">注册</router-link>
        </div>
      </div>
    </header>
    <div class="container">
      <div class="order-nav">
        <div class="order-nav-header">
          <router-link to="/order" class="router-to-order">
            <div class="order-left">我的订单</div>
            <div class="order-right">
            <p>全部订单</p>
            <i class='iconfont icon-arrowright'></i>
            </div>
          </router-link>
        </div>
        <div class="order-nav-content">
          <ul class="order-nav-list">
            <li class="order-nav-item">
              <router-link to="/order">
                <img src="../../assets/icon/user/wait-pay.png" alt="">
                <div class="">待付款</div>
              </router-link>
            </li>
            <li class="order-nav-item">
              <router-link to="/order">
                <img src="../../assets/icon/user/car.png" alt="">
                <p class="link-name">待收货</p>
              </router-link>
            </li>
            <li class="order-nav-item">
              <router-link class="van-item-link" to="/order">
                <img src="../../assets/icon/user/repair.png" alt="">
                <p class="link-name">退换修</p>
              </router-link>
            </li>
          </ul>
        </div>
        
      </div>
      <!-- 1 -->
      <div class="section-nav">
        <div class="section-item">
          <router-link to="/" class="flex-between">
            <div class="item-left flex-start">
              <img src="../../assets/icon/user/vip.png" alt="">
              <p>会员中心</p>
            </div>
            <div class="item-right"><i class="iconfont icon-arrowright"></i></div>
          </router-link>
        </div>
        <hr class="line">
        <div class="section-item">
          <router-link to="/" class="flex-between">
            <div class="item-left flex-start">
              <img src="../../assets/icon/user/discount.png" alt="">
              <p>我的优惠</p>
            </div>
            <div class="item-right"><i class="iconfont icon-arrowright"></i></div>
          </router-link>
        </div>
      </div>

      <!-- 2 -->
      <div class="section-nav">
        <div class="section-item">
          <router-link to="/" class="flex-between">
            <div class="item-left flex-start">
              <img src="../../assets/icon/user/serve.png" alt="">
              <p>服务中心</p>
            </div>
            <div class="item-right"><i class="iconfont icon-arrowright"></i></div>
          </router-link>
        </div>
        <hr class="line">
        <div class="section-item">
          <router-link to="/" class="flex-between">
            <div class="item-left flex-start">
              <img src="../../assets/icon/user/shop.png" alt="">
              <p>小米之家</p>
            </div>
            <div class="item-right"><i class="iconfont icon-arrowright"></i></div>
          </router-link>
        </div>
      </div>
      <!-- 3 -->
      <div class="section-nav">
        <div class="section-item">
          <router-link to="/" class="flex-between">
            <div class="item-left flex-start">
              <img src="../../assets/icon/user/fcode.png" alt="">
              <p>我的F码</p>
            </div>
            <div class="item-right"><i class="iconfont icon-arrowright"></i></div>
          </router-link>
        </div>
        <hr class="line">
        <div class="section-item">
          <router-link to="/" class="flex-between">
            <div class="item-left flex-start">
              <img src="../../assets/icon/user/gift.png" alt="">
              <p>礼物码兑换</p>
            </div>
            <div class="item-right"><i class="iconfont icon-arrowright"></i></div>
          </router-link>
        </div>
      </div>
      <!-- 4 -->
      <div class="section-nav">
        <div class="section-item">
          <router-link to="/user/set" class="flex-between">
            <div class="item-left flex-start">
              <img src="../../assets/icon/user/set.png" alt="">
              <p>设置</p>
            </div>
            <div class="item-right"><i class="iconfont icon-arrowright"></i></div>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive,toRefs,computed } from 'vue' 
import {  useStore } from 'vuex'
export default {
  created(){
   
    
  },
  setup(){
    const state = reactive({

    })
    const store = useStore()
    const userInfo = computed(()=>{
      if(store.getters.userInfo){
        return store.getters.userInfo
      }else{
         store.dispatch('getUserInfo')
         return store.getters.userInfo
      }
    })
    let isLogin = computed(()=>{
      return store.getters.userLoginStatus == 2
    })
    return {
      ...toRefs(state),
      userInfo,
      isLogin
    }
  }
};
</script>

<style lang="scss" scoped>
.user-page {
  background-color: #f5f5f5;
  padding-bottom: 62px;
  overflow: hidden;
  text-align: left;
  .user-home-header {
    width: 100%;
    height: 82px;
    overflow: hidden;
    background: url("https://m.mi.com/static/img/bg.63c8e19851.png") center 0
      #f37d0f;
    background-size: 375px 82px;
    display: flex;
    justify-content: start;
    align-items: center;
    .header-content {
      margin-left: 18px;
      display: flex;
      align-items: center;
      text-align: left;
      div.user-name{
        margin-left: 8px;
        font-size: 12px;
        span.user-name-text{
          color: #fff;

        }
        span.user-special-word{
          display: inline-block;
          padding-top: 5px;
          color: #fbb0b4;
        }
        
      }
      div.user-btn{
        color: #fff;
        a{
          color: #fff;
        }
      }
      img {
        display: block;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        border: 2px solid #f5b983;
        
      }
    }
  }
  .container{
    background-color: #f5f5f5;
    .order-nav{
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      background-color: #fff;
      .order-nav-header{
        border-bottom: 1px solid  #bbb;
        .router-to-order{
          width: 375px;
          height: 40px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          .order-left{
            margin-left: 15px;
          }
          .order-right{
            margin-right: 15px;
            display: flex;
            justify-content: center;
            align-items: center;
            p{
              height: 24px;
              line-height: 24px;
              font-size: 12px;
            }
            i{
              font-size: 24px;
              color: #bbb;
            }
          }

        }
      }
      .order-nav-content{
        ul.order-nav-list{
          width: 375px;
          height: 90px;
          display: flex;
          justify-content: center;
          align-items: center;
          li.order-nav-item{
            flex: 1;
            display: flex;
            justify-content: center;
            align-items: center;
            a{
              display: flex;
              flex-direction: column;
              align-items: center;
              img{
                width: 24px;
                height: 24px;
                margin-bottom: 12px;
              }
              font-size: 12px;

            }
          }
        }

      }
    }
    .section-nav{
      background-color: #fff;
      margin-top: 12px;
      .section-item{
        padding: 15px;
        box-sizing: border-box;
        a{
          .item-left{
            height: 24px;
            line-height: 24px;
            p{
              margin-left: 16px;
              color: #333;
            }
          }
          .item-right{
            i{
              font-size: 24px;
              color: #bbb;
            }
          }
          img{
            height: 24px;
          }
        }

      }
      .line{
        margin-left: 58px;
        color: #bbb;
        border-width: 1px;
      }
    }
  }
}
</style>