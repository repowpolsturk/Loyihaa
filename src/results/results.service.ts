import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateResultDto } from './dto/create-result.dto';
import { UpdateResultDto } from './dto/update-result.dto';
import { Results } from './entities/result.entity';

@Injectable()
export class ResultsService {
  constructor(
    @InjectRepository(Results)
    private readonly resultsRepository: Repository<Results>,
  ) {}

  async findAll(): Promise<Results[]> {
    return await this.resultsRepository.find({
      relations: ['user', 'quiz'],
    });
  }

  async findOne(id: number): Promise<Results> {
    const result = await this.resultsRepository.findOne({
      where: { id },
      relations: ['user', 'quiz'],
    });
    if (!result) {
      throw new NotFoundException(`Result with ID ${id} not found`);
    }
    return result;
  }

  async create(createResultDto: CreateResultDto): Promise<Results> {
    const newResult = this.resultsRepository.create(createResultDto);
    return await this.resultsRepository.save(newResult);
  }

  async update(id: number, updateResultDto: UpdateResultDto): Promise<Results> {
    await this.resultsRepository.update(id, updateResultDto);
    const updatedResult = await this.resultsRepository.findOne({
      where: { id },
      relations: ['user', 'quiz'],
    });
    if (!updatedResult) {
      throw new NotFoundException(`Result with ID ${id} not found`);
    }
    return updatedResult;
  }

  async delete(id: number): Promise<void> {
    const result = await this.resultsRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Result with ID ${id} not found`);
    }
  }
}
