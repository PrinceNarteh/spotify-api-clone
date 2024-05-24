import { MigrationInterface, QueryRunner } from "typeorm";

export class Users1716521339880 implements MigrationInterface {
    name = 'Users1716521339880'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "firstName" character varying NOT NULL, "lastName" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "stageName" character varying NOT NULL, CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "artist" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_55b76e71568b5db4d01d3e394ed" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "songs_artists" ("songsId" integer NOT NULL, "artistId" integer NOT NULL, CONSTRAINT "PK_ecdf6d49b2a0ad917ee235cb058" PRIMARY KEY ("songsId", "artistId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_971d95bf6df45f2b07c317b6b3" ON "songs_artists" ("songsId") `);
        await queryRunner.query(`CREATE INDEX "IDX_96b0b944763714051934dfa3ae" ON "songs_artists" ("artistId") `);
        await queryRunner.query(`ALTER TABLE "songs" DROP COLUMN "artists"`);
        await queryRunner.query(`ALTER TABLE "songs_artists" ADD CONSTRAINT "FK_971d95bf6df45f2b07c317b6b34" FOREIGN KEY ("songsId") REFERENCES "songs"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "songs_artists" ADD CONSTRAINT "FK_96b0b944763714051934dfa3aea" FOREIGN KEY ("artistId") REFERENCES "artist"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "songs_artists" DROP CONSTRAINT "FK_96b0b944763714051934dfa3aea"`);
        await queryRunner.query(`ALTER TABLE "songs_artists" DROP CONSTRAINT "FK_971d95bf6df45f2b07c317b6b34"`);
        await queryRunner.query(`ALTER TABLE "songs" ADD "artists" character varying array NOT NULL`);
        await queryRunner.query(`DROP INDEX "public"."IDX_96b0b944763714051934dfa3ae"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_971d95bf6df45f2b07c317b6b3"`);
        await queryRunner.query(`DROP TABLE "songs_artists"`);
        await queryRunner.query(`DROP TABLE "artist"`);
        await queryRunner.query(`DROP TABLE "user"`);
    }

}
