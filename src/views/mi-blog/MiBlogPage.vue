<template>
  <div class="mi-blog-page">
    <div class="blog-header flex-start">
      <div class="header-left">
        <div class="avatar-box flex-center">
          <img src="http://i8.mifile.cn/b2c-mimall-media/fa83661ee38a1495b26a59e73ae15eb3.png" alt />
        </div>
        <div class="btn-box flex-start">
          <div class="link-star-box">
            <router-link to="/mi-blog/star" class="link-star">关注</router-link>
          </div>
          <div class="link-recommend-box flex-start">
            <router-link to="/mi-blog/recommend" class="link-recommend">推荐</router-link>
          </div>
        </div>
      </div>
      <div class="header-right flex-start">
        <div class="link-box" style="padding-bottom:2px">
          <router-link to >雷军超大杯</router-link>
        </div>
        
        <div class="bell-box flex-start">
          <div>|</div>
          <div class="bell">
            <img src="../../assets/images/mi-blog/small_bell.png" alt="aaa" />
          </div>
        </div>
      </div>
    </div>
    <router-view></router-view>
    <div class="comment-item">
      <div class="comment-header flex-between">
        <div class="comment-header-left flex-start">
          <div class="user-avatar">
            <img
              src="https://cdn.cnbj1.fds.api.mi-img.com/user-avatar/becb7ffb-bf68-4494-bcaf-02e2f8335215.jpg?thumb=150x150"
              alt
            />
          </div>
          <div class="user-info flex-column">
            <p class="user-name">pizimeng的黑科技</p>
            <p class="user-phone">Mi 10 Ultra</p>
          </div>
        </div>
        <div class="comment-header-right">
          <a href="javascript:">
            <img src="../../assets/images/menu.png" alt />
          </a>
        </div>
      </div>
      <!-- 评论 -->
      <div class="comment-content">
        <p>很喜欢k40游戏这个带感的视频，有点意思，，，，，，，，，，，，，，，，，，，，，，，，，，，，，，，，，，，，，，，，，，，，，，，，，，，，，，，，，，，，，，，，，，，，，，，，，，，，，，，，，，，，，，，，，，，，，，，，，，，，，，，，，，，，，，，，，，，，，，，</p>
      </div>
    </div>

    
  </div>
</template>

<script>
export default {};
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
    .router-link-active {
      color: #333;
      &::after {
        content: "";
        width: 10px;
        height: 2px;
        background-color: #333;
        border-radius: 5%;
        display: block;
        z-index: 1;
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