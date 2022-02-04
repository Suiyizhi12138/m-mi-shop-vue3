<template>
  <div class="order-page">
    <common-header :title="'我的订单'"></common-header>
    <nav class="order-header">
      <ul class="nav-list flex-start">
        <li class="nav-item">
          <a href="javascript:" class="btn-nav">
            全部
          </a>
        </li>
        <li class="nav-item">
          <a href="javascript:" class="btn-nav">
            待付款
          </a>
        </li>
        <li class="nav-item">
          <a href="javascript:" class="btn-nav">
            待收货
          </a>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
import CommonHeader from '@/components/common/CommonHeader'
export default {
  components: {
    CommonHeader
  }
}
</script>

<style lang="scss" scoped>
  .order-page{
    .order-header{
      .nav-list{
        .nav-item{
          line-height: 40px;
          flex: 1;
        }

      }
      
    }
  }
</style>