<template>
  <div class="select-address-page">
    <header class="cart-header">
      <a href="javascript:" class="link-back" @click="closeSelect">
        <i class="iconfont icon-arrow-left"></i>
      </a>
      <span class="header-title">请选择收货地址</span>
    </header>
    <nav class="select-address-nav">
      <div class="search-address flex-start">
        <i class="iconfont icon-search"></i>
        <input
          type="text"
          id="search-district"
          placeholder="请输入您小区、街道信息"
          @input="debounceSearch(200)"
          v-model="addressKey"
        />
      </div>
      
      <ul class="search-list" v-show="isShowSearchList">
        <li class="search-item" v-for="(item,index) in resultAddresses" :key="index">
          <a href="javascript:" @click="selectAddress(index)" class="btn-select">
            <div class="detail">{{item.name}}</div>
            <div class="district">{{item.district}}</div>
          </a>
        </li>
        
      </ul>
      <div class="select-btn-box">
        <a href="javascript:" @click="manualSelect">未找到？手动选择地址</a>
      </div>
      <van-popup
        class="popup-address"
        :style="{height: '50%'}"
        v-model:show="isShowAddressPop"
        position="bottom"
      >
        <van-area title="选择地址" :area-list="areaList" @confirm="confirmSelect" @cancel="closeManualSelect" />
      </van-popup>
    </nav>
  </div>
</template>

<script>
import AddressHeader from "@/components/common/AddressHeader";
import { reactive, toRefs } from "vue";
import FetchAPI from "@/utils/fetchApi";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { areaList } from '@vant/area-data'
import { Area } from 'vant'
export default {
  components: {
    AddressHeader
  },
  setup(props, { emit }) {
    const state = reactive({
      resultAddresses: [], //搜索结果地址Array
      addressKey: "",
      isShowSearchList: false, //是否显示搜索结果列表
      isShowAddressPop: false, //是否显示手动选择弹出框
      isShowManualResult: true, //是否显示手动选择结果
      timeOut: "", //延搜索计时器
      district: '',//地区
    });
    const store = useStore();
    const router = useRouter();
    //关闭搜索结果列表
    const closeSelect = () => {
      emit('closeSelect')
    }
    //选择地址
    const selectAddress = index => {
      let district =
        state.resultAddresses[index].district +
        state.resultAddresses[index].name;
        emit("keepDistrict", district);
        closeSelect()
    };
    //打开手动选择框
    const manualSelect = () => {
      state.isShowAddressPop = true;
    };
    //获取地址信息
    const getDistrict = () => {
      FetchAPI.getDistrict(state.addressKey)
        .then(res => {
          if (!state.isShowSearchList) {
            state.isShowSearchList = true;
          }
          state.resultAddresses = res.data.tips;
        })
        .catch(e => {
          console.log(e);
        });
    };
    const debounceSearch = time => {
      if (state.timeOut) {
        clearTimeout(state.timeOut);
      }
      state.timeOut = setTimeout(() => {
        getDistrict(state.resultAddresses);
      }, time);
    };
    //确认地区
    const confirmSelect = (results) => {
      //去重
      if(results[0].name==results[1].name){
        state.district = results[0].name+results[2].name;
      }else{
        state.district = results[0].name+results[1].name+results[2].name
      }

      state.isShowAddressPop = false
      closeSelect()
      emit("keepDistrict", state.district)
    }

    //取消选择
    const closeManualSelect = () => {
      state.isShowAddressPop = false
    }
    return {

      ...toRefs(state),
      selectAddress,
      manualSelect,
      debounceSearch,
      closeSelect,
      areaList,
      confirmSelect,
      closeManualSelect
    };
  }
};
</script>

<style lang="scss" scoped>
.select-address-page {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 19;
  width: 100%;
  height: 100%;
  background-color: #fff;
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
  .select-address-nav {
    background-color: #f5f5f5;
    position: relative;
    .search-address {
      width: 100%;
      height: 40px;
      background-color: #fff;
      .icon-search {
        display: block;
        width: 40px;
        font-size: 20px;
      }
      input[type="text"] {
        height: 40px;
        border: none;
      }
    }
    .select-btn-box {
      background-color: #fff;
      margin-top: 16px;
      padding-top: 20px;
    }
    .search-list {
      width: 100%;
      position: absolute;
      top: 66px;
      z-index: 10;
      left: 0px;
      background-color: #fff;
      box-sizing: border-box;
      padding: 0 16px;
      .search-item {
        height: 32px;
        padding: 10px 0;
        border-bottom: 1px solid #eee;
        a.btn-select {
          display: block;
          text-align: left;
        }
        a {
          div.strict {
            color: #333;
            line-height: 18px;
          }
          div.district {
            color: #ccc;
            line-height: 18px;
          }
        }
      }
    }
    .popup-address {
      .pop-address-content {
        .pop-title {
          font-size: 18px;
          font-weight: normal;
          margin-top: 12px;
        }
        .manual-nav {
          border-bottom: 1px solid #eee;
          .manual-result-list {
            margin-top: 12px;
            .manual-result-item {
              font-size: 12px;
              margin-left: 18px;
              line-height: 30px;
            }
            .manual-result-tip {
              color: #ff6700;
              border-bottom: 2px solid #ff6700;
            }
          }
        }
        .address-list {
          padding-left: 18px;
          padding-top: 12px;
          .address-item {
            text-align: left;
            line-height: 30px;
          }
        }
      }
    }
  }
}
</style>