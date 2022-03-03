// 全局的文件

<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'

export default {
  name: "app",
  components: {},
};
</script>

<style>
body,
html {
  padding: 0;
  margin: 0;
}
#app {
  height: 100vh;
}
</style>
