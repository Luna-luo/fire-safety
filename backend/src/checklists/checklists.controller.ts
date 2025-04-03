import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ChecklistsService } from './checklists.service';
import { CreateChecklistDto } from './dto/create-checklist.dto';
import { LoggerService } from '../common/services/logger.service';
import { ResponseAllChecklistsDto } from './dto/response-all-checklists.dto';
import { ResponseDetailChecklistsDto } from './dto/response-detail-checklists.dto';
@Controller('checklists')
export class ChecklistsController {
  constructor(
    private readonly checklistsService: ChecklistsService,
    private readonly logger: LoggerService,
  ) {
    this.logger.setContext('ChecklistsController');
  }

  @Get()
  findAll(): ResponseAllChecklistsDto[] {
    this.logger.log('Fetching all checklists');
    return this.checklistsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): ResponseDetailChecklistsDto {
    this.logger.log(`Fetching checklist with id ${id}`);
    return this.checklistsService.findOne(id);
  }

  @Post()
  create(@Body() createChecklistDto: CreateChecklistDto): ResponseDetailChecklistsDto {
    this.logger.log('Creating new checklist', { data: createChecklistDto });
    return this.checklistsService.create(createChecklistDto);
  }
}
