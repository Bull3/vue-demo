export const editOneData = () => {
    let data = {
        // 开启tab折叠  默认false 平铺
        openTabMode: false,
        headerData: [
            {
                label: "一二三四五六",
                code: "h1"
            },
            {
                label: "一二三四五六",
                code: "h2"
            },
            {
                label: "一二三四五六",
                code: "h3"
            },
            {
                label: "一二三四五六",
                code: "h4"
            },
            {
                label: "一二三四五六",
                code: "h5"
            },
            {
                label: "一二三四五六",
                code: "h6"
            },
        ],
        main: [
            {
                title: "通用表单50",
                hsGroup: true,
                isShow: true,
                type: "form",

                data: [
                    {
                        groupName: "分组一",
                        data: [
                            {
                                label: "一二三四五六",
                                code: "mf3501"
                            },
                        ]
                    },
                    {
                        groupName: "分组二",
                        data: [
                            {
                                label: "一二三四五六",
                                code: "mf4501"
                            },
                            {
                                label: "一二三四五六",
                                code: "mf4502"
                            },
                        ]
                    },
                    {
                        groupName: "分组三",
                        data: [
                            {
                                label: "一二三四五六",
                                code: "m501"
                            },
                            {
                                label: "一二三四五六",
                                code: "m502"
                            },
                            {
                                label: "一二三四五六",
                                code: "m503"
                            },
                        ]
                    },
                    {
                        groupName: "分组四",
                        data: [
                            {
                                label: "一二三四五六",
                                code: "mf2501"
                            },
                            {
                                label: "一二三四五六",
                                code: "mf2502"
                            },
                            {
                                label: "一二三四五六",
                                code: "mf2503"
                            },
                            {
                                label: "一二三四五六",
                                code: "mf2504"
                            },
                        ]
                    },
                    {
                        groupName: "分组五",
                        data: [
                            {
                                label: "一二三四五六",
                                code: "mf5501"
                            },
                            {
                                label: "一二三四五六",
                                code: "mf5502"
                            },
                        ]
                    },
                    {
                        groupName: "分组六",
                        data: [
                            {
                                label: "一二三四五六",
                                code: "mf6501"
                            },
                            {
                                label: "一二三四五六",
                                code: "mf6502"
                            },
                        ]
                    },
                ],
            },
            {
                title: "通用表单51",
                type: "form",

                isShow: true,
                data: [
                    {
                        label: "一二三四五六",
                        code: "m511"
                    },
                    {
                        label: "一二三四五六",
                        code: "m512"
                    },
                    {
                        label: "一二三四五六",
                        code: "m513"
                    },
                ],
            },
        ],
        sub: [
            {
                title: "通用表单52",
                type: "table",
                isShow: true,
                tableColumn: [
                    {
                        name: "日期",
                        code: "date",
                        width: 180,
                    },
                    {
                        name: "姓名",
                        code: "name",
                        width: 180,
                    },
                    {
                        name: "地址",
                        code: "address",
                    },
                ],
                tableData: [
                    {
                        date: "2016-05-02",
                        name: "王小虎",
                        address: "上海市普陀区金沙江路 1518 弄"
                    },
                    {
                        date: "2016-05-02",
                        name: "王小虎",
                        address: "上海市普陀区金沙江路 1518 弄"
                    },
                    {
                        date: "2016-05-02",
                        name: "王小虎",
                        address: "上海市普陀区金沙江路 1518 弄"
                    },
                ],
            },
        ],
    };
    return data;
}