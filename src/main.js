import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
//import 'vant/lib/index.css'
import { Button,Col,Row,Dialog,Popup,Loading,PullRefresh,Swipe,SwipeItem,Lazyload } from 'vant'
import { Sticky } from 'vant'
import { Image as VanImage } from 'vant'

//动态设置title
router.beforeEach((to,from,next)=>{
  if(to.meta.title){
    document.title = to.meta.title
    next()
  }
})

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

.use(store)
.use(router)
.mount('#app')
