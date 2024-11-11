import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { AnswersService } from './answers.service';
import { CreateAnswerDto } from './dto/create-answer.dto';
import { UpdateAnswerDto } from './dto/update-answer.dto';

@Controller('answers')
export class AnswersController {
  constructor(private readonly answersService: AnswersService) {}

  @Get()
  async findAll() {
    return await this.answersService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return await this.answersService.findOne(id);
  }

  @Post()
  async create(@Body() createAnswerDto: CreateAnswerDto) {
    return await this.answersService.create(createAnswerDto);
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() updateAnswerDto: UpdateAnswerDto) {
    return await this.answersService.update(id, updateAnswerDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    return await this.answersService.remove(id);
  }
}
