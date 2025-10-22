<template>
  <ModalWrapper @close="$emit('close')">
    <h3 style="margin-bottom:12px;">Create Event</h3>

    <form @submit.prevent="createEvent" class="form-grid">
      <input v-model="title" type="text" placeholder="Title" required />
      <input v-model="venue" type="text" placeholder="Venue" required />
      <input v-model.number="capacity" type="number" placeholder="Capacity" min="1" required />
      <input v-model="date" type="datetime-local" required />
      <textarea v-model="description" rows="3" placeholder="Description (optional)"></textarea>

      <div class="actions">
        <button type="button" class="btn cancel" @click="$emit('close')">Cancel</button>
        <button type="submit" class="btn create">Create</button>
      </div>
    </form>
  </ModalWrapper>
</template>

<script setup>
import { ref } from "vue";
import ModalWrapper from "./ModalWrapper.vue";
import api from '@/plugins/axios'
const emit = defineEmits(["close", "event-created"]);

const title = ref("");
const venue = ref("");
const capacity = ref(10);
const date = ref("");
const description = ref("");

// const createEvent = () => {
//   const newEvent = {
//     id: Date.now(),
//     title: title.value,
//     venue: venue.value,
//     capacity: capacity.value,
//     booked: 0,
//     date: date.value,
//     description: description.value,
//   };
//   emit("event-created", newEvent);
// };
async function createEvent() {
  try {
    const payload = {
      title: title.value,
      venue: venue.value,
      capacity: +capacity.value,
      date: date.value,
      description: description.value || null
    }
    console.log(payload, "im called");
    const res = await api.post('/admin/events', payload)
    emit('event-created', res.data)
    emit('close')
  } catch (error) {
    console.error('Event create error:', error.response?.data || error)
  }
}
</script>

<style scoped>
.form-grid {
  display: grid;
  gap: 10px;
}
input,
textarea {
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 10px;
}
.actions {
  display: flex;
  justify-content: flex-end;
  gap: 8px;
  margin-top: 6px;
}
.btn {
  border: none;
  border-radius: 8px;
  padding: 8px 12px;
  font-weight: 600;
  cursor: pointer;
}
.create {
  background: #4f46e5;
  color: #fff;
}
.cancel {
  background: #e5e7eb;
  color: #111;
}
</style>
