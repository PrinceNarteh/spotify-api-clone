import { AbstractEntity } from 'common/utils/abstracts.entity';
import { Playlist } from 'playlists/entities/playlist.entity';
import { Column, ManyToOne } from 'typeorm';

export class Song extends AbstractEntity {
  @Column()
  title: string;

  @Column('varchar', { array: true })
  artists: string[];

  @Column('date')
  releasedDate: Date;

  @Column('time')
  duration: Date;

  @Column('text')
  lyrics: string;

  @ManyToOne(() => Playlist, (playlist) => playlist.songs)
  playlist: Playlist;
}
