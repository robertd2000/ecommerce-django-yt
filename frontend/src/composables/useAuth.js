import axios from 'axios'
import { storeToRefs } from 'pinia'
import { onMounted } from 'vue'
import { useAuthStore } from '../stores/auth'

export const useAuth = () => {
  const store = useAuthStore()
  const { token } = storeToRefs(store)
  onMounted(() => {
    store.initializeStore()

    if (token) {
      axios.defaults.headers.common['Authorization'] = 'Token ' + token
    } else {
      axios.defaults.headers.common['Authorization'] = ''
    }
  })

  return {
    token,
  }
}
