<template>
  <div class="xtx-city" ref="target">
    <div class="select" @click="toggleDialog" :class="{active}">
      <span v-if="!fullName" class="placeholder">请选择配送地址</span>
      <span v-else class="value">{{fullName}}</span>
      <i class="iconfont icon-angle-down"></i>
    </div>
    <div class="option" v-if="active">
      <span @click="changeItem(item)" class="ellipsis" v-for="item in currList" :key="item.code">{{item.name}}</span>
      <div v-if="loading" class="loading"></div>
    </div>
  </div>
</template>
<script>
import { computed, reactive, ref } from 'vue'
import { onClickOutside } from '@vueuse/core'
import axios from 'axios'
// 获取所有城市数据
const useAllCityData = () => {
  const allData = ref([])
  const loading = ref(true)
  const url = 'https://yjy-oss-files.oss-cn-zhangjiakou.aliyuncs.com/tuxian/area.json'
  // 注意这里不能用await(导致useAllCityData需要加async使其返回值为promise)
  axios.get(url).then(res => {
    allData.value = res.data
    loading.value = false
  })
  return { allData, loading }
}
export default {
  name: 'XtxCity',
  props: {
    provinceCode: {
      type: String,
      default: ''
    },
    cityCode: {
      type: String,
      default: ''
    },
    countyCode: {
      type: String,
      default: ''
    }
  },
  setup (props, { emit }) {
    // 控制展开收起,默认收起
    const active = ref(false)
    const openDialog = () => {
      active.value = true
      // 清除上次选择
      changeResult.provinceCode = ''
      changeResult.cityCode = ''
      changeResult.countyCode = ''
    }
    const closeDialog = () => {
      active.value = false
    }
    // 切换展开收起
    const toggleDialog = () => {
      if (active.value) closeDialog()
      else openDialog()
    }
    // 点击其他位置隐藏
    const target = ref(null)
    onClickOutside(target, () => {
      closeDialog()
    })

    // 获取城市数据,显示当前地方列表
    const { allData, loading } = useAllCityData()
    const currList = computed(() => {
      // 省列表
      let arr = allData.value
      // 市列表
      if (changeResult.provinceCode) {
        arr = arr.find(p => p.code === changeResult.provinceCode).areaList
      }
      // 区列表
      if (changeResult.cityCode) {
        arr = arr.find(c => c.code === changeResult.cityCode).areaList
      }
      return arr
    })

    // 根据传递的code显示文字
    const fullName = computed(() => {
      try {
        const arr = []
        if (props.provinceCode && props.cityCode && props.countyCode) {
          const province = allData.value.find(p => p.code === props.provinceCode)
          arr.push(province.name)
          const city = province.areaList.find(c => c.code === props.cityCode)
          arr.push(city.name)
          const county = city.areaList.find(y => y.code === props.countyCode)
          arr.push(county.name)
        }
        return arr.join(' ')
      } catch (e) {
        return ''
      }
    })

    // 处理点击选择地区操作
    const changeResult = reactive({
      provinceCode: '',
      cityCode: '',
      countyCode: ''
    })
    const changeItem = (item) => {
      if (item.level === 0) changeResult.provinceCode = item.code
      if (item.level === 1) changeResult.cityCode = item.code
      if (item.level === 2) {
        changeResult.countyCode = item.code
        emit('change', changeResult)
        closeDialog()
      }
    }
    return { active, toggleDialog, target, currList, loading, fullName, changeItem }
  }
}
</script>
<style scoped lang="less">
.xtx-city {
  display: inline-block;
  position: relative;
  z-index: 400;
  .select {
    border: 1px solid #e4e4e4;
    height: 30px;
    padding: 0 5px;
    line-height: 28px;
    cursor: pointer;
    &.active {
      background: #fff;
    }
    .placeholder {
      color: #999;
    }
    .value {
      color: #666;
      font-size: 12px;
    }
    i {
      font-size: 12px;
      margin-left: 5px;
    }
  }
  .option {
    width: 542px;
    border: 1px solid #e4e4e4;
    position: absolute;
    left: 0;
    top: 29px;
    background: #fff;
    min-height: 30px;
    line-height: 30px;
    display: flex;
    flex-wrap: wrap;
    padding: 10px;
    > span {
      width: 130px;
      text-align: center;
      cursor: pointer;
      border-radius: 4px;
      padding: 0 3px;
      &:hover {
        background: #f5f5f5;
      }
    }
    .loading {
      height: 290px;
      width: 100%;
      background: url(../../assets/images/loading.gif) no-repeat center;
    }
  }
}
</style>
