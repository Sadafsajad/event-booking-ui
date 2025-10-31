<template>
  <v-container class="py-6" max-width="1300">

    <!-- PAGE TITLE -->
    <h2 class="text-h5 font-weight-bold mb-6">
      <v-icon size="20" class="mr-2">mdi-chart-bar</v-icon> Reports Dashboard
    </h2>

    <!--  TOP 5 (TABLE LEFT) & GRAPH RIGHT -->
    <v-row dense>
        <v-col cols="12" md="6">
            <v-card class="pa-6 mb-6" height="100%">
            <h3 class="text-h6 font-weight-bold mb-4">Occupancy (All Events)</h3>
            <canvas id="occupancyChart"></canvas>
            </v-card>
        </v-col>
      <!-- TOP 5 GRAPH -->
        <v-col cols="12" md="6">
            <v-card class="pa-6 mb-6" height="100%">
            <h3 class="text-h6 font-weight-bold mb-4">Top 5 Events — Graph</h3>
            <canvas id="top5Chart"></canvas>
            </v-card>
        </v-col>
    </v-row>

    <!-- POWER USERS TABLE (BOTTOM) -->
    <v-row dense>
      <v-col cols="12">
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
            </tbody>
          </v-table>

        </v-card>
      </v-col>
    </v-row>

  </v-container>
</template>
<script setup>
import { onMounted, ref } from "vue";
import {
  Chart, BarElement, BarController,
  CategoryScale, LinearScale, Tooltip, Legend
} from "chart.js";
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

  loadTop5Chart();
  loadOccupancyChart();
});


function loadTop5Chart() {
  new Chart(document.getElementById("top5Chart"), {
    type: "bar",
    data: {
      labels: top5.value.map(e => e.title),
      datasets: [
        {
          label: "Booked (Last 30 Days)",
          data: top5.value.map(e => e.booked_last30),
          backgroundColor: "rgba(56, 118, 255, 0.8)",
          borderColor: "#1d4ed8",
          borderWidth: 2,
          hoverBackgroundColor: "#2563eb",
        }
      ]
    },
    options: { responsive: true }
  });
}

function loadOccupancyChart() {
  new Chart(document.getElementById("occupancyChart"), {
    type: "bar",
    data: {
      labels: occupancy.value.map(e => e.title),
      datasets: [
        {
          label: "Occupancy %",
          data: occupancy.value.map(e => e.occupancy_percent),
          backgroundColor: "rgba(16, 185, 129, 0.7)",
          borderColor: "#059669",
          borderWidth: 2,
          hoverBackgroundColor: "#10b981",
        }
      ]
    },
    options: {
      scales: { y: { beginAtZero: true, max: 100 } }
    }
  });
}

</script>

