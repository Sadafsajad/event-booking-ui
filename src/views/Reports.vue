<template>
  <v-container class="py-6" max-width="1100">
    
    <!-- ✅ Top 5 Events (Last 30 days) -->
    <v-card class="pa-6 mb-6">
      <h3 class="text-h6 font-weight-bold mb-4">Top 5 Events (Last 30 days)</h3>

      <v-table dense>
        <thead>
          <tr>
            <th>Title</th>
            <th>Venue</th>
            <th>Date</th>
            <th>Capacity</th>
            <th>Booked (30d)</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(row, index) in top5" :key="index">
            <td>{{ row.title }}</td>
            <td>{{ row.venue }}</td>
            <td>{{ row.event_at }}</td>
            <td>{{ row.capacity }}</td>
            <td>{{ row.booked_last30 }}</td>
          </tr>

          <tr v-if="top5.length === 0">
            <td colspan="4" class="text-grey-darken-1 py-4 text-center">
              No data
            </td>
          </tr>
        </tbody>
      </v-table>
    </v-card>


    <!-- ✅ Power Users (Last Month) -->
    <v-card class="pa-6 mb-6">
      <h3 class="text-h6 font-weight-bold mb-4">Users with >3 Events (Last Month)</h3>

      <v-table dense>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Events Booked</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="(row, index) in powerUsers" :key="index">
            <td>{{ row.name }}</td>
            <td>{{ row.email }}</td>
            <td>{{ row.events_count }}</td>
          </tr>

          <tr v-if="powerUsers.length === 0">
            <td colspan="3" class="text-grey-darken-1 py-4 text-center">
              No data
            </td>
          </tr>
        </tbody>
      </v-table>
    </v-card>


    <!-- ✅ OCCUPANCY — NOW AS GRAPH -->
    <v-card class="pa-6 mb-6">
      <h3 class="text-h6 font-weight-bold mb-4">Occupancy (All Events)</h3>

      <canvas id="occupancyChart"></canvas>
    </v-card>

  </v-container>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { Chart, BarController, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from "chart.js";
import api from "@/plugins/axios";
Chart.register(BarController, BarElement, CategoryScale, LinearScale, Tooltip, Legend);


const top5 = ref([]);
const powerUsers = ref([]);
const occupancy = ref([]);

onMounted(async () => {
  const top5Events = await api.get("/reports/top5");
  top5.value = top5Events.data.data;

  const usersMoreThanThreeEvents = await api.get("/reports/power-users");
  powerUsers.value = usersMoreThanThreeEvents.data.data;

  const occupancyPerEvent = await api.get("/reports/occupancy");
  occupancy.value = occupancyPerEvent.data.data;
    // console.log(top5.value,powerUsers.value,occupancy.value)
  loadChart();
});
function loadChart() {
  const ctx = document.getElementById("occupancyChart");
  new Chart(ctx, {
    type: "bar",
    data: {
      labels: occupancy.value.map(e => e.title),
      datasets: [
        {
          label: "Occupancy %",
          data: occupancy.value.map(e => e.occupancy_percent),
          backgroundColor: "#4f46e5"
        }
      ]
    },
    options: {
      scales: {
        y: { beginAtZero: true, max: 100 }
      }
    }
  });
}

</script>

<style scoped>
td {
  padding: 8px;
}
th {
  padding: 8px;
  font-weight: 600;
}
</style>
