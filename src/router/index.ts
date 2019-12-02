import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/Home.vue'

Vue.use(Router)

const routes: any = [
    {
        path: '/',
        redirect: "/",
        component: () => import('@/layout/index.vue'),
        children: [
            {
                path: '/',
                name: 'home',
                meta: { title: "首页", icon: "home" },
                component: () => import('@/views/Home.vue')
            }
        ]
    },
    {
        path: '/about',
        name: 'about',
        redirect: "/",
        component: () => import('@/layout/index.vue'),
        children: [
            {
                path: '/',
                meta: { title: "关于", icon: "menu" },
                component: () => import('@/views/About.vue')
            },
        ]
    },
];

export default new Router({
    // mode: 'history',
    base: process.env.BASE_URL,
    routes: routes,
    //   // {
    //   //   path: '/about',
    //   //   name: 'about', 
    //   //   // route level code-splitting
    //   //   // this generates a separate chunk (about.[hash].js) for this route
    //   //   // which is lazy-loaded when the route is visited.
    //   //   component: () => import(/* webpackChunkName: "about" */ '@/views/About.vue')
    //   // }
    // ]
})
