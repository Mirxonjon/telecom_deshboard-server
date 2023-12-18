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
  Query,
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
import { DepartmenService } from './department.service';
import { CreateDepartmentDto } from './dto/create-service_department.dto';
import { UpdateDepartmenCategory } from './dto/update-service_department.dto';

@Controller('Department')
@ApiTags('Department')
@ApiBearerAuth('JWT-auth')
export class DepartmentController {
  readonly #_service: DepartmenService;
  constructor(service: DepartmenService) {
    this.#_service = service;
  }

  // @Get('/getfilter/:id?')
  // @ApiBadRequestResponse()
  // @ApiNotFoundResponse()
  // @ApiOkResponse()
  // async getfilter(
  //   @Param('id') id: string,
  //   @Query('sortName') sortName: string,
  //   @Query('gender') gender: string,
  //   @Query('job_titles') job_titles: string,
  //   @Query('employee_category') employee_category: string,
  //   @Query('tariff_discharge') tariff_discharge: number | string,
  //   @Query('start_experience') start_experience: number | string,
  //   @Query('end_experience') end_experience: number | string,
  // ) {
  //   return await this.#_service.getfilter(id , sortName , gender , job_titles, employee_category, tariff_discharge , start_experience, end_experience);
  // }

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
      required: ['title', 'service_department_id'],
      properties: {
        service_department_id: {
          type: 'string',
          default: 'dsgvasfdbgbgbgbgbgbgnhsdm87u342ry7b3hf',
        },
        title: {
          type: 'string',
          default: 'Contact-Center',
        },
      },
    },
  })
  @ApiOperation({ summary: 'Attendance Punch In' })
  @ApiCreatedResponse()
  @ApiBadRequestResponse()
  @ApiNotFoundResponse()
  async create(@Body() createDepartmentDto: CreateDepartmentDto) {
    return await this.#_service.create(createDepartmentDto);
  }

  @Patch('/update/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        service_department_id: {
          type: 'string',
          default: 'dsgvasfdbgbgbgbgbgbgnhsdm87u342ry7b3hf',
        },
        title: {
          type: 'string',
          default: 'Contact-Center',
        },
      },
    },
  })
  @ApiOperation({ summary: 'Attendance Punch In' })
  @ApiBadRequestResponse()
  @ApiNotFoundResponse()
  async update(
    @Param('id') id: string,
    @Body() updateDepartmenCategory: UpdateDepartmenCategory,
  ) {
    await this.#_service.update(id, updateDepartmenCategory);
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
