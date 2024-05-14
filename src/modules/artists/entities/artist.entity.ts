import { AbstractEntity } from 'common/utils/abstracts.entity';
import { Song } from 'songs/entities/song.entity';
import { Entity, JoinTable, ManyToMany, OneToOne } from 'typeorm';
import { User } from 'users/entities/user.entity';

@Entity()
export class Artist extends AbstractEntity {
  @OneToOne(() => User)
  @JoinTable()
  user: User;

  @ManyToMany(() => Song, (song) => song.artists)
  songs: Song[];
}
