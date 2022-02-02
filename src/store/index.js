import { createStore } from 'vuex'
import FetchAPI from '@/utils/fetchApi'
export default createStore({
  state: {
    userLoginStatus: 0,
    cartItems: [],
    cartTotalAmount: 0,//购物车总件数
    userInfo: null,//用户个人信息
    selectedDistirct: '',//选择的地区、街道信息
    buyItems: '',//要购买的订单项
  },
  mutations: {
    setUserLoginStatus(state, status) {
      state.userLoginStatus = status
    },
    setCartItems(state, data) {
      state.cartItems = data
    },
    setUserInfo(state,info){
      state.userInfo = info
    },
    setDistrict(state,district){
      state.selectedDistirct = district
    },
    setBuyItems(state,items){
      state.buyItems = items
    }
  },
  actions: {
    checkUserLoginstatus({ commit }) {
      if (localStorage.getItem('_user_token')) {
        commit('setUserLoginStatus', 2)
      }
    },
    //获取购物车信息
    getCartItems({ commit }) {
      //如果本地信息存在直接获取
      if (localStorage.getItem("_full_cart")) {
        commit('setCartItems', JSON.parse(localStorage.getItem('_full_cart')))
      } else {
        //否则线上获取
        FetchAPI.getCartItems()
          .then((res) => {
            commit('setCartItems', res.data)
          })
          .catch(e => {
            console.log('获取购物车信息失败' + e)
          })
      }

    },
    //获取用户信息
    getUserInfo({commit}){
      FetchAPI.getUserInfo()
      .then((res)=>{
        commit('setUserInfo',res.data)
      })
      .catch((e)=>{
        console.log(e)
      })
    },
    //获取地区信息
    keepSelectedDistrict({commit},district){
      commit('setDistrict',district)
    },
    //保存购物车项目以提交到结算订单页
    saveBuyItems({commit},items){
      commit('setBuyItems',items)
      localStorage.setItem('_buy_items',JSON.stringify(items))
    }
  },
  getters: {
    userLoginStatus(state) {
      return state.userLoginStatus
    },
    cartItems(state) {
      return state.cartItems
    },
    cartTotalAmount(state){
      //计算总件数
      let totalAmount = 0
      state.cartItems.forEach((item)=>{
        totalAmount += item.amount
      })
      return totalAmount
    },
    userInfo(state){
      return state.userInfo
    },
    selectedDistirct(state){
      return state.selectedDistirct
    },
    buyItems(state){
      return state.buyItems
    }
  }

})
