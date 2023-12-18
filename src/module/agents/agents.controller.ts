import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Query,
  Patch,
  Param,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AgentsService } from './agents.service';

@Controller('agents')
@ApiTags('agents')
export class AgentsController {
  readonly #_service: AgentsService;
  constructor(service: AgentsService) {
    this.#_service = service;
  }
  @Get('agents/all')
  @ApiBadRequestResponse()
  @ApiNotFoundResponse()
  @ApiOkResponse()
  async findAllAgents() {
    return await this.#_service.findAllAgents();
  }
  @Get('allBlock')
  @ApiBadRequestResponse()
  @ApiNotFoundResponse()
  @ApiOkResponse()
  async findAll(
    @Query('pageNumber') pageNumber: number,
    @Query('pageSize') pageSize: number,
  ) {
    return await this.#_service.findAll(pageNumber, pageSize);
  }

  @Get('allBlockStatistic')
  @ApiBadRequestResponse()
  @ApiNotFoundResponse()
  @ApiOkResponse()
  async findAllStatistic() {
    return await this.#_service.findStatistic();
  }

  @Get('findByFilter?')
  @ApiBadRequestResponse()
  @ApiNotFoundResponse()
  @ApiOkResponse()
  async filterall(
    @Query('name') name: string,
    @Query('operator_number') operator_number: string,
    @Query('status') status: string,
    @Query('pageNumber') pageNumber: number,
    @Query('pageSize') pageSize: number,
  ) {
    return await this.#_service.filterAll(
      name,
      operator_number,
      status,
      pageNumber,
      pageSize,
    );
  }

  @Post('create/service')
  @HttpCode(HttpStatus.CREATED)
  @ApiBody({
    schema: {
      type: 'object',
      required: ['service_id'],
      properties: {
        service_id: {
          type: 'string',
          default: 'acds',
        },
      },
    },
  })
  async createService(@Body() body: { service_id: string }) {
    return this.#_service.createService(body);
  }

  @Post('create/group')
  @HttpCode(HttpStatus.CREATED)
  @ApiBody({
    schema: {
      type: 'object',
      required: ['service_id', 'group_id', 'name', 'title'],
      properties: {
        service_id: {
          type: 'string',
          default: 'acds',
        },
        group_id: {
          type: 'string',
          default: 'acds',
        },
        name: {
          type: 'string',
          default: 'acds',
        },
        title: {
          type: 'string',
          default: 'acds',
        },
      },
    },
  })
  async createGroup(
    @Body()
    body: {
      service_id: string;
      group_id: string;
      name: string;
      title: string;
    },
  ) {
    return this.#_service.createGroup(body);
  }

  @Patch('/updateAgent/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        status: {
          type: 'string',
          default: 'True',
        },
      },
    },
  })
  async update(
    @Param('id') id: string,
    @Body() updateAgentdto: { status: boolean },
  ) {
    return this.#_service.updateAgent(id, updateAgentdto);
  }
}
