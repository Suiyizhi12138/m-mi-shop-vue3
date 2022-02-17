<template>
  <div class="search-page">
    <div class="search-header flex-between">
      <div class="back-btn" @click="goBack">
        <i class="iconfont icon-arrow-left"></i>
      </div>
      <input type="text" placeholder="搜索商品名称" v-model="searchKey" @keyup.enter="goSearchProduct"/>
      <div class="search-btn" @click="goSearchProduct">
        <i class="iconfont icon-search"></i>
      </div>
    </div>
    <div class="search-history">
      <div class="search-history-header flex-between">
        <div class="history-title">搜索历史</div>
        <div class="history-delete" @click="clearHistorys()">
          <i class="iconfont icon-delete"></i>
        </div>
      </div>
      <div class="search-history-tags" v-if="searchHistorys&&searchHistorys.length>0">
        <div
          class="history-tag"
          v-for="(item,index) in searchHistorys"
          @click="selectSearch(item)"
          :key="index"
        >{{item}}</div>
      </div>
      <div class="search-history-tags" v-else>
        <div class="history-tag n">无历史</div>
      </div>
    </div>
    <div class="search-find">
      <div class="search-find-header flex-start">
        <div class="search-find-title">探索发现</div>
      </div>
      <div class="search-find-list">
        <div class="find-list-left">
          <div
            class="find-list-item"
            v-for="item in leftLists"
            :key="item"
            @click="selectSearch(item)"
          >{{item}}</div>
        </div>
        <div class="find-list-right">
          <div
            class="find-list-item"
            v-for="item in rightLists"
            :key="item"
            @click="selectSearch(item)"
          >{{item}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, toRefs } from "vue";
import { useRouter } from "vue-router";
import FetchAPI from "@/utils/fetchApi";
import { onMounted } from "vue";
export default {
  setup() {
    const state = reactive({
      searchKey: "", //搜索关键字
      searchResults: [], //s搜索结果
      searchHistorys: [], //搜索结果
      leftLists: ["全部商品", "红米", "空调", "洗衣机"], //左侧发现列表
      rightLists: ["小米手机", "小米平板5Pro", "显示器", "电视"] //右侧发现列表
    });
    const router = useRouter();
    onMounted(() => {
      getHistorys();
    });
    const getHistorys = () => {
      if (!localStorage.getItem("_search_historys")) {
        return;
      }

      state.searchHistorys = JSON.parse(
        localStorage.getItem("_search_historys")
      );
    };
    //返回前页
    const goBack = () => {
      router.go(-1);
    };
    //前往搜索列表页
    const goSearchProduct = () => {
      if (state.searchHistorys.indexOf(state.searchKey) == -1) {
        state.searchHistorys.push(state.searchKey);
        localStorage.setItem(
          "_search_historys",
          JSON.stringify(state.searchHistorys)
        );
        router.push({
          name: "search_list",
          query: {
            key: state.searchKey
          }
        });
      } else {
        router.push({
          name: "search_list",
          query: {
            key: state.searchKey
          }
        });
      }
    };
    //点击选择搜索
    const selectSearch = (key) => {
      state.searchKey = key;
      goSearchProduct();
    }

    //清除搜索历史
    const clearHistorys = () => {
      localStorage.removeItem("_search_historys");
      state.searchHistorys = [];
    };
    return {
      ...toRefs(state),
      goBack,
      goSearchProduct,
      clearHistorys,
      selectSearch
    };
  }
};
</script>

<style lang="scss" scoped>
.search-page {
  overflow: hidden;
  .search-header {
    height: 40px;
    background-color: #f5f5f5;
    .back-btn {
      margin-left: 16px;
      .icon-arrow-left {
        font-size: 24px;
        color: #999;
        font-weight: 600;
      }
    }
    .search-btn {
      margin-right: 16px;
      .icon-search {
        font-size: 24px;
        font-weight: 600;
        color: #999;
      }
    }
    input[type="text"] {
      background-color: #fff;
      border: none;
      width: 248px;
      height: 30px;
      padding-left: 16px;
      color: #666;
      font-size: 16px;
    }
  }
  .search-history {
    width: 375px;
    overflow: hidden;
    .search-history-header {
      padding: 16px 16px 0 16px;
      .history-title {
        font-size: 16px;
        color: #333;
        font-weight: 600;
      }
      .hsitory-delete {
        font-size: 18px;
        color: #333;
      }
    }
    .search-history-tags {
      padding-right: 16px;
      width: 375px;
      .history-tag {
        //display: inline-block;
        padding: 10px;
        background-color: #f5f5f5;
        font-size: 12px;
        border-radius: 10px;
        float: left;
        margin-top: 20px;
        margin-left: 16px;
        max-width: 80px;
        min-width: 30px;
      }
    }
  }
  .search-find {
    .search-find-header {
      padding: 16px 16px 0 16px;
    }
    .search-find-title {
      font-size: 16px;
      color: #333;
      font-weight: 600;
    }
    .search-find-list {
      margin-left: 20px;
      margin-top: 16px;
      font-size: 12px;
      display: flex;
      text-align: left;
      .find-list-left {
        width: 160px;
      }
      .find-list-right {
        width: 160px;
      }
      .find-list-item {
        line-height: 27px;
      }
    }
  }
}
</style>