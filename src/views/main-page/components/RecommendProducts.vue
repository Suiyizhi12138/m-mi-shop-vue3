<template>
   <!-- 主页推荐  -->
  
  <div  class="recommend-page">
    <div class="swipe-container">
      <van-swipe autoplay="3000" indicator-color="white">
        <van-swipe-item>
          <router-link to='/product/7'>
          <img src="../../../assets/images/home/swipe-mi11.jpg" alt />
          </router-link>
        </van-swipe-item>
        <van-swipe-item>
          <router-link to='/product/96'>
          <img src="https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/7cd97fa20373a20cf9305f97ff38847f.jpg?thumb=1&w=720&h=360" alt />
          </router-link>
        </van-swipe-item>
        <van-swipe-item>
          <router-link to='/'>
          <img src="../../../assets/images/home/swipe-mishen.jpg" alt />
          </router-link>
        </van-swipe-item>
      </van-swipe>
    </div>
    <div class="recommend-nav">
      <div class="recommend-nav-top">
        <router-link to="/">
          <img src="../../../assets/images/home/mi-jinshop.png" alt />
        </router-link>
        <router-link to="/">
          <img src="../../../assets/images/home/mi-zhongchou.webp" alt />
        </router-link>
        <router-link to="/">
          <img src="../../../assets/images/home/mi-phone.png" alt />
        </router-link>
        <router-link to="/">
          <img src="../../../assets/images/home/mi-refresh.webp" alt />
        </router-link>
        <router-link to="/">
          <img src="../../../assets/images/home/mi-shangxin.jpg" alt />
        </router-link>
      </div>
      <div class="recommend-nav-bottom">
        <router-link to="/">
          <img src="../../../assets/images/home/mi-intell.png" alt />
        </router-link>
        <router-link to="/">
          <img src="../../../assets/images/home/mi-notebook.png" alt />
        </router-link>
        <router-link to="/">
          <img src="../../../assets/images/home/mi-dianshi.png" alt />
        </router-link>
        <router-link to="/">
          <img src="../../../assets/images/home/mi-xiyiji.jpg" alt />
        </router-link>
        <router-link to="/">
          <img src="../../../assets/images/home/mi-fen-card.png" alt />
        </router-link>
      </div>
    </div>
    <van-loading v-if="loadStatus==1"></van-loading>
    <div v-else class="recommend-content">
      <div class="recommend-common">
        <div class="recommend-common-left">
          <router-link to="/product/9">
            <img src="../../../assets/images/home/mi11-ultra.jpg" alt />
          </router-link>
        </div>
        <div class="recommend-common-right">
          <img src="../../../assets/images/home/mi-shouhuan6.jpg" alt />
          <img src="../../../assets/images/home/mi-tvs.jpg" alt />
        </div>
      </div>
      <div class="recommend-phones">
        <div class="recommend-hot recommend-hot-phone">
          <router-link to="/product/7">
            <img src="../../../assets/images/home/mi11-youth.jpg" alt />
          </router-link>
        </div>

        <ul class="recommend-phone-list">
          <li class="recommend-phone-item"   v-for="phone in recommendPhones" :key="phone.id">
            <router-link :to="'/product/'+phone.id">
              <div class="phone-item-top">
                <van-image :src="phone.image_url" fit="contain"  height="33.6vw" lazy-load></van-image>
              </div>
              <div class="phone-item-bottom">
                <p class="text-item phone-name">{{phone.zh_name}}</p>
                <p class="text-item phone-description">{{phone.description}}</p>
                <p class="text-item phone-price">
                  <span class="phone-price-text">￥{{phone.price-phone.discount}}</span>
                  <del class="phone-discount">{{phone.discount>0?'￥'+phone.discount:''}}</del>
                </p>
                <p>
                  <button class="btn-buy">立即购买</button>
                </p>
              </div>
            </router-link>
          </li>
        </ul>
        <hr />
        <div class="link-more-box">
          <router-link to="/">更多小米手机产品 &gt;</router-link>
        </div>
      </div>
      <div class="recommend-tvs">
        <div class="recommend-hot recommend-hot-phone">
          <router-link to="/product/7">
            <img src="../../../assets/images/home/mi-tv-ea-69.jpg" alt />
          </router-link>
        </div>
        <div class="link-more-box">
          <router-link to="/">更多小米电视产品 &gt;</router-link>
        </div>
      </div>
      <div class="recommend-notebooks">
        <div class="recommend-hot">
          <router-link to="/product/7">
            <img src="../../../assets/images/home/mi-redmi-book-16.jpg" alt />
          </router-link>
        </div>
        <div class="link-more-box">
          <router-link to="/">更多小米笔记本产品 &gt;</router-link>
        </div>
      </div>
      <div class="recommend-households">
        <div class="recommend-hot">
          <router-link to="/product/7">
            <img src="../../../assets/images/home/mi-water-clean-600.jpg" alt />
          </router-link>
        </div>
        <div class="link-more-box">
          <router-link to="/">更多米家家电电产品 &gt;</router-link>
        </div>
      </div>
      <div class="recommend-intelligences">
        <div class="recommend-hot">
          <router-link to="/">
            <img src="../../../assets/images/home/mi-better.jpg" alt />
          </router-link>
        </div>
        <div class="link-more-box">
          <router-link to="/">更多米家智能产品 &gt;</router-link>
        </div>
      </div>
      <div class="recommend-category">
        <router-link to="/">
          <img
            src="../../../assets/images/home/recommend-category/work.webp"
            alt
          />
        </router-link>
        <router-link to="/">
          <img
            src="../../../assets/images/home/recommend-category/household.webp"
            alt
          />
        </router-link>
        <router-link to="/">
          <img
            src="../../../assets/images/home/recommend-category/pack.webp"
            alt
          />
        </router-link>
        <router-link to="/">
          <img
            src="../../../assets/images/home/recommend-category/ear-phone.webp"
            alt
          />
        </router-link>
        <router-link to="/">
          <img
            src="../../../assets/images/home/recommend-category/10000.webp"
            alt
          />
        </router-link>
        <router-link to="/">
          <img
            src="../../../assets/images/home/recommend-category/meixue.webp"
            alt
          />
        </router-link>
      </div>
      <div class="recommend-refresh">
        <router-link to="/">
        <img src="https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/f4c4a11536a720ee0f1b516e53e4d868.jpg?f=webp&w=1080&h=420&bg=873FFA" alt=""></router-link>
        <div class="link-more-box">
          <router-link to="/">
            了解小米 &gt;
          </router-link>
        </div>
      </div>
      <div style="height: 60px;"></div>
    </div>
  </div>
  
</template>

<script>

import FetchAPI from "@/utils/fetchApi";
export default {
  data() {
    return {
      recommendPhones: [],
      loadStatus: 0,//0 未加载 1加载中 2加载成功 3加载失败
    };
  },
  mounted(){
    if(Array.isArray(this.recommendPhones)&&this.recommendPhones.length>0){
     return;
    }else{
       this.loadStatus = 1
       FetchAPI.getAllTopCategories()
      .then((res)=>{
        if(res.status==200){
          this.loadStatus  = 2
        }
        this.recommendPhones = res.data[0].products.slice(2,8);
      })
      .catch(()=>{
        this.loadStatus = 3
      })
    }
     
  }
};
</script>

<style lang="scss" scoped>
div.recommend-page {
  width: 375px;
  overflow: hidden;
  position: absolute;
  top: 77px;
  left: 0;
  .swipe-container {
    .van-swipe {
      width: 375px;
      height: 186px;
      .van-swipe-item {
        a{
          display: block;
        }
        img {
          width: 375px;
          height: 185px;
        }
      }
    }
  }
  .recommend-nav {
    margin-top: -2px;
    .recommend-nav-top,
    .recommend-nav-bottom {
      display: flex;
      a {
        height: 75px;
        img {
          width: 75px;
          height: 75px;
        }
      }
    }
     
  }
  .recommend-content {
    //三个推荐
    .recommend-common {
      padding-top: 8px;
      display: flex;
      a {
        display: block;
      }
      .recommend-common-left {
        width: 50%;

        img {
          width: 187.5px;
          height: 266px;
        }
      }
      .recommend-common-right {
        width: 187.5px;
        height: 266px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        img {
          width: 187.5px;
          height: 132px;
        }
      }
    }
    .recommend-phones {
      .recommend-hot-phone {
        a {
          display: block;
          img {
            width: 375px;
            height: 240px;
          }
        }
      }
      .recommend-phone-list {
        width: 375px;
        overflow: hidden;
        display: flex;
        flex-wrap: wrap;
        background-color: #fff;
        .recommend-phone-item {
          width: 185.5px;
          height: 260px;
          padding: 5px;
          box-sizing: border-box;
          border: 1px solid #f5f5f5;
          .phone-item-top {
            
            .van-image {
              overflow: hidden;
            }
          }
          .phone-item-bottom {
            padding-top: 12px;

            p.text-item {
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
              height: 18px;
              line-height: 18px;
              text-align: center;
            }
            p.phone-name {
              font-weight: 500;
              color: #333;
            }
            p.phone-description {
              font-weight: 300;
              font-size: 12px;
            }
            p.phone-price {
              span.phone-price-text {
                color: rgb(234, 98, 91);
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
        }
      }
    }
    .recommend-category {
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      a {
        display: block;
        height: 250px;
        padding-bottom: 2px;
        img {
          width: 186.5px;
          height: 250px;
        }
      }
    }
    .recommend-refresh{
      padding-top: 10px;
      a{
        display: block;
      }
      img{
        width: 100%;
        height: 145px;
      }
    }
    .recommend-intelligences{
      .recommend-hot{
        a{
          img{
            height: 144px;
          }
        }
      }
    }
    //公共属性
    .recommend-hot {
      background-color: #f5f5f5;
      padding: 5px 0;
      a {
        display: block;
        img {
          width: 375px;
          height: 240px;
        }
      }
    }
    .link-more-box {
      width: 100%;
      height: 60px;
      line-height: 60px;
      text-align: center;
      font-size: 16px;
      a {
        display: block;
      }
    }
  }
}
</style>