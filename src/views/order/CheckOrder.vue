<template>
  <div class="check-order-page">
    <!-- 确认订单页 -->
    <address-header :title="'用户结算'"></address-header>
    <div class="header-tips flex-between" v-if="isShowTips">
      <div class="tips-left">
        <i class="iconfont icon-alert"></i>
      </div>
      <van-swipe class="swipe-tips" autoplay="3000" :show-indicators="false" duration="1000" vertical>
        <van-swipe-item>
          <div class="swipe-item-content flex-center">
            <p>套装版充电显示0.01元，此价格非实际价格，仅做销售展示，实际价格以商城销售价为准</p>
          </div>
        </van-swipe-item>
        <van-swipe-item>
          <div class="swipe-item-content flex-center">
            <p>春节期间“家电类”家电类产品配送区域可能有调整，我的-我的客服-搜一搜，搜索“2022春节物流”查看详情。</p>
          </div>
        </van-swipe-item>
        <van-swipe-item>
          <div class="swipe-item-content flex-center">
            <p>广东、云南、黑龙江部分地区因国家疫情防控影响，商品到货存在一定延期，给您带来不便，敬请谅解</p>
          </div>
        </van-swipe-item>
      </van-swipe>
      <div class="tips-close" @click="closeTips">
        <i class="iconfont icon-close"></i>
      </div>
    </div>
    <div class="address-choice flex-between">
      <div class="address-choice-left flex-wrap" @click="showAddressChoice">
        <div class="user-info">
          <span >{{userInfo?userInfo.personal_info.nick_name:''}}</span>
          <span>{{userInfo?userInfo.phone: ''}}</span>
        </div>
        <div class="user-address">
          广东省 广州市 白云区 均和大道 大朗站
        </div>
      </div>
      <div class="address-choice-right flex-column">
        <i class="iconfont icon-arrowright"></i>
      </div>
    </div>
    <div class="order-list-container">
      <ul class="order-list">
        <li class="order-list-item flex-between" v-for="item in 5">
          <div class="product-img-box">
            <img src="https://cdn.cnbj0.fds.api.mi-img.com/b2c-shopapi-pms/pms_1617014229.6133749.jpg?thumb=1&w=80&h=80" alt="">
          </div>
          <div class="product-name-box flex-wrap">
            {{'小米11青春版'}} {{' 8GB+32GB 荔枝青 111111111111111111111111'}}
          </div>
          <div class="product-price-box">
            {{'2'}}x{{'1999'}}
          </div>
        </li>
      </ul> 
    </div>
    <div class="service-list-container">
      <ul class="service-list">
        <li class="service-list-item flex-between" v-for="item in 3">
          <div class="item-title">运费</div>
          <div class="item-detail">包邮</div>
        </li>
      </ul>
    </div>
    <div class="sum-price-container">
      <div class="sum-item sum-price">
        <span class="price-title">商品价格：</span>
        <span class="price-number">4097.00</span>
      </div>
      <div class="sum-item sum-express">
        <span class="price-title">配送费用：</span>
        <span class="price-number">0.00</span>
      </div>
    </div>
    <footer class="check-order-footer">
      <div class="footer-address">
        配送至 广东 广州市 均禾街道 大朗总站（公交站）
      </div>
      <div class="footer-btn-box flex-start">
        <div class="footer-total">
          共{{'5'}}件 合计：<span class="total-price">{{'4097.00'}}</span>
        </div>
        <div class="footer-btn flex-column" @click="submitOrder()">去付款</div>
      </div>
    </footer>
    <van-popup position="left" v-model:show="isShowAddressChoice" :style="{ width: '100%',height: '100%'}">
      <address-choice @closeAddressChoice="handleCloseAddressChoice" @selectOrderAddress='getAddressFromChild'></address-choice>
    </van-popup>
    
  </div>
</template>

<script>
import AddressHeader from '@/components/common/AddressHeader'
import  AddressChoice  from './components/AddressChoice'
import { reactive,toRefs,computed } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
export default {
  components: {
    AddressHeader,
    AddressChoice
  },
  setup(){
    const state = reactive({
      isShowTips: true,//是否显示提示
      isShowAddressChoice: false,//是否显示选择地址框
      address: '',//收货地址
    })
    const router  = useRouter()
    const store = useStore()
    const closeTips = () => {
      state.isShowTips = false
    }
    const showAddressChoice = () => {
      state.isShowAddressChoice = true
    }
    const submitOrder = () => {
      console.log(store.getters.buyItems)
    }
    const userInfo = computed(()=>{
      if(store.getters.userInfo){
        return store.getters.userInfo
      }
    })
    //关闭地址选择框
    const handleCloseAddressChoice = () => {
      state.isShowAddressChoice = false;
    }
    //从子组件获取选择的地址
    const getAddressFromChild = (address) => {
      state.address = address
    }
    return {
      ...toRefs(state),
      closeTips,
      showAddressChoice,
      submitOrder,
      userInfo,
      handleCloseAddressChoice,
      getAddressFromChild
    }
  }
}
</script>

<style lang="scss" scoped>
.check-order-page{
  background-color: #f5f5f5;
  text-align: left;
  .header-tips{
    background-color: rgb(251,247,231);
    color: #c14d00;
    .tips-left{
      width: 42px;
      height: 58px;
      line-height: 58px;
      .icon-alert{
        font-size: 24px;
      }
    }
    .swipe-tips{
      height: 58px;
      width: 300px;
      background-color: rgb(251,247,231);
      text-align: left;
      font-size: 12px;
      .swipe-item-content{
        height: 58px;
        width: 300px;
        color: #c14d00;
      }
    }
    .tips-close{
      width: 32px;
      height: 58px;
      line-height: 58px;
      .icon-close{
        font-size: 24px;
      }
    }
    
  }
  .address-choice{
    background-color: #fff;
    .address-choice-left{
      width: 300px;
      margin-left: 20px;
      .user-info{
        font-weight: 700;
        font-size: 16px;
      }
      .user-address{
        font-size: 13px;
        font-weight: 400;
      }
    }
    .address-choice-right{
      width: 36px;
      height: 75px;
      .icon-arrowright{
        font-size: 30px;
        font-weight: 400;
        color: #999;
      }
    }
  }
  .order-list-container{
    padding: 0 20px;
    background-color: #fff;
    .order-list-item{
      border-bottom: 1px solid #eee;
    }
    .product-img-box{
      height: 58px;
      width: 58px;
      img{
        max-width: 54px;
        max-height: 54px;
      }
    }
    .product-name-box{
      width: 220px;
      font-size: 12px;
      
    }
    .product-price-box{
      font-size: 10px;
      font-weight: 600;


    }
  }
  .service-list-container{
    padding: 0 20px;
    margin-top: 16px;
    background-color: #fff;
    .service-list-item{
      height: 50px;
      line-height: 50px;
      text-align: center;
      border-bottom: 1px solid #eee;
      .item-title{
        font-weight: 700;

      }
      .item-detail{
        color: #999;
      }
    }
  }
  .sum-price-container{
    padding: 20px;
    background-color: #fff;
    margin-top: 12px;
    margin-bottom: 70px;
    .sum-item{
      .price-title{
        font-weight: 700;
        font-size: 12px;
      }
      .price-number{
        font-size: 12px;
      }
    }
    .sum-express{
      padding-top: 10px;
    }
  }
  .check-order-footer{
    width: 100%;
    position: fixed;
    z-index: 9;
    bottom: 0px;
    .footer-address{
      padding: 0 10px;
      height: 30px;
      font-size: 12px;
      background-color: rgb(251,247,231);
      text-align: left;
      line-height: 30px;
      color: #daba96;
    }
    .footer-btn-box{
      height: 50px;
      background-color: #fff;
      .footer-total{
        height: 50px;
        width: 50%;
        color: #ff6700;
        font-size: 16px;
        line-height: 50px;
        text-align: center;
        .total-price{
          font-weight: 700;
        }
      }
      .footer-btn{
        width: 50%;
        height: 50px;
        background-color: #ff6700;
        color: #fff;
        font-size: 18px;

      }
    }
  }

}

</style>