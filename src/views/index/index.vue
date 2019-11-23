<template>
  <el-container class="index-container">
    <!-- 头部 -->
    <el-header class="header">
      <div class="left">
        <!-- 顶部的图标，点击旋转 -->
        <i
          class="el-icon-s-fold"
          @click="isCollapse = !isCollapse"
          :class="{ rotate: isCollapse }"
        ></i>
        <img class="logo" src="../../assets/index-logo.png" alt="" />
        <span class="title">黑马面面</span>
      </div>
      <div class="right">
        <!-- 头像 -->
        <img class="avatar" :src="avatar" alt="" />
        <span class="name">{{ name }},您好</span>
        <el-button class="logout" @click="logout" size="mini" type="primary"
          >退出</el-button
        >
      </div>
    </el-header>
    <el-container>
      <!-- 左侧
         style="width:auto" 让宽度自适应 被内容撑开
       -->
      <el-aside style="width:auto" class="aside">
        <el-menu
          :collapse="isCollapse"
          default-active="5"
          class="el-menu-vertical-demo"
          router
        >
          <el-menu-item index="/index/dataRecord">
            <i class="el-icon-pie-chart"></i>
            <span slot="title">数据概览</span>
          </el-menu-item>
          <el-menu-item index="/index/userList">
            <i class="el-icon-user"></i>
            <span slot="title">用户列表</span>
          </el-menu-item>
          <el-menu-item index="/index/questionList">
            <i class="el-icon-edit-outline"></i>
            <span slot="title">题库列表</span>
          </el-menu-item>
          <el-menu-item index="/index/enterprise">
            <i class="el-icon-office-building"></i>
            <span slot="title">企业列表</span>
          </el-menu-item>
          <el-menu-item index="/index/subject">
            <i class="el-icon-notebook-2"></i>
            <span slot="title">学科列表</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <!-- 主体区域 -->
      <el-main class="main">
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
// 导入 获取token的函数
import { getToken,removeToken } from "../../utils/token.js";
// 导入 用户信息方法
import {userInfo} from '../../api/api.js';
export default {
  name: "index",
  data() {
    return {
      // 是否折叠
      isCollapse: false,
      // 头像地址
      avatar :"",
      // 用户名
      name:""
    };
  },
  // 生命周期钩子
  beforeCreate() {
    // 判断token是否存在
    const token = getToken();
    if (!token) {
      // 提示用户
      this.$message.error("小老弟，你木有登录哦，先去登录吧");
      // 不存在 去登录页
      this.$router.push("/login");
    }
  },
  // 创建钩子
  created() {
    userInfo().then(res=>{
      // // 判断token
      // if(res.data.code===0){
      //   // token有问题
      //   this.$message.error("小老弟，伪造token，牛逼啊！");
      //   // 删除token
      //   removeToken();
      //   // 去登录页
      //   this.$router.push("/login")
      //   return 
      // }
      // window.console.log(res);
      // 保存到data中
      this.avatar = `http://183.237.67.218:3002/${res.data.data.avatar}`
      this.name=res.data.data.name
    })
  },
  methods: {
    // 退出
    logout() {
      this.$confirm("你即将退出黑马面面系统，想清楚了没，小老弟", "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "error"
      })
        .then(() => {
            // 删除token
            removeToken();
            // 去登录页
            this.$router.push('/login');
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "爱你哟，ღ( ´･ᴗ･` )比心"
          });
        });
    }
  }
};
</script>

<style lang="less">
.index-container {
  height: 100%;
  .header {
    // background-color: orange;
    display: flex;
    justify-content: space-between;
    .left {
      display: flex;
      align-items: center;
      .el-icon-s-fold {
        font-size: 23px;
        margin-right: 22px;
      }
      .logo {
        width: 33px;
        height: 28px;
        margin-right: 11px;
      }
      .title {
        font-size: 22px;
        color: #49a1ff;
      }
    }
    .right {
      display: flex;
      align-items: center;
      .avatar {
        width: 43px;
        height: 43px;
        border-radius: 50%;
        margin-right: 9px;
      }
      .name {
        font-size: 14px;
        margin-right: 38px;
      }
    }
  }
  .aside {
    // background: skyblue;
  }
  .main {
    background-color: hotpink;
  }

  // 折叠菜单相关的类名
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }
  .el-icon-s-fold {
    font-size: 40px;
    transition: 0.5s;
  }
  .rotate {
    transform: rotate(-90deg);
  }
}
</style>
