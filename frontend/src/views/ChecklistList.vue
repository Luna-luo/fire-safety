<script setup lang="ts">
import http from '@/api/http'
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'

interface Checklist {
  id: number
  buildingName: string
  date: string
  status: 'Pass' | 'Fail'
  inspector: string
}

const router = useRouter()
const checklists = ref<Checklist[]>([])
const statusFilter = ref<'All' | 'Pass' | 'Fail'>('All')

const fetchChecklists = async () => {
  http
    .get<never, Checklist[]>('/checklists')
    .then((res) => {
      console.log('res', res)
      checklists.value = res
    })
    .catch((err) => {
      console.error('Error fetching checklists:', err)
    })
}

const filteredChecklists = computed(() => {
  if (statusFilter.value === 'All') return checklists.value
  return checklists.value.filter((checklist) => checklist.status === statusFilter.value)
})

const navigateToDetail = (id: number) => {
  router.push(`/checklist/${id}`)
}

onMounted(() => {
  fetchChecklists()
})
</script>

<template>
  <div class="flex justify-center items-center">
    <div class="w-3/4 px-4 py-8">
      <div class="flex justify-between items-center mb-8">
        <div class="flex items-center">
          <h1 class="text-2xl font-bold text-gray-800 mr-4 border-r-2 border-gray-300 pr-4">Fire Safety Checklists</h1>
          <div class="w-40 ml-12">
            <select v-model="statusFilter" class="border rounded px-3 py-2">
              <option value="All">All Status</option>
              <option value="Pass">Pass</option>
              <option value="Fail">Fail</option>
            </select>
          </div>
        </div>
        <button
          @click="router.push('/checklist/new')"
          class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Add New Checklist
        </button>
      </div>

      <div class="grid gap-4">
        <div
          v-for="checklist in filteredChecklists"
          :key="checklist.id"
          @click="navigateToDetail(checklist.id)"
          class="bg-white p-4 rounded-lg shadow hover:shadow-md cursor-pointer"
        >
          <div class="flex justify-between items-center">
            <div>
              <h2 class="text-lg font-semibold">{{ checklist.buildingName }}</h2>
              <p class="text-gray-600">Inspector: {{ checklist.inspector }}</p>
              <p class="text-gray-600">Date: {{ new Date(checklist.date).toLocaleDateString() }}</p>
            </div>
            <span
              :class="{
                'bg-green-100 text-green-800': checklist.status === 'Pass',
                'bg-red-100 text-red-800': checklist.status === 'Fail',
              }"
              class="px-3 py-1 rounded-full text-sm font-medium"
            >
              {{ checklist.status }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
