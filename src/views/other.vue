<template>
<div class="other">
  <div class="other-box">
    <router-link :to="back">
      {{ tips }}
    </router-link>
  </div>
</div>
</template>

<script>
export default {
  created () {
    let query = this.$route.query
    // tips: '登陆成功，3秒后返回首页,无反应可直接点击跳转',
    // back: '/',
    // wait: 3000
    this.tips = query.tips || '未知错误'
    this.back = query.back || '/'
    this.wait = query.wait || 3000

    let time = setTimeout(() => {
      this.$router.push({path: this.back})
      window.clearTimeout(time)
    }, this.wait)
  }
}
</script>

<style lang="scss">
.other {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background-color: #fff;
  z-index: 500000;
  .other-box {
    display: block;
    text-align: center;
    margin: auto;
    max-width: 90vw;
    margin-top: 30vh;
    font-size: 2rem;
  }
}
</style>
