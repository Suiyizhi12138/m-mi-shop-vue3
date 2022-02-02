<template>
  <div class="user-set-page">
    <common-header :title="'个人中心'"></common-header>
    <div class="set-content">
      <ul class="set-list">
        <li class="set-item">
          <router-link to="/user/address" class="flex-between">
            <div class="item-left">地址管理</div>
            <div class="item-right">
              <i class="iconfont icon-arrowright"></i>
            </div>
          </router-link>
        </li>
        <hr>
        <li class="set-item">
          <router-link to="/user/address" class="flex-between">
            <div class="item-left">经营证照</div>
            <div class="item-right">
              <i class="iconfont icon-arrowright"></i>
            </div>
          </router-link>
        </li>
        <hr>
        <li class="set-item">
          <router-link to="/user/address" class="flex-between">
            <div class="item-left">协议规则</div>
            <div class="item-right">
              <i class="iconfont icon-arrowright"></i>
            </div>
          </router-link>
        </li>
        <hr>
        <li class="set-item">
          <router-link to="/user/address" class="flex-between">
            <div class="item-left">隐私管理</div>
            <div class="item-right">
              <i class="iconfont icon-arrowright"></i>
            </div>
          </router-link>
        </li>
        <hr>
        <li class="set-item">
          <router-link to="/user/address" class="flex-between">
            <div class="item-left">小米商城用户协议</div>
            <div class="item-right">
              <i class="iconfont icon-arrowright"></i>
            </div>
          </router-link>
        </li>
        <hr>
        <li class="set-item">
          <router-link to="/user/address" class="flex-between">
            <div class="item-left">小米商城隐私政策</div>
            <div class="item-right">
              <i class="iconfont icon-arrowright"></i>
            </div>
          </router-link>
        </li>
        <hr>
        <li class="set-item">
          <router-link to="/user/address" class="flex-between">
            <div class="item-left">小米账号使用协议</div>
            <div class="item-right">
              <i class="iconfont icon-arrowright"></i>
            </div>
          </router-link>
        </li>
        <hr>
        <li class="set-item">
          <router-link to="/user/address" class="flex-between">
            <div class="item-left">小米账号协议政策</div>
            <div class="item-right">
              <i class="iconfont icon-arrowright"></i>
            </div>
          </router-link>
        </li>
        <hr>
      </ul>
    </div>
    <footer class="footer flex-column">
      <div class="footer-btn" @click="logOut">退出登录</div>
    </footer>
  </div>
</template>

<script>
import CommonHeader from '@/components/common/CommonHeader'
import FetchAPI from '@/utils/fetchApi'
import { useRouter } from 'vue-router'
export default {
  components: {
    CommonHeader
  },
  setup(){
    const router = useRouter()
    const logOut = () => {
      FetchAPI.userLogOut()
      .then((res)=>{
        if(res.status==200){
          localStorage.removeItem('_user_token')
          router.push({name: 'home'})
        }
         
      })
    }
    return {
      logOut
    }
  }
}
</script>

<style lang="scss" scoped>
.user-set-page{
  .set-content{
    .set-list{
      .set-item{
        padding: 10px 8px;
        a{
          text-align: center;
          font-size: 16px;
          color: #333;
          div.item-right{
            i{
              font-size: 18px;
              color: #999;
            }
          }
        }
      }
      hr{
        border-top: 1px solid #eee;
      }
    }
  }
  .footer{
    position: fixed;
    bottom: 0px;
    width: 100%;
    height: 50px;
    .footer-btn{
      width: 100%;
      height: 50px;
      line-height: 50px;
      text-align: center;
      background-color: #f5f5f5;
    }
  }
}

</style>