import { createVNode, render } from 'vue'
import XtxConfirm from './xtx-confirm.vue'

const confirmContainer = document.createElement('div')
confirmContainer.setAttribute('class', 'confirm-container')
document.body.append(confirmContainer)

export default (app, config) => {
  return new Promise((resolve, reject) => {
    // 取消回调函数
    config.cancelCallback = () => {
    // 销毁组件
      render(null, confirmContainer)
      reject(new Error('取消操作'))
    }
    // 确认回调函数
    config.submitCallback = () => {
    // 销毁组件
      render(null, confirmContainer)
      resolve()
    }
    // 创建虚拟节点
    const vn = createVNode(XtxConfirm, config)
    // 设置组件上下文
    vn.appContext = app.appContext
    // 渲染组件
    render(vn, confirmContainer)
  })
}
