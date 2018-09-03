<template>
<div>
  <NavHeader></NavHeader>
  <NavBread>
    <span slot="bread">GGG</span>
  </NavBread>
  <div class="accessory-result-page accessory-page">
    <div class="container">
      <div class="filter-nav">
        <span class="sortby">排序:</span>
        <a href="javascript:void(0)" class="default">
          默认
        </a>
        <a href="javascript:void(0)" class="price cur" :class="{'sort-up': !sortFlag}" @click="sortGoods">
          价格
          <svg class="icon-arrow-short">
            <use xlink:href="#icon-arrow-short"></use>
          </svg>
        </a>
        <a href="javascript:void(0)" class="filterby stopPop" @click="showFilterPop">Filter by</a>
      </div>
      <div class="accessory-result">
        <!-- filter -->
        <div class="filter stopPop" id="filter" :class="{'filterby-show': filterBy}">
          <dl class="filter-price">
            <dt>价格:</dt>
            <dd>
              <a href="javascript:void(0)"
                 @click="setPriceFilter('all')"
                 :class="{cur: priceChecked === 'all'}">
                全部
              </a>
            </dd>
            <dd v-for="(price, index) in priceFilter" :key="'priceFilter'+index">
              <a href="javascript:void(0)"
                 :class="{cur: priceChecked === index}"
                 @click="setPriceFilter(index)">
                {{price.startPrice}} - {{price.endPrice}}
              </a>
            </dd>
          </dl>
        </div>

        <!-- search result accessories list -->
        <div class="accessory-list-wrap">
          <div class="accessory-list col-4">
            <ul>
              <li v-for="(item, index) in goodsList" :key="`goodsList${index}`">
                <div class="pic">
                  <a href="javascript:;">
                    <img v-lazy="`/static/${item.productImage}`" :key="`static_1${item.productImage}`" :alt="item.productName">
                  </a>
                </div>
                <div class="main">
                  <div class="name">{{item.productName}}</div>
                  <div class="price">{{item.salePrice | currency('￥')}}</div>
                  <div class="btn-area">
                    <a href="javascript:;" class="btn" @click="addCart(item.productId)">
                      加入购物车
                    </a>
                  </div>
                </div>
              </li>
            </ul>
            <div class="load-more"
                 v-infinite-scroll="loadMore"
                 infinite-scroll-disabled="busy"
                 infinite-scroll-distance="10">
              <img src="static/loading-svg/loading-spinning-bubbles.svg" v-show="Loading">
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="md-overlay" v-show="overLayFlag" @click="closePop"></div>
  <Modal :mdShow="mdShow" @close="closeModal">
    <p slot="message">请先登录，否则无法加入购物车</p>
    <div slot="btnGroup">
      <a href="javascript:;" class="btn btn--m" @click="mdShow = false">关闭</a>
    </div>
  </Modal>
  <Modal :mdShow="mdShowCart" @close="closeModal">
    <p slot="message">
      <svg class="icon-status-ok">
        <use xlink:href="#icon-status-ok"></use>
      </svg>
      <span>加入购物车成功</span>
    </p>
    <div slot="btnGroup">
      <a href="javascript:;" class="btn btn--m" @click="mdShowCart = false">继续购物</a>
      <router-link href="javascript:;" class="btn btn--m" to="/cart">查看购物车</router-link>
    </div>
  </Modal>
  <NavFooter></NavFooter>
</div>
</template>

<script>
import NavHeader from '@/components/navHeader'
import NavFooter from '@/components/navFooter'
import NavBread from '@/components/navBread'
import Modal from '@/components/modal'
export default {
  mounted () {
    this.getGoodsList()
  },
  data () {
    return {
      // 存储商品列表
      goodsList: [],
      // 价格过滤列表
      priceFilter: [
        {
          startPrice: '0.00',
          endPrice: '500.00'
        },
        {
          startPrice: '500.00',
          endPrice: '1000.00'
        },
        {
          startPrice: '1000.00',
          endPrice: '2000.00'
        },
        {
          startPrice: '2000.00',
          endPrice: '9999.00'
        }
      ],
      // 价格过滤，当前选中项
      priceChecked: 'all',
      filterBy: false,
      overLayFlag: false,
      sortFlag: true, // 升序降序
      page: 1, // 当前页
      pageSize: 8, // 每页内容
      busy: true,
      Loading: false,
      mdShow: false,
      mdShowCart: false
    }
  },
  methods: {
    getGoodsList (flag) {
      var param = {
        page: this.page,
        pageSize: this.pageSize,
        sort: this.sortFlag ? 1 : -1,
        priceLevel: this.priceChecked
      }
      this.Loading = true
      this.$axios.get('/goods/list', {params: param})
        .then(response => {
          let res = response.data
          this.Loading = false
          if (res.status === 0) {
            if (flag) {
              this.$set(this, 'goodsList', this.goodsList.concat(res.result.list))
              if (res.result.count === 0) {
                this.busy = true
              } else {
                this.busy = false
              }
            } else {
              this.$set(this, 'goodsList', res.result.list)
              this.busy = false
            }
          } else {
            this.$set(this, 'goodsList', [])
          }
        })
        .catch(error => {
          console.log(error)
        })
    },
    sortGoods () {
      this.sortFlag = !this.sortFlag
      this.page = 1
      this.getGoodsList(false)
    },
    showFilterPop () {
      this.filterBy = true
      this.overLayFlag = true
    },
    closePop () {
      this.filterBy = false
      this.overLayFlag = false
    },
    setPriceFilter (index) {
      this.priceChecked = index
      this.closePop()
      this.page = 1
      this.getGoodsList()
    },
    loadMore () {
      this.busy = true
      setTimeout(() => {
        this.page++
        this.getGoodsList(true)
      }, 500)
    },
    addCart (productId) {
      this.$axios.post('/goods/addCart', {productId: productId})
        .then(res => {
          if (res.data.status === 0) {
            this.mdShowCart = true
          } else {
            this.mdShow = true
          }
        })
    },
    closeModal () {
      this.mdShow = false
      this.mdShowCart = false
    }
  },
  components: {
    NavHeader,
    NavFooter,
    NavBread,
    Modal
  }
}
</script>

<style lang="scss">
</style>
