import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ReactionService } from './reaction.service';
import { CreateReactionDto } from './dto/create-reaction.dto';
import { UpdateReactionDto } from './dto/update-reaction.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';

@ApiTags('Reactions')
@Controller('reaction')
export class ReactionController {
  constructor(private readonly reactionService: ReactionService) { }

  @ApiOperation({ summary: 'Create a new reaction' })
  @ApiResponse({ status: 201, description: 'Reaction successfully created.' })
  @ApiResponse({ status: 400, description: 'Invalid input data.' })
  @Post()
  create(@Body() createReactionDto: CreateReactionDto) {
    return this.reactionService.create(createReactionDto);
  }

  @ApiOperation({ summary: 'Retrieve all reactions' })
  @ApiResponse({ status: 200, description: 'List of all reactions.' })
  @Get()
  findAll() {
    return this.reactionService.findAll();
  }

  @ApiOperation({ summary: 'Retrieve a reaction by ID' })
  @ApiParam({ name: 'id', description: 'The ID of the reaction to retrieve.' })
  @ApiResponse({ status: 200, description: 'Reaction details retrieved successfully.' })
  @ApiResponse({ status: 404, description: 'Reaction not found.' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.reactionService.findOne(+id);
  }

  @ApiOperation({ summary: 'Update a reaction by ID' })
  @ApiParam({ name: 'id', description: 'The ID of the reaction to update.' })
  @ApiResponse({ status: 200, description: 'Reaction successfully updated.' })
  @ApiResponse({ status: 404, description: 'Reaction not found.' })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateReactionDto: UpdateReactionDto) {
    return this.reactionService.update(+id, updateReactionDto);
  }

  @ApiOperation({ summary: 'Delete a reaction by ID' })
  @ApiParam({ name: 'id', description: 'The ID of the reaction to delete.' })
  @ApiResponse({ status: 200, description: 'Reaction successfully deleted.' })
  @ApiResponse({ status: 404, description: 'Reaction not found.' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.reactionService.remove(+id);
  }
}
