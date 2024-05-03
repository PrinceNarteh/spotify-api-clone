import { AbstractEntity } from 'common/utils/abstracts.entity';
import { Song } from 'songs/entities/song.entity';
import { Column, OneToMany } from 'typeorm';

export class Playlist extends AbstractEntity {
  @Column()
  name: string;

  @OneToMany(() => Song, (song) => song.playlist)
  songs: Song[];
}
