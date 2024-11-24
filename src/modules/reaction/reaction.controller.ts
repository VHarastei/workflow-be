import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ReactionService } from './reaction.service';
import { CreateReactionDto } from './dto/create-reaction.dto';
import { UpdateReactionDto } from './dto/update-reaction.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiOkResponse } from '@nestjs/swagger';
import { Reaction } from './entities/reaction.entity';

@ApiTags('Reactions')
@Controller('reaction')
export class ReactionController {
  constructor(private readonly reactionService: ReactionService) {}

  @ApiOperation({ summary: 'Create a new reaction' })
  @ApiOkResponse({ description: 'Reaction successfully created.', type: Reaction })
  @ApiResponse({ status: 400, description: 'Invalid input data.' })
  @Post()
  create(@Body() createReactionDto: CreateReactionDto) {
    return this.reactionService.create(createReactionDto);
  }

  @ApiOperation({ summary: 'Retrieve all reactions' })
  @ApiOkResponse({ description: 'List of all reactions.', type: [Reaction] })
  @Get()
  findAll() {
    return this.reactionService.findAll();
  }

  @ApiOperation({ summary: 'Retrieve a reaction by ID' })
  @ApiParam({ name: 'id', description: 'The ID of the reaction to retrieve.' })
  @ApiOkResponse({ description: 'Reaction details retrieved successfully.', type: Reaction })
  @ApiResponse({ status: 404, description: 'Reaction not found.' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.reactionService.findOne(+id);
  }

  @ApiOperation({ summary: 'Update a reaction by ID' })
  @ApiParam({ name: 'id', description: 'The ID of the reaction to update.' })
  @ApiOkResponse({ description: 'Reaction successfully updated.', type: Reaction })
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
