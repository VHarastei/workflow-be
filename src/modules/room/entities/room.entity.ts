import { User } from 'src/modules/users/entities/user.entity';
import { Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany } from 'typeorm';
import { RoomTypeEnum } from '../enums/roomType.enum';
import { BaseEntity } from 'src/common/entities/base.entity';
import { Message } from 'src/modules/message/entities/message.entity';
import { Project } from 'src/modules/project/entities/project.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Room extends BaseEntity {
  @ApiProperty()
  @Column()
  name: string;

  @ApiProperty()
  @Column({ nullable: true, default: null })
  topic: string;

  @ApiProperty()
  @Column()
  type: RoomTypeEnum;

  @ApiProperty()
  @ManyToMany(() => User, (user) => user.rooms)
  @JoinTable()
  participants: User[];

  @ApiProperty()
  @OneToMany(() => Message, (message) => message.room)
  messages: Message[];

  @ApiProperty()
  @Column({ nullable: true, default: null })
  projectId: string;

  @ApiProperty()
  @ManyToOne(() => Project, (projectEntity) => projectEntity.rooms)
  project: Project;
}
