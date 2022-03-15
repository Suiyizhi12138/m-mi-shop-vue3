import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { Button, Col, Row, Dialog, Popup, Loading, PullRefresh, Swipe, SwipeItem, Lazyload,Toast,Area } from 'vant'
import { DropdownMenu, DropdownItem, RadioGroup, Radio } from 'vant'
import { Sticky } from 'vant'
import { Image as VanImage } from 'vant'
import axios from 'axios'
import "animate.css"

//动态设置title
router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title
    next()
  }
})
//跳转路由后自动到顶部
router.afterEach(()=>{
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
});

//配置axios默认请求头
if (localStorage.getItem('_user_token')) {
  axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('_user_token');
  //拦截response 判断是否登录过期
  axios.interceptors.response.use(
    response => {
      return response;
    },
    error => {
      if (error.response) {
        switch (error.response.status) {
          case 401: router.replace({
            path: '/user/login',
          });

        }
      }
      return Promise.reject(error.response)
    }
  )
}



createApp(App)
  .use(Button)
  .use(Col)
  .use(Row)
  .use(Dialog)
  .use(Popup)
  .use(Loading)
  .use(PullRefresh)
  .use(Swipe)
  .use(SwipeItem)
  .use(VanImage)
  .use(Lazyload)
  .use(Sticky)
  .use(DropdownMenu)
  .use(DropdownItem)
  .use(RadioGroup)
  .use(Radio)
  .use(Toast) 
  .use(Area)

  .use(store)
  .use(router)
  .mount('#app')
