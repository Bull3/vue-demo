import request from '@/utils/request'

export function menuData() {
    let data: any = [
        {
            icon: "user",
            name: "权限管理",
            mtype: "list",
            mnum: "authMgr",
            sub: [
                {
                    icon: "user",
                    name: "用户管理",
                    mtype: "list",
                    mnum: "userMgr",
                }
            ],
        },
    ];
    return data;
}