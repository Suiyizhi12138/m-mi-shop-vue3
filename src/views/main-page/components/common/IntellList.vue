<template>
  <ul class="hot-list">
    <li class="hot-item" v-for="item in intellProducts.slice(0,3)" :key="item.id">
      <router-link :to="'/product/'+item.id">
        <div class="hot-item-top">
          <van-image :src="item.image_url" alt lazy-load height="29.3vw"></van-image>
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
          </p>-->
        </div>
      </router-link>
    </li>
  </ul>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.hot-list {
  display: flex;
  flex-wrap: wrap;
  .hot-item {
    display: flex;
    flex-direction: column;
    width: 123px;
    height: 177px;
    border: 1px solid #f5f5f5;

    .hot-item-top {
      width: 123px;
      height: 110px;

      background-color: #fff;
      .van-image {
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
    a {
      display: block;
      margin: 0 auto;
      img {
        display: block;
        height: 96px;
        max-width: 110px;
        margin: auto;
      }
    }
  }
}
</style>