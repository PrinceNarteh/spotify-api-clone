import { Artist } from 'artists/entities/artist.entity';
import { AbstractEntity } from 'common/utils/abstracts.entity';
import { Playlist } from 'playlists/entities/playlist.entity';
import { Column, Entity, JoinTable, ManyToMany, ManyToOne } from 'typeorm';

@Entity('songs')
export class Song extends AbstractEntity {
  @Column()
  title: string;

  @Column({ name: 'released_date', type: 'date' })
  releasedDate: Date;

  @Column({ type: 'time' })
  duration: Date;

  @Column({ type: 'text' })
  lyrics: string;

  @ManyToOne(() => Playlist, (playlist) => playlist.songs)
  playlist: Playlist;

  @ManyToMany(() => Artist, (artist) => artist.songs, { cascade: true })
  @JoinTable({ name: 'songs_artists' })
  artists: Artist[];
}
