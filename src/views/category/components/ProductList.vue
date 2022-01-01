<template>
  <div>
    <div class="header-img">
      <router-link :to="'/product/'+headId">
        <img :src="headImg" alt="img-xiaomi-12" />
      </router-link>
    </div>
    <div class="product-list-box">
     
      <ul class="product-list xiaomi-list">
        <li class="product-item" v-for="item in products" :key="item.id">
          <router-link :to="'/product/'+item.id">
            <div class="product-img">
              <img :src="item.image_url" :alt="'img:'+item.zh_name" />
            </div>
            <div class="product-info">
              <h3 class="product-name">
                <span class="name-text">{{item.zh_name}}</span>
              </h3>
              <p class="product-price">
                <span class="price-text">￥{{item.price}}起</span>
              </p>
            </div>
          </router-link>
        </li>
      </ul>
      <!-- <ul class="recommend-list">
                <li class="recommend-item">
                  <router-link to></router-link>
                </li>
      </ul>-->
    </div>
  </div>
</template>

<script>
export default {
  props: {
    products: {
      type: Array,
      required: true
    },
    headImg: {
      type: String,
      required: true
    },
    headId: {
      type: Number,
      required: true
    }
  }
};
</script>

<style lang="scss" scoped>
.header-img {
  overflow: hidden;
  padding: 0 10px;
  height: 84px;
  display: flex;
  align-items: center;
  img {
    height: 77px;
    width: 262px;
    border-radius: 5px;
    margin-top: 3px;
  }
}
.product-list-box {
  margin-top: 20px;
  padding: 0 12px;
  margin-bottom: 100px;
  .product-list-title {
    text-align: left;
    margin-bottom: 6px;
    font-weight: 700;
    font-size: 16px;
  }
  .product-list {
    overflow: hidden;
    .product-item {
      overflow: hidden;
      background-color: #f5f5f5;
      border-radius: 6px;
      margin-bottom: 12px;
      a {
        display: flex;
        justify-content: flex-start;
        .product-img {
          height: 78px;
          width: 107px;
          img {
            display: block;
            height: 74px;
            width: auto;
            
            margin: 2px auto 0;
          }
        }
        .product-info {
          height: 42px;
          margin-top: 18px;
          display: flex;
          justify-content: space-between;
          flex-direction: column;
          text-align: left;
          .product-name {
            font-weight: normal;
            font-size: 14px;
          }
        }
      }
    }
  }
}
</style>