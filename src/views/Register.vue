<template>
  <div class="register-wrapper">
    <div class="register-card">
      <h2>Create your account</h2>

      <form @submit.prevent="onSubmit">
        <!-- Name -->
        <div class="form-group">
          <label for="name">Full Name</label>
          <input id="name" v-model="name" type="text" placeholder="Enter your full name" required />
        </div>

        <!-- Email -->
        <div class="form-group">
          <label for="email">Email Address</label>
          <input id="email" v-model="email" type="email" placeholder="Enter your email" required />
        </div>

        <!-- Password -->
        <div class="form-group">
          <label for="password">Password</label>
          <input id="password" v-model="password" type="password" placeholder="Create a password" required />
        </div>

        <!-- Confirm Password -->
        <div class="form-group">
          <label for="confirmPassword">Confirm Password</label>
          <input id="confirmPassword" v-model="confirmPassword" type="password" placeholder="Confirm your password" required />
        </div>

        <div class="form-options">
          <router-link to="/login" class="login-link">
            Already registered?
          </router-link>
        </div>

        <button type="submit" class="btn-register">REGISTER</button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const name = ref("");
const email = ref("");
const password = ref("");
const confirmPassword = ref("");

const onSubmit = () => {
  if (password.value !== confirmPassword.value) {
    alert("Passwords do not match!");
    return;
  }
  console.log("Registration submitted:", { name: name.value, email: email.value, password: password.value });
  alert("Frontend only — backend integration later.");
};
</script>

<style scoped>
/* ===== Layout ===== */
.register-wrapper {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f5f5f5;
  font-family: "Inter", sans-serif;
}

.register-card {
  background: #fff;
  padding: 40px;
  border-radius: 14px;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
  text-align: center;
}

h2 {
  margin-bottom: 24px;
  color: #111;
  font-size: 22px;
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
  text-align: right;
  margin-top: 10px;
}

.login-link {
  color: rgba(244, 67, 54, 1);
  text-decoration: none;
  font-size: 13px;
  font-weight: 500;
}

.login-link:hover {
  text-decoration: underline;
}

/* ===== Button ===== */
.btn-register {
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
  margin-top: 16px;
}

.btn-register:hover {
  background: rgba(244, 67, 54, 0.85);
  transform: translateY(-1px);
}
</style>
