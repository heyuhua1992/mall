<template>
  <header class="header">
    <symbol id="icon-arrow-short" viewBox="0 0 25 32">
      <title>arrow-short</title>
      <path class="path1" d="M24.487 18.922l-1.948-1.948-8.904 8.904v-25.878h-2.783v25.878l-8.904-8.904-1.948 1.948 12.243 12.243z"></path>
    </symbol>
    <symbol id="icon-status-ok" viewBox="0 0 32 32">
      <title>status-ok</title>
      <path class="path1" d="M22.361 10.903l-9.71 9.063-2.998-2.998c-0.208-0.209-0.546-0.209-0.754 0s-0.208 0.546 0 0.754l3.363 3.363c0.104 0.104 0.241 0.156 0.377 0.156 0.131 0 0.261-0.048 0.364-0.143l10.087-9.414c0.215-0.201 0.227-0.539 0.026-0.754s-0.539-0.226-0.754-0.026z"></path>
      <path class="path2" d="M16 30.933c-8.234 0-14.933-6.699-14.933-14.933s6.699-14.933 14.933-14.933c8.234 0 14.933 6.699 14.933 14.933s-6.699 14.933-14.933 14.933zM16 0c-8.822 0-16 7.178-16 16 0 8.823 7.178 16 16 16s16-7.177 16-16c0-8.822-7.178-16-16-16z"></path>
    </symbol>
    <symbol id="icon-cart" viewBox="0 0 38 32">
      <title>cart</title>
      <path class="path1" d="M37.759 0h-4.133c-0.733 0.004-1.337 0.549-1.434 1.255l-0.546 4.342c-0.081 0.484-0.496 0.849-0.997 0.849-0.005 0-0.009-0-0.014-0h-27.604c-0.003 0-0.007-0-0.011-0-1.674 0-3.031 1.357-3.031 3.031 0 0.34 0.056 0.666 0.159 0.971l2.52 8.062c0.385 1.194 1.486 2.043 2.785 2.043 0.126 0 0.25-0.008 0.372-0.023l22.983 0.002c0.515 0.131 0.626 0.768 0.626 1.283 0.005 0.044 0.009 0.095 0.009 0.146 0 0.501-0.294 0.933-0.718 1.134l-22.439 0.003c-0.354 0-0.642 0.287-0.642 0.642s0.287 0.642 0.642 0.642h22.745l0.131-0.071c0.919-0.392 1.551-1.287 1.551-2.33 0-0.058-0.002-0.116-0.006-0.173 0.021-0.108 0.033-0.24 0.033-0.376 0-1.072-0.732-1.973-1.724-2.23l-23.357-0.004c-0.063 0.008-0.135 0.013-0.209 0.013-0.719 0-1.332-0.455-1.566-1.093l-2.53-8.095c-0.048-0.154-0.076-0.332-0.076-0.515 0-0.973 0.782-1.764 1.752-1.778h27.657c1.159-0.004 2.112-0.883 2.232-2.011l0.547-4.345c0.010-0.083 0.078-0.147 0.161-0.152l4.133-0c0.354 0 0.642-0.287 0.642-0.642s-0.287-0.642-0.642-0.642z"></path>
      <path class="path2" d="M31.323 9.69c-0.022-0.003-0.048-0.004-0.074-0.004-0.328 0-0.598 0.248-0.633 0.567l-0.809 7.268c-0.003 0.022-0.004 0.048-0.004 0.074 0 0.328 0.248 0.598 0.567 0.633l0.074 0c0.001 0 0.003 0 0.004 0 0.327 0 0.596-0.246 0.632-0.563l0.809-7.268c0.003-0.022 0.004-0.048 0.004-0.074 0-0.328-0.248-0.598-0.567-0.633z"></path>
      <path class="path3" d="M27.514 25.594c-1.769 0-3.203 1.434-3.203 3.203s1.434 3.203 3.203 3.203c1.769 0 3.203-1.434 3.203-3.203s-1.434-3.203-3.203-3.203zM27.514 30.717c-1.060 0-1.92-0.86-1.92-1.92s0.86-1.92 1.92-1.92c1.060 0 1.92 0.86 1.92 1.92s-0.86 1.92-1.92 1.92z"></path>
      <path class="path4" d="M9.599 25.594c-1.769 0-3.203 1.434-3.203 3.203s1.434 3.203 3.203 3.203c1.769 0 3.203-1.434 3.203-3.203s-1.434-3.203-3.203-3.203zM9.599 30.717c-1.060 0-1.92-0.86-1.92-1.92s0.86-1.92 1.92-1.92c1.060 0 1.92 0.86 1.92 1.92s-0.86 1.92-1.92 1.92z"></path>
    </symbol>
    <div class="navbar">
      <div class="navbar-left-container">
        <a href="/">
          <img class="navbar-brand-logo" src="static/logo.png" width="200" height="80" title="home"></a>
      </div>
      <div class="navbar-right-container" style="display: flex;">
        <div class="navbar-menu-container">
          <!--<a href="/" class="navbar-link">我的账户</a>-->
          <span class="navbar-link" v-text="`欢迎您，${nickName}`" v-if="nickName"></span>
          <a href="javascript:void(0)" class="navbar-link" @click="setFlag(true)" v-if="!nickName">登陆</a>
          <a href="javascript:void(0)" class="navbar-link" @click="logout" v-if="nickName">退出</a>
          <div class="navbar-cart-container">
            <span class="navbar-cart-count" v-show="cartCount">{{cartCount}}</span>
            <a class="navbar-link navbar-cart-link" href="/cart">
              <svg class="navbar-cart-logo">
                <use xlink:href="#icon-cart"></use>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
    <div class="md-modal modal-msg md-modal-transition md-show" v-if="loginModalFlag">
      <div class="md-modal-inner">
        <div class="md-top">
          <div class="md-title">
            登陆
          </div>
          <div class="md-close"  @click="setFlag(false)"></div>
        </div>
        <div class="md-content">
          <div class="confirm-tips">
            <div class="error-wrap">
              <span class="error" :class="{'error-show': errorTip}">
                用户名或密码错误
              </span>
            </div>
            <ul class="input-wrap">
              <li class="regi_form_input">
                <i class="icon IconPeople"></i>
                <input type="text" tabindex="1" name="loginname" v-model="userName" class="regi_login_input">
              </li>
              <li class="regi_form_input noMargin">
                <i class="icon IconPwd"></i>
                <input type="password" tabindex="2" name="password" v-model="userPwd" class="regi_login_input" @keyup.enter="login">
              </li>
            </ul>
          </div>
          <div class="login-wrap">
            <a href="javascript:;" class="btn-login" @click="login">登陆</a>
          </div>
        </div>
      </div>
    </div>
    <div class="md-overlay" v-show="loginModalFlag" @click="setFlag(false)"></div>
  </header>
</template>

<script>
import '@/assets/scss/login.scss'
import {mapState} from 'vuex'
import {apiLogin, apiLogout, apiGetCartCount} from '@/api/api'

export default {
  mounted () {
    this.init()
  },
  data () {
    return {
      userName: 'admin',
      userPwd: '123456',
      errorTip: false,
      loginModalFlag: false
    }
  },
  methods: {
    init () {
      this.$store.commit('updateUserInfo', sessionStorage.getItem('userName'))
      this.getCartCount()
      this.loginModalFlag = false
    },
    login () {
      if (!this.userName || !this.userPwd) {
        this.errorTip = true
        return
      }
      this.errorTip = false
      apiLogin({userName: this.userName, userPwd: this.userPwd})
        .then(res => {
          if (res.status === 0) {
            this.errorTip = false
            this.loginModalFlag = false
            this.$store.commit('updateUserInfo', res.result.userName)
            this.getCartCount()
          } else {
            this.errorTip = true
          }
        })
    },
    setFlag (flag) {
      this.loginModalFlag = flag
      this.errorTip = false
    },
    logout () {
      apiLogout()
        .then(res => {
          if (res.status === 0) {
            this.$store.commit('updateUserInfo', '')
            this.$store.commit('updateCartCount', 0)
            sessionStorage.removeItem('userName')
            if (this.$route.path === '/') {
              this.$router.go(0)
            } else {
              this.$router.push({path: '/'})
            }
          }
        })
    },
    getCartCount () {
      apiGetCartCount()
        .then(res => {
          if (res.status === 0) {
            this.$store.commit('initCartCount', res.result)
          }
        })
    }
  },
  computed: {
    ...mapState(['nickName', 'cartCount'])
    // nickName () {
    //   return this.$store.state.nickName
    // },
    // cartCount () {
    //   return this.$store.state.cartCount
    // }
  }
}
</script>
