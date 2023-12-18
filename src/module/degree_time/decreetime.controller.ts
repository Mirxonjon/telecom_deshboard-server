import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { DecreeTimeService } from './decreetime.service';
import { CreateDecreeDto } from './dto/create-decreetime.dto';
import { UpdateDecreeDto } from './dto/update-degreetime.dto';

@Controller('decreetime')
@ApiTags('Decree time')
@ApiBearerAuth('JWT-auth')
export class DecreeTimeController {
  readonly #_service: DecreeTimeService;
  constructor(service: DecreeTimeService) {
    this.#_service = service;
  }

  @Get('/all/:id')
  @ApiBadRequestResponse()
  @ApiNotFoundResponse()
  @ApiOkResponse()
  async getall(@Param('id') id: string) {
    return await this.#_service.getall(id);
  }

  @Post('create')
  @HttpCode(HttpStatus.CREATED)
  @ApiBody({
    schema: {
      type: 'object',
      required: ['worker_id'],
      properties: {
        worker_id: {
          type: 'string',
          default: 'dsgvasfdbgbgbgbgbgbgnhsdm87u342ry7b3hf',
        },
        start_degreetime_date: {
          type: 'string',
          default: '12.03.2005',
        },
        end_degreetime_date: {
          type: 'string',
          default: '12.03.2005',
        },
      },
    },
  })
  @ApiOperation({ summary: 'Attendance Punch In' })
  @ApiCreatedResponse()
  @ApiBadRequestResponse()
  @ApiNotFoundResponse()
  async create(@Body() createDecreeDto: CreateDecreeDto) {
    return await this.#_service.create(createDecreeDto);
  }

  @Patch('/update/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        worker_id: {
          type: 'string',
          default: 'dsgvasfdbgbgbgbgbgbgnhsdm87u342ry7b3hf',
        },
        start_degreetime_date: {
          type: 'string',
          default: '12.03.2005',
        },
        end_degreetime_date: {
          type: 'string',
          default: '12.03.2005',
        },
      },
    },
  })
  @ApiOperation({ summary: 'Attendance Punch In' })
  @ApiBadRequestResponse()
  @ApiNotFoundResponse()
  async update(
    @Param('id') id: string,
    @Body() updateDecreeDto: UpdateDecreeDto,
  ) {
    await this.#_service.update(id, updateDecreeDto);
  }

  @Delete('/delete/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiBadRequestResponse()
  @ApiNotFoundResponse()
  @ApiNoContentResponse()
  async remove(@Param('id') id: string): Promise<void> {
    await this.#_service.remove(id);
  }
}
