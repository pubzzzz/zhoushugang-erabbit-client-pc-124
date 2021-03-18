<template>
  <div class="detail-logistics">
    <p v-if="logistics?.list">
      <span>{{logistics.list[0].time}}</span>
      <span>{{logistics.list[0].text}}</span>
    </p>
    <a href="javascript:;">查看物流</a>
  </div>
</template>
<script>
import { findLogistics } from '@/api/order'
import { ref } from 'vue'
export default {
  name: 'DetailLogistics',
  props: {
    order: {
      type: Object,
      default: () => ({})
    }
  },
  setup (props) {
    const logistics = ref(null)
    findLogistics(props.order.id).then(data => {
      logistics.value = data.result
    })
    return { logistics }
  }
}
</script>
<style scoped lang="less">
.detail-logistics {
  height: 50px;
  display: flex;
  align-items: center;
  padding: 0 30px;
  background-color: #f5f5f5;
  margin: 30px 50px 0;
  > p {
    flex: 1;
    span {
      color: #999;
      &:first-child {
        margin-right: 30px;
      }
    }
  }
  > a {
    color: @xtxColor;
    text-align: center;
  }
}
</style>
