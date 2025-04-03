import { Test, TestingModule } from '@nestjs/testing';
import { ChecklistsService } from '../../src/checklists/checklists.service';
import { LoggerService } from '../../src/common/services/logger.service';
import { CreateChecklistDto } from '../../src/checklists/dto/create-checklist.dto';
describe('ChecklistsService', () => {
  let service: ChecklistsService;
  let loggerService: LoggerService;

  const mockLoggerService = {
    log: jest.fn(),
    error: jest.fn(),
    warn: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ChecklistsService,
        {
          provide: LoggerService,
          useValue: mockLoggerService,
        },
      ],
    }).compile();

    service = module.get<ChecklistsService>(ChecklistsService);
    loggerService = module.get<LoggerService>(LoggerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of checklists', () => {
      const result = service.findAll();
      expect(Array.isArray(result)).toBe(true);
      expect(loggerService.log).toHaveBeenCalledWith('Fetching checklists');
    });
  });

  describe('findOne', () => {
    it('should return a checklist when it exists', () => {
      // First create a checklist
      const createDto: CreateChecklistDto = {
        building: 'Test Building',
        inspector: 'Test Inspector',
        date: '2024-03-20',
        status: 'Pass',
        notes: 'Test notes',
      };
      const created = service.create(createDto);

      // Then find it
      const result = service.findOne(created.id.toString());
      expect(result).toBeDefined();
      expect(result.id).toBe(created.id);
      expect(loggerService.log).toHaveBeenCalledWith(`Fetching checklist with id ${created.id}`);
    });

    it('should throw BusinessException when checklist does not exist', () => {
      const id = '999';
      expect(() => service.findOne(id)).toThrow('Checklist with id 999 not found');
      expect(loggerService.error).toHaveBeenCalledWith(`Checklist with id ${id} not found`);
    });
  });

  describe('create', () => {
    it('should create and return a new checklist', () => {
      const createDto: CreateChecklistDto = {
        building: 'New Building',
        inspector: 'Inspector 1',
        date: '2024-03-20',
        status: 'Pass',
        notes: 'Test notes',
      };

      const result = service.create(createDto);

      expect(result).toBeDefined();
      expect(result.id).toBeDefined();
      expect(result.building).toBe(createDto.building);
      expect(result.inspector).toBe(createDto.inspector);
      expect(result.status).toBe(createDto.status);
      expect(result.notes).toBe(createDto.notes);
      expect(loggerService.log).toHaveBeenCalledWith('Creating new checklist', { data: createDto });
      expect(loggerService.log).toHaveBeenCalledWith('Checklist created successfully', {
        data: result,
      });
    });
  });
});
