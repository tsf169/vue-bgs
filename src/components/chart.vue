<template>
  <div :id="id" :style="style"></div>
</template>
<script>
export default {
  name: "Chart",
  data() {
    return {
      //echarts实例
      chart: "",
    };
  },
  props: {
    //父组件需要传递的参数：id，width，height，option
    id: {
      type: String,
    },
    width: {
      type: String,
      default: "100%",
    },
    height: {
      type: String,
      default: "300px",
    },
    option: {
      type: Object,
      //Object类型的prop值一定要用函数return出来，不然会报错。原理和data是一样的，
      //使用闭包保证一个vue实例拥有自己的一份props
      default() {
        return {
          title: {
            text: "盒子",
          },
          legend: {
            data: ["盒子"],
          },
          xAxis: {
            data: ["盒子1", "盒子2", "盒子3", "盒子4", "盒子5", "盒子6"],
          },
          yAxis: [
            {
              type: "value",
            },
          ],
          series: [
            {
              name: "盒子",
              type: "line",
              data: [5, 20, 36, 10, 10, 70],
            },
          ],
        };
      },
    },
  },
  computed: {
    style() {
      return {
        height: this.height,
        width: this.width,
      };
    },
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      this.chart = this.$echarts.init(document.getElementById(this.id));
      this.chart.setOption(this.option);
    },
  },
};
</script>