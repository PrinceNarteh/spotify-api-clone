import { AbstractEntity } from 'common/utils/abstracts.entity';
import { Playlist } from 'playlists/entities/playlist.entity';
import { Column, Entity, ManyToOne } from 'typeorm';

@Entity('songs')
export class Song extends AbstractEntity {
  @Column()
  title: string;

  @Column('varchar', { array: true })
  artists: string[];

  @Column({ type: 'date' })
  releasedDate: Date;

  @Column({ type: 'time' })
  duration: Date;

  @Column({ type: 'text' })
  lyrics: string;

  @ManyToOne(() => Playlist, (playlist) => playlist.songs)
  playlist: Playlist;
}
