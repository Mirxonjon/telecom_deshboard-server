import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateDecreeDto } from './dto/create-decreetime.dto';
import { UpdateDecreeDto } from './dto/update-degreetime.dto';
import { WorkersEntity } from 'src/entities/workers.entity';
import { DecreeTimeEntity } from 'src/entities/decree_time.entity';

@Injectable()
export class DecreeTimeService {
  async getall(id) {
    const Departments = await DecreeTimeEntity.find({}).catch((e) => {
      throw new HttpException('Bad request', HttpStatus.BAD_REQUEST);
    });
    return Departments;
  }

  async create(body: CreateDecreeDto) {
    const findWorker = await WorkersEntity.findOneBy({
      id: body.worker_id,
    });

    if (!findWorker) {
      throw new HttpException('Not found Worker', HttpStatus.FOUND);
    }

    await DecreeTimeEntity.createQueryBuilder()
      .insert()
      .into(DecreeTimeEntity)
      .values({
        worker: findWorker,
        start_degreetime_date: body.start_degreetime_date,
        end_degreetime_date: body.end_degreetime_date,
      })
      .execute()
      .catch(() => {
        throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
      });
  }

  async update(id: string, body: UpdateDecreeDto) {
    const DecreeTime = await DecreeTimeEntity.findOneBy({
      id,
    });
    if (!DecreeTime) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }
    await DecreeTimeEntity.createQueryBuilder()
      .update(DecreeTimeEntity)
      .set({
        worker: body.worker_id || (DecreeTime.worker as any),
        start_degreetime_date:
          body.start_degreetime_date || DecreeTime.start_degreetime_date,
        end_degreetime_date:
          body.end_degreetime_date || DecreeTime.end_degreetime_date,
      })
      .where({ id })
      .execute()
      .catch(() => {
        throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
      });
  }

  async remove(id: string) {
    const DecreeTime: DecreeTimeEntity = await DecreeTimeEntity.findOneBy({
      id,
    });

    if (!DecreeTime) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }

    await DecreeTimeEntity.createQueryBuilder()
      .delete()
      .from(DecreeTimeEntity)
      .where({ id })
      .execute();
  }
}
