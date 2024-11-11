import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { TypesService } from './types.service';
import { CreateTypeDto } from './dto/create-type.dto';
import { UpdateTypeDto } from './dto/update-type.dto';

@Controller('types')
export class TypesController {
  constructor(private readonly typesService: TypesService) {}

  @Get()
  async findAll() {
    return await this.typesService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return await this.typesService.findOne(id);
  }

  @Post()
  async create(@Body() createTypeDto: CreateTypeDto) {
    return await this.typesService.create(createTypeDto);
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() updateTypeDto: UpdateTypeDto) {
    return await this.typesService.update(id, updateTypeDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: number) {
    return await this.typesService.delete(id);
  }
}
