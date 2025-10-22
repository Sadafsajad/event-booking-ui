<template>
  <header class="header-bar">
    <h2>Events</h2>

    <div class="actions">
           <v-btn
          class="text-none text-subtitle-1"
          color="#5865f2"
          size="small"
          variant="flat"
          @click="$emit('open-create')"
        >
        + Create Event
        </v-btn>
      <!-- <button  class="btn create"></button> -->
    </div>
  </header>
</template>

<script setup>
/*
No props here — purely emits.
We'll emit an event to open the Create Event modal.
*/
defineEmits(["open-create"]);
</script>

<style scoped>
.header-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #fff;
  padding: 14px 18px;
  border-radius: 8px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
  margin-bottom: 20px;
}

h2 {
  font-size: 20px;
  font-weight: 600;
  color: #111827;
}

.actions .btn {
  border: none;
  border-radius: 8px;
  padding: 8px 14px;
  font-weight: 600;
  cursor: pointer;
}

.create {
  background: #4f46e5;
  color: #fff;
}
.create:hover {
  background: #4338ca;
}
</style>
