import {
  Body,
  Controller,
  Get,
  Patch,
  Post,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CreateUserDto } from './dto/createUser.dto';
import { UsersService } from './users.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { UpdateUserDto } from './dto/updateUser.dto';
import { randomUUID } from 'crypto';
import { SendInviationDto } from './dto/sendInvitation.dto';
import {
  ApiBearerAuth,
  ApiConsumes,
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiOkResponse,
} from '@nestjs/swagger';
import { User } from './entities/user.entity';

@ApiTags('Users')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @ApiOperation({ summary: 'Create a new user' })
  @ApiOkResponse({ description: 'User successfully created', type: User })
  @ApiResponse({ status: 400, description: 'Invalid input data' })
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @ApiOperation({ summary: 'Retrieve all users' })
  @ApiOkResponse({ description: 'List of all users', type: [User] })
  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @ApiOperation({ summary: 'Update user profile' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Profile update data',
    schema: {
      type: 'object',
      properties: {
        profileImage: { type: 'string', format: 'binary' },
        firstName: { type: 'string' },
        lastName: { type: 'string' },
        email: { type: 'string' },
      },
    },
  })
  @ApiOkResponse({ description: 'Profile successfully updated', type: User })
  @ApiResponse({ status: 400, description: 'Invalid input data' })
  @Patch('profile')
  @UseInterceptors(
    FileInterceptor('profileImage', {
      storage: diskStorage({
        destination: './files/profile-images',
        filename: (_, file, callback) => {
          const uniqueSuffix = randomUUID();
          const fileExtName = extname(file.originalname);
          callback(null, `${file.fieldname}-${uniqueSuffix}${fileExtName}`);
        },
      }),
      fileFilter: (_, file, callback) => {
        if (!file.mimetype.match(/\/(jpg|jpeg|png)$/)) {
          return callback(new Error('Only image files are allowed!'), false);
        }
        callback(null, true);
      },
    }),
  )
  async updateProfile(
    @Req() req,
    @Body() updateProfileDto: UpdateUserDto,
    @UploadedFile() profileImage: Express.Multer.File,
  ) {
    const userId = req.user.id;
    const profileImagePath = profileImage
      ? `/files/profile-images/${profileImage.filename}`
      : undefined;

    return this.userService.updateProfile(userId, updateProfileDto, profileImagePath);
  }

  @ApiOperation({ summary: 'Send an invitation' })
  @ApiResponse({ status: 200, description: 'Invitation successfully sent' })
  @ApiResponse({ status: 400, description: 'Invalid input data' })
  @Post('/sendInvitation')
  async sendInvitation(@Body() sendInviationDto: SendInviationDto) {
    return this.userService.sendInvitation(sendInviationDto);
  }
}
