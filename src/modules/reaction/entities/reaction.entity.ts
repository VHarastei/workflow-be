import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from 'src/common/entities/base.entity';
import { User } from 'src/modules/users/entities/user.entity';
import { Message } from 'src/modules/message/entities/message.entity';

@Entity()
export class Reaction extends BaseEntity {
  @Column()
  userId: string;

  @Column()
  messageId: string;

  @Column({ type: 'varchar', length: 10 })
  emoji: string;

  @ManyToOne(() => User, (user) => user.reactions, { onDelete: 'CASCADE' })
  @JoinColumn([{ name: 'userId', referencedColumnName: 'id' }])
  user: User;

  @ManyToOne(() => Message, (message) => message.reactions, { onDelete: 'CASCADE' })
  @JoinColumn([{ name: 'messageId', referencedColumnName: 'id' }])
  message: Message;
}
