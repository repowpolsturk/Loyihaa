import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Get()
  async findAll() {
    return await this.categoriesService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return await this.categoriesService.findOne(id);
  }

  @Post()
  async create(@Body() createCategoryDto: CreateCategoryDto) {
    return await this.categoriesService.create(createCategoryDto);
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() updateCategoryDto: UpdateCategoryDto) {
    return await this.categoriesService.update(id, updateCategoryDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: number) {
    return await this.categoriesService.delete(id);
  }
}
