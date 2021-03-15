<script>
import { getCurrentInstance } from 'vue'
export default {
  name: 'XtxTabs',
  render () {
    const { ctx } = getCurrentInstance()
    const panels = ctx.$slots.default()
    const navs = <nav>{panels.map(item => <a href="javascript:;">{item.props.label}</a>)}</nav>
    return <div class="xtx-tabs">{[navs, panels]} </div>
  }
}
</script>
<style scoped lang="less">
.xtx-tabs {
  background: #fff;
  nav {
    height: 60px;
    line-height: 58px;
  }
}
</style>
