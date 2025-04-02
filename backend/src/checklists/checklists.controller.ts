import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { Checklist } from './checklist.interface';
import { ChecklistsService } from './checklists.service';
import { CreateChecklistDto } from './dto/create-checklist.dto';

@Controller('checklists')
export class ChecklistsController {
  constructor(private readonly checklistsService: ChecklistsService) {}
  @Get()
  findAll(): Checklist[] {
    return this.checklistsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Checklist {
    return this.checklistsService.findOne(id);
  }

  @Post()
  create(@Body() createChecklistDto: CreateChecklistDto): Checklist {
    return this.checklistsService.create(createChecklistDto);
  }
}
