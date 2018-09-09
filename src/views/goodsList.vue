<template>
<div>
  <NavHeader></NavHeader>
  <NavBread>
    <span slot="bread"></span>
  </NavBread>
  <div class="accessory-result-page accessory-page">
    <div class="container">
      <div class="filter-nav">
        <span class="sortby">排序:</span>
        <a href="javascript:void(0)" class="default" @click="defGoods" :class="{'cur': defFlag}">
          默认
        </a>
        <a href="javascript:void(0)" class="price" :class="{'sort-up': !defFlag && sortFlag, 'cur': !defFlag}" @click="sortGoods">
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
              <div class="priceFilter">
                <input type="text" placeholder="最低价" v-model="priceRange.startPrice">-<input type="text" placeholder="最高价" v-model="priceRange.endPrice">
                <input type="button" value="查找" @click="setPriceFilter('input')">
              </div>
            </dd>
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
              <img src="@/assets/loading-spinning-bubbles.svg" v-show="Loading">
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
  <NavFooter></NavFooter>
</div>
</template>

<script>
import NavHeader from '@/components/navHeader'
import NavFooter from '@/components/navFooter'
import NavBread from '@/components/navBread'
import Modal from '@/components/modal'
import {apiList, apiAddCart} from '@/api/api'
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
          startPrice: 0,
          endPrice: 500
        },
        {
          startPrice: 500,
          endPrice: 1000
        },
        {
          startPrice: 1000,
          endPrice: 2000
        },
        {
          startPrice: 2000,
          endPrice: ''
        }
      ],
      // 价格过滤，当前选中项
      priceChecked: 'all',
      priceRange: {
        startPrice: '',
        endPrice: ''
      },
      filterBy: false,
      overLayFlag: false,
      defFlag: true,
      sortFlag: true, // 升序降序
      page: 1, // 当前页
      pageSize: 8, // 每页内容
      busy: true,
      Loading: false,
      mdShow: false
    }
  },
  methods: {
    getGoodsList (flag) {
      var param = {
        page: this.page,
        pageSize: this.pageSize,
        sort: this.sortFlag ? 1 : -1,
        priceRange: this.priceRange
      }
      this.Loading = true
      apiList({params: param})
        .then(res => {
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
      this.defFlag = false
      this.sortFlag = !this.sortFlag
      this.page = 1
      this.getGoodsList(false)
    },
    defGoods () {
      this.defFlag = true
      this.sortFlag = true
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
      if (index === 'all') {
        this.priceRange = {
          startPrice: '',
          endPrice: ''
        }
      } else if (index !== 'input') {
        this.priceRange = JSON.parse(JSON.stringify(this.priceFilter[index]))
      }
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
      apiAddCart({productId: productId})
        .then(res => {
          if (res.status === 0) {
            this.$toast({
              title: '',
              content: `加入购物车成功`,
              type: 'success',
              onShow () {},
              onHide () {}
            })
            this.$store.commit('updateCartCount', 1)
          } else {
            this.mdShow = true
          }
        })
    },
    closeModal () {
      this.mdShow = false
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
.priceFilter {
  input {
    padding: .2rem;
    width: 28%;
  }
  input[type='button'] {
    padding: .3rem .5rem;
    font-size: 1.2rem;
    border: 1px solid #0381aa;
    color: #fff;
    background-color: #00a7de;
    display: inline-block;
    border-radius: 2px;
    text-align: center;
    cursor: pointer;
    box-sizing: border-box;
  }
}
</style>
