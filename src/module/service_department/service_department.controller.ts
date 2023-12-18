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
import { ServiceDepartmenService } from './service_department.service';
import { CreateServiceDepartmentDto } from './dto/create-service_department.dto';
import { UpdateServiceDepartmenCategory } from './dto/update-service_department.dto';

@Controller('division')
@ApiTags('Division')
@ApiBearerAuth('JWT-auth')
export class ServiceDepartmentController {
  readonly #_service: ServiceDepartmenService;
  constructor(service: ServiceDepartmenService) {
    this.#_service = service;
  }

  @Get('/all')
  @ApiBadRequestResponse()
  @ApiNotFoundResponse()
  @ApiOkResponse()
  async getall() {
    return await this.#_service.getall();
  }

  @Get('/getfilter/:divisionid?')
  @ApiBadRequestResponse()
  @ApiNotFoundResponse()
  @ApiOkResponse()
  async getfilter(
    @Param('divisionid') id: string,
    @Query('name') sortName: string,
    @Query('operator_number') operator_number: string,
  ) {
    return await this.#_service.getfilterName(id , sortName , operator_number );
  }

  @Get('/extendedfilter/:divisionid?')
  @ApiBadRequestResponse()
  @ApiNotFoundResponse()
  @ApiOkResponse()
  async getfilterAny(
    @Param('divisionid') id: string,
    @Query('sortName') sortName: string,
    @Query('gender') gender: string,
    @Query('job_titles') job_titles: string,
    @Query('tariff_discharge') tariff_discharge:  string,
    @Query('employee_category') employee_category: string,
    @Query('start_experience') start_experience:  string,
    @Query('end_experience') end_experience:  string,
  ) {
    return await this.#_service.getfilter(id , sortName , gender , job_titles, employee_category, tariff_discharge , start_experience, end_experience);
  }
  @Get('one/:divisionId')
  @ApiBadRequestResponse()
  @ApiNotFoundResponse()
  @ApiOkResponse()
  async getOne(@Param('divisionId') id: string) {
    return await this.#_service.getOne(id);
  }

  @Get('/deleted')
  @ApiBadRequestResponse()
  @ApiNotFoundResponse()
  @ApiOkResponse()
  async getDeleted() {
    return await this.#_service.getDeleted();
  }


  @Post('create')
  @HttpCode(HttpStatus.CREATED)
  @ApiBody({
    schema: {
      type: 'object',
      required: ['title'],
      properties: {
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
  async create(@Body() createServiceDepartmentDto: CreateServiceDepartmentDto) {
    return await this.#_service.create(createServiceDepartmentDto);
  }

  @Patch('/update/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
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
    @Body() updateServiceDepartmenCategory: UpdateServiceDepartmenCategory,
  ) {
    await this.#_service.update(id, updateServiceDepartmenCategory);
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
