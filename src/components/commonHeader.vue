<template>
  <header>
    <div class="r-icon">
      <!-- 按钮绑定事件用来控制菜单栏的开与合 -->
      <el-button
        @click="handleMenu"
        type="primary"
        icon="el-icon-menu"
        size="mini"
      ></el-button>
      <el-breadcrumb separator="/">
        <el-breadcrumb-item
          v-for="item in tags"
          :key="item.path"
          :to="{ path: item.path }"
          :closable="tags.name !== 'home'"
          >{{ item.label }}</el-breadcrumb-item
        >
      </el-breadcrumb>
    </div>
    <div class="r-content">
      <el-dropdown trigger="click" size="mini">
        <span>
          <img :src="userImg" class="user" />
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>个人中心</el-dropdown-item>
          <el-dropdown-item @click.native="logout">退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </header>
</template>

<style lang="less" scoped>
el-button {
  color: #fff;
  text-align: center;
}
header {
  display: flex;
  height: 100%;
  justify-content: space-between;
  align-items: center;
}
.r-icon {
  display: flex;
  align-items: center;
  .el-button {
    margin-right: 20px;
  }
}
.r-content {
  .user {
    width: 40px;
    height: 40px;
    border-radius: 50%;
  }
}
el-breadcrumb-item {
  color: #fff;
}
// .myColor /deep/ .el-breadcrumb__inner {
//   color: #3a6df3;
// }
.el-breadcrumb ::v-deep .el-breadcrumb__inner {
  color: #ece9e4 !important;
}
</style>
<script>
//引入vuex下的mapState
import { mapState } from "vuex";
//引入images的图片
export default {
  name: "commonHeader",
  data() {
    return {
      userImg: require("../assets/images/user.png"),
    };
  },
  methods: {
    handleMenu() {
      this.$store.commit("collaspeMenu");
    },
    logout() {
      this.$store.commit("clearToken");
      this.$store.commit("clearMenu");
      this.$router.push("/login");
    },
  },
  computed: {
    ...mapState({
      tags: (state) => state.tab.tabsList,
    }),
  },
};
</script>
