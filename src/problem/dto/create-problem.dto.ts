import {
  IsString,
  IsBase64,
  IsLatitude,
  IsLongitude,
  IsNotEmpty,
  IsBoolean,
  IsOptional,
} from 'class-validator';

export class CreateProblemDto {
  @IsString()
  @IsNotEmpty()
  title: string;
  @IsBase64()
  image: string;
  @IsString()
  @IsNotEmpty()
  message: string;
  @IsLatitude()
  latitude: number;
  @IsLongitude()
  longitude: number;
  @IsOptional()
  @IsBoolean()
  done?: boolean = false;

  @IsString()
  @IsNotEmpty()
  deviceId: string;
}
