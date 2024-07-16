import { User } from 'src/modules/users/entities/user.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { Room } from './room.entity';
import { BaseEntity } from 'src/common/entities/base.entity';

@Entity()
export class Message extends BaseEntity {
  @Column()
  roomId: string;

  @Column()
  text: string;

  @ManyToOne(() => Room, (roomEntity) => roomEntity.messages)
  room: Room;

  @Column()
  userId: string;

  @ManyToOne(() => User, (user) => user.messages)
  @JoinColumn([{ name: 'userId', referencedColumnName: 'id' }])
  creator: User;
}
