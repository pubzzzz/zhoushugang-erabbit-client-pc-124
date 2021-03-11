import { createVNode, render } from 'vue'
import XtxMessage from './xtx-message'

// 定时器
let timer = null
// 消息显示时间
const duration = 3000
// 准备一个容器显示消息组件
const messageContainer = document.createElement('div')
messageContainer.setAttribute('class', 'message-container')
document.body.append(messageContainer)
// 导出一个函数
export default (app, { text, type }) => {
  // 根据组件创建虚拟节点
  const vn = createVNode(XtxMessage, { text, type })
  // 设置上下文（运行组件环境）
  vn.appContext = app.appContext
  // 渲染组件
  render(vn, messageContainer)
  // 清除定时器，加一个定时器，销毁消息组件
  clearTimeout(timer)
  timer = setTimeout(() => {
    render(null, messageContainer)
  }, duration)
}
