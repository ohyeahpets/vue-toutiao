<template>
  <div class="h-search">
    <mt-header title="搜索">
      <router-link to="/" slot="left">
        <mt-button icon="back"></mt-button>
      </router-link>
    </mt-header>
    <div id="search-content">
      <a class="action_choose"></a>
      <div class="arrowdown"></div>
      <input v-model="searchValue" class="action_search" type="text" placeholder="请输入搜索关键词"
             @keyup.13="getSearchData(searchValue)" @input="inputChange">
      <i class="fa fa-close" v-show="searchValue" @click="clearSearchValue"></i>
    </div>
    <div class="search-list-wrapper">
      <div class="loading-container" v-show="loading">
        <mt-spinner type="fading-circle"></mt-spinner>
        <p class="loading-text">正在加载中</p>
      </div>
      <Scroll class="search-list" :data="listData">
        <ul class="list-con">
          <li class="list-con-item" v-for="item in listData" v-if="item.title" @click="jumpRouter(item)">
            <p class="title" v-html="replace(item.title,searchValue)"></p>
            <div class="list-img" v-show="item.has_image&&item.image_list.length>0">
              <img v-for="img in item.image_list" v-lazy="imageRender(img.url)" alt="加载出错">
            </div>
            <div class="item-con">
              <span class="avIcon" v-show="">广告</span>
              <span class="writer">{{item.source}}</span>
              <span class="comment_count">评论&nbsp;{{item.comments_count}}</span>
              <span class="datetime">{{item.datetime}}</span>
            </div>
          </li>
        </ul>
      </Scroll>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import jsonp from 'jsonp'
  import {Trim} from 'utils/index.js'
  import Scroll from 'page/base/scroll'
  import {mapMutations} from 'vuex'
  import {createNews} from 'page/common/js/news'

  export default {
    components: {
      Scroll
    },
    data() {
      return {
        searchValue: '',
        listData: [],
        loading: false,
        inputFlag: false  //  输入框发生改变时触发
      }
    },
    methods: {
      // 提交mutations，设置news数据
      ...mapMutations({
        setNews: 'SET_NEWS'
      }),
      jumpRouter(item) {  // 点击搜索列表跳转路由
        this.$router.push({
          path: `/news-detail/${item.group_id}`
        })
        this.setNews(createNews(item))
      },
      imageRender(imgUrl) {
        return imgUrl ? `https://${imgUrl}` : '';
      },
      clearSearchValue() {
        this.searchValue = ''
      },
      inputChange() {
        this.inputFlag = true;
      },
      replace(title, value) {
        const reg = new RegExp('' + value + '', 'gim');
        return title ? title.replace(reg, `<i class="red">${value}</i>`) : title;
      },
      getSearchData(searchValue) {
        // 通过jsonp跨域，请求搜索数据
        const _this = this;
        if (!searchValue) {
          return;
        }
        if (this.inputFlag) {
          searchValue = Trim(searchValue);
          this.loading = true;
          jsonp('http://www.toutiao.com/search_content/?offset=0&format=json&keyword=' + searchValue + '&autoload=true&count=20&cur_tab=1', function (err, res) {
            _this.listData = res.data;
            console.log(_this.listData);
            _this.loading = false;
            _this.inputFlag = false
          })
        }
      }
    }
  }
</script>

<style lang="scss">
  @import "../../style/base/_base";

  .h-search {
    .search-list-wrapper {
      position: fixed;
      top: pxTorem(82px);
      left: 0;
      bottom: 0;
      width: 100%;
      .loading-container {
        margin-top: pxTorem(8px);
        text-align: center;
        span {
          display: inline-block;
        }
        .loading-text {
          color: #888;
          font-size: pxTorem(12px);
          padding: pxTorem(5px) 0;
        }
      }
      .search-list {
        height: 100%;
        overflow: hidden;
        .list-con {
          .list-img img {
            display: inline-block;
            width: 30.1%;
            height: pxTorem(73.59px);
            margin-right: pxTorem(7px);
          }
          .list-con-item {
            margin: 0 pxTorem(10px);
            padding-bottom: pxTorem(8px);
            border-bottom: pxTorem(1px) solid #ccc;
            &:last-child {
              border: none;
            }
            .title {
              font-size: pxTorem(16px);
              font-weight: bold;
              padding-top: pxTorem(10px);
              padding-bottom: pxTorem(10px);
              .red {
                color: red;
              }
            }
            .item-con {
              display: flex;
              .avIcon {
                flex: 1
              }
              .writer {
                flex: 1
              }
              .comment_count {
                flex: 1
              }
              .datetime {
                flex: 1
              }
            }
          }
        }
      }
    }
    .mint-header {
      background: #D43D3D;
      height: pxTorem(44px);
      font-size: pxTorem(20px);
      .mint-header-title {
        font-weight: 700;
      }
    }
    #search-content {
      position: relative;
      box-sizing: border-box;
      height: pxTorem(38px);
      background: #c9c9c9;
      padding: pxTorem(5px);
      font-size: 0;
      .fa-close {
        position: absolute;
        right: 0.25rem;
        top: 0.25rem;
        width: pxTorem(28px);
        height: pxTorem(28px);
        line-height: pxTorem(25px);
        font-size: pxTorem(20px);
        text-align: center;
        color: #999
      }
      .action_choose {
        display: block;
        position: absolute;
        width: pxTorem(40px);
        height: pxTorem(27px);
        background: url("./search_icons.png") #fff no-repeat pxTorem(5px) pxTorem(-35px);
        background-size: pxTorem(20px);
      }
      .action_search {
        box-sizing: border-box;
        width: 100%;
        border-radius: pxTorem(3px);
        height: pxTorem(28px);
        margin: 0;
        border: none;
        padding: pxTorem(5px) pxTorem(10px) pxTorem(5px) pxTorem(40px);
        font-size: pxTorem(16px);
      }
      .arrowdown {
        position: absolute;
        top: pxTorem(18px);
        left: pxTorem(33px);
        border-right: transparent pxTorem(3px) solid;
        border-left: transparent pxTorem(3px) solid;
        border-top: #c9c9c9 pxTorem(3px) solid;
        width: 0;
        height: 0;
      }
    }
  }
</style>
