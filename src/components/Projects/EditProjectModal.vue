<script lang="ts" setup>
import { useProjectsStore } from '../../stores/projects.ts';
import { ref, watch } from 'vue';
import Dialog from 'primevue/dialog';
import InputText from 'primevue/inputtext';
import Textarea from 'primevue/textarea';
import InputNumber from 'primevue/inputnumber';
import Dropdown from 'primevue/dropdown';
import Button from 'primevue/button';

const store = useProjectsStore();

const projectName = ref('');
const projectDescription = ref('');
const taskCount = ref(0);
const status = ref<'todo' | 'inProgress' | 'done'>('todo');
const submitted = ref(false);

const visible = ref(false);
const editingProjectId = ref<number | null>(null);

const statusOptions = [
  { label: 'To Do', value: 'todo' },
  { label: 'In Progress', value: 'inProgress' },
  { label: 'Done', value: 'done' },
];

const openModal = (projectId: number) => {
  const project = store.projects.find(p => p.id === projectId);
  if (project) {
    projectName.value = project.name;
    projectDescription.value = project.description;
    taskCount.value = project.taskCount;
    status.value = project.status;
    editingProjectId.value = projectId;
    visible.value = true;
  }
};

const closeModal = () => {
  visible.value = false;
  resetForm();
};

const resetForm = () => {
  projectName.value = '';
  projectDescription.value = '';
  taskCount.value = 0;
  status.value = 'todo';
  submitted.value = false;
  editingProjectId.value = null;
};

const submitForm = () => {
  submitted.value = true;

  if (projectName.value && taskCount.value >= 0) {
    if (editingProjectId.value !== null) {
      store.updateProject(editingProjectId.value, {
        name: projectName.value,
        description: projectDescription.value,
        taskCount: taskCount.value,
        status: status.value,
      });
      closeModal();
    }
  }
};

watch(visible, (newVal) => {
  if (!newVal) resetForm(); // Reset form when closing modal
});

defineExpose({ openModal });
</script>

<template>
  <Dialog
      v-model:visible="visible"
      modal
      header="Edit Project"
      :style="{ width: '30vw' }"
      :breakpoints="{ '960px': '75vw', '640px': '90vw' }"
  >
    <div>
      <div class="p-field">
        <label for="projectName">Project Name *</label>
        <InputText
            id="projectName"
            v-model="projectName"
            :class="{ 'p-invalid': !projectName && submitted }"
        />
        <small v-if="!projectName && submitted" class="p-error">
          Project Name is required.
        </small>
      </div>

      <div class="p-field">
        <label for="projectDescription">Project Description</label>
        <Textarea
            id="projectDescription"
            v-model="projectDescription"
            rows="5"
            autoResize
        />
      </div>

      <div class="p-field">
        <label for="taskCount">Number of Tasks</label>
        <InputNumber
            id="taskCount"
            v-model="taskCount"
            :min="0"
            showButtons
        />
      </div>

      <div class="p-field">
        <label for="status">Status</label>
        <Dropdown
            id="status"
            v-model="status"
            :options="statusOptions"
            optionLabel="label"
            optionValue="value"
        />
      </div>
    </div>

    <template #footer>
      <Button label="Cancel" severity="secondary" @click="closeModal" text />
      <Button label="Save" type="submit" severity="primary" @click="submitForm" />
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
