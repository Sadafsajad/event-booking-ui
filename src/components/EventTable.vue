<template>
  <div class="table-wrap">
    <table>
      <thead>
        <tr>
          <th>Title</th>
          <th>Venue</th>
          <th>Capacity</th>
          <th>Date</th>
          <th>Book</th>
        </tr>
      </thead>
      <tbody>
        <EventRow
          v-for="event in events"
          :key="event.id"
          :event="event"
          @book="$emit('book', $event)"
        />
        <tr v-if="!events.length">
          <td colspan="5" style="text-align:center;color:#6b7280;padding:12px;">No events</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import EventRow from "./EventRow.vue";
defineProps(["events"]);
defineEmits(["book"]);
</script>

<style scoped>
.table-wrap {
  overflow-x: auto;
}
table {
  width: 100%;
  font-size: 14px;
  border-collapse: collapse;
}
th {
  text-align: left;
  padding: 10px;
  border-bottom: 1px solid #e5e7eb;
}
</style>
