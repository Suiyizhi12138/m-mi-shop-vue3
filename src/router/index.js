import { createRouter, createWebHashHistory, useRouter } from 'vue-router'

const testLoginAndNext = (nextFunc) => {
  if (localStorage.getItem('_user_token')) {
    nextFunc()
  } else {
    nextFunc({ name: 'user_login' })
  }
}
const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/HomePage'),
    redirect: '/home',
    meta: {
      title: '小米官方网站'
    },
    children: [
      {
        path: '/home',
        name: '_home',
        component: () => import('@/views/main-page/MainPage'),
      },
      {
        path: 'category',
        name: 'category',
        component: () => import('@/views/category/CategoryPage'),
        meta: {
          title: '分类'
        }
      },
      {
        path: 'user',
        name: 'user',
        component: () => import('@/views/user/UserHome'),
        meta: {
          title: '用户中心'
        },
        beforeEnter(to, from, next) {
          testLoginAndNext(next)
        }

      },
      //米圈
      { 
        path: 'mi-blog',
        name: 'mi_blog',
        component: () => import('@/views/mi-blog/MiBlogPage'),
        children: [
          {
            path: 'star',
            name: 'blog_star',
            component: () => import('@/views/mi-blog/components/BlogStar')
          },
          {
            path: 'recommend',
            name: 'blog_recommend',
            component: () => import('@/views/mi-blog/components/BlogRecommend')
          }
        ]
      },

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
    component: () => import('@/views/cart/CartPage'),
    meta: {
      title: '购物车'
    },
    beforeEnter(to, from, next) {
      if (localStorage.getItem('_user_token')) {
        next()
      } else {
        next({ name: 'user_login' })
      }
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
  },
  //用户登录页
  {
    path: '/user/login',
    name: 'user_login',
    component: () => import('@/views/user/UserLogin.vue'),
    meta: {
      title: '登录'
    }
  },
  {
    //用户设置页
    path: '/user/set',
    name: 'user_set',
    component: () => import('@/views/user/UserSet'),
    meta: {
      title: '个人中心'
    },
    beforeEnter(to, from, next) {
      testLoginAndNext(next)
    }
  },
  {
    //用户地址管理
    path: '/user/address',
    name: 'user_address',
    component: () => import('@/views/user/UserAddress'),
    meta: {
      title: '收货地址管理'
    },

  },
  {
    //添加新地址
    path: '/user/address/new',
    name: 'new_address',
    component: () => import('@/views/user/UserAddressNew'),
    meta: {
      title: '添加新的收货地址'
    }
  },
  {
    path: '/user/register',
    name: 'user_register',
    component: () => import('@/views/user/UserRegister'),
    meta: {
      title: '注册'
    }
  },
  //订单页
  {
    path: '/order',
    name: 'order',
    component: () => import('@/views/order/OrderPage'),
    meta: {
      title: '我的订单'
    },
    beforeEnter(to, from, next) {
      testLoginAndNext(next)
    }
  },
  //确认订单页
  {
    path: '/check_order',
    name: 'check_order',
    component: () => import('@/views/order/CheckOrder'),
    meta: {
      title: '确认订单'
    },
    beforeEnter(to, from, next) {
      testLoginAndNext(next)
    }
  },
  //支付订单页
  {
    path: '/pay_order/:no',
    name: 'pay_order',
    component: () => import('@/views/pay/PayOrder'),
    meta: {
      title: '支付订单'
    },
    beforeEnter(to, from, next) {
      testLoginAndNext(next)
    }
  },






]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
