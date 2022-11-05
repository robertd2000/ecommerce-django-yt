import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAuthStore = defineStore('auth', () => {
  const isAuthenticated = ref(false)
  const loading = ref(false)
  const token = ref('')

  return {
    isAuthenticated,
    token,
    loading,
  }
})
