<template>
  <div class="user-address-page">
    <header class="cart-header">
      <a href="javascript:" class="link-back" @click="closeAddressChoice">
        <i class="iconfont icon-arrow-left"></i>
      </a>
      <span class="header-title">选择收货地址</span>
    </header>
    <div class="address-list-container">
      <ul class="address-list">
        <li class="address-item" v-for="(item,index) in addresses" :key="index">
          <div class="address-item-header flex-between">
            <div class="header-left">{{item.contact_name}}{{item.contact_phone}}<span class="address-tag">&nbsp;{{item.tag}}</span></div>
            <div class="header-right" @click="deleteAddress(item.id)">删除</div>
          </div>
          <div class="address-item-center flex-between" @click="selectOrderAddress(index)">
            <div class="center-left">
              <p>{{item.district}}</p>
              <p>{{item.address}}</p>
            </div>
            <div class="center-right" >
              <i class="iconfont icon-arrowright"></i>
            </div>
          </div>
          <hr class="li-line" v-show="addresses.length>0" />
        </li>
      </ul>
    </div>
    <user-address-edit
      v-if="isShowEidtAddress"
      v-bind:address="addresses[currentEditIndex]"
      @closeForm="handleCloseForm"
    ></user-address-edit>
    <footer class="footer" v-if="!isShowEidtAddress">
      <router-link class="btn-add" to="/user/address/new">+新建收货地址</router-link>
    </footer>
  </div>
</template>

<script>
import AddressHeader from "@/components/common/AddressHeader";
import UserAddressEdit from "@/views/user/components/UserAddressEdit";
import { onMounted, reactive, toRefs } from "vue";
import FetchAPI from "@/utils/fetchApi";
import { Toast } from 'vant'
export default {
  components: {
    AddressHeader,
    UserAddressEdit
  },
  setup(props,{emit}) {
    const state = reactive({
      addresses: [], //地址列表
      isShowEidtAddress: false, //显示
      currentEditIndex: 0, //当前编辑下标
      selectedAddress: '',//选中地址
    });
    onMounted(() => {
      //获取地址信息
      FetchAPI.getUserAddresses().then(res => {
        state.addresses = res.data;
      });
    });
    //删除地址
    const deleteAddress = (id) => {
      Toast.loading("正在删除")
      FetchAPI.deleteAddress(id)
      .then((res)=>{
        if(res.status==200){
          window.location.reload()
          Toast.clear()
        }
      })
    };
    //显示编辑地址
    const showEditAddress = index => {
      state.isShowEidtAddress = true;
      state.currentEditIndex = index;
    };
    //关闭编辑地址
    const handleCloseForm = () => {
      state.isShowEidtAddress = false;
    };
    //选择订单地址
    const selectOrderAddress = (index) => {
      emit('selectOrderAddress',state.addresses[index])
      emit('closeAddressChoice')
    }

    const closeAddressChoice = () => {
      emit('closeAddressChoice')
    }

    return {
      ...toRefs(state),
      showEditAddress,
      handleCloseForm,
      deleteAddress,
      closeAddressChoice,
      selectOrderAddress 
    };
  }
};
</script>
<style lang="scss" scoped>

.user-address-page{
  background-color: #fff;
  height: 100%;
  .cart-header {
    height: 50px;
    line-height: 50px;
    text-align: center;
    display: flex;
    justify-content: flex-start;
    color: #666;
    background-color: #f5f5f5;
    .icon-arrow-left {
      width: 52px;
      height: 20px;
      font-size: 30px;
      color: #999;
    }
    .header-title {
      font-size: 16px;
      color: #333;
      width: 271px;
    }
    padding: 0 16px;
  }
}
.address-list-container {
  .address-list {
    .address-item {
      padding: 16px;
      .address-item-header {
        .header-left {
          font-size: 16px;
          line-height: 24px;
          .address-tag{
            display: inline-block;
            color: #999;
            font-size: 12px;
            
          }
        }
        .header-right{
          color: #ff6700;
        }
      }
      .address-item-center {
        .center-left {
          font-size: 12px;
          color: #999;
          text-align: left;
          line-height: 18px;
        }
        .center-right {
         
          
        }
      }
      .li-line {
        border: 1px solid #bbb;
        margin-top: 10px;
        border-bottom: 0;
        border-left: none;
        border-right: none;
      }
    }
    
  }
}
.footer {
  position: fixed;
  bottom: 0px;
  z-index: 9;
  padding: 5px 16px;
  height: 40px;
  .btn-add {
    display: block;
    width: 343px;
    height: 40px;
    line-height: 40px;
    text-align: center;
    background-color: #ff6700;
    color: #fff;
    border-radius: 20px;
    font-size: 16px;
    font-weight: 600;
  }
}

</style>