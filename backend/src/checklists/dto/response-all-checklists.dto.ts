export class ResponseAllChecklistsDto {
  id!: number;

  building!: string;

  date!: string;

  status!: 'Fail' | 'Pass';
}
