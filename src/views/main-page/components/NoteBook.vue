<template>
  <div class="notebook-page">
    <div class="notebook-container">
      <div class="notebook-title">
        <img
          src="https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/1bc92bd7fdb80c023c6887ae4f419e71.jpg?f=webp"
          alt
        />
      </div>
      <div class="notebook-item">
        <router-link to="/">
          <img class="notebook-img"
            src="https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/b40029067abdfcc40bb6bde90b5d95d8.jpg?thumb=1&w=696&h=436"
            alt
          />
          <div class="notebook-info">
            <div class="info-top">
              <span class="notebook-name">Redmibook Air 13</span>
              <span class="notebook-price">￥5199起<small v-show="false">￥5200</small></span>
            </div>
            <div class="info-bottom">
              <span class="notebook-description">打开它就像打开一本杂志一样</span>
              <button class="btn-buy">立即购买</button>
            </div>
          </div>
        </router-link>
      </div>
      <div class="notebook-item">
        <router-link to="/">
          <img class="notebook-img"
            src="https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/84771bd0e6146ecbb6479735a4263ed5.jpg?thumb=1&w=696&h=436"
            alt
          />
          <div class="notebook-info">
            <div class="info-top">
              <span class="notebook-name">小米显示器 27英寸 165Hz版</span>
              <span class="notebook-price">￥1800起<small v-show="false">￥2199</small></span>
            </div>
            <div class="info-bottom">
              <span class="notebook-description">超广色域震撼影音，超清高刷畅爽电竞</span>
              <button class="btn-buy">立即购买</button>
            </div>
          </div>
        </router-link>
      </div>
      <div class="notebook-title">
        <img
          src="https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/6a6c6904c72672a67f1ddb6d4938d414.jpg?f=webp"
          alt
        />
      </div>
      <product-list :products="recommendNotebooks"></product-list>
      <div class="notebook-title" style="padding-bottom:0">
        <img
          src="https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/aeb37b208fc7303d6a6e16b57e4e1942.jpg?f=webp"
          alt
        />
      </div>
      <div class="notebook-title" style="padding-top:0">
        <img
          src="https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/e320df8ff307626d984f1708d3c961f2.jpg?f=webp"
          alt
        />
      </div>
      <div class="notebook-nav">
        <div class="nav-title">
          <img src="https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/ed0de51cddbd973e1ac2e27ba05a0693.jpg?f=webp" alt="">
        </div>
        <ul class="nav-list">
          <li class="nav-item" v-for="item in 6" :key="item">
            <router-link to="/">
              <img src="https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/0d1ffaea355ab590ee88a48c9ab1ef0f.jpg?f=webp" alt="">
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
import ProductList from './common/ProductList'
export default {
  props: {
   
  },
  components: {
    ProductList
  },
  data(){
    return {
      recommendNotebooks: []
    }
  },
  mounted(){
    if(!(Array.isArray(this.recommendNotebooks)&&this.recommendNotebooks.length>0)){
      FetchAPI.getAllCategories()
      .then((res)=>{
        this.recommendNotebooks = res.data[0].products
      })
    }
  }
};
</script>

<style lang="scss" scoped>
div.notebook-page {
  width: 375px;
  position: absolute;
  top: 77px;
  background-color: rgb(72, 120, 166);
  overflow: hidden;
  .notebook-container {
    .notebook-title {
      padding: 10px 0;
      img {
        height: 42px;
        width: 100%;
        
      }
    }
    .notebook-item{
      display: flex;
      flex-direction: column;
      .notebook-img{
        display: block;
        width: 363px;
        height: 227px;
        margin: 0 auto;
      }
      .notebook-info{
        background-color: #fff;
        width: 363px;
        height: 74px;
        margin: 0 auto;
        padding: 15px;
        box-sizing: border-box;
        .info-top{
          display: flex;
          justify-content: space-between;
          align-items: center;
          height: 20px;
          line-height: 20px;
          text-align: cneter; 
          .notebook-name{
            font-weight: noraml;
            font-size: 18px;
            color: #000;
          }
          .notebook-price{
            font-size: 14px;
            color: rgb(234,98,91);
           small{
              color: #999;
              text-decoration: line-through;

            }
          }
        }
        .info-bottom{
          display: flex;
          justify-content: space-between;
          align-items: center;
          span{
            font-size: 12px;
          }
          .btn-buy{
            width: 105px;
            height: 30px;
            text-align: center;
            color: #fff;
            background-color: rgb(234,98,91);
            border: none;
            border-radius: 2px;
            
          }
        }
      }
    }
    .notebook-nav{
      .nav-title{
        img{
          width: 375px;
          height: 40px;
        }
      }
      .nav-list{
        display: flex;
        flex-wrap: wrap;
        background-color: #fff;
        overflow: hidden;
        .nav-item{
          box-sizing: border-box;
          width: 187.5px;
          height: 81px;
          a{
            display: block;
          }
          img{
            display: block;
            margin:0 auto;
            max-width: 180px;
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