import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ChecklistsModule } from './checklists/checklists.module';

@Module({
  imports: [ChecklistsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
