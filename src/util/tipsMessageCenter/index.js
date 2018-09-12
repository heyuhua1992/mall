import TipsMessageCenter from './tipsMessageCenter'

export default {
  install (Vue, options = {}) {
    const TipsMC = Vue.extend(TipsMessageCenter)
    let tmc = null
    function $tmc (params) {
      return new Promise(resolve => {
        tmc = new TipsMC()
        tmc.$mount()

        let id = 'tips-message-center'
        let date = new Date().getTime() // 制造唯一标识
        let div = document.getElementById(id) || document.createElement('div')
        if (!document.getElementById(id)) {
          div.setAttribute('id', id)
          // div.setAttribute('style', 'position: fixed;top: 0;right: 0 ;z-index: 10000;')
        }
        tmc.$el.setAttribute('data-tipsMessageCenter', `tipsMessageCenter${date}`)
        div.appendChild(tmc.$el)
        // let timer = setTimeout(() => {
        //   div.removeChild(document.querySelector(`[data-toast=my-toast${date}]`))
        //   clearTimeout(timer)
        // }, 1000 * 10)
        document.querySelector(options.container || 'body').appendChild(div)

        tmc.show(params)
        resolve()
      })
    }
    Vue.prototype.$tipsMessageCenter = $tmc
  }
}
