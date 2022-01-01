import { createRouter, createWebHashHistory } from 'vue-router'


const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/HomePage'),
    redirect: '/home',
    meta:{
      title:'小米官方网站'
    },
    children: [
      {
        path: '/home',
        name: '_home',
        component: () => import('@/views/main-page/MainPage'),
        
      },
      {
        path: 'category',
        name:'category',
        component: () => import('@/views/category/CategoryPage'),
        meta: {
          title: '分类'
        }
      },
      {
        path: 'mi-blog',
        name: 'mi_blog',
        component: () => import('@/views/MiBlogPage'),
        meta: {
          title: '米圈'
        }

      },
      {
        path:'user',
        name:'user',
        component: () => import('@/views/UserPage'),
        meta: {
          title: '用户中心'
        }

      }
    ]
  },
  {
    path: '/test',
    name: 'test',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '@/views/Test.vue'),
    meta: {
      title: '测试页'
    }
  },
  {
    path: '/cart',
    name: 'cart',
    component: () => import('@/views/CartPage'),
    meta: {
      title: '购物车'
    }
  },
  {
    path: '/search',
    name: 'search',
    component: () => import('@/views/search/SearchPage.vue'),
    meta: {
      title: '搜索商品'
    }
  },
  //商品详情页
  {
    path: '/product/:id',
    name: 'product',
    component: () => import('@/views/product/ProductPage'),
    meta: {
      title: '商品详情页'
    }
  }
  //用户登录页
  {
    path: 'user/login',
    name: 'user_login',
    component: () => import('@/views/user/UserLogin.vue'),
    meta: {
      title: '登录'
    }
  },
  {
    path: '/user/register',
    name: 'user_register',
    compoennt: () => import('@/views/user/UserRegister.vue')

  }
  
  
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
