import request from '@/utils/request'

export function fetchList(query: any) {
  return request({
    url: '/article/list',
    method: 'get',
    params: query
  })
}