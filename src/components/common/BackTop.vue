<template>
  <a href="javascript:" @click="backTop()" class="btn-back-top" v-show="isShowBackTop">
    <img src="../../assets/icon/top.png" alt="">
  </a>
</template>

<script>
export default {
  data(){
    return {
      isShowBackTop: false
    }
  },
  methods: {
    backTop(){
      window.scrollTo(0,0)
    },
    watchScroll(){
      if(document.body.scrollTop||document.documentElement.scrollTop > 1000){
        this.isShowBackTop = true
      }else{
        this.isShowBackTop = false
      }
    }
  },
  mounted(){
    window.addEventListener('scroll',() => {
      this.watchScroll()
    })
  }
}
</script>

<style lang="scss" scoped>
  .btn-back-top{
    position: fixed;
    display: block;
    z-index: 99;
    bottom: 70px;
    right: 12px;
    img{
      width: 40px;
      height: 40px;
    }
  }
</style>