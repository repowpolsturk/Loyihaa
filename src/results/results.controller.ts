import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { ResultsService } from './results.service';
import { CreateResultDto } from './dto/create-result.dto';
import { UpdateResultDto } from './dto/update-result.dto';

@Controller('results')
export class ResultsController {
  constructor(private readonly resultsService: ResultsService) {}

  @Get()
  async findAll() {
    return await this.resultsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return await this.resultsService.findOne(id);
  }

  @Post()
  async create(@Body() createResultDto: CreateResultDto) {
    return await this.resultsService.create(createResultDto);
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() updateResultDto: UpdateResultDto) {
    return await this.resultsService.update(id, updateResultDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: number) {
    return await this.resultsService.delete(id);
  }
}
