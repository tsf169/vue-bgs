const {
  defineConfig
} = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  // 修改配置项,关闭语法检查组件名
  lintOnSave: false
})