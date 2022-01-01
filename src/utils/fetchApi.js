import Axios from  'axios'
import Config from '@/config'
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
//添加商品到购物车
const addToCart = (id) => {
  
}



export default{
  getAllTopCategories,
  getAllCategories,
  getProduct
}
