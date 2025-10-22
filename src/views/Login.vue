<template>
  <div class="login-wrapper">
    <div class="login-card">
      <img src="/laravel-logo.svg" alt="Laravel" class="logo" />

      <h2>Log in to your account</h2>

      <form @submit.prevent="onSubmit">
        <div class="form-group">
          <label for="email">Email</label>
          <input id="email" v-model="email" type="email" placeholder="Enter your email" required />
        </div>

        <div class="form-group">
          <label for="password">Password</label>
          <input id="password" v-model="password" type="password" placeholder="Enter your password" required />
        </div>

        <div class="form-options">
          <label><input type="checkbox" /> Remember me</label>
          <a href="#" class="forgot">Forgot your password?</a>
        </div>

        <button type="submit" class="btn-login">LOG IN</button>

        <div class="divider">OR CONTINUE WITH</div>

        <div class="social-buttons">
          <button type="button" class="btn-social google">
            <svg class="social-icon" viewBox="0 0 24 24" aria-hidden="true">
                    <path fill="#EA4335"
                        d="M12 10.2v3.9h5.5c-.24 1.4-1.67 4.1-5.5 4.1A6.4 6.4 0 1 1 12 5.6c1.83 0 3.06.78 3.76 1.45l2.56-2.47C16.89 3.3 14.7 2.4 12 2.4 6.98 2.4 2.9 6.47 2.9 11.5S6.98 20.6 12 20.6c6.03 0 8.06-4.22 8.06-6.37 0-.42-.04-.7-.09-.99H12Z" />
                    <path fill="#4285F4" d="M21.95 10.24H12v3.9h5.77a5.2 5.2 0 0 0 4.18-3.9Z" />
                    <path fill="#FBBC05" d="M6.7 13.54a4.9 4.9 0 0 1 0-3.98V6.77H2.9a8.6 8.6 0 0 0 0 9.96l3.8-3.19Z" />
                    <path fill="#34A853"
                        d="M12 20.6c2.7 0 4.97-.89 6.63-2.42l-3.22-3.09c-.89.62-2.06 1.05-3.41 1.05a6.4 6.4 0 0 1-6.3-4.6l-3.8 3.2A8.6 8.6 0 0 0 12 20.6Z" />
                </svg>
            Google
          </button>
          <button type="button" class="btn-social github">
            <svg class="social-icon" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path fill-rule="evenodd" clip-rule="evenodd"
                        d="M12 2C6.48 2 2 6.58 2 12.25c0 4.52 2.87 8.35 6.85 9.71.5.09.68-.22.68-.49 0-.24-.01-.87-.01-1.71-2.78.62-3.37-1.37-3.37-1.37-.45-1.18-1.1-1.5-1.1-1.5-.9-.63.07-.62.07-.62 1 .07 1.52 1.06 1.52 1.06.89 1.56 2.34 1.11 2.91.85.09-.66.35-1.11.63-1.37-2.22-.26-4.55-1.15-4.55-5.14 0-1.14.39-2.07 1.03-2.8-.1-.26-.45-1.31.1-2.73 0 0 .84-.27 2.75 1.07a9.2 9.2 0 0 1 5 0c1.9-1.34 2.74-1.07 2.74-1.07.56 1.42.21 2.47.11 2.73.65.73 1.03 1.66 1.03 2.8 0 3.99-2.34 4.88-4.57 5.14.36.32.68.95.68 1.92 0 1.38-.01 2.49-.01 2.83 0 .27.18.59.69.49A10.09 10.09 0 0 0 22 12.25C22 6.58 17.52 2 12 2Z" />
                </svg>
            GitHub
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const email = ref("");
const password = ref("");

const onSubmit = () => {
  console.log("Form submitted:", email.value, password.value);
  alert("Frontend only — backend integration later.");
};
</script>

<style scoped>
/* ===== Layout ===== */
.login-wrapper {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f5f5f5;
  font-family: "Inter", sans-serif;
}

.login-card {
  background: #fff;
  padding: 40px;
  border-radius: 14px;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
  text-align: center;
}

.logo {
  width: 48px;
  margin-bottom: 20px;
}

h2 {
  margin-bottom: 24px;
  color: #111;
  font-size: 20px;
  font-weight: 700;
}

/* ===== Form Elements ===== */
.form-group {
  text-align: left;
  margin-bottom: 16px;
}

label {
  display: block;
  font-weight: 600;
  color: #222;
  margin-bottom: 6px;
}

input {
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #ccc;
  border-radius: 8px;
  background: #f9f9f9;
  font-size: 14px;
  color: #111;
}

input:focus {
  outline: none;
  border-color: rgba(244, 67, 54, 1);
  background: #fff;
}

/* ===== Options ===== */
.form-options {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 18px;
  font-size: 13px;
}

.forgot {
  color: rgba(244, 67, 54, 1);
  text-decoration: none;
  font-weight: 500;
}

.forgot:hover {
  text-decoration: underline;
}

/* ===== Buttons ===== */
.btn-login {
  width: 100%;
  background: rgba(244, 67, 54, 1);
  color: #fff;
  border: none;
  padding: 12px;
  font-weight: 700;
  font-size: 15px;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
}

.btn-login:hover {
  background: rgba(244, 67, 54, 0.85);
  transform: translateY(-1px);
}

/* ===== Divider ===== */
.divider {
  margin: 24px 0 18px;
  text-transform: uppercase;
  font-size: 12px;
  color: #999;
  letter-spacing: 0.05em;
  position: relative;
}

.divider::before,
.divider::after {
  content: "";
  position: absolute;
  top: 50%;
  width: 35%;
  height: 1px;
  background: #ddd;
}

.divider::before {
  left: 0;
}

.divider::after {
  right: 0;
}

/* ===== Social Buttons ===== */
.social-buttons {
  display: flex;
  gap: 10px;
  justify-content: center;
}

/* ==== Social Buttons (Refined Size) ==== */
.social-buttons {
  display: flex;
  gap: 10px;
  justify-content: center;
  margin-top: 10px;
}

.btn-social {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 8px 0;
  background: #fff;
  color: #111;
  font-weight: 600;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s ease;
}

/* Smaller SVG icons */
.social-icon {
  width: 16px;
  height: 16px;
}

/* Optional: make them slightly dimmer on hover */
.btn-social:hover .social-icon {
  opacity: 0.8;
}

/* Optional theme match */
.btn-social:hover {
  border-color: rgba(244, 67, 54, 1);
  color: rgba(244, 67, 54, 1);
}

.github {
  background: #111;
  color: #fff;
}

.github:hover {
  background: #222;
}
</style>
