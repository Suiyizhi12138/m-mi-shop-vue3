<template>
  <div class="order-item">
    <div class="order-item-header flex-between">
      <div class="header-left flex-start">
        <img src="../../../assets/images/login/logo-mi2.png" alt />
        小米商城
      </div>
      <div class="header-right">{{paidInfo}}</div>
    </div>
    <div class="order-item-content flex-between" v-for="item in order.items" :key="item.id">
      <div class="content-left flex-between">
        <img :src="item.product.image_url" alt="/" />
        {{ item.product.zh_name }}
        <br />
        {{ item.product_sku.name }}
      </div>
      <div class="content-right">
        <div class="item-price">￥{{item.price}}</div>
        <div class="item-count">x{{item.amount}}</div>
      </div>
    </div>
    <div class="order-item-footer">
      <div class="footer-top flex-between">
        <div class="top-left">{{order.created_at}}</div>
        <div class="top-right">
          应付金额：
          <span class="price-number">{{order.total_amount}}元</span>
        </div>
      </div>
      <div class="footer-bottom">
        <div class="btn-box flex-start">
          <a href="javascript:" class="btn-footer btn-delete" @click="deleteOrder(order.no)">取消订单</a>
          <router-link :to="'/pay_order/'+order.no" class="btn-footer btn-submit" v-if="!isPaid">立即付款</router-link>
          <a href="javascript:" class="btn-footer btn-submit" v-else @click="completeOrder(order.no)">确认收货
          </a>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { computed } from "vue";
import { Toast } from 'vant';
import FetchAPI from '@/utils/fetchApi';
export default {
  props: {
    order: {
      type: Object,
      required: true
    },
    isPaid: {
      type: Boolean,//是否已经支付
      required: true
    }
  },
  setup(props,{emit}) {
    const paidInfo = computed(() => {
      if (props.order.paid_at) {
        return "等待收货";
      } else {
        return "等待付款";
      }
    });
    const deleteOrder = (no) => {
      Toast.loading("取消中");
      
      FetchAPI.deleteOrder(no).then(res => {
        if (res.status == 200) {
          emit('deleteItem',no);
          Toast.clear();
        }
      })
      .catch((e)=>{
        console.log(e)
        Toast.fail('取消失败')
      });
    };

    const completeOrder = (no) => {
      Toast.loading("确认中");
      FetchAPI.deleteOrder(no).then(res => {
        if (res.status == 200) {
          Toast.clear();
          emit('',no)
        }
      })
      .catch((e) => {
        console.log(e)
      });
    }

    return {
      paidInfo,
      deleteOrder,
      completeOrder
    };
  }
};
</script>

<style lang="scss" scoped>
.order-item {
  padding: 0 15px;
  margin-top: 10px;
  background-color: #fff;
  .order-item-header {
    height: 40px;
    line-height: 40px;
    border-bottom: 1px solid #eee;
    .header-left {
      img {
        width: 18px;
        height: 18px;
        vertical-align: middle;
        margin-right: 10px;
      }
      color: #000;
    }
    .header-right {
      color: #ff6700;
      font-size: 12px;
    }
  }
  .order-item-content {
    border-bottom: 1px solid #eee;
    .content-left {
      height: 80px;
      img {
        max-height: 70px;
        max-width: 70px;
      }
      font-size: 14px;
      color: #000;
      font-weight: 500;
    }
    .content-right {
      color: #999;
      .item-count {
        margin-top: 10px;
        font-size: 12px;
      }
    }
  }
  .order-item-footer {
    padding-bottom: 10px;
    .footer-top {
      height: 50px;
      line-height: 50px;
      .top-right {
        .price-number {
          font-size: 16px;
          color: #999;
        }
      }
    }
    .footer-bottom {
      height: 40px;
      .btn-box {
        margin-left: 180px;
      }
      .btn-footer {
        display: block;
        width: 75px;
        height: 35px;
        border: 1px solid #999;
        background-color: #fff;
        border-radius: 3px;
        line-height: 35px;
        margin-bottom: 20px;
        text-align: center;
      }
      .btn-delete {
        color: #999;
      }
      .btn-submit {
        color: #ff6700;
        border-color: #ff6700;
        margin-left: 10px;
      }
    }
  }
}
</style>