<script lang="ts" setup>
import { useProjectsStore } from '../../stores/projects';
import { ref } from 'vue';
import { useToast } from 'primevue/usetoast';
import Dialog from 'primevue/dialog';
import InputText from 'primevue/inputtext';
import Textarea from 'primevue/textarea';
import Button from 'primevue/button';

const store = useProjectsStore();
const toast = useToast();

const projectName = ref('');
const projectDescription = ref('');
const submitted = ref(false);
const visible = ref(false);

const openModal = () => {
  visible.value = true;
};

const closeModal = () => {
  visible.value = false;
  resetForm();
};

const resetForm = () => {
  projectName.value = '';
  projectDescription.value = '';
  submitted.value = false;
};

const submitForm = () => {
  submitted.value = true;

  if (!projectName.value.trim()) {
    return;
  }

  store.addProject({
    id: store.projects.length + 1, // We need UUID here, or real DB (quick fix)
    name: projectName.value.trim(),
    description: projectDescription.value.trim(),
    status: 'todo',
    createdAt: new Date().toISOString(),
    tasks: []
  });

  toast.add({ severity: 'success', summary: 'Success', detail: 'Project added', life: 3000 });
  closeModal();
};

defineExpose({ openModal });
</script>

<template>
  <Dialog v-model:visible="visible" modal header="New Project" :style="{ width: '30vw' }" :breakpoints="{ '960px': '75vw', '640px': '90vw' }">
    <div>
      <div class="form-field">
        <label for="projectName">Project Name *</label>
        <InputText id="projectName" v-model="projectName" :class="{ 'p-invalid': submitted && !projectName.trim() }" />
        <small v-if="submitted && !projectName.trim()" class="p-error">Project Name is required.</small>
      </div>

      <div class="form-field">
        <label for="projectDescription">Project Description</label>
        <Textarea id="projectDescription" v-model="projectDescription" rows="5" autoResize />
      </div>
    </div>
    <template #footer>
      <Button label="Cancel" severity="secondary" @click="closeModal" text />
      <Button label="Save" type="submit" severity="primary" @click="submitForm" />
    </template>
  </Dialog>
</template>

<style scoped>
.form-field {
  margin-bottom: 1.5rem;
  display: flex;
  flex-direction: column;
}

.form-field label {
  font-weight: bold;
  margin-bottom: 0.5rem;
}

.p-error {
  color: #f44336;
  font-size: 0.875rem;
}
</style>
