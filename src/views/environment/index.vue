 <template>
  <div class="table">
    <el-card shadow="hover">
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="date" label="日期" width="180">
        </el-table-column>
        <el-table-column prop="name" label="盒子" width="180">
        </el-table-column>
        <el-table-column prop="light" label="光照" width="180">
        </el-table-column>
        <el-table-column prop="temperature" label="温度" width="180">
        </el-table-column>
        <el-table-column prop="wind" label="风速" width="180">
        </el-table-column>
        <el-table-column prop="humidity" label="湿度" width="180">
        </el-table-column>
        <el-table-column prop="carbon" label="二氧化碳" width="180">
        </el-table-column>
      </el-table>
    </el-card>
    <div class="linechart">
      <el-card shadow="hover">
        <div style="height: 300px" ref="echarts" id="main"></div>
      </el-card>
    </div>

    <div class="linechart2">
      <el-card shadow="hover">
        <div style="height: 300px" ref="echarts" id="app">
          <Chart id="test" />
        </div>
      </el-card>
    </div>
  </div>
</template>

  <script>
import * as echarts from "echarts";
import Chart from "../../components/chart.vue";
import { getData } from "../../api/data.js";
export default {
  name: "app",
  components: {
    Chart,
  },
  data() {
    return {
      tableData: [
        {
          date: "2016-05-02",
          name: "盒子1",
          light: 120,
          temperature: 30,
          wind: 30,
          humidity: 120,
          carbon: 120,
        },
        {
          date: "2016-05-04",
          name: "盒子1",
          light: 120,
          temperature: 30,
          wind: 30,
          humidity: 120,
          carbon: 120,
        },
        {
          date: "2016-05-01",
          name: "盒子1",
          light: 120,
          temperature: 30,
          wind: 30,
          humidity: 120,
          carbon: 120,
        },
        {
          date: "2016-05-03",
          name: "盒子1",
          light: 120,
          temperature: 30,
          wind: 30,
          humidity: 120,
          carbon: 120,
        },
      ],
    };
  },

  // methods: {
  //   line() {
  //     var chartDom = document.getElementById("main");
  //     var myChart = echarts.init(chartDom);
  //     var option;

  //     option = {
  //       title: {
  //         text: "environment Line",
  //       },
  //       tooltip: {
  //         trigger: "axis",
  //       },
  //       legend: {
  //         data: ["光照", "温度", "风速", "湿度", "二氧化碳"],
  //       },
  //       grid: {
  //         left: "3%",
  //         right: "4%",
  //         bottom: "3%",
  //         containLabel: true,
  //       },
  //       toolbox: {
  //         feature: {
  //           saveAsImage: {},
  //         },
  //       },
  //       xAxis: {
  //         type: "category",
  //         boundaryGap: false,
  //         data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
  //       },
  //       yAxis: {
  //         type: "value",
  //       },
  //       series: [
  //         {
  //           name: "光照",
  //           type: "line",
  //           stack: "Total",
  //           data: [120, 132, 101, 134, 90, 230, 210],
  //         },
  //         {
  //           name: "温度",
  //           type: "line",
  //           stack: "Total",
  //           data: [220, 182, 191, 234, 290, 330, 310],
  //         },
  //         {
  //           name: "风速",
  //           type: "line",
  //           stack: "Total",
  //           data: [150, 232, 201, 154, 190, 330, 410],
  //         },
  //         {
  //           name: "湿度",
  //           type: "line",
  //           stack: "Total",
  //           data: [320, 332, 301, 334, 390, 330, 320],
  //         },
  //         {
  //           name: "二氧化碳",
  //           type: "line",
  //           stack: "Total",
  //           data: [820, 932, 901, 934, 1290, 1330, 1320],
  //         },
  //       ],
  //     };

  //     option && myChart.setOption(option);
  //   },
  // },

  mounted() {
    //   this.timer = setTimeout(this.line, 1000);
    // },
    // beforeDestroy() {
    //   clearTimeout(this.timer);
    {
      getData().then((res) => {
        const { code, data } = res.data;
        if (code === 200) {
          // console.log(data);
          var chartDom = document.getElementById("main");
          var myChart = echarts.init(chartDom);
          const order = data.orderData;
          console.log(order);
          const Data = order.date;
          const keyArray = Object.keys(order.data[0]);
          // console.log(keyArray);//['光照', '温度', '风速', '湿度', '二氧化碳']
          var series = [];
          keyArray.forEach((key) => {
            series.push({
              name: key,
              type: "line",
              stack: "Total",
              data: order.data.map((item) => item[key]) ,
            });
          });
          // console.log(series);
          const option = {
            title: {
              text: "environment Line",
            },
            tooltip: {
              trigger: "axis",
            },
            legend: {
              data: ["光照", "温度", "风速", "湿度", "二氧化碳"],
            },
            grid: {
              left: "3%",
              right: "4%",
              bottom: "3%",
              containLabel: true,
            },
            toolbox: {
              feature: {
                saveAsImage: {},
              },
            },
            xAxis: {
              type: "category",
              boundaryGap: false,
              data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
            },
            yAxis: {
              type: "value",
            },
            series,
          };
          console.log("series", option.series);
          // myChart.clear();
          myChart.setOption(option);
        }
      });
    }
  },
};
</script>