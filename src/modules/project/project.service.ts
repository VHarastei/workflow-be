import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { NoProjectsFoundException } from 'src/common/exceptions/NoProjectsFoundException';
import { ProjectDoesNotExistException } from 'src/common/exceptions/ProjectDoesNotExistException';
import { Repository } from 'typeorm';
import { Project } from './entities/project.entity';
import { CreateProjectDto } from './dto/createProject.dto';
import { UpdateProjectDto } from './dto/updateProject.dto';

@Injectable()
export class ProjectService {
  constructor(
    @InjectRepository(Project)
    private projectRepository: Repository<Project>,
  ) {}

  create(createProjectDto: CreateProjectDto) {
    const newProject = this.projectRepository.create(createProjectDto);

    return this.projectRepository.save(newProject);
  }

  async update(projectId: string, updateProjectDto: UpdateProjectDto) {
    const project = await this.projectRepository.findOneBy({ id: projectId });

    if (!project) throw new ProjectDoesNotExistException();

    await this.projectRepository.update(projectId, { ...updateProjectDto, updatedAt: new Date() });

    return this.projectRepository.findOneBy({ id: projectId });
  }

  async delete(projectId: string) {
    // if (project.creator.id !== userId) throw new AccessDeniedException();

    await this.projectRepository.delete(projectId);

    return { status: HttpStatus.OK };
  }

  async findAll() {
    const projects = await this.projectRepository.find();

    if (!projects) throw new NoProjectsFoundException();

    return projects;
  }

  async findOne(id: string) {
    const project = await this.projectRepository.findOneBy({ id });

    if (!project) throw new ProjectDoesNotExistException();

    return project;
  }
}
