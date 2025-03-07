<script lang="ts" setup>
import { ref, watch, computed } from 'vue';
import { useProjectsStore } from '../../stores/projects';
import { useToast } from 'primevue/usetoast';
import Dialog from 'primevue/dialog';
import InputText from 'primevue/inputtext';
import Textarea from 'primevue/textarea';
import InputNumber from 'primevue/inputnumber';
import Dropdown from 'primevue/dropdown';
import Button from 'primevue/button';
import type { Project } from '../../types/project';

const store = useProjectsStore();
const toast = useToast();

const projectName = ref('');
const projectDescription = ref('');
const taskCount = ref(0);
const status = ref<Project['status']>('todo');
const submitted = ref(false);
const visible = ref(false);
const editingProjectId = ref<number | null>(null);

const statusOptions = computed(() => [
  { label: 'To Do', value: 'todo' },
  { label: 'In Progress', value: 'inProgress' },
  { label: 'Done', value: 'done' },
]);

const openModal = (projectId: number) => {
  const project = store.projects.find((p) => p.id === projectId);
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

  if (!projectName.value.trim()) {
    toast.add({ severity: 'error', summary: 'Error', detail: 'Project Name is required', life: 3000 });
    return;
  }

  if (editingProjectId.value !== null) {
    store.updateProject(editingProjectId.value, {
      id: editingProjectId.value,
      name: projectName.value,
      description: projectDescription.value,
      taskCount: taskCount.value,
      status: status.value,
      createdAt: new Date().toISOString(),
    });
    toast.add({ severity: 'success', summary: 'Success', detail: 'Project updated', life: 3000 });
    closeModal();
  }
};

watch(visible, (newVal) => {
  if (!newVal) resetForm();
});

defineExpose({ openModal });
</script>

<template>
  <Dialog v-model:visible="visible" modal header="Edit Project" :style="{ width: '30vw' }" :breakpoints="{ '960px': '75vw', '640px': '90vw' }">
    <div>
      <div class="p-field">
        <label for="projectName">Project Name *</label>
        <InputText id="projectName" v-model="projectName" :class="{ 'p-invalid': submitted && !projectName.trim() }" />
        <small v-if="submitted && !projectName.trim()" class="p-error">Project Name is required.</small>
      </div>
      <div class="p-field">
        <label for="projectDescription">Project Description</label>
        <Textarea id="projectDescription" v-model="projectDescription" rows="5" autoResize />
      </div>
      <div class="p-field">
        <label for="taskCount">Number of Tasks</label>
        <InputNumber id="taskCount" v-model="taskCount" :min="0" showButtons />
      </div>
      <div class="p-field">
        <label for="status">Status</label>
        <Dropdown id="status" v-model="status" :options="statusOptions" optionLabel="label" optionValue="value" />
      </div>
    </div>
    <template #footer>
      <Button label="Cancel" severity="secondary" @click="closeModal" text />
      <Button label="Save" severity="primary" @click="submitForm" />
    </template>
  </Dialog>
</template>

<style scoped>
.p-field {
  margin-bottom: 1.5rem;
  display: flex;
  flex-direction: column;
}
.p-field label {
  font-weight: bold;
  display: block;
  margin-bottom: 0.5rem;
}
.p-error {
  color: #f44336;
  font-size: 0.875rem;
}
</style>
