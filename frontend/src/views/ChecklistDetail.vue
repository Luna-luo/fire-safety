<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

interface ChecklistItem {
  id: number
  category: string
  item: string
  status: 'Pass' | 'Fail'
  notes: string
}

interface Checklist {
  id: number
  buildingName: string
  date: string
  status: 'Pass' | 'Fail'
  inspector: string
  items: ChecklistItem[]
}

const route = useRoute()
const router = useRouter()
const checklist = ref<Checklist | null>(null)

const fetchChecklist = async () => {
  try {
    const response = await fetch(`http://localhost:3000/checklists/${route.params.id}`)
    checklist.value = await response.json()
  } catch (error) {
    console.error('Error fetching checklist:', error)
  }
}

onMounted(() => {
  fetchChecklist()
})
</script>

<template>
  <div class="container mx-auto px-4 py-8">
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-2xl font-bold text-gray-800">Checklist Details</h1>
      <button
        @click="router.push('/')"
        class="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
      >
        Back to List
      </button>
    </div>

    <div v-if="checklist" class="bg-white rounded-lg shadow p-6">
      <div class="mb-6">
        <h2 class="text-xl font-semibold">{{ checklist.buildingName }}</h2>
        <div class="text-gray-600 mt-2">
          <p>Inspector: {{ checklist.inspector }}</p>
          <p>Date: {{ new Date(checklist.date).toLocaleDateString() }}</p>
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

      <div class="space-y-4">
        <div v-for="item in checklist.items" :key="item.id" class="border-b pb-4">
          <div class="flex justify-between items-start">
            <div>
              <h3 class="font-medium">{{ item.category }}</h3>
              <p class="text-gray-600">{{ item.item }}</p>
              <p v-if="item.notes" class="text-gray-500 text-sm mt-1">{{ item.notes }}</p>
            </div>
            <span
              :class="{
                'bg-green-100 text-green-800': item.status === 'Pass',
                'bg-red-100 text-red-800': item.status === 'Fail',
              }"
              class="px-3 py-1 rounded-full text-sm font-medium"
            >
              {{ item.status }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
