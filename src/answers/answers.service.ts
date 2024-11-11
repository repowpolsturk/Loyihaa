import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Answer } from './entities/answer.entity';
import { CreateAnswerDto } from './dto/create-answer.dto';
import { UpdateAnswerDto } from './dto/update-answer.dto';

@Injectable()
export class AnswersService {
  constructor(
    @InjectRepository(Answer)
    private readonly answersRepository: Repository<Answer>
  ) {}

  async create(createAnswerDto: CreateAnswerDto): Promise<Answer> {
    const newAnswer = this.answersRepository.create(createAnswerDto);
    return await this.answersRepository.save(newAnswer);
  }

  async findAll(): Promise<Answer[]> {
    return await this.answersRepository.find();
  }

  async findOne(id: number): Promise<Answer> {
    return await this.answersRepository.findOne({ where: { id } });
  }

  async update(id: number, updateAnswerDto: UpdateAnswerDto): Promise<Answer> {
    await this.answersRepository.update(id, updateAnswerDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.answersRepository.delete(id);
  }
}
