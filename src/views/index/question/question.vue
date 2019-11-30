<template>
  <div class="question-container">
    <!-- 头部 -->
    <el-card>
      <!-- 行内 表单 -->
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="问题编号">
          <el-input v-model="formInline.rid"></el-input>
        </el-form-item>
        <el-form-item label="问题名称" class="more-width">
          <el-input v-model="formInline.name"></el-input>
        </el-form-item>
        <el-form-item label="创建者">
          <el-input v-model="formInline.creater"></el-input>
        </el-form-item>
        <el-form-item label="状态" class="more-width">
          <!-- 表单元素数据的绑定 是v-model -->
          <el-select v-model="formInline.status" placeholder="请选择状态">
            <el-option label="启用" :value="1"></el-option>
            <el-option label="禁用" :value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="search">搜索</el-button>
          <el-button>清除</el-button>
          <el-button
            type="primary"
            @click="addFormVisible = true"
            icon="el-icon-plus"
            v-power="['管理员']"
            >新增问题</el-button
          >
        </el-form-item>
      </el-form>
    </el-card>
    <!-- 内容 -->
    <el-card class="main-card">
      <!-- 表格 -->
      <el-table :data="tableData" style="width: 100%" stripe border>
        <el-table-column type="index" label="序号"> </el-table-column>
        <el-table-column label="题目">
          <template slot-scope="scope">
            <span v-html="scope.row.title"></span>
          </template>
        </el-table-column>
        <el-table-column label="学科.阶段">
          <template slot-scope="scope">
            {{ scope.row.subject_name + "·" + scope.row.step }}
          </template>
        </el-table-column>
        <el-table-column prop="type" label="题型"> </el-table-column>
        <el-table-column prop="enterprise_name" label="企业"> </el-table-column>
        <el-table-column prop="creater" label="创建者"> </el-table-column>
        <el-table-column label="状态">
          <template slot-scope="scope">
            <span v-if="scope.row.status === 0" class="red">禁用</span>
            <span v-else>启用</span>
          </template>
        </el-table-column>
        <el-table-column prop="reads" label="访问量"> </el-table-column>
        <el-table-column label="操作">
          <!-- 插槽 -->
          <template slot-scope="scope">
            <el-button @click="showEdit(scope.row)" type="text">编辑</el-button>
            <el-button @click="status(scope.row)" type="text">
              {{ scope.row.status === 1 ? "禁用" : "启用" }}
            </el-button>
            <el-button
              v-power="['管理员']"
              @click="remove(scope.row)"
              type="text"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页器 -->
      <el-pagination
        background
        :current-page="page"
        :page-sizes="pageSizes"
        :page-size="limit"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      >
      </el-pagination>
    </el-card>
  </div>
</template>

<script>
// 导入接口
import { question } from "../../../api/api.js";
export default {
  name: "question",
  data() {
    return {
      // 筛选的表格
      formInline: {},
      // 数据
      tableData: [],
      // 页码
      page: 1,
      // 页容量
      limit: 10,
      // 页码数组
      pageSizes: [5, 10, 15, 20],
      // 总条数
      total: 0
    };
  },
  created() {
    // 初始数据获取
    question
      .list({
        page: this.page,
        limit: this.limit
      })
      .then(res => {
        // window.console.log(res)
        // 保存到table中
        this.tableData = res.data.data.items;
        // 总条数
        this.total = res.data.data.pagination.total;
      });
  },
  // 方法
  methods: {
    // 获取数据的逻辑
    getList() {
      window.console.log("getList");
      // 调用接口 传递筛选条件
      // subject
      //   .list({ page: this.page, limit: this.limit, ...this.formInline })
      //   .then(res => {
      //     // 赋值给table
      //     this.tableData = res.data.data.items;
      //     // 重新设置页容量即可
      //     this.total = res.data.data.pagination.total;
      //   });
    },
    // 筛选逻辑
    search() {
      // 跳转到第一页
      this.page = 1;
      // 获取数据
      this.getList();
    },
    // 页容量改变
    handleSizeChange(size) {
      // 保存起来
      this.limit = size;
      // 修改页码
      // 去第一页
      this.page = 1;
      // 重新获取数据
      this.getList();
    },
    // 页码改变
    handleCurrentChange(current) {
      // 保存页码
      this.page = current;
      // 重新获取数据
      this.getList();
    }
  }
};
</script>

<style lang="less">
.question-container {
  .el-input__inner {
    width: 100px;
  }
  .more-width {
    .el-input__inner {
      width: 150px;
    }
  }

  // 分页器的样式
  .el-pagination {
    text-align: center;
    margin-top: 30px;
  }
  // card的样式
  .main-card {
    margin-top: 20px;
  }
  // span 变红
  .red {
    color: red;
  }
}
</style>
