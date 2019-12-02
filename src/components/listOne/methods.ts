import { log } from '@/utils';


// 查询条件数据
export class searchData {
    v1: string = "";
    v2: string = "";
    v3: string = "";
    constructor(v1?: string) {
        if (v1) {
            this.v1 = v1;
        }
    }
}



let _this: any;
export const methods = {
    init: (__this: any) => {
        _this = __this;
    },
    // 搜索弹框添加条件
    searchAddTj: (e: string) => {
        _this.searchDatas.push(new searchData(e));
    },
    // 搜索弹框删除条件
    searchDeleteTj: (inx: number) => {
        _this.$delete(_this.searchDatas, inx);
    },
    // 新增树分组
    addTreeGroup: () => {
        console.log(`新增组`)
    },
    // 删除树分组
    deleteTreeGroup: () => {
        console.log(`删除组`)
    },
    // 编辑树分组
    editTreeGroup: () => {
        console.log(`编辑组`)
    },
    // 树节点过滤
    filterNode: (value: any, data: any) => {
        if (!value) return true;
        return data.name.indexOf(value) !== -1 || data.list1.indexOf(value) !== -1;
    },
    // 树node选中(多选的时候)
    treeNodeSelect: (data: any) => {
        console.log(`树节点选中`, data);
        
    },
    // 树node点击(没有多选的时候)
    treeNodeClick: (data: any) => {
        // 如果当前开启多选，不触发此事件
        if (_this.showTreeCheckbox) {
            return;
        }
        console.log(`树节点选中`, data.name);
        
    },
    // 折叠树
    foldTree: () => {
        if (_this.treeIsFlod) {
            return;
        }
        if (_this.tableIsFlod) {
            _this.tableIsFlod = false;
            return
        }
        _this.treeIsFlod = true;
    },
    // 折叠表格
    foldTable: () => {
        if (_this.treeIsFlod) {
            _this.treeIsFlod = false;
        } else {
            _this.tableIsFlod = true;
        }
    },
    // 分页按钮
    pageChange: (str: string, v: number) => {
        if (str === 'size') {
            _this.pageAction.size = v;
        } else {
            _this.pageAction.page = v;
        }
    }

};

/*

部分脚本变量使用说明：

颜色表

参数一是前景颜色,参数二是背景颜色,参数三是要发送的文字信息,参数四等于'Self'时只发送给自己, 等于'Group'时发送给组队, 等于'National'时发送给自己国家的人(使用于国战), 等于'Map'时发送到当前地图中的人物.如果省略参数四表示全服发送.
GuildNoticeMsg 255 233 发送自定义颜色的文字信息. Self





*/