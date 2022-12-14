import { Module } from '@nestjs/common';
import { databaseProviders } from './mongodb/database.provider';

@Module({
  providers: [...databaseProviders],
  exports: [...databaseProviders],
})
export class DatabaseModule {}
