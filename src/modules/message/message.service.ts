import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AccessDeniedException } from 'src/common/exceptions/AccessDeniedException';
import { MessageDoesNotExist } from 'src/common/exceptions/MessageDoesNotExist';
import { Repository } from 'typeorm';
import { CreateMessageDto } from './dto/createMessage.dto';
import { UpdateMessageDto } from './dto/updateMessage.dto';
import { Message } from './entities/message.entity';
import { NoMessagesFoundExeption } from 'src/common/exceptions/NoMessagesFoundExeption';

@Injectable()
export class MessageService {
  constructor(
    @InjectRepository(Message)
    private messageRepository: Repository<Message>,
  ) {}

  create(userId: string, roomId: string, createMessageDto: CreateMessageDto) {
    const newMessage = this.messageRepository.create({
      roomId,
      userId,
      ...createMessageDto,
    });

    return this.messageRepository.save(newMessage);
  }

  async update(userId: string, messageId: string, updateMessageDto: UpdateMessageDto) {
    const message = await this.messageRepository.findOneBy({ id: messageId });

    if (!message) throw new MessageDoesNotExist();
    if (message.creator.id !== userId) throw new AccessDeniedException();

    await this.messageRepository.update(messageId, { ...updateMessageDto, updatedAt: new Date() });

    return this.messageRepository.findOneBy({ id: messageId });
  }

  async delete(userId: string, messageId: string) {
    const message = await this.messageRepository.findOneBy({ id: messageId });

    if (message.creator.id !== userId) throw new AccessDeniedException();

    await this.messageRepository.delete(messageId);

    return { status: HttpStatus.OK };
  }

  async findAll(roomId: string) {
    const messages = await this.messageRepository.findBy({ roomId });

    if (!messages) throw new NoMessagesFoundExeption();

    return messages;
  }

  async findOne(id: number) {
    return `This action returns a #${id} message`;
  }
}
