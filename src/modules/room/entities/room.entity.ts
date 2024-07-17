import { User } from 'src/modules/users/entities/user.entity';
import { Column, Entity, JoinTable, ManyToMany, OneToMany } from 'typeorm';
import { RoomTypeEnum } from '../enums/roomType.enum';
import { BaseEntity } from 'src/common/entities/base.entity';
import { Message } from 'src/modules/message/entities/message.entity';

@Entity()
export class Room extends BaseEntity {
  @Column()
  name: string;

  @Column()
  type: RoomTypeEnum;

  @ManyToMany(() => User, (user) => user.rooms)
  @JoinTable()
  participants: User[];

  @OneToMany(() => Message, (message) => message.room)
  messages: Message[];
}
