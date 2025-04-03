import { HttpStatus, Injectable } from '@nestjs/common';
import { Checklist } from './checklist.interface';
import * as fs from 'fs';
import * as path from 'path';
import { LoggerService } from '../common/services/logger.service';
import { BusinessException } from '../common/exceptions/business.exception';
import { CreateChecklistDto } from './dto/create-checklist.dto';
import { ResponseDetailChecklistsDto } from './dto/response-detail-checklists.dto';
import { ResponseAllChecklistsDto } from './dto/response-all-checklists.dto';

// read the mock data from the file
const readData = (filePath: string): Checklist[] => {
  const data = fs.readFileSync(filePath, 'utf-8');
  const jsonData = JSON.parse(data);
  return jsonData;
};

// read the mock data from the file
const checklistsMockPath = path.join(process.cwd(), 'src/mocks', 'mock-checklists.json');
const checklists = readData(checklistsMockPath);

@Injectable()
export class ChecklistsService {
  constructor(private readonly logger: LoggerService) {}

  // find all checklists
  findAll(): ResponseAllChecklistsDto[] {
    this.logger.log('Fetching checklists');
    try {
      const newChecklists = checklists.map((item: Checklist) => ({
        id: item.id,
        building: item.building,
        date: item.date,
        status: item.status,
      }));
      return newChecklists;
    } catch (error) {
      this.logger.error('Error fetching checklists', error);
      throw new BusinessException(
        'Error fetching checklists',
        HttpStatus.BAD_REQUEST,
        'BAD_REQUEST',
      );
    }
  }

  // get one checklist by id
  findOne(id: string): ResponseDetailChecklistsDto {
    this.logger.log(`Fetching checklist with id ${id}`);
    const checklist = checklists.find((c) => c.id === parseInt(id));
    if (!checklist) {
      this.logger.error(`Checklist with id ${id} not found`);
      throw new BusinessException(
        `Checklist with id ${id} not found`,
        HttpStatus.NOT_FOUND,
        'CHECKLIST_NOT_FOUND',
      );
    }
    const response: ResponseDetailChecklistsDto = {
      id: checklist.id,
      building: checklist.building,
      inspector: checklist.inspector,
      date: checklist.date,
      status: checklist.status,
      notes: checklist.notes,
    };
    return response;
  }

  // create a new checklist
  create(createChecklistDto: CreateChecklistDto): ResponseDetailChecklistsDto {
    this.logger.log('Creating new checklist', { data: createChecklistDto });

    try {
      // generate a new checklist id
      const newId = checklists.length + 1;

      // create the new checklist
      const newChecklist: Checklist = {
        id: newId,
        ...createChecklistDto,
      };

      // add the new checklist to the list
      checklists.push(newChecklist);

      this.logger.log('Checklist created successfully', { data: newChecklist });

      const response: ResponseDetailChecklistsDto = {
        id: newChecklist.id,
        building: newChecklist.building,
        inspector: newChecklist.inspector,
        date: newChecklist.date,
        status: newChecklist.status,
        notes: newChecklist.notes || '',
      };
      return response;
    } catch (error) {
      this.logger.error('Error creating checklist', error);
      throw new BusinessException(
        'Error creating checklist',
        HttpStatus.INTERNAL_SERVER_ERROR,
        'INTERNAL_SERVER_ERROR',
      );
    }
  }
}
