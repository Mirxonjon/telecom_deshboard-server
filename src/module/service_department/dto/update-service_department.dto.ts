import { IsString, MaxLength } from 'class-validator';

export class UpdateServiceDepartmenCategory {
  @IsString()
  title: string;
}
