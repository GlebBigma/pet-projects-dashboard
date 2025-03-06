<script lang="ts" setup>
import { ref } from 'vue';
import Dialog from 'primevue/dialog';
import InputText from 'primevue/inputtext';
import Dropdown from 'primevue/dropdown';
import Calendar from 'primevue/calendar';
import Button from 'primevue/button';

const taskName = ref('');
const assignee = ref(null);
const status = ref('');
const dueDate = ref(null);
const submitted = ref(false);

const visible = ref(false);

// Данні для списку виконавців і статусів
const assignees = ref([
  { label: 'Іван', value: 'Ivan' },
  { label: 'Марія', value: 'Maria' },
  { label: 'Олексій', value: 'Olexiy' }
]);

const statuses = ref([
  { label: 'To Do', value: 'To Do' },
  { label: 'In Progress', value: 'In Progress' },
  { label: 'Done', value: 'Done' }
]);

const openModal = () => {
  visible.value = true;
};

const closeModal = () => {
  visible.value = false;
  resetForm();
};

const resetForm = () => {
  taskName.value = '';
  assignee.value = null;
  status.value = '';
  dueDate.value = null;
  submitted.value = false;
};

const submitForm = () => {
  submitted.value = true;

  if (taskName.value && assignee.value && status.value && dueDate.value) {
    console.log('Назва завдання:', taskName.value);
    console.log('Виконавець:', assignee.value);
    console.log('Статус:', status.value);
    console.log('Термін виконання:', dueDate.value);
    closeModal();
  }
};

defineExpose({ openModal });
</script>

<template>
  <Dialog
      v-model:visible="visible"
      modal
      header="Create New Task"
      :style="{ width: '30vw' }"
      :breakpoints="{ '960px': '75vw', '640px': '90vw' }"
  >
    <div>
      <div class="p-field">
        <label for="taskName">Task Name *</label>
        <InputText
            id="taskName"
            v-model="taskName"
            :class="{ 'p-invalid': !taskName && submitted }"
        />
        <small v-if="!taskName && submitted" class="p-error">
          Task Name is required.
        </small>
      </div>

      <div class="p-field">
        <label for="assignee">Assignee *</label>
        <Dropdown
            id="assignee"
            v-model="assignee"
            :options="assignees"
            optionLabel="label"
            :class="{ 'p-invalid': !assignee && submitted }"
        />
        <small v-if="!assignee && submitted" class="p-error">
          Assignee is required.
        </small>
      </div>

      <div class="p-field">
        <label for="status">Status *</label>
        <Dropdown
            id="status"
            v-model="status"
            :options="statuses"
            optionLabel="label"
            :class="{ 'p-invalid': !status && submitted }"
        />
        <small v-if="!status && submitted" class="p-error">
          Status is required.
        </small>
      </div>

      <div class="p-field">
        <label for="dueDate">Due Date *</label>
        <Calendar
            id="dueDate"
            v-model="dueDate"
            :showTime="true"
            :class="{ 'p-invalid': !dueDate && submitted }"
        />
        <small v-if="!dueDate && submitted" class="p-error">
          Due Date is required.
        </small>
      </div>
    </div>

    <template #footer>
      <Button
          label="Cancel"
          severity="secondary"
          @click="closeModal"
          text
      />
      <Button
          label="Save"
          severity="primary"
          @click="submitForm"
      />
    </template>
  </Dialog>
</template>

<style scoped>
.p-field {
  margin-bottom: 1.5rem;
  display: flex;
  flex-direction: column;

  label {
    font-weight: bold;
    display: block;
    margin-bottom: 0.5rem;
  }

  .p-error {
    color: #f44336;
    font-size: 0.875rem;
  }
}
</style>
