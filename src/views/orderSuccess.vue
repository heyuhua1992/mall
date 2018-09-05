<template>
<div>
  <NavHeader></NavHeader>
  <NavBread></NavBread>
  <div class="container">
    <div class="page-title-normal">
      <h2 class="page-title-h2"><span>check out</span></h2>
    </div>
    <!-- 进度条 -->
    <div class="check-step">
      <ul>
        <li class="cur"><span>Confirm</span> address</li>
        <li class="cur"><span>View your</span> order</li>
        <li class="cur"><span>Make</span> payment</li>
        <li class="cur"><span>Order</span> confirmation</li>
      </ul>
    </div>

    <div class="order-create">
      <div class="order-create-pic">
        <img src="/static/ok-2.png" alt="">
      </div>
      <div class="order-create-main">
        <h3>
          恭喜你! <br>
          您的订单正在处理中!
        </h3>
        <p>
          <span>订单 ID：{{orderId}}</span>
          <span>订单 金额：{{orderTotal | currency('￥')}}</span>
        </p>
        <div class="order-create-btn-wrap">
          <div class="btn-l-wrap">
            <router-link class="btn btn--m" to="/cart">返回购物车</router-link>
          </div>
          <div class="btn-r-wrap">
            <router-link class="btn btn--m" to="/"> 返回首页</router-link>
          </div>
        </div>
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

export default {
  mounted () {
    let orderId = this.$route.query.orderId
    if (!orderId) {
      return
    }
    this.$axios.get('/users/orderDetail', {params: {orderId: orderId}})
      .then(response => {
        let res = response.data
        if (res.status === 0) {
          this.orderId = orderId
          this.orderTotal = res.result.orderTotal
        }
      })
  },
  data () {
    return {
      orderId: '',
      orderTotal: 0
    }
  },
  components: {
    NavHeader,
    NavFooter,
    NavBread
  }
}
</script>

<style scoped>
</style>
