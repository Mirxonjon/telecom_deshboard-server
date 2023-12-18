import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ServicesDepartmentsEntity } from 'src/entities/service_departments.entity';
import { DepartmentsEntity } from 'src/entities/departments.entity';
import { CreateWorkerDto } from './dto/create-worker.dto';
import { UpdateWorkerDto } from './dto/update-worker.dto';
import axios from 'axios';
import { fileUpload } from 'src/utils/file_upload';
import { extname } from 'path';
import { allowedImageFormats } from 'src/utils/formatsfile';
import { WorkersEntity } from 'src/entities/workers.entity';
import { Cron, CronExpression } from '@nestjs/schedule';
import { convertDate, convertorDateToDay } from 'src/utils/converters';

@Injectable()
export class WorkerService {
  async getfilter() {
    return 'ok';
  }
  async getall(id) {
    const Departments = await WorkersEntity.find({}).catch((e) => {
      throw new HttpException('Bad request', HttpStatus.BAD_REQUEST);
    });
    return Departments;
  }

  async getaOne (id :string) {
    const worker = await WorkersEntity.find({
      where : {
        id : id
      },
      relations : {
        Degree_times :true
      }
    }).catch((e) => {
      throw new HttpException('Bad request', HttpStatus.BAD_REQUEST);
    });
    return worker
  }

  async create(
    body: CreateWorkerDto,
    user_img: Express.Multer.File,
    reference_img: Express.Multer.File,
    military_ID_img: Express.Multer.File,
  ) {
    let departmen_id = null;
    if (body.department_id) {
      departmen_id = await DepartmentsEntity.findOneBy({
        id: body.department_id,
      });

      if (!departmen_id) {
        throw new HttpException(
          'Not found Service Department ',
          HttpStatus.NOT_FOUND,
        );
      }
    }

    let formatUserImage: string = 'Not image';
    let formatreference_img: string = 'Not reference img';
    let formatmilitary_img: string = 'Not military img';

    if (user_img) {
      formatUserImage = extname(user_img.originalname).toLowerCase();
    }
    if (reference_img) {
      formatreference_img = extname(reference_img.originalname).toLowerCase();
    }
    if (military_ID_img) {
      formatmilitary_img = extname(reference_img.originalname).toLowerCase();
    }

    if (
      allowedImageFormats.includes(formatUserImage) ||
      formatUserImage === 'Not image'
    ) {
      if (
        allowedImageFormats.includes(formatreference_img) ||
        formatreference_img === 'Not reference img'
      ) {
        if (
          allowedImageFormats.includes(formatmilitary_img) ||
          formatmilitary_img === 'Not military img'
        ) {
          let user_img_link = null;
          let reference_img_link = null;
          let military_img_link = null;

          if (formatUserImage !== 'Not image') {
            // await deleteFileCloud(book_img);
            user_img_link = await fileUpload(user_img);
          }
          if (formatreference_img !== 'Not reference img') {
            // await deleteFileCloud(book_img);
            reference_img_link = await fileUpload(reference_img);
          }
          if (formatmilitary_img !== 'Not military img') {
            // await deleteFileCloud(book_img);
            military_img_link = await fileUpload(military_ID_img);
          }

          await WorkersEntity.createQueryBuilder()
            .insert()
            .into(WorkersEntity)
            .values({
              department: departmen_id,
              name: body.name.toLowerCase(),
              login : body.login,
              employee_category: body.employee_category,
              tariff_discharge: +body.tariff_discharge,
              job_titles: body.job_titles,
              information: body.information,
              gender: body.gender,
              date_of_birth: body.date_of_birth,
              Pasport_id: body.Pasport_id,
              pinfl: body.pinfl,
              phone_number: body.phone_number,
              date_of_acceptance: body.date_of_acceptance,
              date_of_last_change_position: body.date_of_last_change_position,
              about_family: body.about_family,
              address: body.address,
              name_of_graduate_institution: body.name_of_graduate_institution,
              user_img: user_img_link,
              reference_img: reference_img_link,
              military_ID_img: military_img_link,
            })
            .execute()
            .catch((e) => {
              console.log(e);
              throw new HttpException('Bad Request ', HttpStatus.BAD_REQUEST);
            });
        } else {
          throw new HttpException(
            'Image military should be in the format jpg, png, jpeg, pnmj, svg',
            HttpStatus.BAD_REQUEST,
          );
        }
      } else {
        throw new HttpException(
          'Image reference should be in the format jpg, png, jpeg, pnmj, svg',
          HttpStatus.BAD_REQUEST,
        );
      }
    } else {
      throw new HttpException(
        'Image user should be in the format jpg, png, jpeg, pnmj, svg',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async update(
    id: string,
    body: UpdateWorkerDto,
    user_img: Express.Multer.File,
    reference_img: Express.Multer.File,
    military_ID_img: Express.Multer.File,
  ) {
    const findWorker = await WorkersEntity.findOneBy({ id });

    if (!findWorker) {
      throw new HttpException(
        'Not found Service Department ',
        HttpStatus.NOT_FOUND,
      );
    }

    let departmen_id = null;
    if (body.department_id) {
      departmen_id = await DepartmentsEntity.findOneBy({
        id: body.department_id,
      });

      if (!departmen_id) {
        throw new HttpException(
          'Not found Service Department',
          HttpStatus.NOT_FOUND,
        );
      }
    }

    let formatUserImage: string = 'Not image';
    let formatreference_img: string = 'Not reference img';
    let formatmilitary_img: string = 'Not military img';

    if (user_img) {
      formatUserImage = extname(user_img.originalname).toLowerCase();
    }
    if (reference_img) {
      formatreference_img = extname(reference_img.originalname).toLowerCase();
    }
    if (military_ID_img) {
      formatmilitary_img = extname(reference_img.originalname).toLowerCase();
    }

    if (
      allowedImageFormats.includes(formatUserImage) ||
      formatUserImage === 'Not image'
    ) {
      if (
        allowedImageFormats.includes(formatreference_img) ||
        formatreference_img === 'Not reference img'
      ) {
        if (
          allowedImageFormats.includes(formatmilitary_img) ||
          formatmilitary_img === 'Not military img'
        ) {
          let user_img_link = findWorker.user_img;
          let reference_img_link = findWorker.reference_img;
          let military_img_link = findWorker.military_ID_img;

          if (formatUserImage !== 'Not image') {
            // await deleteFileCloud(book_img);
            user_img_link = await fileUpload(user_img);
          }
          if (formatreference_img !== 'Not reference img') {
            // await deleteFileCloud(book_img);
            reference_img_link = await fileUpload(reference_img);
          }
          if (formatmilitary_img !== 'Not military img') {
            // await deleteFileCloud(book_img);
            military_img_link = await fileUpload(military_ID_img);
          }

          await WorkersEntity.createQueryBuilder()
            .update()
            .set({
              department: departmen_id || findWorker.department,
              name: body.name.toLowerCase() || findWorker.name,
              login : body.login || findWorker.login,
              employee_category:
                body.employee_category || findWorker.employee_category,
              tariff_discharge:
                +body.tariff_discharge || findWorker.tariff_discharge,
              job_titles: body.job_titles || findWorker.job_titles,
              information: body.information || findWorker.information,
              gender: body.gender || findWorker.gender,
              date_of_birth: body.date_of_birth || findWorker.date_of_birth,
              Pasport_id: body.Pasport_id || findWorker.Pasport_id,
              pinfl: body.pinfl || findWorker.pinfl,
              phone_number: body.phone_number || findWorker.phone_number,
              date_of_acceptance:
                body.date_of_acceptance || findWorker.date_of_acceptance,
              date_of_last_change_position:
                body.date_of_last_change_position ||
                findWorker.date_of_last_change_position,
              about_family: body.about_family || findWorker.about_family,
              address: body.address || findWorker.address,
              name_of_graduate_institution:
                body.name_of_graduate_institution ||
                findWorker.name_of_graduate_institution,
              user_img: user_img_link,
              reference_img: reference_img_link,
              military_ID_img: military_img_link,
            })
            .where({ id })
            .execute()
            .catch((e) => {
              throw new HttpException('Bad Request ', HttpStatus.BAD_REQUEST);
            });
        } else {
          throw new HttpException(
            'Image military should be in the format jpg, png, jpeg, pnmj, svg',
            HttpStatus.BAD_REQUEST,
          );
        }
      } else {
        throw new HttpException(
          'Image reference should be in the format jpg, png, jpeg, pnmj, svg',
          HttpStatus.BAD_REQUEST,
        );
      }
    } else {
      throw new HttpException(
        'Image user should be in the format jpg, png, jpeg, pnmj, svg',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async remove(id: string) {
    const findWorker: WorkersEntity = await WorkersEntity.findOneBy({
      id,
    });

    if (!findWorker) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }

    await WorkersEntity.createQueryBuilder()
      .update()
      .set({
        IsActive: false,
      })
      .where({ id })
      .execute()
      .catch((e) => {
        throw new HttpException('Bad Request ', HttpStatus.BAD_REQUEST);
      });
  }

  @Cron(CronExpression.EVERY_SECOND)
  async calcExperence() {
    const findWorkers = await WorkersEntity.find({
      where: {
        IsActive: true,
      },
    });
    const present_day = convertorDateToDay(convertDate(new Date()));

    findWorkers.forEach(async (e) => {
      const date_of_acceptanceToday = convertorDateToDay(e?.date_of_acceptance);
      const experiense = (present_day - date_of_acceptanceToday) / 365.4;

      await WorkersEntity.createQueryBuilder()
        .update()
        .set({
          experience: Math.round(experiense * 100) / 100,
        })
        .where({ id: e?.id })
        .execute()
        .catch((e) => {
          throw new HttpException('Bad Request ', HttpStatus.BAD_REQUEST);
        });
    });
  }
}
