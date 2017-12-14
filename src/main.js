// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
import 'font-awesome/css/font-awesome.css'
import App from './App'
import router from './router'
import store from './store'
import 'config/rem'
// 引用API文件
import api from 'api/index'
// 将API方法绑定到全局

import fastclick from 'fastclick'
import VueLazyload from 'vue-lazyload'

fastclick.attach(document.body)

// 使用图片懒加载插件
Vue.use(VueLazyload, {
  loading: require('page/common/image/lanjiazai.gif')
})
// 引入mint-ui
Vue.use(MintUI)

//引入index通用样式
import 'style/scss/_index.scss'

Vue.prototype.$api = api
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: {App}
})
