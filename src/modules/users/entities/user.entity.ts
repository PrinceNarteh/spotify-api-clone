import { Exclude } from 'class-transformer';
import { AbstractEntity } from 'common/utils/abstracts.entity';
import { Playlist } from 'playlists/entities/playlist.entity';
import { Column, Entity, OneToMany } from 'typeorm';

@Entity()
export class User extends AbstractEntity {
  @Column({ name: 'first_name' })
  firstName: string;

  @Column({ name: 'last_name' })
  lastName: string;

  @Column({ unique: true })
  email: string;

  @Exclude()
  @Column()
  password: string;

  @OneToMany(() => Playlist, (playlist) => playlist.user)
  playlists: Playlist[];

  @Column({ default: false, type: 'boolean' })
  enable2FA: boolean;

  @Column({ nullable: true, type: 'text' })
  twoFASecret: string;

  @Column()
  apiKey: string;
}
