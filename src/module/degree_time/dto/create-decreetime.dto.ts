import { IsString, IsNotEmpty, MaxLength } from 'class-validator';

export class CreateDecreeDto {
  @IsString()
  @IsNotEmpty()
  worker_id: string;

  @IsString()
  start_degreetime_date: string;

  @IsString()
  end_degreetime_date: string;
}
