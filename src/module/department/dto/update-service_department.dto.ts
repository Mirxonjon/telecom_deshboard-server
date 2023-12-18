import { IsString, MaxLength } from 'class-validator';

export class UpdateDepartmenCategory {
  @IsString()
  service_department_id: string;

  @IsString()
  title: string;
}
