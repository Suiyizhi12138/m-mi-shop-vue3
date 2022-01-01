<template>
  <div class="category-page">
    <header class="category-search">
      <router-link to="/search">
        <div class="search-box search-btn">
          <i class="iconfont icon-search"></i>
          <span class="search-holder">搜索商品名称</span>
        </div>
      </router-link>
    </header>
    <div class="category-content">
      <!-- 侧边导航栏 -->

      <div class="side-bar">
        <ul class="side-list">
          <li
            class="side-item"
            :class="{'link-active':swipeOptions.currentIndex==item.index}"
            v-for="item in sideInfos"
            :key="item.index"
          >
            <a href="javascript:" @click="selectCategory(item.index)">{{item.name}}</a>
          </li>
        </ul>
      </div>

      <div class="main-content">
        <!-- //方案一 van-swipe 适用于宽高一样的过渡 高度不统一失败 -->
        <!-- 方案二 动态组件 适用于多个不同类型组件-->
        <!-- 方案三 多元素过渡 -->

        <transition name="fade-in">
          <!-- 推荐列表 -->
          <div
            class="main-content-component recommend-component"
            v-if="swipeOptions.currentIndex==0"
            key="0"
          >
            <product-list :headImg="'https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/9e46608ddb8debc8c9c3dfef10e0486e.png?w=734&h=220&bg=7F0000'" :headId="12" :products="swipeOptions.xiaoMiPhones"></product-list>
            <div class="recommend-list-box">
              <ul class="recommend-list">
                <li class="recommend-item" v-for="item in recommnedSearchs" :key="item.name">
                  <router-link to="/search">
                    <van-image :src="item.img_url" alt="" lazy-load width="15vw"/>
                    <span>{{item.key}}</span>
                  </router-link>
                </li>
              </ul>
            </div>
          </div>
          <!-- //小米手机列表 -->
          <div class="main-content-component" v-else-if="swipeOptions.currentIndex==1" key="1">
            <product-list :headImg="'https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/9e46608ddb8debc8c9c3dfef10e0486e.png?w=734&h=220&bg=7F0000'" :headId="12" :products="swipeOptions.xiaoMiPhones"></product-list>
          </div>
          <!-- 红米手机列表 -->
          <div class="main-content-component" v-else-if="swipeOptions.currentIndex==2" key="2">
            <product-list :headImg="'https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/881986cc3292f2537287d97b63df6187.png?w=734&h=220&bg=7F0000'" :headId="12" :products="swipeOptions.redMiPhones"></product-list>
          </div>

          <!-- 电脑列表 -->
          <div class="main-content-component" v-else-if="swipeOptions.currentIndex==3" key="3">
            <product-list :headImg="'https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/e0ef40c401779d31b218fe2c35d155f6.png?w=734&h=220&bg=7F0000'" :headId="12" :products="swipeOptions.computers"></product-list>
          </div>

          <!-- 智能穿戴 -->
          <div class="main-content-component" v-else-if="swipeOptions.currentIndex==4" key="4">
            <product-list :headImg="'https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/45347c0635c3d40c3174cda1230af477.png?w=734&h=220&bg=7F0000'" :headId="12" :products="swipeOptions.wears"></product-list>
          </div>

          <!-- 电视 -->
          <div class="main-content-component" v-else-if="swipeOptions.currentIndex==5" key="5">
            <product-list :headImg="'https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/c7176304408eafb53d8889a9c61d11e7.png?w=734&h=220&bg=7F0000'" :headId="12" :products="swipeOptions.tvs"></product-list>
          </div>
          <!-- 大家电 -->
          <div class="main-content-component" v-else-if="swipeOptions.currentIndex==6" key="6">
            <product-list :headImg="'https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/f5a637fa694242b8ec5f4b20affa9580.png?w=734&h=220&bg=3E4148'" :headId="12" :products="swipeOptions.bigHouseholds"></product-list>
          </div>

          <!-- //小家电 -->
          <div class="main-content-component" v-else-if="swipeOptions.currentIndex==7" key="7">
            <product-list :headImg="'https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/b81bdaaaa70ec9c98d0cbab16c8fd23f.png?w=734&h=220&bg=7F0000'" :headId="12" :products="swipeOptions.smallHouseholds"></product-list>
          </div>

          <!-- 智能家居 -->
          <div class="main-content-component" v-else-if="swipeOptions.currentIndex==8" key="8">
            <product-list :headImg="'https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/423c4398ff5ad224cfbf5684d437e97e.png?w=734&h=220&bg=0'" :headId="12" :products="swipeOptions.intellHouseholds"></product-list>
          </div>
            
            <!-- 出行 -->
          <div class="main-content-component" v-else-if="swipeOptions.currentIndex==9" key="9">
            <product-list :headImg="'https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/f6e5a3c73b0143de22157f6054daa80d.png?w=734&h=220&bg=0'" :headId="23" :products="swipeOptions.travels"></product-list>
          </div>
          <!-- 日用百货 -->
          <div class="main-content-component" v-else-if="swipeOptions.currentIndex==10" key="10">
            <product-list :headImg="'https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/4cbdcef305deac28c1f71fd7ccff3ba1.png?w=734&h=220&bg=0'" :headId="23" :products="swipeOptions.others"></product-list>
          </div>

         
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
import FetchAPI from "@/utils/fetchApi";
import { reactive, toRefs, onMounted } from "vue";
import ProductList from "./components/ProductList";
export default {
  components: {
    ProductList
  },
  setup() {
    const state = reactive({
      allCategories: [],
      swipeOptions: {
        currentIndex: 0,
        redMiPhones: [], //红米手机列表
        xiaoMiPhones: [], //小米手机列表
        tvs: [], //电视
        computers: [],//电脑平板
        wears: [],//智能穿戴
        bigHouseholds: [],//大家电
        smallHouseholds: [],//小家电
        intellHouseholds: [],//智能家居
        travels: [],//出行
        others: [],//日用百货-
      }
    });

    onMounted(() => {
      FetchAPI.getAllCategories().then(res => {
        state.swipeOptionsallCategories = res.data;
        state.swipeOptions.redMiPhones = res.data[1].products;
        state.swipeOptions.xiaoMiPhones = res.data[0].products;
        state.swipeOptions.tvs = res.data[2].products;
        state.swipeOptions.computers = res.data[3].products
        state.swipeOptions.wears = res.data[16].products.concat(res.data[18].products)
        state.swipeOptions.bigHouseholds = res.data[7].products.concat(res.data[8].products,res.data[9].products,res.data[10].products)
        state.swipeOptions.smallHouseholds = res.data[17].products.concat(res.data[33].products)
        state.swipeOptions.intellHouseholds = res.data[11].products.concat(res.data[4].products,res.data[15].products)
        state.swipeOptions.travels = res.data[14].products
        let otherProducts = []
        res.data.slice(24,32).forEach((item)=>{
          otherProducts = otherProducts.concat(item.products)
        })
        state.swipeOptions.others = otherProducts
        

      });
    });

    const selectCategory = index => {
      state.swipeOptions.currentIndex = index;
    };
    return {
      ...toRefs(state),
      selectCategory
    };
  },
  data() {
    return {
      //side-bar列表数据
      sideInfos: [
        {
          index: 0,
          name: "推荐"
        },
        {
          index: 1,
          name: "XiaoMi手机"
        },
        {
          index: 2,
          name: "RedMi手机"
        },
        {
          index: 3,
          name: "电脑平板"
        },
        {
          index: 4,
          name: "智能穿戴"
        },
        {
          index: 5,
          name: "电视"
        },
        {
          index: 6,
          name: "大家电"
        },
        {
          index: 7,
          name: "小家电"
        },
        {
          index: 8,
          name: "智能家居"
        },
        {
          index: 9,
          name: "户外出行"
        },
        {
          index: 10,
          name: "日用百货"
        }
      ],
      //推荐栏 下方推荐列表
      recommnedSearchs: [
        {
          img_url: 'https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/960d47c60c0a0f83cbca500333f84aa3.png?thumb=1&w=120&h=120',
          key: 'Redmi 手表2'
        },
        {
          img_url: 'https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/348b2a49f49540c83819ff9dd224ca20.png?thumb=1&w=120&h=120',
          key:'水壶/养生壶'
        },
        {
          img_url: 'https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/dd9d058fe0f132b0f09885c0ddc20ad1.png?thumb=1&w=120&h=120',
          key: '剃须刀'
        },
        {
          img_url: 'https://cdn.cnbj0.fds.api.mi-img.com/b2c-mimall-media/8520387c56ef4e88c89e1aeb73cb31bb.png?thumb=1&w=120&h=120',
          key: '电池'
        },
        {
          img_url: 'https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/4383a79a1646760515fd312d6d2cbeed.png?thumb=1&w=120&h=120',
          key: '车具配件'
        },
        {
          img_url: 'https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/1fccb7e66891e84f74618c3557dd2991.png?thumb=1&w=120&h=120',
          key: 'Color 2'
        },
        {
          img_url: 'https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/7d133e7e994524d08d28d9f5026b5e6e.png?thumb=1&w=120&h=120',
          key: '口腔护理'
        },
        {
          img_url: 'https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/901c89ad5e92c6408980decd7a79b739.png?thumb=1&w=120&h=120',
          key: '无线充'
        },
        {
          img_url: 'https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/2768f0ffc7d8dd66e5c58c9062898338.png?thumb=1&w=120&h=120',
          key: '小米10S'
        },
        {
          img_url: 'https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/62f1c734b85a7a342aa3e192a5978a4f.png?thumb=1&w=120&h=120',
          key: '手环配件'
        },
        {
          img_url: 'https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/c08ac3d256bfac74a9f5dc11ced2b30e.png?thumb=1&w=120&h=120',
          key: '限定卫衣'
        },
        {
          img_url: 'https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/855164f013ebca13f0b4f00c1c026af2.png?thumb=1&w=120&h=120',
          key: '保温杯'
        },
      ]
    };
  }
};
</script>

<style lang="scss" scoped>
.category-page {
  overflow: hidden;
  .category-search {
    width: 375px;
    height: 50px;
    position: fixed;
    background-color: #fff;
    top: 0px;
    left: 0px;
    z-index: 20;
    display: flex;
    justify-content: center;
  
    padding-top: 9px;
    .search-box {
      display: flex;
      justify-content: flex-start;
      width: 340px;
      height: 30px;
      background-color: #f5f5f5;
      border-radius: 15px;
      line-height: 30px;
      text-align: center;
      .icon-search {
        font-size: 20px;
        color: #bbb;
        margin-left: 10px;
      }
      span.search-holder {
        color: #bbb;
        margin-left: 12px;
      }
    }
  }
  .category-content {
    display: flex;
    justify-content: flex-start;
    .side-bar {
      position: fixed;
      width: 93px;
      bottom: 60px;
      top: 55px;
      left: 0px;
      right: -17px;
      overflow-y: scroll;
      //隐藏滚动条 firefox
      scrollbar-width: none;
      //ie
      -ms-overflow-style: none;
      //chrome
      &::-webkit-scrollbar{
        width: 0
      }
     
      .side-list {
        .side-item {
          height: 16px;
          line-height: 16px;
          text-align: center;
          margin: 15px 0 30px;
        }
        li.link-active {
          border-left: 3px solid #ff6700;
          a {
            color: #333;
            font-weight: 700;
          }
        }
      }
    }
    .main-content {
      overflow: hidden;
      width: 282px;
      margin-left: 93px;
      margin-top: 55px;
      .main-content-component {
        overflow: hidden;
      }
      .recommend-component{
        .recommend-list {
          overflow: hidden;
          display: flex;
          flex-wrap: wrap;
          justify-content: space-around;
          margin-top: -100px;
          padding-bottom: 100px;
          .recommend-item {
            overflow: hidden;
            width: 75px;
            padding-bottom: 10px;
            a {
              
              display: flex;
              flex-direction: column;
              .van-image{
                margin: 0 auto;
              }
          
              span {
                overflow: hidden;
                text-overflow: ellipsis;
                font-size: 12px;
              }
            }
          }
        }
      }
    }
  }

  //过度
  .fade-in-enter-active,
  .fade-in-leave-active {
    transition: all 0.4s ease;
  }
  .fade-in-enter-from,
  .fade-in-leave-to {
    opacity: 0;
  }
}
</style>