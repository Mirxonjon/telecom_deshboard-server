import { IsString, IsNotEmpty, MaxLength } from 'class-validator';

export class CreateDepartmentDto {
  @IsString()
  @IsNotEmpty()
  service_department_id: string;

  @IsString()
  @IsNotEmpty()
  title: string;
}
