<template>
  <!-- 商品详情页 -->
  <div class="product-page">
    <!-- 顶部导航栏 -->
    <header class="header-fixed" v-show="isFixedHeader">
      <i class="iconfont icon-arrow-left" @click="goBack"></i>
      <div class="header-nav">
        <span class="btn-product" :class="{'btn-active':currentDivIndex==0}" @click="jumpDiv(0)">商品</span>
        <span class="btn-comment" :class="{'btn-active':currentDivIndex==1}" @click="jumpDiv(1)">评价</span>
        <span class="btn-detail" :class="{'btn-active':currentDivIndex==2}" @click="jumpDiv(2)">详情</span>
        <span
          class="btn-recommend"
          :class="{'btn-active':currentDivIndex==3}"
          @click="jumpDiv(3)"
        >推荐</span>
      </div>
      <i class="iconfont icon-share" @click="shareProduct"></i>
    </header>
    <!-- 默认顶部 -->
    <header class="header-absolute" v-show="isAbsoluteHeader">
      <i class="iconfont icon-arrow-left" @click="goBack"></i>
      <i class="iconfont icon-share" @click="shareProduct"></i>
    </header>
    <!-- 轮播图 -->
    <div class="product-swipe">
      <van-swipe @change="changeIndex" :show-indicators="false">
        <van-swipe-item v-for="item in swipeImages" :key="item.id">
          <img :src="item" alt="img of product" />
        </van-swipe-item>
      </van-swipe>
      <div class="custom-indicator" v-show="total>1">{{ active + 1 }}/{{ total }}</div>
    </div>
    <!-- 商品信息 及操作-->
    <div class="product-info-box">
      <div class="product-info">
        <p class="product-price">
          <span class="product-price-text">{{product.skus?product.skus[skuIndex].price*1:''}}</span>
          <!-- <span class="product-full-price" v-show="product.discount>0">￥{{product.price*1}}</span> -->
        </p>
        <h3 class="product-name">{{product.zh_name}}</h3>
        <p class="product-description">{{product.description}}</p>
      </div>
      <div class="product-action">
        <div class="action-box action-type">
          <div class="action-title">
            <span>已选</span>
          </div>
          <div class="action-content">
            <div class="action-content-left" @click="chooseType">
              <span
                class="product-type"
              >{{product.zh_name}} {{product.skus?product.skus[skuIndex].name.replace(/-/,' '):''}}</span>
              <span class="product-number">x{{buyCount}}</span>
            </div>
            <div class="action-content-right">
              <span>
                <i class="iconfont icon-arrowright"></i>
              </span>
            </div>
          </div>
        </div>
        <div class="action-seprate-line"></div>
        <div class="action-box action-address">
          <div class="action-title">送至</div>
          <div class="action-content" @click="chooseAddress">
            <div class="action-content-left">
              <i class="iconfont icon-locate1e"></i>
              <span>{{'深圳市清湖老村4巷18号110'}}</span>
            </div>
            <div class="action-content-right">
              <span>
                <i class="iconfont icon-arrowright"></i>
              </span>
            </div>
          </div>
        </div>
      </div>
      <van-popup v-model="modalType"></van-popup>
      <div class="product-tag">
        <div class="product-tag-left">
          <span>
            <i class="iconfont icon-success"></i>小米自营
          </span>
          <span>
            <i class="iconfont icon-success"></i>小米发货
          </span>
          <span>
            <i class="iconfont icon-success"></i>7天无理由退货
          </span>
        </div>
        <div class="product-tag-right">
          <span>
            <i class="iconfont icon-arrowright"></i>
          </span>
        </div>
      </div>
    </div>
    <!-- 商品评价 -->
    <div class="product-comment">
      <div class="comment-title flex-between">
        <div class="comment-title-left">
          <p class="title-text">用户评价</p>
        </div>
        <div class="comment-title-right">
          <p class="product-rate">
            好评率{{'97.3%'}}
            <i class="iconfont icon-arrowright"></i>
          </p>
        </div>
      </div>
      <!-- 用户评价 -->
      <div class="comment-content">暂无</div>
    </div>
    <!-- 、、商品详情、参数 -->
    <div class="product-detail-info">
      <div class="detail-info-title .flex-between">
        <h4
          class="title-description"
          @click="showDetailContent('description')"
          :class="{'title-active':isDetailDescription===true}"
        >商品介绍</h4>
        <h4
          class="title-params"
          @click="showDetailContent('params')"
          :class="{'title-active':isDetailParams===true}"
        >商品参数</h4>
      </div>
      <!-- //详情图片 -->
      <transition name="fade-in" mode="out-in">
        <div class="detail-description" v-if="isDetailDescription" key="des">
          <div class="show-fail" v-if="loadProductStatus==2&&product.details.length==0">暂无</div>
          <ul class="img-list" v-else>
            <li class="img-item" v-for="item in product.details" :key="item">
              <van-image width="100vw" :src="item.image_url" lazy-load></van-image>
            </li>
          </ul>
        </div>
        <div class="detail-params" v-else key="par">
          <div class="show-fail" v-if="loadProductStatus==2&&product.parameters.length==0">暂无</div>

          <ul class="img-list" v-else>
            <li class="img-item" v-for="item in product.parameters" :key="item">
              <van-image width="100vw" :src="item.image_url" lazy-load></van-image>
            </li>
          </ul>
        </div>
      </transition>
    </div>
    <!-- 推荐 -->
    <div class="product-recommend">
      <h3 class="recommend-title">商品推荐</h3>
      <recommend-list :products="recommendProducts"></recommend-list>
    </div>
    <!-- 、填充物 -->
    <div class="fill-bottom"></div>
    <!-- 购买按钮栏 -->
    <div class="footer-btns">
      <div class="footer-left">
        <router-link to="/home">
          <i class="iconfont icon-home"></i>
          <span>首页</span>
        </router-link>
        <router-link to="/home">
          <i class="iconfont icon-service-fill"></i>
          <span>客服</span>
        </router-link>
        <router-link to="/cart" class="btn-cart">
          <i class="iconfont icon-cart"></i>
          <span>购物车</span>
          <span class="cart-item-amount">{{totalAmount}}</span>
        </router-link>
      </div>
      <div class="footer-right">
        <button class="btn-cart" @click="chooseType">加入购物车</button>
        <button class="btn-buy">立即购买</button>
      </div>
    </div>
    <back-top></back-top>
    <van-popup v-model:show="isShowSharePop" position="bottom" closeable class="van-popup-share">
      <div class="pop-share">
        <h4 class="share-title">分享</h4>
        <div class="share-content">
          <a href="javascript:">
            <i class="iconfont icon-weibo"></i>
          </a>
        </div>
      </div>
    </van-popup>
    <van-popup
      v-model:show="isShowTypePop"
      position="bottom"
      class="van-popup-type"
      :style="{height: '80%'}"
    >
      <div class="type-content scroll-hidden">
        <div class="content-header">
          <div class="close-box" @click="closePopByKey('type')">
            <i class="iconfont icon-close"></i>
          </div>
        </div>
        <div class="product-info-box flex-start">
          <div class="info-left">
            <img :src="product.skus[skuIndex].imgs[0]" alt="商品图片" />
          </div>
          <div class="info-right flex-column">
            <p class="product-price">￥{{product.skus[skuIndex].price}}</p>
            <p
              class="product-name"
            >{{product.zh_name}} {{product.skus[skuIndex].name.replace(/-/,' ')}}</p>
          </div>
        </div>
        <div class="product-type">
          <div class="type-item" v-for="(values,pKey) in product.productinfos.product_info">
            <div class="type-key">{{pKey}}</div>
            <ul class="type-value-list">
              <li class="type-value-item" v-for="(item,key) in values.split('-')">
                <a
                  href="javascript:"
                  :class="{'type-value-active': item==selectedType[pKey]}"
                  @click="selectValue(item,pKey)"
                >{{item}}</a>
              </li>
            </ul>
          </div>
        </div>
        <div class="buy-count-box flex-between">
          <div class="count-title">购买数量</div>
          <div class="count-box">
            <a href="javascript:void(0)" @click="decCount">
              <i class="iconfont icon-jianhao"></i>
            </a>
            <input type="number" v-model="buyCount" disabled />
            <a href="javascript:void(0)" @click="incCount">
              <i class="iconfont icon-jiahao"></i>
            </a>
          </div>
        </div>
        <div class="footer-btn-box">
          <button class="btn-add" @click="addToCart">加入购物车</button>
          <button class="btn-buy">立即购买</button>
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script>
import FetchAPI from "@/utils/fetchApi";
import { reactive, toRefs, onMounted, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";
import RecommendList from "./components/RecommendList.vue";
import BackTop from "@/components/common/BackTop";
import { Toast, Dialog } from "vant";
export default {
  created(){
    this.$store.dispatch('getCartItems')
  },
  computed: {
    totalAmount(){
      return this.$store.getters.cartTotalAmount
    }
  },
  setup() {
    const router = useRouter();
    const store = useStore();
    const route = useRoute();
    const state = reactive({
      product: {}, //商品信息
      loadProductStatus: 0,
      details: [], //详情图片
      active: [], //当前轮播图下标
      total: 0, //轮播图总数
      isAbsoluteHeader: true, //显示绝对定位头
      isFixedHeader: false, //
      modalType: false,
      isDetailDescription: false,
      isDetailParams: true,
      recommendProducts: [], //推荐列表
      //顶部按钮交互数据
      currentDivIndex: 0, //当前下标
      isShowSharePop: false, //显示分享弹窗
      isShowTypePop: false, //显示选择类型弹窗
      buyCount: 1, //购买数量

      skuIndex: 0, //选中sku下标 默认0
      selectedType: [], //选中的商品型号
      isAddingCart: false //添加购物车flag 防止重复添加
      
    });
    onMounted(() => {
      loadProduct();
      atScroll();
      Promise.resolve().then(() => {
        loadRecommendList();
      });
    });

    //加载商品
    const loadProduct = () => {
      //获取商品信息
      state.loadProductStatus = 1;
      const id = route.params.id;

      FetchAPI.getProduct(id)
        .then(res => {
          state.loadProductStatus = 2;
          state.product = res.data.product;
        })
        .then(() => {
          //初始化选中商品型号
          checkType();
        })
        .catch(() => {
          state.loadProductStatus = 3;
          Toast.fail("加载失败，请重试");
        });
    };
    const loadRecommendList = () => {
      FetchAPI.getAllTopCategories().then(res => {
        if (state.product.hasOwnProperty("name")) {
          state.recommendProducts =
            res.data[state.product.top_category_id - 1].products;
        }
      });
    };
    const atScroll = () => {
      let offsetTopInfo = getElOffsetTop(".product-swipe");
      let offsetTopComment = getElOffsetTop(".product-comment");
      let offsetTopDetail = getElOffsetTop(".product-detail-info");
      let offsetTopRecommend = getElOffsetTop(".product-recommend");
      const tops = [
        offsetTopInfo,
        offsetTopComment,
        offsetTopDetail,
        offsetTopRecommend
      ];

      window.addEventListener("scroll", () => {
        let bodyTop =
          document.body.scrollTop || document.documentElement.scrollTop;
        if (bodyTop > 20) {
          //隐藏absolute header 显示fixed header
          state.isAbsoluteHeader = false;
          state.isFixedHeader = true;
        }
        if (bodyTop > 0 && bodyTop < 20) {
          //显示absolute header 隐藏fixed header
          state.isAbsoluteHeader = true;
          state.isFixedHeader = false;
        }
        if (bodyTop >= tops[0] && bodyTop < tops[1]) {
          state.currentDivIndex = 0;
        } else if (bodyTop >= tops[1] && bodyTop < tops[2]) {
          state.currentDivIndex = 1;
        } else if (bodyTop >= tops[2] && bodyTop < tops[3]) {
          state.currentDivIndex = 2;
        } else if (bodyTop >= tops[3]) {
          //console.log('top3-'+tops[3])
          state.currentDivIndex = 3;
        }
      });
    };
    //点击跳转对应 div
    const jumpDiv = index => {
      let offsetTopInfo = getElOffsetTop(".product-swipe");
      let offsetTopComment = getElOffsetTop(".product-comment");
      let offsetTopDetail = getElOffsetTop(".product-detail-info");
      let offsetTopRecommend = getElOffsetTop(".product-recommend");
      const tops = [
        offsetTopInfo,
        offsetTopComment,
        offsetTopDetail,
        offsetTopRecommend
      ];

      window.scrollTo(0, tops[index]);
    };
    //获取节点offsetTop 顶部偏移量
    const getElOffsetTop = className => {
      return document.querySelector(className).offsetTop;
    };
    //显示详情或参数
    const showDetailContent = string => {
      console.log(string);
      switch (string) {
        case "description":
          state.isDetailDescription = true;
          state.isDetailParams = false;
          break;
        case "params":
          state.isDetailDescription = false;
          state.isDetailParams = true;
          break;
      }
    };
    const swipeImages = computed(() => {
      let imgs = [];
      //遍历获取sku里的图片
      // if (Object.keys(state.product).length > 0) {
      //   state.product.skus.forEach(item => {
      //     //console.log(item.imgs)
      //     imgs = imgs.concat(item.imgs);
      //   });
      // }
      //console.log(imgs)
      if (Object.keys(state.product).length > 0) {
        imgs = state.product.skus[0].imgs;
        state.total = imgs.length;
      }

      return imgs;
    });
    //轮播图change 钩子事件 修改下标
    const changeIndex = index => {
      state.active = index;
    };
    //选择商品类型
    const chooseType = () => {
      state.isShowTypePop = true;
    };
    //选择收货地址
    const chooseAddress = () => {
      //如果用户未登录则跳转到登录页
      if (!localStorage.getItem("_user_token")) {
        router.push("/user/login");
      } else {
        state.isShowAddressPop = true;
      }
    };
    //立即购买
    const buyNow = () => {
      Toast.fail("还没有登录");
    };
    //返回上一页
    const goBack = () => {
      router.go(-1);
    };

    //分享商品
    const shareProduct = () => {
      state.isShowSharePop = true;
    };
    //关闭弹窗
    const closePopByKey = key => {
      switch (key) {
        case "type":
          state.isShowTypePop = false;
          return;
      }
    };
    //选择商品类型 item值  pKey父级分类名称 如颜色、机型等
    const selectValue = (item, pKey) => {
      state.selectedType[pKey] = item;

      // 修改选中的sku下标

      let len = state.product.skus.length;
      for (let i = 0; i < len; i++) {
        if (
          state.product.skus[i].name ==
          Object.values(state.selectedType).join("-")
        ) {
          state.skuIndex = i;
        }
      }
      //checkType()
    };
    //设置选中类型 selectedType
    const checkType = () => {
      let values = state.product.skus[state.skuIndex].name.split("-");
      let keys = Object.keys(state.product.productinfos.product_info);

      for (let i = 0; i < keys.length; i++) {
        // 如果selectedType键值未定义
        if (!state.selectedType.hasOwnProperty(keys[i])) {
          Object.defineProperty(state.selectedType, keys[i], {
            value: values[i],
            writable: true,
            enumerable: true
          });
        } else {
          state.selectedType.keys[i] = values[i];
        }
      }
    };
    //计步器增数
    const incCount = () => {
      if (state.buyCount < state.product.skus[state.skuIndex].limit) {
        state.buyCount++;
      } else {
        Toast.fail("购买数量不能超过限购数");
      }
    };
    //计步器减数
    const decCount = () => {
      if (state.buyCount > 1) {
        state.buyCount--;
      } else {
        Toast.fail("购买数量不能小于1");
      }
    };

    //添加到购物车
    const addToCart = () => {
      //如果未登录则提醒用户登录
      if (!localStorage.getItem("_user_token")) {
        router.push("/user/login");
      } else {
        if (!state.isAddingCart) {
          state.isAddingCart = true;
          state.isShowTypePop = false;
          //如果用户已登录则添加到购物车
          let data = {
            sku_id: state.product.skus[state.skuIndex].id,
            amount: state.buyCount
          };
          FetchAPI.addToCart(data)
            .then(res => {
              if (res.status == 200) {
                FetchAPI.getCartItems()
                .then((res)=>{
                  localStorage.setItem('_full_cart',JSON.stringify(res.data))
                  store.dispatch('getCartItems')
                  Toast.clear()
                  state.isAddingCart = false
                })
              }
            })
            .catch(e => {
              state.isAddingCart = false;
              Toast.fail(e.data.msg);
            });
            Toast.loading("正在添加");
          
        }
      }
    };

    return {
      ...toRefs(state),
      changeIndex,
      swipeImages,
      jumpDiv,
      showDetailContent,
      addToCart,
      buyNow,
      shareProduct,
      goBack,
      chooseType,
      chooseAddress,
      closePopByKey,
      incCount,
      decCount,
      selectValue
    };
  },
  components: {
    RecommendList,
    BackTop
  }
  // data(){
  //   return {
  //     product: {},
  //     loadProductStatus: 0,
  //     details: [],//详情图片
  //   }
  // },
  // mounted(){
  //   this.loadProductStatus = 1
  //   FetchAPI.getProduct(this.$route.params.id)
  //   .then((res)=>{
  //     this.loadProductStatus = 2
  //     this.product = res.data.product
  //     this.details = res.data.product.details
  //   })
  //   .catch(()=>{
  //     this.loadProductStatus =3
  //   })

  // }
};
</script>

<style lang="scss" scoped>
.product-page {
  .show-fail {
    height: 200px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  text-align: left;
  .header-fixed {
    width: 375px;
    height: 50px;
    position: fixed;
    top: 0px;
    left: 0px;
    z-index: 19;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: rgb(255, 255, 255);
    transition: all 0.4s ease;
    .iconfont {
      width: 30px;
      height: 30px;
      font-size: 20px;
      font-weight: 700;
      color: #333;
      display: block;
      //background-color: rgba(0, 0, 0, 0.3);
      //border-radius: 50%;
      position: relative;
      &::before {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translateX(-50%) translateY(-50%);
      }
    }
    .icon-arrow-left {
      font-size: 24px;
      left: 16px;
    }
    .icon-share {
      right: 16px;
    }
    .header-nav {
      width: 160px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      span {
        position: relative;
        padding-bottom: 5px;
      }
      span.btn-active {
        color: #ff6700;

        &:after {
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          -webkit-transform: translateX(-50%);
          content: "";
          width: 15px;
          height: 3px;
          bottom: 0px;
          background-color: #ff6700;
          border-radius: 2px;
        }
      }
    }
  }
  .header-absolute {
    width: 375px;
    height: 50px;
    position: absolute;
    top: 0px;
    left: 0px;
    z-index: 9;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .iconfont {
      width: 30px;
      height: 30px;
      font-size: 20px;
      color: #f5f5f5;
      display: block;
      background-color: rgba(0, 0, 0, 0.3);
      border-radius: 50%;
      position: relative;
      &::before {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translateX(-50%) translateY(-50%);
      }
    }
    .icon-arrow-left {
      font-size: 24px;
      left: 16px;
    }
    .icon-share {
      right: 16px;
    }
  }
  .product-swipe {
    position: relative;
    .van-swipe {
      width: 375px;
      height: 410px;
      .van-swipe-item {
        width: 375px;
        height: 410px;
        overflow: hidden;
        display: flex;
        align-items: center;

        img {
          width: 375px;
        }
      }
    }
    .custom-indicator {
      position: absolute;
      right: 15px;
      bottom: 15px;
      width: 55px;
      height: 24px;
      line-height: 24px;
      text-align: center;
      border-radius: 12px;
      font-size: 14px;
      color: #fff;
      background: rgba(0, 0, 0, 0.3);
    }
  }
  .product-info-box {
    overflow: hidden;
    padding: 0 16px;
    div.product-info {
      p.product-price {
        .product-price-text {
          position: relative;
          &:before {
            position: absolute;
            content: "￥";
            font-size: 10px;
            width: 16px;
            left: 0px;
            top: 0px;
          }
          font-size: 20px;
          color: #ff6700;
          font-weight: 700;
          padding-left: 12px;
        }
        .product-full-price {
          font-size: 12px;
          color: #999;
          text-decoration: line-through;
          padding-left: 5px;
        }
      }
      h3.product-name {
        padding: 10px 0;
      }
      p.product-description {
        text-indent: 28px;
        font-size: 12px;
        overflow: hidden;
        text-overflow: ellipsis;
        padding-bottom: 10px;
      }
    }
    div.product-action {
      overflow: hidden;
      .action-box {
        padding: 10px 0;
        display: flex;
        align-items: center;
        .action-title {
          width: 44px;
        }
        .action-content {
          width: 303px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-bottom: 1px solid #ddd;
          i.icon-arrowright {
            font-size: 14px;
            color: #999;
          }
          i.iconfont {
            font-size: 14px;
          }
        }
      }
    }
    div.product-tag {
      display: flex;
      justify-content: space-between;
      align-items: center;
      background-color: #f5f5f5;
      color: #999;
      padding: 5px 0;
      i.iconfont {
        font-size: 14px;
      }
      i.icon-success {
        font-size: 16px;
        font-weight: normal;
      }
      .product-tag-left {
        span {
          padding-right: 12px;
        }
      }
    }
  }
  .product-comment {
    overflow: hidden;
    padding: 16px;
    .comment-title {
      display: flex;
      display: -webkit-flex;
      justify-content: space-between;
      align-items: center;
      .comment-title-left {
        font-size: 14px;
        font-weight: 700;
        height: 20px;
        line-height: 20px;
      }
      .comment-title-right {
        font-size: 12px;
        color: #999;
        text-align: center;
        p.product-rate {
          display: flex;
          align-items: center;
        }
      }
    }
    .comment-content {
      height: 200px;
      background-color: #ccc;
      display: felx;
      display: -webkit-flex;
      justify-content: center;
      align-items: center;
    }
  }
  .product-detail-info {
    div.detail-info-title {
      display: flex;
      justify-content: space-between;
      padding: 16px 0;
      h4 {
        width: 50%;
        position: relative;
        text-align: center;
        padding-bottom: 6px;
        font-size: 12px;
        font-weight: normal;
      }
      h4.title-active {
        color: #ff6700;
        &::after {
          content: "";
          width: 20px;
          height: 2px;
          position: absolute;
          bottom: 0px;
          left: 50%;
          transform: translateX(-50%);
          -webkit-transform: translateX(-50%);
          background-color: #ff6700;
        }
      }
    }
  }
  .product-recommend {
    .recommend-title {
      font-size: 18px;
      font-weight: normal;
      margin-left: 16px;
    }
  }
  .footer-btns {
    height: 50px;
    position: fixed;
    z-index: 19;
    bottom: 0;
    background-color: #fff;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .footer-left {
      width: 144px;
      display: flex;

      a {
        display: flex;
        -webkit-box-flex: 1;
        flex: 1;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        i {
          font-size: 24px;
          color: #777;
        }
        span {
          color: #8a8a8a;
          font-size: 12px;
        }
      }
      a.btn-cart {
        position: relative;
        .cart-item-amount {
          position: absolute;
          width: 16px;
          height: 16px;
          line-height: 16px;
          text-align: center;
          top: -5px;
          right: 0px;
          font-size: 10px;
          border-radius: 50%;
          background-color: #ff6700;
          color: #fff;
          overflow: hidden;
        }
      }
    }
    .footer-right {
      display: flex;
      width: 213px;
      margin-right: 18px;
      button {
        border: none;
        outline: none;
        text-align: center;
        height: 40px;
        line-height: 40px;
        text-align: center;
        color: #fff;
      }
      .btn-cart {
        width: 106.5px;
        border-radius: 50px 0 0 50px;
        background-image: linear-gradient(90deg, yellow, #ff9d00);
      }
      .btn-buy {
        width: 106.5px;
        border-radius: 0 50px 50px 0;
        background-image: linear-gradient(90deg, #ff8b23, #ff4100);
      }
    }
  }
  .fade-in-enter-active,
  .fade-in-leave-active {
    transition: all 0.2s ease;
  }
  .fade-in-enter-from,
  .fade-in-leave-to {
    opacity: 0;
  }
  .fill-bottom {
    height: 60px;
  }
  .van-popup-share {
    height: 30%;
    .pop-share {
      height: 250px;
      display: flex;
      flex-direction: column;

      h4.share-title {
        width: 375px;
        height: 20px;
        line-height: 20px;
        text-align: center;
        font-size: 14px;
        font-weight: normal;
        padding-top: 22px;
      }
      div.share-content {
        width: 375px;
        height: 90px;
        display: flex;
        margin-top: 30px;
        justify-content: center;
        align-items: center;
        a {
          display: block;

          i.icon-weibo {
            font-size: 80px;
            color: #f33300;
          }
        }
      }
    }
  }
  .van-popup-type {
    .van-popup__close-icon {
      font-size: 12px;
    }
    .type-content {
      border-radius: 10px;
      padding: 0 15px;
      .content-header {
        height: 20px;
        line-height: 20px;
        display: flex;
        justify-content: flex-end;
        .close-box {
          width: 20px;
          height: 20px;
          // border: 1px solid red;
          border-radius: 50%;
          background-color: #f5f5f5;
          display: flex;
          justify-content: center;
          align-items: center;
          margin: 6px 6px 0 0;
        }
      }
      .product-info-box {
        position: relative;
        padding: 0;
        .info-left {
          display: flex;
          justify-content: center;
          align-items: center;
          background-color: #f5f5f5;
          width: 90px;
          height: 90px;
          img {
            max-height: 60px;
          }
        }
        .info-right {
          width: 200px;
          margin-left: 15px;
          .product-price {
            text-align: left;
            color: #ff6700;
            font-size: 18px;
            font-weight: 900;
            width: 200px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }
          .product-name {
            text-align: left;
            color: #333;
            font-size: 12px;
            width: 200px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            margin-top: 16px;
          }
        }
      }
      .product-type {
        margin-top: 30px;
        .type-item {
          margin-top: 32px;
          .type-key {
            font-size: 14px;
            color: #333;
            font-weight: 600;
          }
          .type-value-list {
            display: flex;
            justify-content: flex-start;
            flex-wrap: wrap;
            align-items: center;
          }
          .type-value-item {
            margin-right: 16px;
            margin-top: 10px;
            a {
              display: block;
              width: 94px;
              height: 30px;
              border-radius: 15px;
              line-height: 30px;
              text-align: center;
              background-color: #f5f5f5;
              border: 2px solid #f5f5f5;
              transition: all 0.4s;
              font-size: 12px;
            }
            a.type-value-active {
              border: 2px solid rgb(255, 142, 160);
              background-color: rgb(255, 242, 239);
              color: #ff6700;
            }
          }
        }
      }
      .buy-count-box {
        margin-top: 30px;
        overflow-y: scroll;
        .count-title {
          font-size: 14px;
          color: #333;
          font-weight: 600;
          height: 40px;
          line-height: 40px;
        }
        .count-box {
          height: 30px;
          line-height: 30px;
          text-align: center;
          a {
            display: inline-block;
            font-size: 24px;
            font-weight: 600;
            color: #333;
            width: 30px;
            height: 30px;
          }
          input {
            background-color: #f5f5f5;
            border: none;
            width: 50px;
            font-size: 18px;
            text-align: center;
          }
        }
      }
      .footer-btn-box {
        width: 345px;
        position: fixed;
        padding: 10px 0;
        bottom: 0px;
        background-color: #fff;
        z-index: 99;
        button {
          width: 50%;
          height: 30px;
        }
        .btn-add {
          border-radius: 15px 0 0 15px;
          background-image: linear-gradient(90deg, #ffcb00, #ff9e00);
        }
        .btn-buy {
          border-radius: 0 15px 15px 0;
          background-image: linear-gradient(90deg, #ff7010, #ff3700);
        }
      }
    }
  }
}
</style>