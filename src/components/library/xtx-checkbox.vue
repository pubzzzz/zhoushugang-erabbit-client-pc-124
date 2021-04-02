<template>
  <div class='xtx-checkbox' @click="change()">
    <i class="iconfont icon-checked" v-if="checked"></i>
    <i class="iconfont icon-unchecked" v-else></i>
    <span v-if="$slots.default"><slot /></span>
  </div>
</template>

<script>
import { useVModel } from '@vueuse/core'
export default {
  name: 'XtxCheckbox',
  props: {
    modelValue: {
      type: Boolean,
      default: false
    }
  },
  setup (props, { emit }) {
    const checked = useVModel(props, 'modelValue', emit)
    const change = () => {
      const newValue = !checked.value
      checked.value = newValue
      emit('change', newValue)
    }
    return { checked, change }
  }
}
// export default {
//   name: 'XtxCheckbox',
//   props: {
//     modelValue: {
//       type: Boolean,
//       default: false
//     }
//   },
//   data () {
//     return {
//       checked: false
//     }
//   },
//   methods: {
//     change () {
//       this.checked = !this.checked
//       this.$emit('update:modelValue', this.checked)
//       this.$emit('change', this.checked)
//     }
//   },
//   watch: {
//     modelValue: {
//       handler () {
//         this.checked = this.modelValue
//       },
//       immediate: true
//     }
//   }
// }
</script>

<style scoped lang='less'>
.xtx-checkbox {
  display: inline-block;
  margin-right: 2px;
  .icon-checked {
    color: @xtxColor;
    ~ span {
      color: @xtxColor;
    }
  }
  i {
    position: relative;
    top: 1px;
  }
  span {
    margin-left: 2px;
  }
}
</style>
