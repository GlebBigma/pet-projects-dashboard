<script setup lang="ts">
import { defineProps } from 'vue';
import Toolbar from 'primevue/toolbar';

defineProps<{ title: string }>();
</script>

<template>
  <Toolbar>
    <template #start>
      <h1>{{ title }}</h1>
    </template>
    <template #end>
      <slot name="end" />
    </template>
  </Toolbar>
</template>

<style scoped>
.p-toolbar {
  padding: 20px;
  margin-bottom: 20px;

  background-color: #18181b;
  border: none;
  border-radius: 0;
  color: #ffffff;

  h1 {
    margin: 0;
    font-size: 1.5rem;
  }
}
</style>
