import { Injectable } from '@nestjs/common';
import { CreateRoomDto } from './dto/createRoom.dto';
import { Room } from './entities/room.entity';
import { DataSource, In, Repository } from 'typeorm';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/modules/users/entities/user.entity';

@Injectable()
export class RoomService {
  constructor(
    @InjectRepository(Room)
    private roomRepository: Repository<Room>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectDataSource() private dataSource: DataSource,
  ) {}

  async create(createRoomDto: CreateRoomDto) {
    const { participants, ...roomDetails } = createRoomDto;

    const newRoom = this.roomRepository.create(roomDetails);

    const participantsToAssign = await this.userRepository.findBy({ id: In(participants) });

    newRoom.participants = participantsToAssign;

    const savedRoom = await this.roomRepository.save(newRoom);

    return savedRoom;
  }

  findAll() {
    return `This action returns all chat`;
  }

  findOne(id: number) {
    return `This action returns a #${id} chat`;
  }

  // update(id: number, updateRoomDto: UpdateRoomDto) {
  //   return `This action updates a #${id} chat`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} chat`;
  // }
}
