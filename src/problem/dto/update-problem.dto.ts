import { PartialType } from '@nestjs/mapped-types';
import { CreateProblemDto } from './create-problem.dto';
import { IsString, IsNotEmpty } from 'class-validator';

export class UpdateProblemDto extends PartialType(CreateProblemDto) {
  @IsString()
  @IsNotEmpty()
  deviceId: string;
}
