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
    <template v-slot:item.event_at="{ item }">
      {{ formatDate(item.event_at) }}
    </template>

<template v-slot:item.actions="{ item }">
  <div 
    class="d-flex align-center justify-center"
    style="gap: 10px; width: 100%;"
  >

    <!-- ✅ ADMIN VIEW -->
    <template v-if="user?.is_admin">

      <!-- Seats left -->
      <v-chip
        color="grey"
        size="small"
        class="chip-clean"
        label
      >
        {{ item.left }} left
      </v-chip>

      <!-- EDIT BUTTON -->
      <v-btn
        icon
        size="small"
        class="btn-icon-clean bg-blue-lighten-5"
        @click="editItem(item)"
      >
        <v-icon color="blue-darken-2">mdi-pencil</v-icon>
      </v-btn>

      <!-- DELETE BUTTON -->
      <v-btn
        icon
        size="small"
        class="btn-icon-clean bg-red-lighten-5"
        @click="confirmDelete(item)"
      >
        <v-icon color="red-darken-2">mdi-delete</v-icon>
      </v-btn>

    </template>

    <!-- ✅ USER VIEW -->
    <template v-else>

      <!-- User already booked -->
      <v-chip
        v-if="item.mine_qty > 0"
        color="blue"
        size="small"
        class="chip-clean"
        label
      >
        Booked ({{ item.mine_qty }})
      </v-chip>

      <!-- Full -->
      <v-chip
        v-else-if="item.left <= 0"
        color="red"
        size="small"
        class="chip-clean"
        label
      >
        Full
      </v-chip>

      <!-- Seats left chip only for UI clean -->
      <v-chip
        v-else
        color="grey"
        size="small"
        class="chip-clean"
        label
      >
        {{ item.left }} left
      </v-chip>

      <!-- Booking input + book button (only for users) -->
      <v-text-field
        v-model.number="item.qty"
        type="number"
        variant="outlined"
        density="compact"
        min="1"
        :max="item.left"
        hide-details
        style="max-width: 60px;"
        v-if="item.left > 0 && item.mine_qty === 0"
      />

      <v-btn
        v-if="item.left > 0 && item.mine_qty === 0"
        color="green"
        size="small"
        variant="flat"
        class="text-white"
        :loading="item.isBooking"
        :disabled="item.isBooking"
        @click="emitBook(item)"
      >
        Book
      </v-btn>

    </template>
  </div>
</template>


  </v-data-table-server>
</template>
<script setup>
  import { ref, watch, onMounted } from "vue";
  import api from "@/plugins/axios";
  const props = defineProps({
    filters: { type: Object, default: () => ({ q: "", from: "", to: "" }) },
    user: { type: Object, default: null },
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
  //  Load paginated items from Laravel API
  async function loadItems({ page, itemsPerPage, sortBy }) {
    loading.value = true;
    try {
      const params = {
        page,
        per_page: itemsPerPage,
        q: filters.value.q,
        from: filters.value.from,
        to: filters.value.to,
        sort: sortBy?.[0]?.key ?? "id",
        order: sortBy?.[0]?.order ?? "desc",
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

async function confirmDelete(item) {
  if (!confirm(`Delete event "${item.title}"?`)) return;
  try {
    await api.delete(`/admin/events/${item.id}`);
    await loadItems({ page: 1, itemsPerPage: itemsPerPage.value });
  } catch (err) {
    console.error("Delete failed:", err.response?.data || err.message);
  }
}

function editItem(item) {
  console.log("Edit:", item.id);
}
</script>

<style scoped>
.v-data-table {
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
}
.chip-clean {
  min-width: 80px;
  justify-content: center;
}
.btn-icon-clean {
  border-radius: 50%;
}
.bg-red-lighten-5 {
  background-color: #ffebeb !important;
}
.bg-blue-lighten-5 {
  background-color: #e8f0ff !important;
}
</style>
