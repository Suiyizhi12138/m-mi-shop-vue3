<template>
  <div class="user-address-edit">
    <header class="cart-header">
      <a href="javascript:" class="link-back" @click="closeForm">
        <i class="iconfont icon-arrow-left"></i>
      </a>
      <span class="header-title">编辑收货地址</span>
    </header>
    <div class="form-container">
      <form class="form-add-address">
        <div class="form-item flex-start">
          <div class="item-label">收货人：</div>
          <div class="item-input">
            <input
              type="text"
              class="input-item input-name"
              placeholder="请输入真实姓名"
              v-model="address.contact_name"
            />
           
          </div>
        </div>
        <hr />
        <div class="form-item flex-start">
          <div class="item-label">手机号码：</div>
          <div class="item-input">
            <input
              type="tel"
              class="input-item input-phone"
              placeholder="手机号"
              v-model="address.contact_phone"
              maxlength="11"
              autocomplete="off"
            />
          </div>
        </div>
        <hr />
        <div class="form-item flex-start">
          <div class="item-label">所在地区：</div>
          <div class="item-input item-district" @click="showSelect">
            <input
              type="text"
              class="input-item input-district"
              placeholder="输入小区、街道信息"
              v-model="address.district"
              disabled
            />
          </div>
        </div>
        <hr />
        <div class="form-item flex-start">
          <div class="item-label">详细信息：</div>
          <div class="item-input">
            <input type="text" class="input-item input-detail" placeholder="详细地址" v-model="address.address" />
          </div>
        </div>
        <hr />
        <!-- <div class="form-item flex-between">
          <div class="item-label">设置为默认地址</div>
          <div class="item-input item-default-address flex-column">
            <input type="checkbox" name="default-address" id="default-address" />
          </div>
        </div> -->
        <div class="form-item flex-start">
          <div class="item-label">地址标签：</div>
          <div class="item-input">
            <input type="text" classs="input-item input-detail" placeholder="地址标签" v-model="address.tag" />
          </div>
        </div>
        <hr />
      </form>
    </div>
    <user-address-select 
      v-show="isShowSelectComponent"
      @keepDistrict="getDistrictFromChild"
      @closeSelect="handleClose"
    ></user-address-select>
    <footer class="footer">
      <a href="javascript:" class="btn-add" @click="saveAddress">保存地址</a>
    </footer>
  </div>
</template>

<script>
import UserAddressSelect from './UserAddressSelect.vue'
import { reactive,toRefs } from 'vue'
import FetchAPI from '@/utils/fetchApi'
import { Toast } from 'vant'
import { useRouter } from 'vue-router'
export default {
  props: {
    address: {
      required: true,
      type: Object
    }
  },
  components: {
    UserAddressSelect
  },
  setup(props,{ emit }){
    const state = reactive({
      isShowSelectComponent: false 
    })
    const router = useRouter()
    const closeForm = () => {
      emit('closeForm')
    }
    const showSelect = () => {
      state.isShowSelectComponent = true
    }
    const handleClose = () => {
      state.isShowSelectComponent = false
    }

    const getDistrictFromChild = (val) => {
      props.address.district = val
    }

    const saveAddress = () => {
      let data = {
        name: props.address.contact_name,
        phone: props.address.contact_phone,
        district: props.address.district,
        address: props.address.address,
        tag: props.address.tag

      }
      Toast.loading('正在保存')
      FetchAPI.updateAddress(data)
      .then((res)=>{
        if(res.status==200)
        closeForm()
        Toast.clear()
      })
    }

    return {
      ...toRefs(state),
      closeForm,
      handleClose,
      getDistrictFromChild,
      showSelect,
      saveAddress
    }
  }
};
</script>

<style lang="scss" scoped>
.user-address-edit{
  width: 375px;
  height: 100%;
  background-color: #fff;
  z-index: 9;
  position: absolute;
  top: 0;
  left: 0;
}
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
.form-container {
  .form-add-address {
    .form-item {
      height: 40px;
      padding: 10px 16px;
      .item-label {
        height: 40px;
        line-height: 40px;
      }
      .item-input {
        height: 40px;
        line-height: 40px;
        .input-item{
          width: 200px;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
      }
      input {
        border: none;
      }
      .input-district {
        background-color: #fff;
      }
    }
    hr {
      border: 1px solid #eee;
      border-bottom: none;
    }
  }
}
.footer {
    position: absolute;
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