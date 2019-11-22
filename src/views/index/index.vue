<template>
  <el-container class="index-container">
    <el-header class="header">
        <div class="left">
            <i class="el-icon-s-fold"></i>
            <img class="logo" src="../../assets/index-logo.png" alt="">
            <span class="title">黑马面面</span>
        </div>
        <div class="right">
            <img class="avatar" src="../../assets/avatar.jpg" alt="">
            <span class="name">西兰花,您好</span>
            <el-button class="logout" size="mini" type="primary">退出</el-button>
        </div>
    </el-header>
    <el-container>
      <el-aside width="200px" class="aside">Aside</el-aside>
      <el-main class="main">Main</el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  name: "index"
};
</script>

<style lang="less">
.index-container{
    height: 100%;
    .header{
        // background-color: orange;
        display: flex;
        justify-content: space-between;
        .left{
            display: flex;
            align-items: center;
            .el-icon-s-fold{
                font-size: 23px;
                margin-right: 22px;
            }
            .logo{
                width: 33px;
                height: 28px;
                margin-right: 11px;
            }
            .title{
                font-size: 22px;
                color:#49A1FF;
            }
        }
        .right{
              display: flex;
            align-items: center;
            .avatar{
                width: 43px;
                height: 43px;
                border-radius: 50%;
                margin-right: 9px;
            }
            .name{
                font-size: 14px;
                margin-right: 38px;
            }
        }
    }
    .aside{
        background: skyblue;
    }
    .main{
        background-color: hotpink;
    }
}
</style>
