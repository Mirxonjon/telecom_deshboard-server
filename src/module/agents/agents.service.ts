import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { agentslockEntity } from 'src/entities/agentslock.entity';
import { Like } from 'typeorm';

@Injectable()
export class AgentsService {
    async findAll ( ) {
        const findBlockAgents = await agentslockEntity.find({
            order : {
                create_data : 'DESC'
            }
        })

        return findBlockAgents
    }

    async filterAll(name :string  , operator_number :string , status :string) {
      
        const  filteragents = await agentslockEntity.find({
            where: {
              lastName: name == 'null' ? null : Like(`%${name}%`),
              login: operator_number == 'null' ? null : Number(operator_number) as any,
              banInfo: status == 'null' ? null : status,
            },
            order: {
              create_data: 'DESC',
            },
          }).catch(() => {
            throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
          });

        return filteragents
    }

}