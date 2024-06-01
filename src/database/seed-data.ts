import { EntityManager } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from 'users/entities/user.entity';
import { faker } from '@faker-js/faker';
import { v4 as uuid } from 'uuid';
import { Artist } from 'artists/entities/artist.entity';
import { Playlist } from 'playlists/entities/playlist.entity';

export const seedData = async (manager: EntityManager): Promise<void> => {
  await seedUser();
  await seedArtist();
  await seedPlaylist();

  async function seedUser() {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash('1234456', salt);

    const user = new User();
    user.firstName = faker.person.firstName();
    user.lastName = faker.person.lastName();
    user.email = faker.internet.email();
    user.password = hashedPassword;
    user.apiKey = uuid();

    await manager.getRepository(User).save(user);
  }

  async function seedArtist() {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash('1234456', salt);

    const user = new User();
    user.firstName = faker.person.firstName();
    user.lastName = faker.person.lastName();
    user.email = faker.internet.email();
    user.password = hashedPassword;
    user.apiKey = uuid();

    const artist = new Artist();
    artist.user = user;

    await manager.getRepository(User).save(user);
    await manager.getRepository(Artist).save(artist);
  }

  async function seedPlaylist() {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash('1234456', salt);

    const user = new User();
    user.firstName = faker.person.firstName();
    user.lastName = faker.person.lastName();
    user.email = faker.internet.email();
    user.password = hashedPassword;
    user.apiKey = uuid();

    const playlist = new Playlist();
    playlist.name = faker.music.genre();
    playlist.user = user;

    await manager.getRepository(User).save(user);
    await manager.getRepository(Playlist).save(playlist);
  }
};
