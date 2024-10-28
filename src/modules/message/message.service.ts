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

  async create(userId: string, roomId: string, createMessageDto: CreateMessageDto) {
    const newMessage = this.messageRepository.create({
      roomId,
      userId,
      ...createMessageDto,
    });

    await this.messageRepository.save(newMessage);

    return this.messageRepository.findOne({
      where: [{ id: newMessage.id }],
      relations: ['user'],
    });
  }

  async update(userId: string, messageId: string, updateMessageDto: UpdateMessageDto) {
    const message = await this.messageRepository.findOne({
      where: { id: messageId },
    });

    if (!message) throw new MessageDoesNotExist();
    if (message.userId !== userId) throw new AccessDeniedException();

    await this.messageRepository.update(messageId, { ...updateMessageDto, updatedAt: new Date() });

    return this.messageRepository.findOne({ where: [{ id: messageId }], relations: ['user'] });
  }

  async delete(userId: string, messageId: string) {
    const message = await this.messageRepository.findOneBy({ id: messageId });

    if (!message) throw new MessageDoesNotExist();
    if (message.userId !== userId) throw new AccessDeniedException();

    await this.messageRepository.delete(messageId);

    return { status: HttpStatus.OK };
  }

  async findAll(roomId: string) {
    const messages = await this.messageRepository.find({
      where: { roomId },
      relations: ['user'],
      order: { createdAt: 'ASC' },
    });

    if (!messages) throw new NoMessagesFoundExeption();

    return messages;
  }

  async findOne(id: number) {
    return `This action returns a #${id} message`;
  }

  async findAllByThread(messageId: string) {
    const messages = await this.messageRepository.find({
      where: [{ parentMessageId: messageId }, { id: messageId }],
      relations: ['user'],
    });

    if (!messages) throw new NoMessagesFoundExeption();

    return messages;
  }
}
