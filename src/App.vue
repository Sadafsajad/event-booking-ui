<script setup>
import { RouterView, RouterLink } from 'vue-router'
</script>

<template>
  <div class="app-container">
    <!-- Top navigation (optional) -->
    <header class="navbar">
      <div class="nav-left">
        <h1 class="brand">EventBook</h1>
      </div>

      <nav class="nav-right">
        <RouterLink to="/" class="nav-link" active-class="active">Home</RouterLink>
        <RouterLink to="/about" class="nav-link" active-class="active">About</RouterLink>
      </nav>
    </header>

    <!-- Page Content -->
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
}

.nav-link {
  color: #d1d5db;
  text-decoration: none;
  font-weight: 500;
}

.nav-link:hover {
  color: #fff;
}

.active {
  color: #fff;
  border-bottom: 2px solid #4f46e5;
}

/* Main Content */
.page-content {
  flex: 1;
  width: 100%;
  min-height: calc(100vh - 60px);
  padding: 24px 40px;
  background: #f3f4f6;
  overflow-y: auto;
}
</style>
