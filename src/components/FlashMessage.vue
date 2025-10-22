<template>
  <div class="flash-message" :class="type">
    {{ message }}
  </div>
</template>

<script setup>
const props = defineProps({
  message: String,
  type: {
    type: String,
    default: "success", // success | error
  },
});
</script>

<style scoped>
.flash-message {
  padding: 10px 12px;
  border-radius: 8px;
  margin-bottom: 12px;
  font-weight: 500;
}
.success {
  background: #ecfdf5;
  color: #065f46;
  border: 1px solid #a7f3d0;
}
.error {
  background: #fef2f2;
  color: #991b1b;
  border: 1px solid #fecaca;
}
</style>
