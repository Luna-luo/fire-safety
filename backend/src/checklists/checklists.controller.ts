import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { Checklist } from '../interfaces/checklist.interface';
import { checklists } from '../data/checklists';

@Controller('checklists')
export class ChecklistsController {
  @Get()
  findAll(): Checklist[] {
    return checklists;
  }

  @Get(':id')
  findOne(@Param('id') id: string): Checklist {
    const checklist = checklists.find((c) => c.id === parseInt(id));
    if (!checklist) {
      throw new Error('Checklist not found');
    }
    return checklist;
  }

  @Post()
  create(@Body() checklist: Omit<Checklist, 'id'>): Checklist {
    const newChecklist = {
      ...checklist,
      id: Math.max(...checklists.map((c) => c.id)) + 1,
    };
    checklists.push(newChecklist);
    return newChecklist;
  }
}
