import Vue from 'vue'
import Router from 'vue-router'
import Routes from './routes'
import {apiCheckLogin} from '@/api/api'
Vue.use(Router)

export const router = new Router({
  // 默认的 linkActiveClass 为 router-link-active ,现在把他改为active
  linkActiveClass: 'active',
  mode: 'history',
  routes: Routes
})

router.beforeEach((to, from, next) => {
  apiCheckLogin()
    .then(res => {
      if (res.status === 0) {
        sessionStorage.setItem('userName', res.result.userName)
        next()
      } else {
        if (to.path !== '/' && to.path !== '/other') {
          next({
            path: '/other',
            query: {
              tips: '请先登录，然后再执行该操作',
              back: '/',
              wait: 2000
            }
          })
        }
        sessionStorage.removeItem('userName')
        next()
      }
    })
})
