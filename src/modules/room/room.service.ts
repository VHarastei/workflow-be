import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RoomDoesNotExist } from 'src/common/exceptions/RoomDoesNotExist';
import { User } from 'src/modules/users/entities/user.entity';
import { In, Repository } from 'typeorm';
import { RoomMigrationService } from '../room-migration/room-migration.service';
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
    private roomMigrationService: RoomMigrationService,
  ) {}

  async create(
    userId,
    { participants, ...roomDetails }: CreateRoomDto,
    importFile?: Express.Multer.File,
  ) {
    const newRoom = this.roomRepository.create(roomDetails);
    const room = await this.addParticipants(newRoom, [userId, ...participants]);

    if (importFile) {
      await this.roomMigrationService.telegramMigrateRoomHistory(room, importFile);
    }

    return this.findOne(room.id);
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

  findAll(userId: string, projectId: string | undefined) {
    return this.roomRepository
      .createQueryBuilder('room')
      .innerJoinAndSelect(
        'room.participants',
        'participantFilter',
        'participantFilter.id = :userId',
        {
          userId,
        },
      )
      .leftJoinAndSelect('room.participants', 'participant')
      .andWhere(projectId ? 'room.projectId = :projectId' : '1=1', { projectId })
      .getMany();
  }

  findOne(id: string) {
    const room = this.roomRepository.findOneBy({ id });

    if (!room) throw new RoomDoesNotExist();

    return room;
  }

  async addParticipants(room: Room, participants: string[]) {
    const prevParticipants = room.participants || [];
    const prevParticipantsIds = prevParticipants.map(({ id }) => id);

    const filteredParticipants = participants.filter((id) => !prevParticipantsIds.includes(id));
    const participantsToAdd = await this.userRepository.findBy({ id: In(filteredParticipants) });

    room.participants = [...prevParticipants, ...participantsToAdd];

    return this.roomRepository.save(room);
  }
}
