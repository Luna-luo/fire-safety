import { Module } from '@nestjs/common';
import { ChecklistsModule } from './checklists/checklists.module';
import { CommonModule } from './common/common.module';
import { LoggerModule } from './logger/logger.module';
@Module({
  imports: [CommonModule, ChecklistsModule, LoggerModule],
})
export class AppModule {}
