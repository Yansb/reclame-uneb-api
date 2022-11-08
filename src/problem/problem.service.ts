import {
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateProblemDto } from './dto/create-problem.dto';
import { UpdateProblemDto } from './dto/update-problem.dto';
import { Problem } from './db/entities/mongodb/problem.schema';
import { IProblemRepository } from './db/problem.repository';
import { ProblemQueryDto } from './dto/problem-query.dto';

@Injectable()
export class ProblemService {
  constructor(
    @Inject(IProblemRepository)
    private readonly problemRepo: IProblemRepository,
  ) {}

  async create(createProblemDto: CreateProblemDto) {
    return this.problemRepo.create(createProblemDto);
  }

  findAll(query: ProblemQueryDto) {
    return this.problemRepo.findAll(query);
  }

  findOne(id: string) {
    return this.problemRepo.findById(id);
  }

  async update(id: string, updateProblemDto: UpdateProblemDto) {
    await this.findOneById(id, updateProblemDto.deviceId);
    return this.problemRepo.updateProblem(id, updateProblemDto);
  }

  remove(id: string) {
    return this.problemRepo.deleteProblem(id.toString());
  }

  async finishProblem(id: string, deviceId: string) {
    await this.findOneById(id, deviceId);
    return this.problemRepo.finishProblem(id);
  }

  private async findOneById(id: string, deviceId: string): Promise<Problem> {
    const problem = await this.problemRepo.findById(id);

    if (!problem) {
      throw new NotFoundException('Problema não encontrado');
    }

    if (problem.deviceId !== deviceId) {
      throw new UnauthorizedException('Você não é o dono desse problema');
    }

    return problem;
  }
}
