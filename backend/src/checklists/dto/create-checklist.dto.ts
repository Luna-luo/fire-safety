export class CreateChecklistDto {
  building: string;
  date: string;
  status: 'Pass' | 'Fail';
  inspector?: string;
  notes?: string;
}
