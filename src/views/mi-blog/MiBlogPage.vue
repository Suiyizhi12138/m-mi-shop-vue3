<template>
  <div class="mi-blog-page">
    <div class="blog-header flex-start">
      <div class="header-left">
        <div class="avatar-box flex-center">
          <img src="http://i8.mifile.cn/b2c-mimall-media/fa83661ee38a1495b26a59e73ae15eb3.png" alt />
        </div>
        <div class="btn-box flex-start">
          <div class="link-star-box">
            <a href="javascript:" @click="switchComponent(1)" :class="{'btn-active': activeIndex==1}">关注</a>
          </div>
          <div class="link-recommend-box flex-start">
            <a href="javascript:" @click="switchComponent(2)" :class="{'btn-active': activeIndex==2}">推荐</a>
          </div>
        </div>
      </div>
      <div class="header-right flex-start">
        <div class="link-box" style="padding-bottom:2px">
          <router-link to='/'>雷军超大杯</router-link>
        </div>
        <div class="bell-box flex-start">
          <div>|</div>
          <div class="bell">
            <img src="../../assets/images/mi-blog/small_bell.png" alt="aaa" />
          </div>
        </div>
      </div>
    </div>
    <blog-recommend v-show="activeIndex==2"></blog-recommend>
    <blog-star v-show="activeIndex==1"></blog-star>
  </div>
</template>

<script>
import BlogRecommend from './components/BlogRecommend'
import BlogStar from './components/BlogStar'
import { reactive,toRefs } from 'vue'
import { useRouter }  from 'vue-router'
export default {
  components: {
    BlogRecommend,
    BlogStar
  },
  setup(){
    const state = reactive({
      activeIndex: 1    
    })
    const switchComponent = (index) => {
      state.activeIndex = index;
    }
    return {
      ...toRefs(state),
      switchComponent
    }
  }
};
</script>

<style lang="scss" scoped>
.mi-blog-page {
  .blog-header {
    .header-left {
      display: flex;
      justify-content: center;
      height: 40px;
    }
    .header-right {
      height: 40px;
    }
  }
  .avatar-box {
    img {
      width: 30px;
      height: 30px;
      border-radius: 50%;
    }
    width: 50px;
  }
  .btn-box {
    position: relative;
    a {
      font-size: 18px;
      font-weight: 900;
      color: #999;
      width: 80px;
      display: inline-block;
      padding-bottom: 5px;
    }
    a.btn-active{
      color: #333;
      &::after{
        content: '';
        width: 10px;
        height: 2px;
        background-color: #333;
        position: absolute;
        bottom: 0px;
        left: 50%;
        transform: translateX(-50%);
      }
    }
    
    .link-star-box {
      position: relative;
    }
    .link-recommend-box {
      position: relative;
    }
  }
  .link-box {
    width: 122px;
    font-size: 18px;
    font-weight: 900;
    a {
      color: #999;
    }
  }
  .bell-box {
    img {
      width: 40px;
      height: 40px;
    }
  }
  .comment-item {
    padding: 0 16px;
    text-align: left;
    .comment-header-left {
      .user-avatar {
        img {
          height: 30px;
          width: 30px;
          border-radius: 50%;
        }
      }
      .user-info {
        text-align: left;
        margin-left: 10px;
        .user-name,.user-phone{
          width: 100px;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
        .user-name{
          color: #333;
        }
        .user-phone{
          width: 100px;

          color: #999;
        }
      }
    }
    .comment-header-right {
      img {
        width: 20px;
        height: 20px;
      }
    }
    .comment-content{
      line-height: 50px;
      color: #333;
      font-size: 16px;;
    }
  }
}
</style>