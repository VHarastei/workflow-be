import * as bcrypt from 'bcrypt';
import { Exclude } from 'class-transformer';
import { BaseEntity } from 'src/common/entities/base.entity';
import { Message } from 'src/modules/message/entities/message.entity';
import { Reaction } from 'src/modules/reaction/entities/reaction.entity';
import { Room } from 'src/modules/room/entities/room.entity';
import { Column, Entity, ManyToMany, OneToMany, Unique } from 'typeorm';
import { RoleEnum } from '../enums/role.enum';

@Entity()
@Unique(['email'])
export class User extends BaseEntity {
  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  email: string;

  @Column({ type: 'enum', enum: RoleEnum, default: RoleEnum.USER })
  role: RoleEnum;

  @Column({ nullable: true, default: null })
  profileImage: string;

  @Column({ nullable: true, default: null })
  telegramId: string;

  @Column()
  @Exclude()
  password: string;

  @Column()
  @Exclude()
  salt: string;

  @ManyToMany(() => Room, (rooms) => rooms.participants)
  rooms: Room[];

  @OneToMany(() => Message, (message) => message.user)
  messages: Message[];

  @OneToMany(() => Reaction, (reaction) => reaction.user)
  reactions: Reaction[];

  constructor(partial: Partial<User>) {
    super();
    Object.assign(this, partial);
  }

  async validatePassword(password: string): Promise<boolean> {
    const hash = await bcrypt.hash(password, this.salt);
    return hash === this.password;
  }
}
