const LocalStore = {
  //_cart_items 购物车项目
  steStore(key,data){
    localStorage.setItem(key,JSON.stringify(data))
  },
  getStore(key){
    return  JSON.parse(localStorage.getItem(key))
  },
  removeStore(key){
    localStorage.removeItem(key)
  },
  isNull(key){
    if(localStorage.getItem('key')){
      return false
    }
    
    return true
  }
}

export default LocalStore