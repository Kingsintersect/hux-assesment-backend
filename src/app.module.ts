import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { AuthModule } from './auth/auth.module';
import { DatabaseModule, DuplicateKeyFilter } from './common';

@Module({
  imports: [
    DatabaseModule,
    AuthModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_FILTER,
      useClass: DuplicateKeyFilter,
    },
  ],
})
export class AppModule { }
