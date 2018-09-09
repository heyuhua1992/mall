import Toast from './toast'

export default {
  install (Vue, options = {}) {
    const VueToast = Vue.extend(Toast)
    let toast = null

    function $toast (params) {
      return new Promise(resolve => {
        /** 只能出现一个弹出框
        if (!toast) {
          toast = new VueToast()

          toast.$mount()
          let id = 'my-toast'
          let div = document.getElementById(id) || document.createElement('div')
          if (!document.getElementById(id)) {
            div.setAttribute('id', id)
            div.setAttribute('style', 'display:flex!important;')
          }
          div.appendChild(toast.$el)

          document.querySelector(options.container || 'body').appendChild(div)
        }
         */
        toast = new VueToast()

        toast.$mount()
        let id = 'my-toast'
        let date = new Date().getTime() // 制造唯一标识
        let div = document.getElementById(id) || document.createElement('div')
        if (!document.getElementById(id)) {
          div.setAttribute('id', id)
          div.setAttribute('style', 'display:flex!important;')
        }
        toast.$el.setAttribute('data-toast', `my-toast${date}`)
        div.appendChild(toast.$el)
        let timer = setTimeout(() => {
          div.removeChild(document.querySelector(`[data-toast=my-toast${date}]`))
          clearTimeout(timer)
        }, 1000 * 10)
        document.querySelector(options.container || 'body').appendChild(div)
        toast.show(params)
        resolve()
      })
    }

    Vue.prototype.$toast = $toast
  }
}
