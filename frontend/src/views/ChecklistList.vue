<script setup lang="ts">
import http from '@/api/http'
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import type { Checklist } from '@/type'
import { useChecklistStore } from '@/stores/checklist'

const router = useRouter()
const checklists = ref<Checklist[]>([])
const statusFilter = ref<'All' | 'Pass' | 'Fail'>('All')
const checklistStore = useChecklistStore()

const fetchChecklists = async () => {
  http
    .get<never, Checklist[]>('/checklists')
    .then((res) => {
      console.log('res', res)
      checklists.value = res
      checklistStore.setChecklists(checklists.value)
      console.log('111checklistStore.checklists', checklistStore.checklists)
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
  // read checklists from store, if not exist, fetch from server, and set to store

  if (checklistStore.checklists.length === 0) {
    console.log('fetching checklists')
    fetchChecklists()
  } else {
    checklists.value = checklistStore.checklists
  }
})
</script>

<template>
  <div class="flex justify-center items-center">
    <div class="w-3/4 px-4 py-8">
      <div class="flex justify-between items-center mb-8">
        <div class="flex items-center">
          <h1 class="text-2xl font-bold text-gray-800 mr-4 border-r-2 border-gray-300 pr-4">
            Fire Safety Checklists
          </h1>
          <div class="w-40 ml-2">
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

      <div class="bg-white rounded-lg shadow overflow-hidden">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Building
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Inspector
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Date
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Status
              </th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr
              v-for="checklist in filteredChecklists"
              :key="checklist.id"
              @click="navigateToDetail(checklist.id)"
              class="hover:bg-gray-50 cursor-pointer"
            >
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm font-medium text-gray-900">{{ checklist.building }}</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-500">{{ checklist.inspector }}</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-500">
                  {{ new Date(checklist.date).toLocaleDateString() }}
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span
                  :class="{
                    'px-3 py-1 rounded-full text-sm font-medium': true,
                    'bg-green-100 text-green-800': checklist.status === 'Pass',
                    'bg-red-100 text-red-800': checklist.status === 'Fail',
                  }"
                >
                  {{ checklist.status }}
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
