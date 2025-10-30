<template>
  <v-data-table-server
    v-model:items-per-page="itemsPerPage"
    :headers="headers"
    :items="serverItems"
    :items-length="totalItems"
    :loading="loading"
    :search="search"
    item-value="id"
    @update:options="loadItems"
  >
   <template v-slot:item.actions="{ item }">
      <!-- Already booked by user -->
      <v-chip
        v-if="item.mine_qty > 0"
        color="blue"
        size="small"
        label
        text-color="white"
      >
        Booked ({{ item.mine_qty }})
      </v-chip>

      <!-- Full event -->
      <v-chip
        v-else-if="item.left <= 0"
        color="red"
        size="small"
        label
        text-color="white"
      >
        Full
      </v-chip>

      <!-- Book with qty input -->
      <div v-else class="d-flex flex-column align-start">
        <div class="d-flex align-center" style="gap: 6px; margin-top: 4px;">
          <v-text-field
            v-model.number="item.qty"
            type="number"
            variant="outlined"
            density="compact"
            min="1"
            :max="item.left"
            hide-details
            style="max-width: 70px;"
          />
          <v-btn
            color="green"
            size="small"
            variant="flat"
            class="text-white"
            :loading="item.isBooking"    
            :disabled="item.isBooking"   
            @click="emitBook(item)"
          >
            Book ({{ item.left }} left)
          </v-btn>
        </div>
      </div>
    </template>
    <template v-slot:item.event_at="{ item }">
      {{ formatDate(item.event_at) }}
    </template>
  </v-data-table-server>
</template>
<script setup>
  import { ref, watch, onMounted } from "vue";
  import api from "@/plugins/axios";
const props = defineProps({
  filters: { type: Object, default: () => ({ q: "", from: "", to: "" }) },
});
const emit = defineEmits(["book", "refresh"]);
function emitBook(item) {
  if (item.isBooking) return;
  item.isBooking = true;
  const qty = item.qty && item.qty > 0 ? item.qty : 1;
  emit("book", { id: item.id, qty, item });
}
const headers = [
  { title: "Title", key: "title" },
  { title: "Venue", key: "venue" },
  { title: "Capacity", key: "capacity", align: "end" },
  { title: "Date", key: "event_at", align: "end" },
  { title: "Actions", key: "actions", sortable: false, align: "center" },
];

const serverItems = ref([]);
const totalItems = ref(0);
const loading = ref(false);
const itemsPerPage = ref(10);
const filters = ref({ ...props.filters });
// ✅ Date Formatter Function
function formatDate(dateStr) {
  if (!dateStr) return "-";
  const d = new Date(dateStr);
  return d.toLocaleString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}
// 🚀 Load paginated items from Laravel API
async function loadItems({ page, itemsPerPage, sortBy }) {
  loading.value = true;
  try {
    const params = {
      page,
      per_page: itemsPerPage,
      q: filters.value.q,
      from: filters.value.from,
      to: filters.value.to,
      sort: sortBy?.[0]?.key ?? "event_at",
      order: sortBy?.[0]?.order ?? "asc",
    };

    const res = await api.get("/events", { params });
    const list = res.data.data || [];
    console.log(res);
    serverItems.value = res.data.data || [];
    totalItems.value = res.data.total;
  } catch (err) {
    console.error("API Error:", err.response?.data || err.message);
  } finally {
    loading.value = false;
  }
}
defineExpose({ loadItems });

// Auto refresh when filters change
watch(
  () => props.filters,
  (val) => {
    filters.value = { ...val };
    loadItems({ page: 1, itemsPerPage: itemsPerPage.value });
  },
  { deep: true }
);

onMounted(() => {
  loadItems({ page: 1, itemsPerPage: itemsPerPage.value });
});
</script>

<style scoped>
.v-data-table {
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
}
</style>
