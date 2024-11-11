import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { QuestionsService } from './questions.service';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';

@Controller('questions')
export class QuestionsController {
  constructor(private readonly questionsService: QuestionsService) {}

  @Get()
  async findAll() {
    return await this.questionsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return await this.questionsService.findOne(id);
  }

  @Post()
  async create(@Body() createQuestionDto: CreateQuestionDto) {
    return await this.questionsService.create(createQuestionDto);
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() updateQuestionDto: UpdateQuestionDto) {
    return await this.questionsService.update(id, updateQuestionDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: number) {
    return await this.questionsService.delete(id);
  }
}
