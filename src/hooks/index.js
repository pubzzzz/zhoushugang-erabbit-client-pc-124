import { useIntersectionObserver } from '@vueuse/core'
import { ref } from 'vue'
import dayjs from 'dayjs'

export const useLazyData = (apiFn) => {
  const container = ref(null)
  const data = ref([])
  const { stop } = useIntersectionObserver(
    container,
    ([{ isIntersecting }], dom) => {
      if (isIntersecting) {
        stop()
        apiFn && apiFn().then(({ result }) => {
          data.value = result
        })
      }
    }, {
      threshold: 0
    }
  )
  return { container, data }
}

export const usePayDownTime = (createTime, cb) => {
  let total = 0
  let timer = null
  // 算出倒计时时间单位秒，30分钟
  const nowTime = dayjs().unix()
  const endTime = dayjs(createTime).add(30, 'minute').unix()
  total = endTime - nowTime
  if (total >= 0) {
    const timeText = dayjs.unix(total).format('mm分ss秒')
    cb(timeText)
    // 倒计时
    if (timer) clearInterval(timer)
    timer = setInterval(() => {
      total--
      if (total < 0) {
        clearInterval(timer)
      }
      const timeText = dayjs.unix(total).format('mm分ss秒')
      cb(timeText)
    }, 1000)
  } else {
    const timeText = '00分00秒'
    cb(timeText)
  }
}
