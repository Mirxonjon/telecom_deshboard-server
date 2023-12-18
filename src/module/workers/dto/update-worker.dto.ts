import { IsNumber, IsString, MaxLength } from 'class-validator';

export class UpdateWorkerDto {
  @IsString()
  department_id: string;

  @IsString()
  name: string;

  @IsString()
  login: string;
  
  @IsString()
  employee_category: string;

  @IsString()
  tariff_discharge: string;

  @IsString()
  job_titles: string;

  @IsString()
  information: string;

  @IsString()
  date_of_birth: string;

  @IsString()
  Pasport_id: string;

  @IsString()
  pinfl: string;

  @IsString()
  phone_number: string;

  @IsString()
  date_of_acceptance: string;

  @IsString()
  gender: string;

  @IsString()
  date_of_last_change_position: string;

  @IsString()
  about_family: string;

  @IsString()
  address: string;

  @IsString()
  name_of_graduate_institution: string;
}
