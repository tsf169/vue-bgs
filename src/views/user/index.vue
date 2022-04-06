<template>
  <!-- :visible.sync="isShow" 显示 -->
  <div class="manage">
    <el-dialog
      :title="operateType === 'add' ? '新增用户' : '编辑用户'"
      :visible.sync="isShow"
    >
      <common-form
        :formLabel="operateFormLabel"
        :form="operateForm"
        :inline="true"
        ref="form"
      ></common-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="isShow = false">取消</el-button>
        <el-button type="primary" @click="confirm">添加</el-button>
      </div>
    </el-dialog>
    <div class="manage-header">
      <el-button type="primary" @click="addUser">新增</el-button>
      <common-form
        :formLabel="formLabel"
        :form="searchFrom"
        :inline="true"
        ref="form"
      >
        <el-button type="primary" @click="getList(searchFrom.keyword)"
          >搜索</el-button
        >
      </common-form>
    </div>
    <!-- :tableData="tableData"表格数据 -->
    <!-- :tableLable="tableLable" 表格标签 -->
    <!-- :config="config" 分页标签 -->
    <common-table
      :tableData="tableData"
      :tableLabel="tableLabel"
      :config="config"
      @changePage="getList()"
      @edit="editUser"
      @del="delUser"
    ></common-table>
  </div>
</template>
<script>
import commonForm from "../../components/commonForm.vue";
import commonTable from "../../components/commonTable.vue";
import { getUser } from "../../api/data.js";
export default {
  // inline布局
  // ref当前组件的实例
  // form表单中 type定义它的类型

  components: { commonForm, commonTable },
  name: "User",
  data() {
    return {
      operateType: "add",
      isShow: false,
      operateFormLabel: [
        {
          model: "name",
          label: "姓名",
          type: "input",
        },
        {
          model: "age",
          label: "年龄",
          type: "input",
        },
        {
          model: "sex",
          label: "性别",
          type: "select",
          opts: [
            { label: "男", value: 1 },
            { label: "女", value: 2 },
          ],
        },
        {
          model: "birth",
          label: "出生日期",
          type: "date",
        },
        {
          model: "addr",
          label: "地址",
          type: "input",
        },
      ],
      operateForm: {
        name: "",
        addr: "",
        age: "",
        birth: "",
        sex: "",
      },
      formLabel: [
        {
          model: "keyword",
          label: "",
          type: "input",
        },
      ],
      searchFrom: {
        keyword: "",
      },
      tableData: [],
      tableLabel: [
        {
          prop: "name",
          label: "姓名",
        },
        {
          prop: "age",
          label: "年龄",
        },
        {
          prop: "sexLabel",
          label: "性别",
        },
        {
          prop: "birth",
          label: "出生日期",
          width: 200,
        },
        {
          prop: "addr",
          label: "地址",
          width: 320,
        },
      ],
      config: {
        page: 1,
        total: 30,
      },
    };
  },
  methods: {
    confirm() {
      if (this.operateType === "edit") {
        this.$http.post("/user/edit", this.operateForm).then((res) => {
          console.log(res);
          this.isShow = false;
          this.getlist();
        });
      } else {
        this.$http.post("/user/add", this.operateForm).then((res) => {
          console.log(res);
          this.isShow = false;
          this.getList();
        });
      }
    },
    addUser() {
      (this.isShow = true),
        (this.operateType = "add"),
        (this.operateForm = {
          name: "",
          addr: "",
          age: "",
          birth: "",
          sex: "",
        });
    },
    editUser(row) {
      this.operateType = "edit";
      this.isShow = true;
      this.operateForm = row;
    },
    delUser(row) {
      this.$confirm("此操作将永久删除数据。是否继续？", "提示", {
        confirmButtonText: "确认",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        const id = row.id;
        this.$http
          .post("/user/del", {
            params: { id },
          })
          .then(() => {
            this.$message({
              type: "success",
              message: "删除成功",
            });
            this.getList();
          });
      });
    },
    // getList(name = "") {
    //   // 获取数据前需要给一个loading的值设为true
    //   this.config.loading = true;
    //   // 判断name存不存在 需要将当前的页面置为一
    //   name ? (this.config.page = 1) : "";
    //   // 接口的调用
    //   getUser({
    //     page: this.config.page,
    //     name,
    //   }).then(({ data: res }) => {
    //     console.log(res);
    //     this.tableData = res.list.map((item) => {
    //       item.sexlable = item.sex === 0 ? "女" : "男";
    //       return item;
    //     });
    //     this.config.total = res.count;
    //     this.config.loading = false;
    //   });
    // },
    getList(name = "") {
      this.config.loading = true;
      name ? (this.config.page = 1) : "";
      getUser({
        page: this.config.page,
        name,
      }).then(({ data: res }) => {
        console.log(res);
        this.tableData = res.list.map((item) => {
          item.sexLabel = item.sex === 0 ? "女" : "男";
          return item;
        });
        this.config.total = res.count;
        this.config.loading = false;
      });
    },
  },
  created() {
    // 生命周期中进行调用
    this.getList();
  },
};
</script>
<style lang="less" scoped>
.manage-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style> 