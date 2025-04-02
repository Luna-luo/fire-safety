<script setup lang="ts">
import http from '@/api/http'
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import type { Checklist } from '@/type'

const route = useRoute()
const router = useRouter()
const checklist = ref<Checklist | null>(null)

const fetchChecklist = async () => {
  try {
    const response = await http.get<never, Checklist>(`/checklists/${route.params.id}`)
    checklist.value = response
  } catch (error) {
    console.error('Error fetching checklist:', error)
  }
}

const goBack = () => {
  router.push('/')
}

onMounted(() => {
  fetchChecklist()
})
</script>

<template>
  <div class="flex justify-center min-h-screen">
    <div class="w-3/4 px-4 py-8">
      <div class="flex items-center mb-8">
        <button @click="goBack" class="mr-4 text-gray-600 hover:text-gray-900">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
        </button>
        <h1 class="text-2xl font-bold text-gray-800">Checklist Details</h1>
      </div>

      <div v-if="checklist" class="bg-white rounded-lg shadow overflow-hidden">
        <div class="p-6">
          <div class="grid grid-cols-2 gap-6">
            <div>
              <h2 class="text-sm font-medium text-gray-500">Building</h2>
              <p class="mt-1 text-lg font-semibold text-gray-900">{{ checklist.building }}</p>
            </div>
            <div>
              <h2 class="text-sm font-medium text-gray-500">Inspector</h2>
              <p class="mt-1 text-lg font-semibold text-gray-900">{{ checklist.inspector }}</p>
            </div>
            <div>
              <h2 class="text-sm font-medium text-gray-500">Date</h2>
              <p class="mt-1 text-lg font-semibold text-gray-900">
                {{ new Date(checklist.date).toLocaleDateString() }}
              </p>
            </div>
            <div>
              <h2 class="text-sm font-medium text-gray-500">Status</h2>
              <p class="mt-1">
                <span
                  :class="{
                    'px-3 py-1 rounded-full text-sm font-medium': true,
                    'bg-green-100 text-green-800': checklist.status === 'Pass',
                    'bg-red-100 text-red-800': checklist.status === 'Fail',
                  }"
                >
                  {{ checklist.status }}
                </span>
              </p>
            </div>
          </div>

          <div class="mt-8">
            <h2 class="text-sm font-medium text-gray-500">Notes</h2>
            <p class="mt-1 text-gray-900 whitespace-pre-wrap">{{ checklist.notes }}</p>
          </div>
        </div>
      </div>
      <div v-else class="text-center py-12">
        <p class="text-gray-500">Loading...</p>
      </div>
    </div>
  </div>
</template>
