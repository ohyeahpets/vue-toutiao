<template>
    <div class="news-wrapper">
      <mt-header title="头条详情">
        <a slot="left" @click="goBack">
          <mt-button icon="back"></mt-button>
        </a>
        <mt-button slot="right" class="share" @click="openConfirm">分享</mt-button>
      </mt-header>
      <mt-popup position="bottom"
                pop-transition="popup-fade"
                modal="true"
                closeOnClickModal="true"
                v-model="popupVisible">
        <div id="share">
          <ul>
            <li class="share-item">
              <a href="javascript:;"></a>
            </li>
            <li class="share-item">
              <a href="javascript:;"></a>
            </li>
            <li class="share-item">
              <a href="javascript:;"></a>
            </li>
            <li class="share-item">
              <a href="javascript:;"></a>
            </li>
            <li class="share-item">
              <a href="javascript:;"></a>
            </li>
            <li class="share-item">
              <a href="javascript:;"></a>
            </li>
            <li class="share-item">
              <a href="javascript:;"></a>
            </li>
            <li class="share-item">
              <a href="javascript:;"></a>
            </li>
          </ul>
          <mt-button type="default" @click.native="openConfirm">取消</mt-button>
        </div>
      </mt-popup>
      <div class="news-content" v-if="newsData.id">
        <Scroll class="news-con" ref="scroll" :data="converArr(newsData)">
          <div class="news-detail">
            <p class="title">{{newsData.title}}</p>
            <div class="news-user">
              <div class="user-img"><img src="./head.jpg" alt=""></div>
              <div class="user-ad">
                <span class="name">{{newsData.desc.source}}</span>
                <span class="date">{{newsData.desc.time}}</span>
              </div>
            </div>
            <div class="news-text">
              {{newsData.desc.abstract}}
              <div>
                <img v-for="item in newsData.imgUrl" class="ad-img" :src="item" alt="">
              </div>
            </div>
            <ul class="keywords">
              <li v-for="item in newsData.desc.keywords" class="k-item">{{item}}</li>
            </ul>
            <div class="comment">
              <mt-button type="default" size="small"><i class="fa fa-thumbs-up"></i><span>1</span></mt-button>
              <mt-button type="default" size="small"><i class="fa fa-trash" aria-hidden="true"></i><span>不喜欢</span>
              </mt-button>
            </div>
          </div>
        </Scroll>
      </div>
      <div class="news-footer">
      <span class="f-comment">
        <input type="text">
        <i class="fa fa-pencil" aria-hidden="true"></i>
      </span>
        <i class="fa fa-comment-o fa-2x" aria-hidden="true" @click="Comment"></i>
        <i class="fa fa-cloud fa-2x" ref="focus" aria-hidden="true" @click="focusCls"></i>
        <i class="fa fa-undo fa-2x" aria-hidden="true" @click="openConfirm"></i>
      </div>
      <mt-popup
        v-model="popupComment"
        pop-transition="true">
        <div class="po-content">
          <div class="tips">
            <p>提示</p>
            <i class="fa fa-close fa-2x" @click="Comment"></i>
          </div>
          <div class="text">登录后才能发表评论, 是否前往登录?
            <i class="fa fa-exclamation-circle fa-3x"></i>
          </div>
          <div style="text-align: right">
            <mt-button type="default" size="small" @click="Comment">取消</mt-button>
            <mt-button type="primary" size="small">确定</mt-button>
          </div>
        </div>
      </mt-popup>
    </div>
</template>

<script type="text/ecmascript-6">
  import Scroll from 'page/base/scroll'
  import {mapGetters} from 'vuex'

  export default {
    components: {
      Scroll
    },
    data() {
      return {
        popupVisible: false,
        isFocus: true,
        popupComment: false,
        newsData: {}
      }
    },
    computed: {
      // 获取提交的mutation数据 news
      ...mapGetters(['news']),
      // 解决路由刷新报错的问题，source未定义。数据为空的时候。
      dataNull() {
        return
      }
    },
    created() {
      this.renderNews()
    },
    watch: {
      news(value) {
        this.newsData = value
        setTimeout(() => {
          this.$refs.scroll.scrollTo(0, 0)
        })
      }
    },
    methods: {
      goBack() {
        this.$router.go(-1)
      },
      Comment() {
        this.popupComment = !this.popupComment;
      },
      focusCls() {
        if (this.isFocus) {
          this.$refs.focus.style.color = 'red';
        } else {
          this.$refs.focus.style.color = '';
        }
        this.isFocus = !this.isFocus;
      },
      openConfirm() {
        this.popupVisible = !this.popupVisible
      },
      renderNews() {
        if (!this.news.id) {
          this.$router.push({
            path: '/header-search'
          })
        }
        this.newsData = this.news
      },
      converArr(obj) {
        let arr = []
        for (var i in obj) {
          arr.push(obj[i])
        }
        return arr
      }
    }
  }
</script>

<style lang="scss">
  @import "../../style/base/_base";

  .mint-popup {
    border-radius: pxTorem(4px);
  }

  .po-content {
    padding: pxTorem(20px) pxTorem(15px);
    .mint-button--default {
      margin: 0 10px;
    }
    .text {
      position: relative;
      padding: pxTorem(30px) 0 pxTorem(30px) pxTorem(45px);
      font-size: pxTorem(15px);
      .fa-exclamation-circle {
        position: absolute;
        top: 50%;
        margin-top: pxTorem(-22.5px);
        color: #f7ba2a;
        left: 0;
      }
    }
    .tips {
      display: flex;
      align-items: center;
      p {
        flex: 1;
        font-size: pxTorem(16px);
        color: #333;
        font-weight: 700;
      }
      i {
        display: inline-block;
        width: pxTorem(24px);
        height: pxTorem(24px);
        text-align: center;
        line-height: pxTorem(24px);
      }
    }
  }

  .news-content {
    position: fixed;
    top: pxTorem(38px);
    left: 0;
    bottom: 0;
    width: 100%;
    .news-con {
      overflow: hidden;
      height: 100%;
    }
    .news-detail {
      padding: pxTorem(12px) pxTorem(8px) pxTorem(8px) pxTorem(8px);
      box-sizing: border-box;
      padding-bottom: 42px;
      .title {
        font-size: 20px;
        font-weight: bold;
      }
      .news-text {
        text-indent: 2em;
        margin-top: .5rem;
        font-size: pxTorem(16px);
        color: #000;
        img.ad-img {
          display: block;
          margin: pxTorem(5px) auto;
        }
      }
      .news-user {
        margin-top: pxTorem(18px);
        display: flex;
        align-items: center;
        .user-img {
          width: pxTorem(35.19px);
          height: pxTorem(35.19px);
          img {
            width: 100%;
            border-radius: 50%;
          }
        }
        .user-ad {
          padding-left: pxTorem(8px);
          span {
            display: block;
            font-size: pxTorem(14px);
            &.name {
              color: #657180;
              font-weight: 700;
            }
          }
        }
      }
      .keywords {
        font-size: 0;
        margin-top: .5rem;
        line-height: .8rem;
        border-bottom: 1px solid #ccc;
        .k-item {
          margin-bottom: pxTorem(8px);
          text-align: center;
          margin-right: pxTorem(8px);
          display: inline-block;
          border: 1px solid #ccc;
          padding: 0 pxTorem(10px);
          border-radius: .4rem;
          font-size: pxTorem(12px);
          color: #657180;
          height: pxTorem(27px);
          line-height: pxTorem(27px);
        }
      }
      .comment {
        text-align: center;
        padding: pxTorem(15px) 0;
        border-bottom: 1px solid #ccc;
        .mint-button {
          border-radius: pxTorem(15px);
        }
        span {
          padding: 0 pxTorem(8px);
        }
      }
    }
  }

  #share {
    ul {
      font-size: 0;
      border-top: pxTorem(1px) solid #ccc;
    }
    .mint-button--default {
      width: 100%;
    }
    .share-item {
      display: inline-block;
      width: 25%;
      text-align: center;
      height: pxTorem(70.39px);
      a {
        display: block;
        width: pxTorem(38.39px);
        height: pxTorem(38.39px);
        margin: pxTorem(16px) auto;
        background: url("./wechat.jpg") no-repeat center;
        background-size: cover;
      }
    }
  }

  .news-wrapper {
    .mint-header {
      font-size: pxTorem(18px);
      background: #fff;
      color: #000;
      height: pxTorem(38px);
      box-sizing: border-box;
      border-bottom: pxTorem(1px) solid #ccc;
      .mint-header-title {
        font-weight: bold;
      }
      .mint-header-button .mintui-back {
        font-weight: bold;
      }
      .share {
        width: pxTorem(50px);
      }
    }
    .mint-popup {
      width: 100%;
    }
  }

  .news-footer {
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 42px;
    line-height: 42px;
    background: #fff;
    display: flex;
    .fa-comment-o {
      margin-left: 15px;
    }
    .fa-undo {
      color: red !important;
    }
    .fa-2x {
      width: 42px;
      line-height: 42px;
      display: inline-block;
      text-align: center;
      color: #657180;
    }
    .f-comment {
      position: relative;
      left: 10px;
      height: 42px;
      display: inline-block;
      width: 54%;
      box-sizing: border-box;
      .fa-pencil {
        position: absolute;
        right: 0;
        top: 0;
        display: inline-block;
        width: 35px;
        height: 100%;
        color: #bfcbd9;
        text-align: center;
        line-height: 36px;
      }
    }
    .f-comment input {
      width: 100%;
      background-color: #fff;
      background-image: none;
      border-radius: 4px;
      border: 1px solid #bfcbd9;
      box-sizing: border-box;
      color: #1f2d3d;
      display: inline-block;
      font-size: inherit;
      height: 36px;
      line-height: 1;
      outline: 0;
      padding: 3px 35px 3px 10px;
    }
  }
</style>
