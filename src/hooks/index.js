import { useIntersectionObserver } from '@vueuse/core'
import { ref } from 'vue'
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
