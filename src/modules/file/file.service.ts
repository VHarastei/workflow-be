import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateFileDto } from './dto/create-file.dto';
import { File } from './entities/file.entity';

@Injectable()
export class FileService {
  constructor(
    @InjectRepository(File)
    private fileRepository: Repository<File>,
  ) {}

  create(messageId: string, createFileDto: CreateFileDto) {
    return this.fileRepository.create({ messageId, ...createFileDto });
  }

  createMany(messageId: string, createFileDtos: CreateFileDto[]) {
    if (!createFileDtos) return;

    const promises = createFileDtos.map(async (dto) => {
      return this.fileRepository.create({ messageId, ...dto }).save();
    });

    return Promise.all(promises);
  }

  findAll() {
    return `This action returns all file`;
  }

  findOne(id: string) {
    return this.fileRepository.findOne({ where: { id } });
  }
}
