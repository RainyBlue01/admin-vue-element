import Vue from 'vue'
import Router from 'vue-router'
import Layout from './layout/Index'

Vue.use(Router)

export const menuRouters = [{
  path: '/',
  name: 'addgoods',
  component: () => import(/* webpackChunkName: "addgoods" */ './views/goods/AddGoods'),
  meta: { title: '商品导入',icon: ''}
}, {
  path: '/goodslist',
  name: 'goodslist',
  component: () => import(/* webpackChunkName: "goodslist" */ './views/goods/GoodsList'),
  meta: { title: '商品列表', icon: '' }
}, {
  path: '/orderlist',
  name: 'orderlist',
  component: () => import(/* webpackChunkName: "orderlist" */ './views/order/OrderList'),
  meta: { title: '采购订单', icon: '' }
},
  {
    path: '/addorder',
    name: 'addorder',
    component: () => import(/* webpackChunkName: "addorder" */ './views/order/AddOrder'),
    meta: { title: '添加采购订单',hidden:true }
  },
  {
    path: '/setorder',
    name: 'setorder',
    component: () => import(/* webpackChunkName: "setorder" */ './views/order/SetOrder'),
    meta: { title: '修改采购订单',hidden:true }
  },
  {
    path: '/orderdes',
    name: 'orderdes',
    component: () => import(/* webpackChunkName: "orderdes" */ './views/order/OrderDes'),
    meta: { title: '查看采购订单',hidden:true }
  }
]

export const otherRouters = [{
  path: '/login',
  name: 'Login',
  component: () => import(/* webpackChunkName: "login" */ './views/Login'),
  meta: { title: '登录', noTab: true, auth: false }
}, {
  path: '/e403',
  name: 'E403',
  component: () => import(/* webpackChunkName: "error" */ './views/errors/E403'),
  meta: { title: '没有权限', noTab: true, auth: false }
}]

function filterComponentRouter (routers) {
  let rs = []
  for (let route of routers) {
    if (Array.isArray(route.children) && route.children.length) {
      rs.push(...filterComponentRouter(route.children))
    } else if (route.component) {
      rs.push(route)
    }
  }
  return rs
}

let layoutChildren = []
// 单独提出，方便动态添加路由
export const layoutRoute = {
  path: '',
  name: 'Layout',
  component: Layout,
  redirect: '/',
  set children (menus) {
    layoutChildren = filterComponentRouter(menus)
  },
  get children () {
    return layoutChildren
  }
}
// 动态添加时，此处不赋值
layoutRoute.children = menuRouters

export default new Router({
  // mode: 'history',
  base: process.env.BASE_URL,
  scrollBehavior: () => ({ y: 0 }),
  routes: [
    ...otherRouters,
    layoutRoute,
    {
      path: '*',
      name: 'E404',
      component: () => import(/* webpackChunkName: "error" */ './views/errors/E404'),
      meta: { title: '页面不存在', noTab: true, auth: false }
    }
  ]
})
