import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from 'src/common/entities/base.entity';
import { User } from 'src/modules/users/entities/user.entity';
import { Message } from 'src/modules/message/entities/message.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Reaction extends BaseEntity {
  @ApiProperty()
  @Column()
  userId: string;
  @ApiProperty()
  @Column()
  messageId: string;
  @ApiProperty()
  @Column({ type: 'varchar', length: 10 })
  emoji: string;
  @ManyToOne(() => User, (user) => user.reactions, { onDelete: 'CASCADE' })
  @JoinColumn([{ name: 'userId', referencedColumnName: 'id' }])
  user: User;
  @ManyToOne(() => Message, (message) => message.reactions, { onDelete: 'CASCADE' })
  @JoinColumn([{ name: 'messageId', referencedColumnName: 'id' }])
  message: Message;
}
