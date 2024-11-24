import { BaseEntity } from 'src/common/entities/base.entity';
import { Room } from 'src/modules/room/entities/room.entity';
import { Column, Entity, OneToMany } from 'typeorm';
import { ProjectStatusEnum } from '../enums/projectStatus.enum';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Project extends BaseEntity {
  @ApiProperty()
  @Column()
  name: string;
  @ApiProperty()
  @Column({ default: ProjectStatusEnum.ACTIVE })
  status: ProjectStatusEnum;
  @ApiProperty()
  @OneToMany(() => Room, (room) => room.project)
  rooms: Room[];
}
