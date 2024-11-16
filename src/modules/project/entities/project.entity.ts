import { BaseEntity } from 'src/common/entities/base.entity';
import { Room } from 'src/modules/room/entities/room.entity';
import { Column, Entity, OneToMany } from 'typeorm';
import { ProjectStatusEnum } from '../enums/projectStatus.enum';

@Entity()
export class Project extends BaseEntity {
  @Column()
  name: string;

  @Column({ default: ProjectStatusEnum.ACTIVE })
  status: ProjectStatusEnum;

  @OneToMany(() => Room, (room) => room.project)
  rooms: Room[];
}
