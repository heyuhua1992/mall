const routes = [
  {
    path: '/',
    component: resolve => require(['@/views/goodsList'], resolve)
  },
  {
    path: '/cart',
    component: resolve => require(['@/views/cart'], resolve)
  }
]

export default routes
