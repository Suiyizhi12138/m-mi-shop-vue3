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
            :class="{'nav-btn-active':activeIndex==0}"
            @click="showComponent(0)"
           
          >推荐</a>
          <a
            href="javascript:"
            class="nav-btn"
            :class="{'nav-btn-active':activeIndex==1}"
            @click="showComponent(1)"
          >智能</a>
          <a
            href="javascript:"
            class="nav-btn"
            :class="{'nav-btn-active':activeIndex==2}"
            @click="showComponent(2)"
          >电视</a>
          <a
            href="javascript:"
            class="nav-btn"
            :class="{'nav-btn-active':activeIndex==3}"
            @click="showComponent(3)"
          >家电</a>
          <a
            href="javascript:"
            class="nav-btn"
            :class="{'nav-btn-active':activeIndex==4}"
            @click="showComponent(4)"
          >笔记本</a>
        </div>
        <div class="dropdown-btn">
          <i class="iconfont icon-arrow-down"></i>
        </div>
      </div>
    </nav>
    <!-- 主页组件 -->

    <transition :name="slideDirection">
      <keep-alive>
      <component :is="activeNames[activeIndex]"></component>
      </keep-alive>
    </transition>
   
     
  </div>
</template>

<script>
import RecommendProducts from './components/RecommendProducts'
import TvProducts from './components/TvProducts'
import IntelligenceProducts from './components/IntelligenceProducts'
import HouseHold  from './components/HouseHold'
import NoteBook from './components/NoteBook' 
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
    const state = reactive({
     activeName: 'recommend-products',//组件名
     slideDirection: 'slide-left',//transition name
     activeNames: ['recommend-products','intelligence-products','tv-products','house-hold','note-book'],
     activeIndex: 0,//当前下标
      
    });
    const showComponent = (index) => {
      //state.activeIndex = index
      let oldIndex = state.activeIndex
      //判断当前下标与要点击的位置确定移动方向
      if(index < oldIndex){
        state.slideDirection = 'slide-left'
      }else{
        state.slideDirection = 'slide-right'
      }
      Promise.resolve()
      .then(
        state.activeIndex = index
      )

    }

    return {
      ...toRefs(state),
      showComponent
    };
  },
  
 
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
    transition: all .5s ease;
  }
  .slide-left-enter-from {
    transform: translateX(-375px);
  }
  .slide-left-leave-to {
    transform: translateX(375px);
  }
  .slide-right-enter-active,
  .slide-right-leave-active {
    transition: all 0.5s ease;
  }
  .slide-right-enter-from {
    transform: translateX(375px);
  }
  .slide-right-leave-to {
    transform: translateX(-375px);
  }
}
</style>