<script setup>
import { RouterView, RouterLink, useRouter } from 'vue-router'
import api from '@/plugins/axios'

const router = useRouter()

async function logout() {
  try {
    // Call backend logout API (optional if token-based)
    await api.post('/logout')

    // Remove auth data from localStorage
    localStorage.removeItem('token')
    localStorage.removeItem('user')

    // Redirect to login
    router.push({ name: 'login' })
  } catch (error) {
    console.error('Logout failed:', error)
  }
}
</script>

<template>
  <div class="app-container">
    <!-- Navbar -->
    <header class="navbar">
      <div class="nav-left">
        <h1 class="brand">EventBook</h1>
      </div>

      <nav class="nav-right">
        <RouterLink to="/" class="nav-link" active-class="active">Home</RouterLink>
        <button class="nav-link logout-btn" @click="logout">Logout</button>
      </nav>
    </header>

    <!-- Main Page -->
    <main class="page-content">
      <RouterView />
    </main>
  </div>
</template>

<style scoped>
.app-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background: #f9fafb;
  font-family: "Inter", sans-serif;
}

/* Navbar */
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 14px 24px;
  background: #111827;
  color: #fff;
}

.brand {
  font-size: 20px;
  font-weight: 700;
  color: #fff;
  margin: 0;
}

.nav-right {
  display: flex;
  gap: 18px;
  align-items: center;
}

.nav-link {
  color: #d1d5db;
  text-decoration: none;
  font-weight: 500;
  background: none;
  border: none;
  cursor: pointer;
  font-family: inherit;
  padding: 0;
}

.nav-link:hover {
  color: #fff;
}

.active {
  color: #fff;
  border-bottom: 2px solid #4f46e5;
}

.logout-btn {
  border-left: 1px solid #374151;
  padding-left: 12px;
}
</style>
