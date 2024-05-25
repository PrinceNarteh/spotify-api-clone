import { AbstractEntity } from 'common/utils/abstracts.entity';
import { Song } from 'songs/entities/song.entity';
import { Column, OneToMany, Entity, ManyToOne } from 'typeorm';
import { User } from 'users/entities/user.entity';

@Entity()
export class Playlist extends AbstractEntity {
  @Column()
  name: string;

  @OneToMany(() => Song, (song) => song.playlist)
  songs: Song[];

  @ManyToOne(() => User, (user) => user.playlists)
  user: User;
}
