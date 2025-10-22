<template>
  <form @submit.prevent="$emit('filter')" class="filters">
    <input v-model="localFilters.q" type="text" placeholder="Search title or venue" />
    <input v-model="localFilters.from" type="date" />
    <input v-model="localFilters.to" type="date" />
    <button type="submit">Filter</button>
  </form>
</template>

<script setup>
import { reactive, watch } from "vue";

/*
Use v-model via defineModel (Vue 3.4+) or classic emit.
We'll use classic v-model here for learning.
*/
const props = defineProps(["modelValue"]);
const emit = defineEmits(["update:modelValue", "filter"]);

const localFilters = reactive({ ...props.modelValue });

// keep parent synced when user changes filters
watch(localFilters, (newVal) => emit("update:modelValue", newVal), { deep: true });
</script>

<style scoped>
.filters {
  display: grid;
  grid-template-columns: 1fr 170px 170px 120px;
  gap: 8px;
  margin-bottom: 12px;
}
.filters input,
.filters button {
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 10px;
}
.filters button {
  background: #111827;
  color: #fff;
  font-weight: 700;
  cursor: pointer;
}
</style>
