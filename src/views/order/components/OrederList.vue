<template>
    <ul class="order-list">
        <li class="order-item" v-for="order in orders" :key="order.id">
          <div class="order-item-header flex-between">
            <div class="header-left flex-start">
              <img src="../../../assets/images/login/logo-mi2.png" alt="">
              小米商城
            </div>
            <div class="header-right" v-show="!isAll">
              等待付款
            </div>
          </div>
          <div class="order-item-content flex-between" v-for="item in order.items" :key="item.id">
            <div class="content-left flex-between">
              <img :src="item.product.image_url" alt="/">
              {{ item.product.zh_name }}
              <br> 
              {{ item.product_sku.name }}
            </div>
            <div class="content-right">
              <div class="item-price">￥{{item.price}}</div>
              <div class="item-count">x{{item.amount}}</div>
            </div>
          </div>
          <div class="order-item-footer">
            <div class="footer-top flex-between">
              <div class="top-left">
                {{order.created_at}}
              </div>
              <div class="top-right">
                应付金额：<span class="price-number">{{order.total_amount}}元</span>
              </div>
            </div>
            <div class="footer-bottom">
              <div class="btn-box">
                <button class="btn-delete" @click="deleteOrder(order.no)">取消订单</button>
                <router-link :to="'/pay_order/'+order.no" class="btn-submit">立即付款</router-link>
              </div>
            </div>
          </div>
        </li>
    </ul>
</template>

<script>
import FetchAPI from '@/utils/fetchApi'
import { reactive,toRefs } from 'vue'
import { Toast } from 'vant'
import { useRouter } from 'vue-router'
export default {
  props: {
    orders: {
      type: Array,
      required: true
    },
   isAll: {
     type: Boolean,
     required: true
   }
  },
  setup(){
    const deleteOrder = (no) => {
      Toast.loading('删除中')
      FetchAPI.deleteOrder(no)
      .then((res) => {
        if(res.status==200){
          Toast.clear()
          window.location.reload();
        }
      })
    }
    const router = useRouter()
    return {
      deleteOrder
    }
  }
}
</script>

<style lang="scss" scoped>
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
</style>