import { User } from 'src/modules/users/entities/user.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { BaseEntity } from 'src/common/entities/base.entity';
import { Room } from 'src/modules/room/entities/room.entity';
import { Reaction } from 'src/modules/reaction/entities/reaction.entity';
import { File } from 'src/modules/file/entities/file.entity';

@Entity()
export class Message extends BaseEntity {
  @Column()
  roomId: string;

  @Column({ type: 'text' })
  text: string;

  @ManyToOne(() => Room, (roomEntity) => roomEntity.messages)
  room: Room;

  @Column()
  userId: string;

  @Column({ nullable: true, default: null })
  parentMessageId: string;

  @ManyToOne(() => User, (user) => user.messages)
  @JoinColumn([{ name: 'userId', referencedColumnName: 'id' }])
  user: User;

  @OneToMany(() => Reaction, (reaction) => reaction.message)
  reactions: Reaction[];

  @OneToMany(() => File, (file) => file.message)
  files: File[];
}
