<template>
  <div class="login-container">
    <!-- 左侧 form -->
    <div class="form-wrapper">
      <!-- 标题 -->
      <div class="title-box">
        <img class="login-logo" src="../../assets/login_icon.png" alt="" />
        <span class="title">黑马面面</span>
        <span class="line"></span>
        <span class="sub-title">用户登录</span>
      </div>
      <!-- 输入框 -->
      <el-input
        placeholder="请输入手机号"
        prefix-icon="el-icon-user"
        class="phone-input"
        v-model="input2"
      >
      </el-input>
      <el-input
        placeholder="请输入密码"
        prefix-icon="el-icon-lock"
        class="password-input"
        v-model="input2"
      >
      </el-input>
      <el-row class="captcha-row">
        <el-col :span="17">
          <el-input
            placeholder="请输入验证码"
            prefix-icon="el-icon-key"
            v-model="input2"
          >
          </el-input>
        </el-col>
        <el-col :span="7">
          <img class="captcha" src="../../assets/captcha.png" alt="" />
        </el-col>
      </el-row>

      <!-- 协议 -->
      <el-checkbox class="checkbox">
        我已阅读并同意
        <el-link type="primary">用户协议</el-link>
        和
        <el-link type="primary">隐私条款</el-link>
      </el-checkbox>
      <!-- 登录 注册按钮 -->
      <el-button class="login-btn" type="primary">登录</el-button>
      <el-button class="reg-btn" type="primary">注册</el-button>
    </div>
    <!-- 右侧 图片 -->
    <img src="../../assets/login_banner_ele.png" alt="" class="banner" />
  </div>
</template>

<script>
export default {
  name: "login"
};
</script>

<style lang="less">
// 登录盒子
.login-container {
  display: flex;
  /* 上下居中 */
  align-items: center;
  /* 水平方向的对其方式 */
  justify-content: space-around;
  height: 100%;
  background: linear-gradient(
    225deg,
    rgba(1, 198, 250, 1),
    rgba(20, 147, 250, 1)
  );
  .form-wrapper {
    width: 478px;
    height: 550px;
    background-color: #f5f5f5;
    padding-top: 48px;
    padding-left: 43px;
    padding-right: 41px;
    box-sizing: border-box;
    .title-box {
      display: flex;
      align-items: center;
      .login-logo {
        width: 22px;
        height: 17px;
        margin-right: 14px;
      }
      .title {
        font-size: 24px;
        margin-right: 14px;
      }
      .line {
        width: 1px;
        height: 28px;
        background: rgba(199, 199, 199, 1);
        margin-right: 12px;
      }
      .sub-title {
        font-size: 22px;
      }
    }
    .phone-input {
      margin-top: 30px;
    }
    .password-input {
      margin-top: 25px;
    }
    .captcha-row {
      margin-top: 25px;
      .captcha {
        // width: 110px;
        width: 100%;
        height: 42px;
      }
    }

    // 协议
    .checkbox {
      color: #999;
      font-size: 14px;
      display: flex;
      align-items: center;
      margin-top: 32px;
      .el-checkbox__label {
        display: flex;
        align-items: center;
      }
    }
    // 按钮
    .login-btn,
    .reg-btn {
      width: 100%;
      margin-left: 0;
      margin-top: 27px;
    }
  }
}
</style>
