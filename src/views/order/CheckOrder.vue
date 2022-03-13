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
        <div class="user-address" >
          <div class="address-tips" v-if="address != null">{{address?address.district:'' }} {{ address?address.address:''}}</div>
          <div class="address-tips"   style="color: #ff6700" v-else>请选择收货地址</div>
        </div>
      </div>
      <div class="address-choice-right flex-column">
        <i class="iconfont icon-arrowright" style="color: #ff6700"></i>
      </div>
    </div>
    <div class="order-list-container">
      <ul class="order-list" v-if="Array.isArray(buyItems)&&buyItems.length>0">
        <li class="order-list-item flex-between" v-for="item in buyItems" :key="item.id">
          <div class="product-img-box">
            <img :src="item.product_sku.imgs[0]" alt="">
          </div>
          <div class="product-name-box flex-wrap">
            {{item.product_sku.product.zh_name}} {{item.product_sku.name.replace(/-/,' ')}}
          </div>
          <div class="product-price-box">
            {{item.amount}}x{{item.product_sku.price}}
          </div>
        </li>
      </ul>
      <ul class="order-list" v-else>
        <li class="order-list-item flex-between">
          <div class="product-img-box">
            <img :src="buyItem?buyItem.product_sku.imgs[0]:''" alt="">
          </div>
          <div class="product-name-box flex-wrap">
            {{buyItem?buyItem.name:''}} {{buyItem?buyItem.product_sku.name.replace(/-/,' '):''}}
          </div>
          <div class="product-price-box">
            {{buyItem?buyItem.amount:''}}x{{buyItem?buyItem.product_sku.price:''}}
          </div>
        </li>
      </ul>  
    </div>
    <div class="service-list-container">
      <ul class="service-list">
        <li class="service-list-item flex-between">
          <div class="item-title">运费</div>
          <div class="item-detail">包邮</div>
        </li>
        <li class="service-list-item flex-between">
          <div class="item-title">电子普通发票</div>
          <div class="item-detail">个人</div>
        </li>
        <li class="service-list-item flex-between">
          <div class="item-title">优惠券</div>
          <div class="item-detail">无可用</div>
        </li>
      </ul>
    </div>
    <div class="sum-price-container">
      <div class="sum-item sum-price">
        <span class="price-title">商品价格：</span>
        <span class="price-number">{{totalPrice?totalPrice:''}}</span>
      </div>
      <div class="sum-item sum-express">
        <span class="price-title">配送费用：</span>
        <span class="price-number">0.00</span>
      </div>
    </div>
    <footer class="check-order-footer">
      <div class="footer-address" v-if="address">
        配送至 {{address.district }} {{ address.address}}
      </div>
      <div class="footer-btn-box flex-start">
        <div class="footer-total">
          共{{totalAmount?totalAmount:0}}件 合计：<span class="total-price">{{totalPrice}}</span>
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
import { Toast } from 'vant'
import FetchAPI from '@/utils/fetchApi'
import Session from "@/utils/session.js"

export default {
  components: {
    AddressHeader,
    AddressChoice
  },
  setup(){
    const state = reactive({
      isShowTips: false,//是否显示提示
      isShowAddressChoice: false,//是否显示选择地址框
     
    })
    const router  = useRouter()
    const store = useStore()
    const closeTips = () => {
      state.isShowTips = false
    }
    const showAddressChoice = () => {
      state.isShowAddressChoice = true
    }
    //computed购买项目
    const buyItems = computed(()=>{
      if(store.getters.buyItems){
        return store.getters.buyItems
      }else{
        return Session.getStore('_buy_items')
      }
    })
    //商品总价
    const totalPrice = computed(() => {
      let total = 0;
      if(buyItem._value){
        total = buyItem._value.amount * buyItem._value.product_sku.price
        return total
      }
      if(Array.isArray(buyItems._value)&&buyItems._value.length>0){
        buyItems._value.forEach((item)=>{
          total += item.amount*item.product_sku.price
        })
        return total
      }else{
         return total = 0
      }
    })
    //总数量
    const totalAmount = computed(()=>{
     let amount = 0;
     if(buyItem._value){
        amount = buyItem._value.amount
        return amount
     }
     if(Array.isArray(buyItems._value)&&buyItems._value.length>0){
      buyItems._value.forEach((item)=>{
        amount += item.amount
      })
      return amount
     }
     
    }) 
    //从sessionStorage获取收货地址收货地址
	const address = computed(() => {
		return JSON.parse(sessionStorage.getItem('_selected_address'))
	})
	//从sessionStorage 获取单个购买项目
	const buyItem = computed(() => {
		return Session.getStore('_buy_item')
	})
    //提交订单
    const submitOrder = () => {
      if(!address._value){
        state.isShowAddressChoice = true
        return;
      }
	  let arr = []
      const data = {
        address_id: address._value.id,
        items: buyItems._value?buyItems._value : arr.push(buyItem._value)
      }
      Toast.loading('正在创建订单')
      FetchAPI.addOrder(data)
      .then((res)=>{
        if(res.status==200){
          localStorage.removeItem('_full_cart')
          localStorage.removeItem('_buy_items')
		  sessionStorage.removeItem('_buy_item')
          localStorage.setItem(''+res.data[0].no,JSON.stringify({
            created_at: Date.now()
          }))
          Toast.clear()
          //跳转到支付订单页
          router.push('/pay_order/'+res.data[0].no)
        }
      })
    }
    //用户信息 
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
      getAddressFromChild,
      buyItems,
      totalPrice,
      totalAmount,
	    buyItem,
	    address
    }
  }
}
</script>

<style lang="scss" scoped>
.check-order-page{
  background-color: #f5f5f5;
  text-align: left;
  padding-bottom: 12px;
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