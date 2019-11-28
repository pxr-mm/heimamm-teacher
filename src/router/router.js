// 导入vue-router
import VueRouter from "vue-router";
// 导入vue 用就要导入
import Vue from "vue";

// 导入Element-ui的弹框
import { Message } from "element-ui";

// 导入 获取token的方法
import { getToken } from "../utils/token.js";

// 导入 获取用户信息的逻辑
import { userInfo } from "../api/api.js";

// 导入 仓库
import store from "../store/store.js";

// 重写push方法 屏蔽 重复跳转错误
// 解决两次访问相同路由地址报错
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err);
};

// use 一下
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

// 定义白名单(不登陆也可以访问) 后续直接使用性能好一些
const whitePaths = ["/login"];
// 导航守卫
router.beforeEach((to, from, next) => {
  // 判断是否存在 白名单中 to.path 路径比如 /index /login
  // 白名单 放走
  if (whitePaths.indexOf(to.path) != -1) {
    // 放走
    return next();
  }
  // 必须登录才可以进去
  // token是否存在的判断
  if (getToken()) {
    // 存在
    // 调用接口验证对错 异步操作
    return userInfo().then(res => {
      // 用户信息获取成功 token木有问题
      store.commit("CHANGEINFO", res.data.data);
      // 放走
      next();
    });
    // return next();
  }
  // 没登录，同时木有token
  Message("请先登录");
  next("/login");
});

// 挂载到Vue实例上
// 暴露出去
// 类似于 module.exports = routera
export default router;
