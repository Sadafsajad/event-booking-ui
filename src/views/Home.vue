<template>
  <div class="home-page">
    <HeaderBar @open-create="showCreateModal = true" />

    <div class="content">
      <FlashMessage v-if="flashMessage" :message="flashMessage" />

      <EventFilters v-model="filters" @filter="applyFilter" />

      <EventTable :events="filteredEvents" @book="bookEvent" />

      <CreateEventModal
        v-if="showCreateModal"
        @close="showCreateModal = false"
        @event-created="addEvent"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import HeaderBar from "@/components/HeaderBar.vue";
import FlashMessage from "@/components/FlashMessage.vue";
import EventFilters from "@/components/EventFilters.vue";
import EventTable from "@/components/EventTable.vue";
import CreateEventModal from "@/components/CreateEventModal.vue";
import api from '@/plugins/axios'
const showCreateModal = ref(false);
const flashMessage = ref("");
const filters = ref({ q: "", from: "", to: "" });

const events = ref([]);

// onMounted(() => {
//   const saved = localStorage.getItem("events");
//   events.value = saved ? JSON.parse(saved) : [];
// });
async function loadItems({ page, itemsPerPage, sortBy }) {
  loading.value = true

  try {
    const params = {
      page,
      per_page: itemsPerPage,
      sort: sortBy?.[0]?.key ?? 'event_at',
      order: sortBy?.[0]?.order ?? 'asc',
      q: name.value, // or your filters
    }

    const res = await api.get('/events', { params })

    serverItems.value = res.data.data  // paginated data
    totalItems.value = res.data.total  // total count from backend
  } catch (err) {
    console.error(err)
  } finally {
    loading.value = false
  }
}

onMounted(loadEvents)

const filteredEvents = computed(() =>
  events.value.filter((e) => {
    const q = filters.value.q.toLowerCase();
    const matchesQ =
      !q || e.title.toLowerCase().includes(q) || e.venue.toLowerCase().includes(q);
    const matchesFrom = !filters.value.from || e.date >= filters.value.from;
    const matchesTo = !filters.value.to || e.date <= filters.value.to;
    return matchesQ && matchesFrom && matchesTo;
  })
);

const applyFilter = () => {
  flashMessage.value = "Filters applied!";
  setTimeout(() => (flashMessage.value = ""), 1500);
};

const addEvent = (newEvent) => {
  events.value.push(newEvent);
  showCreateModal.value = false;
  flashMessage.value = "Event created successfully!";
  localStorage.setItem("events", JSON.stringify(events.value));
  setTimeout(() => (flashMessage.value = ""), 2000);
};

// const bookEvent = (eventId) => {
//   const e = events.value.find((x) => x.id === eventId);
//   if (e && e.booked < e.capacity) e.booked++;
//   flashMessage.value = "Event booked!";
//   localStorage.setItem("events", JSON.stringify(events.value));
//   setTimeout(() => (flashMessage.value = ""), 2000);
// };
async function bookEvent(eventId) {
  try {
    await api.post(`/bookings/${eventId}`)   // ✅ matches your current Laravel route
    await loadEvents()                       // refresh event list
    flashMessage.value = "Event booked successfully!"
    setTimeout(() => (flashMessage.value = ""), 2000)
  } catch (err) {
    console.error(err.response?.data || err)
    flashMessage.value = err.response?.data?.message || "Booking failed!"
    setTimeout(() => (flashMessage.value = ""), 2500)
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

