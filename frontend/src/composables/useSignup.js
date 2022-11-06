import axios from 'axios'
import { toast } from 'bulma-toast'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { validate } from '../utils/helpers'

export const useSignup = () => {
  const router = useRouter()
  const username = ref('')
  const password = ref('')
  const password2 = ref('')

  const errors = ref([])

  const submitForm = async () => {
    validate(username.value, password.value, password2.value, errors.value)

    errors.value = []
    if (!errors.value.length) {
      const formData = {
        username: username.value,
        password: password.value,
      }

      try {
        await axios.post('/api/v1/users/', formData)
        toast({
          message: 'Account created, please log in!',
          type: 'is-success',
          dismissible: true,
          pauseOnHover: true,
          duration: 2000,
          position: 'bottom-right',
        })
        router.push('/log-in')
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
    password2,
    errors,
    submitForm,
  }
}
