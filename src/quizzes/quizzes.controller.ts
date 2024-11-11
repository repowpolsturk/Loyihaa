import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { QuizzesService } from './quizzes.service';
import { CreateQuizDto } from './dto/create-quiz.dto';
import { UpdateQuizDto } from './dto/update-quiz.dto';

@Controller('quizzes')
export class QuizzesController {
  constructor(private readonly quizzesService: QuizzesService) {}

  @Get()
  async findAll() {
    return await this.quizzesService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return await this.quizzesService.findOne(id);
  }

  @Post()
  async create(@Body() createQuizDto: CreateQuizDto) {
    return await this.quizzesService.create(createQuizDto);
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() updateQuizDto: UpdateQuizDto) {
    return await this.quizzesService.update(id, updateQuizDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: number) {
    return await this.quizzesService.delete(id);
  }
}
