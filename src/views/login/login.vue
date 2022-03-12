<template>
  <!-- 创建表单 -->
  <el-form
    ref="form"
    :model="form"
    :rules="rules"
    status-icon
    label-width="100px"
    class="login-container"
  >
    <!-- :model="form"绑定form表单  rules="rules"绑定校验规则  status-icon图标-->
    <h3 class="login-title">系统登录</h3>
    <el-form-item label="账号" label-width="80px" prop="username">
      <el-input
        v-model="form.username"
        type="input"
        auto-complete="off"
        placeholder="请输入账号"
      ></el-input>
    </el-form-item>
    <el-form-item
      label="密码"
      label-width="80px"
      prop="password"
      class="password"
    >
      <el-input
        v-model="form.password"
        auto-complete="off"
        type="password"
        placeholder="请输入密码"
      ></el-input>
    </el-form-item>
    <el-form-item class="login-submit">
      <el-button type="primary" @click="onlogin(form)">登录</el-button>
    </el-form-item>
  </el-form>
</template>
<script>
import mock from "mockjs";
import { getMenu } from "../../api/data.js";
export default {
  name: "login",
  data() {
    return {
      form: {},
      // rules校验规则
      rules: {
        //username校验规则是数组[]
        username: [
          {
            required: true,
            message: "请输入账号",
            trigger: "blur",
          },
          {
            min: 3,
            message: "用户名不能小于3位",
            trigger: "blur",
          },
        ],
        password: [
          {
            required: true,
            message: "请输入密码",
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    onlogin() {
      // if (form.username === "admin" && form.password === "123456") {
      //   this.$router.push({ name: "home" });
      // }
      // 调用getmenu接口
      getMenu(this.form).then(({ data: res }) => {
        if (res.code === 200) {
          console.log(res, "res");
          this.$store.commit("clearMenu");
          this.$store.commit("setMenu", res.data.menu);
          this.$store.commit("setToken", res.data.token);
          //动态添加路由
          this.$store.commit("addMenu", this.$router);
          this.$router.push({ name: "home" });
        } else {
          // element.ui的message组件
          this.$message.warning(res.data.message);
        }
      });

      // 登录的时候需要把登录token设置进去，因为没有后端的token所有用mock进行模拟 mock.random.guid随机生成一个数
      // const token = mock.random.guid();
      // //将随机生成的token放入setToken中
      // this.$store.commit("setToken", token);
      // // 后跳转页面
      // this.$router.push({ name: "home" });
    },
  },
};
</script>
<style lang="less" scoped>
.login-container {
  width: 500px;
  margin: 180px auto;
}
.login-title {
  margin: 0px auto 40px auto;
  text-align: center;
  color: #505458;
}
.login-submit {
  margin-top: 20px;
  margin-left: 110px;
}
</style>