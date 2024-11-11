import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { Reviews } from './entities/review.entity';

@Injectable()
export class ReviewsService {
  constructor(
    @InjectRepository(Reviews)
    private readonly reviewsRepository: Repository<Reviews>,
  ) {}

  async findAll(): Promise<Reviews[]> {
    return await this.reviewsRepository.find({
      relations: ['user', 'quiz'],
    });
  }

  async findOne(id: number): Promise<Reviews> {
    const review = await this.reviewsRepository.findOne({
      where: { id },
      relations: ['user', 'quiz'],
    });
    if (!review) {
      throw new NotFoundException(`Review with ID ${id} not found`);
    }
    return review;
  }

  async create(createReviewDto: CreateReviewDto): Promise<Reviews> {
    const newReview = this.reviewsRepository.create(createReviewDto);
    return await this.reviewsRepository.save(newReview);
  }

  async update(id: number, updateReviewDto: UpdateReviewDto): Promise<Reviews> {
    await this.reviewsRepository.update(id, updateReviewDto);
    const updatedReview = await this.reviewsRepository.findOne({
      where: { id },
      relations: ['user', 'quiz'],
    });
    if (!updatedReview) {
      throw new NotFoundException(`Review with ID ${id} not found`);
    }
    return updatedReview;
  }

  async delete(id: number): Promise<void> {
    const result = await this.reviewsRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Review with ID ${id} not found`);
    }
  }
}
