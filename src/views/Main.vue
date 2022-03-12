<template>
  <div>
    <el-container style="height: 100%">
      <el-aside width="auto">
        <!-- //侧边的组件在页面上显示 -->
        <common-aside></common-aside>
      </el-aside>
      <el-container>
        <!-- 首页的组件显示 -->
        <el-header>
          <common-header />
        </el-header>
        <el-main>
          <!-- 这是我们页面功能区显示的地方 -->
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
//引入侧边栏的组件
import commonAside from "../components/commonAside.vue";
//引入头部的组件
import commonHeader from "../components/commonHeader.vue";

export default {
  name: "Home",
  components: { commonAside, commonHeader },
  data() {
    return {};
  },
};
</script>
<style lang="less" scoped>
.el-header {
  background: #333;
}
.el-main {
  padding-top: 0;
}
</style>