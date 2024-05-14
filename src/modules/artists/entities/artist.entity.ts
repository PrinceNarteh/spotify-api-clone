import { AbstractEntity } from 'common/utils/abstracts.entity';
import { Entity, JoinTable, OneToOne } from 'typeorm';
import { User } from 'users/entities/user.entity';

@Entity()
export class Artist extends AbstractEntity {
  @OneToOne(() => User)
  @JoinTable()
  user: User;
}
