<template>
  <div class="intelligence-page">
    <div class="swipe-container">
      <van-swipe autoplay="3000" indicator-color="white">
        <van-swipe-item>
          <router-link to="/">
            <img src="../../../assets/images/home/intelligence/in-swipe1.jpg" />
          </router-link>
        </van-swipe-item>
        <van-swipe-item>
          <router-link to="/">
            <img src="../../../assets/images/home/intelligence/in-swipe2.jpg" />
          </router-link>
        </van-swipe-item>
        <van-swipe-item>
          <router-link to="/">
            <img src="../../../assets/images/home/intelligence/in-swipe3.jpg" />
          </router-link>
        </van-swipe-item>
        <van-swipe-item>
          <router-link to="/">
            <img src="../../../assets/images/home/intelligence/in-swipe4.jpg" />
          </router-link>
        </van-swipe-item>
        <van-swipe-item>
          <router-link to="/">
            <img src="../../../assets/images/home/intelligence/in-swipe5.jpg" />
          </router-link>
        </van-swipe-item>
      </van-swipe>
    </div>
    <ul class="intell-nav-list">
      <li class="intell-nav-item" v-for="item in intellNavs">
        <router-link :to="'/'+item.url">
          <img :src="item.imgUrl" alt />
        </router-link>
      </li>
    </ul>
    <div class="intell-content">
      <div class="hot-products">
        <router-link to="/">
          <img src="../../../assets/images/home/intelligence/hot-products.webp" alt="hot-products">
        </router-link>
      </div>
      <div class="new-products">
        <router-link to="/">
          <img src="../../../assets/images/home/intelligence/new-products.jpg" alt="new-products">
        </router-link>
      </div>
      <div class="hot-list-container">
        <ul class="hot-list">
          <li class="hot-item" v-for="item in intellProducts" :key="item.id">
            <router-link :to="'/product/'+item.id">
              <div class="hot-item-top">
                <van-image :src="item.image_url" alt  lazy-load height="29.3vw"></van-image>
              </div>
              <div class="hot-item-bottom">
                <p class="text-item phone-name">{{item.zh_name}}</p>
                <p class="text-item phone-description">{{item.description}}</p>
                <p class="text-item phone-price">
                  <span class="phone-price-text">￥{{item.price-item.discount}}</span>
                  <del class="phone-discount">{{item.discount>0?'￥'+item.discount:''}}</del>
                </p>
                <!-- <p>
                  <button class="btn-buy">立即购买</button>
                </p> -->
              </div>
            </router-link>
          </li>
        </ul>
      </div>

      <div class="hot-list-container household-list-container">
        <h2 class="list-title">小家电</h2>
        <ul class="hot-list">
          <li class="hot-item" v-for="item in intellProducts.slice(0,6)" :key="item.id">
            <router-link :to="'/product/'+item.id">
              <div class="hot-item-top">
                <van-image :src="item.image_url" alt  lazy-load height="29.3vw"></van-image>
              </div>
              <div class="hot-item-bottom">
                <p class="text-item phone-name">{{item.zh_name}}</p>
                <p class="text-item phone-description">{{item.description}}</p>
                <p class="text-item phone-price">
                  <span class="phone-price-text">￥{{item.price-item.discount}}</span>
                  <del class="phone-discount">{{item.discount>0?'￥'+item.discount:''}}</del>
                </p>
                <!-- <p>
                  <button class="btn-buy">立即购买</button>
                </p> -->
              </div>
            </router-link>
          </li>
        </ul>
      </div>
      <div class="hot-list-container household-list-container">
        <h2 class="list-title">耳机音箱</h2>
        <ul class="hot-list">
          <li class="hot-item" v-for="item in intellProducts.slice(0,3)" :key="item.id">
            <router-link :to="'/product/'+item.id">
              <div class="hot-item-top">
                <van-image :src="item.image_url" alt  lazy-load height="29.3vw"></van-image>
              </div>
              <div class="hot-item-bottom">
                <p class="text-item phone-name">{{item.zh_name}}</p>
                <p class="text-item phone-description">{{item.description}}</p>
                <p class="text-item phone-price">
                  <span class="phone-price-text">￥{{item.price-item.discount}}</span>
                  <del class="phone-discount">{{item.discount>0?'￥'+item.discount:''}}</del>
                </p>
                <!-- <p>
                  <button class="btn-buy">立即购买</button>
                </p> -->
              </div>
            </router-link>
          </li>
        </ul>
      </div>
      <!-- 品质灯具 -->
      <div class="hot-list-container household-list-container">
        <h2 class="list-title">品质灯具</h2>
        <ul class="hot-list">
          <li class="hot-item" v-for="item in intellProducts.slice(0,3)" :key="item.id">
            <router-link :to="'/product/'+item.id">
              <div class="hot-item-top">
                <van-image :src="item.image_url" alt  lazy-load height="29.3vw"></van-image>
              </div>
              <div class="hot-item-bottom">
                <p class="text-item phone-name">{{item.zh_name}}</p>
                <p class="text-item phone-description">{{item.description}}</p>
                <p class="text-item phone-price">
                  <span class="phone-price-text">￥{{item.price-item.discount}}</span>
                  <del class="phone-discount">{{item.discount>0?'￥'+item.discount:''}}</del>
                </p>
                <!-- <p>
                  <button class="btn-buy">立即购买</button>
                </p> -->
              </div>
            </router-link>
          </li>
        </ul>
      </div>
      <!-- 便捷出行 -->
      <div class="hot-list-container household-list-container">
        <h2 class="list-title">便捷出行</h2>
        <ul class="hot-list">
          <li class="hot-item" v-for="item in intellProducts.slice(0,3)" :key="item.id">
            <router-link :to="'/product/'+item.id">
              <div class="hot-item-top">
                <van-image :src="item.image_url" alt  lazy-load height="29.3vw"></van-image>
              </div>
              <div class="hot-item-bottom">
                <p class="text-item phone-name">{{item.zh_name}}</p>
                <p class="text-item phone-description">{{item.description}}</p>
                <p class="text-item phone-price">
                  <span class="phone-price-text">￥{{item.price-item.discount}}</span>
                  <del class="phone-discount">{{item.discount>0?'￥'+item.discount:''}}</del>
                </p>
                <!-- <p>
                  <button class="btn-buy">立即购买</button>
                </p> -->
              </div>
            </router-link>
          </li>
        </ul>
      </div>
      <!-- 个护清洁 -->
      <div class="hot-list-container household-list-container">
        <h2 class="list-title">个护清洁</h2>
        <ul class="hot-list">
          <li class="hot-item" v-for="item in intellProducts.slice(0,3)" :key="item.id">
            <router-link :to="'/product/'+item.id">
              <div class="hot-item-top">
                <van-image :src="item.image_url" alt  lazy-load height="29.3vw"></van-image>
              </div>
              <div class="hot-item-bottom">
                <p class="text-item phone-name">{{item.zh_name}}</p>
                <p class="text-item phone-description">{{item.description}}</p>
                <p class="text-item phone-price">
                  <span class="phone-price-text">￥{{item.price-item.discount}}</span>
                  <del class="phone-discount">{{item.discount>0?'￥'+item.discount:''}}</del>
                </p>
                <!-- <p>
                  <button class="btn-buy">立即购买</button>
                </p> -->
              </div>
            </router-link>
          </li>
        </ul>
      </div>
      <!-- 儿童专区 -->
      <div class="hot-list-container household-list-container">
        <h2 class="list-title">儿童专区</h2>
        <ul class="hot-list">
          <li class="hot-item" v-for="item in intellProducts.slice(0,3)" :key="item.id">
            <router-link :to="'/product/'+item.id">
              <div class="hot-item-top">
                <van-image :src="item.image_url" alt  lazy-load height="29.3vw"></van-image>
              </div>
              <div class="hot-item-bottom">
                <p class="text-item phone-name">{{item.zh_name}}</p>
                <p class="text-item phone-description">{{item.description}}</p>
                <p class="text-item phone-price">
                  <span class="phone-price-text">￥{{item.price-item.discount}}</span>
                  <del class="phone-discount">{{item.discount>0?'￥'+item.discount:''}}</del>
                </p>
                <!-- <p>
                  <button class="btn-buy">立即购买</button>
                </p> -->
              </div>
            </router-link>
          </li>
        </ul>
      </div>
      <!-- 配件耗材 -->
      <div class="hot-list-container household-list-container">
        <h2 class="list-title">配件耗材</h2>
        <ul class="hot-list">
          <li class="hot-item" v-for="item in intellProducts.slice(0,3)" :key="item.id">
            <router-link :to="'/product/'+item.id">
              <div class="hot-item-top">
                <van-image :src="item.image_url" alt  lazy-load height="29.3vw"></van-image>
              </div>
              <div class="hot-item-bottom">
                <p class="text-item phone-name">{{item.zh_name}}</p>
                <p class="text-item phone-description">{{item.description}}</p>
                <p class="text-item phone-price">
                  <span class="phone-price-text">￥{{item.price-item.discount}}</span>
                  <del class="phone-discount">{{item.discount>0?'￥'+item.discount:''}}</del>
                </p>
                <!-- <p>
                  <button class="btn-buy">立即购买</button>
                </p> -->
              </div>
            </router-link>
          </li>
        </ul>
      </div>
      <div class="last-recommend">
        <router-link to="/">
          <van-image src="https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/c6c71c1c81edf64e2c13c137c2820805.jpg?f=webp" alt="" lazy-load></van-image>
        </router-link>
      </div>
      <div style="height: 60px;"></div>
    </div>
  </div>
</template>

<script>
import FetchAPI from '@/utils/fetchApi'
export default {
  data() {
    return {
      intellNavs: [
        {
          imgUrl:
            "https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/e47dad0c224065a73a4c722eeaf1b8e1.jpg",
          url: ""
        },
        {
          imgUrl:
            "https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/e47dad0c224065a73a4c722eeaf1b8e1.jpg",
          url: ""
        },
        {
          imgUrl:
            "https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/e47dad0c224065a73a4c722eeaf1b8e1.jpg",
          url: ""
        },
        {
          imgUrl:
            "https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/e47dad0c224065a73a4c722eeaf1b8e1.jpg",
          url: ""
        },
        {
          imgUrl:
            "https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/e47dad0c224065a73a4c722eeaf1b8e1.jpg",
          url: ""
        },
        {
          imgUrl:
            "https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/e47dad0c224065a73a4c722eeaf1b8e1.jpg",
          url: ""
        },
        {
          imgUrl:
            "https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/e47dad0c224065a73a4c722eeaf1b8e1.jpg",
          url: ""
        },

        {
          imgUrl:
            "https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/e47dad0c224065a73a4c722eeaf1b8e1.jpg",
          url: ""
        },
        {
          imgUrl:
            "https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/e47dad0c224065a73a4c722eeaf1b8e1.jpg",
          url: ""
        },
        {
          imgUrl:
            "https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/e47dad0c224065a73a4c722eeaf1b8e1.jpg",
          url: ""
        }
      ],
      intellProducts:[],
      earphones: []

    };
  },
  props:{
    
  },
  mounted(){
    if(Array.isArray(this.intellProducts)&&this.intellProducts.length>0){
      return;
    }else{
       FetchAPI.getAllTopCategories()
      .then((res)=>{
        
        this.intellProducts = res.data[2].products.slice(0,9);
        
      })
    }
  }
};
</script>

<style lang="scss" scoped>
.intelligence-page {
  position: absolute;
  top: 77px;
  width: 100%;
  background-color: #f5f5f5;
  overflow: hidden;
  .swipe-container {
    .van-swipe {
      width: 375px;
      height: 186px;
      .van-swipe-item {
        a {
          display: block;
        }
        img {
          width: 375px;
          height: 185px;
        }
      }
    }
  }

  .intell-nav-list {
    display: flex;
    flex-wrap: wrap;
    .intell-nav-item {
      flex: 1 1 auto;
      -webkit-box-flex: 1;
      display: block;
      height: 75px;
      a {
        height: 79px;
        width: 75px;
        img {
          width: 74px;
          height: 79px;
        }
      }
    }
  }
  .intell-content{
    div.hot-products,.new-products{
      a{
        display: block;
        height: 58px;
        img{
          width: 100%;
          height: 58px;
        }
      }
    }
    .new-products{
      margin-top: 10px;
    }
    .hot-list-container{
      overflow: hidden;
      .hot-list{
        display: flex;
        flex-wrap: wrap;
        .hot-item{
          display: flex;
          flex-direction: column;
          width: 123px;
          height: 177px;
          border: 1px solid #f5f5f5;
          
          .hot-item-top{
            width: 123px;
            height: 110px;
            
            background-color: #fff;
            overflow: hidden;
            .van-image{
              max-height: 110px;
            }
            
          }
          .hot-item-bottom {
            width: 123px;
            box-sizing: border-box;
            padding: 12px 5px 0;
            overflow: hidden;
            p.text-item {
              width: 115px;
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
              height: 18px;
              line-height: 18px;
              text-align: center;
            }
            p.phone-name {
              font-weight: 600;
              color: #333;
              font-size: 12px;
            }
            p.phone-description {
              font-weight: 300;
              font-size: 10px;
              text-align: center;
            }
            p.phone-price {
              span.phone-price-text {
                color: rgb(234, 98, 91);
                font-weight: 600;
              }
            }
            button.btn-buy {
              width: 100px;
              height: 30px;
              background-color: rgb(234, 98, 91);
              border-radius: 2px;
              border: none;
              color: #fff;
            }
          }
          a{
            display: block;
            margin: 0 auto;
            img{
              display: block;
              height: 96px;
              max-width: 110px;
              margin: auto;
            }
          }
        }
      }
    }
    .household-list-container{
      h2.list-title{
        padding: 12px 0;
      }
      .list-item{
        width: 123px;

      }
    }
    .last-recommend{
      padding-top: 10px;
      a{
        display: block;
        img{
          height: 144px;
        }
      }
    }
  }
}
</style>