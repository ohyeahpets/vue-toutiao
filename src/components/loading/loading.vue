<template>
  <div class="loading">
    <img src="./loading.gif" width="24" height="24" alt="">
    <p class="desc">{{title}}</p>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    props: {
      title: {
        type: String,
        default: '正在载入'
      }
    }
  }
</script>

<style scoped lang="scss">
  .loading {
    text-align: center;
    .desc {
      font-size: 15px;
      color: #666;
      line-height: 15px;
    }
  }

</style>
