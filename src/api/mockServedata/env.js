import Mock from "mockjs";

// 图表数据

let List = [];

export default {
    getEnvData: () => {
        //mock.Random.float产生的随机数100到8000之间 保留显示
        //小于七是因为要生成7组数据
        List = [];
        for (let i = 0; i < 7; i++) {
            List.push(
                Mock.mock({
                    "光照": Mock.Random.float(100, 8000, 0, 0),
                    "温度": Mock.Random.float(100, 8000, 0, 0),
                    "风速": Mock.Random.float(100, 8000, 0, 0),
                    "湿度": Mock.Random.float(100, 8000, 0, 0),
                    "二氧化碳": Mock.Random.float(100, 8000, 0, 0),
                })
            )
        }
        return {
            code: 200,
            data: {
                //折线图
                orderData: {
                    date: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
                    data: List
                }
            }
        }

    }

}