<template>
  <el-menu
    style="line-height: 100%"
    default-active="1-4-1"
    class="el-menu-vertical-demo"
    background-color="#545c64"
    text-color="#fff"
    active-text-color="ffd04b"
    @open="handleOpen"
    @close="handleClose"
    :collapse="isCollapse"
  >
    <h3>{{ isCollapse ? "后台" : "后台管理系统" }}</h3>
    <el-menu-item
      @click="clickMenu(item)"
      v-for="item in nochildren"
      :index="'' + item.path"
      :key="item.path"
    >
      <i :class="'el-icon-' + item.icon"></i>
      <span slot="title">{{ item.label }}</span>
    </el-menu-item>
    <el-submenu
      v-for="item in haschildren"
      :index="'' + item.path"
      :key="item.path"
    >
      <template slot="title">
        <i :class="'el-icon-' + item.icon"></i>
        <span slot="title">{{ item.label }}</span>
      </template>
      <el-menu-item-group
        v-for="(subItem, subIndex) in item.children"
        :index="'' + subItem.path"
        :key="subItem.path"
      >
        <el-menu-item @click="clickMenu(subItem)" :index="'' + subIndex">{{
          subItem.label
        }}</el-menu-item>
      </el-menu-item-group>
    </el-submenu>
  </el-menu>
</template>

<style lang="less" scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 1000px;
}
.el-menu {
  height: 100%;
  border: none;
  h3 {
    color: #fff;
    text-align: center;
    line-height: 48px;
  }
}
</style>

<script>
export default {
  data() {
    return {
      menu: [],
    };
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    clickMenu(item) {
      this.$router.push({ name: item.name });
      // 调用store中的tab.js文件定义的selectMenu方法
      this.$store.commit("selectMenu", item);
    },
  },
  computed: {
    nochildren() {
      return this.asyncMenu.filter((item) => !item.children);
    },
    haschildren() {
      return this.asyncMenu.filter((item) => item.children);
    },
    //拿到iscollapse的属性
    // $store已经在全局注册过的
    isCollapse() {
      return this.$store.state.tab.isCollapse;
    },
    // 获取当前的menu，因为之前没有menu，但登录之后就有menu，在getMenu函数中会从cookie中获得menu
    asyncMenu() {
      return this.$store.state.tab.menu;
    },
  },
};
</script>
 