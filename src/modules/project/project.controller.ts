import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
} from '@nestjs/common';
import { ProjectService } from './project.service';
import { CreateProjectDto } from './dto/createProject.dto';
import { UpdateProjectDto } from './dto/updateProject.dto';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBearerAuth,
  ApiOkResponse,
} from '@nestjs/swagger';
import { Project } from './entities/project.entity';

@ApiTags('Projects')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller('projects')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @ApiOperation({ summary: 'Create a new project' })
  @ApiOkResponse({ description: 'The project has been successfully created.', type: Project })
  @ApiResponse({ status: 400, description: 'Invalid input data.' })
  @Post()
  create(@Request() req, @Body() createProjectDto: CreateProjectDto) {
    return this.projectService.create(req.user.id, createProjectDto);
  }

  @ApiOperation({ summary: 'Retrieve all projects for the authenticated user' })
  @ApiOkResponse({ description: 'List of projects successfully retrieved.', type: [Project] })
  @Get()
  findAll(@Request() req) {
    return this.projectService.findAll(req.user.id);
  }

  @ApiOperation({ summary: 'Retrieve a specific project by ID' })
  @ApiParam({ name: 'id', description: 'The ID of the project to retrieve' })
  @ApiOkResponse({ description: 'Project details retrieved successfully.', type: Project })
  @ApiResponse({ status: 404, description: 'Project not found.' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.projectService.findOne(id);
  }

  @ApiOperation({ summary: 'Update a project by ID' })
  @ApiParam({ name: 'id', description: 'The ID of the project to update' })
  @ApiOkResponse({ description: 'The project has been successfully updated.', type: Project })
  @ApiResponse({ status: 404, description: 'Project not found.' })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProjectDto: UpdateProjectDto) {
    return this.projectService.update(id, updateProjectDto);
  }

  @ApiOperation({ summary: 'Delete a project by ID' })
  @ApiParam({ name: 'id', description: 'The ID of the project to delete' })
  @ApiResponse({ status: 200, description: 'The project has been successfully deleted.' })
  @ApiResponse({ status: 404, description: 'Project not found.' })
  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.projectService.delete(id);
  }
}
