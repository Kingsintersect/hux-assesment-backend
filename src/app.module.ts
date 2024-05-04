import { Module } from '@nestjs/common';
import { DatabaseModule } from './common';

@Module({
  imports: [
    DatabaseModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
