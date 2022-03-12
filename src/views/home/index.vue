<template>
  <el-row :gutter="20" class="home">
    <el-col :span="15" style="margin-top: 20px">
      <el-card
        shadow="hover"
        style="height: 400px; overflow-y: auto; overflow-x: hidden"
      >
        <div class="user clearfix">
          <img :src="userImg" />
          <div class="userinfo">
            <p class="name" style="font-size: 30px">Admin</p>
            <p class="avves">超级管理员</p>
          </div>
          <div class="login-info">
            <el-divider></el-divider>
            <p>
              上次登录时间：
              <span>2022-3-3</span>
            </p>
            <p>上次登录地点： <span>武汉</span></p>
          </div>
        </div>
      </el-card>
      <el-card shadow="hover" style="margin-top: 30px">
        <el-button @click="resetDateFilter">清除日期过滤器</el-button>
        <el-button @click="clearFilter">清除所有过滤器</el-button>
        <el-table ref="filterTable" :data="tableData" style="width: 100%">
          <el-table-column
            prop="date"
            label="日期"
            sortable
            width="180"
            column-key="date"
            :filters="[
              { text: '2016-05-01', value: '2016-05-01' },
              { text: '2016-05-02', value: '2016-05-02' },
              { text: '2016-05-03', value: '2016-05-03' },
              { text: '2016-05-04', value: '2016-05-04' },
            ]"
            :filter-method="filterHandler"
          >
          </el-table-column>
          <el-table-column prop="name" label="盒子" width="180">
          </el-table-column>
          <el-table-column prop="light" label="光照" width="180">
          </el-table-column>
          <el-table-column prop="temperature" label="温度" width="180">
          </el-table-column>
          <el-table-column prop="wind" label="姓名" width="180">
          </el-table-column>
          <el-table-column prop="name" label="姓名" width="180">
          </el-table-column>
          <el-table-column prop="name" label="姓名" width="180">
          </el-table-column>
          <el-table-column prop="name" label="姓名" width="180">
          </el-table-column>
          <el-table-column
            prop="tag"
            label="标签"
            width="100"
            :filters="[
              { text: '家', value: '家' },
              { text: '公司', value: '公司' },
            ]"
            :filter-method="filterTag"
            filter-placement="bottom-end"
          >
            <template slot-scope="scope">
              <el-tag
                :type="scope.row.tag === '家' ? 'primary' : 'success'"
                disable-transitions
                >{{ scope.row.tag }}</el-tag
              >
            </template>
          </el-table-column>
        </el-table>
      </el-card>
    </el-col>
  </el-row>
</template>

<script>
// import { getMenu } from "../../api/data.js";
export default {
  name: "User",
  data() {
    return {
      userImg: require("../../assets/images/user.png"),
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
          tag: "家",
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄",
          tag: "公司",
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄",
          tag: "家",
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄",
          tag: "公司",
        },
      ],
    };
  },
  methods: {
    resetDateFilter() {
      this.$refs.filterTable.clearFilter("date");
    },
    clearFilter() {
      this.$refs.filterTable.clearFilter();
    },
    formatter(row, column) {
      return row.address;
    },
    filterTag(value, row) {
      return row.tag === value;
    },
    filterHandler(value, row, column) {
      const property = column["property"];
      return row[property] === value;
    },
  },
  // mounted() {
  //   getMenu().then((res) => {
  //     console.log(res);
  //   });
  // },
};
</script>
<style lang="less" scoped>
.home {
  margin-top: 20px;
}

.user {
  float: left;
  position: absolute;
  height: 400px;
  width: 500px;
  img {
    width: 200px;
    height: 200px;
    border-radius: 50%;
  }
}
.userinfo {
  float: right;
  position: relative;
  top: 50px;
  right: 150px;
}
.login-info {
  margin-top: 80px;
}
//清除浮动
.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}
</style>