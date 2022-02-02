<template>
  <div class="address-new">
    <!-- 新建收货地址 -->
    <address-header :title="'新增地址'"></address-header>
    <div class="form-container">
      <form class="form-add-address">
        <div class="form-item flex-start">
          <div class="item-label">收货人：</div>
          <div class="item-input">
            <input
              type="text"
              class="input-item input-name"
              placeholder="请输入真实姓名"
              v-model="contact_name"
            />
          </div>
        </div>
        <hr />
        <div class="form-item flex-start">
          <div class="item-label">手机号码：</div>
          <div class="item-input">
            <input
              type="tel"
              classs="input-item input-phone"
              placeholder="手机号"
              v-model="contact_phone"
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
              placeholder="小区、街道信息"
              v-model="district"
              disabled
            />
          </div>
        </div>
        <hr />
        <div class="form-item flex-start">
          <div class="item-label">详细信息：</div>
          <div class="item-input">
            <input type="text" classs="input-item input-detail" placeholder="详细地址" v-model="detail" />
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
            <input type="text" classs="input-item input-detail" placeholder="地址标签" v-model="tag" />
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
      <a href="javascript:" class="btn-add" @click="addAddress()">保存地址</a>
    </footer>
  </div>
</template>

<script>
import AddressHeader from "@/components/common/AddressHeader";
import UserAddressSelect from "./components/UserAddressSelect";
import { useRouter } from "vue-router";
import { reactive, toRefs } from "vue";
import { useStore } from "vuex";
import { onMounted, computed } from "vue";
import FetchAPI from '@/utils/fetchApi'
export default {
  components: {
    AddressHeader,
    UserAddressSelect
  },
  setup() {
    const state = reactive({
      contact_name: "", //联系人姓名
      contact_phone: "", //联系人电话
      district: "", //地区街道
      detail: "", //详细地址信息
      tag: '',//标签信息
      isShowSelectComponent: false //是否显示选择地区组件
    });
    const store = useStore();
    const router = useRouter();
    onMounted(() => {});
    const showSelect = () => {
      state.isShowSelectComponent = true;
    };
    //关闭搜索地址
    const handleClose = () => {
      state.isShowSelectComponent = false;
    };

    const getDistrictFromChild = val => {
      state.district = val;
    };
    //保存新建地址
    const addAddress = () => {
      let data = {
        name: state.contact_name,
        phone: state.contact_phone,
        district: state.district,
        address: state.detail,
        tag: state.tag
      }
      FetchAPI.addAddress(data)
      .then(res=>{
        if(res.status==200){
          router.push({name:'user_address'})
        }
      })

    } 

    return {
      ...toRefs(state),
      showSelect,
      getDistrictFromChild,
      handleClose,
      addAddress
    };
  }
};
</script>

<style lang="scss" scoped>
.address-new {
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
}
</style>