<template>
  <DataTable
      :value="localTasks"
      dataKey="id"
      class="p-datatable-sm"
      :resizableColumns="true"
      :sortable="true"
      :filters="filters"
      @rowReorder="onRowReorder"
  >
    <!-- Draggable ручка -->
    <Column rowReorder style="width: 3rem" />

    <!-- Колонки -->
    <Column field="id" header="ID" :sortable="true"></Column>
    <Column field="name" header="Назва" :sortable="true">
      <template #filter>
        <InputText v-model="filters.name" placeholder="Пошук по назві" />
      </template>
    </Column>
    <Column field="assignee" header="Виконавець" :sortable="true"></Column>
    <Column field="status" header="Статус" :sortable="true"></Column>
    <Column field="dueDate" header="Термін" :sortable="true"></Column>

    <!-- Пустий стан -->
    <template #empty>
      <div class="p-d-flex p-jc-center">
        Перетягніть завдання сюди
      </div>
    </template>
  </DataTable>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import InputText from 'primevue/inputtext';

const props = defineProps({
  tasks: {
    type: Array,
    required: true
  },
  status: {
    type: String,
    required: true
  }
});

const emit = defineEmits(['task-updated']);

const localTasks = computed({
  get: () => props.tasks,
  set: (value) => emit('task-updated', value, props.status)
});

const filters = ref({
  name: '',
  assignee: ''
});

// Обробник перетягування рядків
const onRowReorder = (event: any) => {
  localTasks.value = event.value;
};
</script>

<style scoped>
:deep(.p-rowdragger) {
  cursor: grab;
}

:deep(.p-rowdragger.p-rowdragger-dragging) {
  cursor: grabbing;
}
</style>
