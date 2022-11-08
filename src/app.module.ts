import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './db/database.module';
import { ProblemModule } from './problem/problem.module';

@Global()
@Module({
  imports: [
    DatabaseModule,
    ProblemModule,
    ConfigModule.forRoot({ isGlobal: true }),
  ],
  controllers: [AppController],
  providers: [AppService],
  exports: [DatabaseModule],
})
export class AppModule {}
