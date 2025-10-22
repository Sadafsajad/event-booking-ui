<template>
  <tr>
    <td>{{ event.title }}</td>
    <td>{{ event.venue }}</td>
    <td>{{ event.capacity }}</td>
    <td>{{ formatDate(event.event_at) }}</td>
    <td>
      <span v-if="left === 0" class="status full">Full</span>
      <span v-else class="status available" @click="$emit('book', event.id)">
        Book ({{ left }} left)
      </span>
    </td>
  </tr>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  event: Object,
});

const emit = defineEmits(["book"]);

const left = computed(() => {
  const booked = Number(props.event.booked ?? 0);
  const capacity = Number(props.event.capacity ?? 0);
  return Math.max(capacity - booked, 0);
});

const formatDate = (d) => {
  if (!d) return "-";
  const date = new Date(d);
  return isNaN(date) ? "-" : date.toLocaleString();
};
</script>

<style scoped>
td {
  padding: 10px;
  border-bottom: 1px solid #f3f4f6;
}
.status {
  display: inline-block;
  padding: 6px 10px;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
}
.full {
  background: #fee2e2;
  color: #991b1b;
}
.available {
  background: #16a34a;
  color: #fff;
}
.available:hover {
  background: #15803d;
}
</style>
