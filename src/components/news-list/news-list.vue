<template>
  <div class="news-list-wrapper">
    <div class="loading-container" v-show="loading">
      <mt-spinner type="fading-circle"></mt-spinner>
      <p class="loading-text">正在加载中</p>
    </div>
    <Scroll class="news-list" :data="listData" ref="scroll" :pullup="pullup" @scrollToEnd="scrollToEnd">
      <ul class="list-con">
        <li class="list-con-item" v-for="item in listData" v-if="item.title" @click="jumpRouter(item)">
          <p class="title">{{item.title}}</p>
          <div class="list-img" v-show="item.has_image&&item.image_list.length>0">
            <img v-for="img in item.image_list" v-lazy="imageRender(img.url)" alt="加载出错">
          </div>
          <div class="item-con">
            <span class="avIcon" v-show="item.label" :class="iconLabel(item.label_style)"><i>{{item.label}}</i></span>
            <span class="writer">{{item.source}}</span>
            <span class="comment_count">评论&nbsp;{{item.comments_count}}</span>
            <span class="datetime">{{item.datetime}}</span>
          </div>
        </li>
        <div class="loading-wrapper" v-show="hasMore&&!loading">
          <loading></loading>
        </div>
      </ul>
    </Scroll>
  </div>
</template>

<script type="text/ecmascript-6">
  import jsonp from 'jsonp'
  import axios from 'axios'
  import Scroll from 'page/base/scroll'
  import {mapMutations} from 'vuex'
  import {createNews} from 'page/common/js/news'
  import loading from 'components/loading/loading'

  export default {
    props: {
      tag: {
        type: String,
        default: ''
      }
    },
    components: {
      Scroll,
      loading
    },
    data() {
      return {
        listData: [],
        loading: false,
        hasMore: true,
        pullup: true,
        number: 1
      }
    },
    created() {
      this._getNewsList()
    },
    watch: {
//      '$route'(to, from) {   //  watch 路由变化
//        this.tag = this.getStatus(this.$route.path)
//        setTimeout(() => {
//          this._getNewsList()
//          this.$refs.scroll.scrollTo(0, 0)
//        }, 20)
//      }
      tag() {   //  监测从父组件传递过来的值tag 即是路由参数
//        this.$refs.scroll.refresh()
//        this.number = 1
//        console.log(this.number)
        setTimeout(() => {
          this._getNewsList()
          this.$refs.scroll.scrollTo(0, 0)
          this.hasMore = true
          this.number = 1
        }, 20)
      }
    },
    methods: {
      iconLabel(label_style) {
        return label_style === 6 ? 'up_label' : 'ad_label'
      },
      scrollToEnd() {
        if (!this.hasMore) {
          return
        }
        // 由于不知怎么抓取数据接口，此处调用原来的接口，模拟下拉刷新功能
        if (this.number >= 3) {
          this.hasMore = false
          this.number = 1
        }
//        const url = `./src/page/data/hasMore${this.number}.json`
//        axios.get(url).then((res) => {
//          this.listData = this.listData.concat(res.data.data)
//          this.number++
//        }).catch((err) => {
//          console.log(err)
//        })
        let minTimer = parseInt((new Date().getTime()) / 1000)
        const url = 'https://m.toutiao.com/list/?tag=__all__&ac=wap&count=20&format=json_raw&as=A1956AE2FE62CF4&cp=5A2EF21C1F04DE1&min_behot_time=' + minTimer
        jsonp(url, (err, res) => {
          this.listData = this.listData.concat(res.data)
          this.number++
        })
      },
      getStatus(urlStr) {
        var urlStrArr = urlStr.split('/')
        return urlStrArr[urlStrArr.length - 1]
      },
      _getNewsList() {
        this.loading = true
        this.iconRefresh(this.loading)
        let _this = this
        let minTimer = parseInt((new Date().getTime()) / 1000)
        const url = 'https://m.toutiao.com/list/?tag=' + this.tag + '&ac=wap&count=20&format=json_raw&as=A1956AE2FE62CF4&cp=5A2EF21C1F04DE1&min_behot_time=' + minTimer
        jsonp(url, function (err, res) {
          _this.listData = res.data
          _this.loading = false
          _this.iconRefresh(_this.loading)
          console.log(_this.listData)
        })
      },
      // 提交mutations，设置news数据
      ...mapMutations({
        setNews: 'SET_NEWS',
        iconRefresh: 'SET_ICON_REFRESH'
      }),
      jumpRouter(item) {  // 点击搜索列表跳转路由
        this.$router.push({
          path: `/news-detail/${item.group_id}`
        })
        this.setNews(createNews(item))
      },
      imageRender(imgUrl) {
        return imgUrl ? `${imgUrl}` : '';
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../style/scss/index";

  .news-list-wrapper {
    position: fixed;
    top: pxTorem(82px);
    left: 0;
    bottom: 0;
    width: 100%;
    .loading-container {
      margin-top: pxTorem(28px);
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
    .news-list {
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
            align-items: center;
            .avIcon {
              flex: pxTorem(40px) 0 0;
              text-align: center;
              &.ad_label {
                color: #30A4F6;
                i {
                  border: pxTorem(1px) solid rgba(48, 164, 246, .5);
                }
              }
              &.up_label {
                color: #f85959;
                i {
                  border: pxTorem(1px) solid rgba(248, 89, 89, 0.5);
                }
              }
              i {
                display: inline-block;
                padding: pxTorem(1px);
                border-radius: pxTorem(5px);
              }
            }
            .writer {
              flex: 1
            }
            .comment_count {
              flex: 1
            }
            .datetime {
              flex: pxTorem(100px) 0 0
            }
          }
        }
        .loading-wrapper {
          margin-top: pxTorem(10px);
        }
      }
      .no-newsList-wrapper {
        position: absolute;
        width: 100%;
        top: 50%;
        transform: translateY(-50%);
      }
    }
  }
</style>
