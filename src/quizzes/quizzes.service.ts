import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateQuizDto } from './dto/create-quiz.dto';
import { UpdateQuizDto } from './dto/update-quiz.dto';
import { Quizzes } from './entities/quiz.entity';

@Injectable()
export class QuizzesService {
  constructor(
    @InjectRepository(Quizzes)
    private readonly quizzesRepository: Repository<Quizzes>,
  ) {}

  async findAll(): Promise<Quizzes[]> {
    return await this.quizzesRepository.find({
      relations: ['creator', 'type', 'category'],
    });
  }

  async findOne(id: number): Promise<Quizzes> {
    const quiz = await this.quizzesRepository.findOne({
      where: { id },
      relations: ['creator', 'type', 'category'],
    });
    if (!quiz) {
      throw new NotFoundException(`Quiz with ID ${id} not found`);
    }
    return quiz;
  }

  async create(createQuizDto: CreateQuizDto): Promise<Quizzes> {
    const newQuiz = this.quizzesRepository.create(createQuizDto);
    return await this.quizzesRepository.save(newQuiz);
  }

  async update(id: number, updateQuizDto: UpdateQuizDto): Promise<Quizzes> {
    await this.quizzesRepository.update(id, updateQuizDto);
    const updatedQuiz = await this.quizzesRepository.findOne({
      where: { id },
      relations: ['creator', 'type', 'category'],
    });
    if (!updatedQuiz) {
      throw new NotFoundException(`Quiz with ID ${id} not found`);
    }
    return updatedQuiz;
  }

  async delete(id: number): Promise<void> {
    const result = await this.quizzesRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Quiz with ID ${id} not found`);
    }
  }
}
