<template>
  <header class="m-header">
    <div class="header-email">
      <div class="email" @click="openConfirm"></div>
    </div>
    <div class="header-title">
      <div class="title-bg">
        <i class="title-refresh" :class="titleRefresh"></i>
      </div>
    </div>
    <div class="header-search">
      <router-link to="/header-search" class="btn"></router-link>
    </div>
  </header>
</template>

<script type="text/ecmascript-6">
  import {mapGetters} from 'vuex'

  export default {
    data() {
      return {
        refresh: false
      }
    },
    computed: {
      ...mapGetters(['iconRefresh']),
      titleRefresh() {
        return this.refresh ? 'refresh' : ''
      }
    },
    methods: {
      openConfirm() {
        this.$emit('openConfirm');
      }
    },
    watch: {
      iconRefresh(val) {
        this.refresh = val
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../style/base/_base.scss";

  .m-header {
    display: flex;
    height: pxTorem(44px);
    background: #D43D3D;
    .header-email {
      flex: 1;
      display: flex;
      align-items: center;
      .email {
        margin-left: pxTorem(10px);
        width: pxTorem(54px);
        height: pxTorem(25px);
        background: url("./header-email.png") no-repeat center;
        background-size: 55%;
      }
    }
    .header-title {
      flex: 2;
      .title-bg {
        position: relative;
        height: pxTorem(44px);
        background: url("./header-title.png") no-repeat center;
        background-size: 55%;
        .title-refresh {
          position: absolute;
          right: 0;
          height: pxTorem(44px);
          width: pxTorem(25px);
          display: block;
          background: url("./header-refresh.png") no-repeat center;
          background-size: 66%;
          &.refresh {
            animation: rotate 1s linear infinite;
          }
        }
      }
    }
    .header-search {
      flex: 1;
      display: flex;
      align-items: center;
      .btn {
        display: block;
        background: url("./header-search.png") no-repeat center;
        background-size: cover;
        width: pxTorem(24px);
        height: pxTorem(24px);
        margin-left: pxTorem(35px);
      }
    }
  }

  @keyframes rotate {
    from {
      transform: rotate(0deg)
    }
    to {
      transform: rotate(360deg)
    }
  }
</style>
