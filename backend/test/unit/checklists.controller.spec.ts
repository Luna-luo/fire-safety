import { Test, TestingModule } from '@nestjs/testing';
import { ChecklistsController } from '../../src/checklists/checklists.controller';
import { ChecklistsService } from '../../src/checklists/checklists.service';
import { LoggerService } from '../../src/common/services/logger.service';
import { CreateChecklistDto } from '../../src/checklists/dto/create-checklist.dto';
import { ResponseAllChecklistsDto } from '../../src/checklists/dto/response-all-checklists.dto';
import { ResponseDetailChecklistsDto } from '../../src/checklists/dto/response-detail-checklists.dto';

describe('ChecklistsController', () => {
  let controller: ChecklistsController;
  let service: ChecklistsService;
  let loggerService: LoggerService;

  const mockChecklistsService = {
    findAll: jest.fn(),
    findOne: jest.fn(),
    create: jest.fn(),
  };

  const mockLoggerService = {
    log: jest.fn(),
    error: jest.fn(),
    warn: jest.fn(),
    setContext: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ChecklistsController],
      providers: [
        {
          provide: ChecklistsService,
          useValue: mockChecklistsService,
        },
        {
          provide: LoggerService,
          useValue: mockLoggerService,
        },
      ],
    }).compile();

    controller = module.get<ChecklistsController>(ChecklistsController);
    service = module.get<ChecklistsService>(ChecklistsService);
    loggerService = module.get<LoggerService>(LoggerService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of checklists', () => {
      const checklists: ResponseAllChecklistsDto[] = [
        { id: 1, building: 'Building 1', date: '2024-03-20', status: 'Pass' },
        { id: 2, building: 'Building 2', date: '2024-03-20', status: 'Fail' },
      ];
      mockChecklistsService.findAll.mockReturnValue(checklists);

      const result = controller.findAll();

      expect(result).toBe(checklists);
      expect(service.findAll).toHaveBeenCalled();
      expect(loggerService.log).toHaveBeenCalledWith('Fetching all checklists');
    });
  });

  describe('findOne', () => {
    it('should return a single checklist by id', () => {
      const id = '1';
      const checklist: ResponseDetailChecklistsDto = {
        id: 1,
        building: 'Test Building',
        inspector: 'Test Inspector',
        date: '2024-03-20',
        status: 'Pass',
        notes: 'Test notes',
      };
      mockChecklistsService.findOne.mockReturnValue(checklist);

      const result = controller.findOne(id);

      expect(result).toBe(checklist);
      expect(service.findOne).toHaveBeenCalledWith(id);
      expect(loggerService.log).toHaveBeenCalledWith(`Fetching checklist with id ${id}`);
    });
  });

  describe('create', () => {
    it('should create a new checklist', () => {
      const createDto: CreateChecklistDto = {
        building: 'New Building',
        inspector: 'Inspector 1',
        date: '2024-03-20',
        status: 'Pass',
        notes: 'Test notes',
      };
      const newChecklist: ResponseDetailChecklistsDto = {
        id: 1,
        ...createDto,
        notes: createDto.notes || '',
      };
      mockChecklistsService.create.mockReturnValue(newChecklist);

      const result = controller.create(createDto);

      expect(result).toBe(newChecklist);
      expect(service.create).toHaveBeenCalledWith(createDto);
      expect(loggerService.log).toHaveBeenCalledWith('Creating new checklist', { data: createDto });
    });
  });
});
