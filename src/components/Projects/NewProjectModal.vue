<script lang="ts" setup>
import { ref } from 'vue';
import Dialog from 'primevue/dialog';
import InputText from 'primevue/inputtext';
import Textarea from 'primevue/textarea';
import Button from 'primevue/button';

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

  if (projectName.value) {
    console.log('Назва проєкту:', projectName.value);
    console.log('Опис проєкту:', projectDescription.value);
    closeModal();
  }
};

defineExpose({ openModal });
</script>

<template>
  <Dialog
      v-model:visible="visible"
      modal
      header="New Project"
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
        <small v-if="!projectName && submitted" class="p-error"
        >Project Name is required.</small
        >
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
    </div>
    <template #footer>
      <Button label="Cancel"
              severity="secondary"
              @click="visible = false"
              text
      />
      <Button label="Save"
              type="submit"
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
