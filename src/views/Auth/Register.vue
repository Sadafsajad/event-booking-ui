<template>
  <v-container class="py-8" max-width="600">
    <v-card>
      <v-card-title>Register</v-card-title>
      <v-card-text>
        <v-form @submit.prevent="submit">
          <v-text-field v-model="name" label="Name" required />
          <v-text-field v-model="email" label="Email" required />
          <v-text-field v-model="password" label="Password" type="password" required />
          <v-text-field v-model="password_confirmation" label="Confirm Password" type="password" required />
          <div class="d-flex justify-end gap-3">
            <v-btn text @click="goLogin">Login</v-btn>
            <v-btn color="primary" type="submit">Register</v-btn>
          </div>
        </v-form>
        <v-alert v-if="error" variant="outlined" class="mt-3">{{ error }}</v-alert>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script setup>
import { ref } from 'vue';
import api, { initSanctum } from '@/plugins/axios';
import { useRouter } from 'vue-router';

const router = useRouter();
const name = ref('');
const email = ref('');
const password = ref('');
const password_confirmation = ref('');
const error = ref('');

async function submit() {
  error.value = '';
  try {
    // Get CSRF cookie
    await initSanctum();

    const res = await api.post('/register', {
      name: name.value,
      email: email.value,
      password: password.value,
      password_confirmation: password_confirmation.value
    });
    localStorage.setItem('token', res.data.token);
    localStorage.setItem('user', JSON.stringify(res.data.user));
    router.push({ name: 'home' });
  } catch (err) {
    error.value =
      err.response?.data?.message ||
      (err.response?.data?.errors
        ? Object.values(err.response.data.errors).flat().join(' ')
        : 'Register failed');
  }
}

function goLogin() {
  router.push({ name: 'login' });
}
</script>
