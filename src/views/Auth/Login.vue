<template>
  <v-container class="py-8" max-width="600">
    <v-card>
      <v-card-title>Login</v-card-title>
      <v-card-text>
        <v-form @submit.prevent="submit">
          <v-text-field v-model="email" label="Email" required />
          <v-text-field v-model="password" label="Password" type="password" required />
          <v-checkbox v-model="remember" label="Remember me" />
          <div class="d-flex justify-end gap-3">
            <v-btn text @click="goRegister">Register</v-btn>
            <v-btn color="primary" type="submit">Login</v-btn>
          </div>
        </v-form>
        <v-alert v-if="error" variant="outlined" density="comfortable" class="mt-3">{{ error }}</v-alert>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script setup>
import { ref } from 'vue'
import api, { initSanctum } from '@/plugins/axios'
import { useRouter } from 'vue-router'

const router = useRouter()
const email = ref('')
const password = ref('')
const remember = ref(false)
const error = ref('')

async function submit() {
  error.value = ''
  // console.log("hello")
  try {
    // Get CSRF cookie
    await initSanctum()
    const res = await api.post('/login', {
      email: email.value,
      password: password.value,
      remember: remember.value
    })
    localStorage.setItem('token', res.data.token)
    localStorage.setItem('user', JSON.stringify(res.data.user));
    console.log(res);
    router.push({ name: 'home' })
  } catch (err) {
    error.value =
      err.response?.data?.message ||
      (err.response?.data?.errors
        ? Object.values(err.response.data.errors).flat().join(' ')
        : 'Login failed')
  }
}

function goRegister() {
  router.push({ name: 'register' })
}
</script>
