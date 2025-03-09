<script lang="ts" setup>
import { ref } from 'vue';
import { Button } from 'primevue';
import draggable from 'vuedraggable';
import PageTitle from '../components/UIComponents/PageTitle.vue';
import NewTaskModal from '../components/Tasks/NewTaskModal.vue';
import InputText from 'primevue/inputtext';
import Dropdown from 'primevue/dropdown';

const taskFormModal = ref();

const searchAssignee = ref('');
const selectedStatus = ref<string | null>(null);

const statusOptions = ref([
  { label: 'All', value: null },
  { label: 'To Do', value: 'todo' },
  { label: 'In Progress', value: 'inProgress' },
  { label: 'Done', value: 'done' }
]);

const openModal = () => {
  taskFormModal.value.openModal();
};

const columns = ref([
  {
    title: 'To Do',
    status: 'To Do',
    tasks: [
      { id: 1, title: 'Завдання 1', assignee: 'Іван', status: 'To Do', dueDate: '2025-03-10' },
      { id: 2, title: 'Завдання 2', assignee: 'Марія', status: 'To Do', dueDate: '2025-03-12' }
    ]
  },
  {
    title: 'In Progress',
    status: 'In Progress',
    tasks: [
      { id: 3, title: 'Завдання 3', assignee: 'Олексій', status: 'In Progress', dueDate: '2025-03-08' }
    ]
  },
  {
    title: 'Done',
    status: 'Done',
    tasks: [
      { id: 4, title: 'Завдання 4', assignee: 'Анна', status: 'Done', dueDate: '2025-03-06' }
    ]
  }
]);

const tableHeaders = ['ID', 'Name', 'Assignee', 'Status', 'Deadline'];

const filters = ref({
  assignee: '',
  status: ''
});

const isFiltered = (task: any) => {
  const assigneeMatches = task.assignee.toLowerCase().includes(filters.value.assignee.toLowerCase());
  const statusMatches = task.status.toLowerCase().includes(filters.value.status.toLowerCase());
  return assigneeMatches && statusMatches;
};

const sortDirection = ref<'asc' | 'desc' | null>(null);

const sortByDueDate = () => {
  columns.value.forEach(column => {
    column.tasks.sort((a: any, b: any) => {
      const aDate = Date.parse(a.dueDate);
      const bDate = Date.parse(b.dueDate);

      if (sortDirection.value === 'asc' || sortDirection.value === null) {
        sortDirection.value = 'desc';
        return bDate - aDate;
      } else {
        sortDirection.value = 'asc';
        return aDate - bDate;
      }
    });
  });
};

let startX = 0;
let startWidth = 0;
let resizingColumnIndex = -1;

const initResize = (e: MouseEvent, index: number) => {
  startX = e.clientX;
  startWidth = (e.target as HTMLElement).parentElement?.offsetWidth || 0;
  resizingColumnIndex = index;

  const onMouseMove = (moveEvent: MouseEvent) => {
    const newWidth = startWidth + (moveEvent.clientX - startX);
    const th = (e.target as HTMLElement).parentElement;
    if (th) {
      th.style.width = `${newWidth}px`;
    }
  };

  const onMouseUp = () => {
    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
  };

  document.addEventListener('mousemove', onMouseMove);
  document.addEventListener('mouseup', onMouseUp);
};
</script>

<template>
  <PageTitle title="Projects">
    <template #end>
      <Button label="New Task" @click="openModal" />
      <NewTaskModal ref="taskFormModal" />
    </template>
  </PageTitle>

  <div class="filters">
      <span class="p-input-icon-left">
        <i class="pi pi-search" />
        <InputText v-model="searchAssignee" placeholder="Filter by Assignee" />
      </span>

    <Dropdown
        v-model="selectedStatus"
        :options="statusOptions"
        optionLabel="label"
        optionValue="value"
        placeholder="Filter by status"
    />
  </div>

  <div class="task-sections">
    <div class="task-section" v-for="column in columns" :key="column.status">
      <h2>{{ column.title }}</h2>

      <div class="sort-buttons">
        <button @click="sortByDueDate">
          Sort by Deadline
          <span v-if="sortDirection === 'asc'" class="sort-arrow">↑</span>
          <span v-if="sortDirection === 'desc'" class="sort-arrow">↓</span>
        </button>
      </div>

      <table class="task-table">
        <thead>
        <tr>
          <th v-for="(header, index) in tableHeaders" :key="index" @mousedown="initResize($event, index)">
            {{ header }}
            <span class="resize-handle"></span>
          </th>
        </tr>
        </thead>

        <draggable
            v-model="column.tasks"
            group="tasks"
            item-key="id"
            tag="tbody"
        >
          <template #item="{ element }">
            <tr v-if="isFiltered(element)" :key="element.id">
              <td>{{ element.id }}</td>
              <td>{{ element.title }}</td>
              <td>{{ element.assignee }}</td>
              <td>{{ element.status }}</td>
              <td>{{ element.dueDate }}</td>
            </tr>
          </template>
        </draggable>
      </table>
    </div>
  </div>
</template>

<style scoped>
.filters {
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
  align-items: center;
}

.p-inputtext {
  height: 42px;
}

.task-sections {
  display: flex;
  flex-direction: column;
  gap: 20px;
}
.task-section {
  background: #18181b;
  padding: 16px;
  border-radius: 8px;

  h2 {
    margin-top: 0;
  }
}
.task-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 10px;

  th,
  td {
    padding: 8px;
    text-align: left;
    border: 1px solid transparent;
    position: relative;
  }

  th {
    background-color: #18181b;
    border-bottom-color: #27272a;
    color: #fff;
  }

  td {
    border-bottom-color: #27272a;
    
    &:hover {
      cursor: pointer;
    }
  }
}

.resize-handle {
  position: absolute;
  right: 0;
  top: 0;
  width: 5px;
  height: 100%;
  cursor: ew-resize;
}

.sort-buttons {
  margin-bottom: 10px;

  button {
    margin-right: 10px;
    padding: 6px 12px;
    background-color: #333;
    color: #fff;
    border: none;
    cursor: pointer;
  }
  button:hover {
    background-color: #444;
  }

  .sort-arrow {
    margin-left: 5px;
    font-size: 14px;
  }
}
</style>













