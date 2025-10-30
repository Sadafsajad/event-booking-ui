<template>
  <div class="home-page">
    <HeaderBar v-if="user?.is_admin" @open-create="showCreateModal = true" />
    <div class="content">
      <FlashMessage v-if="flashMessage" :message="flashMessage" />

      <!-- Filters -->
      <EventFilters v-model="filters"  />

      <!-- ✅ Vuetify Table -->
      <EventTable :filters="filters" :user="user" @book="bookEvent" />
      
      <!-- Modal -->
      <CreateEventModal
        v-if="showCreateModal"
        @close="showCreateModal = false"
        @event-created="addEvent"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import HeaderBar from "@/components/HeaderBar.vue";
import FlashMessage from "@/components/FlashMessage.vue";
import EventFilters from "@/components/EventFilters.vue";
import EventTable from "@/components/EventTable.vue";
import CreateEventModal from "@/components/CreateEventModal.vue";
import api from "@/plugins/axios";

const showCreateModal = ref(false);
const flashMessage = ref("");
const filters = ref({ q: "", from: "", to: "" });
const user = ref(null);

onMounted(() => {
  const storedUser = localStorage.getItem('user');
  console.log("Raw stored user:", storedUser);
  if (storedUser) {
    user.value = JSON.parse(storedUser);
    console.log("Parsed user:", user.value);
  }
});

function addEvent() {
  showCreateModal.value = false;
  flashMessage.value = "Event created successfully!";
  setTimeout(() => (flashMessage.value = ""), 2000);
}

async function bookEvent({ id, qty, item }) {
  try {
    await api.post(`/bookings/${id}`, { qty });
    flashMessage.value = "Event booked successfully!";
    item.isBooking = false;
    filters.value = { ...filters.value }; // refresh table
  } catch (err) {
    console.error(err.response?.data || err);
    flashMessage.value = err.response?.data?.message || "Booking failed!";
    item.isBooking = false;
  } finally {
    setTimeout(() => (flashMessage.value = ""), 2500);
  }
}
</script>

<style scoped>
.home-page {
  min-height: 100vh;
  background: #f9fafb;
  display: flex;
  flex-direction: column;
}

.content {
  width: 100%;
  max-width: none;
  margin: 0;
  padding: 24px 40px;
  background: #f9fafb;
}
</style>
