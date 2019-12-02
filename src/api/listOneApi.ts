export const filterMockData = () => {
    return [
        {
            label: "某某公司1",
            value: "mmgs",
            options2: [
                {
                    label: "大于",
                    value: ">",
                },
                {
                    label: "小于",
                    value: "<",
                },
            ],
            options3: {
                type: "input",
                label: "中文名",
                value: "xxx",
            }
        },
        {
            label: "某某公司2",
            value: "mmgs2",
            options2: [
                {
                    label: "等于",
                    value: "=",
                },
                {
                    label: "不等于",
                    value: "!=",
                },
            ],
            options3: {
                type: "dialog",
                label: "中文名",
                value: "xxx",
            }
        },
        {
            label: "某某公司3",
            value: "mmgs3",
            options2: [
                {
                    label: "包含",
                    value: "=",
                },
                {
                    label: "不包含",
                    value: "!=",
                },
            ],
            options3: {
                type: "datepicker",
                label: "中文名",
                value: "",
            }
        }
    ]
}

export const v1Data = () => {
    let data: any = [
        {
            label: "某某公司1",
            value: "mmgs1",
        },
        {
            label: "某某公司2",
            value: "mmgs2",
        },
        {
            label: "某某公司3",
            value: "mmgs3",
        }
    ];
    return data;
}