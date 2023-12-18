import { IsString, IsNotEmpty, MaxLength, IsNumber } from 'class-validator';

export class CreateWorkerDto {
  @IsString()
  department_id: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  login: string;

  @IsString()
  employee_category: string;

  @IsString()
  tariff_discharge: string;

  @IsString()
  @IsNotEmpty()
  job_titles: string;

  @IsString()
  @IsNotEmpty()
  information: string;

  @IsString()
  @IsNotEmpty()
  date_of_birth: string;

  @IsString()
  Pasport_id: string;

  @IsString()
  pinfl: string;

  @IsString()
  @IsNotEmpty()
  phone_number: string;

  @IsString()
  date_of_acceptance: string;

  @IsString()
  gender: string;

  @IsString()
  @IsNotEmpty()
  date_of_last_change_position: string;

  @IsString()
  about_family: string;

  @IsString()
  @IsNotEmpty()
  address: string;

  @IsString()
  name_of_graduate_institution: string;
}
