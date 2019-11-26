<template>
  <div class="subject-container">
    <!-- 头部 -->
    <el-card>
      <!-- 行内 表单 -->
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="用户名称">
          <el-input v-model="formInline.rid"></el-input>
        </el-form-item>
        <el-form-item label="用户邮箱" class="more-width">
          <el-input v-model="formInline.name"></el-input>
        </el-form-item>
        <el-form-item label="角色" class="more-width">
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
            >新增用户</el-button
          >
        </el-form-item>
      </el-form>
    </el-card>
    <!-- 内容 -->
    <el-card class="main-card">
      <!-- 表格 -->
      <el-table :data="tableData" style="width: 100%" stripe border>
        <el-table-column type="index" label="序号" width="60px">
        </el-table-column>
        <el-table-column prop="name" label="用户名"> </el-table-column>
        <el-table-column prop="phone" label="电话"> </el-table-column>
        <el-table-column prop="email" label="邮箱"> </el-table-column>
        <el-table-column prop="role" label="角色"> </el-table-column>
        <el-table-column prop="remark" label="备注"> </el-table-column>
        <el-table-column label="状态">
          <template slot-scope="scope">
            <span v-if="scope.row.status === 0" class="red">禁用</span>
            <span v-else>启用</span>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <!-- 插槽 -->
          <template slot-scope="scope">
            <el-button @click="showEdit(scope.row)" type="text">编辑</el-button>
            <el-button @click="status(scope.row)" type="text">
              {{ scope.row.status === 1 ? "禁用" : "启用" }}
            </el-button>
            <el-button @click="remove(scope.row)" type="text">删除</el-button>
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
    <!-- 新增对话框 -->
    <el-dialog title="新增用户" :visible.sync="addFormVisible">
      <el-form :model="addForm" ref="addForm" :rules="addRules">
        <el-form-item label="用户名" prop="rid" :label-width="formLabelWidth">
          <el-input v-model="addForm.rid" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="name" :label-width="formLabelWidth">
          <el-input v-model="addForm.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="电话" :label-width="formLabelWidth">
          <el-input v-model="addForm.short_name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="角色" :label-width="formLabelWidth">
          <!-- 表单元素数据的绑定 是v-model -->
          <el-select v-model="addForm.status" placeholder="请选择角色">
            <el-option label="启用" :value="1"></el-option>
            <el-option label="禁用" :value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="状态" :label-width="formLabelWidth">
          <!-- 表单元素数据的绑定 是v-model -->
          <el-select v-model="addForm.status" placeholder="请选择状态">
            <el-option label="启用" :value="1"></el-option>
            <el-option label="禁用" :value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="用户备注" :label-width="formLabelWidth">
          <el-input v-model="addForm.remark" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitAdd">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 编辑对话框 -->
    <el-dialog
      title="编辑用户"
      class="edit-dialog"
      :visible.sync="editFormVisible"
    >
      <el-form :model="editForm" ref="editForm" :rules="addRules" status-icon>
        <el-form-item label="用户名" prop="name" :label-width="formLabelWidth">
          <el-input v-model="editForm.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email" :label-width="formLabelWidth">
          <el-input v-model="editForm.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="电话" prop="phone" :label-width="formLabelWidth">
          <el-input v-model="editForm.phone" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="角色" prop="role" :label-width="formLabelWidth">
          <!-- 表单元素数据的绑定 是v-model -->
          <el-select v-model="editForm.role" placeholder="请选择角色">
            <el-option label="管理员" value="管理员"></el-option>
            <el-option label="老师" value="老师"></el-option>
            <el-option label="学生" value="学生"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="状态" :label-width="formLabelWidth">
          <!-- 表单元素数据的绑定 是v-model -->
          <el-select v-model="editForm.status" placeholder="请选择状态">
            <el-option label="启用" :value="1"></el-option>
            <el-option label="禁用" :value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="用户备注" :label-width="formLabelWidth">
          <el-input v-model="editForm.remark" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitEdit">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
// 导入接口文件
import { user } from "../../../api/api.js";
export default {
  name: "user",
  // 数据
  data() {
    return {
      // 筛选的表格
      formInline: {},
      // 数据
      tableData: [],
      // 新增表单的数据
      addForm: {},
      // 编辑表单的数据
      editForm: {},
      // 是否显示新增框
      addFormVisible: false,
      // 是否显示编辑表单
      editFormVisible: false,
      // label的宽度
      formLabelWidth: "80px",
      // 验证规则
      addRules: {
        name: [{ required: true, message: "用户名不能为空" }],
        email: [
          { required: true, message: "邮箱不能为空" },
          {
            validator: (rules, value, callback) => {
              // value是值
              if (!value) {
                callback(new Error("邮箱不能为空"));
              } else {
                // 格式验证
                const reg = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
                setTimeout(() => {
                  // 验证
                  if (reg.test(value)) {
                    // 对的
                    callback();
                  } else {
                    // 错误
                    callback(new Error("邮箱格式不对哦"));
                  }
                }, 1000);
              }
            }
          }
        ],
        phone: [{ required: true, message: "电话不能为空" }],
        role: [{ required: true, message: "角色不能为空" }]
      },
      // 分页相关
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
  //生命周期钩子中获取数据
  created() {
    user.list().then(res => {
      // window.console.log(res);
      this.tableData = res.data.data.items;
      // 保存总条数
      this.total = res.data.data.pagination.total;
    });
  },
  methods: {
    // 获取数据的逻辑
    getList() {
      // 调用接口 传递筛选条件
      user
        .list({ page: this.page, limit: this.limit, ...this.formInline })
        .then(res => {
          // 赋值给table
          this.tableData = res.data.data.items;
          // 重新设置页容量即可
          this.total = res.data.data.pagination.total;
        });
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
    },
    // 启用禁用数据的方法
    status(data) {
      user
        .status({
          id: data.id
          // 三元表单时
          // status: data.status === 1 ? 0 : 1
        })
        .then(res => {
          // window.console.log(res)
          if (res.data.code === 200) {
            this.getList();
            // this.$message.success(res.data.message);
          }
        });
    },
    // 进入编辑状态
    showEdit(data) {
      this.editForm = JSON.parse(JSON.stringify(data));
      // 弹框
      this.editFormVisible = true;
    }
  }
};
</script>

<style></style>
