import { CreateProblemDto } from '../dto/create-problem.dto';
import { ProblemQueryDto } from '../dto/problem-query.dto';
import { UpdateProblemDto } from '../dto/update-problem.dto';
import { Problem } from './entities/mongodb/problem.schema';

export interface IProblemRepository {
  create(problem: CreateProblemDto): Promise<Problem>;
  findAll(query: ProblemQueryDto): Promise<Problem[]>;
  findById(id: string): Promise<Problem>;
  finishProblem(id: string): Promise<void>;
  deleteProblem(id: string): Promise<void>;
  updateProblem(id: string, problem: UpdateProblemDto): Promise<void>;
}

export const IProblemRepository = Symbol('IProblemRepository');
