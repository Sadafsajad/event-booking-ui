<template>
  <form @submit.prevent="$emit('filter')" class="filters">
    <v-text-field
      v-model="localFilters.q"
      label="Search"
      prepend-inner-icon="mdi-magnify"
      variant="outlined"
      hide-details
      single-line
    />

    <!-- FROM Date Picker -->
    <v-menu
      v-model="menuFrom"
      :close-on-content-click="false"
      transition="scale-transition"
      offset-y
      min-width="auto"
    >
      <template #activator="{ props }">
        <v-text-field
          v-model="localFilters.from"
          label="From"
          readonly
          v-bind="props"
          variant="outlined"
          hide-details
        />
      </template>
      <v-date-picker
        v-model="localFilters.from"
        @update:model-value="menuFrom = false"
      />
    </v-menu>

    <!-- TO Date Picker -->
    <v-menu
      v-model="menuTo"
      :close-on-content-click="false"
      transition="scale-transition"
      offset-y
      min-width="auto"
    >
      <template #activator="{ props }">
        <v-text-field
          v-model="localFilters.to"
          label="To"
          readonly
          v-bind="props"
          variant="outlined"
          hide-details
        />
      </template>
      <v-date-picker
        v-model="localFilters.to"
        @update:model-value="menuTo = false"
      />
    </v-menu>

    <v-btn
      class="text-none text-subtitle-1"
      size="large"
      variant="tonal"
      type="submit"
    >
      Filter
    </v-btn>
  </form>
</template>

<script setup>
import { reactive, ref, watch } from "vue";

const props = defineProps(["modelValue"]);
const emit = defineEmits(["update:modelValue", "filter"]);

const localFilters = reactive({ ...props.modelValue });
const menuFrom = ref(false);
const menuTo = ref(false);

watch(localFilters, (newVal) => emit("update:modelValue", newVal), { deep: true });
</script>

<style scoped>
.filters {
  display: grid;
  grid-template-columns: 1fr 170px 170px 120px;
  gap: 8px;
  margin-bottom: 12px;
}
</style>
