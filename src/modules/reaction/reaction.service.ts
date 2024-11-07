import { Injectable } from '@nestjs/common';
import { CreateReactionDto } from './dto/create-reaction.dto';
import { UpdateReactionDto } from './dto/update-reaction.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Reaction } from './entities/reaction.entity';
import { ToggleReactionDto } from './dto/toggleReaction.dto';

@Injectable()
export class ReactionService {
  constructor(
    @InjectRepository(Reaction)
    private reactionRepository: Repository<Reaction>,
  ) {}

  create(createReactionDto: CreateReactionDto) {
    return `This action adds a new reaction ${createReactionDto}`;
  }

  findAll() {
    return `This action returns all reaction`;
  }

  findOne(id: number) {
    return `This action returns a #${id} reaction`;
  }

  update(id: number, updateReactionDto: UpdateReactionDto) {
    return `This action updates a #${updateReactionDto} reaction`;
  }

  remove(id: number) {
    return `This action removes a #${id} reaction`;
  }

  async toggleReaction({ userId, messageId, emoji }: ToggleReactionDto): Promise<Reaction[]> {
    const existingReaction = await this.reactionRepository.findOne({
      where: { messageId, userId, emoji },
    });

    if (existingReaction) {
      await this.reactionRepository.remove(existingReaction);
    } else {
      const newReaction = this.reactionRepository.create({
        messageId,
        userId,
        emoji,
      });
      await this.reactionRepository.save(newReaction);
    }

    return this.reactionRepository.find({
      where: { messageId },
    });
  }
}
