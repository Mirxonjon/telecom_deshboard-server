import { Controller , Get, Query } from "@nestjs/common";
import { ApiBadRequestResponse, ApiNotFoundResponse, ApiOkResponse, ApiTags } from "@nestjs/swagger";
import { AgentsService } from "./agents.service";

@Controller('agents')
@ApiTags('agents')
export class AgentsController {
  readonly #_service: AgentsService;
  constructor(service: AgentsService) {
    this.#_service = service;
  }

  @Get('all')
  @ApiBadRequestResponse()
  @ApiNotFoundResponse()
  @ApiOkResponse()
  async findAll() {
    return await this.#_service.findAll();
  }
  @Get('findByFilter?')
  @ApiBadRequestResponse()
  @ApiNotFoundResponse()
  @ApiOkResponse()
  async filterall(  @Query('name') name: string,
  @Query('operator_number') operator_number: string,
  @Query('status') status: string,) {
    return await this.#_service.filterAll(name , operator_number , status);
  }
}