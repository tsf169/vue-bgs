<template>
<!-- 定义form表单 -->
  <el-form label-width="100px" ref="form" :model="form" :inline="inline">
    <el-form-item
      v-for="item in formLabel"
      :key="item.lable"
      :label="item.lable"
    >
      <el-input
        v-if="item.type === 'input'"
        :placeholder="'请输入' + item.label"
        v-model="form[item.model]"
      >
      </el-input>
      <el-switch
        v-if="item.type === 'switch'"
        v-model="form[item.model]"
      ></el-switch>
      <el-date-picker
        v-if="item.type === 'date'"
        type="date"
        value-format="yyyy-mm-dd"
        v-model="form[item.model]"
        placeholder="选择日期"
      ></el-date-picker>
      <el-select
        v-if="item.type === 'select'"
        placeholder="请选择"
        v-model="form[item.model]"
      >
        <el-option
          v-for="item in item.opts"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
    </el-form-item>
    <el-form-item><slot></slot></el-form-item>
  </el-form>
</template>
<script>
export default {
  name: "commonForm",
  props: {
    formLabel: Array,
    form: Object,
    inline: Boolean,
  },
  data() {
    return {};
  },
};
</script>