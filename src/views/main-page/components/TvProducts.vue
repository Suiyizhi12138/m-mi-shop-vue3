<template>
  <div class="television-page">
    <div class="tv-container">
      <div class="tv-title">
        <img src="https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/c0bcf1381f9a43f60b39b58e891f6daa.jpg?f=webp" alt="">
      </div>
      <div class="tv-content">
        <ul class="recommend-phone-list">
          <li class="recommend-phone-item" v-for="phone in recommendTvs.slice(0,2)" :key="phone.id">
            <router-link :to="'/product/'+phone.id">
              <div class="phone-item-top">
                <van-image :src="phone.image_url" alt lazy-load height="33.6vw" width="auto"/>
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
         <ul class="hot-list">
          <li class="hot-item" v-for="item in recommendTvs.slice(0)" :key="item.id">
            <router-link :to="'/product/'+item.id">
              <div class="hot-item-top">
                <van-image :src="item.image_url" alt lazy-load height="25.6vw" />
              </div>
              <div class="hot-item-bottom">
                <p class="text-item phone-name">{{item.zh_name}}</p>
                <p class="text-item phone-description">{{item.description}}</p>
                <p class="text-item phone-price">
                  <span class="phone-price-text">￥{{item.price-item.discount}}</span>
                  <del class="phone-discount">{{item.discount>0?'￥'+item.discount:''}}</del>
                </p>
                
              </div>
            </router-link>
          </li>
        </ul> 
      </div>
    </div>
    <div class="tv-container">
      <div class="tv-title">
        <img src="https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/c0bcf1381f9a43f60b39b58e891f6daa.jpg?f=webp" alt="">
      </div>
      <div class="tv-content">
        <ul class="recommend-phone-list">
          <li class="recommend-phone-item" v-for="phone in recommendTvs.slice(0,2)" :key="phone.id">
            <router-link :to="'/product/'+phone.id">
              <div class="phone-item-top">
                <van-image :src="phone.image_url" alt lazy-load height="33.6vw" width="auto"/>
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
         <ul class="hot-list">
          <li class="hot-item" v-for="item in recommendTvs.slice(0)" :key="item.id">
            <router-link :to="'/product/'+item.id">
              <div class="hot-item-top">
                <van-image :src="item.image_url" alt lazy-load height="25.6vw" />
              </div>
              <div class="hot-item-bottom">
                <p class="text-item phone-name">{{item.zh_name}}</p>
                <p class="text-item phone-description">{{item.description}}</p>
                <p class="text-item phone-price">
                  <span class="phone-price-text">￥{{item.price-item.discount}}</span>
                  <del class="phone-discount">{{item.discount>0?'￥'+item.discount:''}}</del>
                </p>
                
              </div>
            </router-link>
          </li>
        </ul> 
      </div>
    </div>
    <div class="tv-container">
      <div class="tv-title">
        <img src="https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/c0bcf1381f9a43f60b39b58e891f6daa.jpg?f=webp" alt="">
      </div>
      <div class="tv-content">
        <ul class="recommend-phone-list">
          <li class="recommend-phone-item" v-for="phone in recommendTvs.slice(0,2)" :key="phone.id">
            <router-link :to="'/product/'+phone.id">
              <div class="phone-item-top">
                <van-image :src="phone.image_url" alt lazy-load height="33.6vw" width="auto"/>
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
         <ul class="hot-list">
          <li class="hot-item" v-for="item in recommendTvs.slice(0)" :key="item.id">
            <router-link :to="'/product/'+item.id">
              <div class="hot-item-top">
                <van-image :src="item.image_url" alt lazy-load height="25.6vw" />
              </div>
              <div class="hot-item-bottom">
                <p class="text-item phone-name">{{item.zh_name}}</p>
                <p class="text-item phone-description">{{item.description}}</p>
                <p class="text-item phone-price">
                  <span class="phone-price-text">￥{{item.price-item.discount}}</span>
                  <del class="phone-discount">{{item.discount>0?'￥'+item.discount:''}}</del>
                </p>
                
              </div>
            </router-link>
          </li>
        </ul> 
      </div>
    </div>
    <div class="tv-container">
      <div class="tv-title">
        <img src="https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/c0bcf1381f9a43f60b39b58e891f6daa.jpg?f=webp" alt="">
      </div>
      <div class="tv-content">
        <ul class="recommend-phone-list">
          <li class="recommend-phone-item" v-for="phone in recommendTvs.slice(0,2)" :key="phone.id">
            <router-link :to="'/product/'+phone.id">
              <div class="phone-item-top">
                <van-image :src="phone.image_url" alt lazy-load height="33.6vw" width="auto"/>
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
         <ul class="hot-list">
          <li class="hot-item" v-for="item in recommendTvs.slice(0)" :key="item.id">
            <router-link :to="'/product/'+item.id">
              <div class="hot-item-top">
                <van-image :src="item.image_url" alt lazy-load height="25.6vw" />
              </div>
              <div class="hot-item-bottom">
                <p class="text-item phone-name">{{item.zh_name}}</p>
                <p class="text-item phone-description">{{item.description}}</p>
                <p class="text-item phone-price">
                  <span class="phone-price-text">￥{{item.price-item.discount}}</span>
                  <del class="phone-discount">{{item.discount>0?'￥'+item.discount:''}}</del>
                </p>
                
              </div>
            </router-link>
          </li>
        </ul> 
      </div>
    </div>
    <div class="fill-bottom"></div>
  </div>
</template>

<script>
import FetchAPI from '@/utils/fetchApi'
export default {
  data(){
    return {
      recommendTvs:[]
    }
  },
  props: {
    
    
  },
  mounted(){
    if(Array.isArray(this.recommendTvs)&&this.recommendTvs.length>0){
      return;
    }else{
      FetchAPI.getAllCategories()
      .then((res)=>{
        this.recommendTvs = res.data[2].products;
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  div.television-page{
    width: 375px;
    position: absolute;
    top: 77px;
    left: 0;
    
    background-color: #ffae99;
    overflow: hidden;
    div.tv-title{
     
        img{
          width: 375px;
          height: 60px;
        }
    
    }
    div.tv-content{
      .recommend-phone-list {
        width: 375px;
        overflow: hidden;
        display: flex;
        flex-wrap: wrap;
        //background-color: #fff;
        padding: 0 5px;
        .recommend-phone-item {
          width: 176.5px;
          height: 260px;
          padding: 5px;
          box-sizing: border-box;
          border-radius: 5px;
          //border: 1px solid #f5f5f5;
          background-color: #fff;
          margin: 3px;
          .phone-item-top {
            img {
              height: 126px;
              width: auto;
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
      .hot-list{
        display: flex;
        flex-wrap: wrap;
        
        padding: 0 5px;
        width: 375px;
        box-sizing: border-box;
        .hot-item{
          display: flex;
          flex-direction: column;
          width: 113px;
          height: 177px;
          border: 1px solid #f5f5f5;
          margin: 3px;
          overflow: hidden;
          background-color: #fff;
          border-radius: 5px;
          .hot-item-top{
            width: 113px;
            height: 110px;
            
            background-color: #fff;
            
          }
          .hot-item-bottom {
            width: 113px;
            box-sizing: border-box;
            padding: 12px 5px 0;
            overflow: hidden;
            p.text-item {
              //width: 115px;
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
    .fill-bottom{
      height: 60px;
    }
  }
</style>