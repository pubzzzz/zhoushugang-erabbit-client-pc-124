// import XtxSkeleton from './xtx-skeleton.vue'
// import XtxCarousel from './xtx-carousel.vue'
// import XtxMore from './xtx-more.vue'
// import XtxBread from './xtx-bread'
// import XtxBreadItem from './xtx-bread-item'

import Confirm from './confirm'
import Message from './message'
const importFn = require.context('./', false, /\.vue$/)

export default {
  install (app) {
    // app.component(XtxSkeleton.name, XtxSkeleton)
    // app.component(XtxCarousel.name, XtxCarousel)
    // app.component(XtxMore.name, XtxMore)
    // app.component(XtxBread.name, XtxBread)
    // app.component(XtxBreadItem.name, XtxBreadItem)
    importFn.keys().forEach(key => {
      const component = importFn(key).default
      app.component(component.name, component)
    })
    defineDirective(app)
    bindPrototype(app)
  }
}

// 指令
const defineDirective = (app) => {
  // 图片懒加载指令
  app.directive('lazy', {
    mounted (el, binding) {
      const observer = new IntersectionObserver(([{ isIntersecting }]) => {
        if (isIntersecting) {
          observer.unobserve(el)
          el.src = binding.value
        }
      }, {
        threshold: 0.01
      })
      observer.observe(el)
    }
  })
}

// 原型函数
const bindPrototype = (app) => {
  // 消息提示
  app.config.globalProperties.$message = (text, type) => {
    Message(app, { text, type })
  }
  // 延时
  app.config.globalProperties.$sleep = (duration = 500) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve()
      }, duration)
    })
  }
  // 确认框
  app.config.globalProperties.$confirm = (config) => {
    return Confirm(app, config)
  }
}
