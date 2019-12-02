/*

layout 列表模式

支持参数：
column              单列
dblColumn           双列
columnDetails       列表+详情
columnHistory       列表+历史
gantt               甘特
ganttResource       甘特+资源
*/

const linstOne = {
    state: {
        layout: "column",
        oldLayout: "",
        alb: false,
        tableData: {
            columns: [
                {
                    name: "日期",
                    code: "date",
                    width: "",
                    widthEdit: false,
                    copyWidth: "",
                    fixed: false,
                    show:true
                },
                {
                    name: "姓名",
                    code: "name",
                    width: "",
                    copyWidth: "",
                    widthEdit: false,
                    fixed: false,
                    show:true
                },
                {
                    name: "地址",
                    code: "address",
                    width: "",
                    copyWidth: "",
                    widthEdit: false,
                    fixed: false,
                    show:true
                },
                {
                    name: "列一",
                    code: "c1",
                    width: "",
                    copyWidth: "",
                    widthEdit: false,
                    fixed: false,
                    show:true
                },
                {
                    name: "列二",
                    code: "c2",
                    width: "",
                    copyWidth: "",
                    widthEdit: false,
                    fixed: false,
                    show:true
                },
                {
                    name: "列三",
                    code: "c3",
                    width: "",
                    copyWidth: "",
                    widthEdit: false,
                    fixed: false,
                    show:true
                },
                {
                    name: "列四",
                    code: "c4",
                    width: "",
                    copyWidth: "",
                    widthEdit: false,
                    fixed: false,
                    show:true
                },
            ],
            data: [
                {
                    date: "2016-05-02",
                    name: "王小虎",
                    address: "上海市普陀区金沙江路 1518 弄",
                    c1: "测试列一",
                    c2: "测试列二",
                    c3: "测试列三",
                    c4: "测试列四",
                },
                {
                    date: "2016-05-03",
                    name: "王小虎",
                    address: "上海市普陀区金沙江路 1518 弄",
                    c1: "测试列一",
                    c2: "测试列二",
                    c3: "测试列三",
                    c4: "测试列四",
                },

            ]
        },
    },
    mutations: {
        toggle_listone_layout: (state: any, layout: string) => {
            state.layout = layout;
        },
        save_old_layout: (state: any, layout: string) => {

        },
        reset_table_columns: (state: any, columns: any) => {
            state.tableData.columns = columns;
        },
        toggle_table_alb: (state: any, alb: boolean) => {
            state.alb = alb;
        }
    }
}

export default linstOne;