import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateDepartmentDto } from './dto/create-service_department.dto';
import { UpdateDepartmenCategory } from './dto/update-service_department.dto';
import { ServicesDepartmentsEntity } from 'src/entities/service_departments.entity';
import { DepartmentsEntity } from 'src/entities/departments.entity';
import { Between } from 'typeorm';

@Injectable()
export class DepartmenService {
  async getfilter(id :string , sortName:string , gender:string , job_titles:string , employee_category_value :string, tariff_discharge: number| string , start_experience :number | string, end_experience : number | string) {
    const Departments_workers = await DepartmentsEntity.find({
      where: {
        service_departments: {
          id: id,
        },
        workers :{
          gender : gender == 'all' ? null : gender ,
          job_titles: job_titles == 'all' ? null : job_titles,
          employee_category: employee_category_value == 'all' ? null : employee_category_value ,
          tariff_discharge : tariff_discharge == 'all' ? null : +tariff_discharge,
          experience : Between(start_experience == 'all' ? 0 : +start_experience , end_experience == 'all' ? 100 : +end_experience )
          
        }
      },
      relations: {
        service_departments: true,
        workers: true,
      },

      order : {
        workers : {
          name: sortName == 'a-z' ? 'ASC' : 'DESC',
        }
      }
    }).catch((e) => {
      throw new HttpException('Bad request', HttpStatus.BAD_REQUEST);
    });
    
    return Departments_workers
  }
  async getall(id) {
    const Departments = await DepartmentsEntity.find({
      where: {
        service_departments: {
          id: id,
        },
        workers : {
          IsActive :true
        }
      },
      order : {
        workers : {
          tariff_discharge : 'desc'
        }
      },
      relations: {
        service_departments: true,
        workers: true,
      },
    }).catch((e) => {
      throw new HttpException('Bad request', HttpStatus.BAD_REQUEST);
    });
    return Departments;
  }

  async create(body: CreateDepartmentDto) {
    const findServiceDepartment: ServicesDepartmentsEntity =
      await ServicesDepartmentsEntity.findOneBy({
        id: body.service_department_id,
      });

    if (!findServiceDepartment) {
      throw new HttpException(
        'Not found Service Department ',
        HttpStatus.FOUND,
      );
    }

    const findDepartment: DepartmentsEntity = await DepartmentsEntity.findOneBy(
      {
        title: body.title,
      },
    );

    if (findDepartment) {
      throw new HttpException('Alreade create Department', HttpStatus.FOUND);
    }

    await DepartmentsEntity.createQueryBuilder()
      .insert()
      .into(DepartmentsEntity)
      .values({
        title: body.title,
        service_departments: findServiceDepartment,
      })
      .execute()
      .catch(() => {
        throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
      });
  }

  async update(id: string, body: UpdateDepartmenCategory) {
    const findDepartment: DepartmentsEntity = await DepartmentsEntity.findOneBy(
      {
        id,
      },
    );

    if (!findDepartment) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }
    await DepartmentsEntity.createQueryBuilder()
      .update(DepartmentsEntity)
      .set({
        title: body.title || findDepartment.title,
        service_departments:
          body.service_department_id ||
          (findDepartment.service_departments.id as any),
      })
      .where({ id })
      .execute()
      .catch(() => {
        throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
      });
  }

  async remove(id: string) {
    const findDepartment: DepartmentsEntity = await DepartmentsEntity.findOneBy(
      {
        id: id,
      },
    );
    console.log(findDepartment);

    if (!findDepartment) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }

    await DepartmentsEntity.createQueryBuilder()
      .delete()
      .from(DepartmentsEntity)
      .where({ id })
      .execute();
  }
}
