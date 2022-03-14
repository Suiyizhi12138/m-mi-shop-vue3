<template>
  <div class="pay-order-page">
    <div class="pay-head flex-column">
      <h4 class="total-label">订单金额</h4>
      <div class="total-number">
        <span class="money-tag">￥</span>
        <span class="money-number">{{order.total_amount}}</span>
      </div>
      <div class="order-last-time">
        请在
        <span style="color:#ff6700">2小时</span>
        内完成支付，超时订单将关闭
      </div>
    </div>
    <div class="order-info">
      <div class="order-info-item flex-start">
        <div class="order-info-label">订单编号：</div>
        <div class="order-info-detail">{{order.no}}</div>
      </div>
      <div class="order-info-item flex-start">
        <div class="order-info-label">收货信息：</div>
        <div
          class="order-info-detail"
        >{{order.address?order.address.contact_name:''}} {{order.address?order.address.contact_phone:''}}</div>
      </div>
      <div class="order-info-item flex-start">
        <div class="order-info-detail order-info-address">{{order.address?order.address.address:''}}</div>
      </div>
    </div>
    <div class="payment-box">
      <h3 class="payment-title">请选择支付方式</h3>
      <div class="payment-item flex-between">
        <div class="payment-item-left">
          <img src="../../assets/icon/alipay.png" alt="alipay" />
          支付宝
        </div>
        <div class="payment-item-btn">
          <van-radio-group v-model="checked">
            <van-radio name="alipay" checked-color="#ff4f18"></van-radio>
            <!-- <van-radio name="tencentPay" checked-color="#ff4f18"></van-radio> -->
          </van-radio-group>
        </div>
      </div>
    </div>
    <div class="pay-order-footer">
      <a href="javascript:" class="payorder-btn" @click="payMoney">
        确认支付
        <span class="pay-money">￥{{order?order.total_amount:''}}</span>
      </a>
    </div>
  </div>
</template>

<script>
import { reactive, toRefs, onMounted, computed } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useStore } from "vuex";
import FetchAPI from "@/utils/fetchApi";
import { Dialog, Toast } from "vant";
import Session from '@/utils/session.js'
export default {
  setup() {
    const state = reactive({
      checked: "alipay",
      order: {
        total_amount: 0
      } //订单信息
    });
    const router = useRouter();
    const store = useStore();
    const route = useRoute();
    onMounted(() => {
      //获取支付订单信息
      FetchAPI.getOrder(route.params.no).then((res) => {
        if(res.data[0]){
           state.order = res.data[0];
        }else{
          handleFailOrder("订单不存在或已支付")
          return
        }
        
       
       
        //如果订单为空
        if (!state.order  || state.order.paid_at) {
          handleFailOrder("订单已经支付，谢谢惠顾")
          return
        }

        if(state.order&&state.order.closed){
          handleFailOrder("订单已经超时，谢谢惠顾")
        }

       
      });
    });
    //订单超时或已经支付 操作
    const handleFailOrder = (msg) => {
      Dialog.confirm({
        message: msg
      })
        .then(() => {
          //confirm
          router.push({ name: "home" });
        })
        .catch(() => {
          //取消
          router.push({ name: "order" });
        });
    };

    
    //  支付订单
    const payMoney = () => {
      if(!state.order) {
       return
      }
      const data = {
        cost: parseFloat(state.order.total_amount),
        no: state.order.no
      };
      Toast.loading({
        message: "正在支付"
      });
      FetchAPI.cost(data)
        .then(res => {
          if (res.status == 200) 
          Toast.clear()
          Session.removeStore('_selected_address')
          Session.removeStore('_buy_item')
          Session.removeStore('_buy_items')
          router.push({
            name: "order"
          });
        })
        .catch(res => {
          if (res.status == 400) {
            Dialog.alert({
              message: "余额不足"
            }).then(() => {
              router.push({ name: "order" });
            });
          }
        });
    };

    return {
      ...toRefs(state),
      payMoney,
      handleFailOrder
    };
  }
};
</script>

<style lang="scss" scoped>
.pay-order-page {
  text-align: left;
  .pay-head {
    width: 375px;
    height: 126px;
    background-color: #fff;
    .total-label {
      color: #000;
      font-weight: 700;
      font-size: 12px;
      line-height: 30px;
    }
    .total-number {
      color: #ff390d;
      line-height: 40px;
      .money-tag {
        font-size: 12px;
      }
      .money-number {
        font-size: 24px;
      }
    }
    .order-last-time {
      font-size: 12px;
    }
  }
  .order-info {
    background-color: #f5f5f5;
    font-size: 12px;
    height: 88px;
    box-sizing: border-box;
    padding: 20px;
    .order-info-item {
      line-height: 20px;
      div.order-info-label {
        width: 60px;
      }
      div.order-info-address {
        margin-left: 60px;
      }
    }
  }
  .payment-box {
    padding: 0 15px;
    .payment-title {
      height: 52px;
      font-size: 16px;
      font-weight: normal;
      line-height: 50px;
      text-align: left;
    }
  }
  .pay-order-footer {
    overflow: hidden;
    position: fixed;
    bottom: 0px;
    a {
      display: block;
      width: 375px;
      height: 50px;
      cursor: pointer;
      line-height: 50px;
      text-align: center;
      color: #fff;
      background-color: #ff4f18;
      .pay-money {
        font-weight: 900;
        font-size: 16px;
      }
    }
  }
}
</style>