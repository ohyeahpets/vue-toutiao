import Vue from 'vue'
import Router from 'vue-router'
import Index from 'page/index/index'
import Content from 'page/content/content'
import HeaderSearch from 'components/header-search/header-search'
import NewsDetail from 'components/news-detail/news-detail'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/index/recommend/__all__'
    },
    {
      path: '/index/:kind/:tag',
      component: Index
    },
    {
      path: '/content/:id',
      component: Content
    },
    {
      path: '/header-search',
      component: HeaderSearch
    },
    {
      path: '/news-detail/:id',
      component: NewsDetail
    }
  ]
})
