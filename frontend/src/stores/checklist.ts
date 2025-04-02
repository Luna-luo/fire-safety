import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type { Checklist } from '@/type'

export const useChecklistStore = defineStore('checklist', () => {
  const checklists = ref<Checklist[]>([])

  function setChecklists(newChecklists: Checklist[]) {
    checklists.value = newChecklists
  }

  return { checklists, setChecklists }
})
