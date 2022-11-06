import axios from 'axios'
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'

export const useLogin = () => {
  const router = useRouter()
  const route = useRoute()
  const store = useAuthStore()

  const username = ref('')
  const password = ref('')

  const errors = ref([])

  const submitForm = async () => {
    axios.defaults.headers.common['Authorization'] = ''
    localStorage.removeItem('token')

    errors.value = []
    if (!errors.value.length) {
      const formData = {
        username: username.value,
        password: password.value,
      }

      try {
        const response = await axios.post('/api/v1/token/login/', formData)
        const token = response.data.auth_token
        store.setToken(token)
        axios.defaults.headers.common['Authorization'] = 'Token ' + token
        localStorage.setItem('token', token)

        const toPath = route.query.to || '/cart'
        router.push(toPath)
      } catch (error) {
        if (error.response) {
          for (const property in error.response.data) {
            errors.value.push(`${property}: ${error.response.data[property]}`)
          }
          console.log(JSON.stringify(error.response.data))
        } else if (error.message) {
          errors.value.push('Something went wrong. Please try again')

          console.log(JSON.stringify(error))
        }
      }
    }
  }

  return {
    username,
    password,
    errors,
    submitForm,
  }
}
