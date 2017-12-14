import * as types from './mutation-types'

const mutations = {
  [types.SET_NEWS](state, news) {
    state.news = news  // singer 是提交的数据
  },
  [types.SET_ICON_REFRESH](state, iconRefresh) {
    state.iconRefresh = iconRefresh  // 小图标刷新
  }
}

export default mutations
