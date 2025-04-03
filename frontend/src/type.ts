export interface Checklist {
  id: number
  building: string
  date: string
  status: 'Pass' | 'Fail'
  inspector?: string
  notes?: string
} 