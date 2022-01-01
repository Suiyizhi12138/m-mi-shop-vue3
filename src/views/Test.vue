<template>
  <div class="about">
    <h1>This is an test page</h1>
    <div class="box">
      <p style="font-size:5vw">Box content</p>
    </div>
    <van-button type="warning" @click="toast">默认按钮</van-button>
    <a href="https://www.baidu.com">百度</a>
    <ul>
      <li>1</li>
      <li>2</li>
      <li>3</li>
    </ul>
    <input type="text" placeholder="hhh">
    <textarea name="" id="" cols="30" rows="10"></textarea>
    <hr>
    <van-button @click="showItemOne">one</van-button>
    <van-button @click="showItemTwo">two</van-button>
    <div class="swipe">
      <div class="swipe-item swipe-item-one" :class="{'item-active':isItemOne}">第一个div</div>
      <div class="swipe-item swipe-item-two" :class="{'item-active':isItemTwo}">第二个div</div>
    </div>
    <h3>测试图片懒加载</h3>
    <van-image src="https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/b40029067abdfcc40bb6bde90b5d95d8.jpg?thumb=1&w=696&h=436" lazy-load></van-image>
    <div style="height: 100"></div>
  </div>
</template>
<script>
  import { Button,Toast } from 'vant'
  
  import 'vant/es/toast/style/index'
  
import 'vant/es/button/style';
  import { reactive } from 'vue'
  import FetchAPI from '@/utils/fetchApi'
  export default{
    data(){
      return{
        isItemOne: false,
        isItemTwo: false
      }
    },
    setup(){
      const toast = ()=>{
        Toast.loading('loading')
      }

      return {
        toast
      }
    },
    mounted(){
      FetchAPI.getAllCategories().then((res)=>{
        console.log(res.data)
      })
    },
    components:{
      [Button.name]: Button,
      [Toast.name]: Toast
    },
    methods:{
      showItemOne(){
        this.isItemOne = true;
        this.isItemTwo = false;
      },
      showItemTwo(){
        this.isItemOne = false;
        this.isItemTwo = true;
      }
    }
  }
</script>
<style lang="scss" scoped>
  $main-color: #ff6700;
  div.about{
    h1{
      color: $main-color;    
    }
    .box{
      width: 375px;
      height: 375px;
      background-color: #666;
    }
  }
  .swipe-item{
    transition: all .5s ease;
    width: 100px;
    height: 100px;
    background-color: green;
   
  }
  .item-active{
    width: 200px;
    height: 200px;
    opacity: 1;
    background-color: red;
  }
</style>
