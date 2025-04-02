import { Injectable } from '@nestjs/common';
import { Checklist } from './checklist.interface';
import * as fs from 'fs';
import * as path from 'path';
import { CreateChecklistDto } from './dto/create-checklist.dto';

const readData = (filePath: string): any => {
  const data = fs.readFileSync(filePath, 'utf-8');
  const jsonData = JSON.parse(data);
  return jsonData;
};

// const writeData = (filePath: string, data: any): Promise<any> => {
//   const jsonData = JSON.stringify(data);
//   return fs.promises.writeFile(path.resolve(__dirname, filePath), jsonData);
// };

const checklistsMockPath = path.join(
  process.cwd(),
  'src/mocks',
  'mock-checklists.json',
);

console.log('checklistsMockPath', checklistsMockPath);

@Injectable()
export class ChecklistsService {
  private checklists: Checklist[] = [];

  findAll(): Checklist[] {
    try {
      const data = readData(checklistsMockPath);
      this.checklists = data;
      return this.checklists;
    } catch (error) {
      console.error(error);
      return [];
    }
  }

  findOne(id: string): Checklist {
    const checklist = this.checklists.find((c) => c.id === parseInt(id));
    if (!checklist) {
      throw new Error('Checklist not found');
    }
    return checklist;
  }

  create(createChecklistDto: CreateChecklistDto): Checklist {
    const newChecklist = {
      ...createChecklistDto,
      id: this.checklists.length + 1,
    };
    this.checklists.push(newChecklist);
    return newChecklist;
  }
}
