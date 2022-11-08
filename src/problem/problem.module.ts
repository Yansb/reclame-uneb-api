import { Module } from '@nestjs/common';
import { Connection } from 'mongoose';
import { ProblemSchema } from './db/entities/mongodb/problem.schema';
import { MongodbProblemRepository } from './db/implementations/mongodb/problem.repository';
import { IProblemRepository } from './db/problem.repository';
import { ProblemController } from './problem.controller';
import { ProblemService } from './problem.service';
import { problemsProviders } from './providers/problem.providers';

@Module({
  controllers: [ProblemController],
  providers: [
    {
      provide: 'PROBLEM_MODEL',
      useFactory: (connection: Connection) =>
        connection.model('Problem', ProblemSchema),
      inject: ['DATABASE_CONNECTION'],
    },
    {
      provide: IProblemRepository,
      useClass: MongodbProblemRepository,
    },
    ProblemService,
  ],
})
export class ProblemModule {}
