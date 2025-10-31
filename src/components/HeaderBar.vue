<template>
  <header class="header-bar">
    <h2>Events</h2>

    <div class="actions">
      <v-btn
        class="header-btn"
        variant="outlined"
        color="primary"
        @click="$emit('open-reports')"
      >
        <v-icon size="20" class="mr-2">mdi-chart-bar</v-icon>
        Reports
      </v-btn>

      <v-btn
        class="header-btn create-btn"
        @click="$emit('open-create')"
      >
        <v-icon size="20" class="mr-2">mdi-plus</v-icon>
        Create Event
      </v-btn>
    </div>
  </header>
</template>

<script setup>
defineEmits(["open-create", "open-reports"]);
</script>

<style scoped>
.header-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #ffffff;
  padding: 16px 20px;
  border-radius: 10px;
  border: 1px solid #e5e7eb;
}

h2 {
  font-size: 20px;
  font-weight: 600;
  color: #111827;
}

.actions {
  display: flex;
  align-items: center;
  gap: 12px;
}

.header-btn {
  text-transform: none;
  font-size: 15px;
  font-weight: 500;
  border-radius: 8px;
  padding: 8px 18px;
}

.create-btn {
  background: #4f46e5;
  color: white;
}
.create-btn:hover {
  background: #4338ca;
}
</style>
