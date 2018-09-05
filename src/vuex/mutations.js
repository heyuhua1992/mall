const mutations = {
  updateUserInfo (state, nickName) {
    state.nickName = nickName
  },
  updateCartCount (state, cartCount) {
    state.cartCount += parseInt(cartCount)
  },
  initCartCount (state, cartCount) {
    state.cartCount = cartCount
  }
}

export default mutations
