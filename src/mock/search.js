import Mock from "mockjs";

function getTableData(currentPage, pageSize) {
  let num
  const List = []
  const count = ~~(Math.random() * 40) + (pageSize || 0)

  if (!currentPage) {
    currentPage = 1
    pageSize = 10
    num = count
  } else {
    num = pageSize
  }

  for (let i = 0; i < num; i++) {
    List.push(Mock.mock({
      id: i + currentPage || 1,
      uname: '@name',
      rname: '@cname',
      'remark|1': ['管理员', 'A级用户', 'B级用户'],
      code: "",
    }))
  }
  return {
    "msg": "",
    "suc": true,
    "data": {
      "users": List,
      "page": currentPage,
      "size": pageSize,
      "rcount": count
    }
  }
}

export default getTableData

