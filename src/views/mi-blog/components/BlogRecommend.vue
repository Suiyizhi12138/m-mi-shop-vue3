<template>
  <div class="recommend">
    <div class="image-header">
      <img
        src="https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/f991a2e43b128bdb6eaaa22172e71e57.jpg"
        alt
      />
    </div>
    <div class="comment-item" v-for="item in 10">
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
            <img src="../../../assets/images/menu.png" alt />
          </a>
        </div>
      </div>
      <!-- 评论 -->
      <div class="comment-content">
        <p>很喜欢k40游戏这个带感的视频，有点意思，搅局小能手</p>
      </div>
      <!-- 评论图片 -->
      <div class="comment-image">
        <img
          src="https://cdn.fds-ssl.api.xiaomi.com/b2c-data-mishop/475e473e83ab62243f3486e40091f5aa.jpg"
          alt
        />
      </div>
      <!-- 评论视频 -->
      <div class="comment-video"></div>
      <!-- 评论标签 -->
      <div class="comment-tag flex-start">
        <div class="tag-phone flex-start">
          <img
            src="https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/12f6da4120f3953816e543be83fd3d30.png?w=800&h=800"
            alt="mini-phone-img"
          />
          RedmiK40
        </div>
        <div class="phone-type flex-start">
          <img src="https://m.mi.com/static/img/huati.d947499711.png" alt class="img-#" />
          Redmi游戏手机
        </div>
      </div>
      <!-- 评论的回复 -->
      <div class="comment-comment">
        <div class="comment-header">
          <span class="comment-sayer">
          往事随风:
          </span>
          <span class="comment-message">
          天玑1200属实拉胯
          </span>
        </div>
        <div class="comment-btn-box">
          <div class="btn-item btn-share">
             <img src="../../../assets/images/mi-blog/share.png" alt="">
          </div>
          <div class="btn-item flex-start">
            <img src="../../../assets/images/mi-blog/message.png" alt="">
            <p>{{38}}</p>
          </div>
          <div class="btn-item  flex-start">
            <img src="../../../assets/images/mi-blog/hand.png" alt="">
            <p>{{1809}}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.recommend {
  overflow: hidden;
  .image-header {
    height: 138px;
    padding: 16px;
    img {
      height: 138px;
      border-radius: 10px;
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
        .user-name,
        .user-phone {
          width: 100px;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
        .user-name {
          color: #333;
        }
        .user-phone {
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
    .comment-content {
      line-height: 30px;
      color: #333;
      font-size: 16px;
    }
    .comment-image {
      position: relative;
      img {
        width: 345px;
        height: 194px;
        border-radius: 10px;
      }
      &::after {
        content: "";
        background: url(https://m.mi.com/static/img/play.d0cae3f313.png) no-repeat;
        background-position: center;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translateX(-50%) translateY(-50%);
        width: 200px;
        height: 200px;
        z-index: 3;
        background-size: 30px 30px;
      }
    }
    .comment-tag{
      
      .tag-phone,.phone-type{
        img{
          width: 8px;
          height: 9px;
          margin-right: 5px;
        }
        
        height: 18px;
        background-color: #f5f5f5;
        font-size: 10px;;
        color: #666;
        margin-left: 16px;
        border-radius: 2px;
        
      }
    } 
    .comment-comment{
      .comment-header{
        height: 28px;
        margin-top: 16px;
        line-height: 28px;
        background-color: #f5f5f5;
        padding-left: 16px;
        .comment-sayer{
          color: #999;
        }
        .comment-message{
          color: #333;
        }
      }
      .comment-btn-box{
        width: 375px;
        margin-top: 16px;
        height: 30px;
        display: flex;
        justify-content: space-around;
        align-items: center;
        .btn-item{
          height: 30px;
          justify-content: center;
          img{
            width: 24px;
            height: 24px;
          }
          p{
            width: 20px;
            height: 20px;
            line-height: 20px;;
          }
        }
       
      }
    }
    .comment-content{

    }

  }
}
</style>