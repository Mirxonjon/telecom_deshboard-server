import { IsString, IsNotEmpty, MaxLength } from 'class-validator';

export class CreateServiceDepartmentDto {
  @IsString()
  @IsNotEmpty()
  title: string;
}
