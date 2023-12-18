import { IsString, MaxLength } from 'class-validator';

export class UpdateDecreeDto {
  @IsString()
  worker_id: string;

  @IsString()
  start_degreetime_date: string;

  @IsString()
  end_degreetime_date: string;
}
