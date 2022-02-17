<template>
  <div class="search-list-page">
    <div class="search-header flex-between">
      <div class="back-btn" @click="goBack">
        <i class="iconfont icon-arrow-left"></i>
      </div>
      <input
        type="text"
        placeholder="搜索商品名称"
        v-model="searchKey"
        @keyup.enter="searchProducts(searchKey)"
      />
      <div class="search-btn" @click="searchProducts(searchKey)">
        <i class="iconfont icon-search"></i>
      </div>
    </div>
    <div class="search-btns flex-between">
      <div class="btn-item btn-all">
        <div
          class="btn-comprehensive"
          v-show="subActiveIndex != 2"
          @click="showSelectSub"
          :class="{'btn-first-active': subActiveIndex==1}"
        >
          综合
          <i class="iconfont icon-arrowdownb"></i>
        </div>
        <div
          class="btn-new"
          v-show="subActiveIndex == 2"
          @click="showSelectSub"
          :class="{'btn-first-active': subActiveIndex==2}"
        >
          新品
          <i class="iconfont icon-arrowdownb"></i>
        </div>
        <div class="btn-all-sub" v-show="isShowSelectSub">
          <div
            class="btn-sub-comprehensive"
            :class="{'btn-sub-active': subActiveIndex==1}"
            @click="selectFirst(1)"
          >综合排序</div>
          <hr class="sub-seprate" />
          <div
            class="btn-sub-new"
            :class="{'btn-sub-active':subActiveIndex==2}"
            @click="selectFirst(2)"
          >新品优先</div>
        </div>
      </div>
      <div
        class="btn-item btn-sales"
        @click="sortBySoldCount"
        :class="{'btn-first-active':subActiveIndex==3}"
      >销量</div>
      <div
        class="btn-item btn-price flex-start"
        @click="sortByPrice()"
        :class="{'price-up-active': subActiveIndex==4,'price-down-active': subActiveIndex==5}"
      >
        <div class="price-text">价格</div>
        <div class="price-icon flex-column">
          <i class="iconfont icon-arrowupb"></i>
          <i class="iconfont icon-arrowdownb"></i>
        </div>
      </div>
      <div class="btn-item btn-filter" style="display: block" @click="showPopRight">筛选</div>
    </div>
    <!-- 按钮下方遮罩层 -->
    <div class="btn-sub-overlay" v-show="isShowSelectSub"></div>
    <!-- 搜索结果列表 -->
    <div class="search-list-container">
      <ul class="search-result-list">
        <li class="search-result-item" v-for="item in products" :key="item.id">
          <router-link :to="'/product/'+item.id" class="flex-between">
            <div class="item-left product-img flex-center">
              <img :src="item.image_url" alt />
            </div>
            <div class="item-right">
              <p class="product-name">{{item.zh_name}}</p>
              <p class="product-description">{{item.description}}</p>
              <p class="product-price">￥{{item.price-item.discount}}</p>
              <p class="comment-info">{{3398}}条评价 99.8%满意</p>
            </div>
          </router-link>
        </li>
      </ul>
    </div>
    <!-- 右侧筛选弹窗 -->
    <van-popup v-model:show="isShowPopRight" position="right" :style="{width:'90%',height: '100%'}">
      <div class="right-btns">
        <div class="btns-top">
          <div class="btns-item">
            <div class="btn-title">服务</div>
            <ul class="btn-list flex-between">
              <li class="btn-item">
                <a href="javascript:" :class="{'btn-active': filters.indexOf(0)>-1}" @click="addToFilter(0)">促销</a>
              </li>
              <li class="btn-item">
                <a href="javascript:" :class="{'btn-active': filters.indexOf(1)>-1}" @click="addToFilter(1)">分期</a>
              </li>
              <li class="btn-item">
                <a href="javascript:" :class="{'btn-active': filters.indexOf(2)>-1}"  @click="addToFilter(2)">仅看有货</a>
              </li>
            </ul>
          </div>
          <div class="btns-item">
            <div class="btn-title">分类</div>
            <ul class="btn-list flex-between">
              <li class="btn-item">
                <a href="javascript:" :class="{'btn-active': filters.indexOf(3)>-1}"  @click="addToFilter(3)">小米手机</a>
              </li>
              <li class="btn-item">
                <a href="javascript:" :class="{'btn-active': filters.indexOf(4)>-1}"  @click="addToFilter(4)">红米手机</a>
              </li>
              <li class="btn-item">
                <a href="javascript:" :class="{'btn-active': filters.indexOf(5)>-1}"  @click="addToFilter(5)">黑鲨手机</a>
              </li>
            </ul>
          </div>
        </div>

        <div class="btns-footer flex-start">
          <a href="javascript:" class="btn-reset" @click="reset">重置</a>
          <a href="javascript:" class="btn-submit" @click="filter">确定</a>
        </div>
      </div>
    </van-popup>
  </div>
</template>
<script>
import { reactive, toRefs, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import FetchAPI from "@/utils/fetchApi";
import { Toast } from "vant";
import { fileURLToPath } from 'url';
export default {
  setup() {
    const state = reactive({
      isShowSelectSub: false, //是否显示综合下拉按钮
      isShowNewProduct: false, //是否显示新品
      isShowComprehensive: true, //是否显示综合商品
      searchKey: "", //搜索关键词
      subActiveIndex: 1,
      products: [], //搜索结果商品
      defaultProducts: [], //默认商品
      isShowPopRight: false, //是否显示右侧筛选弹窗
      isPriceUp: true, //价格是否顺序排序
      filters: [],//筛选条件
    });
    const router = useRouter();
    const route = useRoute();
    onMounted(() => {
      searchProducts(route.query.key);
    });

    //显示综合下拉按钮
    const showSelectSub = () => {
      state.isShowSelectSub = true;
    };
    //选择综合或新品排序
    const selectFirst = index => {
      state.isShowSelectSub = false;
      state.subActiveIndex = index;
      //数组排序
      if (index == 1) {
        state.products = state.defaultProducts;
      } else if (index == 2) {
        state.products.sort((item1, item2) => {
          return new Date(item2.created_at) - new Date(item1.created_at);
        });
      }
    };
    //销量排序
    const sortBySoldCount = () => {
      state.isShowSelectSub = false;
      state.subActiveIndex = 3;
      state.products.sort((a, b) => {
        return b.sold_count - a.sold_count;
      });
    };
    //按价格排序
    const sortByPrice = () => {
      state.isShowSelectSub = false;

      //正序排序
      if (state.isPriceUp) {
        state.products.sort((a, b) => {
          return a.price - b.price;
        });
        state.isPriceUp = !state.isPriceUp;
        state.subActiveIndex = 4;
      }
      //逆序排序
      else {
        state.products.sort((a, b) => {
          return b.price - a.price;
        });
        state.isPriceUp = !state.isPriceUp;
        state.subActiveIndex = 5;
      }
    };
    //显示右侧筛选弹窗
    const showPopRight = () => {
      state.isShowPopRight = true;
    };
    //搜索产品
    const searchProducts = key => {
      if (key == "") {
        Toast.fail("请输入搜索关键字");
        return;
      }
      Toast.loading("正在加载..");
      FetchAPI.searchByKey(key).then(res => {
        state.defaultProducts = res.data.concat();
        state.products = res.data;
        if (res.status == 200) {
          Toast.clear();
        }
      });
    };
    //返回上一页
    const goBack = () => {
      router.go(-1);
    };
    //添加筛选条件
    const addToFilter = (index) => {
      //如果该项不在筛选数组中则push 已经在则删除
      if(state.filters.indexOf(index)==-1){
        state.filters.push(index)
      }else{
        state.filters.splice(state.filters.indexOf(index),1)
      }
      
    }
    //重置
    const reset = () => {
      state.filters = []
    }
    //筛选
    const filter = () => {
      state.isShowPopRight = false;
    }
    return {
      ...toRefs(state),
      showSelectSub,
      selectFirst,
      goBack,
      sortBySoldCount,
      sortByPrice,
      showPopRight,
      searchProducts,
      addToFilter,
      reset,
      filter
    };
  }
};
</script>
<style lang="scss" scoped>
.search-list-page {
  text-align: left;
}
.search-header {
  height: 40px;
  background-color: #f5f5f5;
  .back-btn {
    margin-left: 16px;
    .icon-arrow-left {
      font-size: 24px;
      color: #999;
      font-weight: 600;
    }
  }
  .search-btn {
    margin-right: 16px;
    .icon-search {
      font-size: 24px;
      font-weight: 600;
      color: #999;
    }
  }
  input[type="text"] {
    background-color: #fff;
    border: none;
    width: 248px;
    height: 30px;
    padding-left: 16px;
    color: #666;
    font-size: 16px;
  }
}
.search-btns {
  height: 46px;
  line-height: 46px;
  text-align: center;
  background-color: #f5f5f5;
  padding: 0 16px;
  .btn-comprehensive,
  .btn-new {
    color: #333;
    i.icon-arrowdownb {
      color: #666;
      font-size: 12px;
    }
  }
  .btn-price {
    .price-text {
    }
    .price-icon {
      height: 28px;
      position: relative;
      .icon-arrowdownb {
        height: 6px;
        font-size: 12px;
        &::before {
          position: absolute;
          top: -3px;
        }
      }
      .icon-arrowupb {
        height: 6px;
        font-size: 12px;
        &::before {
          position: absolute;
          top: -12px;
        }
      }
    }
  }
  .price-up-active {
    color: #ff6700;
    i.icon-arrowdownb {
      color: #666;
    }
  }
  .price-down-active {
    color: #ff6700;
    .icon-arrowupb {
      color: #666;
    }
  }
  .btn-first-active {
    color: #ff6700;
    i.icon-arrowdownb {
      color: #ff6700;
    }
  }
}
.btn-all-sub {
  position: absolute;
  z-index: 99;
  top: 90px;
  width: 375px;
  background-color: #fff;
  text-align: left;
  .btn-sub-comprehensive {
  }
  .btn-sub-active {
    color: #ff6700;
  }
}
.btn-sub-overlay {
  width: 375px;
  height: 999px;
  background-color: rgba(0, 0, 0, 0.2);
  position: fixed;
  top: 183px;
  left: 0px;
}
.search-list-container {
  text-align: left;
  .search-result-list {
    .search-result-item {
      width: 375px;
      height: 162px;
      padding-right: 16px;
      box-sizing: border-box;
      border-bottom: 1px solid #bbb;
      .item-left {
        width: 140px;
        height: 140px;
        img {
          max-width: 130px;
          max-height: 130px;
        }
      }
      .item-right {
        width: 212px;
        .product-name {
          font-size: 16px;
          color: #333;
          line-height: 20px;
        }
        .product-description {
          font-size: 12px;
          color: #666;
          line-height: 16px;
          height: 32px;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .product-price {
          color: #ff6700;
          font-size: 16px;
          line-height: 30px;
        }
        .comment-info {
          font-size: 12px;
          color: #666;
        }
      }
    }
  }
}
.right-btns {
  background-color: #f5f5f5;
  .btns-top {
    padding: 16px;
    background-color: #fff;
    .btn-title {
      font-size: 14px;
      color: #999;
      line-height: 50px;
    }
    .btn-list {
      .btn-item {
        a {
          display: block;
          color: #666;
          background-color: #f5f5f5;
          width: 90px;
          height: 30px;
          line-height: 30px;
          text-align: center;
          font-size: 12px;
          border-radius: 3px;
        }
        a.btn-active{
          color: #ff6700;
          background-color: #fde0d5;
        }
      }
    }
  }
  .btns-footer {
    position: fixed;
    bottom: 0px;
    z-index: 9;
    .btn-reset,
    .btn-submit {
      display: block;
      width: 168.75px;
      height: 50px;
      line-height: 50px;
      text-align: center;
    }
    .btn-reset {
      color: #666;
      background-color: #f5f5f5;
    }
    .btn-submit {
      color: #fff;
      background-color: #ff6700;
    }
  }
}
</style>