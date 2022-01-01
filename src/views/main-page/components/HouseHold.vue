<template>
  <div class="household-page">
    <div class="head-img">
      <img src="https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/5a56b920bc83820736d2260c58858bf4.jpg?f=webp" alt="">
    </div>
    <div class="household-container">
      <div class="household-title">
        <img src="https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/206eeb5a11b27d97cec3f2b2c053a083.jpg?f=webp" alt="">
      </div>
      <div class="household-content">
        <ul class="hot-list">
          <li class="hot-item" v-for="item in recommendIceBoxs.slice(0,3)" :key="item.id">
            <router-link :to="'/product/'+item.id">
              <div class="hot-item-top">
                <img :src="item.image_url" alt />
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
    <div class="household-container">
      <div class="household-title">
        <img src="https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/206eeb5a11b27d97cec3f2b2c053a083.jpg?f=webp" alt="">
      </div>
      <div class="household-content">
        <ul class="hot-list">
          <li class="hot-item" v-for="item in recommendIceBoxs.slice(0,3)" :key="item.id">
            <router-link :to="'/product/'+item.id">
              <div class="hot-item-top">
                <img :src="item.image_url" alt />
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
    <div class="household-container">
      <div class="household-title">
        <img src="https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/206eeb5a11b27d97cec3f2b2c053a083.jpg?f=webp" alt="">
      </div>
      <div class="household-content">
        <ul class="hot-list">
          <li class="hot-item" v-for="item in recommendIceBoxs.slice(0,3)" :key="item.id">
            <router-link :to="'/product/'+item.id">
              <div class="hot-item-top">
                <img :src="item.image_url" alt />
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
  props:{
   
  },
  data(){
    return {
      recommendIceBoxs: [],
      washMachines: []
    }
  },
  methods:{
    filterCategory(arr,name){
      return arr.filter((item)=>{
       
        return item.zh_name == name.trim() 
      })
    }
  },
  mounted(){
    if(!(Array.isArray(this.recommendIceBoxs)&&this.recommendIceBoxs.length>0)){
      FetchAPI.getAllCategories()
      .then((res)=>{
        let categoryIceBox = this.filterCategory(res.data,'冰箱')
        
        
        this.recommendIceBoxs = categoryIceBox[0].products
       
        
      })
    }
  }
  
}
</script>

<style lang="scss" scoped>
  .household-page{
    position: absolute;
    top: 77px;
    background-color: rgb(255,65,57);
    overflow: hidden;
    .head-img{
      img{
        width: 375px;
        height: 60px;
      }
    }
    .household-container{
      .household-title{
        img{
          height: 60px;
        }
      }
      .household-content{
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
    }
    .fill-bottom{
      height: 60px;
    }
  }
</style>