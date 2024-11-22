import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AccessDeniedException } from 'src/common/exceptions/AccessDeniedException';
import { MessageDoesNotExist } from 'src/common/exceptions/MessageDoesNotExist';
import { NoMessagesFoundExeption } from 'src/common/exceptions/NoMessagesFoundExeption';
import { Repository } from 'typeorm';
import { ReactionService } from '../reaction/reaction.service';
import { CreateMessageDto } from './dto/createMessage.dto';
import { ToggleMessageReactionDto } from './dto/toggleMessageReaction.dto';
import { UpdateMessageDto } from './dto/updateMessage.dto';
import { Message } from './entities/message.entity';
import { DigitalOceanService } from '../digitalocean/digitalocean.service';
import { FileService } from '../file/file.service';

@Injectable()
export class MessageService {
  constructor(
    @InjectRepository(Message)
    private messageRepository: Repository<Message>,
    private reactionService: ReactionService,
    private fileService: FileService,
    private digitalOceanService: DigitalOceanService,
  ) { }

  async create(
    userId: string,
    roomId: string,
    createMessageDto: CreateMessageDto,
    files?: Array<Express.Multer.File>,
  ) {
    const newMessage = this.messageRepository.create({
      roomId,
      userId,
      ...createMessageDto,
    });

    await this.messageRepository.save(newMessage);

    if (files) {
      const uploadedFiles = await this.digitalOceanService.uploadFiles(
        `rooms/${roomId}/${new Date().toISOString()}`,
        files,
      );

      await this.fileService.createMany(newMessage.id, uploadedFiles);
    }

    return this.findOne(newMessage.id);
  }

  async update(userId: string, messageId: string, updateMessageDto: UpdateMessageDto) {
    const message = await this.findOne(messageId);

    if (!message) throw new MessageDoesNotExist();
    if (message.userId !== userId) throw new AccessDeniedException();

    await this.messageRepository.update(messageId, { ...updateMessageDto, updatedAt: new Date() });

    return this.findOne(messageId);
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
      relations: ['user', 'reactions', 'files'],
      order: { createdAt: 'ASC' },
    });

    if (!messages) throw new NoMessagesFoundExeption();

    const promises = messages.map(async (message) => {
      const files = await this.getMessageFiles(message);

      return { ...message, files };
    });

    return Promise.all(promises);
  }

  async findAllSimple(roomId: string) {
    const messages = await this.messageRepository.find({
      where: { roomId },
      relations: ['user'],
      order: { createdAt: 'ASC' },
    });

    if (!messages) throw new NoMessagesFoundExeption();

    return messages;
  }

  async findOne(id: string) {
    const message = await this.messageRepository.findOne({
      where: [{ id }],
      relations: ['user', 'reactions', 'files'],
    });

    if (!message) throw new MessageDoesNotExist();
    const files = await this.getMessageFiles(message);

    return { ...message, files };
  }

  async findAllByThread(messageId: string) {
    const messages = await this.messageRepository.find({
      where: [{ parentMessageId: messageId }, { id: messageId }],
      relations: ['user'],
    });

    if (!messages) throw new NoMessagesFoundExeption();

    return messages;
  }

  async toggleReaction(
    userId: string,
    roomId: string,
    messageId: string,
    dto: ToggleMessageReactionDto,
  ) {
    const message = await this.messageRepository.findOne({
      where: { id: messageId, roomId: roomId },
    });
    if (!message) throw new MessageDoesNotExist();

    const newReactions = await this.reactionService.toggleReaction({ userId, messageId, ...dto });

    return newReactions;
  }

  async getMessageFiles(message: Message) {
    const promises = message.files.map(async (file) => {
      const url = await this.digitalOceanService.getPresignedUrl(file.path);
      return { ...file, url };
    });

    return Promise.all(promises);
  }
}
