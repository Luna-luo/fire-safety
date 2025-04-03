<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import type { Checklist } from '@/type'
import http from '@/api/http'
import { useChecklistStore } from '@/stores/checklist'

const router = useRouter()
const form = ref({
  building: '',
  inspector: '',
  date: new Date().toISOString().split('T')[0],
  status: 'Pass' as 'Pass' | 'Fail',
  notes: '',
})

const errors = ref({
  building: '',
  inspector: '',
})

const validateForm = () => {
  let isValid = true
  errors.value = {
    building: '',
    inspector: '',
  }

  if (!form.value.building.trim()) {
    errors.value.building = 'Building name is required'
    isValid = false
  }

  if (!form.value.inspector.trim()) {
    errors.value.inspector = 'Inspector name is required'
    isValid = false
  }

  return isValid
}

const submitForm = async () => {
  if (!validateForm()) {
    return
  }

  try {
    const checklist: Checklist = {
      ...form.value,
      id: Date.now(),
    }
    const checklistStore = useChecklistStore()
    const newChecklists = [...checklistStore.checklists, checklist]
    console.log('newChecklists', newChecklists)
    checklistStore.setChecklists(newChecklists)
    console.log('checklistStore.checklists', checklistStore.checklists)
    router.push('/')
  } catch (error) {
    console.error('Error saving checklist:', error)
  }
}
</script>

<template>
  <div class="min-h-screen py-8">
    <div class="max-w-3xl mx-auto px-4">
      <div class="flex justify-between items-center mb-8">
        <h1 class="text-2xl font-bold text-gray-800">New Checklist</h1>
        <button
          @click="router.push('/')"
          class="px-4 py-2 text-gray-600 hover:text-gray-800 flex items-center gap-2"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
              clip-rule="evenodd"
            />
          </svg>
          Back to List
        </button>
      </div>

      <form @submit.prevent="submitForm" class="bg-white rounded-lg shadow-sm p-6">
        <div class="grid grid-cols-2 gap-6 mb-8">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Building Name</label>
            <input
              v-model="form.building"
              type="text"
              required
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
              :class="{ 'border-red-500': errors.building }"
              placeholder="Enter building name"
            />
            <p v-if="errors.building" class="mt-1 text-sm text-red-500">{{ errors.building }}</p>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Inspector</label>
            <input
              v-model="form.inspector"
              type="text"
              required
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
              :class="{ 'border-red-500': errors.inspector }"
              placeholder="Enter inspector name"
            />
            <p v-if="errors.inspector" class="mt-1 text-sm text-red-500">{{ errors.inspector }}</p>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Date</label>
            <input
              v-model="form.date"
              type="date"
              required
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Status</label>
            <select
              v-model="form.status"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
            >
              <option value="Pass">Pass</option>
              <option value="Fail">Fail</option>
            </select>
          </div>
        </div>

        <div class="mb-8">
          <label class="block text-sm font-medium text-gray-700 mb-1">Notes</label>
          <textarea
            v-model="form.notes"
            rows="4"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors resize-none"
            placeholder="Add any additional notes"
          ></textarea>
        </div>

        <div class="flex justify-end">
          <button
            type="submit"
            class="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            Save Checklist
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
