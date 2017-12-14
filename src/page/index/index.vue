<template>
  <div>
    <mHeader @openConfirm="openConfirm"></mHeader>
    <ul class="homeNav">
      <li v-for="item in nav_data" class="nav-item">
        <router-link :to="routerChange(item.description,item.tag)" @click.native="getTag(item.tag)">{{item.title}}
        </router-link>
      </li>
    </ul>
    <newsList :tag="tag"></newsList>
    <mt-popup class="mt-modal" v-show="popupVisible" modal="true" closeOnClickModal="true"
              pop-transition="popup-fade">
      <div class="mt-modal-content">
        <div class="banner"></div>
        <p>已加载好你感兴趣的头条</p>
        <mt-button type="danger" class="danger">立即打开</mt-button>
        <div class="close" @click="openConfirm"></div>
      </div>
    </mt-popup>
  </div>
</template>

<script>
  import mHeader from 'components/mHeader/mHeader'
  import {NAV} from 'page/common/js/const-config'
  import newsList from 'components/news-list/news-list'

  export default {
    components: {
      mHeader,
      newsList
    },
    data() {
      return {
        popupVisible: false,
        nav_data: NAV,
        tag: ''
      }
    },
    methods: {
      getTag(tag) {
        this.tag = tag
      },
      // 动态路由
      routerChange(desc, tag) {
        return `/index/${desc}/${tag}`
      },
      openConfirm() {
        this.popupVisible = !this.popupVisible;
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../style/scss/index";

  .wp::-webkit-scrollbar {
    display: none;
  }

  .homeNav {
    font-size: 0;
    overflow: hidden;
    overflow-x: auto;
    white-space: nowrap;
    background: #f4f5f6;
    -webkit-overflow-scrolling: touch;
    &::-webkit-scrollbar {
      display: none;
    }
    .nav-item {
      display: inline-block;
      font-size: pxTorem(16px);
      width: pxTorem(52.5px);
      height: pxTorem(37.5px);
      line-height: pxTorem(37.5px);
      text-align: center;
      a {
        color: #000;
        &.router-link-active {
          color: #d43d3d;
          font-weight: 700;
        }
      }
    }
  }

  .mt-modal {
    background: rgba(0, 0, 0, 0.4);
    width: 100%;
    height: 100%;
    .mt-modal-content {
      width: pxTorem(270px);
      border-radius: pxTorem(4px);
      background: #fff;
      position: absolute;
      left: 50%;
      margin-left: pxTorem(-135px);
      padding-bottom: pxTorem(8px);
      top: 50%;
      transform: translate3d(0, -50%, 0);
      .banner {
        width: pxTorem(165px);
        height: pxTorem(121px);
        margin: pxTorem(10px) auto 0;
        background: url("./popup_banner.png") no-repeat center;
        background-size: cover;
      }
      p {
        text-align: center;
        color: #a5a5a5;
        font-size: 17px;
        margin-top: 6px;
        margin-bottom: 24px;
      }
      .danger {
        width: pxTorem(220px);
        height: pxTorem(40px);
        line-height: pxTorem(40px);
        text-align: center;
        left: 50%;
        margin-left: pxTorem(-110px);
      }
      .close {
        position: absolute;
        top: 0;
        right: 0;
        width: pxTorem(40px);
        height: pxTorem(32px);
        background: url("./popup_close.png") no-repeat center;
        background-size: 50%;
      }
    }
  }
</style>
