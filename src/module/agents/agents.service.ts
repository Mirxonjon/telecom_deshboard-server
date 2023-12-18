import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { agentsDataStateEntity } from 'src/entities/agentsDataState.entity';
import { agentslockEntity } from 'src/entities/agentslock.entity';
import { GroupsEntity } from 'src/entities/group.entity';
import { ServicesEntity } from 'src/entities/service.entity';
import { Like } from 'typeorm';

@Injectable()
export class AgentsService {
  async findAllAgents() {
    const findBlockAgents = await agentsDataStateEntity.find({
      order: {
        create_data: 'DESC',
      },
    });

    return findBlockAgents;
  }
  async findAll(pageNumber = 1, pageSize = 10) {
    const offset = (pageNumber - 1) * pageSize;

    const [results, total] = await agentslockEntity.findAndCount({
      order: {
        create_data: 'DESC',
      },
      skip: offset,
      take: pageSize,
    });

    const totalPages = Math.ceil(total / pageSize);

    return {
      results,
      pagination: {
        currentPage: pageNumber,
        totalPages,
        pageSize,
        totalItems: total,
      },
    };
  }

  async findStatistic() {
    const findBlockAgents = await agentslockEntity.count();
    const findBlocks = await agentslockEntity.countBy({
      banInfo: 'block',
    });
    const findTime = await agentslockEntity.countBy({
      banInfo: 'time',
    });

    return {
      allcount: findBlockAgents,
      countBlocks: findBlocks,
      countTime: findTime,
    };
  }

  async filterAll(
    name: string,
    operator_number: string,
    status: string,
    pageNumber = 1,
    pageSize = 10,
  ) {
    const offset = (pageNumber - 1) * pageSize;

    const [results, total] = await agentslockEntity
      .findAndCount({
        where: {
          lastName: name == 'null' ? null : Like(`%${name}%`),
          login:
            operator_number == 'null' ? null : (Number(operator_number) as any),
          banInfo: status == 'null' ? null : status,
        },
        order: {
          create_data: 'DESC',
        },
        skip: offset,
        take: pageSize,
      })
      .catch(() => {
        throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
      });

    const totalPages = Math.ceil(total / pageSize);

    return {
      results,
      pagination: {
        currentPage: pageNumber,
        totalPages,
        pageSize,
        totalItems: total,
      },
    };
  }

  async createService(body: { service_id: string }) {
    await ServicesEntity.createQueryBuilder()
      .insert()
      .into(ServicesEntity)
      .values({
        service_id: body.service_id,
      })
      .execute()
      .catch(() => {
        throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
      });
  }

  async createGroup(body: {
    service_id: string;
    group_id: string;
    name: string;
    title: string;
  }) {
    const findService = await ServicesEntity.findOneBy({ id: body.service_id });

    if (!findService) {
      throw new HttpException('Not Found Service', HttpStatus.BAD_REQUEST);
    }
    await GroupsEntity.createQueryBuilder()
      .insert()
      .into(GroupsEntity)
      .values({
        name: body.name,
        title: body.title,
        group_id: body.group_id,
        servic: body.service_id as any,
      })
      .execute()
      .catch((e) => {
        console.log(e);
        throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
      });
  }

  async updateAgent(id: string, body: { status: boolean }) {
    const findAgent = await agentsDataStateEntity
      .findOne({
        where: {
          id: id,
        },
      })
      .catch(() => {
        throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
      });

    if (findAgent) {
      await agentsDataStateEntity
        .createQueryBuilder()
        .update(agentsDataStateEntity)
        .set({
          IsSupervazer: body.status,
        })
        .where({ id })
        .execute()
        .catch(() => {
          throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
        });
    }
  }
}
