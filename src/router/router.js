// 导入vue-router
import VueRouter from "vue-router";
// 导入vue 用就要导入
import Vue from "vue";

// 导入Element-ui的弹框
import { Message } from "element-ui";

// 重写push方法 屏蔽 重复跳转错误
// 解决两次访问相同路由地址报错
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err);
};

// use
Vue.use(VueRouter);

// 导入 登录页面组件
import login from "../views/login/login.vue";
// 导入 首页页面组件
import index from "../views/index/index.vue";

// 嵌套路由的组件导入
// 学科
import subject from "../views/index/subject/subject.vue";
// 企业
import enterprise from "../views/index/enterprise/enterprise.vue";
// 数据
import dataRecord from "../views/index/data/data.vue";
// 用户
import userList from "../views/index/user/user.vue";
// 题库
import questionList from "../views/index/question/question.vue";

// 规则
const routes = [
  // 登录组件规则
  {
    path: "/login",
    component: login
  },
  // 首页组件规则
  {
    path: "/index",
    component: index,
    // 嵌套路由
    children: [
      {
        path: "subject", // 匹配的是 /index/subject
        component: subject
      },
      {
        path: "enterprise", // 匹配的是 /index/enterprise
        component: enterprise
      },
      {
        path: "dataRecord", // 匹配的是 /index/dataRecord
        component: dataRecord
      },
      {
        path: "userList", // 匹配的是 /index/userList
        component: userList
      },
      {
        path: "questionList", // 匹配的是 /index/questionList
        component: questionList
      }
    ]
  }
];

// 创建路由示例
const router = new VueRouter({
  routes
});

// 定义白名单 后续直接使用性能好一些
const whitePaths = ["/login"];
// 导航守卫
router.beforeEach((to, from, next) => {
  // 判断是否存在 白名单中 to.path 路径比如 /index /login
  if (whitePaths.indexOf(to.path) == -1) {
    // 不存在于白名单中
    // 提示用户
    Message.warning("请先登录！");
    // 去登录页
    return next("/login");
  }

  // 到这里说明可以访问
  next();
});

// 挂载到Vue实例上
// 暴露出去
// 类似于 module.exports = routera
export default router;
