import { Injectable } from '@nestjs/common';
import { CreateFileDto } from './dto/create-file.dto';
import { UpdateFileDto } from './dto/update-file.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { File } from './entities/file.entity';
import { Repository } from 'typeorm';

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

  findOne(id: number) {
    return `This action returns a #${id} file`;
  }

  update(id: number, updateFileDto: UpdateFileDto) {
    return `This action updates a #${id} file`;
  }

  remove(id: number) {
    return `This action removes a #${id} file`;
  }
}
