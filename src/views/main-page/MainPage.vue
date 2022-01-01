<template>
  <!-- 首页 -->
  <div class="main-container">
    <header class="main-header">
      <router-link to="/home">
        <img src="../../assets/icon/icon-mi.png" alt="mi-logo" class="img-logo" />
      </router-link>

      <router-link to="/search">
        <div class="search-box">
          <i class="iconfont icon-search"></i>
          <span>搜索商品名称</span>
        </div>
      </router-link>

      <router-link to="/user">
        <img src="../../assets/icon/icon-user.png" alt="icon-user" class="img-user" />
      </router-link>
    </header>
    <nav class="main-nav">
      <div class="nav-container">
        <div class="nav-btn-box">
          <a
            href="javascript:"
            class="nav-btn"
            :class="{'nav-btn-active':active=='recommend-products'}"
            @click="showComponent('recommend-products')"
          >推荐</a>
          <a
            href="javascript:"
            class="nav-btn"
            :class="{'nav-btn-active':active=='intelligence-products'}"
            @click="showComponent('intelligence-products')"
          >智能</a>
          <a
            href="javascript:"
            class="nav-btn"
            :class="{'nav-btn-active':active=='tv-products'}"
            @click="showComponent('tv-products')"
          >电视</a>
          <a
            href="javascript:"
            class="nav-btn"
            :class="{'nav-btn-active':active=='house-hold'}"
            @click="showComponent('house-hold')"
          >家电</a>
          <a
            href="javascript:"
            class="nav-btn"
            :class="{'nav-btn-active':active=='note-book'}"
            @click="showComponent('note-book')"
          >笔记本</a>
        </div>
        <div class="dropdown-btn">
          <i class="iconfont icon-arrow-down"></i>
          <!-- <div class="dropdown-container">
            <h3 class="content-title">
              全部
            </h3>
            <div class="dropdown-content">
              <ul class="dropdown-list">
                <li class="dropdown-item">

                </li>
              </ul>
            </div>
          </div>-->
        </div>
      </div>
    </nav>
    <!-- 主页组件 -->

    <transition name="slide-left">
      <!-- <recommend-products v-if="isRecommned" key="recommend"></recommend-products>
      <intelligence-products
        v-else-if="isIntelligence"
        key="intelligence"
        :recommendHouseholds="getedRecommendHouseholds"
      ></intelligence-products>
      <tv-products v-else-if="isTvPage" key="tv" :recommendTvs="getedRcommendTvs"></tv-products>
      <house-hold v-else-if="isHousehold" key="household" :recommendIceBoxs="getedRecommendIceBoxs"></house-hold>
      <note-book v-else key="notebook" :recommendNotebooks="getedRecommendNotebooks"></note-book> -->
      <keep-alive>
      <component :is="active"></component>
      </keep-alive>
      
    </transition>
    <!-- <div v-show="!isLeft">
      <transition-group name="slide-right" mode="out-in">
        <recommend-products v-show="currentIndex==0" key="recommend" :recommendPhones="getedRecommendPhones"></recommend-products>
        <intelligence-products v-show="currentIndex==1" key="intelligence"></intelligence-products>
        <tv-products v-show="currentIndex==2" key="tv"></tv-products>
      </transition-group>
    </div>-->

    <!-- <van-swipe
      :show-indicators="false"
      :touchable="false"
      ref="swipe"
      style="height:300px;width:375px"
    >
      <van-swipe-item>
        <recommend-products></recommend-products>
      </van-swipe-item>
      <van-swipe-item>
        <tv-products></tv-products>
      </van-swipe-item>
      <van-swipe-item>
        <recommend-products></recommend-products>
      </van-swipe-item>
      <van-swipe-item>
        <tv-products></tv-products>
      </van-swipe-item>
    </van-swipe>-->
  </div>
</template>

<script>
import RecommendProducts from "./components/RecommendProducts";
import TvProducts from "./components/TvProducts";
import IntelligenceProducts from "./components/IntelligenceProducts";
import NoteBook from "./components/NoteBook";
import HouseHold from "./components/HouseHold";
import { reactive, toRefs, onMounted } from "vue";
import FetchAPI from "@/utils/fetchApi";

export default {
  components: {
    RecommendProducts,
    TvProducts,
    IntelligenceProducts,
    HouseHold,
    NoteBook
  },
  setup() {
    // const this = reactive({
    //   getedRecommendPhones: [],
    //   getedRecommendHouseholds: [],
    //   getedRcommendTvs: [],
    //   getedRecommendIceBoxs: [],
    //   getedRecommendNotebooks: []
    // });
    //onMounted(() => {
    // FetchAPI.getAllTopCategories().then(res => {
    //   this.getedRecommendPhones = res.data[0].products.slice(0, 8);
    //   this.getedRecommendHouseholds = res.data[2].products.slice(0, 9);
    // });
    // FetchAPI.getAllCategories()
    // .then(res=>{
    //   //console.log(res.data)
    //   this.getedRcommendTvs = res.data[2].products.slice(0,8);
    //   let categoryIceBox = res.data.filter((item)=>{
    //     return item.zh_name == '冰箱'
    //   })
    //   let categoryNotebook = res.data.filter((item)=>{
    //     return item.zh_name == '笔记本'
    //   })

    //   this.getedRecommendIceBoxs = categoryIceBox[0].products
    //   this.getedRecommendNotebooks =categoryNotebook[0].products
    // })

    //});
    const state = reactive({});

    return {
      ...toRefs(state)
    };
  },
  data() {
    return {
      active: 'recommend-products'
    };
  },
  methods: {
    // showComponent(index) {
    //   //判定当前下标决定移动方向
    //   // if (index < this.currentIndex) {
    //   //   this.isLeft = false;
    //   // } else {
    //   //   this.isLeft = true;
    //   // }
    //   //异步加载动画
    //   Promise.resolve().then(() => {
    //     if (typeof index == "string" || typeof index == "number") {
    //       this.currentIndex = index;

    //     }
    //   });
    // }
    showComponent(name) {
      this.active = name
    }
  }
};
</script>

<style lang="scss" scoped>
.main-container {
  width: 100%;
  //height: auto;
  overflow: hidden;
  background-color: #f5f5f5;
  .main-header {
    display: flex;
    justify-content: space-around;
    align-items: center;
    padding-top: 5px;
    .img-logo,
    .img-user {
      display: block;
    }
    .img-logo {
      width: 29px;
      height: 18px;
    }
    .img-user {
      width: 20px;
      height: 20px;
    }
    .search-box {
      width: 270px;
      height: 32px;
      background-color: #fff;
      border-radius: 2px;
      border: 1px solid #f5f5f5;
      line-height: 32px;
      color: #999;
      display: flex;
      justify-content: start;
      align-items: center;
      i.icon-search {
        padding: 5px;
        font-size: 20px;
      }
    }
  }
  .main-nav {
    margin-top: 12px;
    box-shadow: 0px 1px 2px #ddd;
    div.nav-container {
      margin-left: 40px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    div.nav-btn-box {
      width: 256px;
      height: 24px;
      display: flex;
      justify-content: space-around;
      a {
        display: block;
        box-sizing: border-box;
        padding-bottom: 8px;
        font-size: 14px;
        color: #777;
      }
      a.nav-btn-active {
        border-bottom: 2px solid #ff6700;
        color: #ff6700;
      }
    }
    div.dropdown-btn {
      i.icon-arrow-down {
        font-size: 24px;
        color: #777;
      }
    }
  }
  .main-component {
    width: 100%;
    height: 2000px;
    background-color: #ff6700;
    transition: all 0.5s ease;
  }

  .main-intelligence {
    background-color: #333;
  }
  .main-tv {
    background-color: #444;
  }
  .main-household {
    background-color: #555;
  }
  .main-notebook {
    background-color: #777;
  }

  .slide-left-enter-active,
  .slide-left-leave-active {
    transition: all 0.5s ease;
  }
  .slide-left-enter-from {
    transform: translateX(375px);
  }
  .slide-left-leave-to {
    transform: translateX(-375px);
  }
  .slide-right-enter-active,
  .slide-right-leave-active {
    transition: all 0.5s ease;
  }
  .slide-right-enter-from {
    transform: translateX(-375px);
  }
  .slide-right-leave-to {
    transform: translateX(375px);
  }
}
</style>