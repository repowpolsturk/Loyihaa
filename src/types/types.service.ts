import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTypeDto } from './dto/create-type.dto';
import { UpdateTypeDto } from './dto/update-type.dto';
import { Types } from './entities/type.entity';

@Injectable()
export class TypesService {
  constructor(
    @InjectRepository(Types)
    private readonly typesRepository: Repository<Types>,
  ) {}

  async findAll(): Promise<Types[]> {
    return await this.typesRepository.find();
  }

  async findOne(id: number): Promise<Types> {
    const type = await this.typesRepository.findOne({ where: { id } });
    if (!type) {
      throw new NotFoundException(`Type with ID ${id} not found`);
    }
    return type;
  }

  async create(createTypeDto: CreateTypeDto): Promise<Types> {
    const newType = this.typesRepository.create(createTypeDto);
    return await this.typesRepository.save(newType);
  }

  async update(id: number, updateTypeDto: UpdateTypeDto): Promise<Types> {
    await this.typesRepository.update(id, updateTypeDto);
    const updatedType = await this.typesRepository.findOne({ where: { id } });
    if (!updatedType) {
      throw new NotFoundException(`Type with ID ${id} not found`);
    }
    return updatedType;
  }

  async delete(id: number): Promise<void> {
    const result = await this.typesRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Type with ID ${id} not found`);
    }
  }
}
