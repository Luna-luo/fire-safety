<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

type Status = 'Pass' | 'Fail'

interface ChecklistItem {
  category: string
  item: string
  status: Status
  notes: string
}

const router = useRouter()
const form = ref({
  buildingName: '',
  inspector: '',
  date: new Date().toISOString().split('T')[0],
  items: [
    {
      category: 'Emergency Exits',
      item: 'Clear and accessible',
      status: 'Pass' as Status,
      notes: '',
    },
    {
      category: 'Fire Extinguishers',
      item: 'Properly mounted and maintained',
      status: 'Pass' as Status,
      notes: '',
    },
    {
      category: 'Smoke Detectors',
      item: 'Functioning and tested',
      status: 'Pass' as Status,
      notes: '',
    },
  ],
})

const addItem = () => {
  form.value.items.push({
    category: '',
    item: '',
    status: 'Pass',
    notes: '',
  })
}

const removeItem = (index: number) => {
  form.value.items.splice(index, 1)
}

const calculateOverallStatus = (): Status => {
  const hasFail = form.value.items.some((item) => item.status === 'Fail')
  return hasFail ? 'Fail' : 'Pass'
}

const submitForm = async () => {
  try {
    const checklist = {
      ...form.value,
      id: Date.now(), // 临时ID
      status: calculateOverallStatus(),
    }

    // 由于是前端状态，我们只需要存储到 localStorage
    const existingChecklists = JSON.parse(localStorage.getItem('checklists') || '[]')
    existingChecklists.push(checklist)
    localStorage.setItem('checklists', JSON.stringify(existingChecklists))

    router.push('/')
  } catch (error) {
    console.error('Error saving checklist:', error)
  }
}
</script>

<template>
  <div class="container mx-auto px-8 py-8 max-w-4xl">
    <div class="flex justify-between items-center mb-8">
      <h1 class="text-3xl font-bold text-gray-800">New Checklist</h1>
      <button @click="router.push('/')" class="btn btn-secondary">Back to List</button>
    </div>

    <form @submit.prevent="submitForm" class="card">
      <div class="grid grid-cols-3 gap-6 mb-8">
        <div>
          <label class="label">Building Name</label>
          <input
            v-model="form.buildingName"
            type="text"
            required
            class="input"
            placeholder="Enter building name"
          />
        </div>
        <div>
          <label class="label">Inspector</label>
          <input
            v-model="form.inspector"
            type="text"
            required
            class="input"
            placeholder="Enter inspector name"
          />
        </div>
        <div>
          <label class="label">Date</label>
          <input v-model="form.date" type="date" required class="input" />
        </div>
      </div>

      <div class="space-y-6">
        <div v-for="(item, index) in form.items" :key="index" class="border-b border-gray-100 pb-6">
          <div class="flex gap-6">
            <div class="flex-1 space-y-4">
              <div>
                <label class="label">Category</label>
                <input
                  v-model="item.category"
                  type="text"
                  required
                  class="input"
                  placeholder="Enter category"
                />
              </div>
              <div>
                <label class="label">Item</label>
                <input
                  v-model="item.item"
                  type="text"
                  required
                  class="input"
                  placeholder="Enter item description"
                />
              </div>
              <div>
                <label class="label">Notes</label>
                <textarea
                  v-model="item.notes"
                  rows="2"
                  class="input"
                  placeholder="Add any additional notes"
                ></textarea>
              </div>
            </div>
            <div class="w-48 space-y-4">
              <div>
                <label class="label">Status</label>
                <select v-model="item.status" class="input">
                  <option value="Pass">Pass</option>
                  <option value="Fail">Fail</option>
                </select>
              </div>
              <button
                type="button"
                @click="removeItem(index)"
                class="text-red-500 hover:text-red-600 font-medium"
              >
                Remove Item
              </button>
            </div>
          </div>
        </div>

        <button
          type="button"
          @click="addItem"
          class="text-indigo-500 hover:text-indigo-600 font-medium flex items-center gap-2"
        >
          <span>+</span> Add New Item
        </button>
      </div>

      <div class="mt-8 flex justify-end">
        <button type="submit" class="btn btn-primary px-8 py-3">Save Checklist</button>
      </div>
    </form>
  </div>
</template>
