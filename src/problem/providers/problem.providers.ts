import { Connection } from 'mongoose';
import { ProblemSchema } from '../db/entities/mongodb/problem.schema';
import { MongodbProblemRepository } from '../db/implementations/mongodb/problem.repository';
import { IProblemRepository } from '../db/problem.repository';
import { ProblemService } from '../problem.service';

export const problemsProviders = [
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
];
