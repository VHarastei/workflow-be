import { User } from 'src/modules/users/entities/user.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { BaseEntity } from 'src/common/entities/base.entity';
import { Room } from 'src/modules/room/entities/room.entity';
import { Reaction } from 'src/modules/reaction/entities/reaction.entity';
import { File } from 'src/modules/file/entities/file.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Message extends BaseEntity {
  @ApiProperty()
  @Column()
  roomId: string;
  @ApiProperty()
  @Column({ type: 'text' })
  text: string;
  @ApiProperty()
  @ManyToOne(() => Room, (roomEntity) => roomEntity.messages)
  room: Room;
  @ApiProperty()
  @Column()
  userId: string;
  @ApiProperty()
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
