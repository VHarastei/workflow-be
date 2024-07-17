import { BaseEntity } from 'src/common/entities/base.entity';
import { Room } from 'src/modules/room/entities/room.entity';
import { Column, Entity, OneToMany } from 'typeorm';

@Entity()
export class Project extends BaseEntity {
  @Column()
  name: string;

  @Column()
  prefix: string;

  @OneToMany(() => Room, (room) => room.project)
  rooms: Room[];
}
