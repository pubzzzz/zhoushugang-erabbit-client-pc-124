import { useIntersectionObserver } from '@vueuse/core'
import { ref } from 'vue'
export const useLazyData = (apiFn) => {
  const container = ref(null)
  const data = ref([])
  const { stop } = useIntersectionObserver(
    container,
    ([{ isIntersecting }]) => {
      if (isIntersecting) {
        stop()
        apiFn && apiFn().then(({ result }) => {
          data.value = result
        })
      }
    }
  )
  return { container, data }
}
