// 导入Vue
import Vue from 'vue'
// 导入Vuex
import Vuex from 'vuex'
// use一下
Vue.use(Vuex)
// 创建仓库
const store = new Vuex.Store({
    // 数据
    state:{}
})
// 暴露出去
export default store;