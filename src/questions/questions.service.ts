import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { Questions } from './entities/question.entity';

@Injectable()
export class QuestionsService {
  constructor(
    @InjectRepository(Questions)
    private readonly questionsRepository: Repository<Questions>,
  ) {}

  async findAll(): Promise<Questions[]> {
    return await this.questionsRepository.find({
      relations: ['category', 'quiz'],
    });
  }

  async findOne(id: number): Promise<Questions> {
    const question = await this.questionsRepository.findOne({ where: { id }, relations: ['category', 'quiz'] });
    if (!question) {
      throw new NotFoundException(`Question with ID ${id} not found`);
    }
    return question;
  }

  async create(createQuestionDto: CreateQuestionDto): Promise<Questions> {
    const newQuestion = this.questionsRepository.create(createQuestionDto);
    return await this.questionsRepository.save(newQuestion);
  }

  async update(id: number, updateQuestionDto: UpdateQuestionDto): Promise<Questions> {
    await this.questionsRepository.update(id, updateQuestionDto);
    const updatedQuestion = await this.questionsRepository.findOne({ where: { id }, relations: ['category', 'quiz'] });
    if (!updatedQuestion) {
      throw new NotFoundException(`Question with ID ${id} not found`);
    }
    return updatedQuestion;
  }

  async delete(id: number): Promise<void> {
    const result = await this.questionsRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Question with ID ${id} not found`);
    }
  }
}
