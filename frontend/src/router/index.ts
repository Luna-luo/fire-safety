import { createRouter, createWebHistory } from 'vue-router'
import ChecklistList from '../views/ChecklistList.vue'
import ChecklistDetail from '../views/ChecklistDetail.vue'
import NewChecklist from '../views/NewChecklist.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: ChecklistList
    },
    {
      path: '/checklist/:id',
      name: 'checklist-detail',
      component: ChecklistDetail
    },
    {
      path: '/checklist/new',
      name: 'new-checklist',
      component: NewChecklist
    }
  ]
})

export default router
