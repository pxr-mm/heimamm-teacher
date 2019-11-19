// 导入vue-router
import VueRouter from 'vue-router'
// 导入vue
import Vue from 'vue'
// use
Vue.use(VueRouter)
// 规则
const routes = []

// 创建路由示例
const router = new VueRouter({
    routes
})

// 挂载到Vue实例上
// 暴露出去
// 类似于 module.exports = routera
export default router;