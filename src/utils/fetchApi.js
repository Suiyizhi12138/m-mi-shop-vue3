import Axios from  'axios'
import Config from '@/config'
const apiUrl = Config.API_URL
const amapUrl = Config.AMAP_URL
const amapKey = Config.AMAP_KEY_WEB
//获取顶级推荐列表
const getAllTopCategories = ()=>{
  return Axios.get(Config.API_URL+'/alltopcategories')
}
const getAllCategories = () => {
  return Axios.get(Config.API_URL+'/allcategories')
}
//获取单个商品信息
const getProduct = (id) => {
  return Axios.get(Config.API_URL+'/product/'+id)
}
const postLogin = (data) => {
  return Axios.post(`${apiUrl}/login`,data)
}
const postRegister = (data) => {
  return Axios.post(`${apiUrl}/register`,data)
}
//通过关键词从高德地图中获取提示信息
const getDistrict = (searchKey)=>{
  return Axios.get(	amapUrl+'/assistant/inputtips?keywords='+searchKey+'&subdistrict=2&key='+amapKey);
}

/**************************************************
  登录后可进行操作

***************************************************/
//添加商品到购物车
const addToCart = (data) => {
  return Axios.post(`${apiUrl}/add`,data)
  
}
//获取购物车信息
const getCartItems = () => {
  return Axios.get(`${apiUrl}/get_cart_items`)
} 
//删除单个购物车项目
const deleteCartItem = (id) => {
  return Axios.delete(`${apiUrl}/delete_cart_item`,{data:{
    item_id: id
  }})
}
//获取用户信息
const getUserInfo = ()=>{
  return Axios.get(`${apiUrl}/userinfo`)
}

//获取收货地址信息
const getUserAddresses = () => {
  return Axios.get(`${apiUrl}/user_addresses`)
}

const userLogOut = () => {
  return Axios.post(`${apiUrl}/logout`)
}

//添加收货地址
const addAddress  = (data) => {
  return Axios.post(`${apiUrl}/user_address`,data)
}

//更新收货地址
const updateAddress = (data) => {
  return Axios.post(`${apiUrl}/update_address`,data)
}

//删除单个地址
const deleteAddress = (id) => {
  return Axios.delete(`${apiUrl}/user_address`,{
    data: {
      id: id
    }
  })
}
//添加（创建订单）
const addOrder = (data) => {
  return Axios.post(`${apiUrl}/add_order`,data)
}
//获取所有订单
const getOrders = () => {
  return Axios.get(`${apiUrl}/orders`)
}
//获取单个订单
const getOrder = (no) => {
  return Axios.get(`${apiUrl}/order/${no}`)
}
//删除订单
const deleteOrder = (no) => {
  return Axios.delete(`${apiUrl}/order`,{
    data: {
      no: no
    }
  });
}
//支付
const cost = (data) => {
  return Axios.post(`${apiUrl}/pay/cost`,data)
}


export default{
  getAllTopCategories,
  getAllCategories,
  getProduct,
  postLogin,
  postRegister,
  addToCart,
  getCartItems,
  deleteCartItem,
  getUserInfo,
  userLogOut,
  getDistrict,
  getUserAddresses,
  addAddress,
  updateAddress,
  deleteAddress,
  addOrder,
  getOrders,
  getOrder,
  deleteOrder,
  cost,
}
