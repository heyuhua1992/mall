const routes = [
  {
    path: '/',
    component: resolve => require(['@/views/goodsList'], resolve)
  },
  {
    path: '/cart',
    component: resolve => require(['@/views/cart'], resolve)
  },
  {
    path: '/address',
    component: resolve => require(['@/views/address'], resolve)
  },
  {
    path: '/orderConfirm',
    component: resolve => require(['@/views/orderConfirm'], resolve)
  },
  {
    path: '/orderSuccess',
    component: resolve => require(['@/views/orderSuccess'], resolve)
  },
  {
    path: '/orderPay',
    component: resolve => require(['@/views/orderPay'], resolve)
  },
  {
    path: '/other',
    component: resolve => require(['@/views/other'], resolve)
  }
]

export default routes
