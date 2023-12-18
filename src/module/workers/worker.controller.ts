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
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { WorkerService } from './worker.service';
import { CreateWorkerDto } from './dto/create-worker.dto';
import { UpdateWorkerDto } from './dto/update-worker.dto';
import { FileFieldsInterceptor } from '@nestjs/platform-express';

@Controller('worker')
@ApiTags('Worker')
export class WorkerController {
  readonly #_service: WorkerService;
  constructor(service: WorkerService) {
    this.#_service = service;
  }

  @Get('/all/:id')
  @ApiBadRequestResponse()
  @ApiNotFoundResponse()
  @ApiOkResponse()
  async getall(@Param('id') id: string) {
    return await this.#_service.getall(id);
  }

  @Get('/workerOne/:id')
  @ApiBadRequestResponse()
  @ApiNotFoundResponse()
  @ApiOkResponse()
  async getaOne(@Param('id') id: string) {
    return await this.#_service.getaOne(id);
  }

  // @Get('/getfilter/:id?')
  // @ApiBadRequestResponse()
  // @ApiNotFoundResponse()
  // @ApiOkResponse()
  // async getfilter(
  //   @Param('id') id: string,
  //   @Query('title') title: string,
  //   @Query('pageNumber') pageNumber: number,
  //   @Query('pageSize') pageSize: number,
  // ) {
  //   return await this.#_service.getfilter();
  // }

  @Post('create')
  @HttpCode(HttpStatus.CREATED)
  @ApiBody({
    schema: {
      type: 'object',
      required: [
        'department_id',
        'name',
        'gender',
        'job_titles',
        'date_of_birth',
        'address',
        'information',
        'phone_number',
      ],
      properties: {
        department_id: {
          type: 'string',
          default: 'dsgvasfdbgbgbgbgbgbgnhsdm87u342ry7b3hf',
        },
        name: {
          type: 'string',
          default: 'Raxmatullayev Muzaffar Patxullayevich',
        },
        login: {
          type: 'string',
          default: '123',
        },
        employee_category: {
          type: 'string',
          default: 'IChP',
        },
        tariff_discharge: {
          type: 'string',
          default: '1',
        },
        job_titles: {
          type: 'string',
          default: 'Xizmat boshlig‘i (Начальник службы)',
        },
        information: {
          type: 'string',
          default: 'Oliy',
        },
        date_of_birth: {
          type: 'string',
          default: '20.06.1970',
        },
        Pasport_id: {
          type: 'string',
          default: 'AC7971001',
        },
        pinfl: {
          type: 'string',
          default: '99797100115451',
        },
        date_of_last_change_position: {
          type: 'string',
          default: '20.03.2023',
        },
        phone_number: {
          type: 'string',
          default: '997971001',
        },
        about_family: {
          type: 'string',
          default: 'oilasi haqida',
        },
        gender: {
          type: 'string',
          default: 'male',
        },
        date_of_acceptance: {
          type: 'string',
          default: '01.02.2012',
        },
        address: {
          type: 'string',
          default: 'Toshkent sh. Olmazor t. Chuqursoy k. 111 uy',
        },
        name_of_graduate_institution: {
          type: 'string',
          default: 'TGUV 2018',
        },
        user_img: {
          type: 'string',
          format: 'binary',
        },
        reference_img: {
          type: 'string',
          format: 'binary',
        },
        military_ID_img: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @ApiConsumes('multipart/form-data')
  @ApiCreatedResponse()
  @ApiBadRequestResponse()
  @ApiNotFoundResponse()
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'user_img' },
      { name: 'reference_img' },
      { name: 'military_ID_img' },
    ]),
  )
  async create(
    @Body() createWorkerDto: CreateWorkerDto,
    @UploadedFiles()
    file: {
      user_img?: Express.Multer.File;
      reference_img?: Express.Multer.File;
      military_ID_img?: Express.Multer.File;
    },
  ): Promise<void> {
    return await this.#_service.create(
      createWorkerDto,
      file?.user_img ? file?.user_img[0] : null,
      file?.reference_img ? file?.reference_img[0] : null,
      file?.military_ID_img ? file?.military_ID_img[0] : null,
    );
  }

  @Patch('/update/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        department_id: {
          type: 'string',
          default: 'dsgvasfdbgbgbgbgbgbgnhsdm87u342ry7b3hf',
        },
        name: {
          type: 'string',
          default: 'Raxmatullayev Muzaffar Patxullayevich',
        },
        login: {
          type: 'string',
          default: '123',
        },
        employee_category: {
          type: 'string',
          default: 'IChP',
        },
        tariff_discharge: {
          type: 'string',
          default: '1',
        },
        job_titles: {
          type: 'string',
          default: 'Xizmat boshlig‘i (Начальник службы)',
        },
        information: {
          type: 'string',
          default: 'Oliy',
        },
        date_of_birth: {
          type: 'string',
          default: '20.06.1970',
        },
        Pasport_id: {
          type: 'string',
          default: 'AC7971001',
        },
        pinfl: {
          type: 'string',
          default: '99797100115451',
        },
        date_of_last_change_position: {
          type: 'string',
          default: '20.03.2023',
        },
        phone_number: {
          type: 'string',
          default: '997971001',
        },
        about_family: {
          type: 'string',
          default: 'oilasi haqida',
        },
        gender: {
          type: 'string',
          default: 'male',
        },
        date_of_acceptance: {
          type: 'string',
          default: '01.02.2012',
        },
        address: {
          type: 'string',
          default: 'Toshkent sh. Olmazor t. Chuqursoy k. 111 uy',
        },
        name_of_graduate_institution: {
          type: 'string',
          default: 'TGUV 2018',
        },
        user_img: {
          type: 'string',
          format: 'binary',
        },
        reference_img: {
          type: 'string',
          format: 'binary',
        },
        military_ID_img: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @ApiConsumes('multipart/form-data')
  @ApiOperation({ summary: 'Attendance Punch In' })
  @ApiBadRequestResponse()
  @ApiNotFoundResponse()
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'user_img' },
      { name: 'reference_img' },
      { name: 'military_ID_img' },
    ]),
  )
  async update(
    @Param('id') id: string,
    @Body() updateWorkersCategory: UpdateWorkerDto,
    file: {
      user_img?: Express.Multer.File;
      reference_img?: Express.Multer.File;
      military_ID_img?: Express.Multer.File;
    },
  ): Promise<void> {
    await this.#_service.update(
      id,
      updateWorkersCategory,
      file?.user_img ? file?.user_img[0] : null,
      file?.reference_img ? file?.reference_img[0] : null,
      file?.military_ID_img ? file?.military_ID_img[0] : null,
    );
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
