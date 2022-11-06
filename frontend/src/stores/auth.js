import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAuthStore = defineStore('auth', () => {
  const isAuthenticated = ref(false)
  const loading = ref(false)
  const token = ref('')

  const setToken = (authToken) => {
    token.value = authToken
    isAuthenticated.value = true
  }

  const removeToken = () => {
    token.value = ''
    isAuthenticated.value = false
  }

  const initializeStore = () => {
    if (localStorage.getItem('token')) {
      setToken(localStorage.getItem('token'))
    } else {
      removeToken()
    }
  }

  return {
    isAuthenticated,
    token,
    loading,
    setToken,
    initializeStore,
  }
})
