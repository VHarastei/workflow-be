import * as bcrypt from 'bcrypt';
import { Exclude } from 'class-transformer';
import { BaseEntity } from 'src/common/entities/base.entity';
import { Message } from 'src/modules/message/entities/message.entity';
import { Room } from 'src/modules/room/entities/room.entity';
import { Column, Entity, ManyToMany, OneToMany, Unique } from 'typeorm';

@Entity()
@Unique(['email'])
export class User extends BaseEntity {
  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  email: string;

  @Column()
  @Exclude()
  password: string;

  @Column()
  @Exclude()
  salt: string;

  @ManyToMany(() => Room, (rooms) => rooms.participants)
  rooms: Room[];

  @OneToMany(() => Message, (message) => message.creator)
  messages: Message[];

  constructor(partial: Partial<User>) {
    super();
    Object.assign(this, partial);
  }

  async validatePassword(password: string): Promise<boolean> {
    const hash = await bcrypt.hash(password, this.salt);
    return hash === this.password;
  }
}
