import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { NoProjectsFoundException } from 'src/common/exceptions/NoProjectsFoundException';
import { ProjectDoesNotExistException } from 'src/common/exceptions/ProjectDoesNotExistException';
import { Repository } from 'typeorm';
import { Project } from './entities/project.entity';
import { CreateProjectDto } from './dto/createProject.dto';
import { UpdateProjectDto } from './dto/updateProject.dto';
import { RoomService } from '../room/room.service';
import { RoomTypeEnum } from '../room/enums/roomType.enum';
import { ProjectStatusEnum } from './enums/projectStatus.enum';

@Injectable()
export class ProjectService {
  constructor(
    @InjectRepository(Project)
    private projectRepository: Repository<Project>,
    private roomService: RoomService,
  ) {}

  async create(userId: string, { participants, ...createProjectDto }: CreateProjectDto) {
    const newProject = await this.projectRepository.create(createProjectDto).save();

    const newRoom = await this.roomService.create(userId, {
      projectId: newProject.id,
      participants,
      name: 'general',
      type: RoomTypeEnum.GROUP,
    });

    return { ...newProject, rooms: [newRoom] };
  }

  async update(projectId: string, { participants, ...updateProjectDto }: UpdateProjectDto) {
    const project = await this.projectRepository.findOne({
      where: { id: projectId },
      relations: ['rooms'],
    });

    if (!project) throw new ProjectDoesNotExistException();

    await this.projectRepository.update(projectId, { ...updateProjectDto, updatedAt: new Date() });

    const roomsPromises = project.rooms.map((room) =>
      this.roomService.addParticipants(room, participants),
    );

    await Promise.all(roomsPromises);

    return this.projectRepository.findOne({
      where: { id: projectId },
      relations: ['rooms'],
    });
  }

  async delete(projectId: string) {
    await this.projectRepository.update(projectId, { status: ProjectStatusEnum.ARCHIVED });

    return { status: HttpStatus.OK };
  }

  async findAll(userId: string) {
    const projects = await this.projectRepository
      .createQueryBuilder('project')
      .innerJoinAndSelect('project.rooms', 'room')
      .innerJoinAndSelect(
        'room.participants',
        'participantFilter',
        'participantFilter.id = :userId',
        {
          userId,
        },
      ) // Filter by specific userId
      .leftJoinAndSelect('room.participants', 'participant') // Load all participants in the rooms
      .where('project.status = :status', { status: ProjectStatusEnum.ACTIVE })
      .orderBy('project.createdAt', 'ASC')
      .getMany();

    if (!projects || projects.length === 0) {
      throw new NoProjectsFoundException();
    }

    return projects;
  }

  async findOne(id: string) {
    const project = await this.projectRepository.findOneBy({ id });

    if (!project) throw new ProjectDoesNotExistException();

    return project;
  }
}
