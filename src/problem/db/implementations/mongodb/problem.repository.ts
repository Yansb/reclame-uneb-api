import { Inject, Injectable } from '@nestjs/common';
import { LeanDocument, Model } from 'mongoose';
import { CreateProblemDto } from 'src/problem/dto/create-problem.dto';
import { ProblemQueryDto } from 'src/problem/dto/problem-query.dto';
import { UpdateProblemDto } from 'src/problem/dto/update-problem.dto';
import { Problem } from '../../entities/mongodb/problem.schema';
import { IProblemRepository } from '../../problem.repository';

@Injectable()
export class MongodbProblemRepository implements IProblemRepository {
  constructor(
    @Inject('PROBLEM_MODEL')
    private readonly problemModel: Model<Problem>,
  ) {}
  findById(id: string): Promise<Problem> {
    return this.problemModel.findById(id).exec();
  }

  create(problem: CreateProblemDto): Promise<Problem> {
    return this.problemModel.create(problem);
  }
  findAll(query: ProblemQueryDto): Promise<LeanDocument<Problem[]>> {
    return this.problemModel
      .find({
        done: query.done ?? { $exists: true },
        title: query.search
          ? { $regex: '.*' + query.search + '.*' }
          : { $exists: true },
      })
      .projection({
        image: false,
      })
      .exec();
  }

  async finishProblem(id: string): Promise<void> {
    await this.problemModel.updateOne({ _id: id }, { done: true }).exec();
  }
  async deleteProblem(id: string): Promise<void> {
    await this.problemModel.deleteOne({ _id: id }).exec();
  }
  async updateProblem(id: string, problem: UpdateProblemDto): Promise<void> {
    await this.problemModel.updateOne({ _id: id }, problem).exec();
  }
}
