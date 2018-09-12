<template>
<div>
  <NavHeader></NavHeader>
  <NavBread>
    <span slot="bread">等待支付</span>
  </NavBread>
  <div class="container">
      <!-- <div class="page-title-normal">
        <h2 class="page-title-h2"><span>正在下单...</span></h2>
      </div> -->
    <!-- 进度条 -->
    <div class="check-step">
          <ul>
            <li class="cur">
              <span>确认</span> 地址
            </li>
            <li class="cur">
              <span>预览</span> 订单
            </li>
            <li class="cur">
              <span>选择</span> 支付
            </li>
            <li>
              <span>订单</span> 确认
            </li>
          </ul>
    </div>

    <div class="order-create">
      <div class="order-create-pic">
        <img src="/static/qrcode.png" alt="">
      </div>
      <div class="order-create-main">
        <h3>
          请在15分钟内完成支付! <br>
          <span @click="paySuccess">剩</span>余时间为 {{str}}
        </h3>
      </div>
    </div>
  </div>
  <NavFooter></NavFooter>
</div>
</template>

<script>
import NavHeader from '@/components/navHeader'
import NavFooter from '@/components/navFooter'
import NavBread from '@/components/navBread'
import { apiPayMent } from '@/api/api'
export default {
  mounted () {
    this.countDown(60 * 15)
  },
  data () {
    return {
      str: ''
    }
  },
  methods: {
    countDown (sec) {
      let hour = 0
      let minute = 0
      let second = 0
      let timer = setInterval(() => {
        if (sec >= 60) {
          minute = Math.floor(sec / 60)
          second = sec % 60
          if (minute >= 60) {
            hour = Math.floor(minute / 60)
            minute = minute % 60
          } else {
            hour = 0
          }
        } else {
          second = sec
          hour = 0
          minute = 0
        }

        hour = parseInt(hour) < 10 && parseInt(hour) > 0 ? '0' + hour : hour
        minute = parseInt(minute) < 10 && parseInt(minute) > 0 ? '0' + minute : minute
        second = parseInt(second) < 10 && parseInt(second) > 0 ? '0' + second : second
        this.$set(this, 'str', `${hour}h : ${minute}m : ${second}s`)
        sec--
        if (sec <= 0) {
          this.$router.push('/')
          clearInterval(timer)
        }
      }, 1000)
    },
    paySuccess () {
      apiPayMent({
        addressId: this.$route.query.addressId
      })
        .then(res => {
          if (res.status === 0) {
            this.$router.push({
              path: '/orderSuccess',
              query: {
                orderId: res.result.orderId
              }
            })
          } else {
            this.$tipsMessageCenter({
              content: '该地址不存在',
              type: 'error',
              onShow: () => {},
              onHide: () => {}
            })
          }
        })
        .catch(err => console.log(err))
    }
  },
  components: {
    NavHeader,
    NavFooter,
    NavBread
  }
}
</script>
