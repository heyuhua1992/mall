<template>
<transition name="tips-fade">
  <div
    class="tips-message-center"
    v-show="isActive"
    :class="bgClass"
    @mouseenter="onMouseenter"
    @mouseleave="onMouseleave">
    <svg aria-hidden="true" style="position: absolute; width: 0; height: 0; overflow: hidden;" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
      <defs>
        <symbol id="icon-warning" viewBox="0 0 32 32">
          <title>warning</title>
          <path d="M16 2.899l13.409 26.726h-26.819l13.409-26.726zM16 0c-0.69 0-1.379 0.465-1.903 1.395l-13.659 27.222c-1.046 1.86-0.156 3.383 1.978 3.383h27.166c2.134 0 3.025-1.522 1.978-3.383h0l-13.659-27.222c-0.523-0.93-1.213-1.395-1.903-1.395v0z"></path>
          <path d="M18 26c0 1.105-0.895 2-2 2s-2-0.895-2-2c0-1.105 0.895-2 2-2s2 0.895 2 2z"></path>
          <path d="M16 22c-1.105 0-2-0.895-2-2v-6c0-1.105 0.895-2 2-2s2 0.895 2 2v6c0 1.105-0.895 2-2 2z"></path>
        </symbol>
        <symbol id="icon-info" viewBox="0 0 32 32">
          <title>info</title>
          <path d="M14 9.5c0-0.825 0.675-1.5 1.5-1.5h1c0.825 0 1.5 0.675 1.5 1.5v1c0 0.825-0.675 1.5-1.5 1.5h-1c-0.825 0-1.5-0.675-1.5-1.5v-1z"></path>
          <path d="M16 0c-8.837 0-16 7.163-16 16s7.163 16 16 16 16-7.163 16-16-7.163-16-16-16zM16 29c-7.18 0-13-5.82-13-13s5.82-13 13-13 13 5.82 13 13-5.82 13-13 13z"></path>
          <path d="M20 24h-8v-2h2v-6h-2v-2h6v8h2z"></path>
        </symbol>
        <symbol id="icon-error" viewBox="0 0 32 32">
          <title>error</title>
          <path d="M16 0c-8.837 0-16 7.163-16 16s7.163 16 16 16 16-7.163 16-16-7.163-16-16-16zM16 29c-7.18 0-13-5.82-13-13s5.82-13 13-13 13 5.82 13 13-5.82 13-13 13z"></path>
          <path d="M21 8l-5 5-5-5-3 3 5 5-5 5 3 3 5-5 5 5 3-3-5-5 5-5z"></path>
        </symbol>
        <symbol id="icon-success" viewBox="0 0 30 32">
          <title>success</title>
          <path d="M24.24 5.5l-12.6 12.6-5.88-5.88-4.2 4.2 10.080 10.080 16.8-16.8z"></path>
        </symbol>
      </defs>
    </svg>
    <i class="tips-icon">
      <svg class="icon" :class="iconClass">
        <use :xlink:href="`#${iconClass}`"></use>
      </svg>
    </i>
    <p class="tips-content" :class="fontClass">{{content}}</p>
    <i @click="hide" class="tips-close-button">×</i>
  </div>
</transition>
</template>

<script>
export default {
  data () {
    return {
      list: [],
      title: null,
      content: null,
      type: null,
      isActive: false,
      timer: null,
      onShow: () => {},
      onHide: () => {}
    }
  },
  methods: {
    // 显示
    show (params) {
      let {content, title, onShow, onHide, type} = params
      this.type = type
      this.content = content
      this.title = title
      this.onShow = onShow
      this.onHide = onHide

      this.isActive = true
      this.setTimer()
    },
    // 隐藏
    hide () {
      this.isActive = false
    },
    // 计时器
    setTimer () {
      clearTimeout(this.timer)
      this.timer = setTimeout(() => {
        this.isActive = false
        clearTimeout(this.timer)
      }, 2000)
    },
    // 鼠标移至组件时保持显示状态
    onMouseenter () {
      clearTimeout(this.timer)
    },
    // 鼠标移开组件时重新定时
    onMouseleave () {
      if (this.isActive) this.setTimer()
    }
  },
  computed: {
    iconClass () {
      // 样式'success/warning/info/error'
      return this.type ? 'icon-' + this.type : null
    },
    bgClass () {
      return this.type ? 'tips-bg-' + this.type : null
    },
    fontClass () {
      return this.type ? 'font-' + this.type : null
    }
  },
  watch: {
    isActive (val) {
      if (val && typeof this.onShow === 'function') {
        this.onShow()
      } else if (!val && typeof this.onHide === 'function') {
        this.onHide()
      }
    }
  }
}
</script>

<style scoped>
.tips-message-center {
  min-width: 30rem;
  max-width: 90%;
  box-sizing: border-box;
  border-radius: .4rem;
  border: .1rem solid #ebeef5;
  position: fixed;
  flex-direction: column;
  justify-content: space-between;
  left: 50%;
  top: 2rem;
  transform: translateX(-50%);
  background-color: #edf2fc;
  transition: opacity .3s,transform .4s;
  overflow: hidden;
  padding: 1.5rem 1.5rem 1.5rem 2rem;
  display: flex;
  align-items: center;
}
.tips-bg-info {
}
.tips-bg-success {
  background-color: #f0f9eb;
  border-color: #e1f3d8;
}
.tips-bg-warning {
  background-color: #fdf6ec;
  border-color: #faecd8;
}
.tips-bg-error {
  background-color: #fef0f0;
  border-color: #fde2e2;
}
.tips-icon {
  width: 1.6rem;
  height: 1.6rem;
  position: absolute;
  top: 50%;
  left: 15px;
  transform: translateY(-50%);
  font-size: 1.8rem;
  font-style: normal;
  font-weight: 400;
  font-variant: normal;
  text-transform: none;
  line-height: 1.8rem;
  display: inline-block;
  -webkit-font-smoothing: antialiased;
}
.icon {
  width: 100%;
  height: 100%;
}
.icon-info {
  fill: #909399;
}
.icon-success {
  fill: #67c23a;
}
.icon-warning {
  fill:#e6a23c;
}
.icon-error {
  fill: #f56c6c;
}
.tips-content {
  color: #909399;
  margin: 0;
  padding: 0 1.5rem 0 1.5rem;
  font-size: 1.4rem;
  line-height: 1.4rem;
  word-wrap:break-word;
  word-break:break-all;
}
.font-info {
  color: #909399;
}
.font-success {
  color: #67c23a;
}
.font-warning {
  color: #e6a23c;
}
.font-error {
  color: #f56c6c;
}
.tips-close-button {
  position: absolute;
  top: 50%;
  right: 1.5rem;
  transform: translateY(-50%);
  cursor: pointer;
  color: #c0c4cc;
  font-size: 1.8rem;
  font-style: normal;
  font-weight: 400;
  font-variant: normal;
  text-transform: none;
  line-height: 1.8rem;
  vertical-align: baseline;
  display: inline-block;
  -webkit-font-smoothing: antialiased;
}
.tips-message-center:hover {
  opacity: 1;
  box-shadow: 0 0 .5rem #ccc;
  transition: all .2s ease;
}
.tips-fade-enter, .tips-fade-leave-active {
  opacity: 0;
  top: 0;
}
.tips-fade-leave-active,
.tips-fade-enter-active {
  transition: all .3s ;
}
/* @media only screen and (max-width: 1920px){
  .tips-message-center{
    min-width: 25%;
  }
}
@media only screen and (max-width: 1200px){
  .tips-message-center{
    min-width: 30%;
  }
}
@media only screen and (max-width: 992px){
  .tips-message-center{
    min-width: 40%;
  }
}
@media only screen and (max-width: 768px){
  .tips-message-center{
    min-width: 50%;
  }
}
@media only screen and (max-width: 576px){
  .tips-message-center{
    min-width: 60%;
  }
} */
</style>
