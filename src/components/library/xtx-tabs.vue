<script>
import { getCurrentInstance, provide } from 'vue'
import { useVModel } from '@vueuse/core'
export default {
  name: 'XtxTabs',
  render () {
    const { ctx } = getCurrentInstance()
    const panels = ctx.$slots.default()
    const dynamicPanels = []
    panels.forEach(item => {
      if (item.type.name === 'XtxTabsPanel') {
        dynamicPanels.push(item)
      } else {
        item.children.forEach(d => {
          dynamicPanels.push(d)
        })
      }
    })
    const navs = (
      <nav>
        {dynamicPanels.map((item, i) => (
          <a
            class={{ active: item.props.name === ctx.activeName }}
            onClick={() => ctx.clickTab(item.props.name, i)}
            href="javascript:;"
          >
            {item.props.label}
          </a>
        ))}
      </nav>
    )
    return <div class="xtx-tabs">{[navs, panels]} </div>
  },
  props: {
    modelValue: {
      type: String,
      default: ''
    }
  },
  setup (props, { emit }) {
    const activeName = useVModel(props, 'modelValue', emit)
    const clickTab = (name, index) => {
      activeName.value = name
      emit('click-tab', { name, index })
    }
    provide('activeName', activeName)
    return { activeName, clickTab }
  }
}
</script>
<style lang="less">
.xtx-tabs {
  background: #fff;
  > nav {
    height: 60px;
    line-height: 60px;
    display: flex;
    border-bottom: 1px solid #f5f5f5;
    > a {
      width: 110px;
      border-right: 1px solid #f5f5f5;
      text-align: center;
      font-size: 16px;
      &.active {
        border-top: 2px solid @xtxColor;
        height: 60px;
        background: #fff;
        line-height: 56px;
      }
    }
  }
}
</style>
