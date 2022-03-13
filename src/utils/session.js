const  Session =  {
  //_buy_items 提交到确认订单的要购买的项目
  //_buy_item 直接要购买的项目
  //_selected_address 选中的购买地址
	setStore(key,data){
		sessionStorage.setItem(key,JSON.stringify(data))
	},
	getStore(key){
    return JSON.parse(sessionStorage.getItem(key))
  },
  removeStore(key){
    sessionStorage.removeItem(key)
  },
  isNull(key){
    if(sessionStorage.getItem(key)){
      return false
    }else{
      return true
    }
  }
}

  



export default Session