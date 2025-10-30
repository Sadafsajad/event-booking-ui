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
   <!-- Book / Full -->
    <template v-slot:item.actions="{ item }">
      <v-btn
        v-if="item.left > 0"
        color="green"
        size="small"
        variant="flat"
        @click="$emit('book', item.id)"
      >
        Book ({{ item.left }} left)
      </v-btn>
      <v-chip
        v-else
        color="red"
        size="small"
        label
        text-color="white"
      >
        Full
      </v-chip>
    </template>
  </v-data-table-server>
</template>
<script setup>
  import { ref, watch, onMounted } from "vue";
  import api from "@/plugins/axios";
const props = defineProps({
  filters: { type: Object, default: () => ({ q: "", from: "", to: "" }) },
});
defineEmits(["book"]);

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
    serverItems.value = list.map((e) => ({
      ...e,
      left: e.capacity - (e.booked || 0),
    }));
    totalItems.value = res.data.total;
  } catch (err) {
    console.error("API Error:", err.response?.data || err.message);
  } finally {
    loading.value = false;
  }
}

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
