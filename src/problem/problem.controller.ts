import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
  Query,
} from '@nestjs/common';
import { ProblemService } from './problem.service';
import { CreateProblemDto } from './dto/create-problem.dto';
import { UpdateProblemDto } from './dto/update-problem.dto';
import { ApiTags } from '@nestjs/swagger';
import { ProblemQueryDto } from './dto/problem-query.dto';

@Controller('problem')
@ApiTags('Problem')
export class ProblemController {
  constructor(private readonly problemService: ProblemService) {}

  @Post()
  create(@Body() createProblemDto: CreateProblemDto) {
    return this.problemService.create(createProblemDto);
  }

  @Get()
  findAll(@Query() query: ProblemQueryDto) {
    return this.problemService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.problemService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProblemDto: UpdateProblemDto) {
    return this.problemService.update(id, updateProblemDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.problemService.remove(id);
  }

  @Put(':id/finish')
  finishProblem(@Param('id') id: string, @Query('deviceId') deviceId: string) {
    return this.problemService.finishProblem(id, deviceId);
  }
}
