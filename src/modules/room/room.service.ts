import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RoomDoesNotExist } from 'src/common/exceptions/RoomDoesNotExist';
import { User } from 'src/modules/users/entities/user.entity';
import { In, Repository } from 'typeorm';
import { CreateRoomDto } from './dto/createRoom.dto';
import { UpdateRoomDto } from './dto/updateRoom.dto';
import { Room } from './entities/room.entity';

@Injectable()
export class RoomService {
  constructor(
    @InjectRepository(Room)
    private roomRepository: Repository<Room>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(projectId, { participants, ...roomDetails }: CreateRoomDto) {
    const newRoom = this.roomRepository.create({ projectId, ...roomDetails });

    const savedRoom = await this.addParticipants(newRoom, participants);

    return savedRoom;
  }

  async update(id, { name, participants }: UpdateRoomDto) {
    const room = await this.roomRepository.findOne({
      where: { id },
      relations: ['participants'],
    });

    if (!room) throw new RoomDoesNotExist();

    if (name) {
      room.name = name;
    }

    if (participants) {
      await this.addParticipants(room, participants);
    }

    return this.roomRepository.save(room);
  }

  async delete(id: string) {
    await this.roomRepository.delete(id);

    return { status: HttpStatus.OK };
  }

  findAll(projectId: string) {
    return this.roomRepository.findBy({ projectId });
  }

  findOne(id: string) {
    const room = this.roomRepository.findOneBy({ id });

    if (!room) throw new RoomDoesNotExist();

    return room;
  }

  private async addParticipants(room: Room, participants: string[]) {
    const prevParticipants = room.participants || [];
    const prevParticipantsIds = prevParticipants.map(({ id }) => id);

    const filteredParticipants = participants.filter((id) => !prevParticipantsIds.includes(id));
    const participantsToAdd = await this.userRepository.findBy({ id: In(filteredParticipants) });

    room.participants = [...prevParticipants, ...participantsToAdd];

    return this.roomRepository.save(room);
  }
}
