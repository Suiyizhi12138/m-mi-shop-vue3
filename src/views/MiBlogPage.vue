<template>
  <div class="mi-blog-page">
    <div class="blog-header flex-start">
      <div class="avatar-box">
        <img src="http://i8.mifile.cn/b2c-mimall-media/fa83661ee38a1495b26a59e73ae15eb3.png" alt="">
      </div>
      <div class="btn-box">
        <router-link to="/mi-blog/star">关注</router-link>
        <router-link to="/mi-blog/recommend">推荐</router-link>
      </div>
      <div class="link-box">
        <router-link to="">雷军超大杯</router-link>
      </div>
      <div class="bell-box">
        <div>|</div>
        <div class="bell"></div>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  .mi-blog-page{

  }
  .blog-header{

  }
}
</script>

<style>

</style>