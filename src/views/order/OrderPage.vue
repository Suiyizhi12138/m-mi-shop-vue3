<template>
  <div class="order-page">
    <common-header :title="'我的订单'"></common-header>
    <nav class="order-header">
      <ul class="nav-list flex-start">
        <li class="nav-item">
          <a href="javascript:" class="btn-nav" :class="{'btn-nav-active': showIndex==0}" @click="showList(0)">
            全部
          </a>
        </li>
        <li class="nav-item">
          <a href="javascript:" class="btn-nav" :class="{'btn-nav-active': showIndex==1}" @click="showList(1)">
            待付款
          </a>
        </li>
        <li class="nav-item">
          <a href="javascript:" class="btn-nav" :class="{'btn-nav-active': showIndex==2}"  @click="showList(2)">
            待收货
          </a>
        </li>
      </ul>
    </nav>
    <!-- 全部订单 -->
    <transition name="slide-right">
      <div class="order-list-container" v-if="showIndex
      ==0">
        <!-- <order-list :orders="all_orders" :isAll="true"></order-list> -->
        <ul class="order-list">
          <li v-for="itemOrder in all_orders" :key="itemOrder.id">
            <order-item :order="itemOrder"></order-item>
          </li>
        </ul>
      </div>
    </transition>
    <!-- 待付订单 -->
    <transition name="slide-left">
      <div class="order-list-container" v-if="showIndex
      ==1">
        <ul class="order-list">
          <li class="order-li" v-for="itemOrder in ready_orders" :key="itemOrder.id">
            <order-item :order="itemOrder"></order-item>  
          </li>
        </ul>
      </div>
    </transition>
    <!-- 待收货订单 -->
    <transition name="slide-right">
      <div class="order-list-container" v-if="showIndex==2">
        <ul class="order-list">
          <li class="order-li" v-for="itemOrder in paid_orders" :key="itemOrder.id">
            <order-item :order="itemOrder"></order-item>
          </li>
        </ul>
      </div>  
    </transition>
  </div>
</template>

<script>
import CommonHeader from '@/components/common/CommonHeader'
import { toRefs,reactive,onMounted } from 'vue'
import { useRouter } from 'vue-router'
import FetchAPI from '@/utils/fetchApi'  
import OrderItem from './components/OrderItem'
export default {
  components: {
    CommonHeader,
    OrderItem
  },
  setup(){
    const state = reactive({
      showIndex: 0,//显示列表下标
      all_orders: [],//订单列表
      paid_orders: [],//已经支付的订单
      ready_orders: [],//待付款订单
    })
    onMounted(()=>{
      getOrders()
    })
    const showList = (index) => {
      state.showIndex = index
    }
    const getOrders = () => {
      FetchAPI.getOrders()
      .then((res)=>{
        state.all_orders = res.data
        state.paid_orders = res.data.filter((item)=>{
          return Boolean(item.paid_at) == true
        })
        state.ready_orders = res.data.filter((item)=>{
          return Boolean(item.paid_at) == false
        })
      })
    }
    
    return {
      ...toRefs(state),
      showList
    }
  }
}
</script>

<style lang="scss" scoped>
  .order-page{
    background-color: #f5f5f5;
    overflow: hidden;
    .order-header{
      .nav-list{
        background-color: #fff;
        .nav-item{
          line-height: 40px;
          flex: 1;
          color: #999;
          .btn-nav{
            font-size: 13px;
          }
          .btn-nav-active{
            color: #ff6700;
            padding-bottom: 5px;
            border-bottom: 1px solid #ff4f18;
          }
        }
      }
    }
    .order-list-container{
      position: absolute;
      top: 85px;
      .order-list{
        background-color: #f5f5f5;
        .order-item{
          padding: 0 15px;
          margin-top: 10px;
          background-color: #fff;
          .order-item-header{
            height: 40px;
            line-height: 40px;
            border-bottom: 1px solid #eee;
            .header-left{  
              img{
                width: 18px;
                height: 18px;
                vertical-align: middle;
                margin-right: 10px;
              }
              color: #000;
              
            }
            .header-right{
              color: #ff6700;
              font-size: 12px;
            }
          }
          .order-item-content{
            border-bottom: 1px solid #eee;
            .content-left{
              height: 80px;
              img{
                max-height: 70px;
                max-width: 70px;
              }
              font-size: 14px;
              color: #000;
              font-weight: 500;
            }
            .content-right{
              color: #999;
              .item-count{
                margin-top: 10px;
                font-size: 12px;
              }
            }
          }
          .order-item-footer{
            .footer-top{
              height: 50px;
              line-height: 50px;
              .top-right{
                .price-number{
                  font-size: 16px;
                  color: #999;
                }
              }
            }
            .footer-bottom{
              height: 40px;
              .btn-box{
                margin-left: 180px;
              }
              button{
                width: 75px;
                height: 35px;
                border: 1px solid #999;
                background-color: #fff;
                border-radius: 3px;
              }
              .btn-delete{
                color: #999;
              }
              .btn-submit{
                color: #ff6700;
                border-color: #ff6700;
                margin-left: 10px;
              }

            }
          }
        }
      }
    }

    .slide-left-enter-active,.slide-left-leave-active{
      transition: all .5s ease;
    }
    .slide-left-enter-from,.slide-left-leave-to{
      transform: translateX(-375px);
    }
    .slide-left-enter-to,.slide-left-leave-from{
      transform: translateX(0)
    }

    .slide-right-enter-active,.slide-right-leave-active{
      transition: all .5s ease;
    }
    .slide-right-enter-from,.slide-right-leave-to{
      transform: translateX(375px);
    }
    .slide-right-enter-to,.slide-left-right-from{
      transform: translateX(0)
    }
  }
</style>