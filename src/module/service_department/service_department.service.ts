import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateServiceDepartmentDto } from './dto/create-service_department.dto';
import { UpdateServiceDepartmenCategory } from './dto/update-service_department.dto';
import { ServicesDepartmentsEntity } from 'src/entities/service_departments.entity';
import { Between, Like } from 'typeorm';
import { impossibleCharactersInSearch } from 'src/utils/formatsfile';

@Injectable()
export class ServiceDepartmenService {



  async getall() {
    const ServiceDepartmen = await ServicesDepartmentsEntity.find({
      order:{
        create_data : 'ASC'
      }
    }).catch(
      (e) => {
        throw new HttpException('Bad request', HttpStatus.BAD_REQUEST);
      },
    );
    return ServiceDepartmen;
  }
   async getfilterName(id :string , name : string ,operator_number :string) {

    if(impossibleCharactersInSearch.includes(name) || impossibleCharactersInSearch.includes(operator_number)) {
      return []
    }

    if(name == 'null' || operator_number == 'null') {
      return []
    }
    
    const findFilterName: any = await ServicesDepartmentsEntity.find({
      where : {
        id : id , 
        departments : {
          workers :{
            name : name == 'null' ? null : Like(`%${name.toLowerCase()}%`),
           login :  operator_number == 'null' ? null : (Number(operator_number) as any),
           IsActive: true
          }
        }
      },
      order : {
        departments : {
          workers : {
            tariff_discharge :'asc'
          }
        }
      },
      relations : {
        departments : {
          workers :true
        }
      }

    })

    if(!findFilterName.length){
      return []
    }
    
    return findFilterName[0].departments[0]?.workers
  }

  async getfilter(id :string , sortName:string , gender:string , job_titles:string , employee_category_value :string, tariff_discharge: number| string , start_experience :number | string, end_experience : number | string) {
    // console.log(start_experience == 'all' ? 1 : +start_experience , end_experience == 'all' ? 100 : +end_experience);
    
  console.log(employee_category_value == 'all' ? null : employee_category_value);
  
    
    
    const Departments_workers = await ServicesDepartmentsEntity.find({
      where: {
          id: id,
          departments : {
            workers :{
              gender : gender == 'all' ? null : gender ,
              job_titles: job_titles == 'all' ? null : job_titles,
              employee_category: employee_category_value == 'all' ? null : employee_category_value  ,
              tariff_discharge : tariff_discharge == 'all' ? Between(1,16) : +tariff_discharge,
              experience : Between(start_experience == 'all' ? 0 : +start_experience , end_experience == 'all' ? 100 : +end_experience ),
              IsActive : true
              
            }
          }
      },
      relations: {
        departments : {
          workers: true,

        }
      },

      order : {
        departments : {
          workers : {
            name: sortName == 'a-z' ? 'ASC' : 'DESC',
          }
        }
      }
    }).catch((e) => {
      throw new HttpException('Bad request', HttpStatus.BAD_REQUEST);
    });
    
    return Departments_workers
  }

  async getOne(id :string) {
    const ServiceDepartmenOne = await ServicesDepartmentsEntity.find({
      where : {
        id: id
      },
      order:{
        departments :{
          create_data : 'ASC'
        }
      },
      relations : {
        departments :{
          workers :true
        }
      }
    }).catch(
      (e) => {
        throw new HttpException('Bad request', HttpStatus.BAD_REQUEST);
      },
    );
    return ServiceDepartmenOne;
  }

  async getDeleted() {
    const DeletedOperators = await ServicesDepartmentsEntity.find({
      where : {
        departments : {
          workers : {
            IsActive : false
          }
        }
      },
      order:{
        departments :{
          create_data : 'ASC'
        }
      },
      relations : {
        departments :{
          workers :true
        }
      }
    }).catch(
      (e) => {
        console.log(e);
        throw new HttpException('Bad request', HttpStatus.BAD_REQUEST);
      },
    );
    return DeletedOperators;
  }

  async create(body: CreateServiceDepartmentDto) {
    const findServiceDepartment: ServicesDepartmentsEntity =
      await ServicesDepartmentsEntity.findOneBy({
        title: body.title,
      });

    if (findServiceDepartment) {
      throw new HttpException('Alreade create', HttpStatus.FOUND);
    }

    await ServicesDepartmentsEntity.createQueryBuilder()
      .insert()
      .into(ServicesDepartmentsEntity)
      .values({
        title: body.title,
      })
      .execute()
      .catch(() => {
        throw new HttpException('Bad Request ', HttpStatus.BAD_REQUEST);
      });
  }

  async update(id: string, body: UpdateServiceDepartmenCategory) {
    const findServiceDepartment: ServicesDepartmentsEntity =
      await ServicesDepartmentsEntity.findOneBy({
        id: id,
      });

    if (!findServiceDepartment) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }

    await ServicesDepartmentsEntity.createQueryBuilder()
      .update(ServicesDepartmentsEntity)
      .set({
        title: body.title|| findServiceDepartment.title,
      })
      .where({ id })
      .execute()
      .catch(() => {
        throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
      });
  }

  async remove(id: string) {
    const findServiceDepartment: ServicesDepartmentsEntity =
      await ServicesDepartmentsEntity.findOneBy({
        id: id,
      });

    if (!findServiceDepartment) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }
    await ServicesDepartmentsEntity.createQueryBuilder()
      .delete()
      .from(ServicesDepartmentsEntity)
      .where({ id })
      .execute();
  }
}
