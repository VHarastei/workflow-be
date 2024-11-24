import * as bcrypt from 'bcrypt';
import { Exclude } from 'class-transformer';
import { BaseEntity } from 'src/common/entities/base.entity';
import { Message } from 'src/modules/message/entities/message.entity';
import { Reaction } from 'src/modules/reaction/entities/reaction.entity';
import { Room } from 'src/modules/room/entities/room.entity';
import { Column, Entity, ManyToMany, OneToMany, Unique } from 'typeorm';
import { RoleEnum } from '../enums/role.enum';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
@Unique(['email'])
export class User extends BaseEntity {
  @ApiProperty()
  @Column()
  firstName: string;
  @ApiProperty()
  @Column()
  lastName: string;
  @ApiProperty()
  @Column()
  email: string;
  @ApiProperty()
  @Column({ type: 'enum', enum: RoleEnum, default: RoleEnum.USER })
  role: RoleEnum;
  @ApiProperty()
  @Column({ nullable: true, default: null })
  profileImage: string;
  @ApiProperty()
  @Column({ nullable: true, default: null })
  telegramId: string;
  @ApiProperty()
  @Column()
  @Exclude()
  password: string;
  @ApiProperty()
  @Column()
  @Exclude()
  salt: string;
  @ApiProperty()
  @ManyToMany(() => Room, (rooms) => rooms.participants)
  rooms: Room[];
  @ApiProperty()
  @OneToMany(() => Message, (message) => message.user)
  messages: Message[];
  @ApiProperty()
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
