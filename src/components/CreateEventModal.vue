<template>
  <ModalWrapper @close="$emit('close')">
    <h3 class="mb-4 text-lg font-semibold">Create Event</h3>

    <v-form @submit.prevent="createEvent" class="space-y-3">
      <!-- Title -->
      <v-text-field
        v-model="title"
        label="Title"
        variant="outlined"
        hide-details="auto"
        required
      />

      <!-- Venue -->
      <v-text-field
        v-model="venue"
        label="Venue"
        variant="outlined"
        hide-details="auto"
        required
      />

      <!-- Capacity -->
      <v-text-field
        v-model.number="capacity"
        label="Capacity"
        type="number"
        variant="outlined"
        hide-details="auto"
        min="1"
        required
      />

      <!-- Date Picker -->
      <v-menu
        v-model="menu"
        :close-on-content-click="false"
        transition="scale-transition"
        offset-y
        max-width="290"
        min-width="290"
      >
        <template #activator="{ props }">
          <v-text-field
            v-model="date"
            label="Event Date"
            readonly
            v-bind="props"
            variant="outlined"
            hide-details="auto"
            required
          />
        </template>

        <v-date-picker
          v-model="date"
          :min="minDate"
          @update:model-value="menu = false"
        />
      </v-menu>

      <!-- Description -->
      <v-textarea
        v-model="description"
        label="Description (optional)"
        variant="outlined"
        rows="3"
        hide-details
      />

      <!-- Buttons -->
      <div class="flex justify-end gap-4 mt-6">
        <v-btn color="grey-lighten-2" @click="$emit('close')">Cancel</v-btn>
        <v-btn color="indigo" variant="flat" type="submit" class="text-white">
          {{ props.eventId ? "Update" : "Create" }}
        </v-btn>
      </div>
    </v-form>
  </ModalWrapper>
</template>

<script setup>
import { ref, computed } from "vue";
import ModalWrapper from "./ModalWrapper.vue";
import api from "@/plugins/axios";
import { onMounted } from "vue";

const props = defineProps({
  eventId: { type: Number, default: null }
});
const emit = defineEmits(["close", "event-created"]);

const title = ref("");
const venue = ref("");
const capacity = ref(10);
const date = ref("");
const description = ref("");
const menu = ref(false);

onMounted(() => {
  if (props.eventId) {
    fetchEventDetails();
  }
});
async function fetchEventDetails() {
  try {
    const res = await api.get(`/admin/events/${props.eventId}/edit`);
    const ev = res.data;

    title.value = ev.title;
    venue.value = ev.venue;
    capacity.value = ev.capacity;
    description.value = ev.description;

    // Convert datetime -> yyyy-mm-dd for V-DatePicker
    date.value = ev.event_at.split(" ")[0];
  } catch (error) {
    console.error("Fetch event error:", error.response?.data || error);
  }
}

const minDate = computed(() => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
});

async function createEvent() {
  try {
    if (!title.value || !venue.value || !capacity.value || !date.value) {
      return alert("Please fill in all required fields.");
    }

    // ✅ Convert date to controller format (YYYY-MM-DD HH:mm:ss)
    const selectedDate = new Date(date.value);
    const formattedDate = `${selectedDate.getFullYear()}-${String(
      selectedDate.getMonth() + 1
    ).padStart(2, "0")}-${String(selectedDate.getDate()).padStart(
      2,
      "0"
    )} 00:00:00`;

    const payload = {
      title: title.value,
      venue: venue.value,
      capacity: +capacity.value,
      date: formattedDate,
      description: description.value || null,
    };

    let res;
    if (props.eventId) {
      //  UPDATE
      res = await api.put(`/admin/events/${props.eventId}`, payload);
      emit("event-updated", res.data.event);
    } else {
      // CREATE
      res = await api.post("/admin/events", payload);
      emit("event-created", res.data);
    }
    emit("close");
  } catch (error) {
    console.error("Event create error:", error.response?.data || error);
  }
}
</script>

<style scoped>
.text-lg {
  font-size: 1.125rem;
}
.font-semibold {
  font-weight: 600;
}
.space-y-3 > * + * {
  margin-top: 0.75rem;
}
.flex {
  display: flex;
}
.justify-end {
  justify-content: flex-end;
}
.gap-4 {
  gap: 1rem;
}
.mt-6 {
  margin-top: 1.5rem;
}
</style>
