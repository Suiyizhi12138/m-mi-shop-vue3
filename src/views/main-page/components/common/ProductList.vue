<template>
  <ul class="recommend-phone-list">
    <li class="recommend-phone-item" v-for="phone in products.slice(0,2)" :key="phone.id">
      <router-link :to="'/product/'+phone.id">
        <div class="phone-item-top">
          <img :src="phone.image_url" alt />
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
</template>

<script>
export default {
  props: {
   products: {
      type: Array,
      required: true
    }
  }
};
</script>

<style lang="scss" scoped>
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
</style>