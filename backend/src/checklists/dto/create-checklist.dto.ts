import { IsString, IsNotEmpty, IsDateString, IsIn, Matches, IsOptional } from 'class-validator';

export class CreateChecklistDto {
  @IsString()
  @IsNotEmpty({ message: 'Building name cannot be empty' })
  building!: string;

  @IsString()
  @IsNotEmpty({ message: 'Inspector name cannot be empty' })
  inspector!: string;

  @IsDateString()
  @IsNotEmpty({ message: 'Date cannot be empty' })
  @Matches(/^\d{4}-\d{2}-\d{2}$/, { message: 'Date must be in YYYY-MM-DD format' })
  date!: string;

  @IsString()
  @IsNotEmpty({ message: 'Status cannot be empty' })
  @IsIn(['Fail', 'Pass'], { message: 'Status must be either Fail or Pass' })
  status!: 'Fail' | 'Pass';

  @IsString()
  @IsOptional()
  notes?: string;
}
